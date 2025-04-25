'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram } from 'react-icons/fa';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { useDeepSeekChat } from '@/modules/box-akane';

// Component ChatInterface tương tự như trong trang Heroes
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

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)]">
      {/* Menu điều hướng */}
      <ThanhDieuHuongResponsive />

      {/* Support Banner */}
      <div className="relative h-[100vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/30 to-[#041019] z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/overwatch_bg_2.jpg')] bg-cover bg-center bg-no-repeat">
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse delay-100"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse delay-200"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse delay-300"></div>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
          <h1 className="font-orbitron text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo">
            <span className="relative inline-block">
              HỖ TRỢ
              <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h1>
          <p className="font-rajdhani text-xl md:text-2xl text-[var(--accent-blue-bright)] font-semibold mb-10 tracking-wide uppercase animate-fade-in text-center">
            TRUNG TÂM HỖ TRỢ M-SCI
          </p>
          
          {/* Nút cuộn xuống */}
          <div className="animate-slide-up">
            <button 
              onClick={() => document.getElementById('support-content')?.scrollIntoView({behavior: 'smooth'})}
              className="font-rajdhani font-bold tracking-wider text-shadow-sm px-10 py-3 button-cyber clip-hexagon hexagon-border text-white"
            >
              Xem trợ giúp
            </button>
          </div>
        </div>
      </div>

      <div id="support-content" className="max-w-7xl mx-auto px-4 py-12 relative z-10 -mt-10">
        {/* Curved section top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#041019] -translate-y-full"></div>
        
        {/* Intro section */}
        <div className="mb-16 backdrop-blur-sm bg-white/5 p-8 rounded-xl border border-white/10 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo mb-4">
              <span className="text-shadow-blue relative inline-block">
                TRUNG TÂM HỖ TRỢ M-SCI
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h2>
            <p className="font-rajdhani text-lg text-white/80 max-w-3xl mx-auto">
              Chào mừng đến với Trung tâm Hỗ trợ M-SCI! Chúng tôi luôn sẵn sàng giúp bạn có trải nghiệm game tốt nhất.
            </p>
          </div>
        </div>
        
        {/* Support Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hỗ Trợ Nhanh */}
          <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-blue-500/10 transition-all duration-300 card-neon">
            <div className="mb-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-4">
                <span className="text-red-400 text-2xl">🆘</span>
              </div>
              <h3 className="font-orbitron text-xl font-bold text-white text-shadow-blue">Hỗ Trợ Nhanh</h3>
            </div>
            
            <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-3">Liên Hệ Trực Tiếp</h4>
            <ul className="font-rajdhani text-white/80 space-y-2">
              <li className="flex items-center">
                <span className="w-6 text-center mr-2">•</span>
                <span>Email: <a href="mailto:support@msci.game" className="text-blue-400 hover:underline">support@msci.game</a></span>
              </li>
              <li className="flex items-center">
                <span className="w-6 text-center mr-2">•</span>
                <span>Hotline: 1900-xxxx (8:00 - 22:00)</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 text-center mr-2">•</span>
                <span>Live Chat: Góc phải màn hình</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 text-center mr-2">•</span>
                <span>Discord: <a href="https://discord.gg/msci-support" className="text-blue-400 hover:underline">discord.gg/msci-support</a></span>
              </li>
            </ul>
          </div>

          {/* FAQ Section Preview */}
          <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-blue-500/10 transition-all duration-300 card-neon">
            <div className="mb-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                <span className="text-blue-400 text-2xl">❓</span>
              </div>
              <h3 className="font-orbitron text-xl font-bold text-white text-shadow-blue">Câu Hỏi Thường Gặp (FAQ)</h3>
            </div>
            
            <p className="font-rajdhani text-white/80 mb-4">
              Tìm câu trả lời nhanh cho các vấn đề phổ biến về cài đặt, gameplay, tài khoản và nhiều hơn nữa.
            </p>
            
            <div className="mt-4">
              <button 
                onClick={() => document.getElementById('faq-section')?.scrollIntoView({behavior: 'smooth'})}
                className="font-rajdhani font-medium tracking-wider text-white bg-blue-600/30 hover:bg-blue-600/50 px-5 py-2 rounded-md button-cyber"
              >
                Xem tất cả FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div id="faq-section" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
            <span className="text-shadow-blue relative inline-block">
              CÂU HỎI THƯỜNG GẶP
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
        </div>
        
        {/* FAQ grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ Group 1: Bắt Đầu Chơi */}
          <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl transition-all duration-300 card-neon">
            <div className="mb-4">
              <h3 className="font-orbitron text-xl font-bold text-white cyber-halo">
                <span className="text-shadow-blue inline-block">
                  1. Bắt Đầu Chơi
                </span>
              </h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Làm sao để tải game?</h4>
                <ul className="font-rajdhani text-white/80 space-y-1 ml-6">
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Android: Tải từ Google Play Store</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>iOS: Tải từ App Store</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Telegram: Tìm bot @MSCIGameBot</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Yêu cầu cấu hình tối thiểu?</h4>
                <ul className="font-rajdhani text-white/80 space-y-1 ml-6">
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Android: Version 7.0+, RAM 2GB+</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>iOS: iOS 12+, iPhone 6S trở lên</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Dung lượng: ~500MB</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Làm sao để tạo tài khoản?</h4>
                <ol className="font-rajdhani text-white/80 space-y-1 ml-6 list-decimal">
                  <li className="ml-6">Mở game và chọn "Đăng ký"</li>
                  <li className="ml-6">Nhập email/số điện thoại</li>
                  <li className="ml-6">Xác thực OTP</li>
                  <li className="ml-6">Tạo mật khẩu và username</li>
                </ol>
              </div>
            </div>
          </div>

          {/* FAQ Group 2: Gameplay & Tính Năng */}
          <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl transition-all duration-300 card-neon">
            <div className="mb-4">
              <h3 className="font-orbitron text-xl font-bold text-white cyber-halo">
                <span className="text-shadow-blue inline-block">
                  2. Gameplay & Tính Năng
                </span>
              </h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Cách điều khiển nhân vật?</h4>
                <ul className="font-rajdhani text-white/80 space-y-1 ml-6">
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Chạm màn hình để bắn</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Vuốt để di chuyển</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Nhấn icon nhân vật để chuyển đổi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Nhấn công sự để ẩn nấp</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Làm sao để nâng cấp nhân vật?</h4>
                <ol className="font-rajdhani text-white/80 space-y-1 ml-6 list-decimal">
                  <li className="ml-6">Thu thập Chip từ màn chơi</li>
                  <li className="ml-6">Vào menu Hero {'>'} Chọn nhân vật</li>
                  <li className="ml-6">Nhấn "Level Up" và tiêu Chip</li>
                  <li className="ml-6">Để nâng Star, cần nhân vật trùng lặp</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Guild hoạt động như thế nào?</h4>
                <ul className="font-rajdhani text-white/80 space-y-1 ml-6">
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Tham gia Guild qua menu Guild</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Đóng góp M-Coin vào ngân khố</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Tham gia Guild War hàng ngày</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Nhận buff từ Guild level</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* FAQ Group 3: Mua Sắm & Thanh Toán */}
          <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl transition-all duration-300 card-neon">
            <div className="mb-4">
              <h3 className="font-orbitron text-xl font-bold text-white cyber-halo">
                <span className="text-shadow-blue inline-block">
                  3. Mua Sắm & Thanh Toán
                </span>
              </h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Các phương thức thanh toán?</h4>
                <ul className="font-rajdhani text-white/80 space-y-1 ml-6">
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Thẻ tín dụng/ghi nợ</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Ví điện tử (Momo, ZaloPay)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Google Play / App Store</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Banking</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Không nhận được vật phẩm đã mua?</h4>
                <ol className="font-rajdhani text-white/80 space-y-1 ml-6 list-decimal">
                  <li className="ml-6">Kiểm tra lịch sử giao dịch</li>
                  <li className="ml-6">Khởi động lại game</li>
                  <li className="ml-6">Liên hệ support kèm mã giao dịch</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Hoàn tiền như thế nào?</h4>
                <ul className="font-rajdhani text-white/80 space-y-1 ml-6">
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Yêu cầu hoàn tiền trong vòng 24h</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Gửi email kèm mã giao dịch</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Thời gian xử lý: 3-5 ngày làm việc</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Group 4: Tài Khoản & Bảo Mật */}
          <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl transition-all duration-300 card-neon">
            <div className="mb-4">
              <h3 className="font-orbitron text-xl font-bold text-white cyber-halo">
                <span className="text-shadow-blue inline-block">
                  4. Tài Khoản & Bảo Mật
                </span>
              </h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Quên mật khẩu?</h4>
                <ol className="font-rajdhani text-white/80 space-y-1 ml-6 list-decimal">
                  <li className="ml-6">Chọn "Quên mật khẩu" ở màn hình đăng nhập</li>
                  <li className="ml-6">Nhập email/số điện thoại đã đăng ký</li>
                  <li className="ml-6">Nhận mã OTP và đặt mật khẩu mới</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Bảo mật tài khoản?</h4>
                <ul className="font-rajdhani text-white/80 space-y-1 ml-6">
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Bật xác thực 2 lớp (2FA)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Không chia sẻ thông tin đăng nhập</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Đổi mật khẩu định kỳ</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Cảnh giác với link lạ</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Tài khoản bị khóa?</h4>
                <ul className="font-rajdhani text-white/80 space-y-1 ml-6">
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Liên hệ support kèm ID tài khoản</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Cung cấp thông tin xác minh</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Thời gian xử lý: 24-48h</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* FAQ Group 5: Lỗi Kỹ Thuật */}
          <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl transition-all duration-300 card-neon">
            <div className="mb-4">
              <h3 className="font-orbitron text-xl font-bold text-white cyber-halo">
                <span className="text-shadow-blue inline-block">
                  5. Lỗi Kỹ Thuật
                </span>
              </h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Game bị lag/giật?</h4>
                <ul className="font-rajdhani text-white/80 space-y-1 ml-6">
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Kiểm tra kết nối internet</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Đóng ứng dụng chạy nền</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Giảm cài đặt đồ họa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Cập nhật phiên bản mới nhất</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Không vào được game?</h4>
                <ol className="font-rajdhani text-white/80 space-y-1 ml-6 list-decimal">
                  <li className="ml-6">Kiểm tra bảo trì server</li>
                  <li className="ml-6">Xóa cache game</li>
                  <li className="ml-6">Cài đặt lại game</li>
                  <li className="ml-6">Liên hệ support nếu vẫn lỗi</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Mất kết nối giữa trận?</h4>
                <ul className="font-rajdhani text-white/80 space-y-1 ml-6">
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Game tự động lưu tiến trình</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Đăng nhập lại để tiếp tục</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Phần thưởng vẫn được giữ</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Gửi yêu cầu hỗ trợ */}
          <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl transition-all duration-300 card-neon">
            <div className="mb-4">
              <h3 className="font-orbitron text-xl font-bold text-white cyber-halo">
                <span className="text-shadow-blue inline-block">
                  📝 Gửi Yêu Cầu Hỗ Trợ
                </span>
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Thông Tin Cần Cung Cấp</h4>
                <ol className="font-rajdhani text-white/80 space-y-2 ml-6 list-decimal">
                  <li className="ml-6">ID tài khoản/Username</li>
                  <li className="ml-6">Mô tả chi tiết vấn đề</li>
                  <li className="ml-6">Screenshot/Video (nếu có)</li>
                  <li className="ml-6">Thiết bị và hệ điều hành</li>
                  <li className="ml-6">Thời gian xảy ra sự cố</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Thời Gian Phản Hồi</h4>
                <ul className="font-rajdhani text-white/80 space-y-1 ml-6">
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Chat/Hotline: Ngay lập tức</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Email: Trong vòng 24h</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Ticket: 24-48h</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6">
                <button className="w-full font-rajdhani font-bold tracking-wider text-shadow-sm px-6 py-3 button-cyber clip-hexagon hexagon-border text-white">
                  Gửi Yêu Cầu Hỗ Trợ
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Thông tin liên hệ và cập nhật */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl transition-all duration-300 card-neon">
            <div className="mb-4">
              <h3 className="font-orbitron text-xl font-bold text-white cyber-halo">
                <span className="text-shadow-blue inline-block">
                  🔄 Cập Nhật & Bảo Trì
                </span>
              </h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Lịch Bảo Trì Định Kỳ</h4>
                <ul className="font-rajdhani text-white/80 space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Thứ 3: 2:00 - 4:00 AM (GMT+7)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Bảo trì khẩn cấp: Thông báo trước 1h</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Thông Báo Cập Nhật</h4>
                <ul className="font-rajdhani text-white/80 space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Theo dõi kênh Telegram</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Kiểm tra thông báo in-game</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Đăng ký newsletter</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl transition-all duration-300 card-neon">
            <div className="mb-4">
              <h3 className="font-orbitron text-xl font-bold text-white cyber-halo">
                <span className="text-shadow-blue inline-block">
                  📞 Thông Tin Liên Hệ
                </span>
              </h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Văn Phòng</h4>
                <div className="font-rajdhani text-white/80 space-y-2 ml-6">
                  <p className="font-semibold">M-SCI Game Studio</p>
                  <p>Địa chỉ: [Địa chỉ công ty]</p>
                  <p>Email: <a href="mailto:contact@msci.game" className="text-blue-400 hover:underline">contact@msci.game</a></p>
                  <p>Website: <a href="https://www.msci.game" className="text-blue-400 hover:underline">www.msci.game</a></p>
                </div>
              </div>
              
              <div>
                <h4 className="font-rajdhani text-lg font-semibold text-blue-400 mb-2">Giờ Làm Việc</h4>
                <ul className="font-rajdhani text-white/80 space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Thứ 2 - Thứ 6: 9:00 - 18:00</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Thứ 7: 9:00 - 12:00</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 text-center mr-2">•</span>
                    <span>Chủ nhật & Lễ: Nghỉ</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mb-8"></div>
          <p className="font-rajdhani text-white/50 text-sm">
            Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
          </p>
          <p className="font-rajdhani text-white/80 mt-4">
            Cảm ơn bạn đã chơi M-SCI! Chúng tôi luôn nỗ lực để mang đến trải nghiệm tốt nhất cho người chơi.
          </p>
        </div>
      </div>
      
      {/* Join Us Footer - Inspired by Overwatch */}
      <div className="relative w-full overflow-hidden">
        {/* Battlefield Image Background */}
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
          <Image 
            src="/images/overwatch_bg_2.jpg" 
            alt="Support background" 
            fill
            sizes="100vw"
            className="object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/70 to-[#041019]/90"></div>
          
          <div className="absolute inset-0 z-10">
            <div className="container mx-auto h-full flex flex-col items-center justify-center text-center py-10 px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">
                CẦN THÊM HỖ TRỢ? THAM GIA CỘNG ĐỒNG M-SCI!
              </h2>
              
              <Link 
                href="/discord"
                className="mt-4 mb-8 px-8 py-3 bg-[#7289DA] hover:bg-[#5E78D5] text-white font-medium rounded transition-colors duration-300 uppercase tracking-wider text-lg shadow-lg hover:shadow-[#7289DA]/50"
              >
                THAM GIA DISCORD
              </Link>
              
              <div className="mt-8">
                <h3 className="text-gray-300 uppercase text-sm tracking-widest mb-4">THEO DÕI CHÚNG TÔI</h3>
                <div className="flex justify-center space-x-6">
                  <a href="#" className="text-white hover:text-[#7289DA] transition-colors">
                    <FaFacebookF className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-[#7289DA] transition-colors">
                    <FaTwitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-[#7289DA] transition-colors">
                    <FaYoutube className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-[#7289DA] transition-colors">
                    <FaDiscord className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-[#7289DA] transition-colors">
                    <FaTelegram className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Interface */}
      <CustomChatInterface
        systemPrompt="Bạn là Akane, một trợ lý AI thông minh và thân thiện từ M-SCI. Hãy giúp đỡ người dùng với các câu hỏi về game bằng tiếng Việt."
        modelName="deepseek-chat"
        enableStreaming={true}
        botName="Akane AI"
      />
    </div>
  );
}