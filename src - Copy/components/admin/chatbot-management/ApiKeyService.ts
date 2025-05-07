import { supabase } from '@/tien_ich/supabase';
import { ApiKey, ApiKeyConfig } from '@/types/chatbot';

export const ApiKeyService = {
  /**
   * Lấy danh sách tất cả API keys
   */
  async getApiKeys(): Promise<ApiKey[]> {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('priority', { ascending: false });

      if (error) throw error;
      return data as ApiKey[] || [];
    } catch (error) {
      console.error('Error fetching API keys:', error);
      throw error;
    }
  },

  /**
   * Lấy API keys theo provider
   */
  async getApiKeysByProvider(provider: string): Promise<ApiKey[]> {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('provider', provider)
        .eq('is_active', true)
        .order('priority', { ascending: false });

      if (error) throw error;
      return data as ApiKey[] || [];
    } catch (error) {
      console.error(`Error fetching API keys for provider ${provider}:`, error);
      throw error;
    }
  },

  /**
   * Lấy một API key theo ID
   */
  async getApiKeyById(id: number): Promise<ApiKey | null> {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as ApiKey;
    } catch (error) {
      console.error(`Error fetching API key with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Thêm một API key mới
   */
  async createApiKey(apiKey: Omit<ApiKey, 'id' | 'created_at' | 'updated_at' | 'usage_count'>): Promise<ApiKey> {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .insert([{
          ...apiKey,
          usage_count: 0,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data as ApiKey;
    } catch (error) {
      console.error('Error creating API key:', error);
      throw error;
    }
  },

  /**
   * Cập nhật một API key
   */
  async updateApiKey(id: number, updates: Partial<Omit<ApiKey, 'id' | 'created_at'>>): Promise<ApiKey> {
    try {
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('api_keys')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as ApiKey;
    } catch (error) {
      console.error(`Error updating API key with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Xóa một API key
   */
  async deleteApiKey(id: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error(`Error deleting API key with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Cập nhật trạng thái active của API key
   */
  async toggleApiKeyStatus(id: number, isActive: boolean): Promise<ApiKey> {
    return this.updateApiKey(id, { is_active: isActive });
  },

  /**
   * Ghi nhận việc sử dụng API key
   */
  async recordApiKeyUsage(id: number): Promise<void> {
    try {
      const { data: currentKey, error: fetchError } = await supabase
        .from('api_keys')
        .select('usage_count')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      const { error: updateError } = await supabase
        .from('api_keys')
        .update({
          usage_count: (currentKey?.usage_count || 0) + 1,
          last_used_at: new Date().toISOString()
        })
        .eq('id', id);

      if (updateError) throw updateError;
    } catch (error) {
      console.error(`Error recording usage for API key with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Lấy hoặc tạo cấu hình API key
   */
  async getApiKeyConfig(): Promise<ApiKeyConfig> {
    try {
      const { data, error } = await supabase
        .from('api_key_config')
        .select('*')
        .single();

      if (error) {
        // Nếu không tìm thấy cấu hình, tạo mới với giá trị mặc định
        if (error.code === 'PGRST116') {
          const defaultConfig: ApiKeyConfig = {
            selection_strategy: 'priority',
            fallback_enabled: true,
            max_tries_before_fallback: 3,
            usage_monitoring_enabled: true,
            auto_rotate_on_limit: true
          };

          const { data: newConfig, error: insertError } = await supabase
            .from('api_key_config')
            .insert([defaultConfig])
            .select()
            .single();

          if (insertError) throw insertError;
          return newConfig as ApiKeyConfig;
        }
        throw error;
      }

      return data as ApiKeyConfig;
    } catch (error) {
      console.error('Error fetching API key config:', error);
      throw error;
    }
  },

  /**
   * Cập nhật cấu hình API key
   */
  async updateApiKeyConfig(config: Partial<ApiKeyConfig>): Promise<ApiKeyConfig> {
    try {
      const { data, error } = await supabase
        .from('api_key_config')
        .update(config)
        .select()
        .single();

      if (error) throw error;
      return data as ApiKeyConfig;
    } catch (error) {
      console.error('Error updating API key config:', error);
      throw error;
    }
  },

  /**
   * Lấy API key đang hoạt động theo chiến lược được cấu hình
   */
  async getActiveApiKey(provider: string = 'deepseek'): Promise<ApiKey | null> {
    try {
      // Lấy cấu hình
      const config = await this.getApiKeyConfig();
      
      // Lấy tất cả các API key đang hoạt động
      const activeKeys = await this.getApiKeysByProvider(provider);
      
      if (!activeKeys || activeKeys.length === 0) {
        return null;
      }
      
      let selectedKey: ApiKey;
      
      // Lựa chọn API key theo chiến lược
      switch (config.selection_strategy) {
        case 'priority':
          // API key có priority cao nhất (đã sắp xếp trong query)
          selectedKey = activeKeys[0];
          break;
          
        case 'round_robin':
          // Lấy key tiếp theo trong danh sách, dựa trên last_used_at
          activeKeys.sort((a, b) => {
            if (!a.last_used_at) return -1;
            if (!b.last_used_at) return 1;
            return new Date(a.last_used_at).getTime() - new Date(b.last_used_at).getTime();
          });
          selectedKey = activeKeys[0];
          break;
          
        case 'least_used':
          // Lấy key ít được sử dụng nhất
          activeKeys.sort((a, b) => a.usage_count - b.usage_count);
          selectedKey = activeKeys[0];
          break;
          
        case 'random':
          // Lấy ngẫu nhiên một key
          const randomIndex = Math.floor(Math.random() * activeKeys.length);
          selectedKey = activeKeys[randomIndex];
          break;
          
        default:
          // Mặc định sử dụng priority
          selectedKey = activeKeys[0];
      }
      
      // Cập nhật thông tin sử dụng
      if (selectedKey && config.usage_monitoring_enabled) {
        await this.recordApiKeyUsage(selectedKey.id);
      }
      
      return selectedKey;
    } catch (error) {
      console.error(`Error getting active API key for provider ${provider}:`, error);
      throw error;
    }
  }
}; 