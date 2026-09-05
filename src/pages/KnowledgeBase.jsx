import React, { useState } from 'react';
import { BookOpen, Download, Search, FileText, ExternalLink, HelpCircle } from 'lucide-react';

export default function KnowledgeBase({ knowledgeBase }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = knowledgeBase.filter(item =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Knowledge Management & Referensi Pembinaan
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Pusat pengetahuan, SOP pembinaan statistik sektoral, template baku Kompromin, dan regulasi Satu Data Indonesia.
          </p>
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Cari SOP atau template..."
            style={{ paddingLeft: '36px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filtered.map(item => (
          <div key={item.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge badge-primary">{item.tipe}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.ukuran}</span>
            </div>

            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.3' }}>
                {item.judul}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.4' }}>
                {item.deskripsi}
              </p>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rilis: {item.tanggal}</span>
              <button
                onClick={() => alert(`Simulasi mengunduh berkas referensi: ${item.judul}`)}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              >
                <Download size={14} />
                <span>Unduh Modul</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
