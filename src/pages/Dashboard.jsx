import React from 'react';
import StatCard from '../components/StatCard';
import { Building2, CheckCircle2, Clock, FileSpreadsheet, ArrowUpRight, Inbox } from 'lucide-react';

export default function Dashboard({ opdList, pembinaanList, komprominList, onNavigate }) {
  const totalOpd = opdList.length;
  const opdTerbina = opdList.filter(o => o.totalPembinaan > 0).length;
  const komprominTerbit = komprominList.filter(k => k.statusVerifikasi === 'Terverifikasi').length;
  const pendingPermohonan = pembinaanList.filter(p => p.status === 'Permohonan Masuk' || p.status === 'Dijadwalkan').length;

  if (totalOpd === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="glass-card empty-state">
          <div className="empty-state-icon"><Inbox size={24} /></div>
          <span className="empty-state-title">Belum ada data OPD</span>
          <span className="empty-state-desc">Data OPD Pasaman belum tersedia. Hubungi administrator untuk menambahkan data awal.</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-card" style={{
        padding: '1.5rem',
        background: 'var(--primary-light)',
        border: '1px solid var(--primary-border)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            Selamat Datang di SIMPONITAS Pasaman
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.6' }}>
            Tata kelola pembinaan statistik sektoral terintegrasi dan penerbitan Kompilasi Produk Administrasi (Kompromin) berkualitas di lingkungan BPS & OPD Kabupaten Pasaman.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <StatCard
          title="Total OPD Pasaman"
          value={totalOpd}
          subtext="Instansi Perangkat Daerah"
          icon={Building2}
          color="#2563eb"
        />
        <StatCard
          title="OPD Telah Dibina"
          value={opdTerbina}
          subtext={`Dari total ${totalOpd} OPD`}
          icon={CheckCircle2}
          color="#059669"
        />
        <StatCard
          title="Kompromin Diterbitkan"
          value={komprominTerbit}
          subtext="Dokumen Terverifikasi"
          icon={FileSpreadsheet}
          color="#f79039"
        />
        <StatCard
          title="Permohonan Aktif"
          value={pendingPermohonan}
          subtext="Menunggu / Proses"
          icon={Clock}
          color="#2563eb"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Status Penerbitan Kompromin OPD
            </h4>
            <span className="badge badge-info">Realisasi 2025/2026</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0.75rem 0' }}>
            <svg width="140" height="140" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--border-color)" strokeWidth="4"></circle>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#059669" strokeWidth="4.5" strokeDasharray="60 40" strokeDashoffset="25"></circle>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#d97706" strokeWidth="4.5" strokeDasharray="25 75" strokeDashoffset="65"></circle>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#2563eb" strokeWidth="4.5" strokeDasharray="15 85" strokeDashoffset="40"></circle>
              <text x="21" y="22" textAnchor="middle" fill="var(--text-main)" fontSize="7" fontWeight="800">12 Terbit</text>
            </svg>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { color: '#059669', label: 'Terverifikasi', value: '12 OPD (60%)' },
                { color: '#d97706', label: 'Dalam Review BPS', value: '5 OPD (25%)' },
                { color: '#2563eb', label: 'Draft Internal OPD', value: '3 OPD (15%)' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color, flexShrink: 0 }}></span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{item.label}: <strong>{item.value}</strong></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Frekuensi Pembinaan Terbanyak
            </h4>
            <span className="badge badge-primary">Top 5 Instansi</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { nama: 'Dinas Kominfo Pasaman', count: 8, pct: 100 },
              { nama: 'Dinas Pertanian Pasaman', count: 6, pct: 75 },
              { nama: 'Dinas Kesehatan Pasaman', count: 5, pct: 62 },
              { nama: 'Dinas Kependudukan & Capil', count: 5, pct: 62 },
              { nama: 'Dinas Pendidikan Pasaman', count: 4, pct: 50 }
            ].map((bar, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{bar.nama}</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{bar.count}</span>
                </div>
                <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: `${bar.pct}%`, height: '100%', background: 'var(--primary)', borderRadius: 'var(--radius-full)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Status Progres Pembinaan per OPD
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Pemantauan rekam pembinaan dan penerbitan Kompromin.
            </p>
          </div>
          <button onClick={() => onNavigate('permohonan')} className="btn btn-primary">
            <span>Ajukan Pembinaan</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Instansi / OPD</th>
                <th>Kode</th>
                <th>Penanggung Jawab</th>
                <th>Status Kompromin</th>
                <th>Frekuensi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {opdList.slice(0, 6).map((opd, idx) => (
                <tr key={opd.id}>
                  <td>{idx + 1}</td>
                  <td style={{ fontWeight: 700 }}>{opd.nama}</td>
                  <td><span className="badge badge-info">{opd.kode}</span></td>
                  <td>{opd.penanggungJawab}</td>
                  <td>
                    <span className={`badge ${
                      opd.statusKompromin === 'Terverifikasi' ? 'badge-success' :
                      opd.statusKompromin === 'Dalam Review' ? 'badge-warning' : 'badge-info'
                    }`}>
                      {opd.statusKompromin === 'Terverifikasi' && <CheckCircle2 size={12} />}
                      {opd.statusKompromin === 'Dalam Review' && <Clock size={12} />}
                      {opd.statusKompromin}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>{opd.totalPembinaan}</td>
                  <td>
                    <button onClick={() => onNavigate('riwayat')} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
