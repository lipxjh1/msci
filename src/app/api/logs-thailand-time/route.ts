import { supabase } from '@/tien_ich/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Đang truy vấn dữ liệu với múi giờ Thái Lan...');
    
    // SQL để lấy dữ liệu với cả múi giờ UTC và Thái Lan
    const sqlScript = `
      -- Đặt múi giờ mặc định cho session hiện tại
      SET timezone = 'Asia/Bangkok';
      
      -- Truy vấn với cả UTC và múi giờ Thái Lan để so sánh
      SELECT 
        id,
        tokens_used,
        request_type,
        status,
        cost,
        LEFT(message_content, 50) as message_preview,
        timestamp as timestamp_original,
        timestamp AT TIME ZONE 'UTC' as timestamp_utc,
        timestamp AT TIME ZONE 'Asia/Bangkok' as timestamp_bangkok
      FROM 
        api_usage_logs
      ORDER BY 
        timestamp DESC
      LIMIT 20;
    `;
    
    // Thực thi SQL
    console.log('Đang thực thi truy vấn...');
    const { data, error: sqlError } = await supabase.rpc('run_sql', { sql: sqlScript });
    
    if (sqlError) {
      console.error('Lỗi SQL:', sqlError);
      
      // Truy vấn thông thường nếu run_sql không khả dụng
      console.log('Sử dụng phương thức truy vấn thay thế...');
      
      const { data: regularData, error: regularError } = await supabase
        .from('api_usage_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(20);
        
      if (regularError) {
        return NextResponse.json({
          error: 'Không thể truy vấn dữ liệu',
          details: regularError
        }, { status: 500 });
      }
      
      // Duyệt qua kết quả và thêm các trường thời gian
      const processedData = regularData.map(record => {
        const originalDate = new Date(record.timestamp);
        
        // Chuyển đổi sang múi giờ Thái Lan (UTC+7)
        const bangkokOffset = 7 * 60 * 60 * 1000; // 7 giờ tính bằng mili giây
        const bangkokDate = new Date(originalDate.getTime() + bangkokOffset);
        
        return {
          ...record,
          message_preview: record.message_content?.substring(0, 50) || '',
          timestamp_original: record.timestamp,
          timestamp_utc: originalDate.toISOString(),
          timestamp_bangkok: bangkokDate.toISOString()
        };
      });
      
      return NextResponse.json({
        success: true,
        data: processedData,
        timezone_info: {
          note: 'Sử dụng phương thức truy vấn thay thế với JavaScript để chuyển đổi múi giờ',
          current_date_utc: new Date().toISOString(),
          current_date_bangkok: new Date(Date.now() + (7 * 60 * 60 * 1000)).toISOString()
        }
      });
    }
    
    // Trả về kết quả thành công
    return NextResponse.json({
      success: true,
      data: data,
      timezone_info: {
        current_timezone: 'Asia/Bangkok',
        note: 'Các timestamps được hiển thị trong cả UTC và múi giờ Bangkok (UTC+7)'
      }
    });
    
  } catch (error) {
    console.error('Lỗi không xác định:', error);
    return NextResponse.json({
      error: 'Lỗi không xác định khi truy vấn dữ liệu',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 