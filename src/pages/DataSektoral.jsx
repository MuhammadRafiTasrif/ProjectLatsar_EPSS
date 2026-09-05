import React, { useState } from 'react';
import Modal from '../components/Modal';
import { Database, Download, Plus, Search, Table, Filter } from 'lucide-react';
import { exportToCSV } from '../utils/helpers';

export default function DataSektoral({ dataSektoral, setDataSektoral, currentPermissions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    indikator: '',
    OPD: 'Dinas Kesehatan Pasaman',
    nilai: '',
    satuan: 'Unit',
    tahun: 2025,
    kategori: 'Kesehatan'
  });

  const filtered = dataSektoral.filter(item => {
    const matchSearch = item.indikator.toLowerCase().includes(searchTerm.toLowerCase()) || item.OPD.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKat = selectedKategori === 'ALL' || item.kategori === selectedKategori;
    return matchSearch && matchKat;
  });

  const handleAddData = (e) => {
    e.preventDefault();
    const item = {
      id: `ds-${Date.now()}`,
      ...newEntry
    };
    setDataSektoral([item, ...dataSektoral]);
    setIsModalOpen(false);
    setNewEntry({ indikator: '', OPD: 'Dinas Kesehatan Pasaman', nilai: '', satuan: 'Unit', tahun: 2025, kategori: 'Kesehatan' });
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Repository Data Statistik Sektoral
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Himpunan tabel data statistik sektoral hasil pembinaan OPD Kabupaten Pasaman.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {currentPermissions.exportData && (
            <button onClick={() => exportToCSV('data_statistik_sektoral_pasaman', filtered)} className="btn btn-secondary">
              <Download size={16} />
              <span>Ekspor Ke CSV</span>
            </button>
          )}

          {currentPermissions.manageDataSektoral && (
            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
              <Plus size={16} />
              <span>Tambah Indikator Sektoral</span>
            </button>
          )}
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Cari nama indikator atau instansi OPD..."
            style={{ paddingLeft: '36px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="form-select"
          style={{ width: 'auto', padding: '10px 14px' }}
          value={selectedKategori}
          onChange={(e) => setSelectedKategori(e.target.value)}
        >
          <option value="ALL">Semua Kategori Sektoral</option>
          <option value="Kesehatan">Kesehatan</option>
          <option value="Pendidikan">Pendidikan</option>
          <option value="Pertanian">Pertanian & Pangan</option>
          <option value="Komunikasi">Komunikasi & TIK</option>
          <option value="Infrastruktur">Infrastruktur & PUPR</option>
        </select>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Indikator Statistik Sektoral</th>
                <th>Instansi OPD Produsen Data</th>
                <th>Capaian Nilai Data</th>
                <th>Satuan</th>
                <th>Tahun</th>
                <th>Kategori</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td style={{ fontWeight: 700 }}>{item.indikator}</td>
                  <td>{item.OPD}</td>
                  <td style={{ fontWeight: 800, color: 'var(--primary-hover)' }}>{item.nilai}</td>
                  <td><span className="badge badge-info">{item.satuan}</span></td>
                  <td>{item.tahun}</td>
                  <td>
                    <span className="badge badge-purple">{item.kategori}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tambah Dataset Indikator Sektoral Baru">
        <form onSubmit={handleAddData}>
          <div className="form-group">
            <label className="form-label">Nama Indikator</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Jumlah Tenaga Kesehatan per Puskesmas"
              value={newEntry.indikator}
              onChange={(e) => setNewEntry({ ...newEntry, indikator: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Instansi OPD</label>
            <input
              type="text"
              className="form-input"
              value={newEntry.OPD}
              onChange={(e) => setNewEntry({ ...newEntry, OPD: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nilai Data Capaian</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: 154"
              value={newEntry.nilai}
              onChange={(e) => setNewEntry({ ...newEntry, nilai: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Satuan Data</label>
            <input
              type="text"
              className="form-input"
              placeholder="Orang / Ton / Unit / %"
              value={newEntry.satuan}
              onChange={(e) => setNewEntry({ ...newEntry, satuan: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Plus size={16} />
              <span>Simpan Data</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
