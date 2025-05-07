import { supabase } from '@/tien_ich/supabase';
import { ChatbotMessage, ApiUsageStats, ApiUsageLog } from '@/types/chatbot';

interface UpdateData {
  question?: string;
  answer?: string;
  updated_at: string;
}

interface DailyStats {
  calls: number;
  tokens: number;
  cost: number;
}

interface ProviderStats {
  calls: number;
  tokens: number;
  cost: number;
  success_count: number;
}

export const ChatbotService = {
  async getChatbotMessages(page: number = 1, limit: number = 10, searchTerm: string = '') {
    try {
      let query = supabase
        .from('chat_qa')
        .select('*', { count: 'exact' });

      if (searchTerm) {
        query = query.or(`question.ilike.%${searchTerm}%,answer.ilike.%${searchTerm}%`);
      }

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (error) throw error;

      return {
        data: data as ChatbotMessage[],
        count: count || 0,
      };
    } catch (error) {
      console.error('Error fetching chatbot messages:', error);
      throw error;
    }
  },

  async createChatbotMessage(message: Omit<ChatbotMessage, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('chat_qa')
        .insert([{
          question: message.question,
          answer: message.answer
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating chatbot message:', error);
      throw error;
    }
  },

  async updateChatbotMessage(id: number, message: Partial<ChatbotMessage>) {
    try {
      const updateData: UpdateData = {
        updated_at: new Date().toISOString()
      };
      
      if (message.question) updateData.question = message.question;
      if (message.answer) updateData.answer = message.answer;

      const { data, error } = await supabase
        .from('chat_qa')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating chatbot message:', error);
      throw error;
    }
  },

  async deleteChatbotMessage(id: number) {
    try {
      const { error } = await supabase
        .from('chat_qa')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting chatbot message:', error);
      throw error;
    }
  },

  async getChatbotMessageById(id: number) {
    try {
      const { data, error } = await supabase
        .from('chat_qa')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as ChatbotMessage;
    } catch (error) {
      console.error('Error fetching chatbot message:', error);
      throw error;
    }
  },

  async getApiUsageStats(startDate?: string, endDate?: string): Promise<ApiUsageStats> {
    try {
      console.log('Fetching API usage stats for period:', { startDate, endDate });
      
      let query = supabase
        .from('api_usage_logs')
        .select('*');

      if (startDate) {
        query = query.gte('timestamp', `${startDate}T00:00:00Z`);
      }
      if (endDate) {
        query = query.lte('timestamp', `${endDate}T23:59:59Z`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Supabase error when fetching API usage:', error);
        throw error;
      }

      console.log('Raw API usage data:', data);

      const stats: ApiUsageStats = {
        total_calls: 0,
        total_tokens: 0,
        total_cost: 0,
        success_rate: 0,
        usage_by_date: [],
        usage_by_provider: []
      };

      if (!data || data.length === 0) {
        console.log('No API usage data found for the period');
        return stats;
      }

      // Calculate overall stats
      const successful_calls = data.filter(log => log.status === 'success').length;
      stats.total_calls = data.length;
      stats.total_tokens = data.reduce((sum, log) => sum + (log.tokens_used || 0), 0);
      stats.total_cost = data.reduce((sum, log) => sum + (log.cost || 0), 0);
      stats.success_rate = (successful_calls / data.length) * 100;

      console.log('Calculated stats:', stats);

      // Group by date
      const byDate = data.reduce((acc, log) => {
        const date = new Date(log.timestamp).toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = { calls: 0, tokens: 0, cost: 0 };
        }
        acc[date].calls++;
        acc[date].tokens += log.tokens_used || 0;
        acc[date].cost += log.cost || 0;
        return acc;
      }, {} as Record<string, DailyStats>);

      // Group by provider
      const byProvider = data.reduce((acc, log) => {
        // Nếu không có provider, sử dụng 'unknown'
        const provider = log.provider || 'unknown';
        if (!acc[provider]) {
          acc[provider] = { calls: 0, tokens: 0, cost: 0, success_count: 0 };
        }
        acc[provider].calls++;
        acc[provider].tokens += log.tokens_used || 0;
        acc[provider].cost += log.cost || 0;
        if (log.status === 'success') {
          acc[provider].success_count++;
        }
        return acc;
      }, {} as Record<string, ProviderStats>);

      // Use a type assertion for the entries array
      stats.usage_by_date = Object.entries(byDate).map(
        (entry) => {
          const [date, dailyStats] = entry as [string, DailyStats];
          return {
            date,
            calls: dailyStats.calls,
            tokens: dailyStats.tokens,
            cost: dailyStats.cost
          };
        }
      ).sort((a, b) => a.date.localeCompare(b.date));

      // Add provider stats
      stats.usage_by_provider = Object.entries(byProvider).map(
        (entry) => {
          const [provider, providerStats] = entry as [string, ProviderStats];
          return {
            provider,
            calls: providerStats.calls, 
            tokens: providerStats.tokens,
            cost: providerStats.cost,
            success_rate: (providerStats.success_count / providerStats.calls) * 100
          };
        }
      ).sort((a, b) => b.calls - a.calls); // Sắp xếp theo số lượng calls giảm dần

      console.log('Usage by date:', stats.usage_by_date);
      console.log('Usage by provider:', stats.usage_by_provider);

      return stats;
    } catch (error) {
      console.error('Error in getApiUsageStats:', error);
      throw error;
    }
  },

  async getRecentApiCalls(limit: number = 50): Promise<ApiUsageLog[]> {
    try {
      console.log('Fetching recent API calls, limit:', limit);
      
      const { data, error } = await supabase
        .from('api_usage_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Supabase error when fetching recent calls:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} recent calls`);

      return data || [];
    } catch (error) {
      console.error('Error in getRecentApiCalls:', error);
      throw error;
    }
  }
}; 