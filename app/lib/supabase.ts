// ==========================================
// Supabase Client Configuration
// ==========================================

import { createClient } from '@supabase/supabase-js';

// Supabase Client for frontend
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Supabase Client for server (API routes)
export async function createServerClient() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );
  return supabase;
}