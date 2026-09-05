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
  ChevronRight
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
  roles
}) {
  const menuItems = [
    { id: 'home', label: 'Halaman Awal', icon: Home, perm: 'viewDashboard' },
    { id: 'dashboard', label: 'Dashboard Utama', icon: LayoutDashboard, perm: 'viewDashboard' },
    { id: 'permohonan', label: 'Layanan Pembinaan', icon: FilePlus, perm: 'submitPembinaan' },
    { id: 'riwayat', label: 'Riwayat & Notulen', icon: History, perm: 'viewDashboard' },
    { id: 'kompromin', label: 'Repository Kompromin', icon: FileText, perm: 'viewDashboard' },
    { id: 'dataSektoral', label: 'Data Sektoral OPD', icon: Database, perm: 'viewDashboard' },
    { id: 'dataLineage', label: 'Aliran Data (Lineage)', icon: GitMerge, perm: 'viewDashboard' },
    { id: 'knowledgeBase', label: 'Knowledge Base & SOP', icon: BookOpen, perm: 'accessKnowledgeBase' },
    { id: 'roleManagement', label: 'Manajemen Role', icon: ShieldCheck, perm: 'manageRoles', isSpecial: true }
  ];

  const handleNavClick = (item) => {
    const isAllowed = currentPermissions[item.perm];
    if (!isAllowed) {
      alert(`Fitur "${item.label}" dibatasi untuk peran "${currentRole?.name || 'saat ini'}". Silakan pilih peran BPS atau Administrator untuk mengakses fitur ini.`);
      return;
    }
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
            <span className="sidebar-header-text" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.3px' }}>
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
          <div className="sidebar-role-switch" style={{ padding: '0 8px 10px 8px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
            <label htmlFor="sidebar-role-select" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Peran Pengguna:
            </label>
            <select
              id="sidebar-role-select"
              value={currentRole.id}
              onChange={(e) => {
                const selected = roles.find(r => r.id === e.target.value);
                if (selected) setRole(selected);
              }}
              className="form-select"
              style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', fontWeight: 700 }}
            >
              {roles.map(r => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <ul className="nav-menu">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isAllowed = currentPermissions[item.perm];
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                  style={{
                    width: '100%',
                    border: 'none',
                    textAlign: 'left',
                    opacity: isAllowed ? 1 : 0.45,
                    position: 'relative'
                  }}
                  title={!isAllowed ? `Fitur dibatasi untuk peran "${currentRole?.name}"` : item.label}
                >
                  <span className="icon">
                    <Icon size={18} color={isActive ? '#ffffff' : isAllowed ? (item.isSpecial ? '#f79039' : 'currentColor') : 'var(--text-muted)'} />
                  </span>
                  <span className="nav-item-label" style={{ flex: 1 }}>{item.label}</span>
                  {item.isSpecial && (
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                      Control
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="sidebar-footer" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', padding: isCollapsed ? '1rem 0 0 0' : '1rem 8px 0 8px' }}>
          <div style={{ padding: isCollapsed ? '8px' : '10px', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: isCollapsed ? 'center' : 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: isCollapsed ? 0 : '4px' }}>
              <Building size={14} color="var(--primary)" />
              <span className="sidebar-footer-text" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)' }}>BPS Kab. Pasaman</span>
            </div>
            <p className="sidebar-footer-text" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>
              Aplikasi Resmi Pembinaan Statistik Sektoral Latsar CPNS 2026.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
