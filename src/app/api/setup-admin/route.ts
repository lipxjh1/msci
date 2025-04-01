import { NextResponse } from 'next/server';
import { supabase } from '@/tien_ich/supabase';

// Route này chỉ nên chạy một lần để thiết lập tài khoản super admin
// Sau đó nên xóa hoặc vô hiệu hóa
export async function GET() {
  try {
    // Tạo tài khoản super admin trong Auth
    const { data: userData, error: createError } = await supabase.auth.signUp({
      email: 'super@msci.com',
      password: 'Admin@123', // Mật khẩu mặc định, nên thay đổi sau
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin`,
      }
    });
    
    if (createError) {
      if (createError.message.includes('User already registered')) {
        return NextResponse.json(
          { message: 'Tài khoản super admin đã tồn tại. Hãy thử đăng nhập.' },
          { status: 200 }
        );
      }
      return NextResponse.json({ error: createError.message }, { status: 500 });
    }
    
    if (!userData.user) {
      return NextResponse.json({ error: 'Không thể tạo tài khoản' }, { status: 500 });
    }
    
    // Cập nhật bảng nguoi_dung với ID từ Auth
    const { data: existingRecord, error: recordError } = await supabase
      .from('nguoi_dung')
      .select('*')
      .eq('email', 'super@msci.com')
      .single();
      
    if (!recordError && existingRecord) {
      // Cập nhật ID nếu record đã tồn tại
      const { error: updateError } = await supabase
        .from('nguoi_dung')
        .update({ id: userData.user.id })
        .eq('email', 'super@msci.com');
        
      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }
    } else {
      // Tạo record mới nếu chưa tồn tại
      const { error: insertError } = await supabase
        .from('nguoi_dung')
        .insert({
          id: userData.user.id,
          email: 'super@msci.com',
          ten: 'Super Admin',
          vai_tro: 'super_admin',
          ngay_tao: new Date().toISOString()
        });
        
      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    }
    
    return NextResponse.json(
      { 
        message: 'Đã thiết lập tài khoản super admin thành công',
        email: 'super@msci.com',
        password: 'Admin@123',
        id: userData.user.id,
        note: 'Vui lòng đăng nhập với tài khoản này tại trang admin/login'
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Lỗi không xác định' },
      { status: 500 }
    );
  }
} 