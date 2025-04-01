/* Hàm xử lý tài khoản admin */

import { supabase } from './supabase';
import type { NguoiDung } from '../loai';

/**
 * Lấy danh sách admin
 */
export async function layDanhSachAdmin() {
  const { data, error } = await supabase
    .from('nguoi_dung')
    .select('*')
    .order('ngay_tao', { ascending: false });
  
  if (error) throw error;
  return data as NguoiDung[];
}

/**
 * Tạo admin con (chỉ super_admin có quyền)
 */
export async function taoAdminCon(email: string, ten: string, matKhau: string) {
  // 1. Tạo tài khoản Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password: matKhau,
    email_confirm: true
  });
  
  if (authError) throw authError;
  
  // 2. Tạo record trong bảng nguoi_dung
  const { data, error } = await supabase
    .from('nguoi_dung')
    .insert({
      id: authData.user.id,
      email,
      ten,
      vai_tro: 'admin_con'
    })
    .select();
  
  if (error) {
    // Nếu có lỗi, xóa user đã tạo trong Auth
    await supabase.auth.admin.deleteUser(authData.user.id);
    throw error;
  }
  
  return data[0] as NguoiDung;
}

/**
 * Kiểm tra quyền super_admin
 */
export async function kiemTraQuyenSuperAdmin(userId: string) {
  const { data, error } = await supabase
    .from('nguoi_dung')
    .select('vai_tro')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data.vai_tro === 'super_admin';
} 