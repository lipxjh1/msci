// Type definitions cho Supabase database
export type Database = {
  public: {
    Tables: {
      // Bảng người dùng (admin)
      nguoi_dung: {
        Row: {
          id: string;
          email: string;
          ten: string;
          vai_tro: 'super_admin' | 'admin_con';
          ngay_tao: string;
        };
        Insert: {
          id?: string;
          email: string;
          ten?: string;
          vai_tro: 'super_admin' | 'admin_con';
          ngay_tao?: string;
        };
        Update: {
          email?: string;
          ten?: string;
          vai_tro?: 'super_admin' | 'admin_con';
        };
      };
      
      // Bảng vai trò (anh hùng)
      vai_tro: {
        Row: {
          id: number;
          ten: string;
          mo_ta: string | null;
        };
        Insert: {
          id?: number;
          ten: string;
          mo_ta?: string | null;
        };
        Update: {
          ten?: string;
          mo_ta?: string | null;
        };
      };
      
      // Bảng độ hiếm
      do_hi_em: {
        Row: {
          id: number;
          ma: string;
          ten: string;
          mau_sac: string | null;
        };
        Insert: {
          id?: number;
          ma: string;
          ten: string;
          mau_sac?: string | null;
        };
        Update: {
          ma?: string;
          ten?: string;
          mau_sac?: string | null;
        };
      };
      
      // Bảng anh hùng
      anh_hung: {
        Row: {
          id: string;
          ten: string;
          vai_tro_id: number | null;
          do_hi_em_id: number | null;
          toc_do_ban: string | null;
          dac_diem: string | null;
          ky_nang: string | null;
          anh_dai_dien: string | null;
        };
        Insert: {
          id?: string;
          ten: string;
          vai_tro_id?: number | null;
          do_hi_em_id?: number | null;
          toc_do_ban?: string | null;
          dac_diem?: string | null;
          ky_nang?: string | null;
          anh_dai_dien?: string | null;
        };
        Update: {
          ten?: string;
          vai_tro_id?: number | null;
          do_hi_em_id?: number | null;
          toc_do_ban?: string | null;
          dac_diem?: string | null;
          ky_nang?: string | null;
          anh_dai_dien?: string | null;
        };
      };
      
      // Bảng chỉ số level
      chi_so_level: {
        Row: {
          do_hi_em_id: number;
          sao: number;
          level: number;
          sat_thuong: number | null;
          chip_nang_cap: number | null;
          chip_phan_ra: number | null;
        };
        Insert: {
          do_hi_em_id: number;
          sao: number;
          level: number;
          sat_thuong?: number | null;
          chip_nang_cap?: number | null;
          chip_phan_ra?: number | null;
        };
        Update: {
          sat_thuong?: number | null;
          chip_nang_cap?: number | null;
          chip_phan_ra?: number | null;
        };
      };
      
      // Bảng nâng sao
      nang_sao: {
        Row: {
          do_hi_em_id: number;
          tu_sao: number;
          so_nhan_vat: number;
          den_sao: number | null;
          tile_thanh_cong: number | null;
          memory_moi_nv: number | null;
        };
        Insert: {
          do_hi_em_id: number;
          tu_sao: number;
          so_nhan_vat: number;
          den_sao?: number | null;
          tile_thanh_cong?: number | null;
          memory_moi_nv?: number | null;
        };
        Update: {
          den_sao?: number | null;
          tile_thanh_cong?: number | null;
          memory_moi_nv?: number | null;
        };
      };
      
      // Bảng thưởng chip
      thuong_chip: {
        Row: {
          do_hi_em_id: number;
          sao: number;
          chip_moi_giay: number | null;
        };
        Insert: {
          do_hi_em_id: number;
          sao: number;
          chip_moi_giay?: number | null;
        };
        Update: {
          chip_moi_giay?: number | null;
        };
      };
      
      // Bảng tiến hóa
      tien_hoa: {
        Row: {
          do_hi_em_goc_id: number;
          do_hi_em_dich_id: number;
          so_nhan_vat: number;
          level_yeu_cau: number | null;
          tile_thanh_cong: number | null;
          memory_moi_nv: number | null;
          sao_sau_khi_tien_hoa: number | null;
        };
        Insert: {
          do_hi_em_goc_id: number;
          do_hi_em_dich_id: number;
          so_nhan_vat: number;
          level_yeu_cau?: number | null;
          tile_thanh_cong?: number | null;
          memory_moi_nv?: number | null;
          sao_sau_khi_tien_hoa?: number | null;
        };
        Update: {
          level_yeu_cau?: number | null;
          tile_thanh_cong?: number | null;
          memory_moi_nv?: number | null;
          sao_sau_khi_tien_hoa?: number | null;
        };
      };
      
      // Bảng đội hình
      doi_hinh: {
        Row: {
          id: string;
          ten: string | null;
          nguoi_dung_id: string | null;
        };
        Insert: {
          id?: string;
          ten?: string | null;
          nguoi_dung_id?: string | null;
        };
        Update: {
          ten?: string | null;
          nguoi_dung_id?: string | null;
        };
      };
      
      // Bảng chi tiết đội hình
      doi_hinh_chi_tiet: {
        Row: {
          doi_hinh_id: string;
          anh_hung_id: string;
          vai_tro_id: number | null;
        };
        Insert: {
          doi_hinh_id: string;
          anh_hung_id: string;
          vai_tro_id?: number | null;
        };
        Update: {
          vai_tro_id?: number | null;
        };
      };
      
      // Bảng bài viết
      bai_viet: {
        Row: {
          id: string;
          tieu_de: string | null;
          noi_dung: string | null;
          anh_dai_dien: string | null;
          loai: 'tin_tuc' | 'cong_dong' | null;
          nguoi_dung_id: string | null;
          ngay_dang: string | null;
        };
        Insert: {
          id?: string;
          tieu_de?: string | null;
          noi_dung?: string | null;
          anh_dai_dien?: string | null;
          loai?: 'tin_tuc' | 'cong_dong' | null;
          nguoi_dung_id?: string | null;
          ngay_dang?: string | null;
        };
        Update: {
          tieu_de?: string | null;
          noi_dung?: string | null;
          anh_dai_dien?: string | null;
          loai?: 'tin_tuc' | 'cong_dong' | null;
          nguoi_dung_id?: string | null;
          ngay_dang?: string | null;
        };
      };
    };
  };
}; 