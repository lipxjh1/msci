import { supabase } from '@/tien_ich/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Đang điều chỉnh múi giờ cho bảng api_usage_logs...');
    
    // SQL để điều chỉnh múi giờ và timestamp trong bảng
    const sqlScript = `
      -- Đặt múi giờ mặc định cho session hiện tại
      SET timezone = 'Asia/Ho_Chi_Minh';
      
      -- Cập nhật timestamp cho bảng hiện tại
      UPDATE api_usage_logs 
      SET timestamp = timezone('Asia/Ho_Chi_Minh', timestamp AT TIME ZONE 'UTC')
      WHERE timestamp IS NOT NULL;
      
      -- Sửa cấu trúc bảng để sử dụng múi giờ Việt Nam cho các bản ghi mới
      -- (Chỉ thực hiện nếu không phải là Supabase Serverless)
      DO $$ 
      BEGIN
        -- Kiểm tra nếu có quyền để thay đổi timezone
        IF EXISTS (
          SELECT 1 FROM pg_roles 
          WHERE rolname = current_user 
          AND rolsuper = true
        ) THEN
          -- Cập nhật múi giờ mặc định cho cột timestamp
          ALTER TABLE api_usage_logs 
          ALTER COLUMN timestamp SET DEFAULT timezone('Asia/Ho_Chi_Minh', now());
        END IF;
      EXCEPTION
        WHEN OTHERS THEN
          -- Log lỗi nếu có
          RAISE NOTICE 'Không thể sửa đổi cấu trúc bảng: %', SQLERRM;
      END $$;
    `;
    
    // Thực thi SQL
    console.log('Đang thực thi SQL để điều chỉnh múi giờ...');
    const { error: sqlError } = await supabase.rpc('run_sql', { sql: sqlScript });
    
    if (sqlError) {
      console.error('Lỗi SQL:', sqlError);
      
      // Nếu không có quyền chạy SQL, trả về hướng dẫn
      if (sqlError.message.includes('permission') || sqlError.message.includes('function')) {
        return NextResponse.json({
          error: 'Không thể thực thi SQL',
          details: sqlError,
          sql_to_run_manually: sqlScript,
          message: 'Vui lòng chạy đoạn SQL sau trong Supabase SQL Editor'
        }, { status: 400 });
      }
      
      return NextResponse.json({
        error: 'Lỗi khi điều chỉnh múi giờ',
        details: sqlError
      }, { status: 500 });
    }
    
    // Trả về thành công
    return NextResponse.json({
      success: true,
      message: 'Đã điều chỉnh múi giờ cho bảng api_usage_logs',
      sql_executed: sqlScript
    });
    
  } catch (error) {
    console.error('Lỗi không xác định:', error);
    return NextResponse.json({
      error: 'Lỗi không xác định khi điều chỉnh múi giờ',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 