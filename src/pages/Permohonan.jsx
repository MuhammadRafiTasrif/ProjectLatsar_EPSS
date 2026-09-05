import React, { useState } from 'react';
import Modal from '../components/Modal';
import { FilePlus, Calendar, MapPin, Users, Clock, Send, ShieldAlert, CheckCircle2, Inbox } from 'lucide-react';
import { formatDateIndo } from '../utils/helpers';

export default function Permohonan({ pembinaanList, setPembinaanList, opdList, currentRole, currentPermissions }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    opdId: opdList[0]?.id || '',
    jenis: 'Pendampingan Penyusunan Kompromin',
    topik: '',
    tanggalUsulan: new Date().toISOString().split('T')[0],
    lokasi: 'Aula BPS Kabupaten Pasaman',
    perwakilanOPD: ''
  });

  const handleCreatePermohonan = (e) => {
    e.preventDefault();
    const targetOpd = opdList.find(o => o.id === formData.opdId);
    const newEntry = {
      id: `pem-${Date.now()}`,
      opdId: formData.opdId,
      opdNama: targetOpd ? targetOpd.nama : 'Dinas Pemkab Pasaman',
      jenis: formData.jenis,
      topik: formData.topik,
      tanggalUsulan: formData.tanggalUsulan,
      tanggalPelaksanaan: '-',
      status: 'Permohonan Masuk',
      lokasi: formData.lokasi,
      pembinaBPS: 'Tim Pembina BPS Pasaman',
      perwakilanOPD: formData.perwakilanOPD || 'Staff Pengelola OPD',
      notulen: 'Permohonan baru dikirim. Menunggu konfirmasi jadwal BPS.',
      dokumentasiUrl: ''
    };

    setPembinaanList([newEntry, ...pembinaanList]);
    setIsModalOpen(false);
    setFormData({
      opdId: opdList[0]?.id || '',
      jenis: 'Pendampingan Penyusunan Kompromin',
      topik: '',
      tanggalUsulan: new Date().toISOString().split('T')[0],
      lokasi: 'Aula BPS Kabupaten Pasaman',
      perwakilanOPD: ''
    });
    alert('Permohonan pembinaan statistik sektoral berhasil dikirim ke BPS Kabupaten Pasaman!');
  };

  const handleUpdateStatus = (id, newStatus) => {
    setPembinaanList(pembinaanList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: newStatus,
          tanggalPelaksanaan: newStatus === 'Selesai' || newStatus === 'Dijadwalkan' ? new Date().toISOString().split('T')[0] : item.tanggalPelaksanaan
        };
      }
      return item;
    }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Selesai': return { cls: 'badge-success', icon: <CheckCircle2 size={11} /> };
      case 'Dalam Proses': return { cls: 'badge-warning', icon: <Clock size={11} /> };
      case 'Dijadwalkan': return { cls: 'badge-info', icon: <Calendar size={11} /> };
      default: return { cls: 'badge-primary', icon: <FilePlus size={11} /> };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Permohonan & Layanan Pembinaan
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
            Pengajuan pendampingan Kompromin, metadata statistik, rekomendasi kegiatan, dan konsultasi teknis.
          </p>
        </div>

        {currentPermissions.submitPembinaan ? (
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
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

      {pembinaanList.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-state-icon"><Inbox size={24} /></div>
          <span className="empty-state-title">Belum ada permohonan</span>
          <span className="empty-state-desc">Belum ada pengajuan pembinaan yang tercatat. Klik tombol di atas untuk mengajukan pembinaan baru.</span>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {pembinaanList.map(item => {
            const badge = getStatusBadge(item.status);
            return (
              <div key={item.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <span className={`badge ${badge.cls}`}>
                    {badge.icon}
                    {item.status}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{item.id}</span>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.3' }}>
                    {item.topik}
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-hover)', fontWeight: 700, display: 'block', marginTop: '3px' }}>
                    {item.opdNama}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.78rem', color: 'var(--text-secondary)', background: 'var(--bg-surface)', padding: '8px 10px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={13} color="var(--primary)" />
                    <span>Usulan: {formatDateIndo(item.tanggalUsulan)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MapPin size={13} color="var(--primary)" />
                    <span>Lokasi: {item.lokasi}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Users size={13} color="var(--primary)" />
                    <span>Jenis: {item.jenis}</span>
                  </div>
                </div>

                {currentPermissions.approvePembinaan && (
                  <div style={{ display: 'flex', gap: '6px', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                    {item.status === 'Permohonan Masuk' && (
                      <button onClick={() => handleUpdateStatus(item.id, 'Dijadwalkan')} className="btn btn-outline-primary" style={{ flex: 1, padding: '6px', fontSize: '0.78rem' }}>
                        Setujui & Jadwalkan
                      </button>
                    )}
                    {item.status === 'Dijadwalkan' && (
                      <button onClick={() => handleUpdateStatus(item.id, 'Dalam Proses')} className="btn btn-primary" style={{ flex: 1, padding: '6px', fontSize: '0.78rem' }}>
                        Mulai Pembinaan
                      </button>
                    )}
                    {item.status === 'Dalam Proses' && (
                      <button onClick={() => handleUpdateStatus(item.id, 'Selesai')} className="btn btn-secondary" style={{ flex: 1, padding: '6px', fontSize: '0.78rem', color: 'var(--accent-green)' }}>
                        Tandai Selesai
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Form Permohonan Pembinaan Statistik Sektoral">
        <form onSubmit={handleCreatePermohonan}>
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
            <label className="form-label">Judul Topik / Kebutuhan Pembinaan</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Pendampingan Kompromin Sektor Pertanian 2026"
              value={formData.topik}
              onChange={(e) => setFormData({ ...formData, topik: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tanggal Diusulkan</label>
            <input
              type="date"
              className="form-input"
              value={formData.tanggalUsulan}
              onChange={(e) => setFormData({ ...formData, tanggalUsulan: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Rencana Usulan Lokasi</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ruang Rapat BPS / Aula OPD / Zoom"
              value={formData.lokasi}
              onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Perwakilan Kontak OPD</label>
            <input
              type="text"
              className="form-input"
              placeholder="Nama Kasie / Pengelola Data OPD"
              value={formData.perwakilanOPD}
              onChange={(e) => setFormData({ ...formData, perwakilanOPD: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Send size={15} />
              <span>Kirim Permohonan</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
