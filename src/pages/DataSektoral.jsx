import React, { useState } from 'react';
import Modal from '../components/Modal';
import { Download, Plus, Search, Filter, Inbox } from 'lucide-react';
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Repository Data Statistik Sektoral
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
            Himpunan tabel data statistik sektoral hasil pembinaan OPD Kabupaten Pasaman.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {currentPermissions.exportData && (
            <button onClick={() => exportToCSV('data_statistik_sektoral_pasaman', filtered)} className="btn btn-secondary">
              <Download size={15} />
              <span>Ekspor CSV</span>
            </button>
          )}

          {currentPermissions.manageDataSektoral && (
            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
              <Plus size={15} />
              <span>Tambah Indikator</span>
            </button>
          )}
        </div>
      </div>

      <div className="glass-card" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Cari indikator atau instansi OPD..."
            style={{ paddingLeft: '34px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select className="form-select" style={{ width: 'auto', padding: '10px 14px' }} value={selectedKategori} onChange={(e) => setSelectedKategori(e.target.value)}>
          <option value="ALL">Semua Kategori</option>
          <option value="Kesehatan">Kesehatan</option>
          <option value="Pendidikan">Pendidikan</option>
          <option value="Pertanian">Pertanian & Pangan</option>
          <option value="Komunikasi">Komunikasi & TIK</option>
          <option value="Infrastruktur">Infrastruktur & PUPR</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-state-icon"><Inbox size={24} /></div>
          <span className="empty-state-title">{searchTerm || selectedKategori !== 'ALL' ? 'Tidak ditemukan' : 'Belum ada data'}</span>
          <span className="empty-state-desc">
            {searchTerm || selectedKategori !== 'ALL'
              ? 'Tidak ada data yang sesuai filter. Coba ubah kata kunci atau kategori.'
              : 'Belum ada dataset statistik sektoral. Tambahkan data melalui tombol di atas.'}
          </span>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Indikator</th>
                  <th>Instansi OPD</th>
                  <th>Nilai Data</th>
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
                    <td style={{ fontWeight: 700, color: 'var(--primary-hover)' }}>{item.nilai}</td>
                    <td><span className="badge badge-info">{item.satuan}</span></td>
                    <td>{item.tahun}</td>
                    <td><span className="badge badge-primary">{item.kategori}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tambah Dataset Indikator Sektoral">
        <form onSubmit={handleAddData}>
          <div className="form-group">
            <label className="form-label">Nama Indikator</label>
            <input type="text" className="form-input" placeholder="Contoh: Jumlah Tenaga Kesehatan per Puskesmas" value={newEntry.indikator} onChange={(e) => setNewEntry({ ...newEntry, indikator: e.target.value })} required />
          </div>

          <div className="form-group">
            <label className="form-label">Instansi OPD</label>
            <input type="text" className="form-input" value={newEntry.OPD} onChange={(e) => setNewEntry({ ...newEntry, OPD: e.target.value })} required />
          </div>

          <div className="form-group">
            <label className="form-label">Nilai Data Capaian</label>
            <input type="text" className="form-input" placeholder="Contoh: 154" value={newEntry.nilai} onChange={(e) => setNewEntry({ ...newEntry, nilai: e.target.value })} required />
          </div>

          <div className="form-group">
            <label className="form-label">Satuan Data</label>
            <input type="text" className="form-input" placeholder="Orang / Ton / Unit / %" value={newEntry.satuan} onChange={(e) => setNewEntry({ ...newEntry, satuan: e.target.value })} required />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Batal</button>
            <button type="submit" className="btn btn-primary">
              <Plus size={15} />
              <span>Simpan Data</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
