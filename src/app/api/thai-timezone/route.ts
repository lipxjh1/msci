import { supabase } from '@/tien_ich/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Đang thiết lập múi giờ Thái Lan cho bảng api_usage_logs...');
    
    // SQL để điều chỉnh múi giờ Thái Lan
    const sqlScript = `
      -- Đặt múi giờ mặc định cho session hiện tại
      SET timezone = 'Asia/Bangkok';
      
      -- Cập nhật timestamp cho bảng hiện tại
      UPDATE api_usage_logs 
      SET timestamp = timezone('Asia/Bangkok', timestamp AT TIME ZONE 'UTC')
      WHERE timestamp IS NOT NULL;
      
      -- Sửa cấu trúc bảng để sử dụng múi giờ Thái Lan cho các bản ghi mới
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
          ALTER COLUMN timestamp SET DEFAULT timezone('Asia/Bangkok', now());
        END IF;
      EXCEPTION
        WHEN OTHERS THEN
          -- Log lỗi nếu có
          RAISE NOTICE 'Không thể sửa đổi cấu trúc bảng: %', SQLERRM;
      END $$;
      
      -- Thống kê thông tin về timezone
      SELECT current_setting('timezone') as current_timezone;
    `;
    
    // Thực thi SQL
    console.log('Đang thực thi SQL để thiết lập múi giờ Thái Lan...');
    const { error: sqlError } = await supabase.rpc('run_sql', { sql: sqlScript });
    
    if (sqlError) {
      console.error('Lỗi SQL:', sqlError);
      
      // Chạy SQL trực tiếp trong Supabase
      return NextResponse.json({
        error: 'Không thể thực thi SQL qua API',
        sql_to_run_manually: sqlScript,
        message: 'Vui lòng chạy đoạn SQL sau trong Supabase SQL Editor'
      }, { status: 400 });
    }
    
    // Trả về thành công
    return NextResponse.json({
      success: true,
      message: 'Đã thiết lập múi giờ Thái Lan cho bảng api_usage_logs',
      sql_executed: sqlScript
    });
    
  } catch (error) {
    console.error('Lỗi không xác định:', error);
    return NextResponse.json({
      error: 'Lỗi không xác định khi thiết lập múi giờ',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 