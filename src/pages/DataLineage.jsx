import React, { useState } from 'react';
import DataLineageChart from '../components/DataLineageChart';
import Modal from '../components/Modal';
import {
  GitMerge,
  LayoutDashboard,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  FileCheck,
  Edit,
  Trash2,
  Eye,
  Upload,
  Download,
  Building2,
  Calendar,
  AlertCircle,
  FileText,
  History,
  Check,
  X,
  Layers,
  BarChart3,
  UserCheck,
  RotateCcw
} from 'lucide-react';
import { formatDateIndo, formatBytes, compressImageFile } from '../utils/helpers';

export default function DataLineage({
  aliranDataList = [],
  setAliranDataList,
  aliranHistory = [],
  setAliranHistory,
  opdList = [],
  currentRole,
  currentPermissions = {},
  currentUser
}) {
  const isBpsUser =
    currentRole?.id === 'role-admin' ||
    currentRole?.id === 'role-ketua-tim' ||
    Boolean(currentPermissions.approvePembinaan);

  // Helper to clean up release dates from period names (e.g., "Triwulan I (Rilis 5 Mei)" -> "Triwulan 1")
  const cleanPeriodeNama = (name) => {
    if (!name) return '';
    return name
      .replace(/\s*\(.*?rilis.*?\)/gi, '')
      .replace(/\s*\(Rilis.*?\)/gi, '')
      .trim();
  };

  // Helper to abbreviate period names for compact matrix badge display (e.g., TW 1, TW 2, TW 3, TW 4, Jan..Des, Thn)
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

  // Active sub-tab for BPS Admin: 'dashboard' | 'manajemen'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Filters state (Default filterJenisPeriode to 'Triwulan')
  const [filterOpd, setFilterOpd] = useState('ALL');
  const [filterTahun, setFilterTahun] = useState('ALL');
  const [filterJenisPeriode, setFilterJenisPeriode] = useState('Triwulan'); // Default to 'Triwulan'
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL' | 'Sudah Diinput' | 'Belum Diinput'
  const [searchTerm, setSearchTerm] = useState('');

  // Selected OPD for visualizer chart
  const [selectedOpdId, setSelectedOpdId] = useState(opdList[0]?.id || '');

  // Modals state
  const [isMasterModalOpen, setIsMasterModalOpen] = useState(false);
  const [editingMaster, setEditingMaster] = useState(null);

  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [targetTaskItem, setTargetTaskItem] = useState(null); // { master, period }

  const [detailModalItem, setDetailModalItem] = useState(null);

  // Master Form Data (Admin BPS CRUD)
  const [masterFormData, setMasterFormData] = useState({
    namaIndikator: '',
    deskripsi: '',
    opdId: opdList[0]?.id || '',
    tahun: new Date().getFullYear(),
    jenisPeriode: 'Triwulan', // 'Triwulan' | 'Bulanan' | 'Tahunan'
    bentukInput: 'Angka + Upload Dokumen',
    petunjukPengisian: '',
    tenggatWaktu: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    statusAktif: true
  });

  // OPD Task Input Form Data
  const [opdInputFormData, setOpdInputFormData] = useState({
    nilaiData: '',
    dokumenUrl: '',
    dokumenName: '',
    catatanOpd: ''
  });

  const resetMasterForm = () => {
    setMasterFormData({
      namaIndikator: '',
      deskripsi: '',
      opdId: opdList[0]?.id || '',
      tahun: new Date().getFullYear(),
      jenisPeriode: 'Triwulan',
      bentukInput: 'Angka + Upload Dokumen',
      petunjukPengisian: '',
      tenggatWaktu: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      statusAktif: true
    });
    setEditingMaster(null);
  };

  const handleOpenCreateMasterModal = () => {
    resetMasterForm();
    setIsMasterModalOpen(true);
  };

  const handleOpenEditMasterModal = (item) => {
    setEditingMaster(item);
    setMasterFormData({
      namaIndikator: item.namaIndikator || '',
      deskripsi: item.deskripsi || '',
      opdId: item.opdId || opdList[0]?.id || '',
      tahun: item.tahun || 2026,
      jenisPeriode: item.jenisPeriode || 'Triwulan',
      bentukInput: item.bentukInput || 'Angka + Upload Dokumen',
      petunjukPengisian: item.petunjukPengisian || '',
      tenggatWaktu: item.tenggatWaktu || new Date().toISOString().split('T')[0],
      statusAktif: item.statusAktif !== undefined ? item.statusAktif : true
    });
    setIsMasterModalOpen(true);
  };

  const generatePeriodesForType = (type) => {
    if (type === 'Bulanan') {
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      return months.map((m, idx) => ({
        periodeId: `bln-${idx + 1}`,
        periodeNama: m,
        status: 'Belum Diinput',
        nilaiData: '',
        dokumenUrl: '',
        dokumenName: '',
        catatanOpd: '',
        tanggalInput: '-',
        inputOleh: '-'
      }));
    }
    if (type === 'Tahunan') {
      return [
        { periodeId: 'thn-1', periodeNama: 'Tahunan (1 Tahun Penuh)', status: 'Belum Diinput', nilaiData: '', dokumenUrl: '', dokumenName: '', catatanOpd: '', tanggalInput: '-', inputOleh: '-' }
      ];
    }
    // Default Triwulan
    return [
      { periodeId: 'tw-1', periodeNama: 'Triwulan I', status: 'Belum Diinput', nilaiData: '', dokumenUrl: '', dokumenName: '', catatanOpd: '', tanggalInput: '-', inputOleh: '-' },
      { periodeId: 'tw-2', periodeNama: 'Triwulan II', status: 'Belum Diinput', nilaiData: '', dokumenUrl: '', dokumenName: '', catatanOpd: '', tanggalInput: '-', inputOleh: '-' },
      { periodeId: 'tw-3', periodeNama: 'Triwulan III', status: 'Belum Diinput', nilaiData: '', dokumenUrl: '', dokumenName: '', catatanOpd: '', tanggalInput: '-', inputOleh: '-' },
      { periodeId: 'tw-4', periodeNama: 'Triwulan IV', status: 'Belum Diinput', nilaiData: '', dokumenUrl: '', dokumenName: '', catatanOpd: '', tanggalInput: '-', inputOleh: '-' }
    ];
  };

  const handleSaveMasterAliranData = (e) => {
    e.preventDefault();
    const opdObj = opdList.find(o => o.id === masterFormData.opdId);
    const opdNama = opdObj ? opdObj.nama : 'Dinas Pemkab Pasaman';

    if (editingMaster) {
      // Update existing Aliran Data master definition
      const updatedList = aliranDataList.map(item => {
        if (item.id === editingMaster.id) {
          // If period type changed, generate new period structure, otherwise preserve existing inputs
          const periodTypeChanged = item.jenisPeriode !== masterFormData.jenisPeriode;
          const updatedPeriodes = periodTypeChanged
            ? generatePeriodesForType(masterFormData.jenisPeriode)
            : item.periodes;

          return {
            ...item,
            namaIndikator: masterFormData.namaIndikator,
            deskripsi: masterFormData.deskripsi,
            opdId: masterFormData.opdId,
            opdNama: opdNama,
            tahun: Number(masterFormData.tahun),
            jenisPeriode: masterFormData.jenisPeriode,
            bentukInput: masterFormData.bentukInput,
            petunjukPengisian: masterFormData.petunjukPengisian,
            tenggatWaktu: masterFormData.tenggatWaktu,
            statusAktif: masterFormData.statusAktif,
            periodes: updatedPeriodes
          };
        }
        return item;
      });

      setAliranDataList(updatedList);
      alert('Aliran Data BPS berhasil diperbarui!');
    } else {
      // Create new Aliran Data master definition with periods automatically generated for selected type
      const generatedPeriodes = generatePeriodesForType(masterFormData.jenisPeriode);

      const newEntry = {
        id: `ad-${Date.now()}`,
        namaIndikator: masterFormData.namaIndikator,
        deskripsi: masterFormData.deskripsi,
        opdId: masterFormData.opdId,
        opdNama: opdNama,
        tahun: Number(masterFormData.tahun),
        jenisPeriode: masterFormData.jenisPeriode,
        bentukInput: masterFormData.bentukInput,
        petunjukPengisian: masterFormData.petunjukPengisian,
        tenggatWaktu: masterFormData.tenggatWaktu,
        statusAktif: masterFormData.statusAktif,
        periodes: generatedPeriodes
      };

      setAliranDataList([newEntry, ...aliranDataList]);
      alert(`Kebutuhan Aliran Data (${masterFormData.jenisPeriode}) baru berhasil ditambahkan! Tugas otomatis tersedia untuk OPD.`);
    }

    setIsMasterModalOpen(false);
    resetMasterForm();
  };

  const handleDeleteMasterAliranData = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kebutuhan aliran data ini? Seluruh tugas terkait akan terhapus.')) {
      setAliranDataList(aliranDataList.filter(item => item.id !== id));
    }
  };

  // OPD Task Input Handlers
  const handleOpenInputModal = (masterItem, periodObj) => {
    setTargetTaskItem({ master: masterItem, period: periodObj });
    setOpdInputFormData({
      nilaiData: periodObj.nilaiData || '',
      dokumenUrl: periodObj.dokumenUrl || '',
      dokumenName: periodObj.dokumenName || '',
      catatanOpd: periodObj.catatanOpd || ''
    });
    setIsInputModalOpen(true);
  };

  const handleOpdFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await compressImageFile(file);
      const formattedSize = formatBytes(res.isCompressed ? res.compressedSize : file.size);
      const objectUrl = res.compressedUrl || URL.createObjectURL(file);

      setOpdInputFormData(prev => ({
        ...prev,
        dokumenUrl: objectUrl,
        dokumenName: res.isCompressed
          ? `${file.name} (Terkompres ${res.ratio}% - ${formattedSize})`
          : `${file.name} (${formattedSize})`
      }));
    } catch (err) {
      console.error('Error uploading OPD document:', err);
    }
  };

  const handleSaveOpdTaskInput = (e) => {
    e.preventDefault();
    if (!targetTaskItem) return;

    const { master, period } = targetTaskItem;
    const nowStamp = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
    const userSignature = currentUser?.nama ? `${currentUser.nama} (${master.opdNama})` : `Petugas ${master.opdNama}`;

    const updatedMasterList = aliranDataList.map(m => {
      if (m.id === master.id) {
        const updatedPeriodes = m.periodes.map(p => {
          if (p.periodeId === period.periodeId) {
            return {
              ...p,
              status: 'Sudah Diinput',
              nilaiData: opdInputFormData.nilaiData,
              dokumenUrl: opdInputFormData.dokumenUrl,
              dokumenName: opdInputFormData.dokumenName,
              catatanOpd: opdInputFormData.catatanOpd,
              tanggalInput: nowStamp,
              inputOleh: userSignature
            };
          }
          return p;
        });
        return { ...m, periodes: updatedPeriodes };
      }
      return m;
    });

    setAliranDataList(updatedMasterList);

    const newLog = {
      id: `log-${Date.now()}`,
      opdNama: master.opdNama,
      namaIndikator: master.namaIndikator,
      periodeNama: `${period.periodeNama} ${master.tahun}`,
      nilaiData: opdInputFormData.nilaiData,
      tanggalInput: nowStamp,
      pengguna: userSignature,
      keterangan: opdInputFormData.catatanOpd || 'Penginputan data pemenuhan aliran data OPD.'
    };

    setAliranHistory([newLog, ...aliranHistory]);
    alert(`Data ${master.namaIndikator} (${period.periodeNama}) berhasil disimpan! Status diperbarui menjadi "Sudah Diinput".`);
    setIsInputModalOpen(false);
  };

  const handleResetOpdTaskInput = (masterItem, periodObj) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data yang telah diinput untuk ${periodObj.periodeNama}? Status akan kembali menjadi "Belum Diinput".`)) {
      const updatedMasterList = aliranDataList.map(m => {
        if (m.id === masterItem.id) {
          const updatedPeriodes = m.periodes.map(p => {
            if (p.periodeId === periodObj.periodeId) {
              return {
                ...p,
                status: 'Belum Diinput',
                nilaiData: '',
                dokumenUrl: '',
                dokumenName: '',
                catatanOpd: '',
                tanggalInput: '-',
                inputOleh: '-'
              };
            }
            return p;
          });
          return { ...m, periodes: updatedPeriodes };
        }
        return m;
      });

      setAliranDataList(updatedMasterList);
    }
  };

  // Flattened period task items for Monitoring Dashboard & OPD View
  const allPeriodTasks = [];
  aliranDataList.forEach(master => {
    master.periodes.forEach(p => {
      allPeriodTasks.push({
        masterId: master.id,
        namaIndikator: master.namaIndikator,
        deskripsi: master.deskripsi,
        opdId: master.opdId,
        opdNama: master.opdNama,
        tahun: master.tahun,
        jenisPeriode: master.jenisPeriode || 'Triwulan',
        bentukInput: master.bentukInput,
        petunjukPengisian: master.petunjukPengisian,
        tenggatWaktu: master.tenggatWaktu,
        statusAktif: master.statusAktif,
        period: p
      });
    });
  });

  // Calculate Summary KPI Metrics for BPS Dashboard respecting active filters
  const filteredTasks = allPeriodTasks.filter(t => {
    const matchOpd = filterOpd === 'ALL' || t.opdId === filterOpd;
    const matchTahun = filterTahun === 'ALL' || t.tahun === Number(filterTahun);
    const matchJenis = filterJenisPeriode === 'ALL' || t.jenisPeriode === filterJenisPeriode;
    const matchStatus = filterStatus === 'ALL' || t.period.status === filterStatus;
    const matchSearch =
      t.namaIndikator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.opdNama.toLowerCase().includes(searchTerm.toLowerCase());
    return matchOpd && matchTahun && matchJenis && matchStatus && matchSearch;
  });

  const totalTasksCount = filteredTasks.length;
  const fulfilledTasksCount = filteredTasks.filter(t => t.period.status === 'Sudah Diinput').length;
  const pendingTasksCount = totalTasksCount - fulfilledTasksCount;
  const fulfillmentPercentage = totalTasksCount > 0 ? Math.round((fulfilledTasksCount / totalTasksCount) * 100) : 0;

  // OPD Specific Tasks Filtering (If logged in as OPD user)
  const currentOpdId = currentUser?.opdId || opdList.find(o => currentUser?.nama?.toLowerCase().includes(o.nama.toLowerCase()))?.id || opdList[0]?.id;

  const myOpdTasks = isBpsUser
    ? filteredTasks
    : allPeriodTasks.filter(t => {
        const matchMyOpd = t.opdId === currentOpdId || t.opdNama.toLowerCase().includes(currentUser?.instansi?.toLowerCase() || '');
        const matchJenis = filterJenisPeriode === 'ALL' || t.jenisPeriode === filterJenisPeriode;
        const matchStatus = filterStatus === 'ALL' || t.period.status === filterStatus;
        const matchSearch = t.namaIndikator.toLowerCase().includes(searchTerm.toLowerCase());
        return matchMyOpd && matchJenis && matchStatus && matchSearch;
      });

  // Filtered monitoring master list for Admin BPS
  const filteredMonitoringMasters = aliranDataList.filter(m => {
    const matchOpd = filterOpd === 'ALL' || m.opdId === filterOpd;
    const matchTahun = filterTahun === 'ALL' || m.tahun === Number(filterTahun);
    const matchJenis = filterJenisPeriode === 'ALL' || (m.jenisPeriode || 'Triwulan') === filterJenisPeriode;
    const matchSearch =
      m.namaIndikator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.opdNama.toLowerCase().includes(searchTerm.toLowerCase());
    return matchOpd && matchTahun && matchJenis && matchSearch;
  });

  const isFiltered = filterOpd !== 'ALL' || filterTahun !== 'ALL' || filterJenisPeriode !== 'Triwulan' || filterStatus !== 'ALL' || searchTerm.trim() !== '';

  const handleResetFilters = () => {
    setFilterOpd('ALL');
    setFilterTahun('ALL');
    setFilterJenisPeriode('Triwulan');
    setFilterStatus('ALL');
    setSearchTerm('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GitMerge size={22} color="var(--primary)" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {isBpsUser ? 'Manajemen Aliran Data OPD' : 'Aliran Data Saya'}
            </h2>
            <span className={`badge ${isBpsUser ? 'badge-primary' : 'badge-info'}`} style={{ fontSize: '0.72rem' }}>
              {isBpsUser ? 'Monitoring & CRUD Central BPS' : 'Tugas Pemenuhan Data OPD'}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
            {isBpsUser
              ? 'Penetapan kebutuhan indikator data sektoral OPD (Bulanan, Triwulan, Tahunan) & pengawasan status pemenuhan.'
              : 'Daftar aliran data dan indikator yang ditugaskan oleh BPS untuk diisi dan diunggah dokumennya.'}
          </p>
        </div>

        {isBpsUser && (
          <button onClick={handleOpenCreateMasterModal} className="btn btn-primary">
            <Plus size={16} />
            <span>Tambah Kebutuhan Aliran Data</span>
          </button>
        )}
      </div>

      {/* Admin BPS Navigation Tabs */}
      {isBpsUser && (
        <div className="glass-card" style={{ padding: '6px', display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {[
            { id: 'dashboard', label: 'Dashboard Monitoring Pemenuhan', icon: LayoutDashboard },
            { id: 'manajemen', label: 'Manajemen Aliran Data (Master CRUD)', icon: FileText }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px 14px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. VIEW ROLE ADMIN BPS - TAB 1: DASHBOARD MONITORING PEMENUHAN           */}
      {/* ========================================================================= */}
      {isBpsUser && activeTab === 'dashboard' && (
        <>
          {/* Summary KPI Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL ALIRAN DATA</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)' }}>{totalTasksCount}</div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Tugas periode terpilih seluruh OPD</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-green)' }}>SUDAH DIINPUT</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-green)' }}>{fulfilledTasksCount}</div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Telah dipenuhi oleh OPD</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f59e0b' }}>BELUM DIINPUT</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f59e0b' }}>{pendingTasksCount}</div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Menunggu penginputan OPD</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)' }}>TINGKAT PEMENUHAN</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)' }}>{fulfillmentPercentage}%</div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Rasio sukses penyampaian data</span>
            </div>
          </div>

          {/* Monitoring Filter Bar with Period Type Filter */}
          <div className="riwayat-controls-bar" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Search Input Box */}
            <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: '320px' }}>
              <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-input"
                placeholder="Cari indikator atau OPD..."
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

            {/* Filter Dropdowns & Reset */}
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
                <option value="ALL">Semua Instansi OPD ({opdList.length})</option>
                {opdList.map(opd => (
                  <option key={opd.id} value={opd.id}>{opd.kode} - {opd.nama}</option>
                ))}
              </select>

              <select
                className="form-select"
                style={{ width: '160px', fontSize: '0.8rem', height: '36px', borderRadius: 'var(--radius-md)' }}
                value={filterJenisPeriode}
                onChange={(e) => setFilterJenisPeriode(e.target.value)}
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
                onChange={(e) => setFilterStatus(e.target.value)}
                title="Filter Status Pemenuhan"
              >
                <option value="ALL">Semua Status</option>
                <option value="Sudah Diinput">Sudah Diinput</option>
                <option value="Belum Diinput">Belum Diinput</option>
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
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Flexible Matrix Monitoring Table */}
          <div className="glass-card" style={{ padding: '1.25rem', overflowX: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Tabel Monitoring Pemenuhan Aliran Data Per Periode ({filteredMonitoringMasters.length} Indikator)
              </h3>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.76rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontWeight: 700 }}>
                  <Check size={14} /> ✓ = Sudah Diinput
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontWeight: 700 }}>
                  - = Belum Diinput
                </span>
              </div>
            </div>

            <table className="data-table" style={{ width: '100%', fontSize: '0.82rem' }}>
              <thead>
                <tr>
                  <th>OPD Penanggung Jawab</th>
                  <th>Data / Indikator</th>
                  <th>Frekuensi</th>
                  <th>Tahun</th>
                  <th>Status Periode</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredMonitoringMasters.map(master => {
                  const jenis = master.jenisPeriode || 'Triwulan';

                  return (
                    <tr key={master.id}>
                      <td style={{ fontWeight: 700, color: 'var(--primary-hover)' }}>{master.opdNama}</td>
                      <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>{master.namaIndikator}</td>
                      <td>
                        <span className={`badge ${jenis === 'Bulanan' ? 'badge-info' : jenis === 'Tahunan' ? 'badge-warning' : 'badge-primary'}`}>
                          {jenis}
                        </span>
                      </td>
                      <td><span className="badge badge-primary">{master.tahun}</span></td>

                      {/* Dynamic Period Status Display based on Frekuensi Jenis (Bulanan / Triwulan / Tahunan) */}
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center' }}>
                          {master.periodes.map(p => {
                            const nameClean = cleanPeriodeNama(p.periodeNama);
                            const nameAbbr = getSingkatanPeriode(p.periodeNama);
                            const isDone = p.status === 'Sudah Diinput';
                            return (
                              <span
                                key={p.periodeId}
                                onClick={() => setDetailModalItem({ master, period: p })}
                                className={`badge ${isDone ? 'badge-success' : 'badge-secondary'}`}
                                style={{
                                  cursor: 'pointer',
                                  fontSize: '0.72rem',
                                  padding: '3px 7px',
                                  fontWeight: 700,
                                  borderRadius: 'var(--radius-sm)',
                                  opacity: isDone ? 1 : 0.65,
                                  transition: 'all 0.15s ease'
                                }}
                                title={`${nameClean}: ${p.status} ${p.nilaiData ? `(${p.nilaiData})` : ''}`}
                              >
                                {isDone ? `✓ ${nameAbbr}` : `- ${nameAbbr}`}
                              </span>
                            );
                          })}
                        </div>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => setDetailModalItem({ master, period: master.periodes[0] })}
                          className="btn btn-secondary"
                          style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                          title="Lihat Detail Pemenuhan Data"
                        >
                          <Eye size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 2. VIEW ROLE ADMIN BPS - TAB 2: MANAJEMEN ALIRAN DATA (MASTER CRUD)       */}
      {/* ========================================================================= */}
      {isBpsUser && activeTab === 'manajemen' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {aliranDataList.map(master => (
            <div key={master.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span className="badge badge-primary">{master.tahun}</span>
                  <span className="badge badge-info">{master.jenisPeriode || 'Triwulan'}</span>
                </div>
                <span className={`badge ${master.statusAktif ? 'badge-success' : 'badge-secondary'}`}>
                  {master.statusAktif ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>

              <div>
                <h4 style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--text-main)' }}>{master.namaIndikator}</h4>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-hover)', display: 'block', marginTop: '2px' }}>
                  {master.opdNama}
                </span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  {master.deskripsi}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', paddingTop: '8px', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
                <button onClick={() => handleOpenEditMasterModal(master)} className="btn btn-outline-primary" style={{ padding: '6px 10px', fontSize: '0.78rem' }}>
                  <Edit size={13} />
                  <span>Edit</span>
                </button>
                <button onClick={() => handleDeleteMasterAliranData(master.id)} className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.78rem', color: '#ef4444' }}>
                  <Trash2 size={13} />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. VIEW ROLE OPD - TABEL ALIRAN DATA SAYA (FLEXIBLE PERIOD FILTER)        */}
      {/* ========================================================================= */}
      {!isBpsUser && (
        <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Daftar Tugas Aliran Data Saya ({myOpdTasks.length})
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Berikut adalah indikator data (Bulanan, Triwulan, Tahunan) yang wajib diisi dan diunggah dokumennya.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', width: '200px' }}>
                <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Cari indikator..."
                  style={{ paddingLeft: '32px', fontSize: '0.8rem', height: '36px', borderRadius: 'var(--radius-md)' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select className="form-select" style={{ width: '160px', fontSize: '0.8rem', height: '36px', borderRadius: 'var(--radius-md)' }} value={filterJenisPeriode} onChange={(e) => setFilterJenisPeriode(e.target.value)}>
                <option value="ALL">Semua Frekuensi</option>
                <option value="Triwulan">Triwulan</option>
                <option value="Bulanan">Bulanan</option>
                <option value="Tahunan">Tahunan</option>
              </select>

              <select className="form-select" style={{ width: '140px', fontSize: '0.8rem', height: '36px', borderRadius: 'var(--radius-md)' }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="ALL">Semua Status</option>
                <option value="Sudah Diinput">Sudah Diinput</option>
                <option value="Belum Diinput">Belum Diinput</option>
              </select>
            </div>
          </div>

          <table className="data-table" style={{ width: '100%', fontSize: '0.84rem' }}>
            <thead>
              <tr>
                <th>Data / Indikator</th>
                <th>Frekuensi</th>
                <th>Tahun</th>
                <th>Sub-Periode</th>
                <th>Status Pemenuhan</th>
                <th>Batas Waktu</th>
                <th style={{ textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {myOpdTasks.map(task => {
                const masterObj = aliranDataList.find(m => m.id === task.masterId);
                const isFulfilled = task.period.status === 'Sudah Diinput';

                return (
                  <tr key={`${task.masterId}-${task.period.periodeId}`}>
                    <td>
                      <strong style={{ display: 'block', color: 'var(--text-main)' }}>{task.namaIndikator}</strong>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{task.deskripsi}</span>
                    </td>
                    <td>
                      <span className={`badge ${task.jenisPeriode === 'Bulanan' ? 'badge-info' : task.jenisPeriode === 'Tahunan' ? 'badge-warning' : 'badge-primary'}`}>
                        {task.jenisPeriode}
                      </span>
                    </td>
                    <td><span className="badge badge-primary">{task.tahun}</span></td>
                    <td><strong style={{ color: 'var(--primary-hover)' }}>{cleanPeriodeNama(task.period.periodeNama)}</strong></td>
                    <td>
                      <span className={`badge ${isFulfilled ? 'badge-success' : 'badge-warning'}`}>
                        {isFulfilled ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                        {task.period.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{formatDateIndo(task.tenggatWaktu)}</td>
                    <td style={{ textAlign: 'center' }}>
                      {isFulfilled ? (
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                          <button
                            onClick={() => setDetailModalItem({ master: masterObj, period: task.period })}
                            className="btn btn-secondary"
                            style={{ padding: '5px 8px', fontSize: '0.75rem' }}
                            title="Lihat Detail Input"
                          >
                            <Eye size={13} />
                          </button>
                          <button
                            onClick={() => handleOpenInputModal(masterObj, task.period)}
                            className="btn btn-outline-primary"
                            style={{ padding: '5px 8px', fontSize: '0.75rem' }}
                            title="Edit Input Data"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => handleResetOpdTaskInput(masterObj, task.period)}
                            className="btn btn-secondary"
                            style={{ padding: '5px 8px', fontSize: '0.75rem', color: '#ef4444' }}
                            title="Hapus Input (Reset ke Belum Diinput)"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenInputModal(masterObj, task.period)}
                          className="btn btn-primary"
                          style={{ padding: '5px 12px', fontSize: '0.76rem' }}
                        >
                          <Upload size={13} />
                          <span>Input Data</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: CREATE & EDIT MASTER ALIRAN DATA (WITH JENIS PERIODE SELECTION)   */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isMasterModalOpen}
        onClose={() => { setIsMasterModalOpen(false); resetMasterForm(); }}
        title={editingMaster ? 'Edit Kebutuhan Aliran Data BPS' : 'Buat Kebutuhan Aliran Data Baru'}
      >
        <form onSubmit={handleSaveMasterAliranData}>
          <div className="form-group">
            <label className="form-label">Nama Data / Indikator</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Jumlah Guru Menurut Jenjang Pendidikan"
              value={masterFormData.namaIndikator}
              onChange={(e) => setMasterFormData({ ...masterFormData, namaIndikator: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">OPD Penanggung Jawab</label>
              <select
                className="form-select"
                value={masterFormData.opdId}
                onChange={(e) => setMasterFormData({ ...masterFormData, opdId: e.target.value })}
                required
              >
                {opdList.map(opd => (
                  <option key={opd.id} value={opd.id}>{opd.nama}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tahun Pengumpulan</label>
              <input
                type="number"
                className="form-input"
                value={masterFormData.tahun}
                onChange={(e) => setMasterFormData({ ...masterFormData, tahun: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Selection field for Jenis Periode (Bulanan, Triwulan, Tahunan) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Frekuensi / Jenis Periode Pengumpulan</label>
              <select
                className="form-select"
                value={masterFormData.jenisPeriode}
                onChange={(e) => setMasterFormData({ ...masterFormData, jenisPeriode: e.target.value })}
                required
              >
                <option value="Triwulan">Triwulan (TW I, TW II, TW III, TW IV)</option>
                <option value="Bulanan">Bulanan (12 Bulan Januari - Desember)</option>
                <option value="Tahunan">Tahunan (1 Tahun Penuh)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Jenis / Bentuk Input</label>
              <select
                className="form-select"
                value={masterFormData.bentukInput}
                onChange={(e) => setMasterFormData({ ...masterFormData, bentukInput: e.target.value })}
                required
              >
                <option value="Angka + Upload Dokumen">Input Angka + Upload Dokumen</option>
                <option value="Teks + Upload Dokumen">Input Teks + Upload Dokumen</option>
                <option value="Upload Dokumen Sahaja">Upload Dokumen Sahaja</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Batas Waktu Pengumpulan (Deadline)</label>
            <input
              type="date"
              className="form-input"
              value={masterFormData.tenggatWaktu}
              onChange={(e) => setMasterFormData({ ...masterFormData, tenggatWaktu: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Deskripsi / Keterangan Data</label>
            <textarea
              className="form-input"
              rows={2}
              placeholder="Rangkuman cakupan indikator yang harus dihimpun..."
              value={masterFormData.deskripsi}
              onChange={(e) => setMasterFormData({ ...masterFormData, deskripsi: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Petunjuk Pengisian bagi OPD</label>
            <textarea
              className="form-input"
              rows={2}
              placeholder="Instruksi khusus mengenai format data, definisi operasional, atau dokumen pendukung..."
              value={masterFormData.petunjukPengisian}
              onChange={(e) => setMasterFormData({ ...masterFormData, petunjukPengisian: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
            <button type="button" onClick={() => { setIsMasterModalOpen(false); resetMasterForm(); }} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Upload size={15} />
              <span>{editingMaster ? 'Simpan Perubahan' : 'Buat Aliran Data'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 2: FORM INPUT ALIRAN DATA OPD                                       */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isInputModalOpen}
        onClose={() => setIsInputModalOpen(false)}
        title={`Input Aliran Data — ${cleanPeriodeNama(targetTaskItem?.period?.periodeNama)} ${targetTaskItem?.master?.tahun}`}
      >
        {targetTaskItem && (
          <form onSubmit={handleSaveOpdTaskInput}>
            {/* Prefilled Read-Only Master Info Box */}
            <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>Instansi OPD: <strong style={{ color: 'var(--primary-hover)' }}>{targetTaskItem.master.opdNama}</strong></div>
              <div>Data / Indikator: <strong style={{ color: 'var(--text-main)' }}>{targetTaskItem.master.namaIndikator}</strong></div>
              <div>Frekuensi & Periode: <strong style={{ color: 'var(--accent-green)' }}>{targetTaskItem.master.jenisPeriode || 'Triwulan'} - {cleanPeriodeNama(targetTaskItem.period.periodeNama)} ({targetTaskItem.master.tahun})</strong></div>
              {targetTaskItem.master.petunjukPengisian && (
                <div style={{ marginTop: '4px', fontSize: '0.78rem', color: 'var(--text-secondary)', borderTop: '1px dashed var(--border-color)', paddingTop: '4px' }}>
                  <strong>Petunjuk Pengisian BPS:</strong> {targetTaskItem.master.petunjukPengisian}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Nilai / Angka Data Sektoral</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: 1,435 Guru (atau 35,420 Ton GKG)"
                value={opdInputFormData.nilaiData}
                onChange={(e) => setOpdInputFormData({ ...opdInputFormData, nilaiData: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileCheck size={16} color="var(--primary)" />
                <span>Upload Dokumen Pendukung (PDF / Excel / Word)</span>
              </label>
              <input
                type="file"
                accept=".pdf,.xlsx,.xls,.doc,.docx,.csv"
                className="form-input"
                style={{ padding: '8px' }}
                onChange={handleOpdFileUpload}
              />
              {opdInputFormData.dokumenName && (
                <p style={{ fontSize: '0.78rem', color: 'var(--primary-hover)', marginTop: '4px', fontWeight: 600 }}>
                  Berkas terpilih: {opdInputFormData.dokumenName}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Keterangan / Catatan Tambahan OPD</label>
              <textarea
                className="form-input"
                rows={2}
                placeholder="Catatan keabsahan data, metodologi rekapitulasi, atau penjelasan sumber data..."
                value={opdInputFormData.catatanOpd}
                onChange={(e) => setOpdInputFormData({ ...opdInputFormData, catatanOpd: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
              <button type="button" onClick={() => setIsInputModalOpen(false)} className="btn btn-secondary">
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                <CheckCircle2 size={15} />
                <span>Simpan Data</span>
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 3: DETAIL ALIRAN DATA                                               */}
      {/* ========================================================================= */}
      <Modal
        isOpen={!!detailModalItem}
        onClose={() => setDetailModalItem(null)}
        title="Detail Pemenuhan Aliran Data OPD"
      >
        {detailModalItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span className="badge badge-primary">{detailModalItem.master.tahun}</span>
                <span className="badge badge-info">{detailModalItem.master.jenisPeriode || 'Triwulan'}</span>
              </div>
              <span className={`badge ${detailModalItem.period.status === 'Sudah Diinput' ? 'badge-success' : 'badge-warning'}`}>
                {detailModalItem.period.status}
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {detailModalItem.master.namaIndikator}
              </h3>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-hover)', display: 'block', marginTop: '2px' }}>
                {detailModalItem.master.opdNama}
              </span>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                {detailModalItem.master.deskripsi}
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>Periode Pengumpulan: <strong style={{ color: 'var(--text-main)' }}>{cleanPeriodeNama(detailModalItem.period.periodeNama)} ({detailModalItem.master.jenisPeriode || 'Triwulan'})</strong></div>
              <div>Nilai Data Sektoral: <strong style={{ color: 'var(--accent-green)' }}>{detailModalItem.period.nilaiData || 'Belum diisi'}</strong></div>
              <div>Dokumen Pendukung: <strong style={{ color: 'var(--primary-hover)' }}>{detailModalItem.period.dokumenName || 'Belum ada dokumen'}</strong></div>
              <div>Waktu Input: <strong style={{ color: 'var(--text-main)' }}>{detailModalItem.period.tanggalInput}</strong></div>
              <div>Petugas Penginput: <strong style={{ color: 'var(--text-main)' }}>{detailModalItem.period.inputOleh}</strong></div>
              {detailModalItem.period.catatanOpd && (
                <div style={{ marginTop: '4px', borderTop: '1px dashed var(--border-color)', paddingTop: '4px' }}>
                  <strong>Catatan OPD:</strong> {detailModalItem.period.catatanOpd}
                </div>
              )}
            </div>

            {detailModalItem.period.dokumenName && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                <button
                  onClick={() => alert(`Simulasi mengunduh berkas pendukung: ${detailModalItem.period.dokumenName}`)}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                >
                  <Download size={14} />
                  <span>Unduh Dokumen Pendukung</span>
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
