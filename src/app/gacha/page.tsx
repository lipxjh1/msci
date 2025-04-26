'use client';

import { useState, useEffect, useRef } from 'react';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { Card, CardsData } from '@/components/gacha/CardInterface';
import dynamic from 'next/dynamic';

// Import components
const GachaBanner = dynamic(() => import('@/components/gacha/GachaBanner'), { ssr: false });
const CardSpinner = dynamic(() => import('@/components/gacha/CardSpinner'), { ssr: false });
const ResultPopup = dynamic(() => import('@/components/gacha/ResultPopup'), { ssr: false });
const GachaInfo = dynamic(() => import('@/components/gacha/GachaInfo'), { ssr: false });
const GachaMoreInfo = dynamic(() => import('@/components/gacha/GachaMoreInfo'), { ssr: false });

export default function GachaPage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Dữ liệu thẻ từ CardInterface
  const cards = CardsData;

  // Tạo bộ thẻ mở rộng để hiệu ứng di chuyển liên tục
  const extendedCards = [...cards, ...cards, ...cards, ...cards, ...cards, ...cards, ...cards, ...cards, ...cards, ...cards];

  // Random card with weighted probability
  const getRandomCard = () => {
    const rarityProbabilities = {
      'S': 0.05,  // 5%
      'A': 0.10,  // 10%
      'B': 0.30,  // 30%
      'C': 0.55   // 55%
    };

    // Xác định độ hiếm
    const rand = Math.random();
    let rarity: 'S' | 'A' | 'B' | 'C';
    
    if (rand < rarityProbabilities['S']) {
      rarity = 'S';
    } else if (rand < rarityProbabilities['S'] + rarityProbabilities['A']) {
      rarity = 'A';
    } else if (rand < rarityProbabilities['S'] + rarityProbabilities['A'] + rarityProbabilities['B']) {
      rarity = 'B';
    } else {
      rarity = 'C';
    }
    
    // Lọc các thẻ theo độ hiếm
    const cardsOfRarity = cards.filter(card => card.rarity === rarity);
    
    // Nếu không có thẻ nào phù hợp, trả về một thẻ ngẫu nhiên
    if (cardsOfRarity.length === 0) {
      return cards[Math.floor(Math.random() * cards.length)];
    }
    
    // Chọn ngẫu nhiên một thẻ từ danh sách đã lọc
    return cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];
  };
  
  const closePopup = () => {
    setShowResult(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    // Animation loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Reset container position khi component được mount
    if (cardsContainerRef.current) {
      cardsContainerRef.current.style.transform = 'translateX(0)';
    }
    
    return () => clearTimeout(timer);
  }, []);

  const animateCardSelection = async () => {
    if (!cardsContainerRef.current) return;
    
    // Đặt lại vị trí ban đầu
    cardsContainerRef.current.style.transition = 'none';
    cardsContainerRef.current.style.transform = 'translateX(0)';
    
    // Force reflow để reset animation
    void cardsContainerRef.current.offsetWidth;
    
    // Thêm class animation
    cardsContainerRef.current.classList.add('spinning-cards');
    
    // Đặt thời gian quay là 3 giây
    setTimeout(() => {
      if (!cardsContainerRef.current) return;
      
      // Dừng animation
      cardsContainerRef.current.classList.remove('spinning-cards');
      
      // Chọn card ngẫu nhiên
      const card = getRandomCard();
      setSelectedCard(card);
      
      // Hiển thị kết quả sau 500ms
      setTimeout(() => {
        setShowResult(true);
        setIsSpinning(false);
      }, 500);
    }, 3000);
  };

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowResult(false);
    setSelectedCard(null);
    
    // Bắt đầu animation di chuyển các thẻ
    animateCardSelection();
  };

  return (
    <main className="min-h-screen bg-[#041019] text-white overflow-hidden">
      {/* Thanh điều hướng */}
      <div className="relative z-30">
      <ThanhDieuHuongResponsive />
      </div>

      {/* Hero Banner */}
      <div className="relative min-h-[200px]">
        <GachaBanner />
      </div>

      <div id="gacha-content" className="max-w-6xl mx-auto px-4 py-6 relative z-10">
        {/* Curved section top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#041019] -translate-y-full"></div>
        
        {/* Main Gacha Container */}
        <div className="bg-[#05121d]/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-[var(--accent-blue-bright)]/30 mb-6 shadow-lg shadow-[var(--accent-blue-bright)]/5">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold mb-3 text-shadow-blue animate-title-glow">
              <span className="relative inline-block">
                VÒNG QUAY MAY MẮN
                <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">Thử vận may của bạn với hệ thống Gacha độc đáo. Quay để có cơ hội nhận được các nhân vật hiếm với tỷ lệ rơi khác nhau.</p>
          </div>

          {/* Cards Container */}
          <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <CardSpinner 
            extendedCards={extendedCards} 
            isSpinning={isSpinning} 
            cardRefs={cardRefs}
            cardsContainerRef={cardsContainerRef}
          />
          
          {/* Spin Button */}
            <div className="flex justify-center mt-4">
          <button
            onClick={handleSpin}
            disabled={isSpinning}
                className={`font-rajdhani text-lg md:text-xl font-bold tracking-wider px-8 md:px-12 py-3 md:py-4 button-cyber clip-hexagon hexagon-border text-white transition-all duration-300 ${
              isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/40'
            }`}
          >
                {isSpinning ? 'ĐANG QUAY...' : 'QUAY GACHA'}
          </button>
            </div>
          </div>
        </div>
        
        {/* Gacha Information Section - HỆ THỐNG GACHA */}
        <div className="animate-fade-in mb-4">
          <GachaInfo />
        </div>
        
        {/* Gacha More Information Section */}
        <div className="animate-fade-in delay-300">
          <GachaMoreInfo />
        </div>
      </div>

      {/* Result Popup */}
      <ResultPopup 
        showResult={showResult} 
        selectedCard={selectedCard} 
        closePopup={closePopup} 
        handleSpin={handleSpin} 
      />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-8 w-16 h-16 rotate-45 border border-[var(--accent-blue-bright)]/30 rounded-lg opacity-50 animate-pulse-slow hidden md:block"></div>
      <div className="absolute bottom-1/4 right-8 w-12 h-12 rotate-12 border border-[var(--accent-blue-bright)]/30 rounded-lg opacity-50 animate-pulse-slow delay-300 hidden md:block"></div>

      {/* CSS global styles */}
      <style jsx global>{`
        .spinning-cards {
          animation: spinCards 3s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
        }
        
        @keyframes spinCards {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2.5));
          }
        }
      `}</style>
    </main>
  );
} 