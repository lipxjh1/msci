-- Bảng thống kê người dùng truy cập
CREATE TABLE IF NOT EXISTS user_analytics (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  event_type VARCHAR(50) NOT NULL,
  page_path TEXT,
  source TEXT,
  referrer TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  country TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng thống kê xã hội
CREATE TABLE IF NOT EXISTS social_analytics (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  social_network VARCHAR(50) NOT NULL,
  action_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng thống kê phiên đăng nhập
CREATE TABLE IF NOT EXISTS auth_sessions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  login_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  logout_time TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  login_method VARCHAR(50),
  pages_visited INTEGER DEFAULT 0,
  device_type VARCHAR(50),
  browser VARCHAR(50),
  os VARCHAR(50),
  ip_address TEXT,
  country TEXT,
  city TEXT
);

-- Indexes để tối ưu hiệu suất truy vấn
DO $$
BEGIN
  -- Index cho bảng user_analytics
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_analytics_session_id') THEN
    CREATE INDEX idx_user_analytics_session_id ON user_analytics(session_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_analytics_event_type') THEN
    CREATE INDEX idx_user_analytics_event_type ON user_analytics(event_type);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_analytics_created_at') THEN
    CREATE INDEX idx_user_analytics_created_at ON user_analytics(created_at);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_analytics_user_id') THEN
    CREATE INDEX idx_user_analytics_user_id ON user_analytics(user_id);
  END IF;
  
  -- Index cho bảng social_analytics
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_social_analytics_session_id') THEN
    CREATE INDEX idx_social_analytics_session_id ON social_analytics(session_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_social_analytics_social_network') THEN
    CREATE INDEX idx_social_analytics_social_network ON social_analytics(social_network);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_social_analytics_created_at') THEN
    CREATE INDEX idx_social_analytics_created_at ON social_analytics(created_at);
  END IF;
  
  -- Index cho bảng auth_sessions
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_auth_sessions_user_id') THEN
    CREATE INDEX idx_auth_sessions_user_id ON auth_sessions(user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_auth_sessions_login_time') THEN
    CREATE INDEX idx_auth_sessions_login_time ON auth_sessions(login_time);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_auth_sessions_logout_time') THEN
    CREATE INDEX idx_auth_sessions_logout_time ON auth_sessions(logout_time);
  END IF;
END $$;

-- Thêm các cột vào bảng người dùng (nếu chưa có)
DO $$
BEGIN
  -- Thêm cột last_login_at
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'nguoi_dung' AND column_name = 'last_login_at'
  ) THEN
    ALTER TABLE nguoi_dung ADD COLUMN last_login_at TIMESTAMP WITH TIME ZONE;
  END IF;

  -- Thêm cột login_count
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'nguoi_dung' AND column_name = 'login_count'
  ) THEN
    ALTER TABLE nguoi_dung ADD COLUMN login_count INTEGER DEFAULT 0;
  END IF;

  -- Thêm cột average_session_duration
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'nguoi_dung' AND column_name = 'average_session_duration'
  ) THEN
    ALTER TABLE nguoi_dung ADD COLUMN average_session_duration INTEGER DEFAULT 0;
  END IF;

  -- Thêm cột failed_login_attempts
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'nguoi_dung' AND column_name = 'failed_login_attempts'
  ) THEN
    ALTER TABLE nguoi_dung ADD COLUMN failed_login_attempts INTEGER DEFAULT 0;
  END IF;
END $$;

-- RLS Policies cho bảng user_analytics
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;

-- Kiểm tra và tạo policy nếu chưa tồn tại
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_analytics' AND policyname = 'Chỉ admin có thể xem thống kê người dùng'
  ) THEN
    CREATE POLICY "Chỉ admin có thể xem thống kê người dùng" 
      ON user_analytics FOR SELECT 
      USING (auth.uid() IN (SELECT id FROM nguoi_dung WHERE vai_tro IN ('super_admin', 'admin_con')));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_analytics' AND policyname = 'Cho phép thêm thông tin phân tích'
  ) THEN
    CREATE POLICY "Cho phép thêm thông tin phân tích" 
      ON user_analytics FOR INSERT 
      WITH CHECK (true);
  END IF;
END $$;

-- RLS Policies cho bảng social_analytics
ALTER TABLE social_analytics ENABLE ROW LEVEL SECURITY;

-- Kiểm tra và tạo policy nếu chưa tồn tại
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'social_analytics' AND policyname = 'Chỉ admin có thể xem thống kê mạng xã hội'
  ) THEN
    CREATE POLICY "Chỉ admin có thể xem thống kê mạng xã hội" 
      ON social_analytics FOR SELECT 
      USING (auth.uid() IN (SELECT id FROM nguoi_dung WHERE vai_tro IN ('super_admin', 'admin_con')));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'social_analytics' AND policyname = 'Cho phép thêm thống kê mạng xã hội'
  ) THEN
    CREATE POLICY "Cho phép thêm thống kê mạng xã hội" 
      ON social_analytics FOR INSERT 
      WITH CHECK (true);
  END IF;
END $$;

-- RLS Policies cho bảng auth_sessions
ALTER TABLE auth_sessions ENABLE ROW LEVEL SECURITY;

-- Kiểm tra và tạo policy nếu chưa tồn tại
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'auth_sessions' AND policyname = 'Chỉ admin có thể xem thống kê phiên đăng nhập'
  ) THEN
    CREATE POLICY "Chỉ admin có thể xem thống kê phiên đăng nhập" 
      ON auth_sessions FOR SELECT 
      USING (auth.uid() IN (SELECT id FROM nguoi_dung WHERE vai_tro IN ('super_admin', 'admin_con')));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'auth_sessions' AND policyname = 'Người dùng có thể xem phiên đăng nhập của mình'
  ) THEN
    CREATE POLICY "Người dùng có thể xem phiên đăng nhập của mình" 
      ON auth_sessions FOR SELECT 
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'auth_sessions' AND policyname = 'Cho phép thêm phiên đăng nhập'
  ) THEN
    CREATE POLICY "Cho phép thêm phiên đăng nhập" 
      ON auth_sessions FOR INSERT 
      WITH CHECK (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM nguoi_dung WHERE vai_tro IN ('super_admin', 'admin_con')));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'auth_sessions' AND policyname = 'Cho phép cập nhật phiên đăng nhập'
  ) THEN
    CREATE POLICY "Cho phép cập nhật phiên đăng nhập" 
      ON auth_sessions FOR UPDATE 
      USING (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM nguoi_dung WHERE vai_tro IN ('super_admin', 'admin_con')));
  END IF;
END $$;

-- Tạo trigger function để cập nhật thông tin người dùng khi đăng nhập/đăng xuất
CREATE OR REPLACE FUNCTION update_user_login_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Tăng số lần đăng nhập khi có phiên mới
    UPDATE nguoi_dung
    SET login_count = COALESCE(login_count, 0) + 1,
        last_login_at = NEW.login_time
    WHERE id = NEW.user_id;
  ELSIF TG_OP = 'UPDATE' AND NEW.logout_time IS NOT NULL AND OLD.logout_time IS NULL THEN
    -- Cập nhật thời gian trung bình phiên khi đăng xuất
    UPDATE nguoi_dung
    SET average_session_duration = (
      COALESCE(average_session_duration, 0) * COALESCE(login_count, 0) + NEW.duration_seconds
    ) / (COALESCE(login_count, 0) + 1)
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tạo trigger cho bảng auth_sessions
DO $$
BEGIN
  -- Xóa trigger nếu đã tồn tại
  DROP TRIGGER IF EXISTS trigger_update_user_login_stats ON auth_sessions;
  
  -- Tạo trigger mới
  CREATE TRIGGER trigger_update_user_login_stats
  AFTER INSERT OR UPDATE ON auth_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_user_login_stats();
END $$;

-- Hàm thống kê người dùng theo ngày
CREATE OR REPLACE FUNCTION get_daily_users(start_date DATE, end_date DATE)
RETURNS TABLE (
  date DATE,
  total_users BIGINT,
  new_users BIGINT,
  returning_users BIGINT
) AS $$
BEGIN
  RETURN QUERY
  WITH date_range AS (
    SELECT generate_series(start_date, end_date, '1 day'::interval)::date as date
  ),
  daily_stats AS (
    SELECT 
      DATE(created_at) as visit_date,
      COUNT(DISTINCT session_id) as total_users,
      COUNT(DISTINCT CASE WHEN event_type = 'first_visit' THEN session_id END) as new_users
    FROM user_analytics
    WHERE DATE(created_at) BETWEEN start_date AND end_date
    GROUP BY DATE(created_at)
  )
  SELECT
    dr.date,
    COALESCE(ds.total_users, 0) as total_users,
    COALESCE(ds.new_users, 0) as new_users,
    COALESCE(ds.total_users - ds.new_users, 0) as returning_users
  FROM date_range dr
  LEFT JOIN daily_stats ds ON dr.date = ds.visit_date
  ORDER BY dr.date;
END;
$$ LANGUAGE plpgsql;

-- Hàm thống kê hành động người dùng
CREATE OR REPLACE FUNCTION get_user_actions(start_date DATE, end_date DATE)
RETURNS TABLE (
  event_type TEXT,
  count BIGINT,
  percentage NUMERIC
) AS $$
DECLARE
  total BIGINT;
BEGIN
  -- Lấy tổng số actions
  SELECT COUNT(*) INTO total FROM user_analytics 
  WHERE DATE(created_at) BETWEEN start_date AND end_date;
  
  RETURN QUERY
  SELECT 
    ua.event_type,
    COUNT(*) as count,
    ROUND((COUNT(*) * 100.0 / NULLIF(total, 0)), 2) as percentage
  FROM user_analytics ua
  WHERE DATE(ua.created_at) BETWEEN start_date AND end_date
  GROUP BY ua.event_type
  ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql;

-- Hàm thống kê đăng nhập/đăng xuất
CREATE OR REPLACE FUNCTION get_login_stats(start_date DATE, end_date DATE)
RETURNS TABLE (
  date DATE,
  login_count BIGINT,
  unique_users BIGINT,
  avg_session_duration NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH date_range AS (
    SELECT generate_series(start_date, end_date, '1 day'::interval)::date as date
  ),
  login_stats AS (
    SELECT 
      DATE(login_time) as login_date,
      COUNT(*) as total_logins,
      COUNT(DISTINCT user_id) as unique_users,
      AVG(duration_seconds)::NUMERIC as avg_duration
    FROM auth_sessions
    WHERE DATE(login_time) BETWEEN start_date AND end_date
    GROUP BY DATE(login_time)
  )
  SELECT
    dr.date,
    COALESCE(ls.total_logins, 0) as login_count,
    COALESCE(ls.unique_users, 0) as unique_users,
    COALESCE(ROUND(ls.avg_duration, 2), 0) as avg_session_duration
  FROM date_range dr
  LEFT JOIN login_stats ls ON dr.date = ls.login_date
  ORDER BY dr.date;
END;
$$ LANGUAGE plpgsql; 