import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Khởi tạo Supabase client với Service Role Key để có quyền tạo bảng
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    // SQL để tạo bảng chat_qa nếu chưa tồn tại
    const { error } = await supabase.rpc('create_chat_qa_table', {});

    // Nếu RPC function chưa được tạo, sử dụng SQL trực tiếp
    if (error && error.message.includes('does not exist')) {
      // SQL để tạo bảng chat_qa
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS public.chat_qa (
          id SERIAL PRIMARY KEY,
          question TEXT NOT NULL,
          answer TEXT NOT NULL, 
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
        );
        
        -- Tạo chỉ mục tìm kiếm Full-text để tối ưu hóa tìm kiếm câu hỏi
        CREATE INDEX IF NOT EXISTS chat_qa_question_idx ON public.chat_qa USING gin (to_tsvector('vietnamese', question));
        
        -- Enable RLS (Row Level Security)
        ALTER TABLE public.chat_qa ENABLE ROW LEVEL SECURITY;
        
        -- Tạo policy cho phép tất cả người dùng đọc
        CREATE POLICY "Allow public read access" ON public.chat_qa
          FOR SELECT USING (true);
          
        -- Tạo policy chỉ cho phép authenticated users thêm, sửa, xóa
        CREATE POLICY "Allow authenticated users to insert" ON public.chat_qa
          FOR INSERT TO authenticated USING (true);
          
        CREATE POLICY "Allow authenticated users to update" ON public.chat_qa
          FOR UPDATE TO authenticated USING (true);
          
        CREATE POLICY "Allow authenticated users to delete" ON public.chat_qa
          FOR DELETE TO authenticated USING (true);
      `;
      
      // Thực hiện SQL
      const { error: sqlError } = await supabase.rpc('exec_sql', { sql: createTableQuery });
      
      if (sqlError) {
        // Nếu RPC exec_sql chưa được tạo, thử cách cuối là query trực tiếp
        const { error: directError } = await supabase
          .from('chat_qa')
          .select('id')
          .limit(1);
          
        if (directError && !directError.message.includes('does not exist')) {
          throw directError;
        }
        
        // Nếu bảng không tồn tại, thông báo cho admin cần tạo thủ công
        if (directError && directError.message.includes('does not exist')) {
          return NextResponse.json({
            success: false,
            message: 'Bảng chat_qa chưa tồn tại. Vui lòng tạo bảng thủ công trong Supabase SQL Editor.',
            sql: createTableQuery
          });
        }
      }
    }
    
    // Kiểm tra xem bảng đã được tạo chưa
    const { error: tableError } = await supabase
      .from('chat_qa')
      .select('id')
      .limit(1);
      
    return NextResponse.json({
      success: !tableError,
      message: tableError 
        ? 'Có lỗi khi kiểm tra bảng chat_qa: ' + tableError.message 
        : 'Bảng chat_qa đã được tạo hoặc đã tồn tại'
    });
  } catch (error) {
    console.error('Error creating chat_qa table:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Lỗi khi tạo bảng chat_qa'
      },
      { status: 500 }
    );
  }
} 