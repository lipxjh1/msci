"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card } from './CardInterface';

interface ResultPopupProps {
  showResult: boolean;
  selectedCard: Card | null;
  closePopup: () => void;
  handleSpin: () => void;
}

const ResultPopup: React.FC<ResultPopupProps> = ({
  showResult,
  selectedCard,
  closePopup,
  handleSpin
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (showResult) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showResult]);
  
  if (!showResult || !selectedCard || !isVisible) return null;

  // Tạo hiệu ứng ánh sáng tùy theo độ hiếm
  const getRarityColor = (rarity?: string) => {
    switch(rarity) {
      case 'S': return 'rgba(255, 0, 0, 0.7)'; // Red
      case 'A': return 'rgba(138, 43, 226, 0.7)'; // Purple
      case 'B': return 'rgba(0, 123, 255, 0.7)'; // Blue
      case 'C': return 'rgba(40, 167, 69, 0.7)'; // Green
      default: return 'rgba(255, 255, 255, 0.5)';
    }
  };
  
  const rarityGlowClass = () => {
    switch(selectedCard.rarity) {
      case 'S': return 'shadow-lg shadow-red-500/50';
      case 'A': return 'shadow-lg shadow-purple-500/40';
      case 'B': return 'shadow-lg shadow-blue-500/30';
      case 'C': return 'shadow-lg shadow-green-500/20';
      default: return '';
    }
  };
  
  // Tạo chuỗi động cho hạt vũ trụ
  const particles = Array.from({ length: 20 }).map((_, i) => {
    const size = Math.random() * 2 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 3 + 2;
    
    const colors = ['blue', 'purple', 'cyan', 'green', 'red', 'yellow'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return (
      <div 
        key={i}
        className={`absolute w-${size} h-${size} bg-${color}-400 rounded-full shadow-lg shadow-${color}-400/50 animate-pulse`}
        style={{ 
          top: `${top}%`, 
          left: `${left}%`, 
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with particles */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={closePopup}
      >
        {/* Animated celebration particles */}
        {particles}
      </div>
      
      {/* Popup Content */}
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#041019]/95 to-[#0a2038]/95 border border-[var(--accent-blue-bright)]/30 rounded-xl p-8 shadow-2xl animate-scaleIn z-10">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[var(--accent-blue-bright)] rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[var(--accent-blue-bright)] rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[var(--accent-blue-bright)] rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[var(--accent-blue-bright)] rounded-br-xl"></div>
        
        {/* Card glow background based on rarity */}
        <div 
          className="absolute inset-0 rounded-xl blur-xl -z-10 opacity-60"
          style={{ 
            boxShadow: `0 0 40px ${getRarityColor(selectedCard.rarity)}`,
            background: `radial-gradient(circle at center, ${getRarityColor(selectedCard.rarity)} 0%, transparent 70%)`
          }}
        ></div>
        
        {/* Close button */}
        <button 
          onClick={closePopup}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-300 z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-3 text-shadow-blue animate-title-glow">
            <span className="relative inline-block">
              CHÚC MỪNG!
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
          <p className="text-gray-300 text-lg animate-fade-in">Bạn đã nhận được phần thưởng đặc biệt!</p>
        </div>
        
        {/* Card and Message */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Card Container with Animation */}
          <div className="relative w-56 h-64 md:w-64 md:h-72 overflow-hidden rounded-lg group animate-float">
            {/* Hexagon corners for cyberpunk feel */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[var(--accent-blue-bright)]"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[var(--accent-blue-bright)]"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[var(--accent-blue-bright)]"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[var(--accent-blue-bright)]"></div>
            
            {/* Card border based on rarity */}
            <div 
              className="absolute inset-0 rounded-lg border-2 z-10"
              style={{ 
                borderColor: getRarityColor(selectedCard.rarity),
                boxShadow: `0 0 15px ${getRarityColor(selectedCard.rarity)}`
              }}
            ></div>
            
            {/* Animated glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
            
            {/* Card image */}
            <Image
              src={selectedCard.imageUrl}
              alt={selectedCard.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 224px, 256px"
            />
            
            {/* Rarity indicator */}
            {selectedCard.rarity && (
              <div 
                className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg z-30 animate-pulse-slow" 
                style={{ 
                  backgroundColor: getRarityColor(selectedCard.rarity),
                  boxShadow: `0 0 10px ${getRarityColor(selectedCard.rarity)}`
                }}
              >
                {selectedCard.rarity}
              </div>
            )}
            
            {/* Class indicator */}
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full z-30 backdrop-blur-sm flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: selectedCard.classColor }}></span>
              <span className="text-sm font-bold" style={{ color: selectedCard.classColor }}>{selectedCard.class}</span>
            </div>
            
            {/* Subtle scanlines effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30 pointer-events-none z-20 scanline"></div>
          </div>
          
          <div className="flex-1 text-center md:text-left animate-fade-in">
            <h3 className="font-orbitron text-xl text-gray-200 mb-2">
              Bạn đã nhận được
            </h3>
            <p className="font-orbitron text-3xl md:text-4xl font-bold mb-3 text-shadow-blue animate-title-glow" style={{ color: selectedCard.classColor }}>
              {selectedCard.name}
            </p>
            
            {/* Class với icon */}
            <div className="inline-flex items-center px-3 py-1 mb-3 bg-[#05121d]/80 rounded-full">
              <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: selectedCard.classColor }}></span>
              <span className="text-sm font-semibold" style={{ color: selectedCard.classColor }}>
                {selectedCard.class}
              </span>
            </div>
            
            {/* Thêm mô tả kỹ năng nếu có */}
            {selectedCard.description && (
              <div className="p-3 mb-4 bg-[#05121d]/80 border-l-2 rounded" style={{ borderColor: selectedCard.classColor }}>
                <p className="font-rajdhani text-white/90 italic">
                  "{selectedCard.description}"
                </p>
              </div>
            )}
            
            {/* Thêm danh sách kỹ năng */}
            {selectedCard.skills && selectedCard.skills.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Kỹ năng:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCard.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="inline-block px-3 py-1 bg-[#05121d]/80 rounded-full text-sm border border-[var(--accent-blue-bright)]/30 text-white/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a 
                href="https://t.me/your_telegram_group" 
                target="_blank" 
                rel="noreferrer"
                className="font-rajdhani text-lg font-bold tracking-wider px-8 py-3 bg-gradient-to-r from-[#0088cc] to-[#0070a9] text-white rounded-lg hover:shadow-lg hover:shadow-[#0088cc]/30 transition-all duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                </svg>
                Chơi Ngay
              </a>
              
              <button
                onClick={() => {
                  closePopup();
                  setTimeout(() => handleSpin(), 300);
                }}
                className="font-rajdhani text-lg font-bold tracking-wider px-8 py-3 bg-transparent border border-[var(--accent-blue-bright)] rounded-lg text-white hover:bg-[var(--accent-blue-bright)]/10 transition-all duration-300"
              >
                Quay Tiếp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPopup; 