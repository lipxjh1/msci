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
  // Tạo khóa lưu trữ duy nhất cho trang admin
  const storageKey = 'sb-admin-auth-token';

  if (isServerSide) {
    // Nếu ở phía server, tạo mới mỗi lần (không có vấn đề với warning client)
    return createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // Không lưu session phía server
        storageKey
      }
    });
  }

  // Nếu ở phía client và đã có instance, sử dụng lại
  if (supabaseInstance !== null) {
    return supabaseInstance;
  }

  // Ở phía client nhưng chưa có instance, tạo mới
  supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      storageKey,
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
  
  console.log('Supabase client instance created');
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
