/* Hàm xử lý chỉ số level */

import { supabase } from './supabase';
import { ChiSoLevel } from '../loai';

/**
 * Lấy chỉ số level của nhân vật theo độ hiếm và số sao
 */
export async function layChiSoLevel(doHiEmId: number, sao: number, level: number) {
  const { data, error } = await supabase
    .from('chi_so_level')
    .select('*')
    .eq('do_hi_em_id', doHiEmId)
    .eq('sao', sao)
    .eq('level', level)
    .single();
  
  if (error) throw error;
  return data as ChiSoLevel;
}

/**
 * Lấy danh sách chỉ số của tất cả level theo độ hiếm và số sao
 */
export async function layDanhSachChiSoLevel(doHiEmId: number, sao: number) {
  const { data, error } = await supabase
    .from('chi_so_level')
    .select('*')
    .eq('do_hi_em_id', doHiEmId)
    .eq('sao', sao)
    .order('level');
  
  if (error) throw error;
  return data as ChiSoLevel[];
}

/**
 * Tính chi phí nâng cấp từ level hiện tại đến level mục tiêu
 */
export async function tinhChiPhiNangCap(doHiEmId: number, sao: number, levelHienTai: number, levelMucTieu: number) {
  if (levelHienTai >= levelMucTieu) return 0;
  
  const { data, error } = await supabase
    .from('chi_so_level')
    .select('level, chip_nang_cap')
    .eq('do_hi_em_id', doHiEmId)
    .eq('sao', sao)
    .gte('level', levelHienTai)
    .lte('level', levelMucTieu - 1)
    .order('level');
  
  if (error) throw error;
  
  // Tính tổng chi phí
  return data.reduce((tong, chiSo) => tong + (chiSo.chip_nang_cap || 0), 0);
} 