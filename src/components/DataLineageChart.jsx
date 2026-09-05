import React from 'react';
import { Building2, FileCheck2, ShieldCheck, BookOpenCheck, ArrowRight } from 'lucide-react';

export default function DataLineageChart({ selectedOpd }) {
  const steps = [
    {
      stage: '1. OPD Produsen Data',
      title: selectedOpd ? selectedOpd.nama : 'Dinas Kesehatan / OPD Pasaman',
      desc: 'Pengumpulan data administrasi sektoral & kompilasi internal OPD.',
      icon: Building2,
      color: '#3b82f6',
      badge: 'Produsen Data'
    },
    {
      stage: '2. Pembinaan & Pendampingan BPS',
      title: 'TIM SIMPONITAS BPS',
      desc: 'Pendampingan metodologi, pembinaan metadata (MS-D), & standar kualitas.',
      icon: FileCheck2,
      color: '#f79039',
      badge: 'Penelaahan BPS'
    },
    {
      stage: '3. Kompromin Terverifikasi',
      title: 'Penerbitan Kompromin 2025',
      desc: 'Persetujuan & penerbitan dokumen Kompromin dengan SK resmi.',
      icon: ShieldCheck,
      color: '#10b981',
      badge: 'Terverifikasi'
    },
    {
      stage: '4. Integrasi Publikasi Resmi BPS',
      title: 'Pasaman Dalam Angka (DDA)',
      desc: 'Data sektoral masuk ke DDA Pasaman, PDRB, & Portal Satu Data Indonesia.',
      icon: BookOpenCheck,
      color: '#8b5cf6',
      badge: 'Publikasi BPS'
    }
  ];

  return (
    <div className="glass-card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
          Alur & Transparansi Asal-Usul Data (Data Lineage Traceability)
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
          Menjelaskan proses alur data statistik sektoral dari instansi Pemkab Pasaman hingga menjadi publikasi resmi BPS.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', minWidth: '850px' }}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={idx}>
              <div
                className="lineage-node active"
                style={{ flex: 1, borderTop: `4px solid ${step.color}` }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: step.color, textTransform: 'uppercase' }}>
                    {step.stage}
                  </span>
                  <span className="badge" style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}40`, fontSize: '0.65rem' }}>
                    {step.badge}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <div style={{ background: `${step.color}20`, padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                    <Icon size={20} color={step.color} />
                  </div>
                  <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.2' }}>
                    {step.title}
                  </h5>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.3' }}>
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 4px' }}>
                  <ArrowRight size={22} color="var(--primary)" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
