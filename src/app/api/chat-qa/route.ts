import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Khởi tạo Supabase client với Service Role Key để có quyền admin
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// GET: Lấy danh sách câu hỏi và câu trả lời
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('chat_qa')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching QA data:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi lấy dữ liệu Q&A' },
      { status: 500 }
    );
  }
}

// POST: Thêm câu hỏi và câu trả lời mới
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, answer } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { success: false, error: 'Thiếu câu hỏi hoặc câu trả lời' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('chat_qa')
      .insert([{ question, answer }])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error adding QA:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi thêm Q&A mới' },
      { status: 500 }
    );
  }
}

// PUT: Cập nhật câu hỏi và câu trả lời
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, question, answer } = body;

    if (!id || !question || !answer) {
      return NextResponse.json(
        { success: false, error: 'Thiếu ID, câu hỏi hoặc câu trả lời' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('chat_qa')
      .update({ question, answer })
      .eq('id', id)
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error updating QA:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi cập nhật Q&A' },
      { status: 500 }
    );
  }
}

// DELETE: Xóa câu hỏi và câu trả lời
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Thiếu ID' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('chat_qa')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting QA:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi xóa Q&A' },
      { status: 500 }
    );
  }
} 