import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/tien_ich/supabase';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { linkName } = data;
    
    if (!linkName) {
      return NextResponse.json(
        { success: false, message: 'Thiếu thông tin tên liên kết' },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || '';
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || '';
    
    // Lấy ID người dùng nếu đã đăng nhập
    let nguoiDungId = null;
    try {
      // Lấy thông tin người dùng từ session
      const { data: userData } = await supabase.auth.getSession();
      if (userData.session) {
        nguoiDungId = userData.session.user.id;
      }
    } catch (authError) {
      console.error('Lỗi khi lấy thông tin người dùng:', authError);
    }

    // Lưu thông tin nhấp vào bảng link_clicks
    const { data: insertData, error: insertError } = await supabase
      .from('link_clicks')
      .insert([
        {
          link_name: linkName,
          user_agent: userAgent,
          referer: referer,
          ip_address: ipAddress,
          nguoi_dung_id: nguoiDungId
        }
      ]);

    if (insertError) {
      console.error('Lỗi khi lưu dữ liệu click:', insertError);
      return NextResponse.json(
        { success: false, message: 'Lỗi khi lưu dữ liệu', error: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Đã lưu thông tin click thành công' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lỗi khi xử lý yêu cầu:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi máy chủ', error: (error as Error).message },
      { status: 500 }
    );
  }
} 