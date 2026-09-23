import React, { useState } from 'react';
import Modal from '../components/Modal';
import {
  FileText,
  Download,
  Upload,
  ShieldCheck,
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
  Check,
  Search
} from 'lucide-react';
import { formatDateIndo, compressImageFile, formatBytes } from '../utils/helpers';

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

  const [formData, setFormData] = useState({
    judul: '',
    opdId: opdList[0]?.id || '',
    tahun: new Date().getFullYear(),
    statusVerifikasi: 'Terverifikasi',
    ringkasan: '',
    coverUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    coverFileName: '',
    fileUrl: '/docs/kompromin_publikasi.pdf',
    fileName: 'kompromin_publikasi.pdf'
  });

  const resetForm = () => {
    setFormData({
      judul: '',
      opdId: opdList[0]?.id || '',
      tahun: new Date().getFullYear(),
      statusVerifikasi: 'Terverifikasi',
      ringkasan: '',
      coverUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
      coverFileName: '',
      fileUrl: '/docs/kompromin_publikasi.pdf',
      fileName: 'kompromin_publikasi.pdf'
    });
    setEditingItem(null);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      judul: item.judul || '',
      opdId: item.opdId || opdList[0]?.id || '',
      tahun: item.tahun || 2026,
      statusVerifikasi: item.statusVerifikasi || 'Terverifikasi',
      ringkasan: item.ringkasan || '',
      coverUrl: item.coverUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
      coverFileName: item.coverFileName || '',
      fileUrl: item.fileUrl || '/docs/kompromin_publikasi.pdf',
      fileName: item.fileName || 'kompromin_publikasi.pdf'
    });
    setIsFormModalOpen(true);
  };

  // Handler for uploading cover image file with automatic compression
  const handleCoverFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await compressImageFile(file, 1200, 1200, 0.72);
      const displayUrl = res.compressedUrl || URL.createObjectURL(file);
      const displayName = res.isCompressed
        ? `${file.name} (Terkompres ${res.ratio}% - ${formatBytes(res.compressedSize)})`
        : file.name;

      setFormData(prev => ({
        ...prev,
        coverUrl: displayUrl,
        coverFileName: displayName
      }));
    } catch (err) {
      console.error('Error compressing cover image:', err);
    }
  };

  // Handler for uploading document file (PDF/Doc)
  const handleDocumentFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      fileUrl: objectUrl,
      fileName: file.name
    }));
  };

  const handleSavePublication = (e) => {
    e.preventDefault();
    const opdObj = opdList.find(o => o.id === formData.opdId);
    const opdNama = opdObj ? opdObj.nama : 'Dinas Pemkab Pasaman';

    if (editingItem) {
      // Update publication
      const updated = komprominList.map(it => {
        if (it.id === editingItem.id) {
          return {
            ...it,
            judul: formData.judul,
            opdId: formData.opdId,
            opdNama: opdNama,
            tahun: Number(formData.tahun),
            statusVerifikasi: formData.statusVerifikasi,
            ringkasan: formData.ringkasan,
            coverUrl: formData.coverUrl,
            coverFileName: formData.coverFileName,
            fileUrl: formData.fileUrl,
            fileName: formData.fileName
          };
        }
        return it;
      });

      if (setKomprominList) setKomprominList(updated);
      alert('Publikasi Kompromin berhasil diperbarui!');
    } else {
      // Create new publication
      const newEntry = {
        id: `komp-${Date.now()}`,
        judul: formData.judul,
        opdId: formData.opdId,
        opdNama: opdNama,
        tahun: Number(formData.tahun),
        statusVerifikasi: formData.statusVerifikasi,
        tanggalTerbit: new Date().toISOString().split('T')[0],
        jumlahTabel: 16,
        ringkasan: formData.ringkasan,
        coverUrl: formData.coverUrl,
        coverFileName: formData.coverFileName,
        fileUrl: formData.fileUrl,
        fileName: formData.fileName
      };

      if (setKomprominList) setKomprominList([newEntry, ...komprominList]);
      alert('Publikasi Kompromin resmi berhasil diunggah dan diterbitkan oleh BPS Pasaman!');
    }

    setIsFormModalOpen(false);
    resetForm();
  };

  const handleDeletePublication = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus publikasi Kompromin ini?')) {
      if (setKomprominList) setKomprominList(komprominList.filter(item => item.id !== id));
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

        {isBpsUser && (
          <button onClick={handleOpenCreateModal} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.84rem' }}>
            <Plus size={15} />
            <span>Terbitkan Publikasi Baru</span>
          </button>
        )}
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
                        src={item.coverUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80'}
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
                  <a
                    href={item.fileUrl || '#'}
                    download={item.fileName || 'dokumen_kompromin.pdf'}
                    className="btn btn-primary"
                    style={{ padding: '6px 14px', fontSize: '0.78rem', textDecoration: 'none' }}
                    onClick={(e) => {
                      if (!item.fileUrl || item.fileUrl.startsWith('/docs')) {
                        e.preventDefault();
                        alert(`Simulasi mengunduh berkas Kompromin: ${item.fileName || item.judul}`);
                      }
                    }}
                  >
                    <Download size={14} />
                    <span>Unduh PDF</span>
                  </a>

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
        <form onSubmit={handleSavePublication}>
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
              <div className="book-mockup-card" style={{ width: '100px', height: '140px' }}>
                <div className="book-spine-effect"></div>
                <div className="book-pages-stack"></div>
                <img
                  src={formData.coverUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80'}
                  alt="Pratinjau Sampul Buku"
                  className="book-mockup-img"
                />
                <div className="book-badge-overlay" style={{ fontSize: '0.6rem' }}>
                  {formData.tahun || 2026}
                </div>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={15} color="var(--primary)" />
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Pratinjau Mockup Buku
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {formData.judul ? <strong>{formData.judul}</strong> : 'Judul buku akan tampil di sini'}
              </p>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span>File Sampul: <strong style={{ color: 'var(--primary-hover)' }}>{formData.coverFileName || 'Gambar Default'}</strong></span>
                <span>File PDF: <strong style={{ color: 'var(--primary-hover)' }}>{formData.fileName || 'dokumen_kompromin.pdf'}</strong></span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Judul Publikasi Kompromin</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Kompilasi Produk Administrasi Kesehatan Pasaman 2026"
              value={formData.judul}
              onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Instansi OPD Penerbit</label>
              <select
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
              <label className="form-label">Tahun Pelaporan</label>
              <input
                type="number"
                className="form-input"
                value={formData.tahun}
                onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Status Verifikasi BPS</label>
            <select
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
            <label className="form-label">Deskripsi / Ringkasan Publikasi</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Rangkuman cakupan indikator & variabel data sektoral yang dihimpun..."
              value={formData.ringkasan}
              onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
              required
            />
          </div>

          {/* File Upload Input: Gambar Sampul / Cover */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ImageIcon size={16} color="var(--primary)" />
              <span>Upload File Gambar Sampul / Cover (JPG/PNG)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-input"
              style={{ padding: '8px' }}
              onChange={handleCoverFileChange}
              required={!editingItem && !formData.coverUrl}
            />
          </div>

          {/* File Upload Input: File Dokumen Kompromin PDF */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileCheck size={16} color="var(--primary)" />
              <span>Upload File Dokumen Kompromin (PDF / Word)</span>
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xlsx"
              className="form-input"
              style={{ padding: '8px' }}
              onChange={handleDocumentFileChange}
              required={!editingItem && !formData.fileUrl}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
            <button type="button" onClick={() => { setIsFormModalOpen(false); resetForm(); }} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Upload size={15} />
              <span>{editingItem ? 'Simpan Perubahan' : 'Upload & Terbitkan'}</span>
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
                  src={detailItem.coverUrl}
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
            
            <div style={{ width: '100%', background: 'var(--bg-surface)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <div>Status Verifikasi: <strong style={{ color: 'var(--accent-green)' }}>{detailItem.statusVerifikasi || 'Terverifikasi'}</strong></div>
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
              <a
                href={detailItem.fileUrl || '#'}
                download={detailItem.fileName || 'dokumen_kompromin.pdf'}
                className="btn btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.84rem', textDecoration: 'none' }}
                onClick={(e) => {
                  if (!detailItem.fileUrl || detailItem.fileUrl.startsWith('/docs')) {
                    e.preventDefault();
                    alert(`Simulasi mengunduh berkas Kompromin: ${detailItem.fileName || detailItem.judul}`);
                  }
                }}
              >
                <Download size={15} />
                <span>Unduh Berkas PDF</span>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

