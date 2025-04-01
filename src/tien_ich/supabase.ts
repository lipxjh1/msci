/* Cấu hình Supabase client */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../loai/database';

// Môi trường biến được định nghĩa trong .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Tạo Supabase client với type definitions
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Hàm kiểm tra trạng thái xác thực
export async function kiemTraDangNhap() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Đăng nhập với email và mật khẩu
export async function dangNhap(email: string, matKhau: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: matKhau,
  });
  
  if (error) throw error;
  return data;
}

// Đăng xuất
export async function dangXuat() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

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
