import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { TelegramAuthData } from '@/types/telegram';

export async function POST(request: NextRequest) {
  console.log("==== TELEGRAM AUTH STARTED ====");
  
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const telegramData: TelegramAuthData = await request.json();
    console.log("Received Telegram data:", JSON.stringify(telegramData, null, 2));
    
    // Lấy TELEGRAM_BOT_TOKEN từ biến môi trường
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!botToken) {
      console.error("Missing TELEGRAM_BOT_TOKEN");
      return NextResponse.json(
        { success: false, error: 'Telegram bot token không được cấu hình' },
        { status: 500 }
      );
    }
    
    // Xác thực dữ liệu từ Telegram (bỏ qua xác thực trong môi trường phát triển)
    const shouldBypassAuth = process.env.NODE_ENV === 'development' || process.env.BYPASS_TELEGRAM_AUTH === 'true';
    if (!shouldBypassAuth) {
      console.log("Production mode - verifying Telegram data");
      if (!verifyTelegramData(telegramData, botToken)) {
        console.error("Invalid Telegram data");
        return NextResponse.json(
          { success: false, error: 'Dữ liệu Telegram không hợp lệ' },
          { status: 400 }
        );
      }
    } else {
      console.log("BYPASSING TELEGRAM AUTH - No verification performed");
    }
    
    // Kiểm tra nếu bảng telegram_users tồn tại
    try {
      console.log("Ensuring telegram_users table exists");
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
    
    console.log("Checking if user exists with telegram_id:", telegramData.id);
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
    
    const email = `telegram${telegramData.id}@telegram.login`;
    const password = generateSecurePassword(telegramData);
    
    if (existingUser?.user_id) {
      // Người dùng đã tồn tại, đăng nhập
      console.log("User exists, signing in with email:", email);
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          console.error("Sign in error:", error);
          throw error;
        }
        
        console.log("Sign in successful, session:", data.session ? "Created" : "NULL");
        
        if (!data.session) {
          throw new Error("Không thể tạo phiên đăng nhập");
        }
        
        return NextResponse.json({ 
          success: true, 
          session: {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            expires_at: data.session.expires_at
          }
        });
      } catch (error) {
        console.error("Login failed, trying to recreate user:", error);
        
        // Nếu đăng nhập thất bại, thử xóa và tạo lại người dùng
        const { error: deleteError } = await supabase
          .from('telegram_users')
          .delete()
          .eq('telegram_id', telegramData.id);
        
        if (deleteError) {
          console.error("Failed to delete telegram user:", deleteError);
          throw new Error("Lỗi xử lý tài khoản");
        }
        
        // Tiếp tục với việc tạo người dùng mới
        console.log("Proceeding with new user creation");
      }
    }
    
    // Tạo người dùng mới (hoặc tạo lại nếu đăng nhập thất bại)
    console.log("Creating new user with email:", email);
    
    try {
      const { data, error } = await supabase.auth.signUp({
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
      
      if (error) {
        console.error("User creation error:", error);
        
        // Thử đăng nhập một lần nữa trong trường hợp người dùng đã tồn tại
        console.log("Trying to sign in again...");
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (signInError) {
          console.error("Final sign in attempt failed:", signInError);
          throw signInError;
        }
        
        if (!signInData.session) {
          throw new Error("Không thể tạo phiên đăng nhập");
        }
        
        return NextResponse.json({ 
          success: true, 
          session: {
            access_token: signInData.session.access_token,
            refresh_token: signInData.session.refresh_token,
            expires_at: signInData.session.expires_at
          }
        });
      }
      
      if (!data.user?.id) {
        console.error("User created but no ID returned");
        throw new Error("Không thể tạo người dùng");
      }
      
      // Thêm bản ghi vào bảng telegram_users
      console.log("Inserting user into telegram_users table with user_id:", data.user.id);
      const { error: insertError } = await supabase.from('telegram_users').insert({
        user_id: data.user.id,
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
      console.log("Sign in after signup...");
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) {
        console.error("Sign in after signup error:", signInError);
        throw signInError;
      }
      
      if (!signInData.session) {
        throw new Error("Không thể tạo phiên đăng nhập");
      }
      
      console.log("Auth successful, returning session");
      return NextResponse.json({ 
        success: true, 
        session: {
          access_token: signInData.session.access_token,
          refresh_token: signInData.session.refresh_token,
          expires_at: signInData.session.expires_at
        }
      });
    } catch (error) {
      console.error("User creation/login process failed:", error);
      throw error;
    }
  } catch (error) {
    console.error('Lỗi đăng nhập Telegram:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Đăng nhập Telegram thất bại' },
      { status: 500 }
    );
  } finally {
    console.log("==== TELEGRAM AUTH COMPLETED ====");
  }
}

// Kiểm tra tính xác thực của dữ liệu từ Telegram
function verifyTelegramData(data: TelegramAuthData, botToken: string): boolean {
  try {
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
    const isValid = calculatedHash === hash;
    console.log(`Telegram data verification: ${isValid ? 'Valid' : 'Invalid'}`);
    return isValid;
  } catch (error) {
    console.error("Error verifying telegram data:", error);
    return false;
  }
}

// Tạo mật khẩu an toàn từ dữ liệu Telegram
function generateSecurePassword(data: TelegramAuthData): string {
  const secret = process.env.PASSWORD_SECRET || 'telegram_default_secret';
  
  return crypto.createHmac('sha256', secret)
    .update(`${data.id}:${data.auth_date}:${process.env.TELEGRAM_BOT_TOKEN || 'default_token'}`)
    .digest('hex');
} 