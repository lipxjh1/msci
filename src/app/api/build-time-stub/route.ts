import { NextResponse } from 'next/server';

/**
 * API route dành cho môi trường build.
 * Trả về thành công giả để tránh lỗi build.
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Build mode - stub API response',
    note: 'API này được sử dụng trong quá trình build để tránh lỗi'
  });
}

export async function POST() {
  return NextResponse.json({
    success: true,
    message: 'Build mode - stub API response',
    note: 'API này được sử dụng trong quá trình build để tránh lỗi'
  });
} 