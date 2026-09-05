import React, { useState } from 'react';
import { ShieldCheck, ToggleLeft, ToggleRight, Save, RotateCcw, Shield, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

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

    setRoleData({
      ...roleData,
      roles: updatedRoles
    });
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
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={24} color="var(--primary)" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Manajemen Role & Hak Akses Pengguna
            </h2>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Kelola dan atur setiap izin akses fitur sistem SIMPONITAS BPS Pasaman secara instan dengan **Toggle Switch**.
          </p>
        </div>

        {saveSuccess && (
          <div className="badge badge-success" style={{ gap: '6px', padding: '8px 16px', fontSize: '0.85rem' }}>
            <CheckCircle2 size={16} />
            <span>Perubahan Hak Akses Berhasil Diperbarui!</span>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Pilih Peran Pengguna:
          </span>

          {roleData.roles.map(r => {
            const isSelected = r.id === activeRoleId;
            return (
              <div
                key={r.id}
                onClick={() => setActiveRoleId(r.id)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--primary-light)' : 'var(--bg-main)',
                  border: isSelected ? '1px solid var(--primary-border)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: isSelected ? 'var(--primary-hover)' : 'var(--text-main)' }}>
                    {r.name}
                  </span>
                  <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>{r.badge}</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.3' }}>
                  {r.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {currentSelectedRole.name}
                </h3>
                <span className="badge badge-info">{currentSelectedRole.badge}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Matriks Pengaturan Hak Akses (Aktifkan / Nonaktifkan melalui Toggle Switch)
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleToggleAllForRole(currentSelectedRole.id, true)}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              >
                Aktifkan Semua
              </button>
              <button
                onClick={() => handleToggleAllForRole(currentSelectedRole.id, false)}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              >
                Matikan Semua
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                    padding: '12px 16px',
                    background: 'var(--bg-main)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-sm)',
                      background: isEnabled ? 'var(--primary-light)' : 'var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Shield size={16} color={isEnabled ? 'var(--primary)' : 'var(--text-muted)'} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {label}
                      </span>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: isEnabled ? 'var(--accent-green)' : 'var(--text-muted)', fontWeight: 600 }}>
                        {isEnabled ? '● Hak Akses Diberikan (Diizinkan)' : '○ Hak Akses Diblokir (Dibatasi)'}
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

          <div style={{ marginTop: '1rem', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', border: '1px solid var(--primary-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle size={20} color="var(--primary)" />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <strong>Catatan Sistem:</strong> Perubahan yang dilakukan pada toggle switch langsung memperbarui hak akses sistem secara real-time untuk peran tersebut.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
