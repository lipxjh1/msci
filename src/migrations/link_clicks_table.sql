-- Tạo bảng link_clicks để lưu thông tin về lượt nhấp vào liên kết mạng xã hội
CREATE TABLE IF NOT EXISTS link_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  link_name TEXT NOT NULL, -- để xác định liên kết mạng xã hội nào được nhấp vào (twitter, facebook, v.v.)
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT, -- cho phân tích thêm về thiết bị và trình duyệt
  referer TEXT, -- để theo dõi người dùng đến từ trang nào
  nguoi_dung_id UUID, -- ID người dùng nếu đã đăng nhập
  ip_address TEXT -- Địa chỉ IP người dùng
);

-- Tạo các chỉ mục để tăng tốc truy vấn
CREATE INDEX IF NOT EXISTS idx_link_clicks_link_name ON link_clicks(link_name);
CREATE INDEX IF NOT EXISTS idx_link_clicks_timestamp ON link_clicks(timestamp);
CREATE INDEX IF NOT EXISTS idx_link_clicks_nguoi_dung_id ON link_clicks(nguoi_dung_id);

-- Hàm để lấy thống kê số lượt nhấp theo mạng xã hội
CREATE OR REPLACE FUNCTION get_link_click_stats(
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE
)
RETURNS TABLE (
  link_name TEXT,
  click_count BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    lc.link_name,
    COUNT(*)::BIGINT AS click_count
  FROM 
    link_clicks lc
  WHERE 
    lc.timestamp >= start_date
    AND lc.timestamp <= end_date
  GROUP BY 
    lc.link_name
  ORDER BY 
    click_count DESC;
END;
$$;

-- Dữ liệu mẫu
INSERT INTO link_clicks (link_name, timestamp, user_agent, referer)
VALUES 
  ('facebook', NOW() - INTERVAL '1 day', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'https://example.com'),
  ('twitter', NOW() - INTERVAL '2 days', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'https://example.com'),
  ('instagram', NOW() - INTERVAL '3 days', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)', 'https://example.com'),
  ('facebook', NOW() - INTERVAL '4 days', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'https://example.com'),
  ('youtube', NOW() - INTERVAL '5 days', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'https://example.com'),
  ('facebook', NOW() - INTERVAL '1 day', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'https://example.com'),
  ('twitter', NOW() - INTERVAL '2 days', 'Mozilla/5.0 (Android 10; Mobile)', 'https://example.com'); 