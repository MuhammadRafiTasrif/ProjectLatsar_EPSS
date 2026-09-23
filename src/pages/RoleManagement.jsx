import React, { useState } from 'react';
import Modal from '../components/Modal';
import {
  ShieldCheck,
  Save,
  Shield,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  Search,
  Edit,
  Trash2,
  Users,
  Eye,
  EyeOff,
  Lock,
  Building2,
  ShieldAlert,
  Plus,
  Check,
  X,
  Filter
} from 'lucide-react';
import { upsertUserToSupabase, deleteUserFromSupabase, upsertRoleToSupabase } from '../services/supabaseService';

export default function RoleManagement({
  roleData,
  setRoleData,
  userList = [],
  setUserList,
  opdList = [],
  currentRole
}) {
  // Access Security Check: Only Admin BPS or users with manageRoles permission can view/manage
  const isAdmin = currentRole?.id === 'role-admin' ||
                  currentRole?.id?.includes('admin') ||
                  currentRole?.name?.toLowerCase().includes('admin') ||
                  Boolean(currentRole?.permissions?.manageRoles);

  // Active Tab Mode: default to 'roles' so permissions matrix is directly visible
  const [activeTabMode, setActiveTabMode] = useState('roles');

  // Search & Filters State for Users
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('ALL');

  // Active Role Selection for Permission Matrix
  const [activeRoleId, setActiveRoleId] = useState(roleData?.roles[0]?.id || 'role-admin');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Modals State for User CRUD
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // null for create, user object for edit
  const [userFormData, setUserFormData] = useState({
    nip: '',
    nama: '',
    email: '',
    instansi: opdList[0]?.nama || 'BPS Kabupaten Pasaman',
    opdId: '',
    roleId: roleData?.roles[0]?.id || 'role-admin',
    password: '',
    status: 'Aktif'
  });
  const [showFormPassword, setShowFormPassword] = useState(false);
  const [revealedPasswords, setRevealedPasswords] = useState({});

  // Modals State for Role CRUD
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null); // null for create, role object for edit
  const [roleFormData, setRoleFormData] = useState({
    id: '',
    name: '',
    description: '',
    badge: 'Specialist',
    permissions: {
      viewDashboard: true,
      submitPembinaan: true,
      approvePembinaan: false,
      verifyKompromin: false,
      manageDataSektoral: true,
      accessKnowledgeBase: true,
      manageKnowledgeBase: false,
      manageRoles: false
    }
  });

  // Security Gate UI if user is not authorized Admin
  if (!isAdmin) {
    return (
      <div className="glass-card empty-state" style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
        <div className="empty-state-icon" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', margin: '0 auto 1rem auto', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShieldAlert size={36} />
        </div>
        <h3 className="empty-state-title" style={{ fontSize: '1.25rem', color: '#ef4444', fontWeight: 800 }}>
          Akses Dibatasi — Khusus Admin BPS
        </h3>
        <p className="empty-state-desc" style={{ maxWidth: '520px', margin: '8px auto 0 auto', lineHeight: '1.5' }}>
          Halaman Manajemen Pengguna & Role ini hanya dapat diakses oleh **Admin BPS**. Anda sedang masuk sebagai <strong>{currentRole?.name || 'Pengguna Publik'}</strong>.
        </p>
      </div>
    );
  }

  // Current selected role object for permissions matrix
  const currentSelectedRole = roleData.roles.find(r => r.id === activeRoleId) || roleData.roles[0];

  // Helper trigger feedback notification
  const triggerNotification = (msg) => {
    setFeedbackMsg(msg);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setFeedbackMsg('');
    }, 3000);
  };

  // =========================================================================
  // USER CRUD HANDLERS
  // =========================================================================
  const handleOpenCreateUserModal = () => {
    setEditingUser(null);
    setUserFormData({
      nip: '',
      nama: '',
      email: '',
      instansi: 'BPS Kabupaten Pasaman',
      opdId: '',
      roleId: roleData.roles[0]?.id || 'role-admin',
      password: 'bps1309pasaman',
      status: 'Aktif'
    });
    setIsUserModalOpen(true);
  };

  const handleOpenEditUserModal = (usr) => {
    setEditingUser(usr);
    setUserFormData({
      nip: usr.nip || '',
      nama: usr.nama || '',
      email: usr.email || '',
      instansi: usr.instansi || 'BPS Kabupaten Pasaman',
      opdId: usr.opdId || '',
      roleId: usr.roleId || roleData.roles[0]?.id,
      password: usr.password || 'bps1309pasaman',
      status: usr.status || 'Aktif'
    });
    setIsUserModalOpen(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!userFormData.nip.trim() || !userFormData.nama.trim()) {
      alert('NIP/Username dan Nama Lengkap wajib diisi!');
      return;
    }

    if (editingUser) {
      // Update existing user
      let updatedUserObj = null;
      const updatedList = userList.map(u => {
        if (u.id === editingUser.id) {
          updatedUserObj = {
            ...u,
            nip: userFormData.nip.trim(),
            nama: userFormData.nama.trim(),
            email: userFormData.email.trim(),
            instansi: userFormData.instansi,
            opdId: userFormData.opdId,
            roleId: userFormData.roleId,
            password: userFormData.password,
            status: userFormData.status
          };
          return updatedUserObj;
        }
        return u;
      });
      if (setUserList) setUserList(updatedList);
      if (updatedUserObj) upsertUserToSupabase(updatedUserObj);
      triggerNotification(`Pengguna "${userFormData.nama}" berhasil diperbarui.`);
    } else {
      // Check duplicate NIP
      const existing = userList.find(u => u.nip.toLowerCase() === userFormData.nip.trim().toLowerCase());
      if (existing) {
        alert(`NIP / Username "${userFormData.nip}" sudah terdaftar di sistem!`);
        return;
      }

      // Create new user
      const newUser = {
        id: `usr-${Date.now()}`,
        nip: userFormData.nip.trim(),
        nama: userFormData.nama.trim(),
        email: userFormData.email.trim(),
        instansi: userFormData.instansi,
        opdId: userFormData.opdId,
        roleId: userFormData.roleId,
        password: userFormData.password || 'bps1309pasaman',
        status: userFormData.status
      };
      if (setUserList) setUserList([newUser, ...userList]);
      upsertUserToSupabase(newUser);
      triggerNotification(`Pengguna baru "${newUser.nama}" berhasil ditambahkan.`);
    }

    setIsUserModalOpen(false);
  };

  const handleDeleteUser = (usr) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus akun pengguna "${usr.nama}" (${usr.nip})?`)) {
      if (setUserList) {
        setUserList(userList.filter(u => u.id !== usr.id));
      }
      deleteUserFromSupabase(usr.id);
      triggerNotification(`Akun pengguna "${usr.nama}" berhasil dihapus.`);
    }
  };

  const togglePasswordVisibility = (usrId) => {
    setRevealedPasswords(prev => ({
      ...prev,
      [usrId]: !prev[usrId]
    }));
  };

  // Filtered Users List
  const filteredUsers = userList.filter(u => {
    const matchSearch = u.nama.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                        u.nip.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                        u.instansi.toLowerCase().includes(userSearchTerm.toLowerCase());
    const matchRole = userRoleFilter === 'ALL' || u.roleId === userRoleFilter;
    return matchSearch && matchRole;
  });

  // =========================================================================
  // ROLE & PERMISSION CRUD HANDLERS
  // =========================================================================
  const handleTogglePermission = (roleId, permKey) => {
    let targetUpdatedRole = null;
    const updatedRoles = roleData.roles.map(r => {
      if (r.id === roleId) {
        targetUpdatedRole = {
          ...r,
          permissions: {
            ...r.permissions,
            [permKey]: !r.permissions[permKey]
          }
        };
        return targetUpdatedRole;
      }
      return r;
    });

    setRoleData({ ...roleData, roles: updatedRoles });
    if (targetUpdatedRole) upsertRoleToSupabase(targetUpdatedRole);
    triggerNotification('Hak akses role berhasil diperbarui.');
  };

  const handleToggleAllForRole = (roleId, enable) => {
    let targetUpdatedRole = null;
    const updatedRoles = roleData.roles.map(r => {
      if (r.id === roleId) {
        const newPerms = {};
        Object.keys(r.permissions).forEach(k => {
          newPerms[k] = enable;
        });
        targetUpdatedRole = { ...r, permissions: newPerms };
        return targetUpdatedRole;
      }
      return r;
    });

    setRoleData({ ...roleData, roles: updatedRoles });
    if (targetUpdatedRole) upsertRoleToSupabase(targetUpdatedRole);
    triggerNotification(`Seluruh hak akses untuk role telah ${enable ? 'diaktifkan' : 'dimatikan'}.`);
  };

  const handleOpenCreateRoleModal = () => {
    setEditingRole(null);
    setRoleFormData({
      id: `role-custom-${Date.now()}`,
      name: '',
      description: '',
      badge: 'BPS Specialist',
      permissions: {
        viewDashboard: true,
        submitPembinaan: true,
        approvePembinaan: false,
        verifyKompromin: false,
        manageDataSektoral: true,
        accessKnowledgeBase: true,
        manageKnowledgeBase: false,
        manageRoles: false
      }
    });
    setIsRoleModalOpen(true);
  };

  const handleOpenEditRoleModal = (roleObj) => {
    setEditingRole(roleObj);
    setRoleFormData({
      id: roleObj.id,
      name: roleObj.name,
      description: roleObj.description || '',
      badge: roleObj.badge || 'Role Badge',
      permissions: { ...roleObj.permissions }
    });
    setIsRoleModalOpen(true);
  };

  const handleSaveRole = (e) => {
    e.preventDefault();
    if (!roleFormData.name.trim()) {
      alert('Nama Role wajib diisi!');
      return;
    }

    if (editingRole) {
      // Edit existing role
      const updatedRoles = roleData.roles.map(r => {
        if (r.id === editingRole.id) {
          return {
            ...r,
            name: roleFormData.name.trim(),
            description: roleFormData.description.trim(),
            badge: roleFormData.badge.trim(),
            permissions: roleFormData.permissions
          };
        }
        return r;
      });
      setRoleData({ ...roleData, roles: updatedRoles });
      triggerNotification(`Role "${roleFormData.name}" berhasil diperbarui.`);
    } else {
      // Create new role
      const newRoleObj = {
        id: roleFormData.id || `role-${Date.now()}`,
        name: roleFormData.name.trim(),
        description: roleFormData.description.trim(),
        badge: roleFormData.badge.trim() || 'Role Custom',
        permissions: roleFormData.permissions
      };
      setRoleData({ ...roleData, roles: [...roleData.roles, newRoleObj] });
      setActiveRoleId(newRoleObj.id);
      triggerNotification(`Role baru "${newRoleObj.name}" berhasil dibuat.`);
    }

    setIsRoleModalOpen(false);
  };

  const handleDeleteRole = (roleObj) => {
    // Protect system default roles
    const systemRoleIds = ['role-admin', 'role-ketua-tim', 'role-walidata-opd', 'role-produsen-opd', 'role-publik'];
    if (systemRoleIds.includes(roleObj.id)) {
      alert(`Role bawaan sistem "${roleObj.name}" terlindungi dan tidak dapat dihapus.`);
      return;
    }

    if (window.confirm(`Apakah Anda yakin ingin menghapus role "${roleObj.name}"? Pengguna dengan role ini akan dipindahkan ke role default.`)) {
      const updatedRoles = roleData.roles.filter(r => r.id !== roleObj.id);
      setRoleData({ ...roleData, roles: updatedRoles });

      // Re-assign users holding deleted role to role-admin or default
      if (setUserList) {
        setUserList(userList.map(u => u.roleId === roleObj.id ? { ...u, roleId: 'role-admin' } : u));
      }

      setActiveRoleId(updatedRoles[0]?.id || 'role-admin');
      triggerNotification(`Role "${roleObj.name}" berhasil dihapus.`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={24} color="var(--primary)" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Manajemen Pengguna & Role (Khusus Admin BPS)
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
            Kelola akun pengguna yang berhak login ke sistem SIMPONITAS serta atur matriks hak akses per peran.
          </p>
        </div>

        {saveSuccess && (
          <div className="badge badge-success" style={{ gap: '6px', padding: '8px 16px', fontSize: '0.84rem', animation: 'fadeIn 0.3s ease-in-out' }}>
            <CheckCircle2 size={16} />
            <span>{feedbackMsg || 'Perubahan berhasil disimpan'}</span>
          </div>
        )}
      </div>

      {/* Main Tabs Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', pb: '4px' }}>
        <button
          onClick={() => setActiveTabMode('roles')}
          className={`btn ${activeTabMode === 'roles' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '8px 18px', fontSize: '0.85rem' }}
        >
          <Shield size={16} />
          <span>Matriks Role & Hak Akses ({roleData.roles.length})</span>
        </button>

        <button
          onClick={() => setActiveTabMode('users')}
          className={`btn ${activeTabMode === 'users' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '8px 18px', fontSize: '0.85rem' }}
        >
          <Users size={16} />
          <span>Daftar Pengguna Login ({userList.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: MANAJEMEN PENGGUNA (USER CRUD)                                     */}
      {/* ========================================================================= */}
      {activeTabMode === 'users' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Controls Bar */}
          <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flex: 1 }}>
              <div style={{ position: 'relative', width: '280px', minWidth: '200px' }}>
                <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Cari NIP, Nama, atau Instansi..."
                  style={{ paddingLeft: '34px' }}
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Filter size={14} color="var(--text-muted)" />
                <select
                  className="form-select"
                  style={{ width: 'auto', fontSize: '0.82rem' }}
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                >
                  <option value="ALL">Semua Peran (Role)</option>
                  {roleData.roles.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <button onClick={handleOpenCreateUserModal} className="btn btn-primary">
              <UserPlus size={15} />
              <span>+ Tambah Pengguna Baru</span>
            </button>
          </div>

          {/* User Table Grid */}
          <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>NIP / Username</th>
                    <th>Nama Pengguna</th>
                    <th>Instansi / OPD</th>
                    <th>Role Akses</th>
                    <th>Kata Sandi</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center' }}>Aksi Admin</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                        Tidak ditemukan pengguna yang sesuai filter pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map(usr => {
                      const userRoleObj = roleData.roles.find(r => r.id === usr.roleId) || { name: 'Role Tidak Dikenal', badge: 'User' };
                      const isRevealed = revealedPasswords[usr.id];

                      return (
                        <tr key={usr.id}>
                          <td style={{ fontWeight: 700, color: 'var(--primary-hover)', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                            {usr.nip}
                          </td>
                          <td>
                            <span style={{ fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>{usr.nama}</span>
                            {usr.email && <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{usr.email}</span>}
                          </td>
                          <td style={{ fontSize: '0.83rem', color: 'var(--text-secondary)' }}>
                            {usr.instansi}
                          </td>
                          <td>
                            <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                              {userRoleObj.name}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: isRevealed ? 'var(--text-main)' : 'var(--text-muted)' }}>
                                {isRevealed ? (usr.password || 'bps1309pasaman') : '••••••••'}
                              </span>
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility(usr.id)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                                title={isRevealed ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                              >
                                {isRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
                              </button>
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${usr.status === 'Aktif' ? 'badge-success' : 'badge-warning'}`}>
                              {usr.status || 'Aktif'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                              <button
                                onClick={() => handleOpenEditUserModal(usr)}
                                className="btn btn-secondary"
                                style={{ padding: '5px 9px', fontSize: '0.76rem' }}
                                title="Edit Pengguna"
                              >
                                <Edit size={13} />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteUser(usr)}
                                className="btn btn-secondary"
                                style={{ padding: '5px 9px', fontSize: '0.76rem', color: '#ef4444' }}
                                title="Hapus Pengguna"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MANAJEMEN ROLE & HAK AKSES (ROLE CRUD)                           */}
      {/* ========================================================================= */}
      {activeTabMode === 'roles' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleOpenCreateRoleModal} className="btn btn-primary">
              <Plus size={15} />
              <span>+ Tambah Role Baru</span>
            </button>
          </div>

          <div className="role-layout-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 320px) 1fr', gap: '1.25rem' }}>
            {/* Left Role Selection Sidebar */}
            <div className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.3px' }}>
                Pilih Peran Pengguna:
              </span>

              {roleData.roles.map(r => {
                const isSelected = r.id === activeRoleId;
                const systemRoleIds = ['role-admin', 'role-ketua-tim', 'role-walidata-opd', 'role-produsen-opd', 'role-publik'];
                const isSystemRole = systemRoleIds.includes(r.id);

                return (
                  <div
                    key={r.id}
                    onClick={() => setActiveRoleId(r.id)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)',
                      border: isSelected ? '1px solid var(--primary-border)' : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.88rem', color: isSelected ? 'var(--primary-hover)' : 'var(--text-main)' }}>
                        {r.name}
                      </span>
                      <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{r.badge}</span>
                    </div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: '1.3' }}>
                      {r.description}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', marginTop: '4px' }}>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleOpenEditRoleModal(r); }}
                        style={{ background: 'none', border: 'none', color: 'var(--primary-hover)', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                      >
                        <Edit size={11} /> Edit Role
                      </button>
                      {!isSystemRole && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleDeleteRole(r); }}
                          style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', marginLeft: '6px' }}
                        >
                          <Trash2 size={11} /> Hapus
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Permission Matrix */}
            <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {currentSelectedRole.name}
                    </h3>
                    <span className="badge badge-info">{currentSelectedRole.badge}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Aktifkan atau nonaktifkan hak akses fitur melalui Toggle Switch
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => handleToggleAllForRole(currentSelectedRole.id, true)} className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.76rem' }}>
                    Aktifkan Semua
                  </button>
                  <button onClick={() => handleToggleAllForRole(currentSelectedRole.id, false)} className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.76rem' }}>
                    Matikan Semua
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Object.keys(roleData.permissionLabels).map(permKey => {
                  const label = roleData.permissionLabels[permKey];
                  const isEnabled = !!currentSelectedRole.permissions[permKey];

                  return (
                    <div
                      key={permKey}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: 'var(--bg-surface)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: 'var(--radius-sm)',
                          background: isEnabled ? 'var(--primary-light)' : 'var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Shield size={14} color={isEnabled ? 'var(--primary)' : 'var(--text-muted)'} />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                            {label}
                          </span>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: isEnabled ? 'var(--accent-green)' : 'var(--text-muted)', fontWeight: 600 }}>
                            {isEnabled ? '● Diizinkan' : '○ Dibatasi'}
                          </span>
                        </div>
                      </div>

                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={isEnabled}
                          onChange={() => handleTogglePermission(currentSelectedRole.id, permKey)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '0.5rem', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={18} color="var(--primary)" />
                <p style={{ fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                  <strong>Catatan:</strong> Pengaturan toggle memperbarui hak akses secara real-time dan tersimpan otomatis.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL USER CRUD (CREATE / EDIT USER)                                      */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        title={editingUser ? `Edit Pengguna Login - ${editingUser.nama}` : 'Tambah Pengguna Login Baru'}
      >
        <form onSubmit={handleSaveUser}>
          <div className="form-group">
            <label className="form-label">NIP / Username (Untuk Login)</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: 198501012010011001 atau username_opd"
              value={userFormData.nip}
              onChange={(e) => setUserFormData({ ...userFormData, nip: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nama Lengkap Pengguna</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Ir. Ahmad Fadhil, M.Si"
              value={userFormData.nama}
              onChange={(e) => setUserFormData({ ...userFormData, nama: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Pengguna (Opsional)</label>
            <input
              type="email"
              className="form-input"
              placeholder="email@pasamankab.go.id"
              value={userFormData.email}
              onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Instansi / OPD</label>
              <select
                className="form-select"
                value={userFormData.instansi}
                onChange={(e) => {
                  const selVal = e.target.value;
                  const targetOpd = opdList.find(o => o.nama === selVal);
                  setUserFormData({
                    ...userFormData,
                    instansi: selVal,
                    opdId: targetOpd ? targetOpd.id : ''
                  });
                }}
              >
                <option value="BPS Kabupaten Pasaman">BPS Kabupaten Pasaman</option>
                <option value="Tim Statistik Sektoral BPS">Tim Statistik Sektoral BPS</option>
                {opdList.map(opd => (
                  <option key={opd.id} value={opd.nama}>{opd.kode} - {opd.nama}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Role / Peran Akses</label>
              <select
                className="form-select"
                value={userFormData.roleId}
                onChange={(e) => setUserFormData({ ...userFormData, roleId: e.target.value })}
              >
                {roleData.roles.map(r => (
                  <option key={r.id} value={r.id}>{r.name} ({r.badge})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Kata Sandi Login</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showFormPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Masukkan password..."
                  value={userFormData.password}
                  onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowFormPassword(!showFormPassword)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {showFormPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Status Akun</label>
              <select
                className="form-select"
                value={userFormData.status}
                onChange={(e) => setUserFormData({ ...userFormData, status: e.target.value })}
              >
                <option value="Aktif">Aktif (Dapat Login)</option>
                <option value="Nonaktif">Nonaktif (Login Dibatasi)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
            <button type="button" onClick={() => setIsUserModalOpen(false)} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={15} />
              <span>Simpan Pengguna</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL ROLE CRUD (CREATE / EDIT ROLE)                                      */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        title={editingRole ? `Edit Role - ${editingRole.name}` : 'Tambah Role Akses Baru'}
      >
        <form onSubmit={handleSaveRole}>
          <div className="form-group">
            <label className="form-label">Nama Role / Peran</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Tim Auditor Pembinaan Statistik"
              value={roleFormData.name}
              onChange={(e) => setRoleFormData({ ...roleFormData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">ID Role (Slug)</label>
              <input
                type="text"
                className="form-input"
                value={roleFormData.id}
                onChange={(e) => setRoleFormData({ ...roleFormData, id: e.target.value })}
                required
                disabled={!!editingRole}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Badge Tag (Label Tampilan)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: Specialist BPS"
                value={roleFormData.badge}
                onChange={(e) => setRoleFormData({ ...roleFormData, badge: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Deskripsi Peran</label>
            <textarea
              className="form-input"
              rows={2}
              placeholder="Jelaskan cakupan tanggung jawab peran ini..."
              value={roleFormData.description}
              onChange={(e) => setRoleFormData({ ...roleFormData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
            <button type="button" onClick={() => setIsRoleModalOpen(false)} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={15} />
              <span>Simpan Role</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
