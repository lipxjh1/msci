import { NguoiDung } from '@/loai/nguoi_dung';
import {
  layDanhSachAdmin,
  taoAdminCon,
  xoaAdminCon,
  khoiTaoCotDaKichHoat
} from '@/tien_ich/nguoi_dung';

/**
 * Khởi tạo cột da_kich_hoat trong bảng nguoi_dung nếu chưa có
 */
export const initDaKichHoatColumn = async (): Promise<void> => {
  try {
    await khoiTaoCotDaKichHoat();
    console.log('Đã khởi tạo cột da_kich_hoat');
  } catch (err) {
    console.error('Lỗi khi khởi tạo cột da_kich_hoat:', err);
    throw err;
  }
};

/**
 * Lấy danh sách admin
 */
export const getDanhSachAdmin = async (): Promise<NguoiDung[]> => {
  try {
    // Đảm bảo cột da_kich_hoat tồn tại trong bảng
    await initDaKichHoatColumn();
    
    // Lấy danh sách admin
    const admins = await layDanhSachAdmin();
    return admins;
  } catch (err) {
    console.error('Lỗi khi tải danh sách admin:', err);
    throw err;
  }
};

/**
 * Tạo admin con mới
 */
export const createAdminCon = async (
  email: string,
  ten: string,
  password: string
): Promise<void> => {
  try {
    await taoAdminCon(email, ten, password);
  } catch (err) {
    console.error('Lỗi khi tạo admin con:', err);
    throw err;
  }
};

/**
 * Xóa admin con
 */
export const deleteAdminCon = async (adminId: string): Promise<{
  success: boolean;
  message?: string;
  adminData?: {
    vai_tro: string;
    email: string;
    ten: string;
  };
}> => {
  try {
    return await xoaAdminCon(adminId);
  } catch (err) {
    console.error('Lỗi khi xóa admin con:', err);
    throw err;
  }
}; 