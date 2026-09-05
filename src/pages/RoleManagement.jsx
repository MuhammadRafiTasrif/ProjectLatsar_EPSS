import React, { useState } from 'react';
import { ShieldCheck, Save, Shield, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RoleManagement({ roleData, setRoleData, currentRole }) {
  const [activeRoleId, setActiveRoleId] = useState(roleData.roles[0]?.id || 'role-admin');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currentSelectedRole = roleData.roles.find(r => r.id === activeRoleId) || roleData.roles[0];

  const handleTogglePermission = (roleId, permKey) => {
    const updatedRoles = roleData.roles.map(r => {
      if (r.id === roleId) {
        return {
          ...r,
          permissions: {
            ...r.permissions,
            [permKey]: !r.permissions[permKey]
          }
        };
      }
      return r;
    });

    setRoleData({ ...roleData, roles: updatedRoles });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleToggleAllForRole = (roleId, enable) => {
    const updatedRoles = roleData.roles.map(r => {
      if (r.id === roleId) {
        const newPerms = {};
        Object.keys(r.permissions).forEach(k => {
          newPerms[k] = enable;
        });
        return { ...r, permissions: newPerms };
      }
      return r;
    });

    setRoleData({ ...roleData, roles: updatedRoles });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={22} color="var(--primary)" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Manajemen Role & Hak Akses
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
            Kelola izin akses fitur SIMPONITAS untuk setiap peran pengguna.
          </p>
        </div>

        {saveSuccess && (
          <div className="badge badge-success" style={{ gap: '5px', padding: '6px 14px', fontSize: '0.82rem' }}>
            <CheckCircle2 size={15} />
            <span>Hak akses diperbarui</span>
          </div>
        )}
      </div>

      <div className="role-layout-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 300px) 1fr', gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.3px' }}>
            Pilih Peran Pengguna:
          </span>

          {roleData.roles.map(r => {
            const isSelected = r.id === activeRoleId;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRoleId(r.id)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)',
                  border: isSelected ? '1px solid var(--primary-border)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: isSelected ? 'var(--primary-hover)' : 'var(--text-main)' }}>
                    {r.name}
                  </span>
                  <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{r.badge}</span>
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: '1.3' }}>
                  {r.description}
                </p>
              </button>
            );
          })}
        </div>

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
                Aktifkan atau nonaktifkan hak akses melalui Toggle Switch
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
              <strong>Catatan:</strong> Perubahan toggle langsung memperbarui hak akses secara real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
