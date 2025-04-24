import { createClient } from '@supabase/supabase-js';

// Kiểm tra xem biến môi trường có tồn tại không
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Cải thiện thông báo lỗi
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('LỖI NGHIÊM TRỌNG: Thiếu biến môi trường Supabase URL hoặc Anonymous Key');
  console.error('Vui lòng kiểm tra file .env hoặc .env.local để đảm bảo các biến NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY được thiết lập đúng');
} else if (supabaseAnonKey.length < 100) {
  console.error('LỖI NGHIÊM TRỌNG: Khóa Supabase Anonymous có vẻ bị cắt hoặc không đầy đủ');
  console.error('Khóa hiện tại:', supabaseAnonKey);
  console.error('Vui lòng kiểm tra lại khóa từ Supabase dashboard');
}

// Tạo Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 