import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Service terpadu untuk sinkronisasi data ke Supabase Cloud Database (Project ID: kbczdbqxsqksznjdhuup)
 * Mendukung pemetaan otomatis antara format camelCase frontend dan snake_case PostgreSQL
 */

// ── OPD ──
export async function fetchOpdFromSupabase() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('opd').select('*').order('nama');
    if (error) throw error;
    if (!data || !data.length) return null;

    return data.map(o => ({
      id: o.id,
      nama: o.nama,
      kode: o.kode,
      penanggungJawab: o.penanggung_jawab || '',
      kontak: o.kontak || '',
      email: o.email || '',
      status: o.status || 'Aktif'
    }));
  } catch (err) {
    console.warn('Supabase fetch opd:', err);
    return null;
  }
}

export async function upsertOpdToSupabase(opd) {
  if (!isSupabaseConfigured) return;
  try {
    const payload = {
      id: opd.id,
      nama: opd.nama,
      kode: opd.kode,
      penanggung_jawab: opd.penanggungJawab || opd.penanggung_jawab || '',
      kontak: opd.kontak || '',
      email: opd.email || '',
      status: opd.status || 'Aktif'
    };
    await supabase.from('opd').upsert(payload);
  } catch (err) {
    console.warn('Supabase upsert opd:', err);
  }
}

// ── PEMBINAAN ──
export async function fetchPembinaanFromSupabase() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('pembinaan').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    if (!data || !data.length) return null;

    return data.map(p => ({
      id: p.id,
      opdId: p.opd_id || '',
      opdNama: p.opd_nama || '',
      jenis: p.jenis || '',
      topik: p.topik || '',
      namaPIC: p.nama_pic || '',
      kontak: p.kontak || '',
      uraianKebutuhan: p.uraian_kebutuhan || '',
      catatanTambahan: p.catatan_tambahan || '',
      tanggalUsulan: p.tanggal_usulan || '',
      tanggalPelaksanaan: p.tanggal_pelaksanaan || '',
      waktuPembinaan: p.waktu_pembinaan || '',
      status: p.status || 'Menunggu Persetujuan',
      lokasi: p.lokasi || '',
      pembinaBPS: p.pembina_bps || '',
      perwakilanOPD: p.perwakilan_opd || '',
      notulen: p.notulen || '',
      catatanBps: p.catatan_bps || '',
      dokumentasiUrl: p.dokumentasi_url || '',
      fotoList: p.foto_list || [],
      riwayatPerubahan: p.riwayat_perubahan || []
    }));
  } catch (err) {
    console.warn('Supabase fetch pembinaan:', err);
    return null;
  }
}

export async function upsertPembinaanToSupabase(p) {
  if (!isSupabaseConfigured) return;
  try {
    const payload = {
      id: p.id,
      opd_id: p.opdId || p.opd_id || '',
      opd_nama: p.opdNama || p.opd_nama || '',
      jenis: p.jenis || '',
      topik: p.topik || '',
      nama_pic: p.namaPIC || p.nama_pic || '',
      kontak: p.kontak || '',
      uraian_kebutuhan: p.uraianKebutuhan || p.uraian_kebutuhan || '',
      catatan_tambahan: p.catatanTambahan || p.catatan_tambahan || '',
      tanggal_usulan: p.tanggalUsulan || p.tanggal_usulan || '',
      tanggal_pelaksanaan: p.tanggalPelaksanaan || p.tanggal_pelaksanaan || '',
      waktu_pembinaan: p.waktuPembinaan || p.waktu_pembinaan || '',
      status: p.status || 'Menunggu Persetujuan',
      lokasi: p.lokasi || '',
      pembina_bps: p.pembinaBPS || p.pembina_bps || '',
      perwakilan_opd: p.perwakilanOPD || p.perwakilan_opd || '',
      notulen: p.notulen || '',
      catatan_bps: p.catatanBps || p.catatan_bps || '',
      dokumentasi_url: p.dokumentasiUrl || p.dokumentasi_url || '',
      foto_list: p.fotoList || p.foto_list || [],
      riwayat_perubahan: p.riwayatPerubahan || p.riwayat_perubahan || []
    };
    await supabase.from('pembinaan').upsert(payload);
  } catch (err) {
    console.warn('Supabase upsert pembinaan:', err);
  }
}

// ── KOMPROMIN ──
export async function fetchKomprominFromSupabase() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('kompromin').select('*').order('tahun', { ascending: false });
    if (error) throw error;
    if (!data || !data.length) return null;

    return data.map(k => ({
      id: k.id,
      judul: k.judul || '',
      opdId: k.opd_id || '',
      opdNama: k.opd_nama || '',
      tahun: k.tahun || 2026,
      statusVerifikasi: k.status_verifikasi || 'Draft OPD',
      ringkasan: k.ringkasan || '',
      coverUrl: k.cover_url || '',
      coverFileName: k.cover_file_name || '',
      fileUrl: k.file_url || '',
      fileName: k.file_name || ''
    }));
  } catch (err) {
    console.warn('Supabase fetch kompromin:', err);
    return null;
  }
}

export async function upsertKomprominToSupabase(k) {
  if (!isSupabaseConfigured) return;
  try {
    const payload = {
      id: k.id,
      judul: k.judul || '',
      opd_id: k.opdId || k.opd_id || '',
      opd_nama: k.opdNama || k.opd_nama || '',
      tahun: Number(k.tahun) || 2026,
      status_verifikasi: k.statusVerifikasi || k.status_verifikasi || 'Draft OPD',
      ringkasan: k.ringkasan || '',
      cover_url: k.coverUrl || k.cover_url || '',
      cover_file_name: k.coverFileName || k.cover_file_name || '',
      file_url: k.fileUrl || k.file_url || '',
      file_name: k.fileName || k.file_name || ''
    };
    await supabase.from('kompromin').upsert(payload);
  } catch (err) {
    console.warn('Supabase upsert kompromin:', err);
  }
}

// ── ALIRAN DATA ──
export async function fetchAliranDataFromSupabase() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('aliran_data').select('*').order('nama_indikator');
    if (error) throw error;
    if (!data || !data.length) return null;

    return data.map(a => ({
      id: a.id,
      namaIndikator: a.nama_indikator || '',
      deskripsi: a.deskripsi || '',
      opdId: a.opd_id || '',
      opdNama: a.opd_nama || '',
      tahun: a.tahun || 2026,
      jenisPeriode: a.jenis_periode || 'Triwulan',
      bentukInput: a.bentuk_input || '',
      petunjukPengisian: a.petunjuk_pengisian || '',
      tenggatWaktu: a.tenggat_waktu || '',
      statusAktif: a.status_aktif !== undefined ? a.status_aktif : true,
      periodes: a.periodes || []
    }));
  } catch (err) {
    console.warn('Supabase fetch aliran data:', err);
    return null;
  }
}

export async function upsertAliranDataToSupabase(a) {
  if (!isSupabaseConfigured) return;
  try {
    const payload = {
      id: a.id,
      nama_indikator: a.namaIndikator || a.nama_indikator || '',
      deskripsi: a.deskripsi || '',
      opd_id: a.opdId || a.opd_id || '',
      opd_nama: a.opdNama || a.opd_nama || '',
      tahun: Number(a.tahun) || 2026,
      jenis_periode: a.jenisPeriode || a.jenis_periode || 'Triwulan',
      bentuk_input: a.bentukInput || a.bentuk_input || '',
      petunjuk_pengisian: a.petunjukPengisian || a.petunjuk_pengisian || '',
      tenggat_waktu: a.tenggatWaktu || a.tenggat_waktu || '',
      status_aktif: a.statusAktif !== undefined ? a.statusAktif : true,
      periodes: a.periodes || []
    };
    await supabase.from('aliran_data').upsert(payload);
  } catch (err) {
    console.warn('Supabase upsert aliran data:', err);
  }
}

// ── KNOWLEDGE BASE ──
export async function fetchKnowledgeBaseFromSupabase() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('knowledge_base').select('*').order('tanggal', { ascending: false });
    if (error) throw error;
    if (!data || !data.length) return null;

    return data.map(kb => ({
      id: kb.id,
      judul: kb.judul || '',
      tipe: kb.tipe || 'Panduan',
      ukuran: kb.ukuran || '',
      tanggal: kb.tanggal || '',
      deskripsi: kb.deskripsi || '',
      fileUrl: kb.file_url || '',
      fileName: kb.file_name || ''
    }));
  } catch (err) {
    console.warn('Supabase fetch knowledge base:', err);
    return null;
  }
}

export async function upsertKnowledgeBaseToSupabase(kb) {
  if (!isSupabaseConfigured) return;
  try {
    const payload = {
      id: kb.id,
      judul: kb.judul || '',
      tipe: kb.tipe || 'Panduan',
      ukuran: kb.ukuran || '',
      tanggal: kb.tanggal || '',
      deskripsi: kb.deskripsi || '',
      file_url: kb.fileUrl || kb.file_url || '',
      file_name: kb.fileName || kb.file_name || ''
    };
    await supabase.from('knowledge_base').upsert(payload);
  } catch (err) {
    console.warn('Supabase upsert knowledge base:', err);
  }
}

// ── ROLES & PERMISSIONS ──
export async function fetchRolesFromSupabase() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('roles').select('*');
    if (error) throw error;
    if (!data || !data.length) return null;

    return {
      roles: data.map(r => ({
        id: r.id,
        name: r.name,
        description: r.description || '',
        badge: r.badge || '',
        permissions: r.permissions || {}
      })),
      permissionLabels: {
        viewDashboard: 'Lihat Dashboard Analytics & KPI',
        submitPembinaan: 'Pengajuan Permohonan Pembinaan Baru',
        approvePembinaan: 'Persetujuan & Penjadwalan Pembinaan (BPS)',
        verifyKompromin: 'Verifikasi & Penerbitan Dokumen Kompromin',
        manageDataSektoral: 'Kelola & Update Dataset Data Sektoral',
        accessKnowledgeBase: 'Akses & Unduh Modul Knowledge Base',
        manageKnowledgeBase: 'Kelola, Tambah, Edit & Hapus Modul Knowledge Base (CRUD)',
        manageRoles: 'Akses Laman Manajemen Role & Hak Akses'
      }
    };
  } catch (err) {
    console.warn('Supabase fetch roles:', err);
    return null;
  }
}

export async function upsertRoleToSupabase(role) {
  if (!isSupabaseConfigured) return;
  try {
    await supabase.from('roles').upsert({
      id: role.id,
      name: role.name,
      description: role.description || '',
      badge: role.badge || '',
      permissions: role.permissions || {}
    });
  } catch (err) {
    console.warn('Supabase upsert role:', err);
  }
}

// ── USERS ──
export async function fetchUsersFromSupabase() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    if (!data || !data.length) return null;

    return data.map(u => ({
      id: u.id,
      nip: u.nip,
      nama: u.nama,
      email: u.email || '',
      instansi: u.instansi || '',
      opdId: u.opd_id || '',
      roleId: u.role_id || '',
      password: u.password || '',
      status: u.status || 'Aktif'
    }));
  } catch (err) {
    console.warn('Supabase fetch users:', err);
    return null;
  }
}

export async function upsertUserToSupabase(u) {
  if (!isSupabaseConfigured) return;
  try {
    await supabase.from('users').upsert({
      id: u.id,
      nip: u.nip,
      nama: u.nama,
      email: u.email || '',
      instansi: u.instansi || '',
      opd_id: u.opdId || u.opd_id || null,
      role_id: u.roleId || u.role_id || null,
      password: u.password || '',
      status: u.status || 'Aktif'
    });
  } catch (err) {
    console.warn('Supabase upsert user:', err);
  }
}
