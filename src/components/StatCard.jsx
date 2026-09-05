import React from 'react';

export default function StatCard({ title, value, subtext, icon: Icon, color = '#f79039' }) {
  return (
    <div className="glass-card" style={{ padding: '1.25rem', position: 'relative' }}>
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
        <div style={{ marginTop: '10px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {subtext}
        </div>
      )}
    </div>
  );
}
