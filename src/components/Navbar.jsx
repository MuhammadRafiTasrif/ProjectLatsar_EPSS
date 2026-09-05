import React from 'react';
import { Sun, Moon, Shield, Building2, Bell, Sparkles } from 'lucide-react';

export default function Navbar({ isDark, toggleTheme, currentRole, setRole, roles }) {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <div className="brand-badge">
          <Sparkles className="w-5 h-5 text-white" size={20} />
          <span>SIMPONITAS</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '6px' }}>
          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', letterSpacing: '-0.3px' }}>
            BPS KABUPATEN PASAMAN
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 600 }}>
            Sinergi Pembinaan Statistik Sektoral
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Role Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--primary-light)', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-border)' }}>
          <Shield size={16} color="var(--primary)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-hover)' }}>Peran:</span>
          <select
            value={currentRole.id}
            onChange={(e) => {
              const selected = roles.find(r => r.id === e.target.value);
              if (selected) setRole(selected);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {roles.map(r => (
              <option key={r.id} value={r.id} style={{ background: 'var(--bg-main)', color: 'var(--text-main)' }}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-secondary"
          style={{ width: '42px', height: '42px', padding: 0, borderRadius: 'var(--radius-md)' }}
          title={isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
        >
          {isDark ? <Sun size={20} color="#f79039" /> : <Moon size={20} color="#475569" />}
        </button>

        {/* User Profile Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '8px', borderLeft: '1px solid var(--border-color)' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f79039, #e07d28)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: '0.85rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            BP
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>BPS Pasaman</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{currentRole.badge}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
