import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Thêm method GET để kiểm tra xem webhook có hoạt động không
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Telegram webhook endpoint is active",
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  console.log('==== TELEGRAM WEBHOOK RECEIVED ====');
  try {
    const data = await request.json();
    console.log('Received Telegram webhook data:', JSON.stringify(data, null, 2));
    
    // Xử lý tin nhắn từ Telegram
    if (data.message) {
      const { chat, text } = data.message;
      
      if (chat && chat.id) {
        // Lưu chat_id vào database để có thể gửi tin nhắn sau này
        const supabase = createRouteHandlerClient({ cookies });
        
        try {
          await supabase.from('telegram_chats').upsert({
            chat_id: chat.id.toString(),
            username: chat.username || null,
            first_name: chat.first_name || null,
            last_name: chat.last_name || null,
            updated_at: new Date().toISOString()
          });
          
          console.log(`Saved chat_id ${chat.id} to database`);
        } catch (error) {
          console.error('Error saving chat_id:', error);
        }
        
        // Xử lý lệnh từ người dùng
        if (text === '/start') {
          await sendTelegramMessage(chat.id, 'Chào mừng bạn đến với Overwatch Clone! Bạn có thể đăng nhập vào ứng dụng thông qua bot này.');
        }
      }
    }
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}

// Hàm gửi tin nhắn đến người dùng Telegram
async function sendTelegramMessage(chatId: number | string, text: string) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not configured');
    }
    
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML'
      })
    });
    
    const result = await response.json();
    console.log('Message sent result:', result);
    return result;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
} 