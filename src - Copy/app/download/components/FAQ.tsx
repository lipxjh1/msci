"use client";

import React, { useState } from 'react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const faqItems = [
    {
      question: "Game có miễn phí không?",
      answer: "Hoàn toàn miễn phí! M-SCI là game free-to-play với tùy chọn mua vật phẩm trong game."
    },
    {
      question: "Tôi có thể chơi trên máy tính không?",
      answer: "Có, bạn có thể chơi qua Telegram Web hoặc Telegram Desktop. Phiên bản PC độc lập sẽ ra mắt Q4 2025."
    },
    {
      question: "Dữ liệu có được chuyển sang phiên bản mobile/PC không?",
      answer: "Có, tất cả tiến trình và vật phẩm sẽ được đồng bộ khi bạn liên kết tài khoản."
    },
    {
      question: "Cấu hình yêu cầu?",
      answer: "Telegram Mini App: Chỉ cần kết nối internet ổn định\nMobile (tương lai): Android 8.0+ / iOS 13+\nPC (tương lai): CPU i5, RAM 8GB, GPU GTX 1060"
    }
  ];

  return (
    <section className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-gray-600/10 to-gray-700/10 rounded-lg blur-xl opacity-30"></div>
      
      <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30 p-6 md:p-8">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
        
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-orbitron font-bold mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-white">
              Câu Hỏi Thường Gặp
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto rounded-full"></div>
          <p className="mt-3 text-gray-400 max-w-xl mx-auto">
            Những thông tin bạn cần biết về M-SCI
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className="group relative bg-gray-800/60 rounded-lg overflow-hidden border border-gray-700/50 hover:border-gray-600/70 transition-colors duration-300"
              >
                <button 
                  className="w-full p-5 text-left flex items-center justify-between focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="font-orbitron font-semibold text-white text-lg">
                    {item.question}
                  </h3>
                  <div className={`w-6 h-6 flex-shrink-0 relative transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                    <svg className="absolute inset-0 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="border-t border-gray-700/50 p-5 text-gray-300 whitespace-pre-line">
                    {item.answer}
                  </div>
                </div>
                
                {/* Decorative side accent */}
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600 transform ${activeIndex === index ? 'scale-y-100' : 'scale-y-0'} transition-transform duration-300 origin-top`}></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="https://t.me/msci_community" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <span className="mr-1">Có câu hỏi khác? Hỏi cộng đồng của chúng tôi</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 