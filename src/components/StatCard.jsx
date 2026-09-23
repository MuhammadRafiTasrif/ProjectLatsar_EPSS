import React from 'react';

export default function StatCard({ title, value, subtext, icon: Icon, color = '#f79039', onClick }) {
  return (
    <div
      className="glass-card"
      onClick={onClick}
      style={{
        padding: '1.25rem',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      title={onClick ? `Klik untuk melihat detail ${title}` : undefined}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{title}</span>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '4px', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            {value}
          </h3>
        </div>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: 'var(--radius-md)',
          background: `${color}14`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${color}25`
        }}>
          {Icon && <Icon size={20} color={color} />}
        </div>
      </div>
      {subtext && (
        <div style={{ marginTop: '10px', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{subtext}</span>
          {onClick && <span style={{ color: color, fontWeight: 700, fontSize: '0.74rem' }}>Lihat Detail &rarr;</span>}
        </div>
      )}
    </div>
  );
}

