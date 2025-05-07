-- Hàm RPC để lấy top trang phổ biến
CREATE OR REPLACE FUNCTION public.get_top_pages(
  start_date DATE,
  end_date DATE,
  limit_count INTEGER DEFAULT 5
)
RETURNS TABLE (
  url TEXT,
  count BIGINT
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
    SELECT 
      l.url,
      COUNT(*) AS count
    FROM 
      public.luot_truy_cap l
    WHERE 
      DATE(l.ngay_tao) BETWEEN start_date AND end_date
    GROUP BY 
      l.url
    ORDER BY 
      count DESC
    LIMIT limit_count;
END;
$$;

-- Hàm RPC để lấy thống kê thiết bị
CREATE OR REPLACE FUNCTION public.get_device_stats(
  start_date DATE,
  end_date DATE
)
RETURNS TABLE (
  device TEXT,
  count BIGINT
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
    SELECT 
      COALESCE(l.device, 'Không xác định') AS device,
      COUNT(*) AS count
    FROM 
      public.luot_truy_cap l
    WHERE 
      DATE(l.ngay_tao) BETWEEN start_date AND end_date
    GROUP BY 
      l.device
    ORDER BY 
      count DESC;
END;
$$; 