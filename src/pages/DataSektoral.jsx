import React, { useState } from 'react';
import Modal from '../components/Modal';
import {
  Plus, Search, Trash2, Edit, Upload, FileCheck, Clock,
  CheckCircle2, Inbox, Building2, ChevronDown, ChevronUp,
  Send, Download, X, Database, LayoutGrid, Table2, Filter, RotateCcw, Eye, FileText
} from 'lucide-react';
import { formatDateIndo, formatBytes, compressImageFile } from '../utils/helpers';

// ── helpers ──────────────────────────────────────────────────────────────────

function progressBadge(periodes = []) {
  const total = periodes.length;
  const done = periodes.filter(p => p.status === 'Sudah Diinput').length;
  if (total === 0) return null;
  const pct = Math.round((done / total) * 100);
  const color = pct === 100 ? '#16a34a' : pct > 0 ? '#d97706' : '#6b7280';
  return { done, total, pct, color };
}

const KATEGORI_OPTIONS = [
  'Pertanian & Pangan', 'Kesehatan', 'Pendidikan', 'Infrastruktur & PUPR',
  'Komunikasi & TIK', 'Sosial & Kependudukan', 'Keuangan & APBD', 'Lainnya'
];

const cleanPeriodeNama = (name) => {
  if (!name) return '';
  return name
    .replace(/\s*\(.*?rilis.*?\)/gi, '')
    .replace(/\s*\(Rilis.*?\)/gi, '')
    .trim();
};

const getSingkatanPeriode = (name) => {
  if (!name) return '';
  const clean = cleanPeriodeNama(name);

  if (/Triwulan\s*(I|1)$/i.test(clean) || /TW\s*(I|1)$/i.test(clean)) return 'TW 1';
  if (/Triwulan\s*(II|2)$/i.test(clean) || /TW\s*(II|2)$/i.test(clean)) return 'TW 2';
  if (/Triwulan\s*(III|3)$/i.test(clean) || /TW\s*(III|3)$/i.test(clean)) return 'TW 3';
  if (/Triwulan\s*(IV|4)$/i.test(clean) || /TW\s*(IV|4)$/i.test(clean)) return 'TW 4';

  if (/Januari/i.test(clean)) return 'Jan';
  if (/Februari/i.test(clean)) return 'Feb';
  if (/Maret/i.test(clean)) return 'Mar';
  if (/April/i.test(clean)) return 'Apr';
  if (/Mei/i.test(clean)) return 'Mei';
  if (/Juni/i.test(clean)) return 'Jun';
  if (/Juli/i.test(clean)) return 'Jul';
  if (/Agustus/i.test(clean)) return 'Agu';
  if (/September/i.test(clean)) return 'Sep';
  if (/Oktober/i.test(clean)) return 'Okt';
  if (/November/i.test(clean)) return 'Nov';
  if (/Desember/i.test(clean)) return 'Des';

  if (/Tahunan/i.test(clean)) return 'Thn';

  return clean;
};

const PERIODE_TEMPLATES = {
  Triwulan: [
    { periodeId: 'tw-1', periodeNama: 'Triwulan 1' },
    { periodeId: 'tw-2', periodeNama: 'Triwulan 2' },
    { periodeId: 'tw-3', periodeNama: 'Triwulan 3' },
    { periodeId: 'tw-4', periodeNama: 'Triwulan 4' },
  ],
  Bulanan: Array.from({ length: 12 }, (_, i) => {
    const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    return { periodeId: `bln-${i + 1}`, periodeNama: months[i] };
  }),
  Tahunan: [{ periodeId: 'thn-1', periodeNama: 'Tahunan' }],
};

const emptyPeriodes = (jenisPeriode) =>
  (PERIODE_TEMPLATES[jenisPeriode] || PERIODE_TEMPLATES.Triwulan).map(p => ({
    ...p,
    status: 'Belum Diinput',
    nilaiData: '',
    dokumenUrl: '',
    dokumenName: '',
    catatanOpd: '',
    tanggalInput: '-',
    inputOleh: '-',
  }));

export default function DataSektoral({
  aliranDataList = [],
  setAliranDataList,
  opdList = [],
  currentRole,
  currentPermissions = {},
  currentUser,
}) {
  const isBpsUser =
    currentRole?.id === 'role-admin' ||
    currentRole?.id === 'role-ketua-tim';

  const userOpdId = currentUser?.opdId || '';
  const isOpdUser =
    currentRole?.id === 'role-produsen-opd' || currentRole?.id === 'role-walidata-opd';

  // ── filters ──
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpd, setFilterOpd] = useState(isOpdUser && userOpdId ? userOpdId : 'ALL');
  const [filterFrekuensi, setFilterFrekuensi] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterTahun, setFilterTahun] = useState('ALL');

  // ── view mode: 'kartu' | 'tabel' ──
  const [viewMode, setViewMode] = useState('kartu');

  // ── expanded card ──
  const [expandedId, setExpandedId] = useState(null);

  // ── detail modal (BPS & OPD for viewing data & downloading file) ──
  const [detailModal, setDetailModal] = useState(null); // { item, periode }

  // ── upload modal state (OPD) ──
  const [uploadModal, setUploadModal] = useState(null); // { itemId, periode }
  const [uploadForm, setUploadForm] = useState({ nilaiData: '', catatanOpd: '', fileName: '', fileInfo: '' });

  // ── add/edit request modal (BPS only) ──
  const [requestModal, setRequestModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [requestForm, setRequestForm] = useState({
    namaIndikator: '',
    deskripsi: '',
    opdId: opdList[0]?.id || '',
    tahun: new Date().getFullYear(),
    kategori: 'Pertanian & Pangan',
    jenisPeriode: 'Triwulan',
    tenggatWaktu: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  // ── filtered list ──
  const filteredList = aliranDataList.filter(item => {
    const matchSearch =
      (item.namaIndikator || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.opdNama || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchOpd = filterOpd === 'ALL' || item.opdId === filterOpd;
    const matchFrekuensi = filterFrekuensi === 'ALL' || (item.jenisPeriode || 'Triwulan') === filterFrekuensi;
    const matchTahun = filterTahun === 'ALL' || item.tahun === Number(filterTahun);

    let matchStatus = true;
    if (filterStatus === 'Lengkap') {
      matchStatus = (item.periodes || []).length > 0 && item.periodes.every(p => p.status === 'Sudah Diinput');
    } else if (filterStatus === 'Belum Lengkap') {
      matchStatus = (item.periodes || []).some(p => p.status !== 'Sudah Diinput');
    }

    return matchSearch && matchOpd && matchFrekuensi && matchTahun && matchStatus;
  });

  // ── handlers ──

  const handleOpenAdd = () => {
    setEditingItem(null);
    setRequestForm({
      namaIndikator: '',
      deskripsi: '',
      opdId: opdList[0]?.id || '',
      tahun: new Date().getFullYear(),
      kategori: 'Pertanian & Pangan',
      jenisPeriode: 'Triwulan',
      tenggatWaktu: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
    setRequestModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setRequestForm({
      namaIndikator: item.namaIndikator || '',
      deskripsi: item.deskripsi || '',
      opdId: item.opdId || (opdList[0]?.id || ''),
      tahun: item.tahun || new Date().getFullYear(),
      kategori: item.kategori || 'Pertanian & Pangan',
      jenisPeriode: item.jenisPeriode || 'Triwulan',
      tenggatWaktu: item.tenggatWaktu || '',
    });
    setRequestModal(true);
  };

  const handleSaveRequest = (e) => {
    e.preventDefault();
    const opdObj = opdList.find(o => o.id === requestForm.opdId);
    if (editingItem) {
      setAliranDataList(aliranDataList.map(it =>
        it.id === editingItem.id
          ? { ...it, ...requestForm, opdNama: opdObj?.nama || it.opdNama }
          : it
      ));
    } else {
      const newItem = {
        id: `ad-${Date.now()}`,
        ...requestForm,
        opdNama: opdObj?.nama || '',
        statusAktif: true,
        periodes: emptyPeriodes(requestForm.jenisPeriode),
      };
      setAliranDataList([newItem, ...aliranDataList]);
    }
    setRequestModal(false);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus permintaan data ini?')) {
      setAliranDataList(aliranDataList.filter(it => it.id !== id));
    }
  };

  const handleOpenUpload = (itemId, periode) => {
    setUploadModal({ itemId, periode });
    setUploadForm({
      nilaiData: periode.nilaiData || '',
      catatanOpd: periode.catatanOpd || '',
      fileName: periode.dokumenName || '',
      fileInfo: '',
    });
  };

  const handleSaveUpload = (e) => {
    e.preventDefault();
    const { itemId, periode } = uploadModal;
    setAliranDataList(aliranDataList.map(item => {
      if (item.id !== itemId) return item;
      return {
        ...item,
        periodes: item.periodes.map(p => {
          if (p.periodeId !== periode.periodeId) return p;
          return {
            ...p,
            nilaiData: uploadForm.nilaiData,
            catatanOpd: uploadForm.catatanOpd,
            dokumenName: uploadForm.fileName || p.dokumenName,
            dokumenUrl: uploadForm.fileName ? `/docs/${uploadForm.fileName}` : p.dokumenUrl,
            status: 'Sudah Diinput',
            tanggalInput: new Date().toLocaleString('id-ID'),
            inputOleh: currentUser?.nama || 'OPD',
          };
        }),
      };
    }));
    setUploadModal(null);
  };

  const handleDownloadBerkas = (periode, masterItem) => {
    if (!periode) return;
    const fileName = periode.dokumenName || `berkas_${masterItem?.namaIndikator || 'data'}_${cleanPeriodeNama(periode.periodeNama)}.pdf`;
    
    if (periode.dokumenUrl && (periode.dokumenUrl.startsWith('data:') || periode.dokumenUrl.startsWith('blob:'))) {
      const a = document.createElement('a');
      a.href = periode.dokumenUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      const content = `===========================================================\n` +
        `   DOKUMEN ALIRAN DATA STATISTIK SEKTORAL KAB. PASAMAN     \n` +
        `===========================================================\n\n` +
        `Nama Indikator    : ${masterItem?.namaIndikator || '-'}\n` +
        `Produsen OPD      : ${masterItem?.opdNama || '-'}\n` +
        `Kategori Sektor   : ${masterItem?.kategori || '-'}\n` +
        `Tahun             : ${masterItem?.tahun || '-'}\n` +
        `Periode           : ${cleanPeriodeNama(periode.periodeNama)} (${masterItem?.jenisPeriode || 'Triwulan'})\n` +
        `Status Pengisian  : ${periode.status || '-'}\n` +
        `Nilai / Data      : ${periode.nilaiData || 'Belum diisi'}\n` +
        `Nama Berkas       : ${fileName}\n` +
        `Tanggal Unggah    : ${periode.tanggalInput || '-'}\n` +
        `Petugas Penginput : ${periode.inputOleh || '-'}\n` +
        `Catatan Tambahan  : ${periode.catatanOpd || '-'}\n\n` +
        `-----------------------------------------------------------\n` +
        `Dokumen ini merupakan rekaman data dukung statistik sektoral terintegrasi SIMPONITAS BPS Kab. Pasaman.\n`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName.endsWith('.pdf') || fileName.endsWith('.xlsx') || fileName.endsWith('.csv') || fileName.endsWith('.docx')
        ? fileName
        : `${fileName}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterOpd(isOpdUser && userOpdId ? userOpdId : 'ALL');
    setFilterFrekuensi('ALL');
    setFilterStatus('ALL');
    setFilterTahun('ALL');
  };

  const isFiltered =
    searchTerm.trim() !== '' ||
    filterOpd !== (isOpdUser && userOpdId ? userOpdId : 'ALL') ||
    filterFrekuensi !== 'ALL' ||
    filterStatus !== 'ALL' ||
    filterTahun !== 'ALL';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* ── Header ── */}
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Aliran Data OPD
            </h2>
            <span className={`badge ${isBpsUser ? 'badge-primary' : 'badge-info'}`} style={{ fontSize: '0.72rem' }}>
              {isBpsUser ? 'Monitor BPS' : 'Pemenuhan OPD'}
            </span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
            {isBpsUser
              ? 'Kelola permintaan data sektoral ke OPD dan pantau pemenuhan berkas per periode (Bulanan, Triwulan, Tahunan).'
              : 'Lihat permintaan data dari BPS dan unggah berkas pemenuhan per periode (Bulanan, Triwulan, Tahunan).'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {isBpsUser && (
            <button onClick={handleOpenAdd} className="btn btn-primary">
              <Plus size={15} /><span>Tambah Permintaan Data</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="riwayat-controls-bar" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: '300px' }}>
          <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Cari indikator atau OPD..."
            style={{ paddingLeft: '32px', paddingRight: searchTerm ? '30px' : '10px', fontSize: '0.8rem', height: '36px', borderRadius: 'var(--radius-md)' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
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

        {/* Filter Dropdowns & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: '1 1 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '2px' }}>
            <Filter size={13} />
            <span>Filter:</span>
          </div>

          {isBpsUser && (
            <select
              className="form-select"
              style={{ width: '180px', fontSize: '0.8rem', height: '36px', borderRadius: 'var(--radius-md)', textOverflow: 'ellipsis' }}
              value={filterOpd}
              onChange={e => setFilterOpd(e.target.value)}
              title="Filter Instansi OPD"
            >
              <option value="ALL">Semua OPD ({opdList.length})</option>
              {opdList.map(opd => (
                <option key={opd.id} value={opd.id}>{opd.kode} — {opd.nama}</option>
              ))}
            </select>
          )}

          <select
            className="form-select"
            style={{ width: '150px', fontSize: '0.8rem', height: '36px', borderRadius: 'var(--radius-md)' }}
            value={filterFrekuensi}
            onChange={e => setFilterFrekuensi(e.target.value)}
            title="Filter Frekuensi Periode"
          >
            <option value="ALL">Semua Frekuensi</option>
            <option value="Triwulan">Triwulan</option>
            <option value="Bulanan">Bulanan</option>
            <option value="Tahunan">Tahunan</option>
          </select>

          <select
            className="form-select"
            style={{ width: '140px', fontSize: '0.8rem', height: '36px', borderRadius: 'var(--radius-md)' }}
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            title="Filter Status Pemenuhan"
          >
            <option value="ALL">Semua Status</option>
            <option value="Lengkap">Selesai (100%)</option>
            <option value="Belum Lengkap">Belum Lengkap</option>
          </select>

          <select
            className="form-select"
            style={{ width: '120px', fontSize: '0.8rem', height: '36px', borderRadius: 'var(--radius-md)' }}
            value={filterTahun}
            onChange={e => setFilterTahun(e.target.value)}
            title="Filter Tahun"
          >
            <option value="ALL">Semua Tahun</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>

          {isFiltered && (
            <button
              type="button"
              className="btn btn-secondary"
              style={{ height: '36px', padding: '0 10px', fontSize: '0.78rem', gap: '5px', whiteSpace: 'nowrap' }}
              onClick={handleResetFilters}
              title="Reset Filter"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}

          {/* View toggle */}
          <div style={{ display: 'flex', gap: '2px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', height: '36px', background: 'var(--bg-card)', padding: '2px', marginLeft: '4px' }}>
            <button
              onClick={() => setViewMode('kartu')}
              title="Tampilan Kartu"
              style={{
                padding: '0 10px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px',
                background: viewMode === 'kartu' ? 'var(--primary)' : 'transparent',
                color: viewMode === 'kartu' ? '#fff' : 'var(--text-muted)'
              }}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setViewMode('tabel')}
              title="Tampilan Tabel Monitoring"
              style={{
                padding: '0 10px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px',
                background: viewMode === 'tabel' ? 'var(--primary)' : 'transparent',
                color: viewMode === 'tabel' ? '#fff' : 'var(--text-muted)'
              }}
            >
              <Table2 size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      {filteredList.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-state-icon"><Inbox size={24} /></div>
          <span className="empty-state-title">Belum ada permintaan data</span>
          <span className="empty-state-desc">
            {isBpsUser
              ? 'Klik "Tambah Permintaan Data" untuk membuat permintaan baru ke OPD.'
              : 'Belum ada permintaan data yang ditujukan ke instansi Anda dengan filter yang dipilih.'}
          </span>
        </div>
      ) : viewMode === 'tabel' ? (
        /* ── Monitoring Matrix Table ── */
        <div className="glass-card" style={{ padding: '1.25rem', overflowX: 'auto' }}>
          <table className="custom-table" style={{ width: '100%', minWidth: '700px' }}>
            <thead>
              <tr>
                <th style={{ minWidth: '180px' }}>Indikator</th>
                <th style={{ minWidth: '130px' }}>OPD Penanggung Jawab</th>
                <th style={{ width: '90px', textAlign: 'center' }}>Frekuensi</th>
                <th style={{ width: '70px', textAlign: 'center' }}>Tahun</th>
                <th style={{ minWidth: '180px' }}>Status Periode</th>
                <th style={{ width: '110px', textAlign: 'center' }}>Progres</th>
                <th style={{ width: '80px', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map(item => {
                const prog = progressBadge(item.periodes);
                const jenis = item.jenisPeriode || 'Triwulan';

                return (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 700, fontSize: '0.83rem', color: 'var(--text-main)' }}>
                      <div>{item.namaIndikator}</div>
                      {item.kategori && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                          {item.kategori}
                        </span>
                      )}
                    </td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--primary-hover)', fontWeight: 600 }}>
                      {item.opdNama}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`badge ${jenis === 'Bulanan' ? 'badge-info' : jenis === 'Tahunan' ? 'badge-warning' : 'badge-primary'}`} style={{ fontSize: '0.7rem' }}>
                        {jenis}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 600, fontSize: '0.8rem' }}>
                      {item.tahun}
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center' }}>
                        {(item.periodes || []).map(p => {
                          const isDone = p.status === 'Sudah Diinput';
                          const canUpload = isOpdUser && Boolean(currentPermissions.manageDataSektoral);
                          const shortName = getSingkatanPeriode(p.periodeNama);
                          const fullName = cleanPeriodeNama(p.periodeNama);

                          return canUpload && !isDone ? (
                            <button
                              key={p.periodeId}
                              onClick={() => handleOpenUpload(item.id, p)}
                              className="btn btn-outline-primary"
                              style={{ padding: '2px 6px', fontSize: '0.68rem', gap: '3px' }}
                              title={`Upload ${fullName}`}
                            >
                              <Upload size={10} />
                              <span>{shortName}</span>
                            </button>
                          ) : (
                            <span
                              key={p.periodeId}
                              onClick={() => {
                                if (canUpload && !isDone) {
                                  handleOpenUpload(item.id, p);
                                } else {
                                  setDetailModal({ item, periode: p });
                                }
                              }}
                              className={`badge ${isDone ? 'badge-success' : 'badge-secondary'}`}
                              style={{
                                fontSize: '0.7rem',
                                padding: '3px 6px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                opacity: isDone ? 1 : 0.65
                              }}
                              title={isDone ? `${fullName}: Sudah Diinput (Klik untuk lihat & unduh berkas)` : `${fullName}: Belum Diinput`}
                            >
                              {isDone ? `✓ ${shortName}` : `- ${shortName}`}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {prog && (
                        <span className="badge" style={{
                          fontSize: '0.7rem',
                          background: prog.color + '20',
                          color: prog.color,
                          border: `1px solid ${prog.color}40`,
                          whiteSpace: 'nowrap'
                        }}>
                          {prog.done}/{prog.total} ({prog.pct}%)
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                        <button
                          onClick={() => {
                            setViewMode('kartu');
                            setExpandedId(item.id);
                          }}
                          className="btn btn-secondary"
                          style={{ padding: '4px 6px', fontSize: '0.72rem' }}
                          title="Lihat Rincian & Berkas"
                        >
                          <Eye size={12} />
                        </button>
                        {isBpsUser && (
                          <>
                            <button
                              onClick={() => handleOpenEdit(item)}
                              className="btn btn-secondary"
                              style={{ padding: '4px 6px', fontSize: '0.72rem' }}
                              title="Edit Permintaan"
                            >
                              <Edit size={12} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="btn btn-secondary"
                              style={{ padding: '4px 6px', fontSize: '0.72rem', color: '#ef4444' }}
                              title="Hapus Permintaan"
                            >
                              <Trash2 size={12} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Legend */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.74rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="badge badge-success" style={{ fontSize: '0.68rem', padding: '1px 5px' }}>✓ TW 1</span> Sudah diinput
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="badge badge-secondary" style={{ fontSize: '0.68rem', padding: '1px 5px' }}>- TW 1</span> Belum diinput
            </span>
            {isOpdUser && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary)' }}>
                <Upload size={12} /> Klik tombol upload untuk mengunggah berkas periode
              </span>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredList.map(item => {
            const prog = progressBadge(item.periodes);
            const isExpanded = expandedId === item.id;

            return (
              <div key={item.id} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Card Header Row */}
                <div
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '1rem 1.25rem', cursor: 'pointer', flexWrap: 'wrap'
                  }}
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'var(--primary-light)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <Database size={17} color="var(--primary)" />
                  </div>

                  <div style={{ flex: 1, minWidth: '160px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.93rem', color: 'var(--text-main)' }}>
                      {item.namaIndikator}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--primary-hover)', fontWeight: 600, marginTop: '2px' }}>
                      <Building2 size={11} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                      {item.opdNama}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{item.tahun}</span>
                    <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>{item.jenisPeriode}</span>
                    {prog && (
                      <span className="badge" style={{
                        fontSize: '0.7rem',
                        background: prog.color + '20',
                        color: prog.color,
                        border: `1px solid ${prog.color}40`
                      }}>
                        {prog.done}/{prog.total} periode
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
                    {isBpsUser && (
                      <>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="btn btn-outline-primary"
                          style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                          title="Edit"
                        >
                          <Edit size={12} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="btn btn-secondary"
                          style={{ padding: '4px 8px', fontSize: '0.72rem', color: '#ef4444' }}
                          title="Hapus"
                        >
                          <Trash2 size={12} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="btn btn-secondary"
                      style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                    >
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                {prog && (
                  <div style={{ height: '3px', background: 'var(--border-color)', margin: '0 1.25rem' }}>
                    <div style={{
                      height: '100%', width: `${prog.pct}%`,
                      background: prog.color, borderRadius: '99px', transition: 'width 0.4s ease'
                    }} />
                  </div>
                )}

                {/* Expanded panel */}
                {isExpanded && (
                  <div style={{
                    padding: '1rem 1.25rem',
                    borderTop: '1px solid var(--border-color)',
                    background: 'var(--bg-surface)'
                  }}>
                    {item.deskripsi && (
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
                        {item.deskripsi}
                      </p>
                    )}
                    {item.tenggatWaktu && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                        Tenggat: <strong style={{ color: 'var(--text-main)' }}>{formatDateIndo(item.tenggatWaktu)}</strong>
                      </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {(item.periodes || []).map(periode => {
                        const isDone = periode.status === 'Sudah Diinput';
                        const canUpload = isOpdUser && Boolean(currentPermissions.manageDataSektoral);
                        const cleanNama = cleanPeriodeNama(periode.periodeNama);
                        return (
                          <div
                            key={periode.periodeId}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '10px',
                              padding: '10px 12px', borderRadius: 'var(--radius-md)',
                              background: isDone ? 'rgba(22,163,74,0.07)' : 'var(--bg-card)',
                              border: `1px solid ${isDone ? 'rgba(22,163,74,0.2)' : 'var(--border-color)'}`,
                              flexWrap: 'wrap'
                            }}
                          >
                            {isDone
                              ? <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                              : <Clock size={16} color="#9ca3af" style={{ flexShrink: 0 }} />
                            }

                            <span style={{ fontWeight: 700, fontSize: '0.83rem', color: 'var(--text-main)', minWidth: '120px' }}>
                              {cleanNama}
                            </span>

                            <span style={{ fontSize: '0.8rem', color: isDone ? 'var(--text-main)' : 'var(--text-muted)', flex: 1 }}>
                              {isDone ? periode.nilaiData || '(berkas tersedia)' : 'Belum diisi'}
                            </span>

                            {isDone && periode.dokumenName && (
                              <button
                                type="button"
                                onClick={() => handleDownloadBerkas(periode, item)}
                                className="btn btn-secondary"
                                style={{ padding: '3px 8px', fontSize: '0.72rem', gap: '4px', color: 'var(--primary-hover)', fontWeight: 600 }}
                                title={`Unduh berkas: ${periode.dokumenName}`}
                              >
                                <Download size={11} color="var(--primary)" />
                                <span style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {periode.dokumenName}
                                </span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => setDetailModal({ item, periode })}
                              className="btn btn-secondary"
                              style={{ padding: '4px 8px', fontSize: '0.72rem', gap: '3px' }}
                              title="Lihat Detail & Catatan OPD"
                            >
                              <Eye size={12} />
                              <span>Detail</span>
                            </button>

                            {canUpload && (
                              <button
                                onClick={() => handleOpenUpload(item.id, periode)}
                                className={isDone ? 'btn btn-secondary' : 'btn btn-outline-primary'}
                                style={{ padding: '4px 10px', fontSize: '0.74rem', flexShrink: 0 }}
                              >
                                <Upload size={12} />
                                <span>{isDone ? 'Perbarui' : 'Upload'}</span>
                              </button>
                            )}

                            {isBpsUser && isDone && (
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                {periode.inputOleh} · {periode.tanggalInput}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Upload Modal (OPD) ── */}
      <Modal
        isOpen={Boolean(uploadModal)}
        onClose={() => setUploadModal(null)}
        title={`Upload Data — ${uploadModal?.periode?.periodeNama || ''}`}
      >
        {uploadModal && (
          <form onSubmit={handleSaveUpload}>
            <div className="form-group">
              <label className="form-label">Nilai / Ringkasan Data</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: 14.250 Ton, 1.435 Orang, Rp 45 Miliar"
                value={uploadForm.nilaiData}
                onChange={e => setUploadForm({ ...uploadForm, nilaiData: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Upload size={15} color="var(--primary)" />
                <span>Upload Berkas (PDF / Excel / CSV)</span>
              </label>
              <input
                type="file"
                accept=".pdf,.xlsx,.xls,.csv,.doc,.docx"
                className="form-input"
                style={{ padding: '8px' }}
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const res = await compressImageFile(file);
                    const info = res.isCompressed
                      ? `${file.name} ⚡ ${res.ratio}% (${formatBytes(res.compressedSize)})`
                      : `${file.name} (${formatBytes(file.size)})`;
                    setUploadForm(prev => ({ ...prev, fileName: file.name, fileInfo: info }));
                  }
                }}
              />
              {uploadForm.fileInfo && (
                <p style={{ fontSize: '0.78rem', color: 'var(--primary-hover)', marginTop: '4px', fontWeight: 600 }}>
                  {uploadForm.fileInfo}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Catatan OPD (Opsional)</label>
              <textarea
                className="form-input"
                rows={2}
                placeholder="Keterangan tambahan terkait data..."
                value={uploadForm.catatanOpd}
                onChange={e => setUploadForm({ ...uploadForm, catatanOpd: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
              <button type="button" onClick={() => setUploadModal(null)} className="btn btn-secondary">Batal</button>
              <button type="submit" className="btn btn-primary">
                <Send size={14} /><span>Kirim ke BPS</span>
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* ── Add / Edit Request Modal (BPS) ── */}
      <Modal
        isOpen={requestModal}
        onClose={() => { setRequestModal(false); setEditingItem(null); }}
        title={editingItem ? 'Edit Permintaan Data' : 'Tambah Permintaan Data ke OPD'}
      >
        <form onSubmit={handleSaveRequest}>
          <div className="form-group">
            <label className="form-label">Nama Indikator yang Dibutuhkan</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Jumlah Produksi Padi Sawah & Jagung"
              value={requestForm.namaIndikator}
              onChange={e => setRequestForm({ ...requestForm, namaIndikator: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Deskripsi / Kegunaan Data</label>
            <textarea
              className="form-input"
              rows={2}
              placeholder="Untuk kebutuhan penyusunan PDRB, DDA, publikasi statistik, dll..."
              value={requestForm.deskripsi}
              onChange={e => setRequestForm({ ...requestForm, deskripsi: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Target OPD</label>
              <select
                className="form-select"
                value={requestForm.opdId}
                onChange={e => setRequestForm({ ...requestForm, opdId: e.target.value })}
                required
              >
                {opdList.map(opd => (
                  <option key={opd.id} value={opd.id}>{opd.nama}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Kategori Sektor</label>
              <select
                className="form-select"
                value={requestForm.kategori}
                onChange={e => setRequestForm({ ...requestForm, kategori: e.target.value })}
              >
                {KATEGORI_OPTIONS.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Tahun</label>
              <input
                type="number"
                className="form-input"
                value={requestForm.tahun}
                onChange={e => setRequestForm({ ...requestForm, tahun: Number(e.target.value) })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Jenis Periode</label>
              <select
                className="form-select"
                value={requestForm.jenisPeriode}
                onChange={e => setRequestForm({ ...requestForm, jenisPeriode: e.target.value })}
              >
                <option value="Triwulan">Triwulan</option>
                <option value="Bulanan">Bulanan</option>
                <option value="Tahunan">Tahunan</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tenggat Waktu</label>
              <input
                type="date"
                className="form-input"
                value={requestForm.tenggatWaktu}
                onChange={e => setRequestForm({ ...requestForm, tenggatWaktu: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
            <button type="button" onClick={() => { setRequestModal(false); setEditingItem(null); }} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Send size={14} /><span>{editingItem ? 'Simpan Perubahan' : 'Kirim ke OPD'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* ── Detail & Document Preview Modal ── */}
      <Modal
        isOpen={Boolean(detailModal)}
        onClose={() => setDetailModal(null)}
        title={`Pratinjau Dokumen Aliran Data — ${cleanPeriodeNama(detailModal?.periode?.periodeNama)}`}
      >
        {detailModal && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {/* Top Status Badges */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <span className={`badge ${detailModal.periode.status === 'Sudah Diinput' ? 'badge-success' : 'badge-secondary'}`}>
                {detailModal.periode.status === 'Sudah Diinput' ? '✓ Berkas Terunggah' : '○ Belum Diisi'}
              </span>
              <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                {detailModal.item.kategori || 'Sektoral'}
              </span>
            </div>

            {/* Document Preview Sheet Box */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}>
              {/* Official Header */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Pemerintah Kabupaten Pasaman & BPS Pasaman
                </span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                  LEMBAR DATA SEKTORAL TERPADU
                </h4>
                <span style={{ fontSize: '0.74rem', color: 'var(--primary)', fontWeight: 700 }}>
                  SIMPONITAS — SISTEM INFORMASI PEMBINAAN STATISTIK SEKTORAL
                </span>
              </div>

              {/* Document Metadata Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
                <div style={{ background: 'var(--bg-card)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Nama Indikator:</span>
                  <strong style={{ color: 'var(--text-main)', fontSize: '0.82rem' }}>{detailModal.item.namaIndikator}</strong>
                </div>

                <div style={{ background: 'var(--bg-card)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Produsen Data (OPD):</span>
                  <strong style={{ color: 'var(--primary-hover)', fontSize: '0.82rem' }}>{detailModal.item.opdNama}</strong>
                </div>

                <div style={{ background: 'var(--bg-card)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Periode Pelaporan:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{cleanPeriodeNama(detailModal.periode.periodeNama)} {detailModal.item.tahun} ({detailModal.item.jenisPeriode || 'Triwulan'})</strong>
                </div>

                <div style={{ background: 'var(--bg-card)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Realisasi Nilai / Angka:</span>
                  <strong style={{ color: 'var(--accent-green)', fontSize: '0.9rem' }}>{detailModal.periode.nilaiData || '(Belum diinput)'}</strong>
                </div>
              </div>

              {/* File Information Box */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={18} color="var(--primary)" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>
                      {detailModal.periode.dokumenName || 'Belum Ada Lampiran Berkas'}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {detailModal.periode.status === 'Sudah Diinput'
                        ? `Diunggah oleh: ${detailModal.periode.inputOleh || 'Petugas OPD'} · ${detailModal.periode.tanggalInput || '-'}`
                        : 'Menunggu pengisian dari OPD'}
                    </span>
                  </div>
                </div>

                {detailModal.periode.status === 'Sudah Diinput' && (
                  <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                    ✓ Dokumen Valid
                  </span>
                )}
              </div>

              {/* OPD Notes / Description */}
              {detailModal.periode.catatanOpd && (
                <div style={{ marginTop: '10px', background: 'var(--bg-card)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>
                    Catatan Penjelasan dari OPD:
                  </span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', margin: 0, fontStyle: 'italic' }}>
                    "{detailModal.periode.catatanOpd}"
                  </p>
                </div>
              )}
            </div>

            {/* Footer Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" onClick={() => setDetailModal(null)} className="btn btn-secondary">
                Tutup
              </button>
              {detailModal.periode.status === 'Sudah Diinput' && (
                <button
                  type="button"
                  onClick={() => handleDownloadBerkas(detailModal.periode, detailModal.item)}
                  className="btn btn-primary"
                >
                  <Download size={14} />
                  <span>Unduh Dokumen Ini ({detailModal.periode.dokumenName || 'Berkas'})</span>
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
