import { supabase } from '@/tien_ich/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Đang cập nhật policy cho bảng api_usage_logs...');

    // Xóa policy cũ
    const { error: dropError } = await supabase.rpc('drop_policies_on_table', {
      table_name: 'api_usage_logs'
    });

    if (dropError) {
      // Nếu không có hàm RPC drop_policies_on_table, thử xóa thủ công
      console.log('Không tìm thấy hàm RPC, thử xóa policy thủ công...');
      
      // Xóa policy cũ bằng câu lệnh SQL trực tiếp
      const { error: dropManualError } = await supabase.rpc('run_sql', {
        sql: `
          DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON api_usage_logs;
          DROP POLICY IF EXISTS "Enable insert for all" ON api_usage_logs;
        `
      });
      
      if (dropManualError && !dropManualError.message.includes('does not exist')) {
        return NextResponse.json({ 
          error: 'Không thể xóa policy cũ', 
          details: dropManualError.message 
        }, { status: 500 });
      }
    }

    // Tạo policy mới cho phép tất cả người dùng ghi log
    const { error: createPolicyError } = await supabase.rpc('run_sql', {
      sql: `
        CREATE POLICY "Enable insert for all users" ON api_usage_logs
        FOR INSERT WITH CHECK (true);
      `
    });

    if (createPolicyError) {
      return NextResponse.json({ 
        error: 'Không thể tạo policy mới', 
        details: createPolicyError.message 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Đã cập nhật policy cho api_usage_logs thành công. Giờ đây tất cả người dùng đều có thể ghi log.' 
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật policy:', error);
    return NextResponse.json({ 
      error: 'Có lỗi xảy ra khi cập nhật policy', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 