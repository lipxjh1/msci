import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Khởi tạo Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST() {
  try {
    // Tạo bảng profiles
    const { error: createError } = await supabase.rpc('execute_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID REFERENCES auth.users(id),
          username TEXT UNIQUE,
          full_name TEXT,
          avatar_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (createError) {
      // Thử cách khác nếu RPC không hoạt động
      const { error: directError } = await supabase.from('profiles').insert({
        username: 'test_user',
        full_name: 'Test User'
      });

      if (directError && directError.message !== 'duplicate key value violates unique constraint') {
        throw directError;
      }
    }

    // Thêm dữ liệu mẫu
    const { error: insertError } = await supabase.from('profiles').upsert([
      { 
        username: 'user1', 
        full_name: 'Người dùng 1', 
        avatar_url: 'https://i.pravatar.cc/150?u=user1' 
      },
      { 
        username: 'user2', 
        full_name: 'Người dùng 2', 
        avatar_url: 'https://i.pravatar.cc/150?u=user2' 
      }
    ], { onConflict: 'username' });

    if (insertError) {
      console.error('Lỗi khi thêm dữ liệu mẫu:', insertError);
    }

    return NextResponse.json({ success: true, message: 'Đã tạo bảng mẫu thành công' });
  } catch (error) {
    console.error('Lỗi khi tạo bảng mẫu:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Lỗi khi tạo bảng mẫu' },
      { status: 500 }
    );
  }
} 