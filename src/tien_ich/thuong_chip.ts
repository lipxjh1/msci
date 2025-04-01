/* Hàm xử lý thưởng chip */

import { supabase } from './supabase';
import { ThuongChip } from '../loai';

/**
 * Lấy thông tin thưởng chip theo độ hiếm và số sao
 */
export async function layThongTinThuongChip(doHiEmId: number, sao: number) {
  const { data, error } = await supabase
    .from('thuong_chip')
    .select('*')
    .eq('do_hi_em_id', doHiEmId)
    .eq('sao', sao)
    .single();
  
  if (error) throw error;
  return data as ThuongChip;
}

/**
 * Lấy danh sách thưởng chip theo độ hiếm
 */
export async function layDanhSachThuongChipTheoDoHiem(doHiEmId: number) {
  const { data, error } = await supabase
    .from('thuong_chip')
    .select('*')
    .eq('do_hi_em_id', doHiEmId)
    .order('sao');
  
  if (error) throw error;
  return data as ThuongChip[];
}

/**
 * Tính tổng chip nhận được theo thời gian
 */
export async function tinhTongChipNhanDuoc(doHiEmId: number, sao: number, gioTheoDoiTrucTuyen: number) {
  const { data, error } = await supabase
    .from('thuong_chip')
    .select('chip_moi_giay')
    .eq('do_hi_em_id', doHiEmId)
    .eq('sao', sao)
    .single();
  
  if (error) throw error;
  
  // Chuyển giờ sang giây và tính tổng chip
  const soGiay = gioTheoDoiTrucTuyen * 3600;
  return data && data.chip_moi_giay ? data.chip_moi_giay * soGiay : 0;
}

/**
 * Tính thời gian cần để đạt số chip cần thiết
 */
export async function tinhThoiGianCanChip(doHiEmId: number, sao: number, soChipCanThiet: number) {
  const { data, error } = await supabase
    .from('thuong_chip')
    .select('chip_moi_giay')
    .eq('do_hi_em_id', doHiEmId)
    .eq('sao', sao)
    .single();
  
  if (error) throw error;
  
  if (!data || !data.chip_moi_giay || data.chip_moi_giay <= 0) {
    return Infinity; // Không thể đạt được
  }
  
  // Tính số giây cần
  const soGiayCanThiet = soChipCanThiet / data.chip_moi_giay;
  
  // Chuyển sang định dạng giờ:phút:giây
  const gio = Math.floor(soGiayCanThiet / 3600);
  const phut = Math.floor((soGiayCanThiet % 3600) / 60);
  const giay = Math.floor(soGiayCanThiet % 60);
  
  return { gio, phut, giay, tongGiay: soGiayCanThiet };
} 