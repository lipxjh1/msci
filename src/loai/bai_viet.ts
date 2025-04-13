/* Định nghĩa type cho bảng bai_viet */

// Interface cho bài viết
export interface BaiViet {
  id: string;
  tieu_de: string | null;
  noi_dung: string | null;
  anh_dai_dien: string | null;
  video: string | null;
  video_embed: string | null;
  loai: 'tin_tuc' | 'cong_dong' | null;
  nguoi_dung_id: string | null;
  ngay_dang: string | null;
  
  // Các trường join từ bảng khác
  nguoi_dung?: {
    ten: string;
  };
}

// Interface cho trang tin tức
export interface TinTuc extends BaiViet {
  anh_banner?: string
  video_nhung?: string
}

// Interface cho trang cập nhật
export interface CapNhat extends BaiViet {
  phien_ban: string
  thay_doi: {
    anh_hung: Array<{
      ten: string
      thay_doi: string[]
    }>
    map: Array<{
      ten: string
      thay_doi: string[]
    }>
    he_thong: string[]
  }
}

// Interface cho trang sự kiện
export interface SuKien extends BaiViet {
  thoi_gian_bat_dau: string
  thoi_gian_ket_thuc: string
  dia_diem?: string
  phan_thuong?: string[]
} 