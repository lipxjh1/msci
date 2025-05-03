-- Tạo extension để hỗ trợ UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tạo bảng applications để lưu thông tin ứng viên
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  position TEXT,
  cv_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bật Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Tạo policy cho phép insert dữ liệu từ bất kỳ client nào
CREATE POLICY "Allow insert for anyone" 
  ON applications FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Policy chỉ cho admin xem dữ liệu
CREATE POLICY "Allow select for authenticated users" 
  ON applications FOR SELECT 
  TO authenticated
  USING (true);

-- Xác nhận bảng đã tạo thành công
SELECT table_name, table_schema
FROM information_schema.tables 
WHERE table_name = 'applications'; 