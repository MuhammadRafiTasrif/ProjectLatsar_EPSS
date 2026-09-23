import React, { useState } from 'react';
import Modal from '../components/Modal';
import {
  History,
  Printer,
  Search,
  FileText,
  CheckCircle2,
  Clock,
  Calendar,
  Inbox,
  Check,
  RefreshCw,
  FileCheck,
  Image as ImageIcon,
  PlusCircle,
  Save,
  Upload,
  Eye,
  Trash2,
  Filter,
  Maximize2,
  Layers,
  X,
  MoreVertical,
  RotateCcw
} from 'lucide-react';
import { formatDateIndo, printElement, compressImageFile, formatBytes } from '../utils/helpers';

export default function Riwayat({
  pembinaanList = [],
  setPembinaanList,
  galleryList = [],
  setGalleryList,
  opdList = [],
  currentRole,
  currentPermissions
}) {
  const isBpsUser = currentRole?.id === 'role-admin' || currentRole?.id === 'role-ketua-tim' || Boolean(currentPermissions.approvePembinaan);
  const [activeTabMode, setActiveTabMode] = useState('history'); // 'history' | 'gallery'
  const [activeMenuId, setActiveMenuId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpd, setFilterOpd] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Lightbox Album Carousel State
  const [lightboxAlbum, setLightboxAlbum] = useState(null); // { photos: [], currentIndex: 0, title: '', opdNama: '', tanggal: '', keterangan: '' }

  // Modal Lengkapi History (BPS)
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [targetItem, setTargetItem] = useState(null);
  const [completionData, setCompletionData] = useState({
    notulen: '',
    catatanBps: '',
    fotoList: [], // array of { id, url, fileName, caption }
    notulenDocUrl: '',
    notulenFileName: ''
  });

  // Modal Upload Multi-Foto Galeri
  const [isUploadGalleryModalOpen, setIsUploadGalleryModalOpen] = useState(false);
  const [galleryFormData, setGalleryFormData] = useState({
    pembinaanId: '',
    judulKegiatan: '',
    opdId: opdList[0]?.id || '',
    tanggal: new Date().toISOString().split('T')[0],
    keterangan: '',
    photos: [] // array of { url, name }
  });

  const handleOpenUploadGalleryModal = (preselectPemId = '') => {
    const targetPem = pembinaanList.find(p => p.id === preselectPemId) || pembinaanList[0];
    if (targetPem) {
      setGalleryFormData({
        pembinaanId: targetPem.id,
        judulKegiatan: targetPem.topik,
        opdId: targetPem.opdId,
        tanggal: targetPem.tanggalPelaksanaan && targetPem.tanggalPelaksanaan !== '-' ? targetPem.tanggalPelaksanaan : targetPem.tanggalUsulan,
        keterangan: targetPem.notulen && targetPem.notulen !== 'Menunggu persetujuan tim pembina BPS.' ? targetPem.notulen : `Dokumentasi kegiatan pembinaan ${targetPem.jenis} bersama ${targetPem.opdNama}`,
        photos: []
      });
    } else {
      setGalleryFormData({
        pembinaanId: '',
        judulKegiatan: '',
        opdId: opdList[0]?.id || '',
        tanggal: new Date().toISOString().split('T')[0],
        keterangan: '',
        photos: []
      });
    }
    setIsUploadGalleryModalOpen(true);
  };

  // Filtered History list
  const filteredHistory = pembinaanList.filter(item => {
    const matchSearch = item.opdNama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.topik.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (item.pembinaBPS || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (item.notulen || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchOpd = filterOpd === 'ALL' || item.opdId === filterOpd;
    const matchStatus = filterStatus === 'ALL' || item.status === filterStatus;
    return matchSearch && matchOpd && matchStatus;
  });

  const isFiltered = searchTerm.trim() !== '' || filterOpd !== 'ALL' || filterStatus !== 'ALL';

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterOpd('ALL');
    setFilterStatus('ALL');
  };

  // Filtered Gallery list
  const filteredGallery = galleryList.filter(photo => {
    const matchSearch = photo.judulKegiatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        photo.opdNama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        photo.keterangan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchOpd = filterOpd === 'ALL' || photo.opdId === filterOpd;
    return matchSearch && matchOpd;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Selesai': return { cls: 'badge-success', icon: <CheckCircle2 size={11} /> };
      case 'Dalam Proses': return { cls: 'badge-warning', icon: <Clock size={11} /> };
      case 'Disetujui': return { cls: 'badge-info', icon: <Check size={11} /> };
      case 'Menunggu Persetujuan':
      default: return { cls: 'badge-primary', icon: <RefreshCw size={11} /> };
    }
  };

  const getPhotosFromItem = (item) => {
    if (item.fotoList && item.fotoList.length > 0) return item.fotoList;
    if (item.dokumentasiUrl) {
      return [{
        id: `f-${item.id}`,
        url: item.dokumentasiUrl,
        fileName: item.dokumentasiFileName || 'foto_dokumentasi.jpg',
        caption: item.topik
      }];
    }
    return [];
  };

  const openLightboxAlbum = (photos, initialIndex = 0, meta = {}) => {
    if (!photos || photos.length === 0) return;
    setLightboxAlbum({
      photos: photos.map(p => typeof p === 'string' ? { url: p } : p),
      currentIndex: initialIndex,
      title: meta.topik || meta.judulKegiatan || 'Dokumentasi Kegiatan',
      opdNama: meta.opdNama || 'OPD Pasaman',
      tanggal: meta.tanggalPelaksanaan || meta.tanggal || '',
      keterangan: meta.notulen || meta.keterangan || ''
    });
  };

  const handlePrevPhoto = () => {
    if (!lightboxAlbum) return;
    setLightboxAlbum(prev => ({
      ...prev,
      currentIndex: prev.currentIndex > 0 ? prev.currentIndex - 1 : prev.photos.length - 1
    }));
  };

  const handleNextPhoto = () => {
    if (!lightboxAlbum) return;
    setLightboxAlbum(prev => ({
      ...prev,
      currentIndex: prev.currentIndex < prev.photos.length - 1 ? prev.currentIndex + 1 : 0
    }));
  };

  const handleOpenCompleteModal = (item) => {
    setTargetItem(item);
    const existingPhotos = getPhotosFromItem(item);
    setCompletionData({
      notulen: item.notulen && item.notulen !== 'Menunggu persetujuan tim pembina BPS.' ? item.notulen : '',
      catatanBps: item.catatanBps && item.catatanBps !== '-' ? item.catatanBps : '',
      fotoList: existingPhotos,
      notulenDocUrl: item.notulenDocUrl || '/docs/berita_acara_pembinaan.pdf',
      notulenFileName: item.notulenFileName || 'berita_acara_pembinaan.pdf'
    });
    setIsCompleteModalOpen(true);
  };

  // Upload Multi-Foto Handler for History Modal (Automatic Compression)
  const handleMultiPhotoFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const res = await compressImageFile(file, 1200, 1200, 0.72);
      const photoUrl = res.compressedUrl || URL.createObjectURL(file);

      setCompletionData(prev => ({
        ...prev,
        fotoList: [
          ...prev.fotoList,
          {
            id: `foto-${Date.now()}-${index}`,
            url: photoUrl,
            fileName: file.name,
            caption: res.isCompressed
              ? `${file.name} (Terkompres ${res.ratio}% - ${formatBytes(res.compressedSize)})`
              : file.name,
            originalSize: res.originalSize,
            compressedSize: res.compressedSize,
            ratio: res.ratio
          }
        ]
      }));
    }
  };

  const handleRemovePhotoFromCompletion = (indexToRemove) => {
    setCompletionData(prev => ({
      ...prev,
      fotoList: prev.fotoList.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // Upload Notulen PDF handler
  const handleNotulenFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setCompletionData(prev => ({
      ...prev,
      notulenDocUrl: objectUrl,
      notulenFileName: file.name
    }));
  };

  const handleSaveCompletion = (e) => {
    e.preventDefault();
    if (!targetItem) return;

    const nowStamp = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
    const logEntry = {
      tanggalPerubahan: nowStamp,
      diubahOleh: 'Tim Statistik Sektoral BPS',
      tanggalUsulanOPD: targetItem.tanggalUsulan,
      tanggalDitetapkanBPS: targetItem.tanggalPelaksanaan,
      catatanPerubahan: `BPS melengkapi berkas notulen, ${completionData.fotoList.length} foto dokumentasi kegiatan (terkompresi), dan hasil akhir pembinaan.`
    };

    const firstPhotoUrl = completionData.fotoList[0]?.url || targetItem.dokumentasiUrl || '';
    const firstPhotoFileName = completionData.fotoList[0]?.fileName || targetItem.dokumentasiFileName || '';

    const updatedList = pembinaanList.map(it => {
      if (it.id === targetItem.id) {
        return {
          ...it,
          notulen: completionData.notulen,
          catatanBps: completionData.catatanBps,
          fotoList: completionData.fotoList,
          dokumentasiUrl: firstPhotoUrl,
          dokumentasiFileName: firstPhotoFileName,
          notulenDocUrl: completionData.notulenDocUrl,
          notulenFileName: completionData.notulenFileName,
          status: 'Selesai',
          riwayatPerubahan: [logEntry, ...(it.riwayatPerubahan || [])]
        };
      }
      return it;
    });

    if (setPembinaanList) setPembinaanList(updatedList);

    // Also push uploaded photos to Galeri
    if (completionData.fotoList.length > 0 && setGalleryList) {
      const newGalItems = completionData.fotoList.map((pt, i) => ({
        id: `gal-${targetItem.id}-${Date.now()}-${i}`,
        pembinaanId: targetItem.id,
        judulKegiatan: targetItem.topik,
        opdId: targetItem.opdId,
        opdNama: targetItem.opdNama,
        tanggal: targetItem.tanggalPelaksanaan && targetItem.tanggalPelaksanaan !== '-' ? targetItem.tanggalPelaksanaan : new Date().toISOString().split('T')[0],
        keterangan: completionData.notulen || 'Dokumentasi foto kegiatan pembinaan statistik sektoral.',
        fotoUrl: pt.url,
        fotoFileName: pt.fileName || 'foto_kegiatan.jpg'
      }));
      setGalleryList([...newGalItems, ...galleryList]);
    }

    setIsCompleteModalOpen(false);
    setTargetItem(null);
    alert(`Berhasil menyimpan notulen & ${completionData.fotoList.length} foto terkompresi ke album kegiatan!`);
  };

  // Upload Multi-Foto Galeri Direct Modal Handler (Automatic Compression)
  const handleMultiPhotoUploadGallery = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const res = await compressImageFile(file, 1200, 1200, 0.72);
      const photoUrl = res.compressedUrl || URL.createObjectURL(file);

      setGalleryFormData(prev => ({
        ...prev,
        photos: [
          ...prev.photos,
          {
            url: photoUrl,
            name: file.name,
            originalSize: res.originalSize,
            compressedSize: res.compressedSize,
            ratio: res.ratio
          }
        ]
      }));
    }
  };

  const handleSaveGalleryPhotos = (e) => {
    e.preventDefault();
    if (galleryFormData.photos.length === 0) {
      alert('Silakan pilih minimal 1 file foto kegiatan!');
      return;
    }

    const targetOpdObj = opdList.find(o => o.id === galleryFormData.opdId);
    const opdNama = targetOpdObj ? targetOpdObj.nama : 'OPD Pasaman';

    // 1. Create gallery items for Gallery tab
    const newEntries = galleryFormData.photos.map((pt, i) => ({
      id: `gal-${Date.now()}-${i}`,
      pembinaanId: galleryFormData.pembinaanId || 'pem-custom',
      judulKegiatan: galleryFormData.judulKegiatan,
      opdId: galleryFormData.opdId,
      opdNama: opdNama,
      tanggal: galleryFormData.tanggal,
      keterangan: galleryFormData.keterangan,
      fotoUrl: pt.url,
      fotoFileName: pt.name
    }));

    if (setGalleryList) setGalleryList([...newEntries, ...galleryList]);

    // 2. Link & attach photos to chosen activity in pembinaanList (History tab & Berita Acara)
    if (galleryFormData.pembinaanId && setPembinaanList) {
      const newPhotoObjects = galleryFormData.photos.map((pt, i) => ({
        id: `f-${Date.now()}-${i}`,
        url: pt.url,
        fileName: pt.name,
        caption: galleryFormData.judulKegiatan
      }));

      const updatedPembinaan = pembinaanList.map(pem => {
        if (pem.id === galleryFormData.pembinaanId) {
          const existingPhotos = pem.fotoList || [];
          const updatedPhotos = [...existingPhotos, ...newPhotoObjects];
          return {
            ...pem,
            fotoList: updatedPhotos,
            dokumentasiUrl: updatedPhotos[0]?.url || pem.dokumentasiUrl,
            dokumentasiFileName: updatedPhotos[0]?.fileName || pem.dokumentasiFileName
          };
        }
        return pem;
      });

      setPembinaanList(updatedPembinaan);
    }

    setIsUploadGalleryModalOpen(false);
    setGalleryFormData({
      pembinaanId: '',
      judulKegiatan: '',
      opdId: opdList[0]?.id || '',
      tanggal: new Date().toISOString().split('T')[0],
      keterangan: '',
      photos: []
    });

    alert(`Berhasil mengunggah ${newEntries.length} foto dokumentasi ke album kegiatan!`);
  };

  const handleDeleteGalleryPhoto = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus foto dokumentasi ini dari galeri?')) {
      if (setGalleryList) setGalleryList(galleryList.filter(g => g.id !== id));
    }
  };

  const handleDeleteHistoryItem = (itemId, topik, opdNama) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data Rekam Jejak & Notulen kegiatan "${topik}" (${opdNama})?\n\nData yang dihapus tidak dapat dikembalikan.`)) {
      if (setPembinaanList) {
        setPembinaanList(prev => prev.filter(item => item.id !== itemId));
      }
      if (setGalleryList) {
        setGalleryList(prev => prev.filter(photo => photo.pembinaanId !== itemId));
      }
      alert(`Data rekam jejak "${topik}" berhasil dihapus.`);
    }
  };

  const handleDeleteNotulenOnly = (itemId, topik) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus / mengosongkan Notulen & Berkas BA untuk kegiatan "${topik}"?`)) {
      const nowStamp = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
      const updatedList = pembinaanList.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            notulen: '',
            notulenDocUrl: '',
            notulenFileName: '',
            catatanBps: '',
            status: 'Dalam Proses',
            riwayatPerubahan: [
              {
                tanggalPerubahan: nowStamp,
                diubahOleh: 'Admin BPS',
                catatanPerubahan: 'Admin BPS menghapus data notulen & berkas berita acara.'
              },
              ...(item.riwayatPerubahan || [])
            ]
          };
        }
        return item;
      });
      if (setPembinaanList) setPembinaanList(updatedList);
      alert('Data notulen kegiatan berhasil dihapus.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header Banner */}
      <div className="riwayat-header-banner">
        <div className="riwayat-header-title">
          <h2>Riwayat Pembinaan</h2>
          <p>
            Histori rekam jejak, notulen kesepakatan rapat, serta galeri album foto dokumentasi kegiatan pembinaan statistik sektoral BPS & OPD.
          </p>
        </div>

        {isBpsUser && (
          <button
            onClick={() => handleOpenUploadGalleryModal()}
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.84rem' }}
          >
            <Upload size={15} />
            <span>Upload Album Foto Galeri</span>
          </button>
        )}
      </div>

      {/* Control Bar: Segmented Tabs & Filters */}
      <div className="riwayat-controls-bar" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: '1rem' }}>
        {/* Top Row: Segmented Switch + Reset Filter Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', width: '100%' }}>
          <div className="segmented-tabs">
            <button
              onClick={() => setActiveTabMode('history')}
              className={`segmented-tab-btn ${activeTabMode === 'history' ? 'active' : ''}`}
            >
              <History size={15} />
              <span>Rekam Jejak Pembinaan ({filteredHistory.length})</span>
            </button>

            <button
              onClick={() => setActiveTabMode('gallery')}
              className={`segmented-tab-btn ${activeTabMode === 'gallery' ? 'active' : ''}`}
            >
              <ImageIcon size={15} />
              <span>Galeri Foto ({filteredGallery.length})</span>
            </button>
          </div>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="btn btn-secondary"
              style={{ padding: '5px 12px', fontSize: '0.75rem', gap: '4px' }}
              title="Reset Semua Filter"
            >
              <RotateCcw size={12} />
              <span>Reset Filter</span>
            </button>
          )}
        </div>

        {/* Bottom Row: Filter Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', width: '100%' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 220px', minWidth: '180px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Cari topik, OPD, atau pembina..."
              style={{ paddingLeft: '32px', paddingRight: searchTerm ? '28px' : '10px', fontSize: '0.8rem', height: '36px', width: '100%' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--text-muted)' }}
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* OPD Filter */}
          <div style={{ flex: '1 1 180px', minWidth: '160px' }}>
            <select
              className="form-select"
              style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', height: '36px' }}
              value={filterOpd}
              onChange={(e) => setFilterOpd(e.target.value)}
            >
              <option value="ALL">Semua Instansi OPD</option>
              {opdList.map(opd => (
                <option key={opd.id} value={opd.id}>{opd.kode} - {opd.nama}</option>
              ))}
            </select>
          </div>

          {/* Status Filter (applicable on history tab) */}
          {activeTabMode === 'history' && (
            <div style={{ flex: '1 1 150px', minWidth: '130px' }}>
              <select
                className="form-select"
                style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', height: '36px' }}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="ALL">Semua Status</option>
                <option value="Selesai">Selesai</option>
                <option value="Dalam Proses">Dalam Proses</option>
                <option value="Disetujui">Disetujui</option>
                <option value="Menunggu Persetujuan">Menunggu Persetujuan</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* TAB 1: HISTORI REKAM JEJAK & NOTULEN */}
      {activeTabMode === 'history' && (
        <>
          {filteredHistory.length === 0 ? (
            <div className="glass-card empty-state">
              <div className="empty-state-icon"><Inbox size={24} /></div>
              <span className="empty-state-title">{searchTerm ? 'Tidak ditemukan' : 'Belum ada riwayat'}</span>
              <span className="empty-state-desc">
                {searchTerm
                  ? `Tidak ada hasil untuk "${searchTerm}". Coba kata kunci lain.`
                  : 'Belum ada catatan pembinaan yang tercatat di sistem.'}
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredHistory.map(item => {
                const badge = getStatusBadge(item.status);
                const photos = getPhotosFromItem(item);

                return (
                  <div key={item.id} className="riwayat-card">
                    {/* Header Row: Title, OPD Name & Badges */}
                    <div className="riwayat-card-header">
                      <div className="riwayat-card-title-group">
                        <h3>{item.topik}</h3>
                        <div className="riwayat-opd-tag">
                          <span>{item.opdNama}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span className="badge badge-primary" style={{ fontSize: '0.72rem', fontWeight: 700 }}>{item.id}</span>
                        <span className={`badge ${badge.cls}`} style={{ fontSize: '0.72rem' }}>
                          {badge.icon}
                          {item.status}
                        </span>
                        <span className="badge badge-secondary" style={{ fontSize: '0.72rem' }}>{item.jenis}</span>
                      </div>
                    </div>

                    {/* Notulen & Kesepakatan Box */}
                    <div className="notulen-box">
                      <div className="notulen-box-header">
                        <span className="notulen-box-title">Notulen & Kesepakatan Pembinaan</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Pelaksanaan: {item.tanggalPelaksanaan && item.tanggalPelaksanaan !== '-' ? formatDateIndo(item.tanggalPelaksanaan) : formatDateIndo(item.tanggalUsulan)}
                        </span>
                      </div>
                      <p className="notulen-box-text">
                        {item.notulen && item.notulen !== 'Menunggu persetujuan tim pembina BPS.'
                          ? item.notulen
                          : 'Belum ada notulen resmi dari BPS.'}
                      </p>
                    </div>

                    {/* Multi-Photo Album Preview Bar */}
                    {photos.length > 0 && (
                      <div className="photo-preview-bar">
                        <div className="photo-thumbnails-grid">
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px', marginRight: '4px' }}>
                            <ImageIcon size={14} color="var(--primary)" />
                            Album ({photos.length})
                          </span>
                          {photos.slice(0, 4).map((pt, idx) => (
                            <div
                              key={pt.id || idx}
                              className="photo-thumbnail"
                              onClick={() => openLightboxAlbum(photos, idx, item)}
                              title="Klik untuk perbesar foto"
                            >
                              <img src={pt.url} alt={pt.caption || 'Dokumentasi'} />
                              {idx === 3 && photos.length > 4 && (
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.78rem' }}>
                                  +{photos.length - 3}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => openLightboxAlbum(photos, 0, item)}
                          style={{ background: 'none', border: 'none', color: 'var(--primary-hover)', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Lihat Carousel &rarr;
                        </button>
                      </div>
                    )}

                    {/* Bottom Metadata & Simplified Action Bar */}
                    <div className="riwayat-meta-bar">
                      <div style={{ display: 'flex', gap: '14px', fontSize: '0.78rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                        <span>Pembina: <strong style={{ color: 'var(--text-main)' }}>{item.pembinaBPS}</strong></span>
                        <span>PIC OPD: <strong style={{ color: 'var(--text-main)' }}>{item.namaPIC || item.perwakilanOPD}</strong></span>
                      </div>

                      <div className="riwayat-action-buttons">
                        {isBpsUser && (
                          <button
                            onClick={() => handleOpenCompleteModal(item)}
                            className="btn btn-outline-primary"
                            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                          >
                            <PlusCircle size={13} />
                            <span>Lengkapi Notulen</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleOpenUploadGalleryModal(item.id)}
                          className="btn btn-secondary"
                          style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                        >
                          <Upload size={13} />
                          <span>+ Upload Foto</span>
                        </button>

                        {isBpsUser && (
                          <button
                            type="button"
                            onClick={() => handleDeleteHistoryItem(item.id, item.topik, item.opdNama)}
                            className="btn btn-secondary"
                            style={{ padding: '6px 10px', fontSize: '0.78rem', color: '#ef4444' }}
                            title="Hapus Riwayat Pembinaan"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* TAB 2: GALERI FOTO DOKUMENTASI KEGIATAN */}
      {activeTabMode === 'gallery' && (
        <>
          {filteredGallery.length === 0 ? (
            <div className="glass-card empty-state">
              <div className="empty-state-icon"><ImageIcon size={24} /></div>
              <span className="empty-state-title">Belum ada foto dokumentasi galeri</span>
              <span className="empty-state-desc">Belum ada foto kegiatan pembinaan yang diunggah. Klik tombol "Upload Album Foto Galeri" di atas.</span>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {filteredGallery.map(photo => (
                <div key={photo.id} className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* Photo Container */}
                  <div
                    style={{ position: 'relative', width: '100%', height: '180px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                    onClick={() => openLightboxAlbum([photo], 0, photo)}
                  >
                    <img
                      src={photo.fotoUrl}
                      alt={photo.judulKegiatan}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    />
                    <div style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 2 }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>{photo.opdNama}</span>
                    </div>
                    <div style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 2 }}>
                      <span className="badge badge-info" style={{ fontSize: '0.68rem' }}>{formatDateIndo(photo.tanggal)}</span>
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)', opacity: 0, transition: 'opacity 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="photo-hover-overlay">
                      <Maximize2 size={24} color="#ffffff" />
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.3' }}>
                      {photo.judulKegiatan}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                      {photo.keterangan}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '6px', borderTop: '1px solid var(--border-color)' }}>
                    <button
                      onClick={() => openLightboxAlbum([photo], 0, photo)}
                      className="btn btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                    >
                      <Eye size={12} />
                      <span>Perbesar Foto</span>
                    </button>

                    {isBpsUser && (
                      <button
                        onClick={() => handleDeleteGalleryPhoto(photo.id)}
                        className="btn btn-secondary"
                        style={{ padding: '4px 8px', fontSize: '0.74rem', color: '#ef4444' }}
                        title="Hapus Foto"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal BPS Upload Multi-Foto Galeri */}
      <Modal
        isOpen={isUploadGalleryModalOpen}
        onClose={() => setIsUploadGalleryModalOpen(false)}
        title="Upload Album Foto Dokumentasi Kegiatan Pembinaan ke Galeri"
      >
        <form onSubmit={handleSaveGalleryPhotos}>
          {/* Dropdown Kegiatan Pembinaan Terkait */}
          <div className="form-group" style={{ background: 'rgba(59, 130, 246, 0.06)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <label className="form-label" style={{ fontWeight: 700, color: 'var(--primary-hover)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={16} />
              <span>Pilih Kegiatan Pembinaan yang Telah / Sedang Dilaksanakan</span>
            </label>
            <select
              className="form-select"
              style={{ fontWeight: 600 }}
              value={galleryFormData.pembinaanId}
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedPem = pembinaanList.find(p => p.id === selectedId);
                if (selectedPem) {
                  setGalleryFormData(prev => ({
                    ...prev,
                    pembinaanId: selectedPem.id,
                    judulKegiatan: selectedPem.topik,
                    opdId: selectedPem.opdId,
                    tanggal: selectedPem.tanggalPelaksanaan && selectedPem.tanggalPelaksanaan !== '-' ? selectedPem.tanggalPelaksanaan : selectedPem.tanggalUsulan,
                    keterangan: selectedPem.notulen && selectedPem.notulen !== 'Menunggu persetujuan tim pembina BPS.' ? selectedPem.notulen : `Dokumentasi kegiatan pembinaan ${selectedPem.jenis} bersama ${selectedPem.opdNama}`
                  }));
                } else {
                  setGalleryFormData(prev => ({
                    ...prev,
                    pembinaanId: '',
                    judulKegiatan: '',
                    keterangan: ''
                  }));
                }
              }}
            >
              <option value="">-- Pilih Kegiatan Pembinaan dari History --</option>
              {pembinaanList.map(pem => (
                <option key={pem.id} value={pem.id}>
                  [{pem.id}] {pem.opdNama} — {pem.topik} ({pem.status})
                </option>
              ))}
            </select>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              Memilih kegiatan akan otomatis mengisi judul, OPD, dan tanggal, serta menautkan foto ke album kegiatan & Berita Acara OPD terkait.
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">Nama / Judul Kegiatan Pembinaan</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Rapat Pembinaan Metadata Komoditas Pertanian 2026"
              value={galleryFormData.judulKegiatan}
              onChange={(e) => setGalleryFormData({ ...galleryFormData, judulKegiatan: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Instansi OPD Pelaksana</label>
              <select
                className="form-select"
                value={galleryFormData.opdId}
                onChange={(e) => setGalleryFormData({ ...galleryFormData, opdId: e.target.value })}
                required
              >
                {opdList.map(opd => (
                  <option key={opd.id} value={opd.id}>{opd.nama}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tanggal Pelaksanaan</label>
              <input
                type="date"
                className="form-input"
                value={galleryFormData.tanggal}
                onChange={(e) => setGalleryFormData({ ...galleryFormData, tanggal: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Keterangan / Notulen Singkat Foto</label>
            <textarea
              className="form-input"
              rows={2}
              placeholder="Jelaskan ringkasan dokumentasi foto kegiatan..."
              value={galleryFormData.keterangan}
              onChange={(e) => setGalleryFormData({ ...galleryFormData, keterangan: e.target.value })}
              required
            />
          </div>

          {/* Multi-Foto File Upload Input */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ImageIcon size={16} color="var(--primary)" />
              <span>Pilih Beberapa File Foto Dokumentasi (Multi-Upload)</span>
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="form-input"
              style={{ padding: '8px' }}
              onChange={handleMultiPhotoUploadGallery}
              required={galleryFormData.photos.length === 0}
            />
          </div>

          {/* Multi-Foto Preview Grid */}
          {galleryFormData.photos.length > 0 && (
            <div style={{ marginTop: '10px', background: 'var(--bg-surface)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                Pratinjau {galleryFormData.photos.length} Foto Terpilih:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: '6px' }}>
                {galleryFormData.photos.map((pt, idx) => (
                  <div key={idx} style={{ position: 'relative', width: '100%', height: '60px', borderRadius: '4px', overflow: 'hidden' }}>
                    <img src={pt.url} alt={pt.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
            <button type="button" onClick={() => setIsUploadGalleryModalOpen(false)} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Upload size={15} />
              <span>Simpan {galleryFormData.photos.length} Foto ke Galeri</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal BPS Lengkapi History (Multi-Foto Upload) */}
      <Modal
        isOpen={isCompleteModalOpen}
        onClose={() => { setIsCompleteModalOpen(false); setTargetItem(null); }}
        title={`Lengkapi Notulen & Album Foto Pembinaan BPS - (${targetItem?.id})`}
      >
        {targetItem && (
          <form onSubmit={handleSaveCompletion}>
            <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '1rem', fontSize: '0.82rem' }}>
              <p style={{ fontWeight: 700, color: 'var(--primary-hover)' }}>{targetItem.opdNama}</p>
              <p style={{ color: 'var(--text-main)', marginTop: '2px' }}><strong>Topik:</strong> {targetItem.topik}</p>
            </div>

            <div className="form-group">
              <label className="form-label">Notula Kesepakatan & Hasil Pembinaan</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="Tuliskan poin-poin kesepakatan indikator, rekomendasi BPS, dan hasil rapat..."
                value={completionData.notulen}
                onChange={(e) => setCompletionData({ ...completionData, notulen: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Catatan & Arahan Tambahan BPS</label>
              <input
                type="text"
                className="form-input"
                placeholder="Catatan tindak lanjut untuk OPD..."
                value={completionData.catatanBps}
                onChange={(e) => setCompletionData({ ...completionData, catatanBps: e.target.value })}
              />
            </div>

            {/* Input File Upload: Multi-Foto Dokumentasi */}
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', justify: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ImageIcon size={16} color="var(--primary)" />
                  <span>Upload Album Foto Dokumentasi Kegiatan (Bisa Pilih Banyak Foto)</span>
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {completionData.fotoList.length} Foto Terunggah
                </span>
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="form-input"
                style={{ padding: '8px' }}
                onChange={handleMultiPhotoFileChange}
              />

              {completionData.fotoList.length > 0 && (
                <div style={{ marginTop: '10px', background: 'var(--bg-surface)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                    Daftar Foto Album Terpilih ({completionData.fotoList.length}):
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '8px' }}>
                    {completionData.fotoList.map((pt, idx) => (
                      <div key={pt.id || idx} style={{ position: 'relative', width: '100%', height: '65px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                        <img src={pt.url} alt={pt.fileName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                          type="button"
                          onClick={() => handleRemovePhotoFromCompletion(idx)}
                          style={{
                            position: 'absolute',
                            top: '2px',
                            right: '2px',
                            background: 'rgba(239, 68, 68, 0.85)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '18px',
                            height: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          title="Hapus foto ini"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input File Upload: File Notulen / BA PDF */}
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileCheck size={16} color="var(--primary)" />
                <span>Upload Berkas Notulen / Berita Acara (PDF / Word)</span>
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="form-input"
                style={{ padding: '8px' }}
                onChange={handleNotulenFileChange}
              />
              {completionData.notulenFileName && (
                <p style={{ fontSize: '0.78rem', color: 'var(--primary-hover)', marginTop: '4px', fontWeight: 600 }}>
                  Berkas terpilih: {completionData.notulenFileName}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginTop: '1.25rem' }}>
              <div>
                {targetItem.notulen && targetItem.notulen !== 'Menunggu persetujuan tim pembina BPS.' && (
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteNotulenOnly(targetItem.id, targetItem.topik);
                      setIsCompleteModalOpen(false);
                      setTargetItem(null);
                    }}
                    className="btn btn-secondary"
                    style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', padding: '6px 12px', fontSize: '0.78rem' }}
                  >
                    <Trash2 size={13} />
                    <span>Hapus Notulen & BA</span>
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" onClick={() => { setIsCompleteModalOpen(false); setTargetItem(null); }} className="btn btn-secondary">
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  <Upload size={15} />
                  <span>Upload & Simpan History ({completionData.fotoList.length} Foto)</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </Modal>

      {/* Lightbox Carousel Modal Multi-Foto */}
      <Modal isOpen={!!lightboxAlbum} onClose={() => setLightboxAlbum(null)} title="Pratinjau Album Foto Dokumentasi Kegiatan">
        {lightboxAlbum && lightboxAlbum.photos.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            {/* Main Slide Carousel Container */}
            <div style={{ position: 'relative', width: '100%', height: '360px', background: '#090d16', borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={lightboxAlbum.photos[lightboxAlbum.currentIndex]?.url}
                alt={lightboxAlbum.photos[lightboxAlbum.currentIndex]?.caption || lightboxAlbum.title}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />

              {/* Prev/Next Navigation Controls */}
              {lightboxAlbum.photos.length > 1 && (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(15, 23, 42, 0.75)',
                      color: '#ffffff',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(4px)'
                    }}
                    title="Foto Sebelumnya"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={handleNextPhoto}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(15, 23, 42, 0.75)',
                      color: '#ffffff',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(4px)'
                    }}
                    title="Foto Selanjutnya"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Index Indicator Counter */}
              <div style={{ position: 'absolute', bottom: '10px', right: '12px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '0.74rem', fontWeight: 700 }}>
                Foto {lightboxAlbum.currentIndex + 1} dari {lightboxAlbum.photos.length}
              </div>
            </div>

            {/* Thumbnail Strip for Carousel */}
            {lightboxAlbum.photos.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', width: '100%', padding: '4px 0' }}>
                {lightboxAlbum.photos.map((pt, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxAlbum(prev => ({ ...prev, currentIndex: idx }))}
                    style={{
                      width: '60px',
                      height: '42px',
                      flexShrink: 0,
                      borderRadius: '4px',
                      overflow: 'hidden',
                      border: idx === lightboxAlbum.currentIndex ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      opacity: idx === lightboxAlbum.currentIndex ? 1 : 0.6,
                      cursor: 'pointer'
                    }}
                  >
                    <img src={pt.url} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Photo Metadata Info */}
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span className="badge badge-primary">{lightboxAlbum.opdNama}</span>
                {lightboxAlbum.tanggal && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatDateIndo(lightboxAlbum.tanggal)}</span>
                )}
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>{lightboxAlbum.title}</h3>
              {lightboxAlbum.photos[lightboxAlbum.currentIndex]?.caption && (
                <p style={{ fontSize: '0.86rem', color: 'var(--primary-hover)', fontWeight: 700, marginTop: '4px' }}>
                  Keterangan Foto: {lightboxAlbum.photos[lightboxAlbum.currentIndex].caption}
                </p>
              )}
              {lightboxAlbum.keterangan && (
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  {lightboxAlbum.keterangan}
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
