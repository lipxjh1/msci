import { supabase } from '@/tien_ich/supabase';
import { NextResponse } from 'next/server';

// Endpoint kiểm tra có thể ghi log vào api_usage_logs hay không
export async function GET() {
  console.log('Đang kiểm tra khả năng ghi log vào bảng api_usage_logs...');
  
  try {
    // 1. Kiểm tra bảng tồn tại
    console.log('Bước 1: Kiểm tra bảng tồn tại...');
    const { count, error: checkError } = await supabase
      .from('api_usage_logs')
      .select('*', { count: 'exact', head: true });
    
    if (checkError) {
      console.error('Lỗi khi kiểm tra bảng:', checkError);
      return NextResponse.json({ 
        error: 'Không thể truy cập bảng api_usage_logs', 
        details: checkError
      }, { status: 500 });
    }
    
    console.log(`Bảng api_usage_logs tồn tại và có ${count || 0} bản ghi`);
    
    // 2. Kiểm tra quyền đọc/ghi
    console.log('Bước 2: Kiểm tra quyền ghi...');
    const testData = {
      tokens_used: 10,
      request_type: 'test',
      status: 'success',
      cost: 0.00001,
      message_content: 'Test message for API logging'
    };
    
    console.log('Dữ liệu test:', testData);
    const { data: insertData, error: insertError } = await supabase
      .from('api_usage_logs')
      .insert([testData])
      .select();
    
    if (insertError) {
      console.error('Lỗi khi thêm dữ liệu test:', insertError);
      
      // Phân tích lỗi chi tiết
      return NextResponse.json({ 
        error: 'Không thể thêm dữ liệu vào bảng api_usage_logs', 
        details: {
          message: insertError.message,
          code: insertError.code,
          hint: insertError.hint,
          details: insertError.details
        },
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Configured' : 'Missing',
        supabaseAnon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Configured' : 'Missing'
      }, { status: 500 });
    }
    
    // 3. Trả về thông tin thành công
    return NextResponse.json({
      success: true,
      message: 'Đã thêm dữ liệu test vào bảng api_usage_logs thành công',
      data: insertData,
      count: count
    });
    
  } catch (error) {
    console.error('Lỗi không xác định:', error);
    return NextResponse.json({ 
      error: 'Lỗi không xác định khi kiểm tra', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 