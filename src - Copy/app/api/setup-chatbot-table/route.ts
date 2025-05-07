import { supabase } from '@/tien_ich/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if table exists
    const { data: existingTables, error: tablesError } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public')
      .eq('tablename', 'chatbot_messages');

    if (tablesError) {
      return NextResponse.json({ error: tablesError.message }, { status: 500 });
    }

    // If table already exists
    if (existingTables && existingTables.length > 0) {
      return NextResponse.json({ message: 'Bảng chatbot_messages đã tồn tại', exists: true });
    }

    // Create chatbot_messages table using stored procedure
    const { error: createError } = await supabase.rpc('create_chatbot_messages_table');

    if (createError) {
      // If the stored procedure doesn't exist, inform the admin to run SQL manually
      return NextResponse.json({ 
        error: 'Không thể tạo bảng tự động. Vui lòng chạy SQL thủ công để tạo bảng chatbot_messages.',
        sqlScript: `
          CREATE TABLE IF NOT EXISTS public.chatbot_messages (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            cau_hoi TEXT NOT NULL,
            tra_loi TEXT NOT NULL,
            loai TEXT NOT NULL CHECK (loai IN ('chung', 'huong_dan', 'tro_giup')),
            trang_thai TEXT NOT NULL CHECK (trang_thai IN ('hoat_dong', 'vo_hieu')),
            do_uu_tien INTEGER DEFAULT 0,
            tu_khoa TEXT[] DEFAULT '{}',
            nguoi_dung_id UUID REFERENCES public.nguoi_dung(id),
            ngay_tao TIMESTAMP WITH TIME ZONE DEFAULT now()
          );
          
          CREATE INDEX chatbot_messages_nguoi_dung_id_idx ON public.chatbot_messages(nguoi_dung_id);
          CREATE INDEX chatbot_messages_loai_idx ON public.chatbot_messages(loai);
          CREATE INDEX chatbot_messages_trang_thai_idx ON public.chatbot_messages(trang_thai);
        `
      }, { status: 400 });
    }

    // Insert some sample data
    const sampleData = [
      {
        cau_hoi: 'Làm thế nào để đăng nhập?',
        tra_loi: 'Bạn có thể đăng nhập bằng cách nhấp vào nút "Đăng nhập" ở góc trên bên phải và nhập thông tin tài khoản của bạn.',
        loai: 'huong_dan',
        trang_thai: 'hoat_dong',
        do_uu_tien: 10,
        tu_khoa: ['đăng nhập', 'tài khoản', 'login']
      },
      {
        cau_hoi: 'Game này có gì hay?',
        tra_loi: 'Game này là phiên bản Clone Overwatch với nhiều tính năng thú vị như hệ thống tướng đa dạng, nhiều chế độ chơi và cộng đồng sôi động.',
        loai: 'chung',
        trang_thai: 'hoat_dong',
        do_uu_tien: 5,
        tu_khoa: ['game', 'overwatch', 'tính năng']
      },
      {
        cau_hoi: 'Làm thế nào để liên hệ hỗ trợ?',
        tra_loi: 'Bạn có thể liên hệ hỗ trợ qua email support@example.com hoặc qua kênh Discord chính thức của chúng tôi.',
        loai: 'tro_giup',
        trang_thai: 'hoat_dong',
        do_uu_tien: 8,
        tu_khoa: ['hỗ trợ', 'liên hệ', 'support']
      }
    ];

    const { error: insertError } = await supabase
      .from('chatbot_messages')
      .insert(sampleData);

    if (insertError) {
      return NextResponse.json(
        { message: 'Tạo bảng thành công nhưng không thể thêm dữ liệu mẫu', error: insertError.message },
        { status: 201 }
      );
    }

    return NextResponse.json({ message: 'Đã tạo bảng chatbot_messages và thêm dữ liệu mẫu thành công' }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Lỗi không xác định';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 