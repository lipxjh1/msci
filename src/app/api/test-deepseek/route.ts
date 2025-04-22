import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// API handler để test kết nối tới DeepSeek
export async function GET() {
  try {
    // Lấy DeepSeek API key từ env
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'DEEPSEEK_API_KEY không được cấu hình trong biến môi trường' 
      }, { status: 400 });
    }
    
    // Thời gian bắt đầu cho timeout tracking
    const startTime = Date.now();
    
    // Sử dụng OpenAI SDK với base URL của DeepSeek
    const openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: apiKey,
      timeout: 8000 // 8 giây timeout
    });

    try {
      // Gọi API
      const completion = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Say hello in one simple word." }
        ],
        temperature: 0.7,
        max_tokens: 10
      });
      
      // Thời gian kết thúc
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // Trích xuất phản hồi
      const aiResponse = completion.choices[0]?.message?.content || 'No response';
      
      return NextResponse.json({
        success: true,
        response: aiResponse,
        responseTime: responseTime,
        tokensUsed: completion.usage?.total_tokens || 'unknown',
        rawResponse: completion
      });
      
    } catch (error: any) {
      console.error('Error calling DeepSeek API:', error);
      
      if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
        return NextResponse.json({
          success: false,
          error: 'Request timed out after 8 seconds',
          responseTime: Date.now() - startTime
        });
      }
      
      return NextResponse.json({
        success: false,
        error: error.message || 'Unknown error',
        details: error.response?.data || error.cause || {},
        stack: error.stack
      });
    }
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
} 