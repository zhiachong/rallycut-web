import { createClient } from '@supabase/supabase-js';

// Use fallback values during build, real values at runtime
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side operations with service role
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabaseAdmin = supabaseServiceRoleKey && supabaseUrl && supabaseUrl !== 'https://placeholder.supabase.co'
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : supabase;
