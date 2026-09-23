import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kbczdbqxsqksznjdhuup.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_xVO4b3VRp13jUDr7btnw6w_OOuC2DzI';

export const isSupabaseConfigured = Boolean(supabaseAnonKey && supabaseAnonKey.trim() !== '');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured) {
  console.info(
    'ℹ️ SIMPONITAS: Supabase Project ID kbczdbqxsqksznjdhuup terhubung. Masukkan VITE_SUPABASE_ANON_KEY di berkas .env untuk mengaktifkan sinkronisasi database cloud secara langsung.'
  );
}
