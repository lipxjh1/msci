import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    console.log('Starting setup of Telegram webhook');
    
    // Lấy URL hiện tại từ request
    const requestUrl = new URL(request.url);
    const origin = requestUrl.origin;
    console.log('Request origin:', origin);
    
    // Khởi tạo webhook với Telegram (bỏ qua phần tạo bảng vì bảng đã tồn tại)
    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      if (!botToken) {
        throw new Error('TELEGRAM_BOT_TOKEN is not configured');
      }
      
      // Sử dụng origin từ request thay vì biến môi trường nếu có thể
      let webhookBaseUrl = origin;
      
      // Fallback to environment variable if needed
      if (!webhookBaseUrl || webhookBaseUrl.includes('localhost')) {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL;
        if (!appUrl) {
          throw new Error('NEXT_PUBLIC_APP_URL is not configured');
        }
        webhookBaseUrl = `https://${appUrl}`;
      }
      
      const webhookUrl = `${webhookBaseUrl}/api/telegram-webhook`;
      console.log(`Setting webhook URL to: ${webhookUrl}`);
      
      // Kiểm tra webhook hiện tại trước
      const checkResponse = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`);
      const checkResult = await checkResponse.json();
      console.log('Current webhook info:', checkResult);
      
      // Đặt webhook mới
      const response = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
      const result = await response.json();
      
      console.log('Webhook setup result:', result);
      
      if (!result.ok) {
        throw new Error(`Failed to set webhook: ${JSON.stringify(result)}`);
      }
      
      // Kiểm tra lại sau khi đặt
      const verifyResponse = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`);
      const verifyResult = await verifyResponse.json();
      
      return NextResponse.json({ 
        success: result.ok, 
        message: 'Telegram webhook setup completed',
        webhook_url: webhookUrl,
        setup_result: result,
        verify_result: verifyResult
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