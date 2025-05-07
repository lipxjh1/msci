-- Bảng lưu lượt truy cập
CREATE TABLE IF NOT EXISTS public.luot_truy_cap (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  nguoi_dung_id UUID REFERENCES public.nguoi_dung(id) ON DELETE SET NULL,
  device TEXT,
  browser TEXT,
  os TEXT,
  is_mobile BOOLEAN DEFAULT FALSE,
  referer TEXT,
  ngay_tao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT
);

-- Bảng lưu hành động người dùng
CREATE TABLE IF NOT EXISTS public.hanh_dong_nguoi_dung (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  element TEXT NOT NULL,
  nguoi_dung_id UUID REFERENCES public.nguoi_dung(id) ON DELETE SET NULL,
  url TEXT NOT NULL,
  ngay_tao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo chỉ mục để tối ưu hóa truy vấn
CREATE INDEX IF NOT EXISTS idx_luot_truy_cap_url ON public.luot_truy_cap(url);
CREATE INDEX IF NOT EXISTS idx_luot_truy_cap_ngay_tao ON public.luot_truy_cap(ngay_tao);
CREATE INDEX IF NOT EXISTS idx_luot_truy_cap_nguoi_dung_id ON public.luot_truy_cap(nguoi_dung_id);
CREATE INDEX IF NOT EXISTS idx_luot_truy_cap_device ON public.luot_truy_cap(device);

CREATE INDEX IF NOT EXISTS idx_hanh_dong_event_type ON public.hanh_dong_nguoi_dung(event_type);
CREATE INDEX IF NOT EXISTS idx_hanh_dong_ngay_tao ON public.hanh_dong_nguoi_dung(ngay_tao);
CREATE INDEX IF NOT EXISTS idx_hanh_dong_nguoi_dung_id ON public.hanh_dong_nguoi_dung(nguoi_dung_id);

-- Hàm RPC để lấy thống kê theo ngày
CREATE OR REPLACE FUNCTION public.get_daily_stats(
  start_date DATE,
  end_date DATE
)
RETURNS TABLE (
  date DATE,
  total_users BIGINT,
  new_users BIGINT,
  returning_users BIGINT
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
    WITH daily AS (
      SELECT 
        DATE(ngay_tao) AS date,
        COUNT(DISTINCT nguoi_dung_id) FILTER (WHERE nguoi_dung_id IS NOT NULL) AS user_count,
        COUNT(*) AS total_visits
      FROM 
        public.luot_truy_cap
      WHERE 
        DATE(ngay_tao) BETWEEN start_date AND end_date
      GROUP BY 
        DATE(ngay_tao)
    ),
    new_users AS (
      SELECT 
        DATE(ngay_tao) AS date,
        COUNT(*) AS count
      FROM 
        public.nguoi_dung
      WHERE 
        DATE(ngay_tao) BETWEEN start_date AND end_date
      GROUP BY 
        DATE(ngay_tao)
    )
    SELECT 
      d.date,
      d.total_visits AS total_users,
      COALESCE(n.count, 0) AS new_users,
      d.user_count - COALESCE(n.count, 0) AS returning_users
    FROM 
      daily d
    LEFT JOIN 
      new_users n ON d.date = n.date
    ORDER BY 
      d.date;
END;
$$;

-- Hàm RPC để lấy thống kê hành động người dùng
CREATE OR REPLACE FUNCTION public.get_user_actions(
  start_date DATE,
  end_date DATE
)
RETURNS TABLE (
  event_type TEXT,
  count BIGINT,
  percentage NUMERIC
)
LANGUAGE plpgsql
AS $$
DECLARE
  total BIGINT;
BEGIN
  -- Tính tổng số hành động
  SELECT COUNT(*) INTO total
  FROM public.hanh_dong_nguoi_dung
  WHERE DATE(ngay_tao) BETWEEN start_date AND end_date;
  
  -- Trả về kết quả
  RETURN QUERY
    SELECT 
      h.event_type,
      COUNT(*) AS count,
      ROUND((COUNT(*) * 100.0 / NULLIF(total, 0)), 2) AS percentage
    FROM 
      public.hanh_dong_nguoi_dung h
    WHERE 
      DATE(ngay_tao) BETWEEN start_date AND end_date
    GROUP BY 
      h.event_type
    ORDER BY 
      count DESC;
END;
$$; 