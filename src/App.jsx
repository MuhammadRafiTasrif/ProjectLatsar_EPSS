import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomeInfo from './pages/HomeInfo';
import Dashboard from './pages/Dashboard';
import Permohonan from './pages/Permohonan';
import Riwayat from './pages/Riwayat';
import Kompromin from './pages/Kompromin';
import DataSektoral from './pages/DataSektoral';
import DataLineage from './pages/DataLineage';
import KnowledgeBase from './pages/KnowledgeBase';
import RoleManagement from './pages/RoleManagement';

import {
  INITIAL_OPD_LIST,
  INITIAL_PEMBINAAN_LIST,
  INITIAL_KOMPROMIN_LIST,
  INITIAL_DATA_SEKTORAL,
  INITIAL_KNOWLEDGE_BASE,
  INITIAL_ROLE_MANAGEMENT
} from './data/mockData';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('simponitas_theme') === 'dark';
  });

  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [opdList, setOpdList] = useState(() => {
    const saved = localStorage.getItem('simponitas_opd');
    return saved ? JSON.parse(saved) : INITIAL_OPD_LIST;
  });

  const [pembinaanList, setPembinaanList] = useState(() => {
    const saved = localStorage.getItem('simponitas_pembinaan');
    return saved ? JSON.parse(saved) : INITIAL_PEMBINAAN_LIST;
  });

  const [komprominList, setKomprominList] = useState(() => {
    const saved = localStorage.getItem('simponitas_kompromin');
    return saved ? JSON.parse(saved) : INITIAL_KOMPROMIN_LIST;
  });

  const [dataSektoral, setDataSektoral] = useState(() => {
    const saved = localStorage.getItem('simponitas_data_sektoral');
    return saved ? JSON.parse(saved) : INITIAL_DATA_SEKTORAL;
  });

  const [knowledgeBase] = useState(INITIAL_KNOWLEDGE_BASE);

  const [roleData, setRoleData] = useState(() => {
    const saved = localStorage.getItem('simponitas_roles');
    return saved ? JSON.parse(saved) : INITIAL_ROLE_MANAGEMENT;
  });

  const [currentRole, setCurrentRole] = useState(() => roleData.roles[0]);

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
    localStorage.setItem('simponitas_roles', JSON.stringify(roleData));
    const updated = roleData.roles.find(r => r.id === currentRole.id);
    if (updated) setCurrentRole(updated);
  }, [roleData]);

  const toggleTheme = () => setIsDark(!isDark);

  const currentPermissions = currentRole.permissions || {};

  return (
    <div className="app-container">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentPermissions={currentPermissions}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentRole={currentRole}
        setRole={setCurrentRole}
        roles={roleData.roles}
      />

      <div className="main-content">
        <Navbar
          isDark={isDark}
          toggleTheme={toggleTheme}
          currentRole={currentRole}
          setRole={setCurrentRole}
          roles={roleData.roles}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="page-wrapper">
          {activeTab === 'home' && (
            <HomeInfo onNavigate={setActiveTab} />
          )}

          {activeTab === 'dashboard' && (
            <Dashboard
              opdList={opdList}
              pembinaanList={pembinaanList}
              komprominList={komprominList}
              onNavigate={setActiveTab}
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
              currentPermissions={currentPermissions}
            />
          )}

          {activeTab === 'kompromin' && (
            <Kompromin
              komprominList={komprominList}
              setKomprominList={setKomprominList}
              opdList={opdList}
              currentPermissions={currentPermissions}
            />
          )}

          {activeTab === 'dataSektoral' && (
            <DataSektoral
              dataSektoral={dataSektoral}
              setDataSektoral={setDataSektoral}
              currentPermissions={currentPermissions}
            />
          )}

          {activeTab === 'dataLineage' && (
            <DataLineage opdList={opdList} />
          )}

          {activeTab === 'knowledgeBase' && (
            <KnowledgeBase knowledgeBase={knowledgeBase} />
          )}

          {activeTab === 'roleManagement' && (
            <RoleManagement
              roleData={roleData}
              setRoleData={setRoleData}
              currentRole={currentRole}
            />
          )}
        </main>
      </div>
    </div>
  );
}
