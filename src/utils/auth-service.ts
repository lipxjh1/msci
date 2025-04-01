import { supabase } from './supabase';

// Đăng ký tài khoản mới
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

// Đăng nhập
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

// Đăng xuất
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Lấy thông tin người dùng hiện tại
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  
  if (error) throw error;
  return data?.user;
}

// Cập nhật thông tin người dùng
export async function updateUserProfile(profile: Record<string, unknown>) {
  const { data, error } = await supabase.auth.updateUser({
    data: profile,
  });
  
  if (error) throw error;
  return data;
} 