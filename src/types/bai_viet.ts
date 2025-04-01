export interface BaiViet {
  id: string;
  tieu_de: string;
  noi_dung: string;
  anh_dai_dien: string;
  loai: 'tin_tuc' | 'cong_dong';
  nguoi_dung_id: string;
  ngay_dang: string;
} 