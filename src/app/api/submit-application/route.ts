import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Khởi tạo Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

export async function POST(req: Request) {
  console.log('API endpoint /api/submit-application called');
  
  try {
    // Log biến môi trường (chỉ dùng trong development)
    if (process.env.NODE_ENV === 'development') {
      console.log('Supabase URL available:', !!supabaseUrl);
      console.log('Supabase Service Key available:', !!supabaseServiceKey);
    }

    // Khởi tạo Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Kiểm tra kết nối Supabase
    const { data: tableInfo, error: tableError } = await supabase
      .from('applications')
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.error('Supabase connection or table error:', tableError);
      
      // Kiểm tra xem lỗi có phải do bảng không tồn tại không
      if (tableError.message.includes('does not exist')) {
        return NextResponse.json(
          { error: 'Bảng applications chưa được tạo trong Supabase. Vui lòng chạy SQL script để tạo bảng.' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: 'Lỗi kết nối đến Supabase', details: tableError },
        { status: 500 }
      );
    }

    // Lấy dữ liệu từ request
    const body = await req.json();
    console.log('Request body:', body);
    
    const { name, email, message, position, cvUrl } = body;

    // Kiểm tra các trường bắt buộc
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }

    // Lưu dữ liệu vào Supabase
    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          name,
          email,
          message,
          position: position || null,
          cv_url: cvUrl || null
        }
      ])
      .select();

    // Kiểm tra nếu có lỗi khi lưu vào Supabase
    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save application to database', details: error },
        { status: 500 }
      );
    }

    console.log('Application submitted successfully:', data);
    
    // Trả về kết quả thành công
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: data
    });
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { error: 'Failed to process application', details: String(error) },
      { status: 500 }
    );
  }
} 