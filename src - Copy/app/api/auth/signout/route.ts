import { NextResponse } from 'next/server';
import { signOut } from '@/utils/auth-service';

export async function POST() {
  try {
    await signOut();
    
    return NextResponse.json(
      { message: 'Đăng xuất thành công!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lỗi đăng xuất:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi đăng xuất' },
      { status: 500 }
    );
  }
} 