import React from 'react';
import { Sun, Moon, Shield, Menu, BarChart3, LogOut, UserCheck } from 'lucide-react';

export default function Navbar({ isDark, toggleTheme, currentRole, setRole, roles, onMenuToggle, currentUser, onLogout }) {
  const isAdmin = currentRole?.id === 'role-admin' || Boolean(currentRole?.permissions?.manageRoles);

  const handleConfirmLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar (logout) dari SIMPONITAS?')) {
      if (onLogout) onLogout();
    }
  };

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

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {isAdmin ? (
          <div
            className="navbar-role-selector"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-surface)', padding: '6px 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
          >
            <Shield size={14} color="var(--primary)" />
            <label htmlFor="role-select" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Peran:</label>
            <select
              id="role-select"
              value={currentRole?.id || roles[0]?.id}
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
        ) : (
          <div
            className="navbar-role-badge-readonly"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-surface)', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            title="Hak akses peran terkunci sesuai akun login"
          >
            <Shield size={14} color="var(--accent-green)" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Peran:</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary)' }}>
              {currentRole?.name || 'Pengguna OPD'}
            </span>
          </div>
        )}

        <button
          onClick={toggleTheme}
          className="btn btn-secondary"
          style={{ width: '40px', height: '40px', padding: 0, borderRadius: 'var(--radius-md)' }}
          aria-label={isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
          title={isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
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
            {currentUser?.nama ? currentUser.nama.substring(0, 2).toUpperCase() : 'BP'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {currentUser?.nama || 'Pengguna BPS'}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {currentRole?.badge || 'Kabupaten Pasaman'}
            </span>
          </div>

          <button
            onClick={handleConfirmLogout}
            className="btn btn-secondary"
            style={{ padding: '6px 10px', fontSize: '0.78rem', gap: '4px', marginLeft: '4px', color: '#ef4444' }}
            title="Keluar / Logout Akun"
          >
            <LogOut size={14} />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
