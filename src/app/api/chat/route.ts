import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ApiKeyService } from '@/components/admin/chatbot-management/ApiKeyService';

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

// DeepSeek API key từ environment variable (sẽ được sử dụng làm fallback nếu không lấy được key từ database)
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
if (!DEEPSEEK_API_KEY) {
  console.warn('DEEPSEEK_API_KEY is not set in environment variables, will try to use from database');
}

// API URLs for different providers
const API_URLS = {
  deepseek: 'https://api.deepseek.com/v1/chat/completions',
  openai: 'https://api.openai.com/v1/chat/completions',
  anthropic: 'https://api.anthropic.com/v1/messages',
  mistral: 'https://api.mistral.ai/v1/chat/completions'
};

// API Models for different providers
const DEFAULT_MODELS = {
  deepseek: 'deepseek-chat',
  openai: 'gpt-3.5-turbo',
  anthropic: 'claude-3-sonnet-20240229',
  mistral: 'mistral-medium'
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
    const { message, chatHistory, preferredProvider } = body;
    
    console.log('Received message:', message);
    console.log('Chat history length:', chatHistory?.length || 0);
    console.log('Preferred provider from body:', preferredProvider || 'not specified');

    // Kiểm tra và log tất cả header
    console.log('Request headers:');
    for (const [key, value] of request.headers.entries()) {
      console.log(`  ${key}: ${key === 'x-chatbot-api-config' ? 'FOUND' : value}`);
    }

    // Kiểm tra cấu hình từ API
    const configFromHeaders = request.headers.get('x-chatbot-api-config');
    console.log('Raw config from headers:', configFromHeaders);
    
    if (configFromHeaders) {
      try {
        const config = JSON.parse(configFromHeaders);
        console.log('Config from headers found:', config);
        
        // Kiểm tra chi tiết nội dung cấu hình
        if (!config.provider || !config.apiKeyId) {
          console.error('Invalid config structure from headers:', config);
        }
        
        // Nếu client đã chỉ định cụ thể provider và apiKeyId
        if (config.provider && config.apiKeyId) {
          // Ưu tiên TUYỆT ĐỐI sử dụng provider từ cấu hình client
          preferredProvider = config.provider;
          console.log(`PROVIDER OVERRIDE: Using client-specified provider: ${preferredProvider}`);
          
          // Lấy API key cụ thể từ database theo ID
          try {
            const keyData = await ApiKeyService.getApiKeyById(config.apiKeyId);
            const keyDataSummary = keyData ? {
              id: keyData.id,
              provider: keyData.provider,
              is_active: keyData.is_active,
              name: keyData.name
            } : 'null';
            
            console.log('API key data fetched from database:', keyDataSummary);
            
            if (keyData && keyData.is_active) {
              // Chỉ dùng key nếu nó khớp với provider đã chọn
              if (keyData.provider === preferredProvider) {
                apiKey = keyData.key;
                console.log(`SUCCESS: Using API key (ID: ${config.apiKeyId}, Name: ${keyData.name}) for provider: ${preferredProvider}`);
              } else {
                console.error(`ERROR: API key (ID: ${config.apiKeyId}) belongs to provider "${keyData.provider}" but we need "${preferredProvider}"`);
              }
            } else {
              console.error(`ERROR: API key ID ${config.apiKeyId} not found or not active`);
            }
          } catch (keyError) {
            console.error('Error fetching API key by ID:', keyError);
          }
        }
      } catch (parseError) {
        console.error('Error parsing config from headers:', parseError);
      }
    } else {
      console.warn('No API config found in headers - will use default provider');
    }

    if (!message) {
      return NextResponse.json(
        { error: 'Tin nhắn không được để trống' },
        { status: 400 }
      );
    }

    // Kiểm tra kết nối Supabase
    let supabaseConnectionOk = false;
    try {
      if (DEBUG_MODE) console.log('Checking Supabase connection');
      // Cố gắng truy vấn một bảng không tồn tại để kiểm tra kết nối
      const { error } = await supabase.from('_supabase').select('*').limit(1);
      
      // Nếu lỗi "relation không tồn tại", điều này bình thường vì bảng _supabase không tồn tại thực sự
      if (error && error.message.includes('does not exist')) {
        supabaseConnectionOk = true;
        console.log('Supabase connection OK (expected error for non-existent table)');
      } else if (error) {
        console.error('Supabase connection error:', error);
      } else {
        supabaseConnectionOk = true;
        console.log('Supabase connection OK');
      }
    } catch (connError) {
      console.error('Supabase connection test failed:', connError);
    }

    // Phương án 1: Kiểm tra xem có câu trả lời cứng phù hợp không
    const messageLower = message.toLowerCase().trim();
    for (const [key, value] of Object.entries(COMMON_QA)) {
      if (messageLower.includes(key)) {
        if (DEBUG_MODE) console.log(`Found hardcoded response for: ${key}`);
        if (USE_HARDCODED_RESPONSES) {
          // Ghi log khi sử dụng hardcoded response
          await logApiUsage({
            tokens_used: value.length,  // Sử dụng độ dài của câu trả lời làm tokens
            request_type: 'hardcoded_response',
            status: 'success',
            message_content: message.substring(0, 100),
            provider: 'hardcoded'
          });
          
          return NextResponse.json({ 
            response: value,
            source: 'hardcoded',
            provider: 'hardcoded'
          });
        }
      }
    }

    // Phương án 2: Tìm câu trả lời từ cơ sở dữ liệu Supabase
    if (supabaseConnectionOk) {
      try {
        if (DEBUG_MODE) console.log('Checking Supabase for existing answers');
        const { data: qaData, error: qaError } = await supabase
          .from('chat_qa')
          .select('answer')
          .ilike('question', `%${message}%`)
          .limit(1);

        if (qaError) {
          console.error('Supabase query error:', qaError);
        } else if (DEBUG_MODE) {
          console.log('Supabase query successful, found answers:', qaData?.length || 0);
        }

        // Nếu tìm thấy câu trả lời trong database, trả về ngay lập tức
        if (qaData && qaData.length > 0) {
          if (DEBUG_MODE) console.log('Found answer in database:', qaData[0].answer.substring(0, 50) + '...');
          
          // Ghi log khi sử dụng câu trả lời từ database
          await logApiUsage({
            tokens_used: qaData[0].answer.length,  // Sử dụng độ dài của câu trả lời làm tokens
            request_type: 'database_response',
            status: 'success',
            message_content: message.substring(0, 100),
            provider: 'database'
          });
          
          return NextResponse.json({ 
            response: qaData[0].answer,
            source: 'database',
            provider: 'database'
          });
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Tiếp tục với DeepSeek nếu database lỗi
      }
    } else {
      console.log('Skipping database query due to connection issues');
    }

    // Phương án 3: Gọi API của các provider (DeepSeek, OpenAI, v.v...)
    try {
      if (DEBUG_MODE) console.log('Preparing to call AI provider API');
      
      // Chuẩn bị prompt với vai trò là chiến binh Akane
      const systemPrompt = `Bạn là Akane, một chiến binh M-SCI 20 tuổi. Bạn vui vẻ, thích công nghệ và nhiệt tình tư vấn cho người dùng. Hãy trả lời với giọng điệu thân thiện, đôi khi sử dụng emoji và luôn giữ vai trò của mình. 
      Đừng tiết lộ bạn là AI, hãy luôn trả lời trong vai trò chiến binh Akane. Trả lời một cách ngắn gọn và súc tích.`;

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

      // Khởi tạo các biến cho việc chọn provider và API key
      let apiKey = null;
      let provider = preferredProvider || 'deepseek'; // Giá trị mặc định ban đầu
      
      // Nếu không có key từ cấu hình client, thử các phương án khác
      if (!apiKey) {
        // Thử lấy key từ env vars cho provider được chọn
        if (provider === 'deepseek' && DEEPSEEK_API_KEY) {
          console.log('Using DEEPSEEK_API_KEY from environment variables');
          apiKey = DEEPSEEK_API_KEY;
        } else if (provider === 'openai' && process.env.OPENAI_API_KEY) {
          console.log('Using OPENAI_API_KEY from environment variables');
          apiKey = process.env.OPENAI_API_KEY;
        } else if (provider === 'anthropic' && process.env.ANTHROPIC_API_KEY) {
          console.log('Using ANTHROPIC_API_KEY from environment variables');
          apiKey = process.env.ANTHROPIC_API_KEY;
        } else if (provider === 'mistral' && process.env.MISTRAL_API_KEY) {
          console.log('Using MISTRAL_API_KEY from environment variables');
          apiKey = process.env.MISTRAL_API_KEY;
        } else {
          console.log(`No API key found in environment variables for provider: ${provider}`);
        }
        
        // Nếu không tìm thấy từ env vars, thử lấy từ database cho provider đã chọn
        if (!apiKey) {
          try {
            // Lấy API key từ database cho provider cụ thể đã chọn
            const apiKeyData = await ApiKeyService.getActiveApiKey(provider);
            
            if (apiKeyData) {
              apiKey = apiKeyData.key;
              console.log(`Using ${provider} API key from database`);
            } else {
              console.log(`No active key found for provider ${provider} in database`);
              
              // Nếu không tìm thấy key cho provider đã chọn, 
              // thử tìm bất kỳ key nào đang hoạt động cho các provider khác
              console.log('Trying to find any available key from other providers...');
              const fallbackKey = await ApiKeyService.getActiveApiKey();
              
              if (fallbackKey) {
                apiKey = fallbackKey.key;
                provider = fallbackKey.provider; // Cập nhật provider dựa trên key
                console.log(`Using fallback provider: ${provider}`);
              }
            }
          } catch (keyError) {
            console.error('Error fetching API key from database:', keyError);
          }
        }
      }
      
      // In thêm chi tiết để debug
      console.log('Debug - API Key Found:', apiKey ? 'Yes' : 'No');
      console.log('Debug - Provider:', provider);
      
      // Nếu không tìm thấy key nào, trả về lỗi
      if (!apiKey) {
        console.error('No API key available');
        throw new Error('No API key available for any provider');
      }
      
      // Đảm bảo rằng API URL và model phù hợp với provider đã chọn
      let finalProvider = provider; // Lưu lại provider cuối cùng để theo dõi
      
      // Lấy URL API dựa trên provider
      let apiUrl = API_URLS[provider as keyof typeof API_URLS];
      if (!apiUrl) {
        console.warn(`Provider ${provider} không có API URL, dùng DeepSeek thay thế`);
        apiUrl = API_URLS.deepseek;
        finalProvider = 'deepseek';
      }
      
      // Lấy model mặc định dựa trên provider
      let model = DEFAULT_MODELS[provider as keyof typeof DEFAULT_MODELS];
      if (!model) {
        console.warn(`Provider ${provider} không có model mặc định, dùng DeepSeek thay thế`);
        model = DEFAULT_MODELS.deepseek;
        finalProvider = 'deepseek';
      }
      
      // In thông tin cuối cùng trước khi gọi API
      console.log(`FINAL CONFIG: Using ${finalProvider} with model ${model}`);
      
      if (finalProvider !== provider) {
        console.warn(`WARNING: Provider đã thay đổi từ ${provider} sang ${finalProvider} do thiếu cấu hình!`);
      }

      if (DEBUG_MODE) {
        console.log(`Calling ${finalProvider} API with model: ${model}`);
        console.log('First few characters of system prompt:', systemPrompt.substring(0, 50) + '...');
        console.log('Total messages being sent:', messages.length);
      }
      
      // Chuẩn bị request body dựa trên provider
      let requestBody;
      
      console.log(`[DEBUG] Preparing API call to ${finalProvider}`);
      console.log(`[DEBUG] Using API URL: ${apiUrl}`);
      console.log(`[DEBUG] API Key (first 4 chars): ${apiKey.substring(0, 4)}...`);
      
      switch (finalProvider) {
        case 'anthropic':
          // Claude API có format khác
          requestBody = {
            model: model,
            messages: messages.map(msg => ({
              role: msg.role === 'assistant' ? 'assistant' : msg.role === 'system' ? 'user' : 'user',
              content: msg.role === 'system' ? [{ type: 'text', text: `<instructions>${msg.content}</instructions>` }] : [{ type: 'text', text: msg.content }]
            })),
            max_tokens: 500
          };
          break;
          
        case 'deepseek':
          // DeepSeek có thể cần cấu hình đặc biệt
          requestBody = {
            model: model,
            messages: messages,
            temperature: 0.7,
            max_tokens: 500,
            stream: false
          };
          break;
          
        default:
          // OpenAI, Mistral có format tương tự nhau
          requestBody = {
            model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 500
          };
      }
      
      console.log(`[DEBUG] Request body:`, JSON.stringify(requestBody).substring(0, 100) + '...');
      
      // Chuẩn bị headers dựa trên provider
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      };
      
      // Thêm headers đặc biệt nếu cần
      if (finalProvider === 'anthropic') {
        headers['anthropic-version'] = '2023-06-01';
      }
      
      console.log(`[DEBUG] Headers (excluding auth):`, Object.keys(headers).filter(k => k !== 'Authorization'));
      
      // Gọi API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { text: errorText };
        }
        
        console.error(`${finalProvider} API error (${response.status}):`, errorData);
        console.error(`Full error details for ${finalProvider}:`, {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries([...response.headers.entries()]),
          errorData: errorData,
          requestDetails: {
            url: apiUrl,
            model: model,
            messageCount: messages.length,
          }
        });
        
        // Ghi nhận sử dụng API để quyết định có nên disable key này không
        try {
          if (apiKey !== DEEPSEEK_API_KEY) { // Chỉ ghi nhận nếu không phải key từ env
            const keyData = await ApiKeyService.getApiKeys();
            const matchingKey = keyData.find(k => k.key === apiKey);
            if (matchingKey) {
              // Nếu key bị lỗi do rate limit hay authentication, có thể cân nhắc disable
              const shouldDisable = errorData.error?.type === 'authentication_error' || 
                                   errorData.error?.code === 'rate_limit_exceeded';
              
              if (shouldDisable) {
                console.log(`Auto-disabling API key ${matchingKey.id} due to serious error`);
                await ApiKeyService.toggleApiKeyStatus(matchingKey.id, false);
              } else {
                // Vẫn ghi nhận lần sử dụng dù bị lỗi
                await ApiKeyService.recordApiKeyUsage(matchingKey.id);
              }
            }
          }
        } catch (recordError) {
          console.error('Error recording API key usage:', recordError);
        }
        
        throw new Error(`${finalProvider} API error: ` + (errorData.error?.message || response.statusText || errorText));
      }

      const data = await response.json();
      if (DEBUG_MODE) console.log(`Received response from ${finalProvider} API`);
      
      // Xử lý dữ liệu phản hồi dựa trên provider
      let aiResponse;
      switch (finalProvider) {
        case 'anthropic':
          if (!data.content || !data.content[0] || !data.content[0].text) {
            throw new Error('Invalid response format from Anthropic API');
          }
          aiResponse = data.content[0].text;
          break;
          
        default:
          // DeepSeek, OpenAI, Mistral có format tương tự nhau
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error(`Invalid response format from ${finalProvider} API`);
          }
          aiResponse = data.choices[0].message.content;
      }
      
      if (DEBUG_MODE) console.log(`${finalProvider} response:`, aiResponse.substring(0, 50) + '...');

      // Ghi nhận sử dụng API thành công
      try {
        // Ghi nhận sử dụng vào API key
        if (apiKey !== DEEPSEEK_API_KEY) { // Chỉ ghi nhận nếu không phải key từ env
          const keyData = await ApiKeyService.getApiKeys();
          const matchingKey = keyData.find(k => k.key === apiKey);
          if (matchingKey) {
            await ApiKeyService.recordApiKeyUsage(matchingKey.id);
          }
        }
      } catch (recordError) {
        console.error('Error recording API key usage:', recordError);
      }
      
      // Ghi log việc sử dụng API thành công
      // Lấy số token từ response nếu có
      const tokens_used = data.usage?.total_tokens || 0;
      // Thêm log để theo dõi
      console.log(`======= GHI LOG API USAGE - ${finalProvider.toUpperCase()} SUCCESS =======`);
      console.log('Tokens:', tokens_used, 'Type: chat_completion', 'Status: success');
      
      try {
        await logApiUsage({
          tokens_used,
          request_type: 'chat_completion',
          status: 'success',
          message_content: message.substring(0, 100), // Chỉ lưu 100 ký tự đầu tiên
          provider: finalProvider
        });
        console.log(`✅ Đã ghi log ${finalProvider} API thành công`);
      } catch (logUsageError) {
        console.error(`❌ Lỗi khi ghi log ${finalProvider} API:`, logUsageError);
      }

      return NextResponse.json({ 
        response: aiResponse,
        source: 'api',
        provider: finalProvider
      });
    } catch (apiError) {
      console.error('AI provider API error:', apiError);
      
      // Ghi log lỗi API 
      // Thêm log để theo dõi
      console.log('======= GHI LOG API USAGE - ERROR =======');
      console.log('Error:', apiError instanceof Error ? apiError.message : 'Unknown error');
      
      try {
        // Lấy thông tin provider từ error message hoặc sử dụng 'unknown'
        const errorProvider = 
          (apiError instanceof Error && 
           apiError.message.includes('API error:') && 
           apiError.message.split('API error:')[0].trim()) || 'unknown';
        
        // Thử gọi API khác nếu ban đầu là DeepSeek
        if (errorProvider === 'deepseek') {
          try {
            console.log('DeepSeek API failed, trying to use OpenAI as fallback...');
            // Tìm OpenAI API key
            const openaiKey = await ApiKeyService.getActiveApiKey('openai');
            
            if (openaiKey) {
              console.log('Found OpenAI API key, making fallback request');
              const openaiUrl = API_URLS.openai;
              const openaiModel = DEFAULT_MODELS.openai;
              
              // Tạo system prompt mới
              const fallbackSystemPrompt = `Bạn là Akane, một chiến binh M-SCI 20 tuổi. Bạn vui vẻ, thích công nghệ và nhiệt tình tư vấn cho người dùng. Hãy trả lời với giọng điệu thân thiện, đôi khi sử dụng emoji và luôn giữ vai trò của mình. 
              Đừng tiết lộ bạn là AI, hãy luôn trả lời trong vai trò chiến binh Akane. Trả lời một cách ngắn gọn và súc tích.`;
              
              // Tạo messages mới từ message gốc
              const fallbackMessages = [
                { role: 'system', content: fallbackSystemPrompt },
                { role: 'user', content: message }
              ];
              
              const openaiHeaders = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiKey.key}`
              };
              
              const openaiRequestBody = {
                model: openaiModel,
                messages: fallbackMessages,
                temperature: 0.7,
                max_tokens: 500
              };
              
              const openaiResponse = await fetch(openaiUrl, {
                method: 'POST',
                headers: openaiHeaders,
                body: JSON.stringify(openaiRequestBody)
              });
              
              if (openaiResponse.ok) {
                const openaiData = await openaiResponse.json();
                if (openaiData.choices && openaiData.choices[0] && openaiData.choices[0].message) {
                  const openaiAnswer = openaiData.choices[0].message.content;
                  
                  // Ghi log thành công cho OpenAI
                  await logApiUsage({
                    tokens_used: openaiData.usage?.total_tokens || 0,
                    request_type: 'chat_completion_fallback',
                    status: 'success',
                    message_content: message.substring(0, 100),
                    provider: 'openai'
                  });
                  
                  // Trả về câu trả lời từ OpenAI
                  return NextResponse.json({ 
                    response: openaiAnswer,
                    source: 'openai',
                    fallback_from: 'deepseek'
                  });
                }
              }
            }
          } catch (fallbackError) {
            console.error('Error using OpenAI as fallback:', fallbackError);
          }
        }
      } catch (fallbackProcessError) {
        console.error('Error in fallback process:', fallbackProcessError);
      }
      
      try {
        await logApiUsage({
          tokens_used: 0,
          request_type: 'chat_completion',
          status: 'error',
          error: apiError instanceof Error ? apiError.message : 'Unknown error',
          message_content: message.substring(0, 100),
          provider: 'unknown'
        });
        console.log('✅ Đã ghi log lỗi API thành công');
      } catch (logUsageError) {
        console.error('❌ Lỗi khi ghi log lỗi API:', logUsageError);
      }
      
      // Sử dụng fallback response nếu API không hoạt động
      const randomIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
      const fallbackResponse = FALLBACK_RESPONSES[randomIndex];
      
      if (DEBUG_MODE) console.log('Using fallback response');
      
      // Ghi log khi sử dụng fallback response
      console.log('Ghi log cho fallback response...');
      try {
        await logApiUsage({
          tokens_used: fallbackResponse.length,  // Sử dụng độ dài của câu trả lời làm tokens
          request_type: 'fallback_response',
          status: 'success',
          error: apiError instanceof Error ? apiError.message : 'Unknown API error',
          message_content: message.substring(0, 100),
          provider: 'fallback'
        });
        console.log('Đã ghi log fallback response thành công');
      } catch (logError) {
        console.error('Lỗi khi ghi log fallback response:', logError);
      }
      
      return NextResponse.json({ 
        response: fallbackResponse,
        fallback: true,
        source: 'fallback'
      });
    }
  } catch (error) {
    console.error('General error in chat API:', error);
    return NextResponse.json(
      { 
        error: 'Có lỗi xảy ra khi xử lý yêu cầu chat', 
        details: error instanceof Error ? error.message : 'Unknown error',
        source: 'error'
      },
      { status: 500 }
    );
  }
} 