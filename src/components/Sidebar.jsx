import React from 'react';
import {
  Home,
  LayoutDashboard,
  FilePlus,
  History,
  FileText,
  Database,
  GitMerge,
  BookOpen,
  ShieldCheck,
  Building,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  currentPermissions = {},
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
  currentRole,
  setRole,
  roles,
  onLogout
}) {
  const isAdmin = currentRole?.id === 'role-admin' ||
    currentRole?.id?.includes('admin') ||
    currentRole?.name?.toLowerCase().includes('admin') ||
    Boolean(currentRole?.permissions?.manageRoles) ||
    Boolean(currentPermissions?.manageRoles);

  const menuItems = [
    { id: 'home', label: 'SIMPONITAS', icon: Home },
    { id: 'dashboard', label: 'Dashboard Utama', icon: LayoutDashboard },
    { id: 'masterOpd', label: 'Daftar OPD', icon: Building },
    { id: 'permohonan', label: 'Layanan Pembinaan', icon: FilePlus, perm: 'submitPembinaan' },
    { id: 'riwayat', label: 'Riwayat Pembinaan', icon: History, requireInternal: true },
    { id: 'kompromin', label: 'Repository Kompromin', icon: FileText },
    { id: 'dataSektoral', label: 'Aliran Data OPD', icon: Database },
    { id: 'knowledgeBase', label: 'Knowledgebase', icon: BookOpen },
    { id: 'roleManagement', label: 'Manajemen Role & Pengguna', icon: ShieldCheck, perm: 'manageRoles', isSpecial: true }
  ];

  // Filter menu items so sidebar ONLY displays features permitted for the active role
  const visibleMenuItems = menuItems.filter(item => {
    if (item.id === 'roleManagement') {
      return isAdmin || Boolean(currentPermissions?.manageRoles);
    }
    if (item.isSpecial) {
      return Boolean(currentPermissions[item.perm]);
    }
    if (currentRole?.id === 'role-publik') {
      // Guest role hides internal submission & history modules
      if (item.id === 'permohonan' || item.id === 'riwayat') return false;
    }
    return true;
  });

  const handleNavClick = (item) => {
    setActiveTab(item.id);
    if (onClose) onClose();
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          padding: isCollapsed ? '0 0 10px 0' : '0 8px 10px 8px',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '6px'
        }}>
          {!isCollapsed && (
            <span className="sidebar-header-text" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.3px', textAlign: 'left' }}>
              Navigasi Sistem
            </span>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {/* Collapse toggle button on desktop */}
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="btn-collapse-desktop"
                aria-label={isCollapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
                title={isCollapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
              >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            )}

            {/* Mobile close button */}
            {onClose && (
              <button
                onClick={onClose}
                className="sidebar-close-btn"
                aria-label="Tutup navigasi"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {roles && currentRole && setRole && !isCollapsed && (
          <div className="sidebar-role-switch" style={{ padding: '0 8px 10px 8px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px', textAlign: 'left' }}>
            <label htmlFor="sidebar-role-select" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px', textAlign: 'left' }}>
              Peran Pengguna:
            </label>
            {isAdmin ? (
              <select
                id="sidebar-role-select"
                value={currentRole.id}
                onChange={(e) => {
                  const selected = roles.find(r => r.id === e.target.value);
                  if (selected) setRole(selected);
                }}
                className="form-select"
                style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', fontWeight: 700, textAlign: 'left' }}
              >
                {roles.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            ) : (
              <div style={{ background: 'var(--bg-surface)', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', textAlign: 'left' }}>
                {currentRole.name}
              </div>
            )}
          </div>
        )}

        <ul className="nav-menu">
          {visibleMenuItems.map(item => {
            const Icon = item.icon;
            const isAllowed = item.id === 'roleManagement'
              ? (isAdmin || Boolean(currentPermissions?.manageRoles))
              : (item.isSpecial ? Boolean(currentPermissions[item.perm]) : true);
            const isActive = activeTab === item.id;

            return (
              <li key={item.id} style={{ width: '100%', textAlign: 'left' }}>
                <button
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                  style={{
                    opacity: isAllowed ? 1 : 0.45,
                    cursor: isAllowed ? 'pointer' : 'not-allowed',
                    textAlign: 'left',
                    justifyContent: isCollapsed ? 'center' : 'flex-start'
                  }}
                  title={!isAllowed ? `Fitur dibatasi untuk peran "${currentRole?.name}"` : item.label}
                >
                  <span className="icon" style={{ flexShrink: 0 }}>
                    <Icon size={18} color={isActive ? '#ffffff' : isAllowed ? (item.isSpecial ? '#f79039' : 'currentColor') : 'var(--text-muted)'} />
                  </span>
                  <span className="nav-item-label" style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                  {item.isSpecial && (
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '2px 6px', flexShrink: 0 }}>
                      Control
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="sidebar-footer" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', padding: isCollapsed ? '1rem 0 0 0' : '1rem 8px 0 8px', textAlign: 'left' }}>
          <div style={{ padding: isCollapsed ? '8px' : '10px', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: isCollapsed ? 'center' : 'flex-start', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%', justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
              <Building size={14} color="var(--primary)" style={{ flexShrink: 0 }} />
              <span className="sidebar-footer-text" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textAlign: 'left' }}>BPS Kab. Pasaman</span>
            </div>
            {!isCollapsed && (
              <>
                <p className="sidebar-footer-text" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: '1.3', textAlign: 'left', margin: 0, width: '100%' }}>
                  Aplikasi Resmi Pembinaan Statistik Sektoral Latsar CPNS 2026.
                </p>
                {onLogout && (
                  <button
                    onClick={() => {
                      if (window.confirm('Apakah Anda yakin ingin keluar (logout) dari SIMPONITAS?')) {
                        onLogout();
                      }
                    }}
                    className="btn btn-secondary"
                    style={{ width: '100%', padding: '6px', fontSize: '0.75rem', color: '#ef4444', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <LogOut size={13} />
                    <span>Keluar Akun</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
