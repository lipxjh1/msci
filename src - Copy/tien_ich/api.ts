import { supabase } from './supabase';
import type { AnhHung, VaiTro, BaiViet } from '../loai';

// ========================
// API QUẢN LÝ ANH HÙNG
// ========================

/**
 * Lấy danh sách tất cả anh hùng kèm vai trò và độ hiếm
 */
export async function layDanhSachAnhHung() {
  const { data, error } = await supabase
    .from('anh_hung')
    .select(`
      *,
      vai_tro(id, ten, mo_ta),
      do_hi_em(id, ma, ten, mau_sac)
    `)
    .order('ten');
  
  if (error) throw error;
  return data as AnhHung[];
}

/**
 * Lấy danh sách anh hùng theo vai trò
 */
export async function layAnhHungTheoVaiTro(vaiTroId: number) {
  const { data, error } = await supabase
    .from('anh_hung')
    .select(`
      *,
      vai_tro(id, ten, mo_ta),
      do_hi_em(id, ma, ten, mau_sac)
    `)
    .eq('vai_tro_id', vaiTroId)
    .order('ten');
  
  if (error) throw error;
  return data as AnhHung[];
}

/**
 * Lấy danh sách vai trò
 */
export async function layDanhSachVaiTro() {
  const { data, error } = await supabase
    .from('vai_tro')
    .select('*')
    .order('id');
  
  if (error) throw error;
  return data as VaiTro[];
}

/**
 * Lấy chi tiết một anh hùng
 */
export async function layChiTietAnhHung(id: string) {
  const { data, error } = await supabase
    .from('anh_hung')
    .select(`
      *,
      vai_tro(id, ten, mo_ta),
      do_hi_em(id, ma, ten, mau_sac)
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as AnhHung;
}

/**
 * Tạo anh hùng mới
 */
export async function taoAnhHung(anhHung: Omit<AnhHung, 'id'>) {
  const { data, error } = await supabase
    .from('anh_hung')
    .insert(anhHung)
    .select();
  
  if (error) throw error;
  return data[0] as AnhHung;
}

/**
 * Cập nhật thông tin anh hùng
 */
export async function capNhatAnhHung(id: string, capNhat: Partial<AnhHung>) {
  const { data, error } = await supabase
    .from('anh_hung')
    .update(capNhat)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0] as AnhHung;
}

// ========================
// API QUẢN LÝ BÀI VIẾT
// ========================

/**
 * Lấy danh sách bài viết
 */
export async function layDanhSachBaiViet(loai?: 'tin_tuc' | 'cong_dong', limit = 10) {
  let query = supabase
    .from('bai_viet')
    .select('*, nguoi_dung(ten)')
    .order('ngay_dang', { ascending: false });
  
  if (loai) {
    query = query.eq('loai', loai);
  }
  
  const { data, error } = await query.limit(limit);
  
  if (error) throw error;
  return data as BaiViet[];
}

/**
 * Lấy bài viết nổi bật
 */
export async function layBaiVietNoiBat() {
  const { data, error } = await supabase
    .from('bai_viet')
    .select('*, nguoi_dung(ten)')
    .order('ngay_dang', { ascending: false })
    .limit(3); // Lấy 3 bài viết mới nhất
  
  if (error) throw error;
  return data as BaiViet[];
}

/**
 * Lấy chi tiết bài viết
 */
export async function layChiTietBaiViet(id: string) {
  const { data, error } = await supabase
    .from('bai_viet')
    .select('*, nguoi_dung(ten)')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as BaiViet;
}

/**
 * Tạo bài viết mới
 */
export async function taoBaiViet(baiViet: {
  tieu_de: string;
  noi_dung: string;
  anh_dai_dien?: string;
  loai: 'tin_tuc' | 'cong_dong';
  nguoi_dung_id: string;
}) {
  const { data, error } = await supabase
    .from('bai_viet')
    .insert({
      ...baiViet,
      ngay_dang: new Date().toISOString()
    })
    .select();
  
  if (error) throw error;
  return data[0] as BaiViet;
}

/**
 * Cập nhật bài viết
 */
export async function capNhatBaiViet(id: string, capNhat: {
  tieu_de?: string;
  noi_dung?: string;
  anh_dai_dien?: string;
  loai?: 'tin_tuc' | 'cong_dong';
}) {
  const { data, error } = await supabase
    .from('bai_viet')
    .update(capNhat)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0] as BaiViet;
}

/**
 * Xuất bản bài viết
 */
export async function xuatBanBaiViet(id: string) {
  const { data, error } = await supabase
    .from('bai_viet')
    .update({
      ngay_dang: new Date().toISOString()
    })
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0] as BaiViet;
}

// ========================
// API QUẢN LÝ ĐỘI HÌNH
// ========================

/**
 * Lấy danh sách đội hình của người dùng
 */
export async function layDanhSachDoiHinh(nguoiDungId: string) {
  const { data, error } = await supabase
    .from('doi_hinh')
    .select('*')
    .eq('nguoi_dung_id', nguoiDungId);
  
  if (error) throw error;
  return data;
}

/**
 * Lấy chi tiết đội hình với thông tin anh hùng
 */
export async function layChiTietDoiHinh(doiHinhId: string) {
  const { data, error } = await supabase
    .from('doi_hinh_chi_tiet')
    .select(`
      *,
      anh_hung(
        *,
        vai_tro(id, ten, mo_ta),
        do_hi_em(id, ma, ten, mau_sac)
      )
    `)
    .eq('doi_hinh_id', doiHinhId);
  
  if (error) throw error;
  return data;
}
