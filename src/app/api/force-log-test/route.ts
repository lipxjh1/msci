import { supabase } from '@/tien_ich/supabase';
import { NextResponse } from 'next/server';

/**
 * Hàm ghi log API usage - sao chép từ route.ts và điều chỉnh để debug
 */
async function logApiUsage({
  tokens_used,
  request_type, 
  status,
  error = null,
  message_content = ''
}: {
  tokens_used: number;
  request_type: string;
  status: string;
  error?: string | null;
  message_content?: string;
}) {
  const logs = [];
  
  try {
    logs.push('Bắt đầu ghi log');
    
    // Tính toán chi phí dựa trên số token
    const cost = tokens_used * 0.000001;
    logs.push('Đã tính toán chi phí');
    
    logs.push(`Dữ liệu log: tokens=${tokens_used}, type=${request_type}, status=${status}, cost=${cost}`);
    
    // Thực hiện insert
    logs.push('Đang thực hiện insert...');
    const insertData = {
      tokens_used,
      request_type,
      status,
      error,
      cost,
      message_content: message_content.substring(0, 500) // Giới hạn độ dài
    };
    
    logs.push(`Insert data: ${JSON.stringify(insertData)}`);
    
    const { data, error: logError } = await supabase
      .from('api_usage_logs')
      .insert([insertData])
      .select();
    
    if (logError) {
      logs.push(`LỖI: ${logError.message}`);
      logs.push(`Mã lỗi: ${logError.code}`);
      if (logError.hint) logs.push(`Gợi ý: ${logError.hint}`);
      if (logError.details) logs.push(`Chi tiết: ${logError.details}`);
    } else {
      logs.push('Ghi log thành công!');
      if (data) logs.push(`Dữ liệu trả về: ${JSON.stringify(data)}`);
    }
    
    return { success: !logError, logs, error: logError, data };
  } catch (error) {
    logs.push(`EXCEPTION: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`);
    if (error instanceof Error && error.stack) {
      logs.push(`Stack trace: ${error.stack}`);
    }
    return { success: false, logs, error };
  }
}

export async function GET() {
  try {
    // Chuẩn bị dữ liệu test
    const testData = {
      tokens_used: 15,
      request_type: 'force_test',
      status: 'success',
      message_content: `Force log test at ${new Date().toISOString()}`
    };
    
    // Gọi hàm logApiUsage và ghi lại toàn bộ quá trình
    console.log('Thực hiện force log test...');
    const logResult = await logApiUsage(testData);
    
    // Kiểm tra kết quả
    return NextResponse.json({
      success: logResult.success,
      test_data: testData,
      log_details: logResult.logs,
      error: logResult.error,
      data: logResult.data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Lỗi không xác định:', error);
    return NextResponse.json({
      error: 'Lỗi không xác định khi test force log',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 