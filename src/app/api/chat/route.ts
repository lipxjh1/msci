import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/utils/supabase';

// Cấu hình Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Phần này để log chi tiết hơn
console.log('Supabase URL:', supabaseUrl ? 'Đã được cấu hình' : 'Thiếu');
console.log('Supabase Key:', supabaseKey ? 'Đã được cấu hình' : 'Thiếu');

// Cấu hình cho các providers
const BASE_URLS = {
  deepseek: 'https://api.deepseek.com',
  openai: 'https://api.openai.com'
};

// Default models
const DEFAULT_MODELS = {
  deepseek: 'deepseek-chat',
  openai: 'gpt-3.5-turbo'
};

// Kiểu dữ liệu cho API key từ Supabase
interface ApiKey {
  id: number;
  name: string;
  key: string;
  provider: string;
}

// Phản hồi dự phòng khi không thể kết nối API
const FALLBACK_RESPONSES = [
  "Xin chào! Tôi là Akane, rất vui được gặp bạn! Bạn muốn biết thêm về M-SCI không?",
  "Chào mừng bạn đến với M-SCI! Tôi là Akane, một chiến binh với khả năng điều khiển plasma. Tôi có thể giúp gì cho bạn?",
  "Hey there! Akane đây! Bạn đang tìm hiểu về game hành động đội nhóm 5v5 siêu thú vị này à? Tôi có thể kể cho bạn nghe đấy!",
  "Xin chào chiến binh! Tôi là Akane, sẵn sàng phục vụ và hỗ trợ bạn trong thế giới M-SCI. Bạn cần biết điều gì?",
  "Chào bạn! Akane đây! Tôi rất vui khi được nói chuyện với bạn. Hôm nay bạn muốn biết gì về thế giới M-SCI?"
];

// Trả về phản hồi dự phòng
function getFallbackResponse(reason?: string) {
  const randomIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
  console.log('Đang sử dụng phản hồi dự phòng, lý do:', reason || 'Không xác định');
  
  return NextResponse.json({ 
    response: FALLBACK_RESPONSES[randomIndex],
    source: 'fallback',
    reason: reason || 'unknown_error'
  });
}

// API handler
export async function POST(request: Request) {
  console.log('======= CHAT API ROUTE TRIGGERED =======');
  
  try {
    // Phân tích body request
    const body = await request.json().catch(err => {
      console.error('Lỗi phân tích JSON request:', err);
      throw new Error('Invalid JSON in request body');
    });
    
    const { message, chatHistory } = body;
    
    // Kiểm tra message
    if (!message || typeof message !== 'string') {
      console.error('Message không hợp lệ:', message);
      return NextResponse.json({
        response: "Vui lòng gửi tin nhắn hợp lệ!",
        source: 'error',
        error: 'invalid_message'
      }, { status: 400 });
    }
    
    console.log('Received message:', message.substring(0, 50) + (message.length > 50 ? '...' : ''));
    console.log('Chat history length:', chatHistory?.length || 0);
    
    // Giới hạn độ dài message
    let processedMessage = message;
    if (message.length > 1000) {
      processedMessage = message.substring(0, 1000) + "...";
      console.log('Message quá dài và đã được cắt ngắn');
    }

    // Kiểm tra kết nối Supabase
    console.log('Kiểm tra kết nối Supabase...');
    try {
      // Thử một truy vấn đơn giản để kiểm tra kết nối
      const { error: healthError } = await supabase.from('api_keys').select('id', { count: 'exact', head: true }).limit(1);
      
      if (healthError) {
        console.error('Test kết nối Supabase thất bại:', healthError.message);
        return NextResponse.json({ 
          response: "Xin lỗi, tôi đang gặp sự cố kết nối với cơ sở dữ liệu. Vui lòng thử lại sau!",
          source: 'error',
          error: 'database_connection',
          details: healthError.message
        }, { status: 503 });
      }
      
      console.log('Kết nối Supabase OK');
    } catch (dbError: any) {
      console.error('Lỗi kiểm tra kết nối DB:', dbError.message || dbError);
      return getFallbackResponse('database_error: ' + (dbError.message || 'unknown'));
    }

    // Mặc định sử dụng DeepSeek
    let provider = 'deepseek';
    let apiKeys: ApiKey[] = [];
    
    try {
      // Chuẩn bị prompt cho chatbot
      const systemPrompt = `Bạn là Akane, một chiến binh M-SCI 20 tuổi. Bạn vui vẻ, thích công nghệ và nhiệt tình tư vấn cho người dùng. Hãy trả lời với giọng điệu thân thiện, đôi khi sử dụng emoji và luôn giữ vai trò của mình. 
      Đừng tiết lộ bạn là AI, hãy luôn trả lời trong vai trò chiến binh Akane. Trả lời một cách ngắn gọn và súc tích bằng tiếng Việt.`;
      
      // Chuẩn bị tin nhắn
      const messages = [
        { role: 'system', content: systemPrompt }
      ];
      
      // Thêm lịch sử chat
      if (chatHistory && Array.isArray(chatHistory) && chatHistory.length > 0) {
        const recentHistory = chatHistory.slice(-5);
        messages.push(...recentHistory);
      }
      
      // Thêm tin nhắn người dùng
      messages.push({ role: 'user', content: processedMessage });
      
      // Truy vấn API key từ Supabase cho DeepSeek
      console.log('Đang tìm API key DeepSeek từ Supabase...');
      let { data: deepseekKeys, error: deepseekError } = await supabase
        .from('api_keys')
        .select('id, name, key, provider')
        .eq('provider', 'deepseek')
        .eq('is_active', true)
        .order('priority', { ascending: false })
        .limit(1);
      
      if (deepseekError) {
        console.error('Lỗi truy vấn API key DeepSeek:', deepseekError.message);
        throw new Error(`DeepSeek API key query error: ${deepseekError.message}`);
      }
      
      // Nếu không có key DeepSeek, thử OpenAI
      if (!deepseekKeys || deepseekKeys.length === 0) {
        console.log('Không tìm thấy API key DeepSeek, đang thử OpenAI...');
        provider = 'openai';
        
        const { data: openaiKeys, error: openaiError } = await supabase
          .from('api_keys')
          .select('id, name, key, provider')
          .eq('provider', 'openai')
          .eq('is_active', true)
          .order('priority', { ascending: false })
          .limit(1);
        
        if (openaiError) {
          console.error('Lỗi truy vấn API key OpenAI:', openaiError.message);
          throw new Error(`OpenAI API key query error: ${openaiError.message}`);
        }
        
        if (!openaiKeys || openaiKeys.length === 0) {
          console.error('Không tìm thấy API key nào cho cả DeepSeek và OpenAI');
          return getFallbackResponse('no_api_keys_found');
        }
        
        apiKeys = openaiKeys as ApiKey[];
      } else {
        apiKeys = deepseekKeys as ApiKey[];
      }
      
      // Log kết quả tìm API key
      console.log(`Đã tìm thấy API key ${provider}: ${apiKeys[0].name || 'unnamed'} (ID: ${apiKeys[0].id})`);
      
      // Lấy API key và cấu hình
      const apiKey = apiKeys[0].key;
      const baseURL = BASE_URLS[provider as keyof typeof BASE_URLS];
      const model = DEFAULT_MODELS[provider as keyof typeof DEFAULT_MODELS];
      
      if (!apiKey) {
        console.error(`API key ${provider} không hợp lệ hoặc trống`);
        return getFallbackResponse('invalid_api_key');
      }
      
      if (!baseURL) {
        console.error(`Base URL cho ${provider} không được định nghĩa`);
        return getFallbackResponse('invalid_provider_config');
      }
      
      // Gọi API
      try {
        console.log(`Khởi tạo client cho ${provider}, baseURL: ${baseURL}`);
        const openai = new OpenAI({
          baseURL: baseURL,
          apiKey: apiKey,
          timeout: 15000, // 15 giây timeout
          maxRetries: 2,
          dangerouslyAllowBrowser: true
        });
        
        console.log(`Đang gọi API ${provider}...`);
        console.log('Model sử dụng:', model);
        
        const startTime = Date.now();
        const completion = await openai.chat.completions.create({
          model: model,
          messages: messages as any,
          temperature: 0.7,
          max_tokens: 500
        });
        const responseTime = Date.now() - startTime;
        
        console.log(`Nhận phản hồi từ ${provider} API trong ${responseTime}ms`);
        const aiResponse = completion.choices[0]?.message?.content || '';
        
        // Cập nhật thời gian sử dụng gần nhất
        void supabase
          .from('api_keys')
          .update({ last_used_at: new Date().toISOString() })
          .eq('id', apiKeys[0].id)
          .then(({ error }) => {
            if (error) console.error('Lỗi cập nhật last_used_at:', error.message);
          });
        
        // Ghi log sử dụng API
        const usageLogData = {
          api_key_id: apiKeys[0].id,
          status: 'success',
          tokens_used: completion.usage?.total_tokens || 0,
          input_tokens: completion.usage?.prompt_tokens || 0,
          output_tokens: completion.usage?.completion_tokens || 0,
          request_data: JSON.stringify({ 
            provider, 
            model, 
            input_length: processedMessage.length,
            response_time: responseTime 
          }),
          response_data: JSON.stringify({ 
            output_length: aiResponse.length,
            output: aiResponse.substring(0, 100) + (aiResponse.length > 100 ? '...' : '')
          })
        };
        
        void supabase
          .from('api_usage_logs')
          .insert([usageLogData])
          .then(({ error }) => {
            if (error) console.error('Lỗi khi tạo log sử dụng API:', error.message);
          });
        
        // Trả về phản hồi thành công
        console.log('Trả về phản hồi thành công');
        return NextResponse.json({ 
          response: aiResponse,
          source: 'api',
          provider: provider
        });
        
      } catch (apiError: any) {
        console.error(`Lỗi khi gọi ${provider} API:`, apiError);
        
        if (apiError.status) {
          console.error(`API error status: ${apiError.status}`);
        }
        
        // Chi tiết lỗi được giữ lại để debug
        const errorDetails = {
          message: apiError.message || 'Unknown API error',
          status: apiError.status,
          type: apiError.type,
          code: apiError.code
        };
        
        // Ghi log lỗi
        void supabase
          .from('api_usage_logs')
          .insert([{
            api_key_id: apiKeys[0].id,
            status: 'error',
            error_message: errorDetails.message,
            request_data: JSON.stringify({ 
              provider, 
              model: DEFAULT_MODELS[provider as keyof typeof DEFAULT_MODELS],
              error_details: errorDetails
            })
          }])
          .then(({ error }) => {
            if (error) console.error('Lỗi khi tạo log lỗi API:', error.message);
          });
        
        // Nếu có lỗi 401/403, có thể API key hết hạn
        if (apiError.status === 401 || apiError.status === 403) {
          // Đánh dấu API key không hoạt động
          void supabase
            .from('api_keys')
            .update({ is_active: false })
            .eq('id', apiKeys[0].id)
            .then(({ error }) => {
              if (error) console.error('Lỗi khi cập nhật trạng thái API key:', error.message);
              else console.log(`Đã đánh dấu API key ${apiKeys[0].id} không hoạt động`);
            });
        }
        
        return getFallbackResponse(`api_error_${provider}: ${errorDetails.message}`);
      }
      
    } catch (processingError: any) {
      console.error('Lỗi khi xử lý request:', processingError);
      return getFallbackResponse(`processing_error: ${processingError.message}`);
    }
    
  } catch (generalError: any) {
    console.error('Lỗi tổng quát trong chat API:', generalError);
    
    return NextResponse.json({ 
      response: "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau nhé!",
      source: 'error',
      error: generalError.message || 'unknown_error'
    }, { status: 500 });
  }
} 