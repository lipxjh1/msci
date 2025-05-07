/* Hàm xử lý đội hình */

import { supabase } from './supabase';

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

/**
 * Tạo đội hình mới
 */
export async function taoDoiHinh(nguoiDungId: string, ten: string) {
  const { data, error } = await supabase
    .from('doi_hinh')
    .insert({
      nguoi_dung_id: nguoiDungId,
      ten
    })
    .select();
  
  if (error) throw error;
  return data[0];
}

/**
 * Thêm anh hùng vào đội hình
 */
export async function themAnhHungVaoDoiHinh(doiHinhId: string, anhHungId: string, vaiTroId: number) {
  // Kiểm tra xem vai trò đã được sử dụng trong đội hình chưa
  const { data: kiemTra, error: errorKiemTra } = await supabase
    .from('doi_hinh_chi_tiet')
    .select('*')
    .eq('doi_hinh_id', doiHinhId)
    .eq('vai_tro_id', vaiTroId);
  
  if (errorKiemTra) throw errorKiemTra;
  
  if (kiemTra && kiemTra.length > 0) {
    throw new Error('Vai trò này đã được sử dụng trong đội hình');
  }
  
  // Thêm anh hùng vào đội hình
  const { data, error } = await supabase
    .from('doi_hinh_chi_tiet')
    .insert({
      doi_hinh_id: doiHinhId,
      anh_hung_id: anhHungId,
      vai_tro_id: vaiTroId
    })
    .select();
  
  if (error) throw error;
  return data[0];
}

/**
 * Xóa anh hùng khỏi đội hình
 */
export async function xoaAnhHungKhoiDoiHinh(doiHinhId: string, anhHungId: string) {
  const { error } = await supabase
    .from('doi_hinh_chi_tiet')
    .delete()
    .eq('doi_hinh_id', doiHinhId)
    .eq('anh_hung_id', anhHungId);
  
  if (error) throw error;
  return true;
}

/**
 * Xóa đội hình
 */
export async function xoaDoiHinh(doiHinhId: string) {
  // Xóa tất cả chi tiết đội hình trước
  const { error: errorChiTiet } = await supabase
    .from('doi_hinh_chi_tiet')
    .delete()
    .eq('doi_hinh_id', doiHinhId);
  
  if (errorChiTiet) throw errorChiTiet;
  
  // Xóa đội hình
  const { error } = await supabase
    .from('doi_hinh')
    .delete()
    .eq('id', doiHinhId);
  
  if (error) throw error;
  return true;
} 