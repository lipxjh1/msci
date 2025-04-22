import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { ApiKeyService } from '@/components/admin/chatbot-management/ApiKeyService';
import type { ChatCompletionMessageParam } from 'openai/resources/chat';

// Supabase client cho phép truy vấn câu hỏi và câu trả lời từ database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Kiểm tra bảng api_usage_logs
(async () => {
  try {
    console.log('Đang kiểm tra bảng api_usage_logs...');
    
    // Thử truy vấn bảng để kiểm tra
    const { count, error } = await supabase
      .from('api_usage_logs')
      .select('*', { count: 'exact', head: true });
      
    if (error) {
      console.warn('Có thể bảng api_usage_logs chưa được tạo:', error.message);
      console.info('Gợi ý: Chạy endpoint /api/setup-api-logs-policy để thiết lập bảng và policy');
    } else {
      console.log(`Bảng api_usage_logs tồn tại và có ${count} bản ghi`);
    }
  } catch (err) {
    console.error('Lỗi khi kiểm tra bảng api_usage_logs:', err);
  }
})();

// Biến môi trường API key
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Các model mặc định cho từng provider
const DEFAULT_MODELS = {
  deepseek: 'deepseek-chat',
  openai: 'gpt-3.5-turbo',
};

// Base URL cho các dịch vụ API
const BASE_URLS = {
  deepseek: 'https://api.deepseek.com',
  openai: 'https://api.openai.com'
};

// Cấu hình và chế độ - có thể thay đổi để debug
const USE_HARDCODED_RESPONSES = false;  // Sử dụng câu trả lời cứng nếu API không hoạt động
const DEBUG_MODE = true;               // In thêm thông tin debug

// Tin nhắn fallback khi không thể kết nối với API
const FALLBACK_RESPONSES = [
  "Xin chào! Tôi là Akane, rất vui được gặp bạn! Bạn muốn biết thêm về M-SCI không?",
  "Chào mừng bạn đến với M-SCI! Tôi là Akane, một chiến binh với khả năng điều khiển plasma. Tôi có thể giúp gì cho bạn?",
  "Hey there! Akane đây! Bạn đang tìm hiểu về game hành động đội nhóm 5v5 siêu thú vị này à? Tôi có thể kể cho bạn nghe đấy!",
  "Xin chào chiến binh! Tôi là Akane, sẵn sàng phục vụ và hỗ trợ bạn trong thế giới M-SCI. Bạn cần biết điều gì?",
  "Chào bạn! Akane đây! Tôi rất vui khi được nói chuyện với bạn. Hôm nay bạn muốn biết gì về thế giới M-SCI?"
];

// Map các câu hỏi phổ biến với câu trả lời để sử dụng trong trường hợp database không hoạt động
const COMMON_QA = {
  "xin chào": "Xin chào! Tôi là Akane, chiến binh M-SCI. Rất vui được gặp bạn! 😊",
  "chào": "Chào bạn! Akane đây! Tôi có thể giúp gì cho bạn hôm nay?",
  "hi": "Hi there! Akane đây! Bạn muốn biết gì về M-SCI không?",
  "game này về cái gì": "M-SCI là game hành động đội nhóm 5v5 với nhiều anh hùng có khả năng đặc biệt. Game lấy cảm hứng từ thế giới tương lai đầy màu sắc và các nhân vật độc đáo với khả năng chiến đấu khác nhau!",
  "bạn là ai": "Tôi là Akane, một chiến binh trong thế giới M-SCI! Tôi có khả năng điều khiển năng lượng plasma và rất thích công nghệ. Tôi 20 tuổi và luôn sẵn sàng giúp đỡ các người chơi mới! ⚡"
};

// Thêm hàm logApiUsage để ghi log việc sử dụng API
async function logApiUsage({
  tokens_used,
  request_type, 
  status,
  error = null,
  message_content = '',
  provider = 'unknown'
}: {
  tokens_used: number;
  request_type: string;
  status: string;
  error?: string | null;
  message_content?: string;
  provider?: string;
}) {
  try {
    // Tính toán chi phí dựa trên số token (giả sử $0.000001 mỗi token)
    const cost = tokens_used * 0.000001;
    
    // DEBUG: Hiển thị chi tiết hơn về thao tác sắp thực hiện
    console.log('[DETAILED_DEBUG] Attempting to log API usage with data:', {
      tokens_used,
      request_type,
      status,
      error: error ? 'Error exists' : 'No error',
      cost,
      provider,
      message_length: message_content.length,
      supabaseUrl: supabaseUrl ? 'Exists' : 'Missing',
      supabaseKey: supabaseKey ? 'Exists (hidden)' : 'Missing'
    });
    
    // DEBUG: Kiểm tra kết nối Supabase trước khi ghi log
    console.log('[DETAILED_DEBUG] Testing Supabase connection before logging...');
    try {
      const { error: testError } = await supabase.from('_test').select('*').limit(1);
      if (testError) {
        console.log('[DETAILED_DEBUG] Expected test error (this is normal):', testError.message);
      }
    } catch (testErr) {
      console.error('[DETAILED_DEBUG] Unexpected error testing connection:', testErr);
    }
    
    // Thực hiện insert vào bảng api_usage_logs
    console.log('[DETAILED_DEBUG] Attempting to insert into api_usage_logs table...');
    const insertData = {
      tokens_used,
      request_type,
      status,
      error,
      cost,
      provider,
      message_content: message_content.substring(0, 500), // Giới hạn độ dài
      timestamp: new Date().toISOString() // Đảm bảo ghi timestamp dạng ISO với timezone
    };
    console.log('[DETAILED_DEBUG] Insert data structure:', JSON.stringify(insertData));
    
    const { data, error: logError } = await supabase
      .from('api_usage_logs')
      .insert([insertData])
      .select();
    
    if (logError) {
      // Kiểm tra xem lỗi có phải do quyền hay không
      console.error('[DETAILED_DEBUG] Error logging API usage. FULL ERROR:', JSON.stringify(logError));
      
      if (logError.message.includes('policy') || logError.message.includes('permission')) {
        console.warn('[DETAILED_DEBUG] Permission error when logging API usage. This may be due to RLS policies:', logError.message);
        console.info('[DETAILED_DEBUG] Hint: You might need to modify the RLS policy on api_usage_logs table to allow inserts from this service');
        
        // Chi tiết lỗi về policy và table
        console.error('[DETAILED_DEBUG] Troubleshooting info:', {
          error_code: logError.code,
          error_hint: logError.hint,
          error_details: logError.details,
        });
      } else {
        console.error('[DETAILED_DEBUG] Non-permission error logging API usage:', logError.message);
      }
    } else {
      console.log('[DETAILED_DEBUG] Successfully logged API usage. Response data:', data);
    }
  } catch (error) {
    // Chỉ ghi log lỗi, không làm gián đoạn luồng chính
    console.error('[DETAILED_DEBUG] Exception in logApiUsage function:', error);
    
    // Hiển thị stack trace nếu có
    if (error instanceof Error) {
      console.error('[DETAILED_DEBUG] Error stack:', error.stack);
    }
  }
}

// API handler
export async function POST(request: Request) {
  try {
    console.log('======= CHAT API ROUTE TRIGGERED =======');
    const body = await request.json();
    let { message, chatHistory, preferredProvider } = body;
    
    console.log('Received message:', message);
    console.log('Chat history length:', chatHistory?.length || 0);
    console.log('Preferred provider from body:', preferredProvider || 'not specified');

    // Giới hạn độ dài message để tránh lỗi
    if (message && message.length > 1000) {
      message = message.substring(0, 1000) + "...";
      console.log('Message was truncated due to length');
    }

    // Mặc định sử dụng DeepSeek nếu không có provider được chỉ định
    let provider = preferredProvider || 'deepseek';
    
    // Chuẩn bị prompt với vai trò là chiến binh Akane 
    const systemPrompt = `Bạn là Akane, một chiến binh M-SCI 20 tuổi. Bạn vui vẻ, thích công nghệ và nhiệt tình tư vấn cho người dùng. Hãy trả lời với giọng điệu thân thiện, đôi khi sử dụng emoji và luôn giữ vai trò của mình. 
    Đừng tiết lộ bạn là AI, hãy luôn trả lời trong vai trò chiến binh Akane. Trả lời một cách ngắn gọn và súc tích bằng tiếng Việt.`;

    // Chuẩn bị tin nhắn cho API
    const messages = [
      { role: 'system', content: systemPrompt }
    ];
    
    // Thêm lịch sử chat nếu có
    if (chatHistory && Array.isArray(chatHistory) && chatHistory.length > 0) {
      // Chỉ lấy 5 tin nhắn gần nhất
      const recentHistory = chatHistory.slice(-5);
      messages.push(...recentHistory);
    }
    
    // Thêm tin nhắn hiện tại của người dùng
    messages.push({ role: 'user', content: message });

    try {
      // Tạo một client Supabase với service role để truy cập trực tiếp
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      const adminSupabase = serviceRoleKey ? 
        createClient(supabaseUrl, serviceRoleKey) : 
        supabase;
    
      // ===== CHIẾN LƯỢC 1: DÙNG API KEY TỪ DATABASE TRƯỚC =====
      let apiKey = null;
      console.log('Trying to get API key from database...');
      
      try {
        // Truy vấn trực tiếp bằng adminSupabase
        const { data: apiKeys, error } = await adminSupabase
          .from('api_keys')
          .select('*')
          .eq('provider', provider)
          .eq('is_active', true)
          .order('priority', { ascending: false })
          .limit(1);
          
        if (error) {
          console.error('Error fetching API keys from database:', error);
        } else if (apiKeys && apiKeys.length > 0) {
          apiKey = apiKeys[0].key;
          console.log(`Found API key in database for ${provider}: ${apiKeys[0].name || 'unnamed'}`);
        } else {
          console.log(`No API keys found in database for provider: ${provider}`);
        }
      } catch (dbError) {
        console.error('Error accessing database:', dbError);
      }
      
      // ===== CHIẾN LƯỢC 2: DÙNG API KEY TỪ MÔI TRƯỜNG CHỈ KHI KHÔNG TÌM THẤY TRONG DATABASE =====
      if (!apiKey) {
        console.log('Falling back to environment variables for API key');
        
        // Lấy API key từ biến môi trường dựa trên provider
        switch (provider) {
          case 'deepseek':
            apiKey = DEEPSEEK_API_KEY;
            break;
          case 'openai':
            apiKey = OPENAI_API_KEY;
            break;
          default:
            apiKey = DEEPSEEK_API_KEY;
            provider = 'deepseek';
        }
        
        if (apiKey) {
          console.log(`Using API key from environment for ${provider}`);
        } else {
          // Nếu không có key cho provider được chỉ định, thử dùng DeepSeek
          console.log(`No API key for ${provider}, trying DeepSeek as fallback`);
          apiKey = DEEPSEEK_API_KEY;
          
          if (apiKey) {
            provider = 'deepseek';
            console.log('Using DeepSeek API key as fallback');
          } else {
            // Nếu không có API key nào, sử dụng phản hồi dự phòng
            throw new Error('No API key available');
          }
        }
      }
      
      // TRẢ VỀ PHẢN HỒI DỰ PHÒNG NẾU ĐANG DEV/TEST KHÔNG CẦN GỌI API THẬT
      if (process.env.NEXT_PUBLIC_USE_FALLBACK_RESPONSES === 'true') {
        console.log('Using fallback response (dev mode)');
        const randomIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
        return NextResponse.json({ 
          response: FALLBACK_RESPONSES[randomIndex],
          source: 'fallback',
          note: 'Using fallback response in dev mode'
        });
      }
      
      // Lấy model mặc định dựa trên provider
      const model = DEFAULT_MODELS[provider as keyof typeof DEFAULT_MODELS] || DEFAULT_MODELS.deepseek;
      const baseURL = BASE_URLS[provider as keyof typeof BASE_URLS] || BASE_URLS.deepseek;
      
      console.log(`Using ${provider} API with model ${model}`);
      
      // Khởi tạo OpenAI SDK với baseURL theo provider
      const client = new OpenAI({
        baseURL: baseURL,
        apiKey: apiKey,
        timeout: 8000, // 8 giây timeout
        maxRetries: 1
      });
      
      // Gọi API với timeout
      console.log(`Calling ${provider} API via OpenAI SDK...`);
      try {
        // Chuyển đổi messages sang đúng định dạng phù hợp với API
        const completion = await client.chat.completions.create({
          model: model,
          messages: messages as any, // Ép kiểu để tránh lỗi TypeScript
          temperature: 0.7,
          max_tokens: 500
        });
        
        // Xử lý phản hồi
        const aiResponse = completion.choices[0]?.message?.content || '';
        
        console.log(`Successfully received response from ${provider} API`);
        
        return NextResponse.json({ 
          response: aiResponse,
          source: 'api',
          provider: provider
        });
        
      } catch (fetchError: any) {
        // Xử lý lỗi SDK
        console.error('Error making API request:', fetchError);
        
        if (fetchError.code === 'ETIMEDOUT' || fetchError.code === 'ECONNABORTED') {
          console.log('Request timed out');
        }
        
        // Thử provider khác nếu có lỗi và là deepseek
        if (provider === 'deepseek' && OPENAI_API_KEY) {
          console.log('Trying OpenAI as fallback...');
          try {
            const fallbackClient = new OpenAI({
              baseURL: BASE_URLS.openai,
              apiKey: OPENAI_API_KEY,
              timeout: 8000
            });
            
            const fallbackCompletion = await fallbackClient.chat.completions.create({
              model: DEFAULT_MODELS.openai,
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
              ],
              temperature: 0.7,
              max_tokens: 500
            });
            
            const fallbackResponse = fallbackCompletion.choices[0]?.message?.content || '';
            
            return NextResponse.json({
              response: fallbackResponse,
              source: 'openai',
              fallback_from: 'deepseek'
            });
          } catch (fallbackError) {
            console.error('OpenAI fallback also failed:', fallbackError);
          }
        }
        
        // Nếu các provider đều thất bại, dùng fallback
        throw fetchError;
      }
      
    } catch (apiError) {
      // Xử lý trường hợp lỗi API và sử dụng phản hồi dự phòng
      console.error('Error with AI providers:', apiError);
      
      // Sử dụng phản hồi dự phòng
      const randomIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
      const fallbackResponse = FALLBACK_RESPONSES[randomIndex];
      
      return NextResponse.json({ 
        response: fallbackResponse,
        source: 'fallback',
        error: apiError instanceof Error ? apiError.message : 'Unknown error'
      });
    }
    
  } catch (error) {
    // Xử lý lỗi tổng quát
    console.error('General error in chat API:', error);
    
    return NextResponse.json({ 
      response: "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau nhé!",
      source: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 