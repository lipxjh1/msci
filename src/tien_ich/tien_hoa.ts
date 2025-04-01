/* Hàm xử lý tiến hóa */

import { supabase } from './supabase';
import { TienHoa } from '../loai';

/**
 * Lấy thông tin tiến hóa theo độ hiếm gốc và đích
 */
export async function layThongTinTienHoa(doHiEmGocId: number, doHiEmDichId: number) {
  const { data, error } = await supabase
    .from('tien_hoa')
    .select('*')
    .eq('do_hi_em_goc_id', doHiEmGocId)
    .eq('do_hi_em_dich_id', doHiEmDichId)
    .single();
  
  if (error) throw error;
  return data as TienHoa;
}

/**
 * Lấy danh sách tiến hóa có thể thực hiện từ độ hiếm gốc
 */
export async function layDanhSachTienHoaTuDoHiemGoc(doHiEmGocId: number) {
  const { data, error } = await supabase
    .from('tien_hoa')
    .select(`
      *,
      do_hi_em_dich:do_hi_em_dich_id(id, ma, ten, mau_sac)
    `)
    .eq('do_hi_em_goc_id', doHiEmGocId)
    .order('do_hi_em_dich_id');
  
  if (error) throw error;
  return data;
}

/**
 * Lấy danh sách tiến hóa đến độ hiếm đích
 */
export async function layDanhSachTienHoaDenDoHiemDich(doHiEmDichId: number) {
  const { data, error } = await supabase
    .from('tien_hoa')
    .select(`
      *,
      do_hi_em_goc:do_hi_em_goc_id(id, ma, ten, mau_sac)
    `)
    .eq('do_hi_em_dich_id', doHiEmDichId)
    .order('do_hi_em_goc_id');
  
  if (error) throw error;
  return data;
}

/**
 * Tính xác suất thành công tiến hóa
 */
export async function tinhXacSuatTienHoa(doHiEmGocId: number, doHiEmDichId: number, soNhanVat: number, level: number) {
  const { data, error } = await supabase
    .from('tien_hoa')
    .select('*')
    .eq('do_hi_em_goc_id', doHiEmGocId)
    .eq('do_hi_em_dich_id', doHiEmDichId)
    .single();
  
  if (error) throw error;
  
  if (!data) return 0;
  
  // Kiểm tra điều kiện số nhân vật và level
  if (soNhanVat < data.so_nhan_vat || level < (data.level_yeu_cau || 0)) {
    return 0;
  }
  
  return data.tile_thanh_cong || 0;
}

/**
 * Tính số memory cần để tiến hóa
 */
export async function tinhMemoryTienHoa(doHiEmGocId: number, doHiEmDichId: number) {
  const { data, error } = await supabase
    .from('tien_hoa')
    .select('so_nhan_vat, memory_moi_nv')
    .eq('do_hi_em_goc_id', doHiEmGocId)
    .eq('do_hi_em_dich_id', doHiEmDichId)
    .single();
  
  if (error) throw error;
  
  if (!data) return 0;
  
  // Tính tổng memory cần
  return (data.memory_moi_nv || 0) * data.so_nhan_vat;
} 