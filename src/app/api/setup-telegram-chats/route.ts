import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    console.log('Starting setup of telegram_chats table');
    const supabase = createRouteHandlerClient({ cookies });
    
    // Tạo bảng telegram_chats nếu chưa tồn tại
    try {
      const { error } = await supabase.rpc('execute_sql', {
        sql_query: `
          CREATE TABLE IF NOT EXISTS telegram_chats (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            chat_id TEXT NOT NULL UNIQUE,
            username TEXT,
            first_name TEXT,
            last_name TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          
          CREATE INDEX IF NOT EXISTS idx_telegram_chats_chat_id ON telegram_chats(chat_id);
        `
      });
      
      if (error) {
        throw error;
      }
      
      console.log('telegram_chats table created successfully');
    } catch (error) {
      console.error('Error creating telegram_chats table:', error);
      return NextResponse.json({ 
        error: 'Failed to create telegram_chats table',
        details: error
      }, { status: 500 });
    }
    
    // Khởi tạo webhook với Telegram
    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      if (!botToken) {
        throw new Error('TELEGRAM_BOT_TOKEN is not configured');
      }
      
      const webhookUrl = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_APP_URL;
      if (!webhookUrl) {
        throw new Error('VERCEL_URL or NEXT_PUBLIC_APP_URL is not configured');
      }
      
      const url = `https://${webhookUrl}/api/telegram-webhook`;
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