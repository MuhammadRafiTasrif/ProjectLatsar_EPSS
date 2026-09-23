import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Waves, Shield, Menu, BarChart3, LogOut, Check, ChevronDown, Sparkles } from 'lucide-react';

const THEMES = [
  {
    id: 'light',
    name: 'Mode Oranye (Default)',
    shortName: 'Oranye',
    icon: Sun,
    color: '#f79039'
  },
  {
    id: 'ocean',
    name: 'Mode Biru Samudra',
    shortName: 'Biru Adem',
    icon: Waves,
    color: '#0284c7'
  },
  {
    id: 'dark',
    name: 'Mode Gelap',
    shortName: 'Gelap',
    icon: Moon,
    color: '#38bdf8'
  }
];

export default function Navbar({ theme = 'light', setTheme, currentRole, setRole, roles, onMenuToggle, currentUser, onLogout }) {
  const isAdmin = currentRole?.id === 'role-admin' || Boolean(currentRole?.permissions?.manageRoles);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef(null);

  const activeThemeObj = THEMES.find(t => t.id === theme) || THEMES[0];
  const ActiveIcon = activeThemeObj.icon;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
        setIsThemeMenuOpen(false);
      }
    };
    if (isThemeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isThemeMenuOpen]);

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

        {/* ── Theme Switcher Menu (3 Modes: Oranye, Biru Samudra, Gelap) ── */}
        <div style={{ position: 'relative' }} ref={themeMenuRef}>
          <button
            type="button"
            onClick={() => setIsThemeMenuOpen(prev => !prev)}
            className="btn btn-secondary"
            style={{
              padding: '6px 10px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: isThemeMenuOpen ? '1px solid var(--primary)' : '1px solid var(--border-color)'
            }}
            aria-label="Pilih Mode Tema"
            title="Pilih Mode Tema (Oranye, Biru Samudra, Gelap)"
          >
            <ActiveIcon size={16} color={activeThemeObj.color} />
            <span className="theme-toggle-label" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
              {activeThemeObj.shortName}
            </span>
            <ChevronDown size={13} color="var(--text-muted)" style={{ transform: isThemeMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
          </button>

          {isThemeMenuOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 8px)',
                width: '210px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                padding: '6px',
                zIndex: 60,
                display: 'flex',
                flexDirection: 'column',
                gap: '3px'
              }}
            >
              <div style={{ padding: '6px 8px 4px 8px', fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Pilihan Tema
              </div>

              {THEMES.map(t => {
                const IconComponent = t.icon;
                const isSelected = theme === t.id;

                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      if (setTheme) setTheme(t.id);
                      setIsThemeMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '9px',
                      padding: '7px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '1px solid var(--primary-border)' : '1px solid transparent',
                      background: isSelected ? 'var(--primary-light)' : 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: 'var(--radius-sm)',
                        background: isSelected ? 'var(--primary)' : 'var(--bg-surface)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <IconComponent size={14} color={isSelected ? '#ffffff' : t.color} />
                    </div>

                    <span style={{ fontSize: '0.82rem', fontWeight: isSelected ? 800 : 600, color: isSelected ? 'var(--primary)' : 'var(--text-main)', flex: 1 }}>
                      {t.name}
                    </span>

                    {isSelected && <Check size={14} color="var(--primary)" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

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
