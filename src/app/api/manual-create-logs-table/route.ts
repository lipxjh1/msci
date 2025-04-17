import { supabase } from '@/tien_ich/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Đang tạo lại hoàn toàn bảng api_usage_logs...');
    
    // SQL để xóa bảng cũ (nếu có) và tạo mới
    const sqlScript = `
      -- Xóa bảng nếu tồn tại
      DROP TABLE IF EXISTS api_usage_logs;
      
      -- Tạo bảng mới
      CREATE TABLE api_usage_logs (
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
      CREATE INDEX idx_api_usage_logs_timestamp ON api_usage_logs(timestamp);

      -- Đảm bảo RLS được bật nhưng có policy cho phép mọi người
      ALTER TABLE api_usage_logs ENABLE ROW LEVEL SECURITY;
      
      -- Tạo policy
      CREATE POLICY "Enable read access for all users" ON api_usage_logs
          FOR SELECT USING (true);
          
      CREATE POLICY "Enable insert for all users" ON api_usage_logs
          FOR INSERT WITH CHECK (true);
          
      -- Cấp quyền
      GRANT SELECT, INSERT ON api_usage_logs TO anon;
      GRANT SELECT, INSERT ON api_usage_logs TO authenticated;
      GRANT USAGE, SELECT ON SEQUENCE api_usage_logs_id_seq TO anon;
      GRANT USAGE, SELECT ON SEQUENCE api_usage_logs_id_seq TO authenticated;
      
      -- Thêm một bản ghi test
      INSERT INTO api_usage_logs (tokens_used, request_type, status, cost, message_content)
      VALUES (1, 'init_test', 'success', 0.000001, 'Init test record');
    `;
    
    // Thực thi SQL
    console.log('Đang thực thi script...');
    const { error: sqlError } = await supabase.rpc('run_sql', { sql: sqlScript });
    
    if (sqlError) {
      console.error('Lỗi SQL:', sqlError);
      if (sqlError.message.includes('function') || sqlError.message.includes('permission')) {
        return NextResponse.json({
          error: 'Không thể thực thi SQL qua API',
          details: sqlError,
          sql_to_run_manually: sqlScript,
          message: 'Copy đoạn SQL dưới đây và chạy trực tiếp trong Supabase SQL Editor'
        }, { status: 400 });
      }
      
      return NextResponse.json({
        error: 'Lỗi khi thực thi SQL',
        details: sqlError
      }, { status: 500 });
    }
    
    // Kiểm tra lại bảng
    console.log('Kiểm tra bảng sau khi tạo...');
    const { data: countData, error: countError } = await supabase
      .from('api_usage_logs')
      .select('*', { count: 'exact', head: true });
      
    if (countError) {
      return NextResponse.json({
        error: 'Đã tạo bảng nhưng không thể truy vấn',
        details: countError
      }, { status: 500 });
    }
    
    // Trả về thành công
    return NextResponse.json({
      success: true,
      message: 'Đã tạo lại hoàn toàn bảng api_usage_logs',
      record_count: countData?.length || 0,
      sql_executed: sqlScript
    });
    
  } catch (error) {
    console.error('Lỗi không xác định:', error);
    return NextResponse.json({
      error: 'Lỗi không xác định khi tạo lại bảng',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 