'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord, FaTelegram } from 'react-icons/fa';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { useDeepSeekChat } from '@/modules/box-akane';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocialLinks, getSocialIconColor } from '@/context/SocialLinksContext';

// CSS cho animation pulse-slow
const pulseAnimation = `
@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  }
  50% {
    opacity: 0.85;
    text-shadow: 0 0 25px rgba(255, 255, 255, 1);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s infinite;
}

.text-glow {
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
}
`;

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

  // Handle Enter key to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Send message
  const handleSendMessage = async () => {
    if (inputValue.trim() && !isLoading) {
      const messageToSend = inputValue;
      setInputValue('');
      await sendMessage(messageToSend);
    }
  };

  // Format message
  const formatMessage = (content: string) => {
    // Replace URLs with clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const withLinks = content.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${url}</a>`;
    });
    
    // Replace newlines with <br>
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

  // Filter messages - don't show system prompt
  const displayMessages = messages.filter(msg => msg.role !== 'system');
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat button with custom image */}
      <button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-cyan-500/30 transition-all overflow-hidden border-2 border-blue-400"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
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
                title="Reset conversation"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-blue-700 rounded"
                title="Close chat"
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
                <p>Start a conversation with {botName}!</p>
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
                  Error: {error}
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
                placeholder="Type your message..."
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
  const [activeTab, setActiveTab] = useState('gioi-thieu');
  const [showFaqSection, setShowFaqSection] = useState(false);
  const faqRef = useRef<HTMLDivElement>(null);
  const { socialLinks, loading } = useSocialLinks();

  const scrollToFaq = (sectionId: string) => {
    setActiveTab(sectionId);
    setShowFaqSection(true);
    setTimeout(() => {
      faqRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a141e] to-[#1a2634]">
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
          }
          50% {
            opacity: 0.85;
            text-shadow: 0 0 25px rgba(255, 255, 255, 1);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
        
        .text-glow {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
        }
      `}</style>
      
      <ThanhDieuHuongResponsive />

      {/* Hero section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        {/* Background image with parallax effect */}
        <div className="absolute inset-0">
          <Image
            src="/images/banner/supp.jpg"
            alt="Support"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-110"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a141e]/70 via-transparent to-[#0a141e] z-10"></div>

          {/* Animated particles */}
          <div className="absolute inset-0 z-10">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/70 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-400/70 animate-pulse delay-100"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/70 animate-pulse delay-200"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/70 animate-pulse delay-300"></div>
          </div>

          {/* Add scanline effect */}
          <div className="absolute inset-0 scanline"></div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mt-10">
              <h1 className="font-orbitron text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-pulse-slow cyber-halo">
                <span className="relative inline-block">
                  SUPPORT
                  <div className="absolute -bottom-4 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[var(--accent-red-bright)] to-transparent"></div>
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform rotate-1 scale-110 z-20"></div>
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform -rotate-1 scale-110 z-20"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pt-10 pb-20 relative z-30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Navigation sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a2634]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl sticky top-24">
                <h2 className="font-bai-jamjuree text-xl font-bold text-white mb-6 relative inline-block">
                  <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">Quick Help</span>
                  <div className="absolute -bottom-2 left-0 h-1 w-12 bg-gradient-to-r from-[#ff0000] to-transparent"></div>
                </h2>

                <nav className="space-y-2">
                  <button 
                    onClick={() => setActiveTab('gioi-thieu')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'gioi-thieu' 
                        ? 'bg-[#F44336]/20 text-white border-l-2 border-[#F44336]' 
                        : 'text-white hover:bg-white/10 hover:translate-x-1'
                    }`}
                  >
                    Introduction
                  </button>
                  <button 
                    onClick={() => scrollToFaq('huong-dan')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'huong-dan' 
                        ? 'bg-[#F44336]/20 text-white border-l-2 border-[#F44336]' 
                        : 'text-white hover:bg-white/10 hover:translate-x-1'
                    }`}
                  >
                    How to Play
                  </button>
                  <button 
                    onClick={() => scrollToFaq('cau-hoi')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'cau-hoi' 
                        ? 'bg-[#F44336]/20 text-white border-l-2 border-[#F44336]' 
                        : 'text-white hover:bg-white/10 hover:translate-x-1'
                    }`}
                  >
                    FAQ
                  </button>
                  <button 
                    onClick={() => scrollToFaq('lien-he')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'lien-he' 
                        ? 'bg-[#F44336]/20 text-white border-l-2 border-[#F44336]' 
                        : 'text-white hover:bg-white/10 hover:translate-x-1'
                    }`}
                  >
                    Contact Support
                  </button>
                  <button 
                    onClick={() => scrollToFaq('meo-choi')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'meo-choi' 
                        ? 'bg-[#F44336]/20 text-white border-l-2 border-[#F44336]' 
                        : 'text-white hover:bg-white/10 hover:translate-x-1'
                    }`}
                  >
                    Advanced Tips
                  </button>
                </nav>

                <div className="mt-8 p-4 bg-gradient-to-r from-[#F44336]/20 to-[#1a2634]/80 border border-[#F44336]/30 rounded-lg shadow-[0_0_15px_rgba(244,67,54,0.4)]">
                  <h3 className="font-medium text-white mb-2 drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]">Emergency Support?</h3>
                  <p className="text-white text-sm mb-3">
                    Contact our support team via:
                  </p>
                  <div className="flex items-center space-x-2 text-[#F44336] text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a href="mailto:support@msci.game" className="hover:underline text-white">
                      support@msci.game
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="lg:col-span-3">
              {/* Giới thiệu game */}
              <div className={`${activeTab === 'gioi-thieu' ? 'block' : 'hidden'}`}>
                <div className="bg-[#1a2634]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-xl mb-8">
                  <h2 className="font-bai-jamjuree text-3xl font-bold mb-6 relative inline-block">
                    <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse-slow">Game Introduction</span>
                    <div className="absolute -bottom-2 left-0 h-1.5 w-full bg-gradient-to-r from-[#ff0000] via-[#ff5555] to-transparent"></div>
                  </h2>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-white mb-4">
                      M-SCI is a science fiction tactical action game set in 2049. In a world where the X-Corp technology conglomerate under the control of The Ascended is threatening the future of humanity, players join the M-SCI force founded by Elon Musk to protect the future of mankind.
                    </p>

                    <div className="mb-6">
                      <h3 className="font-medium text-white text-lg mb-2">Objectives:</h3>
                      <ul className="text-white list-disc pl-5 space-y-1">
                        <li className="text-white">Control a team of 3 heroes</li>
                        <li className="text-white">Eliminate enemies appearing within 30 seconds of each level</li>
                        <li className="text-white">The game has a total of 100 levels divided into 5 major areas</li>
                      </ul>
                    </div>
            
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
                        <h3 className="font-medium text-lg mb-3 flex items-center">
                          <span className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center mr-2 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </span>
                          <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">Key Features</span>
                        </h3>
                        <ul className="text-white space-y-1 pl-10 list-disc [&>li]:text-white">
                          <li>High-speed combat, each level lasts 30 seconds</li>
                          <li>3 character classes with distinct roles</li>
                          <li>Hero upgrade and evolution system</li>
                          <li>Modern sci-fi graphics, stunning shooting effects</li>
                        </ul>
                      </div>

                      <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300">
                        <h3 className="font-medium text-lg mb-3 flex items-center">
                          <span className="w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center mr-2 shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </span>
                          <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">Play with Friends</span>
                        </h3>
                        <ul className="text-white space-y-1 pl-10 list-disc [&>li]:text-white">
                          <li>Create and join Guilds</li>
                          <li>Fight in Guild Wars as a team</li>
                          <li>Challenge others in 1v1 and 3v3 PvP</li>
                          <li>Weekly global boss challenges</li>
                        </ul>
                      </div>
                    </div>
            
                    <div className="bg-gradient-to-r from-[#ff0000]/20 to-transparent p-4 rounded-lg border-l-4 border-red-500 mb-4">
                      <p className="text-white italic font-bold">
                        "Fight without stopping - Win without limits!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            
              {/* How to Play */}
              <div className={`${activeTab === 'huong-dan' ? 'block' : 'hidden'}`} ref={faqRef}>
                <div className="bg-[#1a2634]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-xl mb-8">
                  <h2 className="font-bai-jamjuree text-3xl font-bold mb-6 relative inline-block">
                    <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse-slow">Basic Gameplay Guide</span>
                    <div className="absolute -bottom-2 left-0 h-1.5 w-full bg-gradient-to-r from-[#ff0000] via-[#ff5555] to-transparent"></div>
                  </h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="font-medium text-white text-xl mb-4 flex items-center">
                        <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                          </svg>
                        </span>
                        <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">Controls</span>
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-11">
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300">
                          <ul className="text-white space-y-3">
                            <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 shadow-[0_0_8px_rgba(59,130,246,0.4)]">
                                <span className="text-blue-400 text-xs">1</span>
                              </span>
                              <span>Tap the screen to shoot and use skills</span>
                            </li>
                            <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 shadow-[0_0_8px_rgba(59,130,246,0.4)]">
                                <span className="text-blue-400 text-xs">2</span>
                              </span>
                              <span>When enemies prepare to shoot, take cover behind fortifications to avoid being defeated</span>
                            </li>
                            <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 shadow-[0_0_8px_rgba(59,130,246,0.4)]">
                                <span className="text-blue-400 text-xs">3</span>
                              </span>
                              <span>Suicide Drones cannot be avoided by hiding, they must be shot down as soon as possible</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="relative h-full min-h-[180px] rounded-xl overflow-hidden border border-white/10">
                          <Image 
                            src="/images/banner/play.jpg" 
                            alt="Game Controls" 
                            fill 
                            sizes="(max-width: 768px) 100vw, 50vw" 
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1923]/90 via-transparent to-transparent"></div>
                          <div className="absolute bottom-4 left-0 right-0 text-center">
                            <span className="px-4 py-1 bg-[#F44336]/60 text-white text-sm rounded-full">
                              Controls Illustration
                </span>
            </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-white text-xl mb-4 flex items-center">
                      <span className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </span>
                      <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">Character Class System</span>
                    </h3>
                    
                    <div className="pl-11">
                      <p className="text-white mb-4">
                        The game has 3 main classes, each with unique roles and strengths:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] transition-all duration-300">
                          <h4 className="font-medium text-blue-400 mb-2">Gunner</h4>
                          <ul className="text-white space-y-1 list-disc pl-5 text-sm">
                            <li>High rate of fire</li>
                            <li>Effective at close and medium range</li>
                            <li>Weak against Drones and Shields</li>
                          </ul>
                        </div>
                        
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:shadow-[0_0_15px_rgba(248,113,113,0.3)] transition-all duration-300">
                          <h4 className="font-medium text-red-400 mb-2">Sniper</h4>
                          <ul className="text-white space-y-1 list-disc pl-5 text-sm">
                            <li>High damage</li>
                            <li>Precision shots</li>
                            <li>Natural counter to Drones</li>
                            <li>Weak in close combat</li>
                          </ul>
                        </div>
                        
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] transition-all duration-300">
                          <h4 className="font-medium text-green-400 mb-2">Rocket/Cannon</h4>
                          <ul className="text-white space-y-1 list-disc pl-5 text-sm">
                            <li>Area of effect damage</li>
                            <li>Effectively breaks Shields</li>
                            <li>Slow rate of fire</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-orange-500/30 to-transparent p-4 rounded-lg border-l-4 border-orange-500 text-white text-sm">
                        <p>
                          <span className="font-semibold text-white">Important note:</span> Each team needs all 3 classes, flexibly switching between classes is the key to victory.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* FAQ */}
              <div className={`${activeTab === 'cau-hoi' ? 'block' : 'hidden'}`} ref={faqRef}>
                <div className="bg-[#1a2634]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-xl mb-8">
                  <h2 className="font-bai-jamjuree text-3xl font-bold mb-6 relative inline-block">
                    <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse-slow">Frequently Asked Questions (FAQ)</span>
                    <div className="absolute -bottom-2 left-0 h-1.5 w-full bg-gradient-to-r from-[#ff0000] via-[#ff5555] to-transparent"></div>
                  </h2>

                  <div className="space-y-8">
                    {/* Download */}
                    <div>
                      <h3 className="font-medium text-white text-xl mb-4 flex items-center">
                        <span className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </span>
                        <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">Game Download</span>
                      </h3>
                      
                      <div className="pl-11 space-y-4">
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300">
                          <h4 className="font-medium text-white mb-3 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">How to download and play M-SCI?</h4>
                          <p className="text-white">
                            M-SCI is currently available on the Telegram Mini App platform and will soon be released as a standalone mobile version for Android/iOS. To play the Telegram version, find the official M-SCI bot and press Start.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* System Requirements */}
                    <div>
                      <h3 className="font-medium text-white text-xl mb-4 flex items-center">
                        <span className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                          </svg>
                        </span>
                        <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">System Requirements</span>
                      </h3>
                      
                      <div className="pl-11 space-y-4">
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300">
                          <h4 className="font-medium text-white mb-3 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">Does the game have high system requirements?</h4>
                          <p className="text-white">
                            Not particularly high. M-SCI can run smoothly on most mid-range smartphones from 2018 onwards. The Telegram version runs on both computers and mobile devices.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Guild and Solo Play */}
                    <div>
                      <h3 className="font-medium text-white text-xl mb-4 flex items-center">
                        <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </span>
                        <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">Guild and Solo Play</span>
                      </h3>
                      
                      <div className="pl-11 space-y-4">
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300">
                          <h4 className="font-medium text-white mb-3 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">Can I play solo without joining a guild?</h4>
                          <p className="text-white">
                            Absolutely! You can fully enjoy the campaign mode, world boss events, and gacha draws without joining a guild. However, joining a guild unlocks additional exciting activities such as guild wars and guild bosses.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Rare Characters */}
                    <div>
                      <h3 className="font-medium text-white text-xl mb-4 flex items-center">
                        <span className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(250,204,21,0.4)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </span>
                        <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">Rare Characters</span>
                      </h3>
                      
                      <div className="pl-11 space-y-4">
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-all duration-300">
                          <h4 className="font-medium text-white mb-3 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">How can I get legendary S-tier characters? Do I need to spend money?</h4>
                          <p className="text-white mb-3">
                            There are 4 main ways without spending money:
                          </p>
                          <ul className="text-white list-disc pl-5 space-y-1">
                            <li>Play campaign to higher levels (from area 4 onwards)</li>
                            <li>Lucky Gacha draws (probability ~1-5%)</li>
                            <li>Shard combining (collect 4 shards of an S-tier character)</li>
                            <li>Evolution (upgrade A-tier heroes to S-tier with a 5% success rate)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Character Upgrades */}
                    <div>
                      <h3 className="font-medium text-white text-xl mb-4 flex items-center">
                        <span className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </span>
                        <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">Character Upgrades</span>
                      </h3>
                      
                      <div className="pl-11 space-y-4">
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all duration-300">
                          <h4 className="font-medium text-white mb-3 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">Will I lose my character if I fail to increase stars?</h4>
                          <p className="text-white">
                            If you don't use Memory insurance and fail, you will permanently lose the base character and materials. When using enough MSCI Memory as required, if you fail, you will only lose materials, the base character will be retained.
                          </p>
                        </div>
                        
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all duration-300">
                          <h4 className="font-medium text-white mb-3 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">What upgrades should I prioritize for characters when starting out?</h4>
                          <p className="text-white">
                            Focus on leveling up your 3 main characters (prioritize reaching level 5 then 10), while simultaneously increasing stars for at least one core character, and make sure to unlock all 3 classes for a balanced team composition.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Resource Gathering */}
                    <div>
                      <h3 className="font-medium text-white text-xl mb-4 flex items-center">
                        <span className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">Resource Gathering</span>
                      </h3>
                      
                      <div className="pl-11 space-y-4">
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300">
                          <h4 className="font-medium text-white mb-3 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">How to quickly earn more Chips?</h4>
                          <p className="text-white mb-3">
                            Some effective methods:
                          </p>
                          <ul className="text-white list-disc pl-5 space-y-1">
                            <li>Replay levels 20, 40, 60, 80, 100 (maximum 10 times/day)</li>
                            <li>Participate in Boss/Elite Boss fights</li>
                            <li>Complete daily and weekly missions</li>
                            <li>Buy Blind Bags from the shop</li>
                            <li>Participate in special events</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Trading & Economy */}
                    <div>
                      <h3 className="font-medium text-white text-xl mb-4 flex items-center">
                        <span className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </span>
                        <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">Trading & Economy</span>
                      </h3>
                      
                      <div className="pl-11 space-y-4">
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300">
                          <h4 className="font-medium text-white mb-3 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">How to sell items/characters?</h4>
                          <p className="text-white">
                            Use the Center Market in the game. Here you can list characters and items for sale to other players and receive M-Coin (with a 5% transaction fee). Note: account trading is not encouraged.
                          </p>
                        </div>
                        
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300">
                          <h4 className="font-medium text-white mb-3 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">Can the game earn real money?</h4>
                          <p className="text-white">
                            M-SCI is a Play-to-Earn entertainment game. You can earn $MSCI tokens or valuable NFT items, but M-Coin and most in-game assets cannot be directly converted to cash. Consider token earning as an additional reward, don't view the game as a tool for getting rich.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Tips */}
              <div className={`${activeTab === 'meo-choi' ? 'block' : 'hidden'}`} ref={faqRef}>
                <div className="bg-[#1a2634]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-xl mb-8">
                  <h2 className="font-bai-jamjuree text-3xl font-bold mb-6 relative inline-block">
                    <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse-slow">Advanced Tips</span>
                    <div className="absolute -bottom-2 left-0 h-1.5 w-full bg-gradient-to-r from-[#ff0000] via-[#ff5555] to-transparent"></div>
                  </h2>

                  <div className="space-y-8">
                    {/* Team Strategy */}
                    <div>
                      <h3 className="font-medium text-white text-xl mb-4 flex items-center">
                        <span className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                          </svg>
                        </span>
                        <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">Team Strategy</span>
                      </h3>
                      
                      <div className="pl-11 space-y-4">
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300">
                          <ul className="text-white space-y-3">
                            <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 shadow-[0_0_8px_rgba(59,130,246,0.4)]">
                                <span className="text-blue-400 text-xs">1</span>
                              </span>
                              <span>Always maintain a team with all 3 classes at their strongest possible level</span>
                            </li>
                            <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 shadow-[0_0_8px_rgba(59,130,246,0.4)]">
                                <span className="text-blue-400 text-xs">2</span>
                              </span>
                              <span>Switch characters flexibly based on enemy types (Drone → Sniper, Shield → Rocket)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 shadow-[0_0_8px_rgba(59,130,246,0.4)]">
                                <span className="text-blue-400 text-xs">3</span>
                              </span>
                              <span>Prioritize eliminating Suicide Drones before they approach</span>
                            </li>
                          </ul>
                        </div>

                        <div className="relative h-[180px] rounded-xl overflow-hidden border border-white/10">
                          <Image 
                            src="/images/banner/meo.jpeg" 
                            alt="Strategy" 
                            fill 
                            sizes="(max-width: 768px) 100vw, 100vw" 
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1923]/90 via-[#0f1923]/50 to-transparent"></div>

                        </div>
                      </div>
              </div>
              
                    {/* Resource Management */}
              <div>
                      <h3 className="font-medium text-white text-xl mb-4 flex items-center">
                        <span className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">Resource Management</span>
                      </h3>
                      
                      <div className="pl-11 space-y-4">
                        <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                          <ul className="text-white space-y-3">
                  <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-green-400 text-xs">1</span>
                              </span>
                              <span>Accumulate enough MSCI Memory before attempting to increase stars for valuable characters</span>
                  </li>
                  <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-green-400 text-xs">2</span>
                              </span>
                              <span>Keep some duplicate characters as evolution materials, don't rush to sell them all</span>
                  </li>
                  <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-green-400 text-xs">3</span>
                              </span>
                              <span>Prioritize evolution from the highest tier (A→S is better than B→S)</span>
                  </li>
                </ul>
                        </div>
                      </div>
              </div>
              
                    <div className="bg-gradient-to-r from-[#ff0000]/20 to-transparent p-4 rounded-lg border-l-4 border-red-500 mb-4">
                      <p className="text-white italic text-center">
                        "Fight without stopping - Win without limits!"
                      </p>
              </div>
            </div>
          </div>
        </div>
        
              {/* Contact Support */}
              <div className={`${activeTab === 'lien-he' ? 'block' : 'hidden'}`} ref={faqRef}>
                <div className="bg-[#1a2634]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-xl mb-8">
                  <h2 className="font-bai-jamjuree text-3xl font-bold mb-6 relative inline-block">
                    <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse-slow">Contact Support</span>
                    <div className="absolute -bottom-2 left-0 h-1.5 w-full bg-gradient-to-r from-[#ff0000] via-[#ff5555] to-transparent"></div>
                  </h2>

                  <div className="space-y-6">
                    <p className="text-white">
                      If you need additional support or have feedback, please use one of the contact channels below:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(244,67,54,0.4)] transition-all duration-300">
                        <h3 className="font-medium text-white mb-4 flex items-center">
                          <span className="w-8 h-8 bg-[#F44336]/20 rounded-full flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(244,67,54,0.4)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F44336]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                          </span>
                          <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">Community Channels</span>
                        </h3>
                        
                        <ul className="space-y-3 pl-11">
                          <li className="flex items-center space-x-2 text-white">
                            <FaDiscord className="text-[#7289DA]" />
                            <span>Discord: </span>
                            <a href="https://discord.gg/msci" className="text-blue-400 hover:underline">discord.gg/msci</a>
                  </li>
                          <li className="flex items-center space-x-2 text-white">
                            <FaTelegram className="text-[#0088cc]" />
                            <span>Telegram: </span>
                            <a href="https://t.me/mscigame" className="text-blue-400 hover:underline">t.me/mscigame</a>
                  </li>
                </ul>
              </div>
              
                      <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300">
                        <h3 className="font-medium text-white mb-4 flex items-center">
                          <span className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </span>
                          <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">Email & Ticket</span>
                        </h3>
                        
                        <ul className="space-y-3 pl-11">
                          <li className="flex items-center space-x-2 text-white">
                            <span>Email: </span>
                            <a href="mailto:support@m-sci.game" className="text-blue-400 hover:underline hover:text-blue-300 transition-colors">support@m-sci.game</a>
                          </li>
                          <li className="flex items-center text-white">
                            <span>In-game Support: Use the "Help" section in the game to submit a ticket</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300 mt-4">
                      <h3 className="font-medium text-white mb-4 flex items-center">
                        <span className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">Bug Reports and Rewards</span>
                      </h3>
                      
                      <div className="pl-11">
                        <p className="text-white mb-3">
                          If you discover a bug, report it to the Game Master to receive a thank-you gift. Please provide the following information:
                        </p>
                        
                        <ul className="text-white list-disc pl-5 space-y-1">
                          <li>Screenshot or video demonstrating the bug</li>
                          <li>Steps to reproduce the bug (if possible)</li>
                          <li>Device and operating system version you're using</li>
                          <li>Your game account ID</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Contact Form */}
                    <div className="bg-[#0f1923]/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 mt-6 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-500">
                      <h3 className="font-medium text-white mb-4 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">Send Support Request Now</h3>
                      
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-white text-sm mb-1">Full Name</label>
                            <input 
                              type="text" 
                              id="name" 
                              className="w-full px-4 py-2 bg-[#1a2634] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F44336]/50 focus:border-transparent text-white"
                              placeholder="Enter your name"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-white text-sm mb-1">Email</label>
                            <input 
                              type="email" 
                              id="email" 
                              className="w-full px-4 py-2 bg-[#1a2634] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F44336]/50 focus:border-transparent text-white"
                              placeholder="email@example.com"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block text-white text-sm mb-1">Subject</label>
                          <select 
                            id="subject"
                            className="w-full px-4 py-2 bg-[#1a2634] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F44336]/50 focus:border-transparent text-white"
                          >
                            <option value="" className="bg-[#1a2634]">Select a subject</option>
                            <option value="gameplay" className="bg-[#1a2634]">Gameplay issue</option>
                            <option value="account" className="bg-[#1a2634]">Account problem</option>
                            <option value="payment" className="bg-[#1a2634]">Payment</option>
                            <option value="suggestion" className="bg-[#1a2634]">Improvement suggestion</option>
                            <option value="other" className="bg-[#1a2634]">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-white text-sm mb-1">Message</label>
                          <textarea 
                            id="message" 
                            rows={5}
                            className="w-full px-4 py-2 bg-[#1a2634] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F44336]/50 focus:border-transparent text-white resize-none"
                            placeholder="Describe your issue in detail..."
                          ></textarea>
                        </div>
                        
                        <button 
                          type="submit"
                          className="w-full px-6 py-3 font-rajdhani font-bold tracking-wider text-shadow-sm button-cyber clip-hexagon hexagon-border text-white bg-gradient-to-r from-[#F44336]/80 to-[#F44336]/40 hover:from-[#F44336] hover:to-[#F44336]/60 transition-all duration-300 shadow-[0_0_10px_rgba(244,67,54,0.3)] hover:shadow-[0_0_15px_rgba(244,67,54,0.5)]"
                        >
                          Submit Request
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Join Us Footer - Inspired by Overwatch */}
      <div className="relative w-full overflow-hidden">
        {/* Battlefield Image Background */}
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
          <Image 
            src="/images/banner/chantran1.jpg" 
            alt="Support background" 
            fill
            sizes="100vw"
            className="object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/70 to-[#041019]/90"></div>
          
          <div className="absolute inset-0 z-10">
            <div className="container mx-auto h-full flex flex-col items-center justify-center text-center py-10 px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]">
                NEED MORE HELP? JOIN THE M-SCI COMMUNITY!
              </h2>
              
              <Link 
                href="/discord"
                className="mt-4 mb-8 px-8 py-3 bg-[#7289DA] hover:bg-[#5E78D5] text-white font-medium rounded transition-colors duration-300 uppercase tracking-wider text-lg shadow-lg hover:shadow-[0_0_20px_rgba(114,137,218,0.7)]"
              >
                JOIN DISCORD
              </Link>
              
              <div className="mt-8">
                <h3 className="text-white uppercase text-sm tracking-widest mb-4">FOLLOW US</h3>
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#7289DA] transition-colors"
                      title={social.name}
                    >
                      <span className="h-6 w-6">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Interface */}
      <CustomChatInterface
        systemPrompt="You are Akane, a smart and friendly AI assistant from M-SCI. Help users with their game questions in English."
        modelName="deepseek-chat"
        enableStreaming={true}
        botName="Akane AI"
      />
    </div>
  );
}