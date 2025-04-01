import { NextResponse } from 'next/server';
import { signIn } from '@/utils/auth-service';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email và mật khẩu là bắt buộc' },
        { status: 400 }
      );
    }
    
    const data = await signIn(email, password);
    
    return NextResponse.json(
      { message: 'Đăng nhập thành công!', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi đăng nhập' },
      { status: 500 }
    );
  }
} 