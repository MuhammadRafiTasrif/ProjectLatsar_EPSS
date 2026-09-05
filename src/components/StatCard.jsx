import React from 'react';

export default function StatCard({ title, value, subtext, icon: Icon, color = '#f79039', trend }) {
  return (
    <div className="glass-card" style={{ padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{title}</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            {value}
          </h3>
        </div>
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: 'var(--radius-md)',
          background: `${color}18`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${color}35`
        }}>
          {Icon && <Icon size={22} color={color} />}
        </div>
      </div>
      {(subtext || trend) && (
        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {trend && (
            <span style={{ color: trend.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-amber)', fontWeight: 700 }}>
              {trend}
            </span>
          )}
          <span>{subtext}</span>
        </div>
      )}
    </div>
  );
}
