import { supabase } from '@/tien_ich/supabase';
import type { AnhHung, VaiTro, DoHiEm } from '@/loai';

/**
 * Lấy danh sách hero với thông tin liên quan
 */
export const getDanhSachHero = async (): Promise<AnhHung[]> => {
  const { data, error } = await supabase
    .from('anh_hung')
    .select(`
      *,
      vai_tro:vai_tro_id(id, ten),
      do_hi_em:do_hi_em_id(id, ten, mau_sac)
    `)
    .order('ten');

  if (error) {
    console.error('Lỗi khi tải danh sách hero:', error);
    throw error;
  }

  return data || [];
};

/**
 * Lấy danh sách vai trò
 */
export const getDanhSachVaiTro = async (): Promise<VaiTro[]> => {
  const { data, error } = await supabase
    .from('vai_tro')
    .select('*')
    .order('id');

  if (error) {
    console.error('Lỗi khi tải danh sách vai trò:', error);
    throw error;
  }

  return data || [];
};

/**
 * Lấy danh sách độ hiếm
 */
export const getDanhSachDoHiem = async (): Promise<DoHiEm[]> => {
  const { data, error } = await supabase
    .from('do_hi_em')
    .select('*')
    .order('id');

  if (error) {
    console.error('Lỗi khi tải danh sách độ hiếm:', error);
    throw error;
  }

  return data || [];
};

/**
 * Xóa hero theo ID
 */
export const deleteHero = async (heroId: string): Promise<void> => {
  const { error } = await supabase
    .from('anh_hung')
    .delete()
    .eq('id', heroId);

  if (error) {
    console.error('Lỗi khi xóa hero:', error);
    throw error;
  }
};

/**
 * Kiểm tra bucket có tồn tại không
 */
export const checkStorageBucket = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.storage.getBucket('game-assets');
    if (error) {
      console.warn('Bucket "game-assets" không tồn tại hoặc không thể truy cập được:', error.message);
      return false;
    }
    
    console.log('Đã kết nối đến bucket "game-assets":', data);
    return true;
  } catch (err) {
    console.error('Lỗi khi kiểm tra bucket:', err);
    return false;
  }
}; 