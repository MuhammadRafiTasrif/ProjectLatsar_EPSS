import React, { useState } from 'react';
import Modal from '../components/Modal';
import StatCard from '../components/StatCard';
import {
  Building2,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Search,
  Plus,
  Sliders,
  Filter,
  MessageSquare,
  FileText,
  Save,
  Building,
  RotateCcw,
  X
} from 'lucide-react';

export default function Dashboard({
  opdList = [],
  setOpdList,
  pembinaanList = [],
  komprominList = [],
  setKomprominList,
  currentRole,
  currentPermissions,
  onNavigate
}) {
  const isBpsAdmin =
    currentRole?.id === 'role-admin' ||
    currentRole?.id === 'role-ketua-tim' ||
    Boolean(currentPermissions?.approvePembinaan);

  // Filters state
  const [filterOpd, setFilterOpd] = useState('ALL');
  const [filterTahun, setFilterTahun] = useState('ALL');
  const [filterPublikasi, setFilterPublikasi] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal Update Progres Kompromin State
  const [isUpdateProgressModalOpen, setIsUpdateProgressModalOpen] = useState(false);
  const [editingKompromin, setEditingKompromin] = useState(null);
  const [progressFormData, setProgressFormData] = useState({
    opdId: '',
    opdNama: '',
    namaKompromin: '',
    tahun: 2026,
    perencanaanData: 'Belum',
    pengumpulanData: 'Belum',
    pemeriksaanData: 'Belum',
    publikasiData: 'Belum',
    catatan: ''
  });

  // Modal Create Kompromin Baru State
  const [isCreateKomprominModalOpen, setIsCreateKomprominModalOpen] = useState(false);

  // Calculate Progress Percentage for a Kompromin item (25% per completed stage)
  const calculateProgress = (item) => {
    let pct = 0;
    if (item.perencanaanData === 'Selesai') pct += 25;
    if (item.pengumpulanData === 'Selesai') pct += 25;
    if (item.pemeriksaanData === 'Selesai') pct += 25;
    if (item.publikasiData === 'Telah Terverifikasi') pct += 25;
    return pct;
  };

  const renderStageBadge = (val) => {
    if (val === 'Selesai' || val === 'Telah Terverifikasi') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justify: 'center',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.14)',
            color: '#059669',
            margin: '0 auto'
          }}
          title={val}
        >
          <CheckCircle2 size={15} />
        </span>
      );
    }
    if (val === 'Proses') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justify: 'center',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'rgba(245, 158, 11, 0.14)',
            color: '#d97706',
            margin: '0 auto'
          }}
          title="Dalam Proses"
        >
          <Clock size={14} />
        </span>
      );
    }
    return (
      <span style={{ color: 'var(--text-muted)', opacity: 0.4, fontSize: '0.85rem', fontWeight: 700 }} title="Belum">
        -
      </span>
    );
  };

  const getProgressBarColor = (pct) => {
    if (pct === 100) return '#10b981';
    if (pct >= 75) return '#0284c7';
    if (pct >= 50) return '#f59e0b';
    if (pct >= 25) return '#6366f1';
    return '#9ca3af';
  };

  // KPI Calculations based on Kompromin Items
  const totalMasterOpd = opdList.length;
  const totalKomprominCount = komprominList.length;

  const komprominPerencanaanCount = komprominList.filter(
    k => k.perencanaanData === 'Proses' || k.perencanaanData === 'Belum'
  ).length;

  const komprominPengumpulanCount = komprominList.filter(
    k => k.pengumpulanData === 'Proses'
  ).length;

  const komprominPemeriksaanCount = komprominList.filter(
    k => k.pemeriksaanData === 'Proses'
  ).length;

  const komprominTerverifikasiCount = komprominList.filter(
    k => k.publikasiData === 'Telah Terverifikasi'
  ).length;

  // Chart calculation
  const komprominTerbit = komprominTerverifikasiCount;
  const komprominReview = komprominList.filter(k => k.publikasiData === 'Proses' || k.pemeriksaanData === 'Proses').length;
  const chartTotal = (komprominTerbit + komprominReview) || 1;
  const pctTerverifikasi = Math.round((komprominTerbit / chartTotal) * 100);
  const pctReview = Math.round((komprominReview / chartTotal) * 100);

  // Filtered Kompromin List for Table
  const filteredKomprominList = komprominList.filter((item) => {
    if (filterOpd !== 'ALL' && item.opdId !== filterOpd) return false;
    if (filterTahun !== 'ALL' && String(item.tahun) !== String(filterTahun)) return false;
    if (filterPublikasi !== 'ALL' && item.publikasiData !== filterPublikasi) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchOpd = (item.opdNama || '').toLowerCase().includes(q);
      const matchJudul = (item.namaKompromin || '').toLowerCase().includes(q);
      const matchCatatan = (item.catatan || '').toLowerCase().includes(q);
      if (!matchOpd && !matchJudul && !matchCatatan) return false;
    }

    return true;
  });

  const isFiltered = filterOpd !== 'ALL' || filterTahun !== 'ALL' || filterPublikasi !== 'ALL' || searchTerm.trim() !== '';

  const handleResetFilters = () => {
    setFilterOpd('ALL');
    setFilterTahun('ALL');
    setFilterPublikasi('ALL');
    setSearchTerm('');
  };

  // Handlers for Update Progress Modal
  const handleOpenUpdateProgress = (komprominItem) => {
    setEditingKompromin(komprominItem);
    setProgressFormData({
      opdId: komprominItem.opdId || '',
      opdNama: komprominItem.opdNama || '',
      namaKompromin: komprominItem.namaKompromin || '',
      tahun: komprominItem.tahun || 2026,
      perencanaanData: komprominItem.perencanaanData || 'Belum',
      pengumpulanData: komprominItem.pengumpulanData || 'Belum',
      pemeriksaanData: komprominItem.pemeriksaanData || 'Belum',
      publikasiData: komprominItem.publikasiData || 'Belum',
      catatan: komprominItem.catatan || ''
    });
    setIsUpdateProgressModalOpen(true);
  };

  const handleSaveProgressUpdate = (e) => {
    e.preventDefault();
    if (!editingKompromin || !setKomprominList) return;

    const newPub = progressFormData.publikasiData;
    const statusVer = newPub === 'Telah Terverifikasi' ? 'Terverifikasi' : 'Dalam Review';

    const updated = komprominList.map((k) => {
      if (k.id === editingKompromin.id) {
        return {
          ...k,
          namaKompromin: progressFormData.namaKompromin.trim(),
          tahun: Number(progressFormData.tahun),
          perencanaanData: progressFormData.perencanaanData,
          pengumpulanData: progressFormData.pengumpulanData,
          pemeriksaanData: progressFormData.pemeriksaanData,
          publikasiData: newPub,
          catatan: progressFormData.catatan,
          statusVerifikasi: statusVer
        };
      }
      return k;
    });

    setKomprominList(updated);
    setIsUpdateProgressModalOpen(false);
    alert(`Progres Kompromin "${progressFormData.namaKompromin}" berhasil diperbarui!`);
  };

  // Handlers for Add New Kompromin Modal
  const handleOpenCreateKompromin = () => {
    const defaultOpd = opdList[0] || { id: 'opd-1', nama: 'Dinas Kesehatan Kabupaten Pasaman' };
    setProgressFormData({
      opdId: defaultOpd.id,
      opdNama: defaultOpd.nama,
      namaKompromin: '',
      tahun: 2026,
      perencanaanData: 'Belum',
      pengumpulanData: 'Belum',
      pemeriksaanData: 'Belum',
      publikasiData: 'Belum',
      catatan: ''
    });
    setIsCreateKomprominModalOpen(true);
  };

  const handleSaveCreateKompromin = (e) => {
    e.preventDefault();
    if (!progressFormData.namaKompromin.trim()) {
      alert('Nama Kompromin wajib diisi!');
      return;
    }

    const selectedOpdObj = opdList.find(o => o.id === progressFormData.opdId);
    const opdNama = selectedOpdObj ? selectedOpdObj.nama : progressFormData.opdNama;

    const newPub = progressFormData.publikasiData;
    const statusVer = newPub === 'Telah Terverifikasi' ? 'Terverifikasi' : 'Draft OPD';

    const newItem = {
      id: `komp-${Date.now()}`,
      opdId: progressFormData.opdId,
      opdNama: opdNama,
      namaKompromin: progressFormData.namaKompromin.trim(),
      tahun: Number(progressFormData.tahun),
      perencanaanData: progressFormData.perencanaanData,
      pengumpulanData: progressFormData.pengumpulanData,
      pemeriksaanData: progressFormData.pemeriksaanData,
      publikasiData: newPub,
      catatan: progressFormData.catatan,
      statusVerifikasi: statusVer,
      nomorSk: '-',
      tanggalTerbit: newPub === 'Telah Terverifikasi' ? new Date().toISOString().split('T')[0] : '-',
      jumlahTabel: 12,
      ringkasan: `Kompilasi data ${progressFormData.namaKompromin} Kabupaten Pasaman tahun ${progressFormData.tahun}.`,
      coverUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80',
      fileUrl: '/docs/kompromin_baru.pdf'
    };

    if (setKomprominList) {
      setKomprominList([newItem, ...komprominList]);
    }
    setIsCreateKomprominModalOpen(false);
    alert(`Kompromin baru "${newItem.namaKompromin}" berhasil ditambahkan untuk ${opdNama}.`);
  };

  // Live preview percentage calculation in progress edit modal
  const modalLivePct = (() => {
    let p = 0;
    if (progressFormData.perencanaanData === 'Selesai') p += 25;
    if (progressFormData.pengumpulanData === 'Selesai') p += 25;
    if (progressFormData.pemeriksaanData === 'Selesai') p += 25;
    if (progressFormData.publikasiData === 'Telah Terverifikasi') p += 25;
    return p;
  })();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '2rem' }}>
      {/* Header Banner */}
      <div className="riwayat-header-banner">
        <div className="riwayat-header-title">
          <h2>Dashboard Pembinaan Kompromin</h2>
          <p>
            Monitoring tahapan penyusunan Kompromin per Organisasi Perangkat Daerah (OPD) Kabupaten Pasaman.
          </p>
        </div>

        {isBpsAdmin && (
          <button
            onClick={handleOpenCreateKompromin}
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.84rem' }}
          >
            <Plus size={15} />
            <span>+ Tambah Kompromin Baru</span>
          </button>
        )}
      </div>

      {/* Top Summary Metrics: Total Master OPD & Total Kompromin */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <StatCard
          title="Total Master OPD"
          value={totalMasterOpd}
          subtext="OPD Terdaftar"
          icon={Building2}
          color="#2563eb"
          onClick={() => onNavigate && onNavigate('masterOpd')}
        />
        <StatCard
          title="Total Kompromin"
          value={totalKomprominCount}
          subtext="Seluruh OPD"
          icon={FileText}
          color="#8b5cf6"
          onClick={() => onNavigate && onNavigate('kompromin')}
        />
      </div>

      {/* 4 Tahapan Penyusunan Kompromin */}
      <div>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
          Tahapan Penyusunan Kompromin
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <StatCard
            title="Tahap Perencanaan"
            value={komprominPerencanaanCount}
            subtext="Perencanaan Data"
            icon={FileSpreadsheet}
            color="#3b82f6"
          />
          <StatCard
            title="Tahap Pengumpulan"
            value={komprominPengumpulanCount}
            subtext="Pengumpulan Data"
            icon={Clock}
            color="#f59e0b"
          />
          <StatCard
            title="Tahap Pemeriksaan"
            value={komprominPemeriksaanCount}
            subtext="Pemeriksaan Data"
            icon={FileText}
            color="#ec4899"
          />
          <StatCard
            title="Telah Terverifikasi"
            value={komprominTerverifikasiCount}
            subtext="Siap Diterbitkan"
            icon={CheckCircle2}
            color="#10b981"
            onClick={() => onNavigate && onNavigate('kompromin')}
          />
        </div>
      </div>

      {/* Main Monitoring Table Section */}
      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Tabel Progres Pembuatan Kompromin per OPD
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Pantau 4 tahapan penyusunan Kompromin. Klik <strong>Update Progres</strong> untuk mengubah status tahapan.
              </p>
            </div>
          </div>

          {/* Control Bar: Search & Filters Toolbar */}
          <div className="riwayat-controls-bar" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Search Input Box */}
            <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: '320px' }}>
              <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-input"
                placeholder="Cari OPD atau Nama Kompromin..."
                style={{ paddingLeft: '32px', paddingRight: searchTerm ? '30px' : '10px', fontSize: '0.8rem', height: '36px', borderRadius: 'var(--radius-md)' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', padding: 0 }}
                  title="Hapus pencarian"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Filter Dropdowns & Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '2px' }}>
                <Filter size={13} />
                <span>Filter:</span>
              </div>

              <select
                className="form-select"
                style={{ width: '185px', fontSize: '0.8rem', height: '36px', borderRadius: 'var(--radius-md)', textOverflow: 'ellipsis' }}
                value={filterOpd}
                onChange={(e) => setFilterOpd(e.target.value)}
                title="Filter Instansi OPD"
              >
                <option value="ALL">Semua Instansi OPD ({totalMasterOpd})</option>
                {opdList.map((opd) => (
                  <option key={opd.id} value={opd.id}>
                    {opd.nama}
                  </option>
                ))}
              </select>

              <select
                className="form-select"
                style={{ width: '120px', fontSize: '0.8rem', height: '36px', borderRadius: 'var(--radius-md)' }}
                value={filterTahun}
                onChange={(e) => setFilterTahun(e.target.value)}
                title="Filter Tahun"
              >
                <option value="ALL">Semua Tahun</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>

              <select
                className="form-select"
                style={{ width: '155px', fontSize: '0.8rem', height: '36px', borderRadius: 'var(--radius-md)' }}
                value={filterPublikasi}
                onChange={(e) => setFilterPublikasi(e.target.value)}
                title="Filter Status Publikasi"
              >
                <option value="ALL">Semua Status</option>
                <option value="Telah Terverifikasi">Telah Terverifikasi</option>
                <option value="Proses">Proses</option>
                <option value="Belum">Belum</option>
              </select>

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="btn btn-secondary"
                  style={{ height: '36px', padding: '0 10px', fontSize: '0.78rem', gap: '5px', whiteSpace: 'nowrap' }}
                  title="Reset Filter & Pencarian"
                >
                  <RotateCcw size={13} />
                  <span>Reset ({filteredKomprominList.length})</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table className="custom-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: '35px', padding: '8px 4px', textAlign: 'center' }}>No</th>
                <th style={{ width: '28%', padding: '8px 6px' }}>Instansi OPD & Nama Kompromin</th>
                <th style={{ width: '6%', padding: '8px 4px', textAlign: 'center' }}>Tahun</th>
                <th style={{ width: '10%', padding: '8px 4px', textAlign: 'center' }}>Perencanaan</th>
                <th style={{ width: '10%', padding: '8px 4px', textAlign: 'center' }}>Pengumpulan</th>
                <th style={{ width: '10%', padding: '8px 4px', textAlign: 'center' }}>Pemeriksaan</th>
                <th style={{ width: '10%', padding: '8px 4px', textAlign: 'center' }}>Publikasi</th>
                <th style={{ width: '11%', padding: '8px 6px' }}>Progres</th>
                <th style={{ width: '8%', padding: '8px 4px', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredKomprominList.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    Tidak ditemukan data Progres Kompromin yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredKomprominList.map((item, idx) => {
                  const pct = calculateProgress(item);
                  const barColor = getProgressBarColor(pct);

                  return (
                    <tr key={item.id}>
                      <td style={{ textAlign: 'center', padding: '8px 4px', fontSize: '0.78rem' }}>{idx + 1}</td>
                      <td style={{ padding: '8px 6px' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--text-main)' }}>
                          {item.opdNama}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--primary-hover)', fontWeight: 600, marginTop: '2px', lineHeight: '1.3' }}>
                          {item.namaKompromin}
                        </div>
                        {item.catatan && (
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '2px' }}>
                            Catatan: {item.catatan}
                          </div>
                        )}
                      </td>
                      <td style={{ textAlign: 'center', padding: '8px 4px', fontWeight: 700, fontSize: '0.8rem' }}>
                        {item.tahun || 2026}
                      </td>
                      <td style={{ textAlign: 'center', padding: '8px 4px' }}>
                        {renderStageBadge(item.perencanaanData || 'Belum')}
                      </td>
                      <td style={{ textAlign: 'center', padding: '8px 4px' }}>
                        {renderStageBadge(item.pengumpulanData || 'Belum')}
                      </td>
                      <td style={{ textAlign: 'center', padding: '8px 4px' }}>
                        {renderStageBadge(item.pemeriksaanData || 'Belum')}
                      </td>
                      <td style={{ textAlign: 'center', padding: '8px 4px' }}>
                        {renderStageBadge(item.publikasiData || 'Belum')}
                      </td>
                      <td style={{ padding: '8px 6px', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ flex: 1, height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: barColor, borderRadius: '3px', transition: 'width 0.3s ease' }} />
                          </div>
                          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: barColor, minWidth: '34px', textAlign: 'right' }}>
                            {pct}%
                          </span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center', padding: '6px 4px' }}>
                        {isBpsAdmin ? (
                          <button
                            onClick={() => handleOpenUpdateProgress(item)}
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                            title="Update Progres Tahapan Kompromin Ini"
                          >
                            <Sliders size={12} />
                            <span>Edit</span>
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Baca</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Update Progres Kompromin */}
      <Modal
        isOpen={isUpdateProgressModalOpen}
        onClose={() => setIsUpdateProgressModalOpen(false)}
        title="Update Progres Pembuatan Kompromin"
      >
        {editingKompromin && (
          <form onSubmit={handleSaveProgressUpdate}>
            <div style={{ background: 'var(--primary-light)', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: '1rem', border: '1px solid var(--primary-border)' }}>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>OPD Penanggung Jawab:</div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                {editingKompromin.opdNama}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Nama Kompromin *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Statistik Produksi Padi Pasaman"
                  value={progressFormData.namaKompromin}
                  onChange={(e) => setProgressFormData({ ...progressFormData, namaKompromin: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tahun *</label>
                <input
                  type="number"
                  className="form-input"
                  value={progressFormData.tahun}
                  onChange={(e) => setProgressFormData({ ...progressFormData, tahun: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Perencanaan Data</label>
                <select
                  className="form-select"
                  value={progressFormData.perencanaanData}
                  onChange={(e) => setProgressFormData({ ...progressFormData, perencanaanData: e.target.value })}
                  required
                >
                  <option value="Belum">Belum</option>
                  <option value="Proses">Proses</option>
                  <option value="Selesai">Selesai (+25%)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Pengumpulan Data</label>
                <select
                  className="form-select"
                  value={progressFormData.pengumpulanData}
                  onChange={(e) => setProgressFormData({ ...progressFormData, pengumpulanData: e.target.value })}
                  required
                >
                  <option value="Belum">Belum</option>
                  <option value="Proses">Proses</option>
                  <option value="Selesai">Selesai (+25%)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Pemeriksaan Data</label>
                <select
                  className="form-select"
                  value={progressFormData.pemeriksaanData}
                  onChange={(e) => setProgressFormData({ ...progressFormData, pemeriksaanData: e.target.value })}
                  required
                >
                  <option value="Belum">Belum</option>
                  <option value="Proses">Proses</option>
                  <option value="Selesai">Selesai (+25%)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Publikasi</label>
                <select
                  className="form-select"
                  value={progressFormData.publikasiData}
                  onChange={(e) => setProgressFormData({ ...progressFormData, publikasiData: e.target.value })}
                  required
                >
                  <option value="Belum">Belum</option>
                  <option value="Proses">Proses</option>
                  <option value="Telah Terverifikasi">Telah Terverifikasi (+25%)</option>
                </select>
              </div>
            </div>

            {/* Live Progress Indicator */}
            <div style={{ background: 'var(--bg-surface)', padding: '10px 14px', borderRadius: 'var(--radius-md)', margin: '1rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Kalkulasi Persentase Progres Otomatis:
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.9rem', fontWeight: 800 }}>
                  {modalLivePct}%
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Catatan Pembinaan</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="Tuliskan catatan hasil pembinaan, rekomendasi, atau progres terkini..."
                value={progressFormData.catatan}
                onChange={(e) => setProgressFormData({ ...progressFormData, catatan: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
              <button type="button" onClick={() => setIsUpdateProgressModalOpen(false)} className="btn btn-secondary">
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                <Save size={15} />
                <span>Simpan Progres</span>
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Modal Form Tambah Kompromin Baru */}
      <Modal
        isOpen={isCreateKomprominModalOpen}
        onClose={() => setIsCreateKomprominModalOpen(false)}
        title="Tambah Kompromin Baru per OPD"
      >
        <form onSubmit={handleSaveCreateKompromin}>
          <div className="form-group">
            <label className="form-label">Pilih Instansi OPD Penanggung Jawab *</label>
            <select
              className="form-select"
              value={progressFormData.opdId}
              onChange={(e) => {
                const target = opdList.find(o => o.id === e.target.value);
                setProgressFormData({
                  ...progressFormData,
                  opdId: e.target.value,
                  opdNama: target ? target.nama : ''
                });
              }}
              required
            >
              {opdList.map((opd) => (
                <option key={opd.id} value={opd.id}>
                  {opd.nama} ({opd.kode})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Nama Kompromin yang Dibuat *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: Statistik Hortikultura Pasaman 2026"
                value={progressFormData.namaKompromin}
                onChange={(e) => setProgressFormData({ ...progressFormData, namaKompromin: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tahun Kompromin *</label>
              <input
                type="number"
                className="form-input"
                value={progressFormData.tahun}
                onChange={(e) => setProgressFormData({ ...progressFormData, tahun: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Perencanaan Data</label>
              <select
                className="form-select"
                value={progressFormData.perencanaanData}
                onChange={(e) => setProgressFormData({ ...progressFormData, perencanaanData: e.target.value })}
                required
              >
                <option value="Belum">Belum</option>
                <option value="Proses">Proses</option>
                <option value="Selesai">Selesai (+25%)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Pengumpulan Data</label>
              <select
                className="form-select"
                value={progressFormData.pengumpulanData}
                onChange={(e) => setProgressFormData({ ...progressFormData, pengumpulanData: e.target.value })}
                required
              >
                <option value="Belum">Belum</option>
                <option value="Proses">Proses</option>
                <option value="Selesai">Selesai (+25%)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Pemeriksaan Data</label>
              <select
                className="form-select"
                value={progressFormData.pemeriksaanData}
                onChange={(e) => setProgressFormData({ ...progressFormData, pemeriksaanData: e.target.value })}
                required
              >
                <option value="Belum">Belum</option>
                <option value="Proses">Proses</option>
                <option value="Selesai">Selesai (+25%)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Publikasi</label>
              <select
                className="form-select"
                value={progressFormData.publikasiData}
                onChange={(e) => setProgressFormData({ ...progressFormData, publikasiData: e.target.value })}
                required
              >
                <option value="Belum">Belum</option>
                <option value="Proses">Proses</option>
                <option value="Telah Terverifikasi">Telah Terverifikasi (+25%)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Catatan Pembinaan</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Tuliskan catatan pembinaan awal..."
              value={progressFormData.catatan}
              onChange={(e) => setProgressFormData({ ...progressFormData, catatan: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
            <button type="button" onClick={() => setIsCreateKomprominModalOpen(false)} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={15} />
              <span>Simpan Kompromin Baru</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
