import { supabase } from '@/tien_ich/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Đang kiểm tra và sửa bảng api_usage_logs...');

    // SQL để tạo hoặc sửa bảng và policy
    const sqlScript = `
      -- Tạo bảng nếu chưa tồn tại
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

      -- Đảm bảo RLS được bật
      ALTER TABLE api_usage_logs ENABLE ROW LEVEL SECURITY;
      
      -- Xóa policy cũ nếu có
      DROP POLICY IF EXISTS "Enable read access for all users" ON api_usage_logs;
      DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON api_usage_logs;
      DROP POLICY IF EXISTS "Enable insert for all" ON api_usage_logs;
      DROP POLICY IF EXISTS "Enable insert for all users" ON api_usage_logs;
      
      -- Tạo policy mới
      CREATE POLICY "Enable read access for all users" ON api_usage_logs
          FOR SELECT USING (true);
          
      CREATE POLICY "Enable insert for all users" ON api_usage_logs
          FOR INSERT WITH CHECK (true);
          
      -- Cấp quyền
      GRANT SELECT, INSERT ON api_usage_logs TO anon;
      GRANT SELECT, INSERT ON api_usage_logs TO authenticated;
      GRANT USAGE, SELECT ON SEQUENCE api_usage_logs_id_seq TO anon;
      GRANT USAGE, SELECT ON SEQUENCE api_usage_logs_id_seq TO authenticated;
    `;

    // Thực thi SQL
    console.log('Thực thi SQL script để sửa bảng...');
    const { error: sqlError } = await supabase.rpc('run_sql', { sql: sqlScript });

    if (sqlError) {
      console.error('Lỗi khi thực thi SQL:', sqlError);
      
      // Trả về SQL cho người dùng chạy thủ công
      return NextResponse.json({
        error: 'Không thể tự động sửa bảng api_usage_logs',
        details: sqlError,
        sql_to_run_manually: sqlScript,
        message: 'Vui lòng chạy đoạn SQL trên trong Supabase SQL Editor'
      }, { status: 400 });
    }

    // Kiểm tra lại bằng cách thử insert dữ liệu
    console.log('Thử insert dữ liệu test...');
    const testData = {
      tokens_used: 5,
      request_type: 'fix_test',
      status: 'success',
      cost: 0.000005,
      message_content: 'Test after fixing api_usage_logs table'
    };

    const { error: insertError } = await supabase
      .from('api_usage_logs')
      .insert([testData]);

    if (insertError) {
      console.error('Lỗi khi insert dữ liệu test:', insertError);
      return NextResponse.json({
        error: 'Đã sửa bảng nhưng vẫn không thể insert dữ liệu',
        details: insertError,
        sql_executed: sqlScript
      }, { status: 500 });
    }

    // Trả về thành công
    return NextResponse.json({
      success: true,
      message: 'Đã sửa và kiểm tra bảng api_usage_logs thành công',
      sql_executed: sqlScript
    });

  } catch (error) {
    console.error('Lỗi không xác định:', error);
    return NextResponse.json({
      error: 'Lỗi không xác định khi sửa bảng',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 