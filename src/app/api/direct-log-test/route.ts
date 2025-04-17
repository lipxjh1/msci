import { supabase } from '@/tien_ich/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const startTime = Date.now();
    const steps = [];
    
    steps.push({ step: 'Khởi động', time: `${Date.now() - startTime}ms`, message: 'Bắt đầu kiểm tra' });
    
    // Kiểm tra URL và API key Supabase
    steps.push({ 
      step: 'Kiểm tra cấu hình', 
      time: `${Date.now() - startTime}ms`,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Đã cấu hình' : 'Thiếu',
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Đã cấu hình' : 'Thiếu'
    });

    // Kiểm tra kết nối Supabase
    try {
      steps.push({ step: 'Kiểm tra kết nối', time: `${Date.now() - startTime}ms` });
      const { error: healthError } = await supabase.rpc('_health');
      steps.push({ 
        step: 'Kết quả kết nối', 
        time: `${Date.now() - startTime}ms`,
        status: healthError ? 'Lỗi' : 'OK',
        errorDetail: healthError ? healthError.message : null
      });
    } catch (connError) {
      steps.push({ 
        step: 'Lỗi kết nối', 
        time: `${Date.now() - startTime}ms`,
        error: connError instanceof Error ? connError.message : 'Lỗi không xác định'
      });
    }

    // Kiểm tra bảng api_usage_logs
    try {
      steps.push({ step: 'Kiểm tra bảng', time: `${Date.now() - startTime}ms` });
      
      const { data: tableInfo, error: tableError } = await supabase
        .from('api_usage_logs')
        .select('count(*)')
        .limit(1);
      
      steps.push({ 
        step: 'Truy cập bảng', 
        time: `${Date.now() - startTime}ms`,
        status: tableError ? 'Lỗi' : 'OK',
        errorDetail: tableError ? tableError.message : null,
        data: tableInfo || null
      });
    } catch (tableError) {
      steps.push({ 
        step: 'Lỗi truy cập bảng', 
        time: `${Date.now() - startTime}ms`,
        error: tableError instanceof Error ? tableError.message : 'Lỗi không xác định'
      });
    }

    // Thử ghi log
    steps.push({ step: 'Thử ghi log', time: `${Date.now() - startTime}ms` });
    
    // Tạo dữ liệu test chi tiết
    const testLog = {
      tokens_used: 10,
      request_type: 'direct_test',
      status: 'success',
      cost: 0.00001,
      message_content: `Direct log test at ${new Date().toISOString()}`
    };
    
    steps.push({ 
      step: 'Dữ liệu ghi log', 
      time: `${Date.now() - startTime}ms`,
      data: testLog
    });
    
    // Thực hiện ghi log
    try {
      const { data: insertData, error: insertError } = await supabase
        .from('api_usage_logs')
        .insert([testLog])
        .select();
      
      steps.push({ 
        step: 'Kết quả ghi log', 
        time: `${Date.now() - startTime}ms`,
        status: insertError ? 'Lỗi' : 'Thành công',
        errorDetail: insertError ? insertError.message : null,
        data: insertData || null
      });
      
      if (insertError) {
        // Chi tiết lỗi
        steps.push({ 
          step: 'Chi tiết lỗi ghi log', 
          time: `${Date.now() - startTime}ms`,
          code: insertError.code,
          hint: insertError.hint,
          details: insertError.details
        });
      }
    } catch (logError) {
      steps.push({ 
        step: 'Exception khi ghi log', 
        time: `${Date.now() - startTime}ms`,
        error: logError instanceof Error ? logError.message : 'Lỗi không xác định',
        stack: logError instanceof Error ? logError.stack : null
      });
    }
    
    // Hoàn thành
    steps.push({ 
      step: 'Hoàn thành', 
      time: `${Date.now() - startTime}ms`,
      message: 'Kết thúc kiểm tra'
    });
    
    // Trả về kết quả chi tiết
    return NextResponse.json({
      success: true,
      steps: steps,
      totalTime: `${Date.now() - startTime}ms`,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Lỗi tổng quát:', error);
    return NextResponse.json({
      error: 'Lỗi không xác định khi thực hiện kiểm tra trực tiếp',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 