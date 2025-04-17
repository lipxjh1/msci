import { supabase } from '@/tien_ich/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Đang kiểm tra cấu trúc bảng api_usage_logs...');

    // Kiểm tra xem bảng có tồn tại không
    const { error: checkError } = await supabase
      .from('api_usage_logs')
      .select('id')
      .limit(1)
      .single();

    // Nếu bảng không tồn tại, tạo mới
    if (checkError && (
      checkError.message.includes('does not exist') || 
      checkError.message.includes('relation') ||
      checkError.code === '42P01'
    )) {
      console.log('Bảng api_usage_logs không tồn tại. Đang tạo mới...');
      
      const createTableSQL = `
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

        -- Đảm bảo RLS được bật nhưng cho phép tất cả người dùng đọc/ghi
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
      const { error: createError } = await supabase.rpc('run_sql', {
        sql: createTableSQL
      });
      
      if (createError) {
        if (createError.message.includes('function') || createError.message.includes('not exist')) {
          // Nếu không có hàm run_sql, thông báo cho người dùng chạy SQL thủ công
          return NextResponse.json({
            error: 'Không thể tạo bảng tự động. Vui lòng chạy SQL thủ công trong Supabase SQL Editor',
            sql_to_run: createTableSQL
          }, { status: 400 });
        } else {
          return NextResponse.json({
            error: 'Lỗi khi tạo bảng',
            details: createError
          }, { status: 500 });
        }
      }
      
      // Kiểm tra lại bảng sau khi tạo
      const { error: recheckError } = await supabase
        .from('api_usage_logs')
        .select('id')
        .limit(1);
        
      if (recheckError) {
        return NextResponse.json({
          error: 'Bảng có thể đã được tạo nhưng vẫn không thể truy cập',
          details: recheckError
        }, { status: 500 });
      }
      
      return NextResponse.json({
        success: true,
        message: 'Đã tạo bảng api_usage_logs thành công'
      });
    } else if (checkError) {
      // Lỗi khác khi kiểm tra bảng
      return NextResponse.json({
        error: 'Không thể truy cập bảng api_usage_logs',
        details: checkError
      }, { status: 500 });
    }
    
    // Bảng đã tồn tại, kiểm tra policy
    console.log('Bảng api_usage_logs đã tồn tại. Kiểm tra và cập nhật policy...');
    
    // Kiểm tra quyền ghi bằng cách thử insert
    const testData = {
      tokens_used: 1,
      request_type: 'table_check',
      status: 'success',
      cost: 0.000001,
      message_content: 'Test message for table check'
    };
    
    const { error: insertError } = await supabase
      .from('api_usage_logs')
      .insert([testData]);
      
    if (insertError) {
      // Nếu không insert được, có thể là vấn đề về policy
      console.error('Không thể ghi dữ liệu test:', insertError);
      
      if (insertError.message.includes('policy') || insertError.message.includes('permission')) {
        console.log('Đang cập nhật policy...');
        
        const updatePolicySQL = `
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
        
        const { error: policyError } = await supabase.rpc('run_sql', {
          sql: updatePolicySQL
        });
        
        if (policyError) {
          return NextResponse.json({
            error: 'Không thể cập nhật policy tự động',
            details: policyError,
            sql_to_run: updatePolicySQL
          }, { status: 400 });
        }
        
        return NextResponse.json({
          success: true,
          message: 'Đã cập nhật policy cho bảng api_usage_logs'
        });
      }
      
      return NextResponse.json({
        error: 'Bảng tồn tại nhưng không thể ghi dữ liệu',
        details: insertError
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Bảng api_usage_logs tồn tại và hoạt động tốt'
    });
    
  } catch (error) {
    console.error('Lỗi không xác định:', error);
    return NextResponse.json({
      error: 'Lỗi không xác định khi kiểm tra bảng',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 