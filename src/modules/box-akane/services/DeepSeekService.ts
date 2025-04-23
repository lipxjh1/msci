import { supabase } from '@/utils/supabase';
import { ApiKey, Message, DeepSeekConfig, ChatResponse } from '../types';
import OpenAI from 'openai';

export class DeepSeekService {
  private static BASE_URL = 'https://api.deepseek.com';

  /**
   * Lấy API key từ Supabase cho DeepSeek
   * Trả về key có mức ưu tiên cao nhất và đang active
   */
  static async getApiKey(): Promise<ApiKey | null> {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('provider', 'deepseek')
        .eq('is_active', true)
        .order('priority', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Lỗi khi lấy DeepSeek API key:', error);
        return null;
      }

      if (!data || data.length === 0) {
        console.warn('Không tìm thấy DeepSeek API key nào đang hoạt động');
        return null;
      }

      return data[0] as ApiKey;
    } catch (error) {
      console.error('Lỗi không xác định khi lấy API key:', error);
      return null;
    }
  }

  /**
   * Gửi tin nhắn đến DeepSeek API (non-streaming)
   */
  static async chat(
    messages: Message[],
    config: DeepSeekConfig
  ): Promise<ChatResponse> {
    try {
      // Lấy API key
      const apiKey = await this.getApiKey();
      if (!apiKey || !apiKey.key) {
        return {
          response: 'Không tìm thấy API key hợp lệ cho DeepSeek',
          error: 'missing_api_key',
          source: 'deepseek_service'
        };
      }

      // Khởi tạo OpenAI client
      const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: apiKey.key,
        timeout: 60000, // 60 giây
        maxRetries: 2,
        dangerouslyAllowBrowser: true
      });

      // Chuẩn bị tham số
      const { model, temperature = 0.7, maxTokens = 800 } = config;

      // Gọi API
      console.log(`Đang gọi DeepSeek API với model ${model}...`);
      const completion = await openai.chat.completions.create({
        model,
        messages: messages as any, // Type casting do có thể khác biệt nhỏ giữa kiểu OpenAI và kiểu tự định nghĩa
        temperature,
        max_tokens: maxTokens
      });

      // Trả về kết quả
      return {
        response: completion.choices[0]?.message?.content || '',
        provider: 'deepseek',
        model
      };
    } catch (error: any) {
      console.error('Lỗi khi gọi DeepSeek API:', error);
      return {
        response: `Lỗi khi gọi DeepSeek API: ${error.message || 'Không xác định'}`,
        error: error.message || 'unknown_error',
        source: 'deepseek_service'
      };
    }
  }

  /**
   * Gửi tin nhắn đến DeepSeek API (streaming)
   */
  static async chatStream(
    messages: Message[],
    config: DeepSeekConfig,
    onMessage: (chunk: string) => void,
    onComplete: (fullResponse: string) => void,
    onError: (error: string) => void
  ): Promise<void> {
    try {
      // Lấy API key
      const apiKey = await this.getApiKey();
      if (!apiKey || !apiKey.key) {
        onError('Không tìm thấy API key hợp lệ cho DeepSeek');
        return;
      }

      // Khởi tạo OpenAI client
      const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: apiKey.key,
        timeout: 60000, // 60 giây
        maxRetries: 2,
        dangerouslyAllowBrowser: true
      });

      // Chuẩn bị tham số
      const { model, temperature = 0.7, maxTokens = 800 } = config;

      // Gọi API với streaming
      console.log(`Đang gọi DeepSeek API (streaming) với model ${model}...`);
      const stream = await openai.chat.completions.create({
        model,
        messages: messages as any,
        temperature,
        max_tokens: maxTokens,
        stream: true
      });

      let fullResponse = '';

      // Xử lý từng chunk từ stream
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          fullResponse += content;
          onMessage(content);
        }
      }

      // Hoàn thành stream
      onComplete(fullResponse);
    } catch (error: any) {
      console.error('Lỗi khi gọi DeepSeek API stream:', error);
      onError(error.message || 'Lỗi không xác định khi gọi DeepSeek API');
    }
  }

  /**
   * Cập nhật thông tin sử dụng API key
   */
  static async updateApiKeyUsage(apiKeyId: number, tokensUsed: number): Promise<void> {
    try {
      // Lấy thông tin API key hiện tại
      const { data: keyData, error: keyError } = await supabase
        .from('api_keys')
        .select('usage_count, remaining_quota')
        .eq('id', apiKeyId)
        .single();

      if (keyError) {
        console.error('Lỗi khi lấy thông tin API key:', keyError);
        return;
      }

      // Cập nhật thông tin sử dụng
      const newUsageCount = (keyData.usage_count || 0) + 1;
      const newRemainingQuota = keyData.remaining_quota 
        ? Math.max(0, keyData.remaining_quota - tokensUsed) 
        : null;

      // Cập nhật vào database
      const { error: updateError } = await supabase
        .from('api_keys')
        .update({ 
          usage_count: newUsageCount,
          remaining_quota: newRemainingQuota,
          last_used_at: new Date().toISOString()
        })
        .eq('id', apiKeyId);

      if (updateError) {
        console.error('Lỗi khi cập nhật thông tin API key:', updateError);
      }
    } catch (error) {
      console.error('Lỗi không xác định khi cập nhật thông tin API key:', error);
    }
  }
} 