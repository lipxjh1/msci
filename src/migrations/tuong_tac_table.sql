-- Tạo bảng tuong_tac để lưu các tương tác như Play Now và mạng xã hội
CREATE TABLE IF NOT EXISTS tuong_tac (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  loai VARCHAR(255) NOT NULL, -- 'play_now', 'social_media', 'download', v.v.
  platform VARCHAR(255), -- chỉ áp dụng cho mạng xã hội: 'twitter', 'facebook', v.v.
  url VARCHAR(255), -- URL mà người dùng tương tác
  ref_id VARCHAR(255), -- ID tham chiếu (có thể là ID của người dùng hoặc bài viết)
  nguoi_dung_id UUID, -- ID người dùng (nếu đã đăng nhập)
  ip_address VARCHAR(255), -- địa chỉ IP của người dùng
  user_agent TEXT, -- thông tin trình duyệt và thiết bị
  ngay_tao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  du_lieu JSONB -- dữ liệu tùy chỉnh bổ sung
);

-- Chỉ mục để tăng tốc truy vấn
CREATE INDEX IF NOT EXISTS tuong_tac_loai_idx ON tuong_tac(loai);
CREATE INDEX IF NOT EXISTS tuong_tac_platform_idx ON tuong_tac(platform);
CREATE INDEX IF NOT EXISTS tuong_tac_ngay_tao_idx ON tuong_tac(ngay_tao);
CREATE INDEX IF NOT EXISTS tuong_tac_nguoi_dung_id_idx ON tuong_tac(nguoi_dung_id);

-- Function để lấy thống kê theo loại tương tác
CREATE OR REPLACE FUNCTION get_interaction_stats(
  start_date TEXT,
  end_date TEXT,
  interaction_type TEXT DEFAULT NULL
)
RETURNS TABLE (
  loai TEXT,
  total BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.loai::TEXT,
    COUNT(*)::BIGINT as total
  FROM tuong_tac t
  WHERE 
    t.ngay_tao >= (start_date::TIMESTAMP WITH TIME ZONE)
    AND t.ngay_tao <= (end_date::TIMESTAMP WITH TIME ZONE)
    AND (interaction_type IS NULL OR t.loai = interaction_type)
  GROUP BY t.loai
  ORDER BY total DESC;
END;
$$;

-- Function để lấy thống kê tương tác mạng xã hội
CREATE OR REPLACE FUNCTION get_social_media_stats(
  start_date TEXT,
  end_date TEXT
)
RETURNS TABLE (
  platform TEXT,
  total BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.platform::TEXT,
    COUNT(*)::BIGINT as total
  FROM tuong_tac t
  WHERE 
    t.loai = 'social_media'
    AND t.ngay_tao >= (start_date::TIMESTAMP WITH TIME ZONE)
    AND t.ngay_tao <= (end_date::TIMESTAMP WITH TIME ZONE)
    AND t.platform IS NOT NULL
  GROUP BY t.platform
  ORDER BY total DESC;
END;
$$;

-- Dữ liệu mẫu cho nút Play Now
INSERT INTO tuong_tac (loai, url, ip_address, user_agent, ngay_tao)
VALUES 
  ('play_now', '/game', '192.168.1.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', NOW() - INTERVAL '1 day'),
  ('play_now', '/game', '192.168.1.2', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', NOW() - INTERVAL '2 days'),
  ('play_now', '/game', '192.168.1.3', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', NOW() - INTERVAL '3 days'),
  ('play_now', '/game', '192.168.1.4', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)', NOW() - INTERVAL '4 days'),
  ('play_now', '/game', '192.168.1.5', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', NOW() - INTERVAL '5 days');

-- Dữ liệu mẫu cho mạng xã hội
INSERT INTO tuong_tac (loai, platform, url, ip_address, user_agent, ngay_tao)
VALUES 
  ('social_media', 'twitter', 'https://twitter.com/5msci', '192.168.1.6', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', NOW() - INTERVAL '1 day'),
  ('social_media', 'facebook', 'https://facebook.com/5msci', '192.168.1.7', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', NOW() - INTERVAL '2 days'),
  ('social_media', 'discord', 'https://discord.gg/5msci', '192.168.1.8', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', NOW() - INTERVAL '3 days'),
  ('social_media', 'twitter', 'https://twitter.com/5msci', '192.168.1.9', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)', NOW() - INTERVAL '4 days'),
  ('social_media', 'youtube', 'https://youtube.com/5msci', '192.168.1.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', NOW() - INTERVAL '5 days'),
  ('social_media', 'instagram', 'https://instagram.com/5msci', '192.168.1.11', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', NOW() - INTERVAL '6 days'); 