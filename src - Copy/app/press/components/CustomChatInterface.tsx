'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useDeepSeekChat } from '@/modules/box-akane';
import { Message } from '@/modules/box-akane/types';

// Tạo component CustomChatInterface để tùy chỉnh giao diện chat
export default function CustomChatInterface({ 
  systemPrompt, 
  modelName = 'deepseek-chat', 
  enableStreaming = true,
  botName = 'Akane AI'
}: {
  systemPrompt?: string; 
  modelName?: string; 
  enableStreaming?: boolean;
  botName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Sử dụng custom hook từ module box-akane
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    resetChat,
    activeModel
  } = useDeepSeekChat({
    systemPrompt,
    model: modelName,
    streaming: enableStreaming
  });

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus vào input khi mở chat
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Xử lý khi nhấn Enter để gửi tin nhắn
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Gửi tin nhắn
  const handleSendMessage = async () => {
    if (inputValue.trim() && !isLoading) {
      const messageToSend = inputValue;
      setInputValue('');
      await sendMessage(messageToSend);
    }
  };

  // Định dạng tin nhắn
  const formatMessage = (content: string) => {
    // Thay thế URL bằng link có thể click
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const withLinks = content.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline">${url}</a>`;
    });
    
    // Thay thế xuống dòng bằng <br>
    return withLinks.replace(/\n/g, '<br>');
  };

  // Toggle chat box
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Reset chat
  const handleResetChat = () => {
    resetChat();
  };

  // Lọc tin nhắn - không hiển thị system prompt
  const displayMessages = messages.filter(msg => msg.role !== 'system');
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat button với ảnh tùy chỉnh */}
      <button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-cyan-500/50 transition-all overflow-hidden border-2 border-cyan-400 animate-pulse-slow"
        aria-label={isOpen ? 'Đóng chat' : 'Mở chat'}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src="/images/heroes/ui11.png"
              alt="Akane Chat"
              fill
              sizes="(max-width: 768px) 3.5rem, 3.5rem"
              className="object-cover"
            />
          </div>
        )}
      </button>

      {/* Chat box */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-[#05121d]/95 backdrop-blur-sm rounded-lg shadow-xl border border-[var(--accent-blue-bright)]/30 flex flex-col overflow-hidden font-be-vietnam-pro">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-cyan-800 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium text-cyan-300 text-shadow-blue">{botName}</h3>
            <div className="flex gap-2">
              <button
                onClick={handleResetChat}
                className="p-1 hover:bg-blue-700/50 rounded"
                title="Đặt lại cuộc trò chuyện"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-blue-700/50 rounded"
                title="Đóng chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto max-h-96 custom-scrollbar">
            {displayMessages.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <p>Hãy bắt đầu cuộc trò chuyện với {botName}!</p>
              </div>
            ) : (
              displayMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 ${
                    msg.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg max-w-[85%] ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white border border-blue-500/50'
                        : 'bg-[#041832]/70 text-gray-100 border border-cyan-500/30'
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                    />
                  </div>
                </div>
              ))
            )}
            {isLoading && !messages.find(m => m.role === 'assistant' && m.content === '') && (
              <div className="text-left mb-3">
                <div className="inline-block p-3 rounded-lg bg-[#041832]/70 text-gray-200 border border-cyan-500/30">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="text-center p-2 mb-3">
                <div className="bg-red-900/50 text-red-300 p-2 rounded-lg text-sm border border-red-500/30">
                  Lỗi: {error}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-cyan-700/30">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                className="flex-1 rounded-lg border border-cyan-700/50 p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none bg-[#041832]/70 text-white placeholder-gray-400"
                placeholder="Nhập tin nhắn của bạn..."
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={`p-2 rounded-lg ${
                  !inputValue.trim() || isLoading
                    ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 shadow-md shadow-cyan-500/20'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            {activeModel && (
              <div className="mt-1 text-xs text-gray-400 text-right">
                Model: {activeModel}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 