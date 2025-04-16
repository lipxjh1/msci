import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    status: 'OK',
    message: 'API endpoint test đang hoạt động' 
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({ 
      status: 'success',
      received: body,
      response: 'Xin chào! Tôi là Akane, rất vui được gặp bạn!' 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Có lỗi xảy ra',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 