import { createClient } from '@supabase/supabase-js';

// Safe fallbacks prevent "Error: supabaseUrl is required" during static build time
const supabaseUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';

const supabaseAnonKey = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key-for-build';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  if (typeof window !== 'undefined') {
    console.warn('⚠️ Supabase environment variables are missing in .env.local');
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);