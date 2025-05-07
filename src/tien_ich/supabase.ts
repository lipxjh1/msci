/* Cấu hình Supabase client */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../loai/database';

// Môi trường biến được định nghĩa trong .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Kiểm tra biến môi trường trước khi tạo client
if (!supabaseUrl) {
  console.error('NEXT_PUBLIC_SUPABASE_URL không được cấu hình');
}

if (!supabaseAnonKey) {
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY không được cấu hình');
}

// Tạo Supabase client DẠNG SINGLETON để tránh lỗi GoTrueClient nhiều instance
// Sử dụng biến toàn cục để lưu trữ instance
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

// Tạo Supabase client theo singleton pattern để tránh nhiều instance
export const supabase = (() => {
  // Kiểm tra xem môi trường hiện tại có window hay không
  const isServerSide = typeof window === 'undefined';
  // Tạo khóa lưu trữ duy nhất để tránh xung đột với các instance khác
  const storageKey = 'supabase.auth.token.vinhot.admin';

  if (supabaseInstance === null || isServerSide) {
    // Nếu ở phía server hoặc chưa có instance thì tạo mới
    supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        storageKey: storageKey,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      global: {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    });
    
    if (!isServerSide) {
      console.log('Supabase client instance created');
    }
  }
  return supabaseInstance;
})();

// Lấy thông tin người dùng hiện tại
export async function layThongTinNguoiDung() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  // Lấy thông tin chi tiết từ bảng nguoi_dung
  const { data, error } = await supabase
    .from('nguoi_dung')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (error) throw error;
  return data;
}
