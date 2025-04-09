import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { TelegramAuthData } from '@/types/telegram';

export async function POST(request: NextRequest) {
  try {
    const telegramData: TelegramAuthData = await request.json();
    console.log("Received Telegram data:", JSON.stringify(telegramData));
    
    // Lấy TELEGRAM_BOT_TOKEN từ biến môi trường
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!botToken) {
      console.error("Missing TELEGRAM_BOT_TOKEN");
      return NextResponse.json(
        { error: 'Telegram bot token không được cấu hình' },
        { status: 500 }
      );
    }
    
    // Xác thực dữ liệu từ Telegram (bỏ qua xác thực trong môi trường phát triển)
    if (process.env.NODE_ENV !== 'development') {
      if (!verifyTelegramData(telegramData, botToken)) {
        console.error("Invalid Telegram data");
        return NextResponse.json(
          { error: 'Dữ liệu Telegram không hợp lệ' },
          { status: 400 }
        );
      }
    }
    
    // Tạo supabase client
    const supabase = createRouteHandlerClient({ cookies });
    
    // Kiểm tra nếu bảng telegram_users tồn tại
    try {
      // Thử tạo bảng nếu chưa tồn tại
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
    } catch (error) {
      console.error("Error creating table:", error);
      // Tiếp tục xử lý, vì bảng có thể đã tồn tại
    }
    
    // Kiểm tra nếu người dùng đã tồn tại
    const { data: existingUser, error: queryError } = await supabase
      .from('telegram_users')
      .select('user_id')
      .eq('telegram_id', telegramData.id)
      .maybeSingle();
    
    if (queryError) {
      console.error("Error querying user:", queryError);
    }
    
    console.log("Existing user check result:", existingUser);
    
    if (existingUser?.user_id) {
      // Người dùng đã tồn tại, đăng nhập
      console.log("User exists, signing in");
      
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: `telegram${telegramData.id}@telegram.login`,
        password: generateSecurePassword(telegramData),
      });
      
      if (authError) {
        console.error("Auth error:", authError);
        throw authError;
      }
      
      return NextResponse.json({ success: true, session: authData.session });
    } else {
      // Tạo người dùng mới
      console.log("Creating new user");
      
      const email = `telegram${telegramData.id}@telegram.login`;
      const password = generateSecurePassword(telegramData);
      
      const { data: userData, error: userError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            telegram_id: telegramData.id,
            first_name: telegramData.first_name,
            last_name: telegramData.last_name || '',
            username: telegramData.username || '',
            photo_url: telegramData.photo_url || '',
            auth_type: 'telegram',
          },
        },
      });
      
      if (userError) {
        console.error("User creation error:", userError);
        throw userError;
      }
      
      if (!userData.user?.id) {
        console.error("User created but no ID returned");
        throw new Error("Không thể tạo người dùng");
      }
      
      // Thêm bản ghi vào bảng telegram_users
      const { error: insertError } = await supabase.from('telegram_users').insert({
        user_id: userData.user.id,
        telegram_id: telegramData.id,
        username: telegramData.username || '',
        first_name: telegramData.first_name,
        last_name: telegramData.last_name || '',
        photo_url: telegramData.photo_url || '',
        auth_date: telegramData.auth_date,
      });
      
      if (insertError) {
        console.error("Insert error:", insertError);
        // Vẫn tiếp tục với session vì người dùng đã được tạo
      }
      
      // Đăng nhập ngay sau khi đăng ký thành công
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) {
        console.error("Sign in after signup error:", signInError);
        throw signInError;
      }
      
      return NextResponse.json({ success: true, session: signInData.session });
    }
  } catch (error) {
    console.error('Lỗi đăng nhập Telegram:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Đăng nhập Telegram thất bại' },
      { status: 500 }
    );
  }
}

// Kiểm tra tính xác thực của dữ liệu từ Telegram
function verifyTelegramData(data: TelegramAuthData, botToken: string): boolean {
  // Clone và xóa hash từ dữ liệu để tạo data check string
  const { hash, ...dataWithoutHash } = data;
  
  // Sắp xếp các trường theo thứ tự chữ cái
  const dataCheckString = Object.keys(dataWithoutHash)
    .sort()
    .map(key => `${key}=${dataWithoutHash[key as keyof typeof dataWithoutHash]}`)
    .join('\n');
  
  // Tạo secret hash key từ bot token
  const secretKey = crypto.createHash('sha256')
    .update(botToken)
    .digest();
  
  // Tạo hash từ dữ liệu
  const calculatedHash = crypto.createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');
  
  // So sánh hash từ request với hash tính toán
  return calculatedHash === hash;
}

// Tạo mật khẩu an toàn từ dữ liệu Telegram
function generateSecurePassword(data: TelegramAuthData): string {
  const secret = process.env.PASSWORD_SECRET || 'telegram_default_secret';
  
  return crypto.createHmac('sha256', secret)
    .update(`${data.id}:${data.auth_date}:${process.env.TELEGRAM_BOT_TOKEN || 'default_token'}`)
    .digest('hex');
} 