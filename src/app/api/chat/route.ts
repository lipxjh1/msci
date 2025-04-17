import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

// DeepSeek API key từ environment variable
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
if (!DEEPSEEK_API_KEY) {
  console.error('DEEPSEEK_API_KEY is not set in environment variables');
}
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Cấu hình và chế độ - có thể thay đổi để debug
const USE_HARDCODED_RESPONSES = false;  // Sử dụng câu trả lời cứng nếu API không hoạt động
const DEBUG_MODE = true;               // In thêm thông tin debug

// Interface định nghĩa kiểu tin nhắn cho API
interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Tin nhắn fallback khi không thể kết nối với DeepSeek API
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
  message_content = ''
}: {
  tokens_used: number;
  request_type: string;
  status: string;
  error?: string | null;
  message_content?: string;
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
    console.log('API route triggered');
    const body = await request.json();
    const { message, chatHistory } = body;
    
    console.log('Received message:', message);
    console.log('Chat history length:', chatHistory?.length || 0);

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
            message_content: message.substring(0, 100)
          });
          
          return NextResponse.json({ 
            response: value,
            source: 'hardcoded'
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
            message_content: message.substring(0, 100)
          });
          
          return NextResponse.json({ 
            response: qaData[0].answer,
            source: 'database' 
          });
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Tiếp tục với DeepSeek nếu database lỗi
      }
    } else {
      console.log('Skipping database query due to connection issues');
    }

    // Phương án 3: Gọi DeepSeek API
    try {
      if (DEBUG_MODE) console.log('Preparing DeepSeek API call');
      
      // Chuẩn bị prompt với vai trò là chiến binh Akane
      const systemPrompt = `Bạn là Akane, một chiến binh M-SCI 20 tuổi. Bạn vui vẻ, thích công nghệ và nhiệt tình tư vấn cho người dùng. Hãy trả lời với giọng điệu thân thiện, đôi khi sử dụng emoji và luôn giữ vai trò của mình. 
      Đừng tiết lộ bạn là AI, hãy luôn trả lời trong vai trò chiến binh Akane. Trả lời một cách ngắn gọn và súc tích.`;

      // Chuẩn bị tin nhắn cho DeepSeek API
      const messages: ChatMessage[] = [
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

      if (DEBUG_MODE) {
        console.log('Calling DeepSeek API with model: deepseek-chat');
        console.log('First few characters of system prompt:', systemPrompt.substring(0, 50) + '...');
        console.log('Total messages being sent:', messages.length);
      }
      
      // Gọi DeepSeek API
      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: messages,
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { text: errorText };
        }
        
        console.error('DeepSeek API error:', errorData);
        throw new Error('DeepSeek API error: ' + (errorData.error?.message || response.statusText || errorText));
      }

      const data = await response.json();
      if (DEBUG_MODE) console.log('Received response from DeepSeek API');
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('Invalid response format from DeepSeek:', data);
        throw new Error('Invalid response format from DeepSeek API');
      }
      
      const aiResponse = data.choices[0].message.content;
      if (DEBUG_MODE) console.log('DeepSeek response:', aiResponse.substring(0, 50) + '...');

      // Ghi log việc sử dụng API thành công
      // Lấy số token từ response của DeepSeek nếu có
      const tokens_used = data.usage?.total_tokens || 0;
      // Thêm log để theo dõi
      console.log('======= GHI LOG API USAGE - DEEPSEEK SUCCESS =======');
      console.log('Tokens:', tokens_used, 'Type: chat_completion', 'Status: success');
      
      try {
        await logApiUsage({
          tokens_used,
          request_type: 'chat_completion',
          status: 'success',
          message_content: message.substring(0, 100) // Chỉ lưu 100 ký tự đầu tiên
        });
        console.log('✅ Đã ghi log DeepSeek API thành công');
      } catch (logUsageError) {
        console.error('❌ Lỗi khi ghi log DeepSeek API:', logUsageError);
      }
      
      return NextResponse.json({ 
        response: aiResponse,
        source: 'deepseek' 
      });
    } catch (apiError) {
      console.error('DeepSeek API error:', apiError);
      
      // Ghi log lỗi API 
      // Thêm log để theo dõi
      console.log('======= GHI LOG API USAGE - DEEPSEEK ERROR =======');
      console.log('Error:', apiError instanceof Error ? apiError.message : 'Unknown error');
      
      try {
        await logApiUsage({
          tokens_used: 0,
          request_type: 'chat_completion',
          status: 'error',
          error: apiError instanceof Error ? apiError.message : 'Unknown error',
          message_content: message.substring(0, 100)
        });
        console.log('✅ Đã ghi log lỗi DeepSeek API thành công');
      } catch (logUsageError) {
        console.error('❌ Lỗi khi ghi log lỗi DeepSeek API:', logUsageError);
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
          message_content: message.substring(0, 100)
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