import { supabase } from '@/tien_ich/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Đang thiết lập bảng api_usage_logs...');
    
    // SQL để tạo bảng api_usage_logs
    const sqlScript = `
      -- Tạo bảng api_usage_logs nếu chưa tồn tại
      CREATE TABLE IF NOT EXISTS api_usage_logs (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMPTZ DEFAULT NOW(),
        tokens_used INTEGER NOT NULL DEFAULT 0,
        request_type VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL,
        error TEXT,
        cost DECIMAL(12, 8) NOT NULL DEFAULT 0,
        message_content TEXT,
        provider VARCHAR(50) DEFAULT 'unknown'
      );

      -- Tạo index
      CREATE INDEX IF NOT EXISTS idx_api_usage_logs_timestamp ON api_usage_logs(timestamp);
      CREATE INDEX IF NOT EXISTS idx_api_usage_logs_status ON api_usage_logs(status);
      CREATE INDEX IF NOT EXISTS idx_api_usage_logs_provider ON api_usage_logs(provider);
      
      -- Thêm trường provider nếu chưa tồn tại
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'api_usage_logs' AND column_name = 'provider'
        ) THEN
          ALTER TABLE api_usage_logs ADD COLUMN provider VARCHAR(50) DEFAULT 'unknown';
        END IF;
      END
      $$;
        
      -- Đảm bảo RLS được bật
      ALTER TABLE api_usage_logs ENABLE ROW LEVEL SECURITY;
      
      -- Tạo policy (chỉ admin có thể truy cập đọc, nhưng tất cả role đều có thể ghi)
      DROP POLICY IF EXISTS "Enable admin read access for api_usage_logs" ON api_usage_logs;
      DROP POLICY IF EXISTS "Enable insert for all for api_usage_logs" ON api_usage_logs;
      
      CREATE POLICY "Enable admin read access for api_usage_logs" ON api_usage_logs
          FOR SELECT
          USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
          
      CREATE POLICY "Enable insert for all for api_usage_logs" ON api_usage_logs
          FOR INSERT
          WITH CHECK (true);
    `;
    
    // Thực thi SQL
    console.log('Đang thực thi SQL...');
    const { error: sqlError } = await supabase.rpc('run_sql', { sql: sqlScript });
    
    if (sqlError) {
      console.error('Lỗi SQL:', sqlError);
      
      // Nếu không có quyền chạy SQL, trả về hướng dẫn
      if (sqlError.message.includes('permission') || sqlError.message.includes('function')) {
        return NextResponse.json({
          error: 'Không thể thực thi SQL qua API',
          details: sqlError,
          sql_to_run_manually: sqlScript,
          message: 'Vui lòng chạy đoạn SQL sau trong Supabase SQL Editor'
        }, { status: 400 });
      }
      
      return NextResponse.json({
        error: 'Lỗi khi thực thi SQL',
        details: sqlError
      }, { status: 500 });
    }
    
    // Kiểm tra kết quả
    console.log('Kiểm tra bảng sau khi tạo...');
    const { data: logsData, error: logsError } = await supabase
      .from('api_usage_logs')
      .select('id')
      .limit(1);
      
    if (logsError) {
      return NextResponse.json({
        error: 'Đã tạo bảng nhưng không thể truy vấn',
        details: logsError
      }, { status: 500 });
    }
    
    // Trả về thành công
    return NextResponse.json({
      success: true,
      message: 'Đã thiết lập thành công bảng api_usage_logs',
      logsRecords: logsData?.length || 0,
      sql_executed: sqlScript
    });
    
  } catch (error) {
    console.error('Lỗi không xác định:', error);
    return NextResponse.json({
      error: 'Lỗi không xác định khi thiết lập bảng',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 