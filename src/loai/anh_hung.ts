/* Định nghĩa type cho bảng anh_hung */

// Interface cho thực thể Vai trò
export interface VaiTro {
  id: number;
  ten: string;
  mo_ta: string | null;
}

// Interface cho thực thể Độ hiếm
export interface DoHiEm {
  id: number;
  ma: string;
  ten: string;
  mau_sac: string | null;
}

// Interface cho thực thể Anh hùng
export interface AnhHung {
  id: string;
  ten: string;
  vai_tro_id: number | null;
  do_hi_em_id: number | null;
  toc_do_ban: string | null;
  dac_diem: string | null;
  ky_nang: string | null;
  anh_dai_dien: string | null;
  
  // Các trường join từ bảng khác
  vai_tro?: VaiTro;
  do_hi_em?: DoHiEm;
}

// Interface cho thực thể Chi số level
export interface ChiSoLevel {
  do_hi_em_id: number;
  sao: number;
  level: number;
  sat_thuong: number | null;
  chip_nang_cap: number | null;
  chip_phan_ra: number | null;
}

// Interface cho thực thể Nâng sao
export interface NangSao {
  do_hi_em_id: number;
  tu_sao: number;
  so_nhan_vat: number;
  den_sao: number | null;
  tile_thanh_cong: number | null;
  memory_moi_nv: number | null;
}

// Interface cho thực thể Thưởng chip
export interface ThuongChip {
  do_hi_em_id: number;
  sao: number;
  chip_moi_giay: number | null;
}

// Interface cho thực thể Tiến hóa
export interface TienHoa {
  do_hi_em_goc_id: number;
  do_hi_em_dich_id: number;
  so_nhan_vat: number;
  level_yeu_cau: number | null;
  tile_thanh_cong: number | null;
  memory_moi_nv: number | null;
  sao_sau_khi_tien_hoa: number | null;
}

// Interface cho trang chi tiết anh hùng
export interface ChiTietAnhHung extends AnhHung {
  video_gioi_thieu?: string; // Video giới thiệu nhân vật
  video_ky_nang?: string[]; // Video hiển thị kỹ năng
  map_tot_nhat?: string[]; // Map phù hợp nhất với anh hùng
  anh_hung_tuong_dong?: string[]; // Anh hùng có gameplay tương đồng
  meo_choi?: string[]; // Mẹo khi chơi
} 