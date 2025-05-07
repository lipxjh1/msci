import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log("==== TELEGRAM CALLBACK STARTED ====");
  try {
    // Lấy dữ liệu từ query params
    const searchParams = request.nextUrl.searchParams;
    const telegramData = {
      id: parseInt(searchParams.get('id') || '0'),
      first_name: searchParams.get('first_name') || '',
      last_name: searchParams.get('last_name') || '',
      username: searchParams.get('username') || '',
      photo_url: searchParams.get('photo_url') || '',
      auth_date: parseInt(searchParams.get('auth_date') || '0'),
      hash: searchParams.get('hash') || ''
    };
    
    console.log('Received Telegram callback data:', JSON.stringify(telegramData, null, 2));
    
    if (!telegramData.id || !telegramData.auth_date || !telegramData.hash) {
      console.error('Missing required Telegram data');
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent('Dữ liệu Telegram không hợp lệ')}`, request.url)
      );
    }
    
    // Gọi API để xác thực và đăng nhập
    const response = await fetch(new URL('/api/auth/telegram', request.url).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(telegramData),
    });
    
    const data = await response.json();
    console.log('Auth API response:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      // Đăng nhập thành công, redirect về trang chủ
      console.log("Login successful, redirecting to homepage");
      return NextResponse.redirect(new URL('/', request.url));
    } else {
      // Đăng nhập thất bại, redirect về trang đăng nhập với thông báo lỗi
      console.error("Login failed:", data.error);
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(data.error || 'Đăng nhập thất bại')}`, request.url)
      );
    }
  } catch (error) {
    console.error('Error in Telegram callback:', error);
    return NextResponse.redirect(
      new URL('/login?error=Đã xảy ra lỗi khi xử lý đăng nhập Telegram', request.url)
    );
  } finally {
    console.log("==== TELEGRAM CALLBACK COMPLETED ====");
  }
} 