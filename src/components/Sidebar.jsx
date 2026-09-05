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
  X
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  currentPermissions,
  isOpen,
  onClose,
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

  const handleNav = (id) => {
    setActiveTab(id);
    if (onClose) onClose();
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 10px 8px', borderBottom: '1px solid var(--border-color)', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.3px' }}>
            Navigasi Sistem
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="btn-hamburger"
              style={{ display: 'flex', minHeight: '36px', minWidth: '36px', padding: '6px' }}
              aria-label="Tutup navigasi"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {roles && currentRole && setRole && (
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
                  onClick={() => handleNav(item.id)}
                  style={{
                    width: '100%',
                    border: 'none',
                    textAlign: 'left',
                    opacity: isAllowed ? 1 : 0.45,
                    position: 'relative'
                  }}
                  title={!isAllowed ? 'Fitur ini dibatasi untuk peran Anda' : item.label}
                >
                  <span className="icon">
                    <Icon size={18} color={isActive ? '#ffffff' : isAllowed ? (item.isSpecial ? '#f79039' : 'currentColor') : 'var(--text-muted)'} />
                  </span>
                  <span style={{ flex: 1 }}>{item.label}</span>
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

        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', padding: '1rem 8px 0 8px' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Building size={13} color="var(--primary)" />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)' }}>BPS Kab. Pasaman</span>
            </div>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>
              Aplikasi Resmi Pembinaan Statistik Sektoral Latsar CPNS 2026.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
