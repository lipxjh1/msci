import { supabase } from '@/tien_ich/supabase';
import { ChatbotMessage } from '@/types/chatbot';

interface UpdateData {
  question?: string;
  answer?: string;
  updated_at: string;
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
  }
}; 