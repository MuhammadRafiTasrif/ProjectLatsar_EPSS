import React from 'react';
import StatCard from '../components/StatCard';
import { Building2, CheckCircle2, Clock, FileSpreadsheet, Activity, ArrowUpRight } from 'lucide-react';

export default function Dashboard({ opdList, pembinaanList, komprominList, onNavigate }) {
  const totalOpd = opdList.length;
  const opdTerbina = opdList.filter(o => o.totalPembinaan > 0).length;
  const komprominTerbit = komprominList.filter(k => k.statusVerifikasi === 'Terverifikasi').length;
  const pendingPermohonan = pembinaanList.filter(p => p.status === 'Permohonan Masuk' || p.status === 'Dijadwalkan').length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Banner Intro */}
      <div className="glass-card" style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(247, 144, 57, 0.15) 0%, rgba(224, 125, 40, 0.05) 100%)',
        border: '1px solid var(--primary-border)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '10px' }}>
            <Activity size={14} color="var(--primary)" />
            <span>Sistem Informasi Manajemen Pembinaan Statistik Sektoral</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            Selamat Datang di SIMPONITAS Pasaman
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
            Mengoptimalkan tata kelola pembinaan statistik sektoral terintegrasi dan penerbitan Kompilasi Produk Administrasi (Kompromin) berkualitas di lingkungan BPS & Organisasi Perangkat Daerah (OPD) Kabupaten Pasaman.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <StatCard
          title="Total OPD Pasaman"
          value={totalOpd}
          subtext="Instansi Perangkat Daerah"
          icon={Building2}
          color="#3b82f6"
          trend="+100% Terdaftar"
        />
        <StatCard
          title="OPD Telah Dibina"
          value={opdTerbina}
          subtext={`Dari total ${totalOpd} OPD`}
          icon={CheckCircle2}
          color="#10b981"
          trend="80% Rasio Pembinaan"
        />
        <StatCard
          title="Kompromin Diterbitkan"
          value={komprominTerbit}
          subtext="Dokumen Kompromin Terverifikasi"
          icon={FileSpreadsheet}
          color="#f79039"
          trend="SK Resmi BPS"
        />
        <StatCard
          title="Permohonan Pembinaan"
          value={pendingPermohonan}
          subtext="Menunggu / Proses Rapat"
          icon={Clock}
          color="#8b5cf6"
          trend="Aktif"
        />
      </div>

      {/* Charts & Interactive Summary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
        {/* Chart 1: Progres Kompromin OPD (SVG Chart) */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Status Penerbitan Kompromin OPD Pasaman
            </h4>
            <span className="badge badge-info">Realisasi 2025/2026</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '1rem 0' }}>
            <svg width="160" height="160" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--border-color)" strokeWidth="4"></circle>
              {/* Green segment (Terverifikasi) */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="4.5" strokeDasharray="60 40" strokeDashoffset="25"></circle>
              {/* Amber segment (Dalam Review) */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="4.5" strokeDasharray="25 75" strokeDashoffset="65"></circle>
              {/* Purple segment (Draft) */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#8b5cf6" strokeWidth="4.5" strokeDasharray="15 85" strokeDashoffset="40"></circle>
              <text x="21" y="22" textAnchor="middle" fill="var(--text-main)" fontSize="7" fontWeight="800">12 Terbit</text>
            </svg>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Terverifikasi: <strong>12 OPD (60%)</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Dalam Review BPS: <strong>5 OPD (25%)</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#8b5cf6' }}></span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Draft Internal OPD: <strong>3 OPD (15%)</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Top OPD Pembinaan Frekuensi (Bar Chart SVG) */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Frekuensi Pembinaan Terbanyak per OPD
            </h4>
            <span className="badge badge-primary">Top 5 Instansi</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            {[
              { nama: 'Dinas Kominfo Pasaman', count: 8, pct: 100 },
              { nama: 'Dinas Pertanian Pasaman', count: 6, pct: 75 },
              { nama: 'Dinas Kesehatan Pasaman', count: 5, pct: 62 },
              { nama: 'Dinas Kependudukan & Capil', count: 5, pct: 62 },
              { nama: 'Dinas Pendidikan Pasaman', count: 4, pct: 50 }
            ].map((bar, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{bar.nama}</span>
                  <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{bar.count} Kegiatan</span>
                </div>
                <div style={{ height: '8px', background: 'var(--border-color)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: `${bar.pct}%`, height: '100%', background: 'linear-gradient(90deg, #f79039, #e07d28)', borderRadius: 'var(--radius-full)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OPD Pembinaan Status Summary Table */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Status Progres Pembinaan per OPD Pasaman
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Daftar pemantauan real-time rekam pembinaan dan penerbitan Kompromin.
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
                <th>Frekuensi Pembinaan</th>
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
                      opd.statusKompromin === 'Dalam Review' ? 'badge-warning' : 'badge-purple'
                    }`}>
                      {opd.statusKompromin}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 800 }}>{opd.totalPembinaan} Kali</td>
                  <td>
                    <button onClick={() => onNavigate('riwayat')} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                      Detail Histori
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
