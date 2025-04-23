import { useState, useCallback, useRef, useEffect } from 'react';
import { DeepSeekService } from '../services/DeepSeekService';
import { Message, ChatOptions, ChatResponse } from '../types';

interface UseChatResult {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  resetChat: () => void;
  activeProvider: string | null;
  activeModel: string | null;
}

export function useDeepSeekChat(options: ChatOptions = {}): UseChatResult {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [activeModel, setActiveModel] = useState<string | null>(null);
  
  // Giữ tham chiếu đến abort controller để có thể hủy request
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Cleanup khi unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Khởi tạo chat với system prompt nếu có
  useEffect(() => {
    if (options.systemPrompt) {
      setMessages([
        { role: 'system', content: options.systemPrompt }
      ]);
    } else {
      setMessages([]);
    }
  }, [options.systemPrompt]);

  // Gửi tin nhắn đến DeepSeek API
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Thêm tin nhắn người dùng vào danh sách
    const userMessage: Message = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // Chuẩn bị để gửi request
    setIsLoading(true);
    setError(null);
    
    // Tạo abort controller mới
    abortControllerRef.current = new AbortController();
    
    try {
      let response: ChatResponse;
      
      // Nếu cần streaming
      if (options.streaming) {
        // Thêm tin nhắn tạm thời của assistant
        const tempAssistantMessage: Message = { role: 'assistant', content: '' };
        setMessages([...updatedMessages, tempAssistantMessage]);
        
        // Gọi API với streaming
        let fullResponse = '';
        await DeepSeekService.chatStream(
          updatedMessages,
          {
            model: options.model || 'deepseek-chat',
            streaming: true
          },
          // onMessage callback - cập nhật từng phần nội dung
          (chunk) => {
            fullResponse += chunk;
            setMessages(prevMessages => {
              const newMessages = [...prevMessages];
              newMessages[newMessages.length - 1].content = fullResponse;
              return newMessages;
            });
          },
          // onComplete callback - kết thúc stream
          (completeResponse) => {
            setActiveProvider('deepseek');
            setActiveModel(options.model || 'deepseek-chat');
          },
          // onError callback
          (errorMsg) => {
            setError(errorMsg);
            // Xóa tin nhắn tạm thời nếu có lỗi
            setMessages([...updatedMessages]);
          }
        );
      } else {
        // Gọi API không streaming
        response = await DeepSeekService.chat(updatedMessages, {
          model: options.model || 'deepseek-chat',
          streaming: false
        });
        
        // Xử lý kết quả
        if (response.error) {
          setError(response.error);
        } else {
          // Thêm tin nhắn từ assistant vào danh sách
          const assistantMessage: Message = {
            role: 'assistant',
            content: response.response
          };
          setMessages([...updatedMessages, assistantMessage]);
          
          // Cập nhật provider và model
          setActiveProvider(response.provider || 'deepseek');
          setActiveModel(response.model || options.model || 'deepseek-chat');
        }
      }
    } catch (err: any) {
      console.error('Lỗi khi chat với DeepSeek:', err);
      setError(err.message || 'Lỗi không xác định khi chat với DeepSeek');
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [messages, options]);

  // Reset chat
  const resetChat = useCallback(() => {
    // Huỷ request đang chạy nếu có
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    // Reset state
    if (options.systemPrompt) {
      setMessages([{ role: 'system', content: options.systemPrompt }]);
    } else {
      setMessages([]);
    }
    setIsLoading(false);
    setError(null);
    setActiveProvider(null);
    setActiveModel(null);
  }, [options.systemPrompt]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    resetChat,
    activeProvider,
    activeModel
  };
} 