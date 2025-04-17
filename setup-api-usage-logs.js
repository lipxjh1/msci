// Nhập script này vào Supabase trong SQL Editor để tạo bảng api_usage_logs

const setupSql = `
-- Tạo bảng api_usage_logs nếu chưa tồn tại
CREATE TABLE IF NOT EXISTS api_usage_logs (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    tokens_used INTEGER DEFAULT 0,
    request_type VARCHAR(50),
    status VARCHAR(20),
    error TEXT,
    cost DECIMAL(10,6),
    message_content TEXT
);

-- Tạo index để tối ưu truy vấn
CREATE INDEX IF NOT EXISTS idx_api_usage_logs_timestamp ON api_usage_logs(timestamp);

-- Tạo policy cho bảng api_usage_logs
CREATE POLICY "Enable read access for all users" ON api_usage_logs
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all" ON api_usage_logs
    FOR INSERT WITH CHECK (true);

-- Grant permissions
ALTER TABLE api_usage_logs ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON api_usage_logs TO anon;
GRANT SELECT, INSERT ON api_usage_logs TO authenticated;
GRANT SELECT, INSERT ON api_usage_logs TO anon;
`;

console.log("Copy SQL script và chạy trong Supabase SQL Editor:");
console.log(setupSql); 