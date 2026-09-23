import React, { useState } from 'react';
import Modal from '../components/Modal';
import {
  Building2,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  User,
  Phone,
  ShieldCheck
} from 'lucide-react';

export default function MasterOpd({
  opdList = [],
  setOpdList,
  currentRole,
  currentPermissions
}) {
  const isBpsAdmin =
    currentRole?.id === 'role-admin' ||
    currentRole?.id === 'role-ketua-tim' ||
    Boolean(currentPermissions?.manageRoles);

  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [editingOpd, setEditingOpd] = useState(null);
  const [detailOpd, setDetailOpd] = useState(null);

  const [formData, setFormData] = useState({
    nama: '',
    kode: '',
    penanggungJawab: '',
    kontak: '',
    email: ''
  });

  const filteredList = opdList.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      (item.nama || '').toLowerCase().includes(q) ||
      (item.kode || '').toLowerCase().includes(q) ||
      (item.penanggungJawab || '').toLowerCase().includes(q) ||
      (item.email || '').toLowerCase().includes(q)
    );
  });

  const handleOpenCreateModal = () => {
    setFormData({
      nama: '',
      kode: '',
      penanggungJawab: '',
      kontak: '',
      email: ''
    });
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (opd) => {
    setEditingOpd(opd);
    setFormData({
      nama: opd.nama || '',
      kode: opd.kode || '',
      penanggungJawab: opd.penanggungJawab || '',
      kontak: opd.kontak || '',
      email: opd.email || ''
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDetailModal = (opd) => {
    setDetailOpd(opd);
    setIsDetailModalOpen(true);
  };

  const handleSaveCreate = (e) => {
    e.preventDefault();
    if (!formData.nama.trim() || !formData.kode.trim()) {
      alert('Nama OPD dan Kode Singkatan wajib diisi!');
      return;
    }

    const newOpd = {
      id: `opd-${Date.now()}`,
      ...formData
    };

    setOpdList((prev) => [newOpd, ...prev]);
    setIsCreateModalOpen(false);
    alert(`Instansi OPD "${newOpd.nama}" berhasil ditambahkan.`);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!formData.nama.trim() || !formData.kode.trim()) {
      alert('Nama OPD dan Kode Singkatan wajib diisi!');
      return;
    }

    setOpdList((prev) =>
      prev.map((item) => (item.id === editingOpd.id ? { ...item, ...formData } : item))
    );
    setIsEditModalOpen(false);
    alert(`Data Master OPD "${formData.nama}" berhasil diperbarui.`);
  };

  const handleDeleteOpd = (opd) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${opd.nama}" dari Master OPD?`)) {
      setOpdList((prev) => prev.filter((item) => item.id !== opd.id));
      alert(`Master OPD "${opd.nama}" berhasil dihapus.`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      {/* Header Banner */}
      <section className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Building2 size={12} /> Master OPD Kabupaten Pasaman
              </span>
              {isBpsAdmin && (
                <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={12} /> Akses Pengelolaan BPS
                </span>
              )}
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Kelola Master Organisasi Perangkat Daerah (OPD)
            </h1>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Daftar master instansi OPD terdaftar di Kabupaten Pasaman yang bekerja sama dengan BPS dalam penyelenggaraan statistik sektoral.
            </p>
          </div>

          {isBpsAdmin && (
            <button onClick={handleOpenCreateModal} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              <Plus size={16} />
              <span> Tambah OPD Baru</span>
            </button>
          )}
        </div>
      </section>

      {/* Main Table Section */}
      <section className="glass-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Total Terdaftar: <strong style={{ color: 'var(--primary-hover)' }}>{opdList.length} OPD</strong>
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Cari OPD, Kode, PIC, atau Email..."
              style={{ paddingLeft: '34px', fontSize: '0.82rem', padding: '7px 12px 7px 34px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center' }}>No</th>
                <th style={{ width: '35%' }}>Nama OPD</th>
                <th style={{ width: '18%' }}>Penanggung Jawab (PIC)</th>
                <th style={{ width: '18%' }}>Kontak PIC</th>
                <th style={{ width: '17%' }}>Email Resmi</th>
                <th style={{ width: '12%', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    Tidak ditemukan data Master OPD yang cocok dengan kata kunci "{searchTerm}".
                  </td>
                </tr>
              ) : (
                filteredList.map((opd, idx) => (
                  <tr key={opd.id}>
                    <td style={{ textAlign: 'center', fontWeight: 600, fontSize: '0.8rem' }}>{idx + 1}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--text-main)' }}>{opd.nama}</span>
                        <span className="badge badge-info" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>{opd.kode}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-main)', fontWeight: 600 }}>{opd.penanggungJawab || '-'}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{opd.kontak || '-'}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{opd.email || '-'}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <button
                          onClick={() => handleOpenDetailModal(opd)}
                          className="btn btn-secondary"
                          style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                          title="Lihat Detail Master OPD"
                        >
                          <Eye size={12} />
                          <span>Detail</span>
                        </button>

                        {isBpsAdmin && (
                          <>
                            <button
                              onClick={() => handleOpenEditModal(opd)}
                              className="btn btn-outline-primary"
                              style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                              title="Edit Data Master OPD"
                            >
                              <Edit size={12} />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => handleDeleteOpd(opd)}
                              className="btn btn-secondary"
                              style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#ef4444' }}
                              title="Hapus Master OPD"
                            >
                              <Trash2 size={12} />
                              <span>Hapus</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal Detail Master OPD */}
      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title="Detail Data Master OPD">
        {detailOpd && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-border)' }}>
              <span className="badge badge-info" style={{ marginBottom: '6px', display: 'inline-block' }}>Kode: {detailOpd.kode}</span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>{detailOpd.nama}</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem' }}>
              <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
                  <User size={12} /> Penanggung Jawab (PIC)
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>{detailOpd.penanggungJawab || '-'}</div>
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
                  <Phone size={12} /> Kontak Telepon / WA PIC
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-hover)' }}>{detailOpd.kontak || '-'}</div>
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', gridColumn: 'span 2' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
                  <Mail size={12} /> Email Resmi Instansi
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>{detailOpd.email || '-'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button onClick={() => setIsDetailModalOpen(false)} className="btn btn-secondary" style={{ padding: '6px 16px', fontSize: '0.82rem' }}>
                Tutup
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Tambah Master OPD Baru */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Tambah Instansi OPD Baru">
        <form onSubmit={handleSaveCreate}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">Nama Lengkap Instansi OPD *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: Dinas Pertanian Kabupaten Pasaman"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Kode Singkatan OPD *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: DISTAN"
                required
                value={formData.kode}
                onChange={(e) => setFormData({ ...formData, kode: e.target.value.toUpperCase() })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label">Nama Penanggung Jawab (PIC)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Ir. Afrizal, M.Si"
                  value={formData.penanggungJawab}
                  onChange={(e) => setFormData({ ...formData, penanggungJawab: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Kontak PIC (HP/WA)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: 0813-7788-9900"
                  value={formData.kontak}
                  onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="form-label">Email Resmi OPD</label>
              <input
                type="email"
                className="form-input"
                placeholder="Contoh: pertanian@pasamankab.go.id"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '0.5rem' }}>
              <button type="button" onClick={() => setIsCreateModalOpen(false)} className="btn btn-secondary">
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan Master OPD
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal Edit Master OPD */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={`Edit Master OPD - ${editingOpd?.kode}`}>
        <form onSubmit={handleSaveEdit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">Nama Lengkap Instansi OPD *</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Kode Singkatan OPD *</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.kode}
                onChange={(e) => setFormData({ ...formData, kode: e.target.value.toUpperCase() })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label">Nama Penanggung Jawab (PIC)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.penanggungJawab}
                  onChange={(e) => setFormData({ ...formData, penanggungJawab: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Kontak PIC (HP/WA)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.kontak}
                  onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="form-label">Email Resmi OPD</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '0.5rem' }}>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn btn-secondary">
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan Perubahan
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
