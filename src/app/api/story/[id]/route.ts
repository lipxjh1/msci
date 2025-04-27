import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * API endpoint để đọc nội dung truyện từ tệp txt
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const storyId = params.id;

    // Đường dẫn đến thư mục truyện
    const filePath = path.join(process.cwd(), 'public', 'tailieu', 'truyen', `${storyId}.txt`);
    
    try {
      // Đọc nội dung tệp
      const content = await fs.readFile(filePath, 'utf8');
      
      return NextResponse.json({ 
        content,
        success: true
      });
    } catch (error) {
      console.error(`Không thể đọc tệp ${filePath}:`, error);
      return NextResponse.json(
        { 
          error: 'Không tìm thấy chương truyện này', 
          success: false 
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Lỗi khi xử lý yêu cầu:', error);
    return NextResponse.json(
      { 
        error: 'Có lỗi xảy ra khi xử lý yêu cầu', 
        success: false 
      },
      { status: 500 }
    );
  }
} 