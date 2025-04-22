import { createClient } from '@supabase/supabase-js';

// Kiểm tra xem biến môi trường có tồn tại không
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Cảnh báo thay vì throw lỗi
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Thiếu biến môi trường Supabase URL hoặc Anonymous Key');
}

// Tạo Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 