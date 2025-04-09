import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    console.log('Starting setup of telegram_chats table');
    
    // Sử dụng service role để có đủ quyền tạo bảng
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase credentials');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    
    // SQL script để tạo bảng telegram_chats
    const createTableSQL = `
      BEGIN;
      
      -- Tạo extension uuid-ossp nếu chưa tồn tại
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      
      -- Tạo bảng telegram_chats nếu chưa tồn tại
      CREATE TABLE IF NOT EXISTS public.telegram_chats (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        chat_id TEXT NOT NULL UNIQUE,
        username TEXT,
        first_name TEXT,
        last_name TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- Tạo index
      CREATE INDEX IF NOT EXISTS idx_telegram_chats_chat_id ON public.telegram_chats(chat_id);
      
      -- Thêm RLS (Row Level Security) policies
      ALTER TABLE public.telegram_chats ENABLE ROW LEVEL SECURITY;
      
      -- Chính sách cho service role
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT FROM pg_policies WHERE tablename = 'telegram_chats' AND policyname = 'telegram_chats_service_role'
        ) THEN
          CREATE POLICY telegram_chats_service_role ON public.telegram_chats 
            USING (true)
            WITH CHECK (true);
        END IF;
      END
      $$;
      
      COMMIT;
    `;
    
    try {
      console.log('Executing SQL to create telegram_chats table');
      
      // Thực thi SQL sử dụng RPC
      const { error } = await supabase.rpc('exec_sql', {
        sql: createTableSQL
      });
      
      if (error) {
        console.error('Error with exec_sql RPC:', error);
        throw error;
      }
      
      console.log('telegram_chats table created successfully');
    } catch (error) {
      console.error('Error creating telegram_chats table:', error);
      
      // Kiểm tra xem lỗi có phải do bảng đã tồn tại không
      try {
        const { error: checkError } = await supabase
          .from('telegram_chats')
          .select('id', { count: 'exact', head: true });
        
        if (!checkError) {
          console.log('The telegram_chats table already exists, skipping creation');
          // Bảng đã tồn tại, tiếp tục
        } else {
          return NextResponse.json({ 
            error: 'Failed to create telegram_chats table',
            details: error
          }, { status: 500 });
        }
      } catch {
        return NextResponse.json({ 
          error: 'Failed to create telegram_chats table',
          details: error
        }, { status: 500 });
      }
    }
    
    // Khởi tạo webhook với Telegram
    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      if (!botToken) {
        throw new Error('TELEGRAM_BOT_TOKEN is not configured');
      }
      
      const appUrl = process.env.NEXT_PUBLIC_APP_URL;
      if (!appUrl) {
        throw new Error('NEXT_PUBLIC_APP_URL is not configured');
      }
      
      const url = `https://${appUrl}/api/telegram-webhook`;
      console.log(`Setting webhook URL to: ${url}`);
      
      const response = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook?url=${encodeURIComponent(url)}`);
      const result = await response.json();
      
      console.log('Webhook setup result:', result);
      
      if (!result.ok) {
        throw new Error(`Failed to set webhook: ${JSON.stringify(result)}`);
      }
    } catch (error) {
      console.error('Error setting up webhook:', error);
      return NextResponse.json({ 
        error: 'Failed to set up webhook',
        details: error
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Telegram chats table and webhook setup completed' 
    });
  } catch (error) {
    console.error('Unexpected error during setup:', error);
    return NextResponse.json({ 
      error: 'Setup failed',
      details: error
    }, { status: 500 });
  }
} 