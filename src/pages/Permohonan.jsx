import React, { useState } from 'react';
import Modal from '../components/Modal';
import { FilePlus, Calendar, MapPin, Users, CheckCircle, Clock, Send, ShieldAlert } from 'lucide-react';
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

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Bar */}
      <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Permohonan & Layanan Pembinaan Statistik Sektoral
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Form pengajuan layanan pendampingan Kompromin, metadata statistik, rekomendasi kegiatan (Romantik), dan konsultasi teknis BPS Pasaman.
          </p>
        </div>

        {currentPermissions.submitPembinaan ? (
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <FilePlus size={18} />
            <span>Ajukan Pembinaan Baru</span>
          </button>
        ) : (
          <div className="badge badge-warning" style={{ gap: '6px' }}>
            <ShieldAlert size={14} />
            <span>Pengajuan Dibatasi (Mode Baca)</span>
          </div>
        )}
      </div>

      {/* Status Tracker Grid / Kanban Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {pembinaanList.map(item => (
          <div key={item.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <span className={`badge ${
                item.status === 'Selesai' ? 'badge-success' :
                item.status === 'Dalam Proses' ? 'badge-warning' :
                item.status === 'Dijadwalkan' ? 'badge-info' : 'badge-purple'
              }`}>
                {item.status}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{item.id}</span>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.3' }}>
                {item.topik}
              </h4>
              <span style={{ fontSize: '0.82rem', color: 'var(--primary-hover)', fontWeight: 700, display: 'block', marginTop: '4px' }}>
                {item.opdNama}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'var(--bg-main)', padding: '10px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} color="var(--primary)" />
                <span>Usulan: {formatDateIndo(item.tanggalUsulan)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} color="var(--primary)" />
                <span>Lokasi: {item.lokasi}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={14} color="var(--primary)" />
                <span>Jenis: {item.jenis}</span>
              </div>
            </div>

            {/* Admin Approval Actions */}
            {currentPermissions.approvePembinaan && (
              <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
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
        ))}
      </div>

      {/* Modal Form Pengajuan */}
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Send size={16} />
              <span>Kirim Permohonan</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
