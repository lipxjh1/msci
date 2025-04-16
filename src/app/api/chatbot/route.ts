import { supabase } from '@/tien_ich/supabase';
import { NextRequest, NextResponse } from 'next/server';

interface UpdateData {
  question?: string;
  answer?: string;
  updated_at: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    
    let query = supabase
      .from('chat_qa')
      .select('*', { count: 'exact' });
    
    if (search) {
      query = query.or(`question.ilike.%${search}%,answer.ilike.%${search}%`);
    }
    
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ data, count });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Lỗi không xác định';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.question || !body.answer) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc (question, answer)' },
        { status: 400 }
      );
    }
    
    const { data, error } = await supabase
      .from('chat_qa')
      .insert([{
        question: body.question,
        answer: body.answer
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Server error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Lỗi không xác định';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) {
      return NextResponse.json({ error: 'ID không được cung cấp' }, { status: 400 });
    }
    
    const body = await request.json();
    
    if (!body.question && !body.answer) {
      return NextResponse.json(
        { error: 'Cần cung cấp ít nhất một trường để cập nhật (question hoặc answer)' },
        { status: 400 }
      );
    }
    
    const updateData: UpdateData = {
      updated_at: new Date().toISOString()
    };
    if (body.question) updateData.question = body.question;
    if (body.answer) updateData.answer = body.answer;
    
    const { data, error } = await supabase
      .from('chat_qa')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Server error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Lỗi không xác định';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) {
      return NextResponse.json({ error: 'ID không được cung cấp' }, { status: 400 });
    }
    
    const { error } = await supabase
      .from('chat_qa')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ message: 'Xóa thành công' });
  } catch (error) {
    console.error('Server error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Lỗi không xác định';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 