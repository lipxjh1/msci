import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// Khởi tạo Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ApiKey {
  id: number;
  key: string;
  provider: string;
  usage_count?: number;
}

export async function POST(request: NextRequest) {
  try {
    // Phân tích request body
    const body = await request.json();
    const { messages, model = 'deepseek-chat', stream = false } = body;
    
    // Kiểm tra messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({
        error: 'Tin nhắn không hợp lệ',
        status: 'error'
      }, { status: 400 });
    }
    
    // Khởi tạo Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Lấy API key từ Supabase
    const { data: apiKeys, error: apiKeyError } = await supabase
      .from('api_keys')
      .select('id, key, provider, usage_count')
      .eq('provider', 'deepseek')
      .eq('is_active', true)
      .order('priority', { ascending: false })
      .limit(1);
    
    // Kiểm tra lỗi khi lấy API key
    if (apiKeyError || !apiKeys || apiKeys.length === 0) {
      console.error('Lỗi khi lấy API key:', apiKeyError || 'Không tìm thấy API key nào');
      return NextResponse.json({
        error: 'Không thể lấy API key',
        status: 'error',
        details: apiKeyError?.message || 'Không tìm thấy API key nào'
      }, { status: 500 });
    }
    
    const apiKey = apiKeys[0].key;
    const apiKeyData = apiKeys[0] as ApiKey;
    
    // Khởi tạo OpenAI client với DeepSeek API
    const openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey,
      timeout: 60000, // 60 giây
      maxRetries: 2,
      dangerouslyAllowBrowser: true
    });
    
    // Nếu yêu cầu streaming
    if (stream) {
      // Xử lý streaming response
      try {
        const stream = await openai.chat.completions.create({
          model,
          messages: messages as any,
          stream: true,
          temperature: 0.7,
          max_tokens: 800
        });
        
        // Tạo một readable stream
        const readableStream = new ReadableStream({
          async start(controller) {
            // Xử lý từng chunk
            for await (const chunk of stream) {
              const content = chunk.choices[0]?.delta?.content || '';
              if (content) {
                // Gửi từng phần của response tới client
                controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`));
              }
            }
            controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
            controller.close();
          },
          cancel() {
            // Không làm gì khi hủy
          }
        });
        
        // Cập nhật thông tin sử dụng API key (async)
        void supabase
          .from('api_keys')
          .update({ 
            last_used_at: new Date().toISOString(),
            usage_count: (apiKeyData.usage_count || 0) + 1 
          })
          .eq('id', apiKeyData.id);
        
        // Trả về stream
        return new NextResponse(readableStream, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
          }
        });
      } catch (error: any) {
        console.error('Lỗi khi tạo streaming response:', error);
        return NextResponse.json({
          error: `Lỗi khi tạo streaming response: ${error.message || error}`,
          status: 'error'
        }, { status: 500 });
      }
    } else {
      // Xử lý non-streaming response
      try {
        const completion = await openai.chat.completions.create({
          model,
          messages: messages as any,
          temperature: 0.7,
          max_tokens: 800
        });
        
        const content = completion.choices[0]?.message?.content || '';
        
        // Cập nhật thông tin sử dụng API key (async)
        void supabase
          .from('api_keys')
          .update({ 
            last_used_at: new Date().toISOString(),
            usage_count: (apiKeyData.usage_count || 0) + 1 
          })
          .eq('id', apiKeyData.id);
        
        return NextResponse.json({
          content,
          model,
          provider: 'deepseek',
          tokens: completion.usage || { total_tokens: 0 }
        });
      } catch (error: any) {
        console.error('Lỗi khi gọi DeepSeek API:', error);
        return NextResponse.json({
          error: `Lỗi khi gọi DeepSeek API: ${error.message || error}`,
          status: 'error'
        }, { status: 500 });
      }
    }
  } catch (error: any) {
    console.error('Lỗi xử lý request:', error);
    return NextResponse.json({
      error: `Lỗi xử lý request: ${error.message || error}`,
      status: 'error'
    }, { status: 500 });
  }
} 