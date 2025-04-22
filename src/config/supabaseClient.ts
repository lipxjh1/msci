import { createClient } from '@supabase/supabase-js';

// Môi trường biến được định nghĩa trong .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Kiểm tra biến môi trường
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Thiếu biến môi trường Supabase URL hoặc Anonymous Key trong config');
}

// Tạo Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 