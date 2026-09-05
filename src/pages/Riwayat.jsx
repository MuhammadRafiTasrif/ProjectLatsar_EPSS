import React, { useState } from 'react';
import Modal from '../components/Modal';
import { History, Printer, Search, FileText, Calendar, Users, Building, ShieldCheck } from 'lucide-react';
import { formatDateIndo, printElement } from '../utils/helpers';

export default function Riwayat({ pembinaanList, currentPermissions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered = pembinaanList.filter(item =>
    item.opdNama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.topik.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jenis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Search Header */}
      <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Riwayat & Rekam Jejak Pembinaan OPD
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Histori lengkap pelaksanaan pembinaan statistik sektoral, notulen rapat, dokumentasi, dan cetak Berita Acara resmi.
          </p>
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Cari OPD atau topik..."
            style={{ paddingLeft: '36px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* History Log Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map(item => (
          <div key={item.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>{item.id}</span>
                <span className={`badge ${
                  item.status === 'Selesai' ? 'badge-success' :
                  item.status === 'Dalam Proses' ? 'badge-warning' : 'badge-info'
                }`}>
                  {item.status}
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>{item.jenis}</span>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Pelaksanaan: {formatDateIndo(item.tanggalPelaksanaan)}
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>{item.topik}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--primary-hover)', fontWeight: 700, marginTop: '2px' }}>{item.opdNama}</p>
            </div>

            <div style={{ background: 'var(--bg-main)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Notulen Hasil Pembinaan:
              </span>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px', fontStyle: 'italic' }}>
                "{item.notulen || 'Belum ada notulen resmi.'}"
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>Pembina BPS: <strong style={{ color: 'var(--text-main)' }}>{item.pembinaBPS}</strong></span>
                <span>Perwakilan OPD: <strong style={{ color: 'var(--text-main)' }}>{item.perwakilanOPD}</strong></span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  <FileText size={14} />
                  <span>Lihat Detail</span>
                </button>
                {currentPermissions.exportData && (
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setTimeout(() => printElement('printable-berita-acara'), 100);
                    }}
                    className="btn btn-primary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <Printer size={14} />
                    <span>Cetak Berita Acara</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail & Printable View */}
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title="Berita Acara Pembinaan Statistik Sektoral">
        {selectedItem && (
          <div id="printable-berita-acara">
            <div className="header-box" style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid var(--primary)' }}>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--primary-hover)', fontWeight: 800 }}>BADAN PUSAT STATISTIK KABUPATEN PASAMAN</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Jl. Abdul Latif No. 5, Lubuk Sikaping, Kabupaten Pasaman, Sumatera Barat</p>
              <h3 style={{ marginTop: '12px', fontSize: '1.05rem', fontWeight: 800, textDecoration: 'underline' }}>
                BERITA ACARA PEMBINAAN STATISTIK SEKTORAL
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nomor: BA-SIMPONITAS/{selectedItem.id.toUpperCase()}/2026</p>
            </div>

            <table className="info-table" style={{ width: '100%', marginBottom: '16px' }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 700, width: '30%' }}>Instansi / OPD Pemohon</td>
                  <td>{selectedItem.opdNama}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>Jenis Layanan</td>
                  <td>{selectedItem.jenis}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>Topik Kegiatan</td>
                  <td>{selectedItem.topik}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>Tanggal Pelaksanaan</td>
                  <td>{formatDateIndo(selectedItem.tanggalPelaksanaan)}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>Tempat / Lokasi</td>
                  <td>{selectedItem.lokasi}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>Tim Pembina BPS</td>
                  <td>{selectedItem.pembinaBPS}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>Perwakilan OPD</td>
                  <td>{selectedItem.perwakilanOPD}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginTop: '16px', background: 'var(--bg-main)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '4px' }}>Kesepakatan & Notulen Pembinaan:</h4>
              <p style={{ fontSize: '0.88rem', lineHeight: '1.5' }}>{selectedItem.notulen}</p>
            </div>

            <div className="footer-sign" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', textAlign: 'center' }}>
              <div>
                <p>Perwakilan OPD Pasaman,</p>
                <div style={{ height: '50px' }}></div>
                <p><strong>({selectedItem.perwakilanOPD})</strong></p>
              </div>
              <div>
                <p>Pembina BPS Pasaman,</p>
                <div style={{ height: '50px' }}></div>
                <p><strong>({selectedItem.pembinaBPS})</strong></p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
