import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Starting setup of Telegram webhook');
    
    // Khởi tạo webhook với Telegram (bỏ qua phần tạo bảng vì bảng đã tồn tại)
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
      
      return NextResponse.json({ 
        success: true, 
        message: 'Telegram webhook setup completed successfully',
        webhook_url: url,
        result: result
      });
    } catch (error) {
      console.error('Error setting up webhook:', error);
      return NextResponse.json({ 
        error: 'Failed to set up webhook',
        details: error instanceof Error ? error.message : String(error)
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Unexpected error during setup:', error);
    return NextResponse.json({ 
      error: 'Setup failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 