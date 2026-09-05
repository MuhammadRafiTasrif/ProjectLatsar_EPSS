import React from 'react';
import { Sun, Moon, Shield, Menu, BarChart3 } from 'lucide-react';

export default function Navbar({ isDark, toggleTheme, currentRole, setRole, roles, onMenuToggle }) {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <button
          className="btn-hamburger"
          onClick={onMenuToggle}
          aria-label="Buka navigasi"
        >
          <Menu size={20} />
        </button>
        <div className="brand-badge">
          <BarChart3 size={18} />
          <span>SIMPONITAS</span>
        </div>
        <div className="brand-text" style={{ display: 'flex', flexDirection: 'column', marginLeft: '4px' }}>
          <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)', letterSpacing: '-0.3px' }}>
            BPS KABUPATEN PASAMAN
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 600 }}>
            Sinergi Pembinaan Statistik Sektoral
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          className="navbar-role-selector"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-surface)', padding: '6px 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
        >
          <Shield size={14} color="var(--primary)" />
          <label htmlFor="role-select" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Peran:</label>
          <select
            id="role-select"
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
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            {roles.map(r => (
              <option key={r.id} value={r.id} style={{ background: 'var(--bg-main)', color: 'var(--text-main)' }}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={toggleTheme}
          className="btn btn-secondary"
          style={{ width: '44px', height: '44px', padding: 0, borderRadius: 'var(--radius-md)' }}
          aria-label={isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
        >
          {isDark ? <Sun size={18} color="#f79039" /> : <Moon size={18} color="#475569" />}
        </button>

        <div
          className="navbar-profile-section"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px', borderLeft: '1px solid var(--border-color)' }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: '0.8rem'
          }}>
            BP
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>BPS Pasaman</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{currentRole.badge}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
