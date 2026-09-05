import React, { useState } from 'react';
import { Download, Search, Inbox } from 'lucide-react';

export default function KnowledgeBase({ knowledgeBase }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = knowledgeBase.filter(item =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Knowledge Management & Referensi
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
            SOP pembinaan statistik sektoral, template Kompromin, dan regulasi Satu Data Indonesia.
          </p>
        </div>

        <div style={{ position: 'relative', width: '260px', minWidth: '200px' }}>
          <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Cari SOP atau template..."
            style={{ paddingLeft: '34px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-state-icon"><Inbox size={24} /></div>
          <span className="empty-state-title">{searchTerm ? 'Tidak ditemukan' : 'Belum ada referensi'}</span>
          <span className="empty-state-desc">
            {searchTerm
              ? `Tidak ada dokumen untuk "${searchTerm}". Coba kata kunci lain.`
              : 'Modul referensi belum tersedia.'}
          </span>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {filtered.map(item => (
            <div key={item.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge badge-primary">{item.tipe}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.ukuran}</span>
              </div>

              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.3' }}>
                  {item.judul}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  {item.deskripsi}
                </p>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Rilis: {item.tanggal}</span>
                <button
                  onClick={() => alert(`Simulasi mengunduh: ${item.judul}`)}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.76rem' }}
                >
                  <Download size={13} />
                  <span>Unduh</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
