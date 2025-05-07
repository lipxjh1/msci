/* Định nghĩa type cho bảng nguoi_dung */

// Interface cho người dùng (admin)
export interface NguoiDung {
  id: string;
  email: string;
  ten: string;
  vai_tro: 'super_admin' | 'admin_con';
  ngay_tao: string;
  da_kich_hoat?: boolean; // trường không bắt buộc, có thể không cần thiết trong tương lai
} 