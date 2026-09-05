import React, { useState } from 'react';
import DataLineageChart from '../components/DataLineageChart';
import { GitMerge, Inbox } from 'lucide-react';

export default function DataLineage({ opdList }) {
  const [selectedOpdId, setSelectedOpdId] = useState(opdList[0]?.id || '');

  const selectedOpd = opdList.find(o => o.id === selectedOpdId);

  if (!opdList || opdList.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div className="glass-card empty-state">
          <div className="empty-state-icon"><Inbox size={24} /></div>
          <span className="empty-state-title">Belum ada data OPD</span>
          <span className="empty-state-desc">Data OPD Pasaman belum tersedia untuk menampilkan visualisasi aliran data.</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Visualisator Aliran Data (Data Lineage)
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
            Penelusuran silsilah data dari OPD Produsen Data → Pembinaan → Penelaahan BPS → Publikasi DDA.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label htmlFor="opd-lineage-select" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>Pilih OPD:</label>
          <select
            id="opd-lineage-select"
            className="form-select"
            value={selectedOpdId}
            onChange={(e) => setSelectedOpdId(e.target.value)}
            style={{ width: 'auto' }}
          >
            {opdList.map(opd => (
              <option key={opd.id} value={opd.id}>{opd.kode} - {opd.nama}</option>
            ))}
          </select>
        </div>
      </div>

      <DataLineageChart selectedOpd={selectedOpd} />

      {selectedOpd && (
        <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Rincian Metadata Aliran Data — {selectedOpd.nama}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
            {[
              { label: 'Hulu (Source Origin)', color: '#2563eb', title: `Aplikasi SIM-OPD ${selectedOpd.kode}`, desc: `Penanggung Jawab: ${selectedOpd.penanggungJawab} (${selectedOpd.email})` },
              { label: 'Proses Penyelarasan', color: '#f79039', title: 'Pembinaan Metadata MS-D BPS', desc: 'Standardisasi definisi operasional & satuan variabel komoditas.' },
              { label: 'Produk Kompromin', color: '#059669', title: selectedOpd.statusKompromin, desc: `Frekuensi Pembinaan: ${selectedOpd.totalPembinaan} Sesi` }
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: item.color }}>{item.label}</span>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '3px' }}>{item.title}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '3px' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
