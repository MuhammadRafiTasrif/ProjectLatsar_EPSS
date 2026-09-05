import React, { useState } from 'react';
import Modal from '../components/Modal';
import { History, Printer, Search, FileText, CheckCircle2, Clock, Calendar, Inbox } from 'lucide-react';
import { formatDateIndo, printElement } from '../utils/helpers';

export default function Riwayat({ pembinaanList, currentPermissions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered = pembinaanList.filter(item =>
    item.opdNama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.topik.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jenis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Selesai': return { cls: 'badge-success', icon: <CheckCircle2 size={11} /> };
      case 'Dalam Proses': return { cls: 'badge-warning', icon: <Clock size={11} /> };
      default: return { cls: 'badge-info', icon: <Calendar size={11} /> };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Riwayat & Rekam Jejak Pembinaan OPD
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
            Histori pelaksanaan pembinaan, notulen rapat, dokumentasi, dan cetak Berita Acara resmi.
          </p>
        </div>

        <div style={{ position: 'relative', width: '260px', minWidth: '200px' }}>
          <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Cari OPD atau topik..."
            style={{ paddingLeft: '34px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-state-icon"><Inbox size={24} /></div>
          <span className="empty-state-title">{searchTerm ? 'Tidak ditemukan' : 'Belum ada riwayat'}</span>
          <span className="empty-state-desc">
            {searchTerm
              ? `Tidak ada hasil untuk "${searchTerm}". Coba kata kunci lain.`
              : 'Belum ada catatan pembinaan yang tercatat di sistem.'}
          </span>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(item => {
            const badge = getStatusBadge(item.status);
            return (
              <div key={item.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>{item.id}</span>
                    <span className={`badge ${badge.cls}`}>
                      {badge.icon}
                      {item.status}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>{item.jenis}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Pelaksanaan: {formatDateIndo(item.tanggalPelaksanaan)}
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>{item.topik}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--primary-hover)', fontWeight: 700, marginTop: '2px' }}>{item.opdNama}</p>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    Notulen Hasil Pembinaan:
                  </span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '3px', fontStyle: 'italic' }}>
                    "{item.notulen || 'Belum ada notulen resmi.'}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span>Pembina: <strong style={{ color: 'var(--text-main)' }}>{item.pembinaBPS}</strong></span>
                    <span>Perwakilan OPD: <strong style={{ color: 'var(--text-main)' }}>{item.perwakilanOPD}</strong></span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="btn btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                    >
                      <FileText size={13} />
                      <span>Detail</span>
                    </button>
                    {currentPermissions.exportData && (
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setTimeout(() => printElement('printable-berita-acara'), 100);
                        }}
                        className="btn btn-primary"
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        <Printer size={13} />
                        <span>Cetak</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title="Berita Acara Pembinaan Statistik Sektoral">
        {selectedItem && (
          <div id="printable-berita-acara">
            <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid var(--primary)', paddingBottom: '12px' }}>
              <h2 style={{ fontSize: '1.1rem', color: 'var(--primary-hover)', fontWeight: 800 }}>BADAN PUSAT STATISTIK KABUPATEN PASAMAN</h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Jl. Abdul Latif No. 5, Lubuk Sikaping, Kabupaten Pasaman, Sumatera Barat</p>
              <h3 style={{ marginTop: '10px', fontSize: '1rem', fontWeight: 800, textDecoration: 'underline' }}>
                BERITA ACARA PEMBINAAN STATISTIK SEKTORAL
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Nomor: BA-SIMPONITAS/{selectedItem.id.toUpperCase()}/2026</p>
            </div>

            <table style={{ width: '100%', marginBottom: '16px', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['Instansi / OPD Pemohon', selectedItem.opdNama],
                  ['Jenis Layanan', selectedItem.jenis],
                  ['Topik Kegiatan', selectedItem.topik],
                  ['Tanggal Pelaksanaan', formatDateIndo(selectedItem.tanggalPelaksanaan)],
                  ['Tempat / Lokasi', selectedItem.lokasi],
                  ['Tim Pembina BPS', selectedItem.pembinaBPS],
                  ['Perwakilan OPD', selectedItem.perwakilanOPD]
                ].map(([label, val], i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, width: '30%', padding: '6px 10px', borderBottom: '1px solid var(--border-color)' }}>{label}</td>
                    <td style={{ padding: '6px 10px', borderBottom: '1px solid var(--border-color)' }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: '14px', background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
              <h4 style={{ fontSize: '0.88rem', color: 'var(--primary)', marginBottom: '4px' }}>Kesepakatan & Notulen:</h4>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>{selectedItem.notulen}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', textAlign: 'center' }}>
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
