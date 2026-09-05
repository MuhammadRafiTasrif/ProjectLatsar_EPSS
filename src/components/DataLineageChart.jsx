import React from 'react';
import { Building2, FileCheck2, ShieldCheck, BookOpenCheck, ArrowDown } from 'lucide-react';

export default function DataLineageChart({ selectedOpd }) {
  const steps = [
    {
      stage: '1. OPD Produsen Data',
      title: selectedOpd ? selectedOpd.nama : 'Dinas Kesehatan / OPD Pasaman',
      desc: 'Pengumpulan data administrasi sektoral & kompilasi internal OPD.',
      icon: Building2,
      color: '#2563eb',
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
      color: '#059669',
      badge: 'Terverifikasi'
    },
    {
      stage: '4. Integrasi Publikasi Resmi BPS',
      title: 'Pasaman Dalam Angka (DDA)',
      desc: 'Data sektoral masuk ke DDA Pasaman, PDRB, & Portal Satu Data Indonesia.',
      icon: BookOpenCheck,
      color: '#2563eb',
      badge: 'Publikasi BPS'
    }
  ];

  return (
    <div className="glass-card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
          Alur & Transparansi Asal-Usul Data
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
          Proses alur data statistik sektoral dari instansi Pemkab Pasaman hingga publikasi resmi BPS.
        </p>
      </div>

      <div className="lineage-horizontal" style={{ display: 'flex', alignItems: 'stretch', gap: '8px', minWidth: '700px' }}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={idx}>
              <div
                className="lineage-node active"
                style={{ flex: 1, borderTop: `3px solid ${step.color}` }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: step.color }}>
                    {step.stage}
                  </span>
                  <span className="badge" style={{ background: `${step.color}12`, color: step.color, border: `1px solid ${step.color}30`, fontSize: '0.62rem' }}>
                    {step.badge}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ background: `${step.color}14`, padding: '6px', borderRadius: 'var(--radius-sm)' }}>
                    <Icon size={18} color={step.color} />
                  </div>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.2' }}>
                    {step.title}
                  </h5>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.35' }}>
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="lineage-arrow-h" style={{ display: 'flex', alignItems: 'center', padding: '0 2px', color: 'var(--primary)', fontSize: '1.2rem' }}>
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
