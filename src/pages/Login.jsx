import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, LogIn, Key, Building2, CheckCircle2, AlertCircle, Globe } from 'lucide-react';

export default function Login({ onLogin, roles = [], userList = [], opdList = [] }) {
  const [identityInput, setIdentityInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGuestLogin = () => {
    const guestRole = roles.find(r => r.id === 'role-publik') || {
      id: 'role-publik',
      name: 'Pengguna Publik / Tamu',
      badge: 'Public Guest',
      permissions: {
        viewDashboard: true,
        submitPembinaan: false,
        approvePembinaan: false,
        verifyKompromin: false,
        manageDataSektoral: false,
        accessKnowledgeBase: true,
        manageRoles: false,
        exportData: false
      }
    };

    const guestUser = {
      nip: 'GUEST-PASAMAN',
      nama: 'Masyarakat Umum (Tamu)',
      instansi: 'Masyarakat & Publik Kabupaten Pasaman',
      role: guestRole
    };

    onLogin(guestUser, guestRole);
  };

  // Pre-configured demo accounts for quick testing across 4 roles
  const demoAccounts = [
    {
      roleId: 'role-admin',
      roleNama: 'Admin Sistem BPS',
      nip: '198501012010011001',
      nama: 'Ir. Ahmad Fadhil, M.Si',
      instansi: 'BPS Kabupaten Pasaman'
    },
    {
      roleId: 'role-ketua-tim',
      roleNama: 'Tim Statistik Sektoral BPS',
      nip: '198702152012021002',
      nama: 'Siti Rahmah, S.St, M.E',
      instansi: 'Tim Statistik Sektoral BPS'
    },
    {
      roleId: 'role-walidata-opd',
      roleNama: 'Walidata OPD Pasaman',
      nip: '198904122014031004',
      nama: 'Drs. Hendra Utama',
      instansi: 'Dinas Komunikasi dan Informatika'
    },
    {
      roleId: 'role-produsen-opd',
      roleNama: 'Produsen Data OPD',
      nip: '199208222016042005',
      nama: 'Dr. Rina Kartika',
      instansi: 'Dinas Kesehatan'
    }
  ];

  const handleQuickFill = (acc) => {
    setIdentityInput(acc.nip);
    setPassword('bps1309pasaman');
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identityInput.trim()) {
      setErrorMsg('Silakan masukkan NIP atau Email Pengguna.');
      return;
    }

    if (!password) {
      setErrorMsg('Silakan masukkan kata sandi Anda.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const cleanInput = identityInput.trim().toLowerCase();

      // 1. Check against userList created by Admin
      const matchedUser = userList.find(
        u => u.nip?.toLowerCase() === cleanInput ||
          (u.email && u.email.toLowerCase() === cleanInput)
      );

      if (matchedUser) {
        if (matchedUser.status === 'Nonaktif') {
          setErrorMsg('Akun Anda dinonaktifkan oleh Admin BPS. Silakan hubungi Administrator.');
          return;
        }

        if (matchedUser.password && password !== matchedUser.password) {
          setErrorMsg('Kata sandi yang Anda masukkan salah. Silakan coba lagi.');
          return;
        }

        const targetRole = roles.find(r => r.id === matchedUser.roleId) || roles[0];
        const loggedUser = {
          nip: matchedUser.nip,
          nama: matchedUser.nama,
          email: matchedUser.email,
          instansi: matchedUser.instansi,
          role: targetRole
        };
        onLogin(loggedUser, targetRole);
        return;
      }

      // 2. Fallback check for demo accounts or role matching
      let matchedDemo = demoAccounts.find(
        acc => acc.nip === cleanInput || acc.roleNama.toLowerCase().includes(cleanInput) || cleanInput.includes(acc.roleId.replace('role-', ''))
      );

      let targetRole = null;
      if (matchedDemo) {
        targetRole = roles.find(r => r.id === matchedDemo.roleId) || roles[0];
      } else {
        targetRole = roles.find(r =>
          r.name?.toLowerCase().includes(cleanInput) ||
          r.id.toLowerCase().includes(cleanInput)
        ) || roles[0];
      }

      const loggedUser = {
        nip: matchedDemo ? matchedDemo.nip : identityInput,
        nama: matchedDemo ? matchedDemo.nama : `Pengguna ${targetRole.name || 'Sistem'}`,
        instansi: matchedDemo ? matchedDemo.instansi : 'Pemerintah Kabupaten Pasaman',
        role: targetRole
      };

      onLogin(loggedUser, targetRole);
    }, 600);
  };

  return (
    <div className="login-page-container">
      <div className="login-card-wrapper glass-card">
        {/* Header Branding Section */}
        <div className="login-header">
          <div className="login-logo-badge">
            <ShieldCheck size={32} color="var(--primary)" />
          </div>
          <h1 className="login-title">SIMPONITAS</h1>
          <p className="login-subtitle">
            Sistem Informasi Manajemen Pembinaan Statistik Sektoral Pasaman
          </p>
          <div className="login-bps-badge">
            <Building2 size={13} />
            <span>BPS Kabupaten Pasaman (Kode Wilayah 1309)</span>
          </div>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="login-error-box">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="identityInput">
              NIP / Username / Email Terdaftar
            </label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input
                id="identityInput"
                type="text"
                className="form-input"
                placeholder="Masukkan NIP (Contoh: 198501012010011001)"
                value={identityInput}
                onChange={(e) => setIdentityInput(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="passwordInput">
              Kata Sandi (Password)
            </label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                id="passwordInput"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Masukkan kata sandi akun"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Sembunyikan Kata Sandi' : 'Tampilkan Kata Sandi'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary login-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Memproses Autentikasi...</span>
            ) : (
              <>
                <LogIn size={18} />
                <span>Masuk ke SIMPONITAS</span>
              </>
            )}
          </button>
        </form>

        {/* Guest Login Option (Masyarakat Umum / Tamu) */}
        <div style={{ textAlign: 'center', margin: '2px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '6px 0', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
            <span>atau</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          </div>

          <button
            type="button"
            onClick={handleGuestLogin}
            className="btn btn-secondary"
            style={{
              width: '100%',
              padding: '11px',
              fontSize: '0.88rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'var(--bg-surface)',
              border: '1.5px dashed var(--primary)',
              color: 'var(--primary-hover)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <Globe size={18} />
            <span>Masuk Sebagai Tamu (Masyarakat Umum)</span>
          </button>
        </div>

        {/* Demo Quick Account Selector for 4 Roles */}
        <div className="login-demo-section">
          <div className="demo-section-title">
            <Key size={14} color="var(--primary)" />
            <span>Pilih Akun Demo Uji Coba (4 Role Hak Akses):</span>
          </div>
          <div className="demo-chips-grid">
            {demoAccounts.map(acc => (
              <button
                key={acc.roleId}
                type="button"
                className="demo-chip-btn"
                onClick={() => handleQuickFill(acc)}
              >
                <span className="demo-chip-role">{acc.roleNama}</span>
                <span className="demo-chip-name">{acc.nama}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Security Note */}
        <div className="login-footer-note">
          <CheckCircle2 size={13} color="var(--accent-green)" />
          <span>Terintegrasi dengan Rekomendasi & Wali Data Sektoral BPS Pasaman</span>
        </div>
      </div>
    </div>
  );
}
