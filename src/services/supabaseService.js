import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Service terpadu untuk sinkronisasi data ke Supabase Cloud Database (Project: kbczdbqxsqksznjdhuup)
 */

// ── OPD ──
export async function fetchOpdFromSupabase() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('opd').select('*').order('nama');
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Gagal mengambil data OPD dari Supabase:', err);
    return null;
  }
}

export async function upsertOpdToSupabase(opd) {
  if (!isSupabaseConfigured) return;
  try {
    const { error } = await supabase.from('opd').upsert(opd);
    if (error) throw error;
  } catch (err) {
    console.error('Gagal menyimpan OPD ke Supabase:', err);
  }
}

// ── PEMBINAAN ──
export async function fetchPembinaanFromSupabase() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('pembinaan').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Gagal mengambil data pembinaan dari Supabase:', err);
    return null;
  }
}

export async function upsertPembinaanToSupabase(item) {
  if (!isSupabaseConfigured) return;
  try {
    const { error } = await supabase.from('pembinaan').upsert(item);
    if (error) throw error;
  } catch (err) {
    console.error('Gagal menyimpan data pembinaan ke Supabase:', err);
  }
}

// ── KOMPROMIN ──
export async function fetchKomprominFromSupabase() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('kompromin').select('*').order('tahun', { ascending: false });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Gagal mengambil data kompromin dari Supabase:', err);
    return null;
  }
}

export async function upsertKomprominToSupabase(item) {
  if (!isSupabaseConfigured) return;
  try {
    const { error } = await supabase.from('kompromin').upsert(item);
    if (error) throw error;
  } catch (err) {
    console.error('Gagal menyimpan kompromin ke Supabase:', err);
  }
}

// ── ALIRAN DATA ──
export async function fetchAliranDataFromSupabase() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('aliran_data').select('*').order('nama_indikator');
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Gagal mengambil aliran data dari Supabase:', err);
    return null;
  }
}

export async function upsertAliranDataToSupabase(item) {
  if (!isSupabaseConfigured) return;
  try {
    const { error } = await supabase.from('aliran_data').upsert(item);
    if (error) throw error;
  } catch (err) {
    console.error('Gagal menyimpan aliran data ke Supabase:', err);
  }
}

// ── KNOWLEDGE BASE ──
export async function fetchKnowledgeBaseFromSupabase() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('knowledge_base').select('*').order('tanggal', { ascending: false });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Gagal mengambil data knowledge base dari Supabase:', err);
    return null;
  }
}

export async function upsertKnowledgeBaseToSupabase(item) {
  if (!isSupabaseConfigured) return;
  try {
    const { error } = await supabase.from('knowledge_base').upsert(item);
    if (error) throw error;
  } catch (err) {
    console.error('Gagal menyimpan modul knowledge base ke Supabase:', err);
  }
}

// ── ROLES & PERMISSIONS ──
export async function fetchRolesFromSupabase() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('roles').select('*');
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Gagal mengambil data roles dari Supabase:', err);
    return null;
  }
}

export async function upsertRoleToSupabase(role) {
  if (!isSupabaseConfigured) return;
  try {
    const { error } = await supabase.from('roles').upsert(role);
    if (error) throw error;
  } catch (err) {
    console.error('Gagal menyimpan role ke Supabase:', err);
  }
}

// ── USERS ──
export async function fetchUsersFromSupabase() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Gagal mengambil data pengguna dari Supabase:', err);
    return null;
  }
}

export async function upsertUserToSupabase(user) {
  if (!isSupabaseConfigured) return;
  try {
    const { error } = await supabase.from('users').upsert(user);
    if (error) throw error;
  } catch (err) {
    console.error('Gagal menyimpan pengguna ke Supabase:', err);
  }
}
