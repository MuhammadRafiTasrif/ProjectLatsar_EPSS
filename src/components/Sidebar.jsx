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
  Building
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, currentPermissions }) {
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

  return (
    <aside className="sidebar">
      <div style={{ padding: '0 8px 12px 8px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
          Navigasi Sistem
        </span>
      </div>

      <ul className="nav-menu">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isAllowed = currentPermissions[item.perm];
          const isActive = activeTab === item.id;

          return (
            <li key={item.id}>
              <button
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  border: 'none',
                  textAlign: 'left',
                  opacity: isAllowed ? 1 : 0.45,
                  position: 'relative'
                }}
                title={!isAllowed ? 'Fitur ini dibatasi untuk peran Anda (Buka Manajemen Role untuk mengaktifkan)' : item.label}
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

      <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', padding: '1rem 8px 0 8px' }}>
        <div className="glass-card" style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', border: '1px solid var(--primary-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Building size={14} color="var(--primary)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-hover)' }}>BPS Kab. Pasaman</span>
          </div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: '1.3' }}>
            Aplikasi Resmi Pembinaan Statistik Sektoral Latsar CPNS 2026.
          </p>
        </div>
      </div>
    </aside>
  );
}
