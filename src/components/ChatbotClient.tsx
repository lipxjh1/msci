import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Paper, Typography, Avatar, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatbotClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiConfig, setApiConfig] = useState<{provider: string, apiKeyId: number} | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Một hàm riêng để load cấu hình từ localStorage
  const loadConfigFromLocalStorage = () => {
    console.log('Loading API config from localStorage');
    const storedConfig = localStorage.getItem('activeApiProviderConfig');
    console.log('Raw stored config:', storedConfig);
    
    if (storedConfig) {
      try {
        const config = JSON.parse(storedConfig);
        setApiConfig(config);
        console.log('Successfully loaded API config:', config);
        return config;
      } catch (error) {
        console.error('Error parsing stored API config:', error);
        return null;
      }
    } else {
      console.warn('No API configuration found in localStorage');
      return null;
    }
  };

  // Lấy cấu hình API từ localStorage khi component mount
  useEffect(() => {
    loadConfigFromLocalStorage();
    
    // Debug: Thêm một event listener để theo dõi thay đổi localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'activeApiProviderConfig') {
        console.log('Storage event detected for API config. New value:', e.newValue);
        loadConfigFromLocalStorage();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Thêm listener cho custom event từ ChatbotConfigService
    const handleConfigChange = (e: Event) => {
      console.log('Custom chatbotConfigChanged event detected', (e as CustomEvent).detail);
      loadConfigFromLocalStorage();
    };
    
    window.addEventListener('chatbotConfigChanged', handleConfigChange);
    
    // Thêm interval để kiểm tra cấu hình mỗi 2 giây
    const intervalId = setInterval(() => {
      const currentConfig = localStorage.getItem('activeApiProviderConfig');
      if (currentConfig) {
        try {
          const parsedConfig = JSON.parse(currentConfig);
          // So sánh với cấu hình hiện tại
          if (JSON.stringify(parsedConfig) !== JSON.stringify(apiConfig)) {
            console.log('Detected config change via interval:', parsedConfig);
            setApiConfig(parsedConfig);
          }
        } catch (err) {
          // Bỏ qua lỗi parse JSON
          console.debug('Error parsing config in interval check:', err);
        }
      }
    }, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('chatbotConfigChanged', handleConfigChange);
      clearInterval(intervalId);
    };
  }, [apiConfig]);

  // Auto-scroll xuống cuối cuộc hội thoại khi có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Xử lý khi người dùng gửi tin nhắn
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    // Thêm tin nhắn của người dùng vào danh sách
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };

      // Luôn tải lại cấu hình mới nhất từ localStorage trước khi gửi request
      const freshConfig = loadConfigFromLocalStorage();
      
      if (freshConfig) {
        headers['x-chatbot-api-config'] = JSON.stringify(freshConfig);
        console.log('Sending request with fresh API config:', freshConfig);
      } else {
        console.warn('No API config available for request');
      }

      // Hiển thị thông tin gọi API để debug
      console.log('Request headers:', headers);
      console.log('Request body:', {
        message: userMessage,
        chatHistory: newMessages.slice(0, -1).map(msg => ({
          role: msg.role,
          content: msg.content.substring(0, 20) + '...'
        }))
      });

      // Gọi API với cấu hình đã chọn
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          message: userMessage,
          chatHistory: newMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`Lỗi khi gọi API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API response:', {
        source: data.source,
        provider: data.provider, // Thêm provider vào log
        response: data.response.substring(0, 50) + '...'
      });
      
      // Thêm câu trả lời từ chatbot vào danh sách tin nhắn
      setMessages([...newMessages, { role: 'assistant' as const, content: data.response }]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Hiển thị thông báo lỗi
      setMessages([
        ...newMessages,
        { role: 'assistant' as const, content: 'Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này. Vui lòng thử lại sau.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 2, height: '600px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Chat với Akane
        {apiConfig && (
          <Typography component="span" variant="caption" sx={{ ml: 1, p: 0.5, bgcolor: 'primary.light', borderRadius: 1, color: 'white' }}>
            (Sử dụng {apiConfig.provider})
          </Typography>
        )}
      </Typography>

      {/* Khu vực hiển thị tin nhắn */}
      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto', 
        mb: 2,
        p: 1,
        bgcolor: 'background.default',
        borderRadius: 1
      }}>
        {messages.length === 0 ? (
          <Box sx={{ textAlign: 'center', color: 'text.secondary', mt: 10 }}>
            <Typography>Hãy bắt đầu cuộc trò chuyện với Akane!</Typography>
          </Box>
        ) : (
          messages.map((msg, index) => (
            <Box 
              key={index}
              sx={{ 
                display: 'flex',
                mb: 2,
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: msg.role === 'user' ? 'primary.main' : 'secondary.main',
                  mr: msg.role === 'user' ? 0 : 1,
                  ml: msg.role === 'user' ? 1 : 0
                }}
              >
                {msg.role === 'user' ? 'U' : 'A'}
              </Avatar>
              <Paper 
                sx={{ 
                  p: 1.5,
                  maxWidth: '70%',
                  bgcolor: msg.role === 'user' ? 'primary.light' : 'background.paper',
                  color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary'
                }}
                elevation={1}
              >
                <Typography variant="body1">
                  {msg.content}
                </Typography>
              </Paper>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Form nhập tin nhắn */}
      <Box sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={loading}
          variant="outlined"
          size="small"
        />
        <Button
          variant="contained"
          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          onClick={handleSendMessage}
          disabled={loading || !input.trim()}
          sx={{ ml: 1 }}
        >
          Gửi
        </Button>
      </Box>
    </Paper>
  );
} 