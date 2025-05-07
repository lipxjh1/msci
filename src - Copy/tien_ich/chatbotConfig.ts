// Định nghĩa interface cho cấu hình
export interface ChatbotConfig {
  provider: string;
  apiKeyId: number;
}

// Key lưu trong localStorage
export const CONFIG_STORAGE_KEY = 'activeApiProviderConfig';

// Dịch vụ tập trung để quản lý cấu hình Chatbot
export const ChatbotConfigService = {
  /**
   * Lấy cấu hình hiện tại từ localStorage
   */
  getConfig(): ChatbotConfig | null {
    try {
      const storedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (!storedConfig) return null;
      
      const config = JSON.parse(storedConfig) as ChatbotConfig;
      return config;
    } catch (error) {
      console.error('Error reading chatbot config:', error);
      return null;
    }
  },

  /**
   * Lưu cấu hình mới vào localStorage
   */
  saveConfig(config: ChatbotConfig): boolean {
    try {
      // Lưu vào localStorage
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
      
      // Kích hoạt sự kiện storage
      window.dispatchEvent(new StorageEvent('storage', {
        key: CONFIG_STORAGE_KEY,
        newValue: JSON.stringify(config)
      }));
      
      // Gửi sự kiện tùy chỉnh để thông báo cho các phần khác của ứng dụng
      const configChangeEvent = new CustomEvent('chatbotConfigChanged', { 
        detail: config 
      });
      window.dispatchEvent(configChangeEvent);
      
      // Xác minh lại cấu hình đã được lưu
      const verifyConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (!verifyConfig) {
        console.error('Failed to verify config in localStorage');
        return false;
      }
      
      console.log('Chatbot config saved successfully:', config);
      return true;
    } catch (error) {
      console.error('Error saving chatbot config:', error);
      return false;
    }
  },

  /**
   * Đăng ký lắng nghe thay đổi cấu hình
   */
  subscribeToChanges(callback: (config: ChatbotConfig) => void): () => void {
    const handleConfigChange = (event: CustomEvent<ChatbotConfig>) => {
      callback(event.detail);
    };
    
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CONFIG_STORAGE_KEY && event.newValue) {
        try {
          const config = JSON.parse(event.newValue) as ChatbotConfig;
          callback(config);
        } catch (error) {
          console.error('Error parsing config from storage event:', error);
        }
      }
    };
    
    // TypeScript không nhận ra CustomEvent trong addEventListener
    window.addEventListener('chatbotConfigChanged', handleConfigChange as EventListener);
    window.addEventListener('storage', handleStorageChange);
    
    // Trả về hàm để hủy đăng ký lắng nghe
    return () => {
      window.removeEventListener('chatbotConfigChanged', handleConfigChange as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }
}; 