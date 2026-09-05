import React, { useState } from 'react';
import Modal from '../components/Modal';
import { FileText, Download, CheckCircle, Clock, Upload, ShieldCheck, Filter } from 'lucide-react';
import { formatDateIndo } from '../utils/helpers';

export default function Kompromin({ komprominList, setKomprominList, opdList, currentPermissions }) {
  const [filterOpd, setFilterOpd] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newDraft, setNewDraft] = useState({
    judul: '',
    opdId: opdList[0]?.id || '',
    tahun: 2026,
    ringkasan: ''
  });

  const filtered = komprominList.filter(item => {
    const matchOpd = filterOpd === 'ALL' || item.opdId === filterOpd;
    const matchStatus = filterStatus === 'ALL' || item.statusVerifikasi === filterStatus;
    return matchOpd && matchStatus;
  });

  const handleVerify = (id) => {
    setKomprominList(komprominList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          statusVerifikasi: 'Terverifikasi',
          nomorSk: `SK-KOMPROMIN/BPS/${new Date().getFullYear()}-${Math.floor(Math.random()*90 + 10)}`,
          tanggalTerbit: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
    alert('Dokumen Kompromin berhasil diverifikasi dan diterbitkan SK resminya!');
  };

  const handleUploadDraft = (e) => {
    e.preventDefault();
    const opd = opdList.find(o => o.id === newDraft.opdId);
    const draftEntry = {
      id: `komp-${Date.now()}`,
      judul: newDraft.judul,
      opdId: newDraft.opdId,
      opdNama: opd ? opd.nama : 'OPD Pasaman',
      tahun: Number(newDraft.tahun),
      statusVerifikasi: 'Dalam Review',
      nomorSk: '-',
      tanggalTerbit: '-',
      jumlahTabel: 10,
      ringkasan: newDraft.ringkasan,
      fileUrl: '/docs/draft_kompromin.pdf'
    };

    setKomprominList([draftEntry, ...komprominList]);
    setIsUploadModalOpen(false);
    setNewDraft({ judul: '', opdId: opdList[0]?.id || '', tahun: 2026, ringkasan: '' });
    alert('Draft Kompromin berhasil diunggah ke BPS Kabupaten Pasaman untuk di-review!');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Repository Kompromin (Kompilasi Produk Administrasi)
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Katalog terpusat dokumen Kompromin OPD Kabupaten Pasaman terverifikasi BPS.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {currentPermissions.submitPembinaan && (
            <button onClick={() => setIsUploadModalOpen(true)} className="btn btn-primary">
              <Upload size={16} />
              <span>Unggah Draft Kompromin</span>
            </button>
          )}
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
          <Filter size={16} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Filter:</span>
        </div>

        <select
          className="form-select"
          style={{ width: 'auto', padding: '6px 12px' }}
          value={filterOpd}
          onChange={(e) => setFilterOpd(e.target.value)}
        >
          <option value="ALL">Semua OPD Pasaman</option>
          {opdList.map(opd => (
            <option key={opd.id} value={opd.id}>{opd.kode} - {opd.nama}</option>
          ))}
        </select>

        <select
          className="form-select"
          style={{ width: 'auto', padding: '6px 12px' }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="ALL">Semua Status Verifikasi</option>
          <option value="Terverifikasi">Terverifikasi (Diterbitkan)</option>
          <option value="Dalam Review">Dalam Review BPS</option>
          <option value="Draft OPD">Draft Internal OPD</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.25rem' }}>
        {filtered.map(item => (
          <div key={item.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <span className={`badge ${
                item.statusVerifikasi === 'Terverifikasi' ? 'badge-success' :
                item.statusVerifikasi === 'Dalam Review' ? 'badge-warning' : 'badge-purple'
              }`}>
                {item.statusVerifikasi}
              </span>
              <span className="badge badge-primary">{item.tahun}</span>
            </div>

            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: '1.3' }}>
                {item.judul}
              </h3>
              <span style={{ fontSize: '0.82rem', color: 'var(--primary-hover)', fontWeight: 700, display: 'block', marginTop: '4px' }}>
                {item.opdNama}
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              {item.ringkasan}
            </p>

            <div style={{ background: 'var(--bg-main)', padding: '10px 12px', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <div>Nomor SK: <strong style={{ color: 'var(--text-main)' }}>{item.nomorSk}</strong></div>
              <div>Tanggal Terbit: <strong style={{ color: 'var(--text-main)' }}>{formatDateIndo(item.tanggalTerbit)}</strong></div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
              <a
                href={item.fileUrl}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.78rem', textDecoration: 'none' }}
                onClick={(e) => { e.preventDefault(); alert(`Simulasi mengunduh berkas Kompromin: ${item.judul}`); }}
              >
                <Download size={14} />
                <span>Unduh Dokumen PDF</span>
              </a>

              {currentPermissions.verifyKompromin && item.statusVerifikasi !== 'Terverifikasi' && (
                <button
                  onClick={() => handleVerify(item.id)}
                  className="btn btn-primary"
                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                >
                  <ShieldCheck size={14} />
                  <span>Verifikasi & Terbitkan SK</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Unggah Draft Kompromin OPD">
        <form onSubmit={handleUploadDraft}>
          <div className="form-group">
            <label className="form-label">Instansi / OPD Penyusun</label>
            <select
              className="form-select"
              value={newDraft.opdId}
              onChange={(e) => setNewDraft({ ...newDraft, opdId: e.target.value })}
              required
            >
              {opdList.map(opd => (
                <option key={opd.id} value={opd.id}>{opd.nama}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Judul Dokumen Kompromin</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Kompilasi Produk Administrasi Kesehatan 2026"
              value={newDraft.judul}
              onChange={(e) => setNewDraft({ ...newDraft, judul: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tahun Pelaporan</label>
            <input
              type="number"
              className="form-input"
              value={newDraft.tahun}
              onChange={(e) => setNewDraft({ ...newDraft, tahun: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Ringkasan Isi & Cakupan Variabel</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Penjelasan ringkas cakupan data sektoral..."
              value={newDraft.ringkasan}
              onChange={(e) => setNewDraft({ ...newDraft, ringkasan: e.target.value })}
              required
            ></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
            <button type="button" onClick={() => setIsUploadModalOpen(false)} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Upload size={16} />
              <span>Unggah Draft</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
