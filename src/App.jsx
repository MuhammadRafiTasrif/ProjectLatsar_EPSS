import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomeInfo from './pages/HomeInfo';
import Dashboard from './pages/Dashboard';
import MasterOpd from './pages/MasterOpd';
import Permohonan from './pages/Permohonan';
import Riwayat from './pages/Riwayat';
import Kompromin from './pages/Kompromin';
import DataSektoral from './pages/DataSektoral';
import DataLineage from './pages/DataLineage';
import KnowledgeBase from './pages/KnowledgeBase';
import RoleManagement from './pages/RoleManagement';
import Login from './pages/Login';

import {
  INITIAL_OPD_LIST,
  INITIAL_PEMBINAAN_LIST,
  INITIAL_KOMPROMIN_LIST,
  INITIAL_DATA_SEKTORAL,
  INITIAL_PERMINTAAN_DATA,
  INITIAL_GALLERY_LIST,
  INITIAL_KNOWLEDGE_BASE,
  INITIAL_ROLE_MANAGEMENT,
  INITIAL_ALIRAN_DATA,
  INITIAL_ALIRAN_HISTORY,
  INITIAL_USER_LIST
} from './data/mockData';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('simponitas_theme') === 'dark';
  });

  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('simponitas_auth');
    return saved !== null ? saved === 'true' : true; // Default logged in for smooth first load or login on demand
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('simponitas_user');
    return saved ? JSON.parse(saved) : {
      nip: '198501012010011001',
      nama: 'Ir. Ahmad Fadhil, M.Si',
      instansi: 'BPS Kabupaten Pasaman'
    };
  });

  const handleToggleSidebar = () => {
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(prev => !prev);
    } else {
      setIsSidebarCollapsed(prev => !prev);
    }
  };

  const handleNav = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSidebarOpen(false);
  };

  const [opdList, setOpdList] = useState(() => {
    const saved = localStorage.getItem('simponitas_opd');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === INITIAL_OPD_LIST.length && parsed[0]?.nama === INITIAL_OPD_LIST[0]?.nama) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_OPD_LIST;
  });

  const [pembinaanList, setPembinaanList] = useState(() => {
    const saved = localStorage.getItem('simponitas_pembinaan');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasOldOpd1 = parsed.some(p => p.opdId === 'opd-1' && p.opdNama?.toLowerCase().includes('kesehatan'));
        if (!hasOldOpd1) return parsed;
      } catch (e) {}
    }
    return INITIAL_PEMBINAAN_LIST;
  });

  const [komprominList, setKomprominList] = useState(() => {
    const saved = localStorage.getItem('simponitas_kompromin');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasOldOpd1 = parsed.some(k => k.opdId === 'opd-1' && k.opdNama?.toLowerCase().includes('kesehatan'));
        if (!hasOldOpd1) return parsed;
      } catch (e) {}
    }
    return INITIAL_KOMPROMIN_LIST;
  });

  const [dataSektoral, setDataSektoral] = useState(() => {
    const saved = localStorage.getItem('simponitas_data_sektoral');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasOldOpd1 = parsed.some(d => d.opdId === 'opd-1' && (d.OPD || '').toLowerCase().includes('kesehatan'));
        if (!hasOldOpd1) return parsed;
      } catch (e) {}
    }
    return INITIAL_DATA_SEKTORAL;
  });

  const [permintaanData, setPermintaanData] = useState(() => {
    const saved = localStorage.getItem('simponitas_permintaan_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasOldOpd1 = parsed.some(r => r.opdId === 'opd-1' && (r.opdNama || '').toLowerCase().includes('kesehatan'));
        if (!hasOldOpd1) return parsed;
      } catch (e) {}
    }
    return INITIAL_PERMINTAAN_DATA;
  });

  const [galleryList, setGalleryList] = useState(() => {
    const saved = localStorage.getItem('simponitas_gallery');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasOldOpd1 = parsed.some(g => g.opdId === 'opd-1' && (g.opdNama || '').toLowerCase().includes('kesehatan'));
        if (!hasOldOpd1) return parsed;
      } catch (e) {}
    }
    return INITIAL_GALLERY_LIST;
  });

  const [knowledgeBaseList, setKnowledgeBaseList] = useState(() => {
    const saved = localStorage.getItem('simponitas_knowledge_base');
    return saved ? JSON.parse(saved) : INITIAL_KNOWLEDGE_BASE;
  });

  const [aliranDataList, setAliranDataList] = useState(() => {
    const saved = localStorage.getItem('simponitas_aliran_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasOldOpd3 = parsed.some(a => a.opdId === 'opd-3' && (a.opdNama || '').toLowerCase().includes('pertanian'));
        if (!hasOldOpd3) return parsed;
      } catch (e) {}
    }
    return INITIAL_ALIRAN_DATA;
  });

  const [aliranHistory, setAliranHistory] = useState(() => {
    const saved = localStorage.getItem('simponitas_aliran_history');
    return saved ? JSON.parse(saved) : INITIAL_ALIRAN_HISTORY;
  });

  const [userList, setUserList] = useState(() => {
    const saved = localStorage.getItem('simponitas_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasOldUsr5 = parsed.some(u => u.id === 'usr-5' && u.opdId === 'opd-1');
        if (!hasOldUsr5) {
          return parsed.map(u => {
            if (u.roleId === 'role-pembina') {
              return { ...u, roleId: 'role-ketua-tim', roleNama: 'Tim Statistik Sektoral BPS' };
            }
            if (u.roleId === 'role-ketua-tim') {
              return { ...u, roleNama: 'Tim Statistik Sektoral BPS' };
            }
            return u;
          });
        }
      } catch (e) {}
    }
    return INITIAL_USER_LIST;
  });

  const [roleData, setRoleData] = useState(() => {
    const saved = localStorage.getItem('simponitas_roles');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const cleanedRoles = parsed.roles
          .filter(r => r.id !== 'role-pembina')
          .map(r => {
            if (r.id === 'role-ketua-tim') {
              return {
                ...r,
                name: 'Tim Statistik Sektoral BPS',
                badge: 'Tim Sektoral BPS',
                description: 'Pengawasan progres pembinaan, persetujuan berita acara, dan analisis data sektoral.'
              };
            }
            if (r.id === 'role-admin') {
              return {
                ...r,
                permissions: { ...r.permissions, manageRoles: true, viewDashboard: true }
              };
            }
            if (r.id === 'role-produsen-opd' || r.id === 'role-walidata-opd') {
              return {
                ...r,
                permissions: { ...r.permissions, manageDataSektoral: true, exportData: true }
              };
            }
            return r;
          });
        return { ...parsed, roles: cleanedRoles };
      } catch (e) {
        return INITIAL_ROLE_MANAGEMENT;
      }
    }
    return INITIAL_ROLE_MANAGEMENT;
  });

  const [currentRole, setCurrentRole] = useState(() => {
    const savedRole = localStorage.getItem('simponitas_current_role');
    if (savedRole) {
      try {
        const parsed = JSON.parse(savedRole);
        const targetId = parsed.id === 'role-pembina' ? 'role-ketua-tim' : parsed.id;
        const match = roleData.roles.find(r => r.id === targetId);
        if (match) return match;
      } catch (e) {}
    }
    const savedUser = localStorage.getItem('simponitas_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        let roleId = u.roleId || u.role?.id;
        if (roleId === 'role-pembina') roleId = 'role-ketua-tim';
        if (roleId) {
          const match = roleData.roles.find(r => r.id === roleId);
          if (match) return match;
        }
      } catch (e) {}
    }
    return roleData.roles[0];
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('simponitas_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('simponitas_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('simponitas_opd', JSON.stringify(opdList));
  }, [opdList]);

  useEffect(() => {
    localStorage.setItem('simponitas_pembinaan', JSON.stringify(pembinaanList));
  }, [pembinaanList]);

  useEffect(() => {
    localStorage.setItem('simponitas_kompromin', JSON.stringify(komprominList));
  }, [komprominList]);

  useEffect(() => {
    localStorage.setItem('simponitas_data_sektoral', JSON.stringify(dataSektoral));
  }, [dataSektoral]);

  useEffect(() => {
    localStorage.setItem('simponitas_permintaan_data', JSON.stringify(permintaanData));
  }, [permintaanData]);

  useEffect(() => {
    localStorage.setItem('simponitas_gallery', JSON.stringify(galleryList));
  }, [galleryList]);

  useEffect(() => {
    localStorage.setItem('simponitas_knowledge_base', JSON.stringify(knowledgeBaseList));
  }, [knowledgeBaseList]);

  useEffect(() => {
    localStorage.setItem('simponitas_aliran_data', JSON.stringify(aliranDataList));
  }, [aliranDataList]);

  useEffect(() => {
    localStorage.setItem('simponitas_aliran_history', JSON.stringify(aliranHistory));
  }, [aliranHistory]);

  useEffect(() => {
    localStorage.setItem('simponitas_users', JSON.stringify(userList));
  }, [userList]);

  useEffect(() => {
    localStorage.setItem('simponitas_roles', JSON.stringify(roleData));
    const updated = roleData.roles.find(r => r.id === currentRole.id);
    if (updated) setCurrentRole(updated);
  }, [roleData]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleSetRole = (role) => {
    setCurrentRole(role);
    localStorage.setItem('simponitas_current_role', JSON.stringify(role));
  };

  const handleLogin = (userData, targetRole) => {
    setCurrentUser(userData);
    const effectiveRole = targetRole ||
      roleData.roles.find(r => r.id === userData?.roleId || r.id === userData?.role?.id) ||
      roleData.roles[0];
    setCurrentRole(effectiveRole);
    localStorage.setItem('simponitas_current_role', JSON.stringify(effectiveRole));
    setIsAuthenticated(true);
    localStorage.setItem('simponitas_user', JSON.stringify(userData));
    localStorage.setItem('simponitas_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('simponitas_auth', 'false');
    localStorage.removeItem('simponitas_current_role');
  };

  const currentPermissions = currentRole?.permissions || {};

  if (!isAuthenticated) {
    return (
      <Login
        onLogin={handleLogin}
        roles={roleData.roles}
        userList={userList}
        opdList={opdList}
      />
    );
  }

  return (
    <div className={`app-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleNav}
        currentPermissions={currentPermissions}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        currentRole={currentRole}
        setRole={handleSetRole}
        roles={roleData.roles}
        onLogout={handleLogout}
      />

      <div className="main-content">
        <Navbar
          isDark={isDark}
          toggleTheme={toggleTheme}
          currentRole={currentRole}
          setRole={handleSetRole}
          roles={roleData.roles}
          onMenuToggle={handleToggleSidebar}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        <main className="page-wrapper">
          {activeTab === 'home' && (
            <HomeInfo onNavigate={handleNav} />
          )}

          {activeTab === 'dashboard' && (
            <Dashboard
              opdList={opdList}
              setOpdList={setOpdList}
              pembinaanList={pembinaanList}
              komprominList={komprominList}
              setKomprominList={setKomprominList}
              currentRole={currentRole}
              currentPermissions={currentPermissions}
              onNavigate={handleNav}
            />
          )}

          {activeTab === 'masterOpd' && (
            <MasterOpd
              opdList={opdList}
              setOpdList={setOpdList}
              currentRole={currentRole}
              currentPermissions={currentPermissions}
            />
          )}

          {activeTab === 'permohonan' && (
            <Permohonan
              pembinaanList={pembinaanList}
              setPembinaanList={setPembinaanList}
              opdList={opdList}
              currentRole={currentRole}
              currentPermissions={currentPermissions}
            />
          )}

          {activeTab === 'riwayat' && (
            <Riwayat
              pembinaanList={pembinaanList}
              setPembinaanList={setPembinaanList}
              galleryList={galleryList}
              setGalleryList={setGalleryList}
              opdList={opdList}
              currentRole={currentRole}
              currentPermissions={currentPermissions}
            />
          )}

          {activeTab === 'kompromin' && (
            <Kompromin
              komprominList={komprominList}
              setKomprominList={setKomprominList}
              opdList={opdList}
              currentRole={currentRole}
              currentPermissions={currentPermissions}
            />
          )}

          {(activeTab === 'dataSektoral' || activeTab === 'dataLineage') && (
            <DataSektoral
              dataSektoral={dataSektoral}
              setDataSektoral={setDataSektoral}
              aliranDataList={aliranDataList}
              setAliranDataList={setAliranDataList}
              opdList={opdList}
              currentRole={currentRole}
              currentPermissions={currentPermissions}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'knowledgeBase' && (
            <KnowledgeBase
              knowledgeBase={knowledgeBaseList}
              setKnowledgeBase={setKnowledgeBaseList}
              currentRole={currentRole}
              currentPermissions={currentPermissions}
            />
          )}

          {activeTab === 'roleManagement' && (
            <RoleManagement
              roleData={roleData}
              setRoleData={setRoleData}
              userList={userList}
              setUserList={setUserList}
              opdList={opdList}
              currentRole={currentRole}
            />
          )}
        </main>
      </div>
    </div>
  );
}
