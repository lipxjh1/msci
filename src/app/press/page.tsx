'use client';

import { useState, useEffect, useRef } from 'react';
import { useSupabase } from '@/context/SupabaseContext';
import Link from 'next/link';
import Image from 'next/image';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram } from 'react-icons/fa';
import { useDeepSeekChat } from '@/modules/box-akane';
import { Message } from '@/modules/box-akane/types';

// Tạo component CustomChatInterface để tùy chỉnh giao diện chat
function CustomChatInterface({ 
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
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${url}</a>`;
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
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-cyan-500/30 transition-all overflow-hidden border-2 border-blue-400"
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
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">{botName}</h3>
            <div className="flex gap-2">
              <button
                onClick={handleResetChat}
                className="p-1 hover:bg-blue-700 rounded"
                title="Đặt lại cuộc trò chuyện"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-blue-700 rounded"
                title="Đóng chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto max-h-96 bg-gray-50">
            {displayMessages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
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
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800'
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
                <div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="text-center p-2 mb-3">
                <div className="bg-red-100 text-red-800 p-2 rounded-lg text-sm">
                  Lỗi: {error}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            {activeModel && (
              <div className="mt-1 text-xs text-gray-500 text-right">
                Model: {activeModel}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const pressSections = [
  {
    id: 1,
    title: 'Giới Thiệu',
    slug: 'gioi-thieu',
    content: (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Giới Thiệu</h3>
          <p className="text-white/80 mb-4">M-SCI là một tựa game bắn súng mobile được phát triển bởi đội ngũ nhà phát triển độc lập. Đây là một tựa game được thiết kế để mang đến trải nghiệm hấp dẫn và độc đáo cho người chơi.</p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Tính Năng Nổi Bật',
    slug: 'tinh-nang-noi-bat',
    content: (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Tính Năng Nổi Bật</h3>
          <p className="text-white/80 mb-4">M-SCI mang đến nhiều tính năng hấp dẫn, bao gồm:</p>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Hệ thống nhân vật đa dạng</li>
            <li>Gameplay độc đáo và thú vị</li>
            <li>Guild system giúp người chơi hợp tác</li>
            <li>Gacha system kích thích đam mê</li>
            <li>Blockchain integration</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Bộ Nhận Diện',
    slug: 'bo-nhan-dien',
    content: (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Logo & Branding</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-all">
              <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white/30">Logo</span>
              </div>
              <p className="text-white text-sm">Logo chính (PNG, SVG)</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-all">
              <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white/30">Icon</span>
              </div>
              <p className="text-white text-sm">Icon app (1024x1024)</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-all">
              <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white/30">Banner</span>
              </div>
              <p className="text-white text-sm">Banner quảng cáo</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Screenshots</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="aspect-[9/16] bg-gray-800/50 rounded-lg flex items-center justify-center hover:bg-gray-700/50 transition-all">
                <span className="text-white/30">Screenshot {item}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Trailer chính thức</span>
            </div>
            <div className="aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Gameplay demo</span>
            </div>
            <div className="aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Behind-the-scenes</span>
            </div>
            <div className="aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Character showcases</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Artwork</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Key visual</span>
            </div>
            <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Character designs</span>
            </div>
            <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Environment art</span>
            </div>
            <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-white/30">Concept art</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Liên Hệ',
    slug: 'lien-he',
    content: (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">PR Manager</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Tên:</span>
              <span className="text-white">[Tên PR Manager]</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Email:</span>
              <span className="text-white">pr@msci.game</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Phone:</span>
              <span className="text-white">[Số điện thoại]</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Social Media</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <a href="#" className="flex flex-col items-center bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all">
              <FaTwitter className="h-8 w-8 text-cyan-400 mb-2" />
              <span className="text-white">@MSCIGame</span>
            </a>
            <a href="#" className="flex flex-col items-center bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all">
              <FaFacebookF className="h-8 w-8 text-cyan-400 mb-2" />
              <span className="text-white">/MSCIOfficial</span>
            </a>
            <a href="#" className="flex flex-col items-center bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all">
              <FaYoutube className="h-8 w-8 text-cyan-400 mb-2" />
              <span className="text-white">/MSCIOfficial</span>
            </a>
            <a href="#" className="flex flex-col items-center bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all">
              <FaDiscord className="h-8 w-8 text-cyan-400 mb-2" />
              <span className="text-white">Discord</span>
            </a>
            <a href="#" className="flex flex-col items-center bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all">
              <FaTelegram className="h-8 w-8 text-cyan-400 mb-2" />
              <span className="text-white">Telegram</span>
            </a>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Yêu Cầu Phỏng Vấn</h3>
          <p className="text-white/80 mb-4">Vui lòng gửi email đến press@msci.game với tiêu đề "Interview Request - [Tên Tổ Chức]"</p>
          <a 
            href="mailto:press@msci.game?subject=Interview Request" 
            className="inline-block px-6 py-3 bg-cyan-500/20 text-white rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-all button-cyber"
          >
            Gửi Email Ngay
          </a>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Fact Sheet',
    slug: 'fact-sheet',
    content: (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Kỹ Thuật</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Engine:</span>
              <span className="text-white">Unity</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Đồ họa:</span>
              <span className="text-white">2D Spine Animation + 3D Elements</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Dung lượng:</span>
              <span className="text-white">~500MB</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Yêu cầu:</span>
              <span className="text-white">Android 7.0+ / iOS 12+</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Ngôn ngữ:</span>
              <span className="text-white">Tiếng Việt, English, 日本語, 한국어</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Kinh Doanh</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Mô hình:</span>
              <span className="text-white">Free-to-Play</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Monetization:</span>
              <span className="text-white">In-App Purchase, Battle Pass</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Blockchain:</span>
              <span className="text-white">Token $MSCI, NFT marketplace</span>
            </li>
            <li className="flex items-start">
              <span className="text-white/70 font-medium w-40">Target Market:</span>
              <span className="text-white">SEA, Global</span>
            </li>
          </ul>
        </div>
        
        <div className="text-center mt-10">
          <p className="text-white/50 text-sm">*Cập nhật lần cuối: [Tháng/Năm]*</p>
          <p className="text-white/50 text-sm mt-2">© 2024 M-SCI. All rights reserved.</p>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: 'Hướng Dẫn Sử Dụng',
    slug: 'huong-dan-su-dung',
    content: (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Cấu Trúc Press Kit</h3>
          <p className="text-white/80 mb-4">Bộ Press Kit vừa được tạo bao gồm các phần sau:</p>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">1. Thông Tin Cơ Bản</h4>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                <li>Tổng quan về game</li>
                <li>Thông tin liên hệ</li>
                <li>Mô tả ngắn gọn</li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">2. Cốt Truyện</h4>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                <li>Bối cảnh game</li>
                <li>Hành trình 100 màn chơi</li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">3. Tính Năng Nổi Bật</h4>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                <li>Hệ thống nhân vật</li>
                <li>Gameplay độc đáo</li>
                <li>Guild system</li>
                <li>Gacha system</li>
                <li>Blockchain integration</li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">4. Đội Ngũ Phát Triển</h4>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                <li>Core team</li>
                <li>Đối tác chiến lược</li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">5. Thành Tựu & Con Số</h4>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                <li>Số liệu cộng đồng</li>
                <li>Giải thưởng (nếu có)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani text-shadow-sm">Cách Sử Dụng Press Kit</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Cho Báo Chí:</h4>
              <ol className="list-decimal list-inside text-white/70 space-y-2">
                <li>Download toàn bộ Press Kit dưới dạng ZIP</li>
                <li>Truy cập các assets riêng lẻ qua links</li>
                <li>Liên hệ PR team để có thêm thông tin</li>
              </ol>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Cho Đội Ngũ Nội Bộ:</h4>
              <ol className="list-decimal list-inside text-white/70 space-y-2">
                <li>Cập nhật thường xuyên các con số</li>
                <li>Thêm giải thưởng và thành tựu mới</li>
                <li>Update screenshots và trailers mới nhất</li>
                <li>Kiểm tra links còn hoạt động</li>
              </ol>
            </div>
          </div>
          
          <div className="mt-6 bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
            <h4 className="text-white font-medium mb-3">Lưu Ý Quan Trọng:</h4>
            <ul className="list-disc list-inside text-white/70 space-y-2">
              <li>Luôn giữ thông tin cập nhật</li>
              <li>Đảm bảo tất cả links hoạt động</li>
              <li>Chuẩn bị phiên bản đa ngôn ngữ</li>
              <li>Có phiên bản PDF để dễ chia sẻ</li>
            </ul>
          </div>
          
          <p className="text-white/80 mt-6">Press Kit này cung cấp đầy đủ thông tin cho báo chí, influencers và đối tác. Đội ngũ PR nên thường xuyên cập nhật và phân phối đến các kênh truyền thông phù hợp.</p>
        </div>
      </div>
    ),
  }
];

export default function PressPage() {
  const [activeSection, setActiveSection] = useState<string>('gioi-thieu');
  const [loading, setLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Xử lý hash URL khi trang tải
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Lấy hash từ URL (loại bỏ dấu # ở đầu)
      const hash = window.location.hash.replace('#', '');
      
      // Nếu hash tồn tại và trùng với một slug trong danh sách sections
      if (hash && pressSections.some(section => section.slug === hash)) {
        setActiveSection(hash);
      }
    }
  }, []);

  // Chuyển đến section và thêm hiệu ứng cuộn mượt
  const scrollToSection = (sectionId: string) => {
    // Ngăn chặn hành động mặc định nếu có
    if (typeof window !== 'undefined') {
      // Xóa hash từ URL để tránh xung đột
      if (window.location.hash) {
        history.pushState('', document.title, window.location.pathname);
      }
      
      // Thêm hash mới vào URL
      window.location.hash = sectionId;
    }
    
    // Cập nhật active section
    setActiveSection(sectionId);
    
    // Tạo hiệu ứng fade khi chuyển đổi nội dung
    if (contentRef.current) {
      contentRef.current.style.opacity = '0';
      setTimeout(() => {
        contentRef.current!.style.opacity = '1';
      }, 200);
    }
    
    // Cuộn lên đầu khi chuyển section trên mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      const navHeight = 100; // Chiều cao ước tính của thanh navigation
      const element = document.getElementById('press-content');
      if (element) {
        window.scrollTo({
          top: element.offsetTop - navHeight,
          behavior: 'smooth'
        });
      }
    }
  };

  // Xử lý các phím mũi tên để điều hướng giữa các section
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tìm index của section hiện tại
      const currentIndex = pressSections.findIndex(section => section.slug === activeSection);
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        // Chuyển đến section tiếp theo nếu không phải section cuối cùng
        if (currentIndex < pressSections.length - 1) {
          scrollToSection(pressSections[currentIndex + 1].slug);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        // Chuyển đến section trước đó nếu không phải section đầu tiên
        if (currentIndex > 0) {
          scrollToSection(pressSections[currentIndex - 1].slug);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-[#041019] text-white font-rajdhani">
      <ThanhDieuHuongResponsive />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <Image 
              src="/images/overwatch_bg_2.jpg" 
              alt="Press Kit Background" 
              fill
              sizes="100vw"
              priority
              className="object-cover object-center brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/70 via-[#041019]/50 to-[#041019]"></div>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-4 tracking-wide text-shadow-blue cyber-glitch-sm" data-text="M-SCI PRESS KIT">
            M-SCI PRESS KIT
          </h1>
          <h2 className="text-xl md:text-2xl font-rajdhani text-white/80 mb-8">Bộ Tài Liệu Báo Chí</h2>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <a 
              href="#" 
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg border border-cyan-500/50 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 transition-all button-cyber shadow-lg shadow-cyan-500/20"
            >
              Download Full Kit
            </a>
            <a 
              href="mailto:press@msci.game" 
              className="px-6 py-3 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all button-cyber shadow-md"
            >
              Contact Us
            </a>
          </div>
        </div>
        
        {/* Animated arrow down */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-24 card-neon" style={{ userSelect: 'text' }}>
              <h3 className="text-xl font-bold text-white mb-6 font-rajdhani tracking-wide text-shadow-sm">Press Kit Contents</h3>
              <nav className="space-y-2">
                {pressSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.slug)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        scrollToSection(section.slug);
                      }
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      activeSection === section.slug
                        ? 'bg-cyan-500/20 text-white border-l-2 border-cyan-500'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                    tabIndex={0}
                    role="tab"
                    aria-selected={activeSection === section.slug}
                    style={{ userSelect: 'text' }}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="md:col-span-3" id="press-content">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 card-neon">
              {/* Title for Active Section */}
              {pressSections.map((section) => (
                activeSection === section.slug && (
                  <div key={section.id}>
                    <h2 className="text-3xl font-bold text-white mb-6 font-orbitron tracking-wide text-shadow-blue">
                      {section.title}
                    </h2>
                    
                    {/* Content */}
                    <div 
                      ref={contentRef}
                      className="transition-opacity duration-200 custom-scrollbar"
                      style={{ 
                        overflowY: 'auto', 
                        maxHeight: '70vh', 
                        userSelect: 'text',
                        minHeight: '50vh',
                        paddingRight: '16px',
                        height: '100%',
                        position: 'relative'
                      }}
                    >
                      {section.content}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Join Us Footer - Inspired by Overwatch */}
      <div className="relative w-full overflow-hidden">
        {/* Battlefield Image Background */}
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
          <Image 
            src="/images/overwatch_bg_2.jpg" 
            alt="Heroes battlefield" 
            fill
            sizes="100vw"
            className="object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/70 to-[#041019]/90"></div>
          
          {/* Hero Characters Overlay - Optional if you have hero images */}
          <div className="absolute inset-0 z-10">
            <div className="container mx-auto h-full flex flex-col items-center justify-center text-center py-10 px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">
                CHIẾN ĐẤU VÌ TƯƠNG LAI NHÂN LOẠI. GIA NHẬP M-SCI!
              </h2>
              
              <Link 
                href="/play"
                className="mt-4 mb-8 px-8 py-3 bg-[#FF7D00] hover:bg-[#FF9D40] text-white font-medium rounded transition-colors duration-300 uppercase tracking-wider text-lg shadow-lg hover:shadow-[#FF7D00]/50"
              >
                CHƠI NGAY
              </Link>
              
              <div className="mt-8">
                <h3 className="text-gray-300 uppercase text-sm tracking-widest mb-4">THEO DÕI CHÚNG TÔI</h3>
                <div className="flex justify-center space-x-6">
                  <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                    <FaFacebookF className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                    <FaTwitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                    <FaYoutube className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                    <FaDiscord className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-[#FF7D00] transition-colors">
                    <FaTelegram className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Thêm ChatInterface với ảnh tùy chỉnh */}
      <CustomChatInterface
        systemPrompt="Bạn là Akane, một trợ lý AI thông minh và thân thiện. Hãy giúp đỡ người dùng một cách nhiệt tình và chính xác bằng tiếng Việt."
        modelName="deepseek-chat"
        enableStreaming={true}
        botName="Akane AI"
      />
    </div>
  );
} 