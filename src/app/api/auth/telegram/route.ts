import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { TelegramAuthData } from '@/types/telegram';

export async function POST(request: NextRequest) {
  try {
    const telegramData: TelegramAuthData = await request.json();
    
    // Lấy TELEGRAM_BOT_TOKEN từ biến môi trường
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!botToken) {
      return NextResponse.json(
        { error: 'Telegram bot token không được cấu hình' },
        { status: 500 }
      );
    }
    
    // Xác thực dữ liệu từ Telegram
    if (!verifyTelegramData(telegramData, botToken)) {
      return NextResponse.json(
        { error: 'Dữ liệu Telegram không hợp lệ' },
        { status: 400 }
      );
    }
    
    // Tạo supabase client
    const supabase = createRouteHandlerClient({ cookies });
    
    // Kiểm tra nếu người dùng đã tồn tại
    const { data: existingUser } = await supabase
      .from('telegram_users')
      .select('user_id')
      .eq('telegram_id', telegramData.id)
      .single();
    
    if (existingUser) {
      // Người dùng đã tồn tại, đăng nhập
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: `telegram${telegramData.id}@telegram.login`,
        password: generateSecurePassword(telegramData),
      });
      
      if (authError) {
        throw authError;
      }
      
      return NextResponse.json({ success: true, session: authData.session });
    } else {
      // Tạo người dùng mới
      const { data: userData, error: userError } = await supabase.auth.signUp({
        email: `telegram${telegramData.id}@telegram.login`,
        password: generateSecurePassword(telegramData),
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
        throw userError;
      }
      
      // Thêm bản ghi vào bảng telegram_users
      await supabase.from('telegram_users').insert({
        user_id: userData.user?.id,
        telegram_id: telegramData.id,
        username: telegramData.username || '',
        first_name: telegramData.first_name,
        last_name: telegramData.last_name || '',
        photo_url: telegramData.photo_url || '',
        auth_date: telegramData.auth_date,
      });
      
      return NextResponse.json({ success: true, session: userData.session });
    }
  } catch (error) {
    console.error('Lỗi đăng nhập Telegram:', error);
    return NextResponse.json(
      { error: 'Đăng nhập Telegram thất bại' },
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
    .update(`${data.id}:${data.auth_date}:${process.env.TELEGRAM_BOT_TOKEN}`)
    .digest('hex');
} 