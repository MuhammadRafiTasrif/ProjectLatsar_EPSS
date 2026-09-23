import React, { useState } from 'react';
import Modal from '../components/Modal';
import {
  BookOpen,
  Download,
  Search,
  Inbox,
  Plus,
  Edit,
  Trash2,
  Eye,
  FileText,
  Upload,
  Filter,
  CheckCircle2,
  FileCheck,
  ShieldCheck
} from 'lucide-react';
import { formatDateIndo, formatBytes, compressImageFile } from '../utils/helpers';

export default function KnowledgeBase({
  knowledgeBase = [],
  setKnowledgeBase,
  currentRole,
  currentPermissions = {}
}) {
  // Check permission for Knowledge Base CRUD operations
  const canManage = Boolean(currentPermissions.manageKnowledgeBase) || currentRole?.id === 'role-admin' || currentRole?.id === 'role-ketua-tim';

  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);

  const [formData, setFormData] = useState({
    judul: '',
    tipe: 'Panduan',
    ukuran: '',
    tanggal: new Date().toISOString().split('T')[0],
    deskripsi: '',
    fileUrl: '/docs/sop_pembinaan_bps.pdf',
    fileName: 'sop_pembinaan_bps.pdf'
  });

  const resetForm = () => {
    setFormData({
      judul: '',
      tipe: 'Panduan',
      ukuran: '',
      tanggal: new Date().toISOString().split('T')[0],
      deskripsi: '',
      fileUrl: '/docs/sop_pembinaan_bps.pdf',
      fileName: 'sop_pembinaan_bps.pdf'
    });
    setEditingItem(null);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      judul: item.judul || '',
      tipe: item.tipe || 'Panduan',
      ukuran: item.ukuran || '',
      tanggal: item.tanggal || new Date().toISOString().split('T')[0],
      deskripsi: item.deskripsi || '',
      fileUrl: item.fileUrl || '/docs/sop_pembinaan_bps.pdf',
      fileName: item.fileName || 'sop_pembinaan_bps.pdf'
    });
    setIsFormModalOpen(true);
  };

  // Upload file attachment handler
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await compressImageFile(file);
      const formattedSize = formatBytes(res.isCompressed ? res.compressedSize : file.size);
      const fileObjectUrl = res.compressedUrl || URL.createObjectURL(file);

      setFormData(prev => ({
        ...prev,
        ukuran: formattedSize,
        fileUrl: fileObjectUrl,
        fileName: file.name
      }));
    } catch (err) {
      console.error('Error handling knowledge file upload:', err);
    }
  };

  const handleSaveKnowledge = (e) => {
    e.preventDefault();

    if (editingItem) {
      // Update existing Knowledge item
      const updatedList = knowledgeBase.map(item => {
        if (item.id === editingItem.id) {
          return {
            ...item,
            judul: formData.judul,
            tipe: formData.tipe,
            ukuran: formData.ukuran,
            tanggal: formData.tanggal,
            deskripsi: formData.deskripsi,
            fileUrl: formData.fileUrl,
            fileName: formData.fileName
          };
        }
        return item;
      });

      setKnowledgeBase(updatedList);
      alert('Dokumen knowledgebase berhasil diperbarui!');
    } else {
      // Create new Knowledge item
      const newEntry = {
        id: `kb-${Date.now()}`,
        judul: formData.judul,
        tipe: formData.tipe,
        ukuran: formData.ukuran,
        tanggal: formData.tanggal,
        deskripsi: formData.deskripsi,
        fileUrl: formData.fileUrl,
        fileName: formData.fileName
      };

      setKnowledgeBase([newEntry, ...knowledgeBase]);
      alert('Dokumen knowledgebase baru berhasil diterbitkan!');
    }

    setIsFormModalOpen(false);
    resetForm();
  };

  const handleDeleteKnowledge = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
      setKnowledgeBase(knowledgeBase.filter(item => item.id !== id));
    }
  };

  // Filtered List
  const filtered = knowledgeBase.filter(item => {
    return (
      item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header Banner Section */}
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={22} color="var(--primary)" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Knowledgebase
            </h2>
            <span className={`badge ${canManage ? 'badge-primary' : 'badge-info'}`} style={{ fontSize: '0.72rem' }}>
              {canManage ? 'Akses Pengelolaan (CRUD)' : 'Katalog Pembaca'}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
            Repository panduan pembinaan statistik sektoral, template Kompromin, modul metadata, dan regulasi Satu Data Indonesia.
          </p>
        </div>

        {canManage && (
          <button onClick={handleOpenCreateModal} className="btn btn-primary">
            <Plus size={16} />
            <span>Tambah Dokumen Baru</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="riwayat-controls-bar" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '380px' }}>
          <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Cari dokumen knowledgebase..."
            style={{ paddingLeft: '32px', paddingRight: searchTerm ? '30px' : '10px', fontSize: '0.8rem', height: '36px', borderRadius: 'var(--radius-md)' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          Menampilkan <strong>{filtered.length}</strong> dokumen
        </span>
      </div>

      {/* Document Cards Grid */}
      {filtered.length === 0 ? (
        <div className="glass-card empty-state">
          <div className="empty-state-icon"><Inbox size={24} /></div>
          <span className="empty-state-title">{searchTerm ? 'Tidak ditemukan' : 'Belum ada dokumen'}</span>
          <span className="empty-state-desc">
            {searchTerm
              ? `Tidak ada dokumen yang sesuai dengan kata kunci "${searchTerm}".`
              : 'Belum ada dokumen knowledgebase yang diunggah.'}
          </span>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filtered.map(item => (
            <div key={item.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: '1.3' }}>
                  {item.judul}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.4', flex: 1 }}>
                  {item.deskripsi}
                </p>
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                <span>Tanggal Terbit: <strong style={{ color: 'var(--text-main)' }}>{formatDateIndo(item.tanggal)}</strong></span>
                {item.fileName && (
                  <div style={{ marginTop: '2px' }}>
                    Berkas: <strong style={{ color: 'var(--primary-hover)' }}>{item.fileName}</strong>
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', paddingTop: '8px', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
                <button
                  onClick={() => alert(`Simulasi mengunduh berkas: ${item.fileName || item.judul}`)}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                >
                  <Download size={14} />
                  <span>Unduh Dokumen</span>
                </button>

                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => setDetailItem(item)}
                    className="btn btn-secondary"
                    style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                    title="Pratinjau Detail Dokumen"
                  >
                    <Eye size={13} />
                  </button>

                  {canManage && (
                    <>
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="btn btn-outline-primary"
                        style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                        title="Edit Dokumen"
                      >
                        <Edit size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteKnowledge(item.id)}
                        className="btn btn-secondary"
                        style={{ padding: '6px 10px', fontSize: '0.78rem', color: '#ef4444' }}
                        title="Hapus Dokumen"
                      >
                        <Trash2 size={13} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form Create & Edit Knowledge Base Item */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => { setIsFormModalOpen(false); resetForm(); }}
        title={editingItem ? 'Edit Dokumen Knowledgebase' : 'Terbitkan Dokumen Knowledgebase Baru'}
      >
        <form onSubmit={handleSaveKnowledge}>
          <div className="form-group">
            <label className="form-label">Judul Dokumen</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Petunjuk Teknis Pembinaan Statistik Sektoral BPS Pasaman"
              value={formData.judul}
              onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tanggal Rilis Dokumen</label>
            <input
              type="date"
              className="form-input"
              value={formData.tanggal}
              onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Deskripsi Dokumen</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Penjelasan ringkas cakupan materi dan tujuan dokumen..."
              value={formData.deskripsi}
              onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileCheck size={16} color="var(--primary)" />
              <span>Upload Berkas Dokumen (PDF / Word / Excel)</span>
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xlsx,.xls,.csv"
              className="form-input"
              style={{ padding: '8px' }}
              onChange={handleFileChange}
              required={!editingItem && !formData.fileUrl}
            />
            {formData.fileName && (
              <p style={{ fontSize: '0.78rem', color: 'var(--primary-hover)', marginTop: '4px', fontWeight: 600 }}>
                Berkas: {formData.fileName}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1.25rem' }}>
            <button type="button" onClick={() => { setIsFormModalOpen(false); resetForm(); }} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Upload size={15} />
              <span>{editingItem ? 'Simpan Perubahan' : 'Terbitkan Dokumen'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Detail Viewer */}
      <Modal isOpen={!!detailItem} onClose={() => setDetailItem(null)} title="Pratinjau Dokumen Knowledgebase">
        {detailItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>{detailItem.judul}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>{detailItem.deskripsi}</p>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <div>Tanggal Terbit: <strong style={{ color: 'var(--text-main)' }}>{formatDateIndo(detailItem.tanggal)}</strong></div>
              <div>Nama Berkas: <strong style={{ color: 'var(--primary-hover)' }}>{detailItem.fileName || 'dokumen.pdf'}</strong></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button
                onClick={() => {
                  alert(`Simulasi mengunduh berkas: ${detailItem.fileName || detailItem.judul}`);
                  setDetailItem(null);
                }}
                className="btn btn-primary"
              >
                <Download size={15} />
                <span>Unduh Dokumen</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
