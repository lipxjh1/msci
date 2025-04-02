import { supabase } from '@/tien_ich/supabase';
import type { BaiViet } from '@/loai/bai_viet';

/**
 * Lấy danh sách tin tức với thông tin liên quan
 */
export const getDanhSachTinTuc = async (): Promise<BaiViet[]> => {
  const { data, error } = await supabase
    .from('bai_viet')
    .select(`
      *,
      nguoi_dung:nguoi_dung_id(id, ten, email)
    `)
    // Không lọc theo loại để lấy tất cả các bài viết
    .order('ngay_dang', { ascending: false });

  if (error) {
    console.error('Lỗi khi tải danh sách tin tức:', error);
    throw error;
  }

  return data || [];
};

/**
 * Lấy chi tiết một tin tức theo ID
 */
export const getChiTietTinTuc = async (tinTucId: string): Promise<BaiViet | null> => {
  const { data, error } = await supabase
    .from('bai_viet')
    .select(`
      *,
      nguoi_dung:nguoi_dung_id(id, ten, email)
    `)
    .eq('id', tinTucId)
    // Không lọc theo loại để lấy tất cả các loại bài viết
    .single();

  if (error) {
    console.error('Lỗi khi tải chi tiết tin tức:', error);
    throw error;
  }

  return data;
};

/**
 * Tạo tin tức mới
 */
export const createTinTuc = async (tinTuc: Omit<BaiViet, 'id' | 'nguoi_dung'>): Promise<BaiViet> => {
  // Bổ sung thông tin ngày đăng nếu chưa có
  const tinTucData = {
    ...tinTuc,
    ngay_dang: tinTuc.ngay_dang || new Date().toISOString(),
    // Giữ nguyên loại được truyền vào thay vì ghi đè
    loai: tinTuc.loai || 'tin_tuc'
  };

  const { data, error } = await supabase
    .from('bai_viet')
    .insert(tinTucData)
    .select(`
      *,
      nguoi_dung:nguoi_dung_id(id, ten, email)
    `)
    .single();

  if (error) {
    console.error('Lỗi khi tạo tin tức mới:', error);
    throw error;
  }

  return data;
};

/**
 * Cập nhật tin tức
 */
export const updateTinTuc = async (tinTucId: string, tinTuc: Partial<Omit<BaiViet, 'id' | 'nguoi_dung'>>): Promise<BaiViet> => {
  console.log(`Cập nhật tin tức ID: ${tinTucId}`, tinTuc);
  
  // Lấy dữ liệu hiện tại trước khi cập nhật để đảm bảo không ghi đè các trường quan trọng
  try {
    const { data: existingData, error: fetchError } = await supabase
      .from('bai_viet')
      .select('*')
      .eq('id', tinTucId)
      .single();
      
    if (fetchError) {
      console.error('Lỗi khi lấy dữ liệu tin tức hiện tại:', fetchError);
      // Tiếp tục với dữ liệu được truyền vào nếu không thể lấy dữ liệu hiện tại
    } else {
      console.log('Dữ liệu tin tức hiện tại:', existingData);
      // Giữ nguyên loại nếu không được cập nhật
      if (!tinTuc.loai && existingData.loai) {
        tinTuc.loai = existingData.loai;
      }
      
      // Giữ nguyên ảnh đại diện nếu không được cập nhật
      if (tinTuc.anh_dai_dien === undefined && existingData.anh_dai_dien) {
        tinTuc.anh_dai_dien = existingData.anh_dai_dien;
      }
    }
  } catch (err) {
    console.warn('Lỗi khi kiểm tra dữ liệu hiện tại:', err);
    // Tiếp tục quá trình cập nhật
  }

  const { data, error } = await supabase
    .from('bai_viet')
    .update(tinTuc)
    .eq('id', tinTucId)
    .select(`
      *,
      nguoi_dung:nguoi_dung_id(id, ten, email)
    `)
    .single();

  if (error) {
    console.error('Lỗi khi cập nhật tin tức:', error);
    throw error;
  }
  
  console.log('Kết quả cập nhật tin tức:', data);
  return data;
};

/**
 * Xóa tin tức theo ID
 */
export const deleteTinTuc = async (tinTucId: string): Promise<void> => {
  const { error } = await supabase
    .from('bai_viet')
    .delete()
    .eq('id', tinTucId);

  if (error) {
    console.error('Lỗi khi xóa tin tức:', error);
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