import React from 'react';
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
  if (!showResult || !selectedCard) return null;

  // Tạo hiệu ứng ánh sáng tùy theo độ hiếm
  const rarityGlow = () => {
    switch(selectedCard.rarity) {
      case 'S': return 'shadow-lg shadow-red-500/50';
      case 'A': return 'shadow-lg shadow-purple-500/40';
      case 'B': return 'shadow-lg shadow-blue-500/30';
      case 'C': return 'shadow-lg shadow-green-500/20';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with particles */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closePopup}
      >
        {/* Animated celebration particles */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-ping"></div>
        <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-ping delay-100"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-ping delay-200"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50 animate-ping delay-300"></div>
      </div>
      
      {/* Popup Content */}
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#041019]/95 to-[#0a2038]/95 border border-white/20 rounded-xl p-6 shadow-2xl animate-scaleIn z-10">
        {/* Card glow background based on rarity */}
        <div className={`absolute inset-0 rounded-xl blur-xl -z-10 opacity-60 ${rarityGlow()}`}></div>
        
        {/* Close button */}
        <button 
          onClick={closePopup}
          className="absolute top-3 right-3 text-white/70 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-orbitron text-2xl text-white cyber-halo mb-2">CHÚC MỪNG!</h2>
          <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
        </div>
        
        {/* Card and Message */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-lg group">
            {/* Card frame based on rarity */}
            <div className={`absolute inset-0 rounded-lg border-2 ${rarityGlow()} z-10`}></div>
            
            {/* Card shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
            
            <Image
              src={selectedCard.imageUrl}
              alt={selectedCard.name}
              fill
              className="object-cover"
            />
            
            {/* Rarity indicator */}
            {selectedCard.rarity && (
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold z-30" 
                   style={{ backgroundColor: selectedCard.classColor }}>
                {selectedCard.rarity}
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-orbitron text-2xl text-white mb-2">
              Bạn đã nhận được
            </h3>
            <p className="font-orbitron text-3xl font-bold mb-2" style={{ color: selectedCard.classColor }}>
              {selectedCard.name}
            </p>
            <p className="font-rajdhani text-lg text-white/80 mb-1">
              Class: <span style={{ color: selectedCard.classColor }}>{selectedCard.class}</span>
            </p>
            
            {/* Thêm mô tả kỹ năng nếu có */}
            {selectedCard.description && (
              <p className="font-rajdhani text-white/90 mb-2">
                "{selectedCard.description}"
              </p>
            )}
            
            {/* Thêm danh sách kỹ năng */}
            {selectedCard.skills && selectedCard.skills.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {selectedCard.skills.map((skill, index) => (
                    <span key={index} className="inline-block px-2 py-1 bg-white/10 rounded-full text-sm text-white/80">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <p className="font-rajdhani text-white/70 mb-6">
              Thử thách bản thân và khám phá thế giới M-SCI ngay bây giờ!
            </p>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://t.me/your_telegram_group" 
                target="_blank" 
                rel="noreferrer"
                className="font-rajdhani text-lg font-bold tracking-wider text-shadow-sm px-6 py-3 button-cyber clip-hexagon bg-[#0088cc] text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#0088cc]/40 flex items-center justify-center"
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
                className="font-rajdhani text-lg font-bold tracking-wider text-shadow-sm px-6 py-3 button-cyber clip-hexagon hexagon-border text-white transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/40"
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