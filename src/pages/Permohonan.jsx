import React, { useState } from 'react';
import Modal from '../components/Modal';
import {
  FilePlus,
  Calendar,
  MapPin,
  Users,
  Clock,
  Send,
  ShieldAlert,
  CheckCircle2,
  Inbox,
  Edit,
  Trash2,
  Info,
  History,
  Check,
  RefreshCw,
  Building2,
  Eye
} from 'lucide-react';
import { formatDateIndo } from '../utils/helpers';

export default function Permohonan({
  pembinaanList,
  setPembinaanList,
  opdList,
  currentRole,
  currentPermissions
}) {
  const isBpsUser = currentRole?.id === 'role-admin' || currentRole?.id === 'role-ketua-tim' || Boolean(currentPermissions.approvePembinaan);
  const isWalidataUser = currentRole?.id === 'role-walidata-opd';
  const isProdusenOpdUser = currentRole?.id === 'role-produsen-opd';
  const isPublikUser = currentRole?.id === 'role-publik';

  // Selected OPD state for Produsen OPD simulation
  const [selectedOpdId, setSelectedOpdId] = useState(opdList[0]?.id || 'opd-1');
  const activeOpdObj = opdList.find(o => o.id === selectedOpdId) || opdList[0];

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [rescheduleItem, setRescheduleItem] = useState(null);

  const [detailItem, setDetailItem] = useState(null);

  // OPD Form state
  const [formData, setFormData] = useState({
    opdId: opdList[0]?.id || '',
    namaPIC: '',
    kontak: '',
    jenis: 'Pendampingan Penyusunan Kompromin',
    topik: '',
    uraianKebutuhan: '',
    tanggalUsulan: new Date().toISOString().split('T')[0],
    catatanTambahan: '',
    lokasi: 'Aula BPS Kabupaten Pasaman'
  });

  // BPS Reschedule Form state
  const [rescheduleData, setRescheduleData] = useState({
    tanggalPelaksanaan: '',
    waktuPembinaan: '09:00 - 12:00 WIB',
    catatanBps: '',
    lokasi: ''
  });

  // Reset OPD form
  const resetOpdForm = () => {
    setFormData({
      opdId: isProdusenOpdUser ? selectedOpdId : (opdList[0]?.id || ''),
      namaPIC: '',
      kontak: '',
      jenis: 'Pendampingan Penyusunan Kompromin',
      topik: '',
      uraianKebutuhan: '',
      tanggalUsulan: new Date().toISOString().split('T')[0],
      catatanTambahan: '',
      lokasi: 'Aula BPS Kabupaten Pasaman'
    });
    setEditingItem(null);
  };

  const handleOpenCreateModal = () => {
    resetOpdForm();
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      opdId: item.opdId,
      namaPIC: item.namaPIC || item.perwakilanOPD || '',
      kontak: item.kontak || '',
      jenis: item.jenis || 'Pendampingan Penyusunan Kompromin',
      topik: item.topik || '',
      uraianKebutuhan: item.uraianKebutuhan || '',
      tanggalUsulan: item.tanggalUsulan || new Date().toISOString().split('T')[0],
      catatanTambahan: item.catatanTambahan || '',
      lokasi: item.lokasi || 'Aula BPS Kabupaten Pasaman'
    });
    setIsFormModalOpen(true);
  };

  const handleSaveOpdForm = (e) => {
    e.preventDefault();
    const targetOpd = opdList.find(o => o.id === formData.opdId) || activeOpdObj;
    const nowStamp = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });

    if (editingItem) {
      // Edit existing submission
      const updatedList = pembinaanList.map(item => {
        if (item.id === editingItem.id) {
          const logEntry = {
            tanggalPerubahan: nowStamp,
            diubahOleh: `${targetOpd.nama} (OPD)`,
            tanggalUsulanOPD: formData.tanggalUsulan,
            tanggalDitetapkanBPS: item.status === 'Disetujui' ? item.tanggalPelaksanaan : '-',
            catatanPerubahan: 'OPD memperbarui data usulan pembinaan.'
          };

          return {
            ...item,
            opdId: formData.opdId,
            opdNama: targetOpd.nama,
            namaPIC: formData.namaPIC,
            kontak: formData.kontak,
            perwakilanOPD: formData.namaPIC,
            jenis: formData.jenis,
            topik: formData.topik,
            uraianKebutuhan: formData.uraianKebutuhan,
            tanggalUsulan: formData.tanggalUsulan,
            catatanTambahan: formData.catatanTambahan,
            lokasi: formData.lokasi,
            riwayatPerubahan: [logEntry, ...(item.riwayatPerubahan || [])]
          };
        }
        return item;
      });

      setPembinaanList(updatedList);
      alert('Pengajuan pembinaan berhasil diperbarui!');
    } else {
      // Create new submission
      const newEntry = {
        id: `pem-${Date.now()}`,
        opdId: formData.opdId,
        opdNama: targetOpd ? targetOpd.nama : 'Dinas Pemkab Pasaman',
        namaPIC: formData.namaPIC,
        kontak: formData.kontak,
        perwakilanOPD: formData.namaPIC,
        jenis: formData.jenis,
        topik: formData.topik,
        uraianKebutuhan: formData.uraianKebutuhan,
        tanggalUsulan: formData.tanggalUsulan,
        tanggalPelaksanaan: formData.tanggalUsulan,
        waktuPembinaan: '09:00 - 12:00 WIB',
        catatanTambahan: formData.catatanTambahan,
        status: 'Menunggu Persetujuan',
        lokasi: formData.lokasi,
        pembinaBPS: 'Tim Statistik Sektoral BPS Pasaman',
        notulen: 'Menunggu penelaahan dan persetujuan tim pembina BPS Pasaman.',
        catatanBps: '-',
        dokumentasiUrl: '',
        riwayatPerubahan: [
          {
            tanggalPerubahan: nowStamp,
            diubahOleh: `${targetOpd.nama} (OPD)`,
            tanggalUsulanOPD: formData.tanggalUsulan,
            tanggalDitetapkanBPS: '-',
            catatanPerubahan: 'Pengajuan permohonan baru dikirim. Berstatus Menunggu Persetujuan BPS.'
          }
        ]
      };

      setPembinaanList([newEntry, ...pembinaanList]);
      alert('Permohonan pembinaan statistik sektoral berhasil dikirim ke BPS Kabupaten Pasaman!');
    }

    setIsFormModalOpen(false);
    resetOpdForm();
  };

  const handleDeletePermohonan = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus permohonan pembinaan ini?')) {
      setPembinaanList(pembinaanList.filter(item => item.id !== id));
    }
  };

  // BPS Approve Directly
  const handleBpsApproveDirect = (item) => {
    const nowStamp = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
    const logEntry = {
      tanggalPerubahan: nowStamp,
      diubahOleh: 'Tim Statistik Sektoral BPS',
      tanggalUsulanOPD: item.tanggalUsulan,
      tanggalDitetapkanBPS: item.tanggalUsulan,
      catatanPerubahan: `BPS menyetujui permohonan sesuai tanggal yang diusulkan OPD (${formatDateIndo(item.tanggalUsulan)}).`
    };

    const updated = pembinaanList.map(it => {
      if (it.id === item.id) {
        return {
          ...it,
          status: 'Disetujui',
          tanggalPelaksanaan: item.tanggalUsulan,
          catatanBps: 'Jadwal pembinaan disetujui sesuai usulan OPD.',
          riwayatPerubahan: [logEntry, ...(it.riwayatPerubahan || [])]
        };
      }
      return it;
    });

    setPembinaanList(updated);
    alert(`Permohonan ${item.id} berhasil disetujui oleh BPS!`);
  };

  // BPS Open Reschedule Modal
  const handleOpenRescheduleModal = (item) => {
    setRescheduleItem(item);
    setRescheduleData({
      tanggalPelaksanaan: item.tanggalPelaksanaan && item.tanggalPelaksanaan !== '-' ? item.tanggalPelaksanaan : item.tanggalUsulan,
      waktuPembinaan: item.waktuPembinaan || '09:00 - 12:00 WIB',
      catatanBps: item.catatanBps && item.catatanBps !== '-' ? item.catatanBps : 'Tanggal diatur ulang menyesuaikan dengan agenda tim pembina BPS Pasaman.',
      lokasi: item.lokasi || 'Aula BPS Kabupaten Pasaman'
    });
    setIsRescheduleModalOpen(true);
  };

  // BPS Save Reschedule
  const handleSaveReschedule = (e) => {
    e.preventDefault();
    if (!rescheduleItem) return;

    const nowStamp = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
    const logEntry = {
      tanggalPerubahan: nowStamp,
      diubahOleh: 'Tim Statistik Sektoral BPS',
      tanggalUsulanOPD: rescheduleItem.tanggalUsulan,
      tanggalDitetapkanBPS: rescheduleData.tanggalPelaksanaan,
      catatanPerubahan: `BPS menetapkan ulang tanggal pembinaan menjadi ${formatDateIndo(rescheduleData.tanggalPelaksanaan)}. Catatan BPS: "${rescheduleData.catatanBps}".`
    };

    const updated = pembinaanList.map(it => {
      if (it.id === rescheduleItem.id) {
        return {
          ...it,
          status: 'Disetujui',
          tanggalPelaksanaan: rescheduleData.tanggalPelaksanaan,
          waktuPembinaan: rescheduleData.waktuPembinaan,
          catatanBps: rescheduleData.catatanBps,
          lokasi: rescheduleData.lokasi,
          riwayatPerubahan: [logEntry, ...(it.riwayatPerubahan || [])]
        };
      }
      return it;
    });

    setPembinaanList(updated);
    setIsRescheduleModalOpen(false);
    setRescheduleItem(null);
    alert('Penetapan ulang tanggal pembinaan berhasil disimpan dan berstatus Disetujui!');
  };

  // BPS Update next status (Mulai Pembinaan / Selesai)
  const handleBpsNextStatus = (id, newStatus) => {
    const nowStamp = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
    setPembinaanList(pembinaanList.map(it => {
      if (it.id === id) {
        const logEntry = {
          tanggalPerubahan: nowStamp,
          diubahOleh: 'Tim Statistik Sektoral BPS',
          tanggalUsulanOPD: it.tanggalUsulan,
          tanggalDitetapkanBPS: it.tanggalPelaksanaan,
          catatanPerubahan: `Status pembinaan diperbarui menjadi "${newStatus}".`
        };

        return {
          ...it,
          status: newStatus,
          riwayatPerubahan: [logEntry, ...(it.riwayatPerubahan || [])]
        };
      }
      return it;
    }));
  };

  // Display list filtering
  const displayedList = isProdusenOpdUser
    ? pembinaanList.filter(item => item.opdId === selectedOpdId)
    : pembinaanList;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Selesai': return { cls: 'badge-success', label: 'Selesai', icon: <CheckCircle2 size={12} /> };
      case 'Dalam Proses': return { cls: 'badge-warning', label: 'Dalam Proses', icon: <Clock size={12} /> };
      case 'Disetujui': return { cls: 'badge-info', label: 'Disetujui BPS', icon: <Check size={12} /> };
      case 'Menunggu Persetujuan':
      default: return { cls: 'badge-primary', label: 'Menunggu Persetujuan', icon: <RefreshCw size={12} /> };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Layanan & Pengajuan Pembinaan Statistik Sektoral
            </h2>
            <span className={`badge ${isBpsUser ? 'badge-primary' : isWalidataUser ? 'badge-warning' : isPublikUser ? 'badge-secondary' : 'badge-info'}`} style={{ fontSize: '0.72rem' }}>
              Peran: {currentRole?.name}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {isBpsUser
              ? 'Mode Penelaah BPS: Verifikasi, setujui, atau atur ulang jadwal permohonan pembinaan seluruh OPD Kabupaten Pasaman.'
              : isWalidataUser
              ? 'Mode Walidata Pemkab: Pantau pengajuan seluruh OPD dan fasilitasi permohonan pembinaan statistik.'
              : isProdusenOpdUser
              ? 'Mode Produsen Data OPD: Pengajuan permohonan pendampingan Kompromin, metadata, dan konsultasi teknis BPS.'
              : 'Mode Publik: Membaca daftar pengajuan dan progres pembinaan statistik sektoral Pasaman.'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {isProdusenOpdUser && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-surface)', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <Building2 size={15} color="var(--primary)" />
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>Simulasi Instansi:</label>
              <select
                value={selectedOpdId}
                onChange={(e) => setSelectedOpdId(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
              >
                {opdList.map(opd => (
                  <option key={opd.id} value={opd.id}>{opd.kode} - {opd.nama}</option>
                ))}
              </select>
            </div>
          )}

          {currentPermissions.submitPembinaan ? (
            <button onClick={handleOpenCreateModal} className="btn btn-primary">
              <FilePlus size={16} />
              <span>Ajukan Pembinaan Baru</span>
            </button>
          ) : (
            <div className="badge badge-warning" style={{ gap: '4px' }}>
              <ShieldAlert size={13} />
              <span>Pengajuan Dibatasi</span>
            </div>
          )}
        </div>
      </div>

      {/* Mode info banner */}
      <div style={{
        background: isBpsUser ? 'rgba(59, 130, 246, 0.08)' : isWalidataUser ? 'rgba(245, 158, 11, 0.08)' : 'rgba(247, 144, 57, 0.08)',
        border: `1px solid ${isBpsUser ? 'rgba(59, 130, 246, 0.25)' : isWalidataUser ? 'rgba(245, 158, 11, 0.25)' : 'rgba(247, 144, 57, 0.25)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '10px 14px',
        fontSize: '0.82rem',
        color: 'var(--text-secondary)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Info size={16} color={isBpsUser ? '#3b82f6' : isWalidataUser ? '#d97706' : 'var(--primary)'} style={{ flexShrink: 0 }} />
        <span>
          {isBpsUser && <span>Sebagai <strong>Tim Pembina BPS</strong>, Anda melihat seluruh permohonan OPD. Pilih <strong>Setujui</strong> jika tanggal sesuai, atau <strong>Atur Ulang Tanggal</strong> jika jadwal perlu disesuaikan BPS.</span>}
          {isWalidataUser && <span>Sebagai <strong>Walidata OPD Pasaman (Diskominfo)</strong>, Anda memantau seluruh pengajuan pembinaan OPD se-Kabupaten Pasaman.</span>}
          {isProdusenOpdUser && <span>Sebagai <strong>Produsen Data OPD ({activeOpdObj?.nama})</strong>, Anda dapat mengajukan permohonan baru. Selama status <strong>"Menunggu Persetujuan"</strong>, Anda dapat mengedit atau menghapus pengajuan.</span>}
          {isPublikUser && <span>Sebagai <strong>Pengguna Publik</strong>, Anda dapat memantau status dan jadwal pembinaan statistik sektoral yang dipublikasikan.</span>}
        </span>
      </div>

      {/* Cards List Grid */}
      {displayedList.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-state-icon"><Inbox size={24} /></div>
          <span className="empty-state-title">Belum ada permohonan</span>
          <span className="empty-state-desc">
            {isProdusenOpdUser
              ? `Belum ada pengajuan pembinaan dari ${activeOpdObj?.nama}. Klik tombol "Ajukan Pembinaan Baru" untuk mengirim usulan.`
              : 'Belum ada pengajuan pembinaan dari OPD yang tercatat.'}
          </span>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1rem' }}>
          {displayedList.map(item => {
            const badge = getStatusBadge(item.status);
            const canEditDelete = (isProdusenOpdUser || (isWalidataUser && item.opdId === selectedOpdId)) && item.status === 'Menunggu Persetujuan';
            const isPendingBps = isBpsUser && item.status === 'Menunggu Persetujuan';

            return (
              <div key={item.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '6px' }}>
                  <span className={`badge ${badge.cls}`} style={{ gap: '4px' }}>
                    {badge.icon}
                    {badge.label}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{item.id}</span>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.3' }}>
                    {item.topik}
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-hover)', fontWeight: 700, display: 'block', marginTop: '3px' }}>
                    {item.opdNama}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)', background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={13} color="var(--primary)" />
                    <span>PIC OPD: <strong>{item.namaPIC || item.perwakilanOPD}</strong> ({item.kontak || '-'})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={13} color="var(--primary)" />
                    <span>Usulan OPD: <strong>{formatDateIndo(item.tanggalUsulan)}</strong></span>
                  </div>

                  {item.status !== 'Menunggu Persetujuan' && item.tanggalPelaksanaan && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-hover)' }}>
                      <CheckCircle2 size={13} color="var(--primary)" />
                      <span>Penetapan BPS: <strong>{formatDateIndo(item.tanggalPelaksanaan)}</strong> ({item.waktuPembinaan || '09:00 WIB'})</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={13} color="var(--primary)" />
                    <span>Lokasi: {item.lokasi}</span>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                  <button
                    onClick={() => setDetailItem(item)}
                    className="btn btn-secondary"
                    style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                  >
                    <Info size={13} />
                    <span>Detail</span>
                  </button>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    {/* OPD Edit & Delete Buttons */}
                    {canEditDelete && (
                      <>
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="btn btn-outline-primary"
                          style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                          title="Edit Pengajuan OPD"
                        >
                          <Edit size={13} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeletePermohonan(item.id)}
                          className="btn btn-secondary"
                          style={{ padding: '6px 10px', fontSize: '0.78rem', color: '#ef4444' }}
                          title="Hapus Pengajuan"
                        >
                          <Trash2 size={13} />
                        </button>
                      </>
                    )}

                    {/* BPS Approve & Reschedule Actions */}
                    {isPendingBps && (
                      <>
                        <button
                          onClick={() => handleBpsApproveDirect(item)}
                          className="btn btn-primary"
                          style={{ padding: '6px 10px', fontSize: '0.78rem', background: '#10b981', borderColor: '#10b981' }}
                          title="Setujui sesuai tanggal yang diusulkan OPD"
                        >
                          <Check size={13} />
                          <span>Setujui</span>
                        </button>

                        <button
                          onClick={() => handleOpenRescheduleModal(item)}
                          className="btn btn-outline-primary"
                          style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                          title="Atur ulang tanggal pembinaan BPS"
                        >
                          <RefreshCw size={13} />
                          <span>Atur Ulang Tanggal</span>
                        </button>
                      </>
                    )}

                    {/* Next step workflow for BPS */}
                    {isBpsUser && item.status === 'Disetujui' && (
                      <button
                        onClick={() => handleBpsNextStatus(item.id, 'Dalam Proses')}
                        className="btn btn-primary"
                        style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                      >
                        Mulai Pembinaan
                      </button>
                    )}

                    {isBpsUser && item.status === 'Dalam Proses' && (
                      <button
                        onClick={() => handleBpsNextStatus(item.id, 'Selesai')}
                        className="btn btn-secondary"
                        style={{ padding: '6px 10px', fontSize: '0.78rem', color: 'var(--accent-green)' }}
                      >
                        Tandai Selesai
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* OPD Modal Form (Tambah / Edit) */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => { setIsFormModalOpen(false); resetOpdForm(); }}
        title={editingItem ? 'Edit Permohonan Pembinaan OPD' : 'Form Pengajuan Pembinaan Statistik Sektoral'}
      >
        <form onSubmit={handleSaveOpdForm}>
          <div className="form-group">
            <label className="form-label">Instansi / OPD Pemohon</label>
            <select
              className="form-select"
              value={formData.opdId}
              onChange={(e) => setFormData({ ...formData, opdId: e.target.value })}
              required
            >
              {opdList.map(opd => (
                <option key={opd.id} value={opd.id}>{opd.nama} ({opd.kode})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Nama PIC / Pengusul</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: dr. Fitriani (Kabid SDK)"
                value={formData.namaPIC}
                onChange={(e) => setFormData({ ...formData, namaPIC: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kontak HP / WA / Email</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: 081267890011"
                value={formData.kontak}
                onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Jenis Pembinaan / Pendampingan</label>
            <select
              className="form-select"
              value={formData.jenis}
              onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
              required
            >
              <option value="Pendampingan Penyusunan Kompromin">Pendampingan Penyusunan Kompromin</option>
              <option value="Pembinaan Metadata Statistik (MS-D)">Pembinaan Metadata Statistik (MS-D)</option>
              <option value="Rekomendasi Kegiatan Statistik (Romantik)">Rekomendasi Kegiatan Statistik (Romantik)</option>
              <option value="Konsultasi Teknis Sektoral">Konsultasi Teknis Sektoral</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Topik Pembinaan</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Pendampingan Kompromin Sektor Kesehatan 2026"
              value={formData.topik}
              onChange={(e) => setFormData({ ...formData, topik: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Uraian Kebutuhan Pembinaan</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Jelaskan kebutuhan spesifik pembinaan statistik yang diharapkan dari BPS..."
              value={formData.uraianKebutuhan}
              onChange={(e) => setFormData({ ...formData, uraianKebutuhan: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Tanggal yang Diusulkan OPD</label>
              <input
                type="date"
                className="form-input"
                value={formData.tanggalUsulan}
                onChange={(e) => setFormData({ ...formData, tanggalUsulan: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Usulan Lokasi Pembinaan</label>
              <input
                type="text"
                className="form-input"
                placeholder="Aula BPS / Aula OPD / Zoom"
                value={formData.lokasi}
                onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Catatan Tambahan (Opsional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="Catatan khusus atau dokumen pendukung yang disiapkan"
              value={formData.catatanTambahan}
              onChange={(e) => setFormData({ ...formData, catatanTambahan: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
            <button type="button" onClick={() => { setIsFormModalOpen(false); resetOpdForm(); }} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Send size={15} />
              <span>{editingItem ? 'Simpan Perubahan' : 'Kirim Permohonan'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* BPS Reschedule Modal Form */}
      <Modal
        isOpen={isRescheduleModalOpen}
        onClose={() => { setIsRescheduleModalOpen(false); setRescheduleItem(null); }}
        title={`Atur Ulang Tanggal Pembinaan BPS - (${rescheduleItem?.id})`}
      >
        {rescheduleItem && (
          <form onSubmit={handleSaveReschedule}>
            <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '1rem', fontSize: '0.82rem' }}>
              <p style={{ fontWeight: 700, color: 'var(--primary-hover)' }}>{rescheduleItem.opdNama}</p>
              <p style={{ color: 'var(--text-main)', marginTop: '2px' }}><strong>Topik:</strong> {rescheduleItem.topik}</p>
              <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}><strong>Tanggal Diusulkan OPD:</strong> {formatDateIndo(rescheduleItem.tanggalUsulan)}</p>
            </div>

            <div className="form-group">
              <label className="form-label">Tanggal Pembinaan yang Ditetapkan BPS</label>
              <input
                type="date"
                className="form-input"
                value={rescheduleData.tanggalPelaksanaan}
                onChange={(e) => setRescheduleData({ ...rescheduleData, tanggalPelaksanaan: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Waktu / Jam Pembinaan</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: 09:00 - 12:00 WIB"
                value={rescheduleData.waktuPembinaan}
                onChange={(e) => setRescheduleData({ ...rescheduleData, waktuPembinaan: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Lokasi / Ruang Pembinaan</label>
              <input
                type="text"
                className="form-input"
                value={rescheduleData.lokasi}
                onChange={(e) => setRescheduleData({ ...rescheduleData, lokasi: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Catatan & Arahan Tim BPS</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="Jelaskan alasan penyesuaian tanggal atau arahan persiapan dokumen untuk OPD..."
                value={rescheduleData.catatanBps}
                onChange={(e) => setRescheduleData({ ...rescheduleData, catatanBps: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
              <button type="button" onClick={() => { setIsRescheduleModalOpen(false); setRescheduleItem(null); }} className="btn btn-secondary">
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                <Check size={15} />
                <span>Simpan & Tetapkan Jadwal (Disetujui)</span>
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Detail Modal & Audit Trail Log */}
      <Modal
        isOpen={!!detailItem}
        onClose={() => setDetailItem(null)}
        title={`Rincian Permohonan Pembinaan - ${detailItem?.id}`}
      >
        {detailItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
              <span className={`badge ${getStatusBadge(detailItem.status).cls}`}>
                {getStatusBadge(detailItem.status).icon}
                {getStatusBadge(detailItem.status).label}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Jenis: {detailItem.jenis}</span>
            </div>

            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>{detailItem.topik}</h3>
              <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-hover)', marginTop: '2px' }}>{detailItem.opdNama}</p>
            </div>

            <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '6px 0', fontWeight: 700, color: 'var(--text-muted)', width: '35%' }}>Nama PIC / Pengusul</td>
                  <td style={{ padding: '6px 0', color: 'var(--text-main)' }}>{detailItem.namaPIC || detailItem.perwakilanOPD}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '6px 0', fontWeight: 700, color: 'var(--text-muted)' }}>Kontak PIC</td>
                  <td style={{ padding: '6px 0', color: 'var(--text-main)' }}>{detailItem.kontak || '-'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '6px 0', fontWeight: 700, color: 'var(--text-muted)' }}>Tanggal Usulan OPD</td>
                  <td style={{ padding: '6px 0', color: 'var(--text-main)' }}>{formatDateIndo(detailItem.tanggalUsulan)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '6px 0', fontWeight: 700, color: 'var(--text-muted)' }}>Tanggal Ditetapkan BPS</td>
                  <td style={{ padding: '6px 0', color: 'var(--primary-hover)', fontWeight: 700 }}>
                    {detailItem.tanggalPelaksanaan && detailItem.tanggalPelaksanaan !== '-'
                      ? `${formatDateIndo(detailItem.tanggalPelaksanaan)} (${detailItem.waktuPembinaan || '09:00 WIB'})`
                      : 'Belum ditetapkan BPS'}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '6px 0', fontWeight: 700, color: 'var(--text-muted)' }}>Lokasi Kegiatan</td>
                  <td style={{ padding: '6px 0', color: 'var(--text-main)' }}>{detailItem.lokasi}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '6px 0', fontWeight: 700, color: 'var(--text-muted)' }}>Tim Pembina BPS</td>
                  <td style={{ padding: '6px 0', color: 'var(--text-main)' }}>{detailItem.pembinaBPS}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block' }}>Uraian Kebutuhan Pembinaan:</span>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{detailItem.uraianKebutuhan || 'Tidak ada uraian khusus.'}</p>
            </div>

            {detailItem.catatanBps && detailItem.catatanBps !== '-' && (
              <div style={{ background: 'rgba(59, 130, 246, 0.08)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2563eb', display: 'block' }}>Catatan / Arahan Tim BPS:</span>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-main)', marginTop: '2px' }}>{detailItem.catatanBps}</p>
              </div>
            )}

            {/* Riwayat Perubahan (Audit Trail Log) */}
            <div style={{ marginTop: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <History size={16} color="var(--primary)" />
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>Riwayat Perubahan Status & Jadwal</h4>
              </div>

              {detailItem.riwayatPerubahan && detailItem.riwayatPerubahan.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {detailItem.riwayatPerubahan.map((log, idx) => (
                    <div key={idx} style={{ background: 'var(--bg-surface)', borderLeft: '3px solid var(--primary)', padding: '8px 12px', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', fontSize: '0.78rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontWeight: 600 }}>
                        <span>{log.diubahOleh}</span>
                        <span>{log.tanggalPerubahan}</span>
                      </div>
                      <p style={{ color: 'var(--text-main)', marginTop: '4px', fontWeight: 600 }}>{log.catatanPerubahan}</p>
                      {log.tanggalUsulanOPD && (
                        <div style={{ display: 'flex', gap: '12px', marginTop: '4px', color: 'var(--text-secondary)', fontSize: '0.74rem' }}>
                          <span>Usulan OPD: {formatDateIndo(log.tanggalUsulanOPD)}</span>
                          <span>Penetapan BPS: {log.tanggalDitetapkanBPS !== '-' ? formatDateIndo(log.tanggalDitetapkanBPS) : '-'}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Belum ada catatan riwayat perubahan.</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
