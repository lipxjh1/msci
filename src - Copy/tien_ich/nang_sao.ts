/* Hàm xử lý nâng sao */

import { supabase } from './supabase';
import { NangSao } from '../loai';

/**
 * Lấy thông tin nâng sao theo độ hiếm và số sao
 */
export async function layThongTinNangSao(doHiEmId: number, tuSao: number, soNhanVat: number) {
  const { data, error } = await supabase
    .from('nang_sao')
    .select('*')
    .eq('do_hi_em_id', doHiEmId)
    .eq('tu_sao', tuSao)
    .eq('so_nhan_vat', soNhanVat)
    .single();
  
  if (error) throw error;
  return data as NangSao;
}

/**
 * Lấy danh sách các phương án nâng sao cho một độ hiếm và số sao
 */
export async function layDanhSachPhuongAnNangSao(doHiEmId: number, tuSao: number) {
  const { data, error } = await supabase
    .from('nang_sao')
    .select('*')
    .eq('do_hi_em_id', doHiEmId)
    .eq('tu_sao', tuSao)
    .order('so_nhan_vat', { ascending: false });
  
  if (error) throw error;
  return data as NangSao[];
}

/**
 * Tính tỷ lệ thành công khi nâng sao với số nhân vật cho trước
 */
export async function tinhTyLeThanhCongNangSao(doHiEmId: number, tuSao: number, soNhanVat: number) {
  const { data, error } = await supabase
    .from('nang_sao')
    .select('tile_thanh_cong')
    .eq('do_hi_em_id', doHiEmId)
    .eq('tu_sao', tuSao)
    .eq('so_nhan_vat', soNhanVat)
    .single();
  
  if (error) throw error;
  return data ? data.tile_thanh_cong : 0;
}

/**
 * Tính số memory tối thiểu cần để nâng sao
 */
export async function tinhSoMemoryNangSao(doHiEmId: number, tuSao: number, soNhanVat: number) {
  const { data, error } = await supabase
    .from('nang_sao')
    .select('memory_moi_nv')
    .eq('do_hi_em_id', doHiEmId)
    .eq('tu_sao', tuSao)
    .eq('so_nhan_vat', soNhanVat)
    .single();
  
  if (error) throw error;
  
  // Tính tổng memory cần
  return data && data.memory_moi_nv ? data.memory_moi_nv * soNhanVat : 0;
} 