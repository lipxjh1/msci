import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Kiểm tra nếu là môi trường development
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ error: 'Chỉ có thể thực hiện trong môi trường development' }, { status: 403 });
    }

    // Lấy mật khẩu admin từ query params
    const searchParams = request.nextUrl.searchParams;
    const adminPassword = searchParams.get('password');

    // Kiểm tra mật khẩu admin (nên đổi thành mật khẩu phức tạp hơn trong thực tế)
    if (adminPassword !== 'setup_password') {
      return NextResponse.json({ error: 'Mật khẩu không hợp lệ' }, { status: 401 });
    }

    // Tạo supabase client
    const supabase = createRouteHandlerClient({ cookies });

    // Tạo bảng telegram_users
    const { error: createTableError } = await supabase.rpc('create_telegram_users_table');

    if (createTableError) {
      console.error('Lỗi khi tạo bảng telegram_users:', createTableError);
      
      // Thử tạo bảng một cách trực tiếp
      await supabase.rpc('execute_sql', {
        sql_query: `
          CREATE TABLE IF NOT EXISTS telegram_users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            telegram_id BIGINT NOT NULL UNIQUE,
            username TEXT,
            first_name TEXT NOT NULL,
            last_name TEXT,
            photo_url TEXT,
            auth_date BIGINT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          
          CREATE INDEX IF NOT EXISTS idx_telegram_users_telegram_id ON telegram_users(telegram_id);
          CREATE INDEX IF NOT EXISTS idx_telegram_users_user_id ON telegram_users(user_id);
        `
      });
    }

    return NextResponse.json({ success: true, message: 'Bảng telegram_users đã được tạo thành công' });
  } catch (error) {
    console.error('Lỗi trong quá trình thiết lập:', error);
    return NextResponse.json({ error: 'Lỗi trong quá trình thiết lập' }, { status: 500 });
  }
} 