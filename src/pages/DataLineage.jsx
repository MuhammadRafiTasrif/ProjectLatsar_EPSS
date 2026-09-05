import React, { useState } from 'react';
import DataLineageChart from '../components/DataLineageChart';
import { GitMerge, Building2, ShieldCheck, Search } from 'lucide-react';

export default function DataLineage({ opdList }) {
  const [selectedOpdId, setSelectedOpdId] = useState(opdList[0]?.id || '');

  const selectedOpd = opdList.find(o => o.id === selectedOpdId);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Dokumentasi & Visualisator Aliran Data (Data Lineage)
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Penelusuran silsilah data dari OPD Produsen Data ➔ Pembinaan Kompromin ➔ Penelaahan BPS ➔ Publikasi Pasaman Dalam Angka (DDA).
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Pilih OPD:</span>
          <select
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
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Rincian Matriks Metadata Aliran Data - {selectedOpd.nama}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-main)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase' }}>Hulu (Source Origin)</span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '4px' }}>Aplikasi SIM-OPD {selectedOpd.kode}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Penanggung Jawab: {selectedOpd.penanggungJawab} ({selectedOpd.email})
              </p>
            </div>

            <div style={{ background: 'var(--bg-main)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f79039', textTransform: 'uppercase' }}>Proses Penyelarasan</span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '4px' }}>Pembinaan Metadata MS-D BPS</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Standardisasi definisi operasional & satuan variabel komoditas.
              </p>
            </div>

            <div style={{ background: 'var(--bg-main)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>Produk Kompromin</span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '4px' }}>{selectedOpd.statusKompromin}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Frekuensi Pembinaan Terdaftar: {selectedOpd.totalPembinaan} Sesi
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
