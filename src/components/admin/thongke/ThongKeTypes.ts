// Types cho thống kê
export interface ThongKe {
  tong_nguoi_dung: number;
  nguoi_dung_moi: number;
  tong_luot_truy_cap: number;
  trang_pho_bien: { url: string; count: number }[];
  thiet_bi: { device: string; count: number }[];
  nut_play_now: number;
  luot_click_mxh: {
    twitter: number;
    facebook: number;
    discord: number;
    telegram: number;
    youtube: number;
    instagram: number;
  };
  trang_mxh_truy_cap: { platform: string; count: number }[];
  bang_xep_hang_trang: { url: string; count: number }[];
  thong_ke_theo_ngay: { ngay: string; luot_truy_cap: number; luot_play_now: number; luot_mxh: number }[];
}

export interface TopPagesResult {
  url: string;
  count: number;
}

export interface DeviceStatsResult {
  device: string;
  count: number;
}

export interface LuotTruyCapRecord {
  url?: string;
  device?: string;
  ngay_tao?: string;
  [key: string]: any;
}

export interface LinkClickData {
  link_name: string;
  click_count: number;
}

export interface TimeRangeOption {
  value: '24h' | '7d' | '30d';
  label: string;
}

export interface SocialMediaStats {
  platform: string;
  count: number;
  percentage: number;
  color: string;
} 