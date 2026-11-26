import React, { useState, useRef, useId } from 'react';
import Modal from '../components/Modal';
import {
  FileText,
  Download,
  Upload,
  Filter,
  CheckCircle2,
  Clock,
  Inbox,
  Plus,
  Edit,
  Trash2,
  Eye,
  Image as ImageIcon,
  FileCheck,
  BookOpen,
  Search,
  Loader2,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { compressImageFile, formatBytes } from '../utils/helpers';
import { extractPdfFirstPageCover, isPdfFile } from '../utils/pdfCover';
import { upsertKomprominToSupabase, deleteKomprominFromSupabase } from '../services/supabaseService';

const DEFAULT_FALLBACK_COVER = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80';

export default function Kompromin({
  komprominList = [],
  setKomprominList,
  opdList = [],
  currentRole,
  currentPermissions
}) {
  const isBpsUser = currentRole?.id === 'role-admin' || currentRole?.id === 'role-ketua-tim' || Boolean(currentPermissions.verifyKompromin);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpd, setFilterOpd] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isExtractingCover, setIsExtractingCover] = useState(false);
  const [coverStatus, setCoverStatus] = useState({ type: 'idle', message: '' });
  const [pdfAutoCover, setPdfAutoCover] = useState(null);
  const [hasCustomCover, setHasCustomCover] = useState(false);

  const pdfExtractRequestRef = useRef(0);
  const coverInputRef = useRef(null);
  const formId = useId();

  const [formData, setFormData] = useState({
    judul: '',
    opdId: opdList[0]?.id || '',
    tahun: new Date().getFullYear(),
    statusVerifikasi: 'Terverifikasi',
    ringkasan: '',
    coverUrl: '',
    coverFileName: '',
    fileUrl: '',
    fileName: ''
  });

  const resetForm = () => {
    pdfExtractRequestRef.current += 1;
    setFormData({
      judul: '',
      opdId: opdList[0]?.id || '',
      tahun: new Date().getFullYear(),
      statusVerifikasi: 'Terverifikasi',
      ringkasan: '',
      coverUrl: '',
      coverFileName: '',
      fileUrl: '',
      fileName: ''
    });
    setEditingItem(null);
    setIsExtractingCover(false);
    setCoverStatus({ type: 'idle', message: '' });
    setPdfAutoCover(null);
    setHasCustomCover(false);
    if (coverInputRef.current) {
      coverInputRef.current.value = '';
    }
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    pdfExtractRequestRef.current += 1;
    setEditingItem(item);
    setFormData({
      judul: item.judul || '',
      opdId: item.opdId || opdList[0]?.id || '',
      tahun: item.tahun || 2026,
      statusVerifikasi: item.statusVerifikasi || 'Terverifikasi',
      ringkasan: item.ringkasan || '',
      coverUrl: item.coverUrl || DEFAULT_FALLBACK_COVER,
      coverFileName: item.coverFileName || '',
      fileUrl: item.fileUrl || '/docs/kompromin_publikasi.pdf',
      fileName: item.fileName || 'kompromin_publikasi.pdf'
    });
    setIsExtractingCover(false);
    setCoverStatus({ type: 'idle', message: '' });
    setPdfAutoCover(null);
    setHasCustomCover(false);
    setIsFormModalOpen(true);
  };

  // Handler for uploading custom cover image file with automatic compression
  const handleCoverFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await compressImageFile(file, 800, 800, 0.72);
      const displayUrl = res.compressedUrl || URL.createObjectURL(file);
      const displayName = res.isCompressed
        ? `${file.name} (Terkompres ${res.ratio}% - ${formatBytes(res.compressedSize)})`
        : file.name;

      setHasCustomCover(true);
      setFormData(prev => ({
        ...prev,
        coverUrl: displayUrl,
        coverFileName: displayName
      }));
      setCoverStatus({
        type: 'info',
        message: pdfAutoCover
          ? 'Menggunakan gambar sampul kustom. Klik "Gunakan Halaman 1 PDF" jika ingin kembali ke sampul otomatis.'
          : 'Menggunakan gambar sampul kustom.'
      });
    } catch (err) {
      console.error('Error compressing cover image:', err);
      setCoverStatus({
        type: 'error',
        message: 'Gagal memproses gambar sampul. Silakan pilih file JPG atau PNG lain.'
      });
    }
  };

  // Handler for uploading document file (PDF/Doc) and extracting page 1 as default cover
  const handleDocumentFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      fileUrl: objectUrl,
      fileName: file.name
    }));

    if (!isPdfFile(file)) {
      pdfExtractRequestRef.current += 1;
      setIsExtractingCover(false);
      setPdfAutoCover(null);
      setCoverStatus({
        type: 'info',
        message: 'Sampul otomatis halaman awal hanya tersedia untuk dokumen PDF. Unggah gambar sampul secara manual jika diperlukan.'
      });
      return;
    }

    const requestId = pdfExtractRequestRef.current + 1;
    pdfExtractRequestRef.current = requestId;
    setIsExtractingCover(true);
    setCoverStatus({
      type: 'loading',
      message: 'Membuat sampul default dari halaman awal dokumen PDF...'
    });

    try {
      const res = await extractPdfFirstPageCover(file);
      if (pdfExtractRequestRef.current !== requestId) return;

      const autoLabel = `Halaman 1 PDF (${file.name}, ${formatBytes(res.compressedSize)})`;
      setPdfAutoCover({ url: res.coverUrl, label: autoLabel });

      if (!hasCustomCover) {
        setFormData(prev => ({
          ...prev,
          coverUrl: res.coverUrl,
          coverFileName: autoLabel
        }));
        setCoverStatus({
          type: 'success',
          message: `Sampul default otomatis diambil dari halaman awal PDF (${res.pageCount} halaman).`
        });
      } else {
        setCoverStatus({
          type: 'info',
          message: 'Halaman awal PDF siap digunakan. Klik "Gunakan Halaman 1 PDF" jika ingin mengganti sampul kustom.'
        });
      }
    } catch (err) {
      if (pdfExtractRequestRef.current !== requestId) return;
      console.error('Error extracting PDF first page cover:', err);
      setPdfAutoCover(null);
      setCoverStatus({
        type: 'error',
        message: err?.message || 'Gagal membaca halaman awal PDF. Anda tetap dapat mengunggah gambar sampul secara manual.'
      });
    } finally {
      if (pdfExtractRequestRef.current === requestId) {
        setIsExtractingCover(false);
      }
    }
  };

  const handleUsePdfFirstPageCover = () => {
    if (!pdfAutoCover) return;
    setHasCustomCover(false);
    if (coverInputRef.current) {
      coverInputRef.current.value = '';
    }
    setFormData(prev => ({
      ...prev,
      coverUrl: pdfAutoCover.url,
      coverFileName: pdfAutoCover.label
    }));
    setCoverStatus({
      type: 'success',
      message: 'Sampul publikasi dikembalikan ke halaman awal dokumen PDF.'
    });
  };

  const handleSavePublication = async (e) => {
    e.preventDefault();
    if (isSaving || isExtractingCover) return;

    const opdObj = opdList.find(o => o.id === formData.opdId);
    const opdNama = opdObj ? opdObj.nama : 'Dinas Pemkab Pasaman';
    const resolvedCoverUrl = formData.coverUrl || DEFAULT_FALLBACK_COVER;
    const resolvedCoverFileName = formData.coverFileName || (formData.coverUrl ? 'Halaman 1 PDF' : 'Gambar Default');
    const resolvedFileUrl = formData.fileUrl || '/docs/kompromin_publikasi.pdf';
    const resolvedFileName = formData.fileName || 'kompromin_publikasi.pdf';

    setIsSaving(true);
    try {
      if (editingItem) {
        const updatedEntry = {
          ...editingItem,
          judul: formData.judul,
          namaKompromin: formData.judul,
          opdId: formData.opdId,
          opdNama: opdNama,
          tahun: Number(formData.tahun) || new Date().getFullYear(),
          statusVerifikasi: formData.statusVerifikasi,
          perencanaanData: editingItem.perencanaanData || 'Selesai',
          pengumpulanData: editingItem.pengumpulanData || (formData.statusVerifikasi === 'Terverifikasi' ? 'Selesai' : 'Proses'),
          pemeriksaanData: editingItem.pemeriksaanData || (formData.statusVerifikasi === 'Terverifikasi' ? 'Selesai' : 'Belum'),
          publikasiData: editingItem.publikasiData || (formData.statusVerifikasi === 'Terverifikasi' ? 'Telah Terverifikasi' : 'Belum'),
          ringkasan: formData.ringkasan,
          catatan: formData.ringkasan,
          coverUrl: resolvedCoverUrl,
          coverFileName: resolvedCoverFileName,
          fileUrl: resolvedFileUrl,
          fileName: resolvedFileName
        };

        const res = await upsertKomprominToSupabase(updatedEntry);

        const updated = komprominList.map(it => it.id === editingItem.id ? updatedEntry : it);
        if (setKomprominList) setKomprominList(updated);

        if (res?.success) {
          alert('Publikasi Kompromin berhasil diperbarui dan tersimpan di database Supabase!');
        } else {
          alert(`Publikasi Kompromin diperbarui secara lokal. Catatan sinkronisasi cloud: ${res?.error || 'Koneksi database bermasalah'}`);
        }
      } else {
        const isVer = formData.statusVerifikasi === 'Terverifikasi';
        const newEntry = {
          id: `komp-${Date.now()}`,
          judul: formData.judul,
          namaKompromin: formData.judul,
          opdId: formData.opdId,
          opdNama: opdNama,
          tahun: Number(formData.tahun) || new Date().getFullYear(),
          statusVerifikasi: formData.statusVerifikasi,
          perencanaanData: 'Selesai',
          pengumpulanData: isVer ? 'Selesai' : 'Proses',
          pemeriksaanData: isVer ? 'Selesai' : 'Belum',
          publikasiData: isVer ? 'Telah Terverifikasi' : 'Belum',
          tanggalTerbit: new Date().toISOString().split('T')[0],
          jumlahTabel: 16,
          ringkasan: formData.ringkasan,
          catatan: formData.ringkasan,
          coverUrl: resolvedCoverUrl,
          coverFileName: resolvedCoverFileName,
          fileUrl: resolvedFileUrl,
          fileName: resolvedFileName
        };

        const res = await upsertKomprominToSupabase(newEntry);

        if (setKomprominList) setKomprominList([newEntry, ...komprominList]);

        if (res?.success) {
          alert('Publikasi Kompromin resmi berhasil diunggah dan tersimpan ke database Supabase!');
        } else {
          alert(`Publikasi Kompromin berhasil ditambahkan secara lokal. Catatan sinkronisasi cloud: ${res?.error || 'Koneksi database bermasalah'}`);
        }
      }

      setIsFormModalOpen(false);
      resetForm();
    } catch (err) {
      console.error('Error saat menyimpan publikasi:', err);
      alert('Terjadi kesalahan saat menyimpan publikasi: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePublication = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus publikasi Kompromin ini?')) {
      if (setKomprominList) setKomprominList(komprominList.filter(item => item.id !== id));
      const res = await deleteKomprominFromSupabase(id);
      if (res && !res.success) {
        console.warn('Gagal menghapus dari Supabase:', res.error);
      }
    }
  };

  const filtered = komprominList.filter(item => {
    const displayTitle = item.judul || item.namaKompromin || '';
    const matchSearch = displayTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (item.opdNama && item.opdNama.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (item.ringkasan && item.ringkasan.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchOpd = filterOpd === 'ALL' || item.opdId === filterOpd;
    const currentStatus = item.statusVerifikasi || (item.publikasiData === 'Telah Terverifikasi' ? 'Terverifikasi' : 'Dalam Review');
    const matchStatus = filterStatus === 'ALL' || currentStatus === filterStatus;
    return matchSearch && matchOpd && matchStatus;
  });

  const getStatusBadge = (status) => {
    if (status === 'Terverifikasi' || status === 'Telah Terverifikasi') {
      return { cls: 'badge-success', icon: <CheckCircle2 size={11} />, label: 'Terverifikasi' };
    }
    if (status === 'Dalam Review' || status === 'Proses') {
      return { cls: 'badge-warning', icon: <Clock size={11} />, label: 'Dalam Review' };
    }
    return { cls: 'badge-info', icon: <FileText size={11} />, label: status || 'Draft OPD' };
  };

  const isItemVerified = (item) => {
    if (!item) return false;
    const st = (item.statusVerifikasi || (item.publikasiData === 'Telah Terverifikasi' ? 'Terverifikasi' : 'Dalam Review')).toLowerCase();
    return st.includes('terverifikasi');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header Banner */}
      <div className="riwayat-header-banner">
        <div className="riwayat-header-title">
          <h2>Repository Publikasi Kompromin</h2>
          <p>
            Katalog terpusat & publikasi Kompilasi Produk Administrasi (Kompromin) resmi OPD Kabupaten Pasaman.
          </p>
        </div>

        <div className="riwayat-header-actions">
          {isBpsUser && (
            <button onClick={handleOpenCreateModal} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.84rem' }}>
              <Plus size={15} />
              <span>Terbitkan Publikasi Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="riwayat-controls-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
          <Filter size={15} />
          <span style={{ fontSize: '0.83rem', fontWeight: 700, color: 'var(--text-main)' }}>Filter Katalog ({filtered.length}):</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', width: '210px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Cari judul atau OPD..."
              style={{ paddingLeft: '32px', paddingRight: '8px', fontSize: '0.8rem', height: '36px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select className="form-select" style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem', height: '36px' }} value={filterOpd} onChange={(e) => setFilterOpd(e.target.value)}>
            <option value="ALL">Semua Instansi OPD</option>
            {opdList.map(opd => (
              <option key={opd.id} value={opd.id}>{opd.kode} - {opd.nama}</option>
            ))}
          </select>

          <select className="form-select" style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem', height: '36px' }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="ALL">Semua Status</option>
            <option value="Terverifikasi">Terverifikasi</option>
            <option value="Dalam Review">Dalam Review</option>
          </select>
        </div>
      </div>

      {/* Publication Cards Grid */}
      {filtered.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-state-icon"><Inbox size={24} /></div>
          <span className="empty-state-title">Tidak ada publikasi</span>
          <span className="empty-state-desc">
            {searchTerm
              ? `Tidak ada hasil untuk "${searchTerm}". Coba kata kunci lain.`
              : 'Tidak ada dokumen Kompromin yang sesuai filter.'}
          </span>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.25rem' }}>
          {filtered.map(item => {
            const statusVal = item.statusVerifikasi || (item.publikasiData === 'Telah Terverifikasi' ? 'Terverifikasi' : 'Dalam Review');
            const badge = getStatusBadge(statusVal);
            const displayTitle = item.judul || item.namaKompromin || 'Kompilasi Data OPD';

            return (
              <div key={item.id} className="kompromin-card">
                {/* Book Cover Container */}
                <div className="kompromin-cover-box">
                  {/* Badges Overlay */}
                  <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>
                    <span className={`badge ${badge.cls}`} style={{ fontSize: '0.7rem' }}>
                      {badge.icon}
                      {badge.label}
                    </span>
                  </div>

                  <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.72rem', fontWeight: 700 }}>{item.tahun || 2026}</span>
                  </div>

                  {/* 3D Book Mockup Component */}
                  <div className="book-mockup-wrapper">
                    <div className="book-mockup-card" onClick={() => setDetailItem(item)}>
                      <div className="book-spine-effect"></div>
                      <div className="book-pages-stack"></div>
                      <img
                        src={item.coverUrl || DEFAULT_FALLBACK_COVER}
                        alt={displayTitle}
                        className="book-mockup-img"
                      />
                      <div className="book-badge-overlay">
                        BPS Pasaman {item.tahun || 2026}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.35' }}>
                    {displayTitle}
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--primary-hover)', fontWeight: 700, display: 'block', marginTop: '3px' }}>
                    {item.opdNama}
                  </span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.45', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {item.ringkasan || 'Dokumen publikasi Kompilasi Produk Administrasi data sektoral.'}
                </p>

                {/* Card Action Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', paddingTop: '8px', borderTop: '1px dashed var(--border-color)' }}>
                  {isItemVerified(item) ? (
                    <a
                      href={item.fileUrl || '#'}
                      download={item.fileName || 'dokumen_kompromin.pdf'}
                      className="btn btn-primary"
                      style={{ padding: '6px 14px', fontSize: '0.78rem', textDecoration: 'none' }}
                      onClick={(e) => {
                        if (!item.fileUrl || item.fileUrl.startsWith('/docs')) {
                          e.preventDefault();
                          alert(`Simulasi mengunduh berkas Kompromin: ${item.fileName || item.judul || item.namaKompromin}`);
                        }
                      }}
                    >
                      <Download size={14} />
                      <span>Unduh PDF</span>
                    </a>
                  ) : (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <Clock size={13} color="#f59e0b" />
                      <span>Dalam Review BPS</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => setDetailItem(item)}
                      className="btn btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                      title="Pratinjau Publikasi"
                    >
                      <Eye size={13} />
                      <span>Detail</span>
                    </button>

                    {isBpsUser && (
                      <>
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="btn btn-secondary"
                          style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                          title="Edit Publikasi"
                        >
                          <Edit size={13} />
                        </button>
                        <button
                          onClick={() => handleDeletePublication(item.id)}
                          className="btn btn-secondary"
                          style={{ padding: '6px 10px', fontSize: '0.78rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                          title="Hapus Publikasi"
                        >
                          <Trash2 size={13} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Form Upload Publikasi */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => { setIsFormModalOpen(false); resetForm(); }}
        title={editingItem ? 'Edit Publikasi Kompromin' : 'Terbitkan Publikasi Kompromin Baru'}
      >
        <form onSubmit={handleSavePublication} method="post">
          {/* Interactive Pratinjau Mockup Buku */}
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            padding: '1.1rem',
            marginBottom: '1.25rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap'
          }}>
            <div className="book-mockup-wrapper" style={{ flexShrink: 0, padding: 0 }}>
              <div className="book-mockup-card" style={{ width: '100px', height: '140px', cursor: 'default' }}>
                <div className="book-spine-effect"></div>
                <div className="book-pages-stack"></div>
                {isExtractingCover ? (
                  <div className="book-mockup-placeholder" aria-live="polite">
                    <Loader2 size={20} className="kompromin-spin" aria-hidden="true" />
                    <span>Memproses halaman 1 PDF...</span>
                  </div>
                ) : formData.coverUrl ? (
                  <img
                    src={formData.coverUrl}
                    alt="Pratinjau sampul publikasi"
                    className="book-mockup-img"
                  />
                ) : (
                  <div className="book-mockup-placeholder">
                    <FileText size={20} aria-hidden="true" />
                    <span>Halaman 1 PDF tampil di sini</span>
                  </div>
                )}
                <div className="book-badge-overlay" style={{ fontSize: '0.6rem' }}>
                  {formData.tahun || 2026}
                </div>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={15} color="var(--primary)" aria-hidden="true" />
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Pratinjau Mockup Buku
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {formData.judul ? <strong>{formData.judul}</strong> : 'Judul publikasi akan tampil di sini'}
              </p>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span>
                  Sumber Sampul:{' '}
                  <strong style={{ color: 'var(--text-main)' }}>
                    {isExtractingCover
                      ? 'Membaca halaman awal PDF...'
                      : (formData.coverFileName || 'Otomatis dari halaman 1 PDF')}
                  </strong>
                </span>
                <span>
                  File Dokumen:{' '}
                  <strong style={{ color: 'var(--text-main)' }}>
                    {formData.fileName || 'Belum dipilih'}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor={`${formId}-judul`}>Judul Publikasi Kompromin</label>
            <input
              id={`${formId}-judul`}
              name="judul"
              type="text"
              className="form-input"
              placeholder="Contoh: Kompilasi Produk Administrasi Kesehatan Pasaman 2026"
              value={formData.judul}
              onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
              required
            />
          </div>

          <div className="kompromin-form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor={`${formId}-opd`}>Instansi OPD Penerbit</label>
              <select
                id={`${formId}-opd`}
                name="opdId"
                className="form-select"
                value={formData.opdId}
                onChange={(e) => setFormData({ ...formData, opdId: e.target.value })}
                required
              >
                {opdList.map(opd => (
                  <option key={opd.id} value={opd.id}>{opd.nama}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor={`${formId}-tahun`}>Tahun Pelaporan</label>
              <input
                id={`${formId}-tahun`}
                name="tahun"
                type="number"
                className="form-input"
                value={formData.tahun}
                onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor={`${formId}-status`}>Status Verifikasi BPS</label>
            <select
              id={`${formId}-status`}
              name="statusVerifikasi"
              className="form-select"
              value={formData.statusVerifikasi}
              onChange={(e) => setFormData({ ...formData, statusVerifikasi: e.target.value })}
              required
            >
              <option value="Terverifikasi">Terverifikasi & Diterbitkan</option>
              <option value="Dalam Review">Dalam Review BPS</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor={`${formId}-ringkasan`}>Deskripsi / Ringkasan Publikasi</label>
            <textarea
              id={`${formId}-ringkasan`}
              name="ringkasan"
              className="form-input"
              rows={3}
              placeholder="Rangkuman cakupan indikator dan variabel data sektoral yang dihimpun..."
              value={formData.ringkasan}
              onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
              required
            />
          </div>

          {/* File Upload Input: File Dokumen Kompromin PDF (Halaman 1 otomatis menjadi sampul default) */}
          <div className="form-group">
            <label
              className="form-label"
              htmlFor={`${formId}-dokumen`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <FileCheck size={16} color="var(--primary)" aria-hidden="true" />
              <span>Upload File Dokumen Kompromin (PDF / Word)</span>
            </label>
            <input
              id={`${formId}-dokumen`}
              name="dokumenPublikasi"
              type="file"
              accept=".pdf,.doc,.docx,.xlsx"
              className="form-input"
              style={{ padding: '8px' }}
              aria-describedby={`${formId}-dokumen-hint`}
              onChange={handleDocumentFileChange}
              required={!editingItem && !formData.fileUrl}
            />
            <span id={`${formId}-dokumen-hint`} className="form-hint">
              Saat dokumen PDF diunggah, halaman awal publikasi otomatis dijadikan sampul default.
            </span>

            {coverStatus.type !== 'idle' && (
              <div
                className={`cover-status-banner is-${coverStatus.type}`}
                role={coverStatus.type === 'error' ? 'alert' : 'status'}
                aria-live="polite"
              >
                {coverStatus.type === 'loading' && (
                  <Loader2 size={15} className="kompromin-spin" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                )}
                {coverStatus.type === 'success' && (
                  <CheckCircle2 size={15} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                )}
                {coverStatus.type === 'error' && (
                  <AlertCircle size={15} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                )}
                {coverStatus.type === 'info' && (
                  <FileText size={15} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                )}
                <span>{coverStatus.message}</span>
              </div>
            )}
          </div>

          {/* File Upload Input: Gambar Sampul Kustom (Opsional) */}
          <div className="form-group">
            <label
              className="form-label"
              htmlFor={`${formId}-cover`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <ImageIcon size={16} color="var(--primary)" aria-hidden="true" />
              <span>Upload Gambar Sampul Kustom (Opsional, JPG/PNG)</span>
            </label>
            <input
              ref={coverInputRef}
              id={`${formId}-cover`}
              name="coverPublikasi"
              type="file"
              accept="image/*"
              className="form-input"
              style={{ padding: '8px' }}
              aria-describedby={`${formId}-cover-hint`}
              onChange={handleCoverFileChange}
            />
            <span id={`${formId}-cover-hint`} className="form-hint">
              Kosongkan untuk tetap memakai halaman awal PDF sebagai sampul, atau unggah gambar untuk menggantinya.
            </span>

            {pdfAutoCover && hasCustomCover && (
              <button
                type="button"
                onClick={handleUsePdfFirstPageCover}
                className="btn btn-secondary cover-reset-btn"
              >
                <RotateCcw size={14} aria-hidden="true" />
                <span>Gunakan Halaman 1 PDF</span>
              </button>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
            <button
              type="button"
              onClick={() => { setIsFormModalOpen(false); resetForm(); }}
              className="btn btn-secondary"
              disabled={isSaving}
            >
              Batal
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSaving || isExtractingCover}>
              {isExtractingCover ? <Loader2 size={15} className="kompromin-spin" aria-hidden="true" /> : <Upload size={15} aria-hidden="true" />}
              <span>
                {isExtractingCover
                  ? 'Membuat Sampul PDF...'
                  : (isSaving ? 'Menyimpan ke Cloud...' : (editingItem ? 'Simpan Perubahan' : 'Upload & Terbitkan'))}
              </span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Detail Viewer dengan 3D Book Presentation (No Nomor SK) */}
      <Modal isOpen={!!detailItem} onClose={() => setDetailItem(null)} title={`Pratinjau Buku Kompromin - ${detailItem?.tahun}`}>
        {detailItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <div className="book-mockup-wrapper">
              <div className="book-mockup-card" style={{ width: '150px', height: '210px' }}>
                <div className="book-spine-effect"></div>
                <div className="book-pages-stack"></div>
                <img
                  src={detailItem.coverUrl || DEFAULT_FALLBACK_COVER}
                  alt={detailItem.judul}
                  className="book-mockup-img"
                />
                <div className="book-badge-overlay">
                  {detailItem.tahun}
                </div>
              </div>
            </div>

            <div style={{ width: '100%' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', textAlign: 'center' }}>
                {detailItem.judul || detailItem.namaKompromin}
              </h3>
              <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-hover)', marginTop: '3px', textAlign: 'center' }}>
                {detailItem.opdNama}
              </p>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', width: '100%' }}>
              {detailItem.ringkasan || 'Dokumen publikasi Kompilasi Produk Administrasi data sektoral.'}
            </p>
            
            <div style={{ width: '100%', background: 'var(--bg-surface)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                Status Verifikasi: <strong style={{ color: isItemVerified(detailItem) ? 'var(--accent-green)' : '#f59e0b' }}>
                  {detailItem.statusVerifikasi || (detailItem.publikasiData === 'Telah Terverifikasi' ? 'Terverifikasi' : 'Dalam Review')}
                </strong>
              </div>
              {!isItemVerified(detailItem) && (
                <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                  <Clock size={11} />
                  Belum Dapat Diunduh
                </span>
              )}
            </div>

            {isItemVerified(detailItem) ? (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <a
                  href={detailItem.fileUrl || '#'}
                  download={detailItem.fileName || 'dokumen_kompromin.pdf'}
                  className="btn btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.84rem', textDecoration: 'none' }}
                  onClick={(e) => {
                    if (!detailItem.fileUrl || detailItem.fileUrl.startsWith('/docs')) {
                      e.preventDefault();
                      alert(`Simulasi mengunduh berkas Kompromin: ${detailItem.fileName || detailItem.judul || detailItem.namaKompromin}`);
                    }
                  }}
                >
                  <Download size={15} />
                  <span>Unduh Berkas PDF</span>
                </a>
              </div>
            ) : (
              <div style={{ width: '100%', padding: '10px 14px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '6px' }}>
                Berkas Kompromin ini masih dalam tahap review oleh Tim BPS dan belum dapat diunduh.
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

