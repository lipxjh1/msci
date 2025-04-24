'use client';

import { useState, useEffect, useRef } from 'react';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';

// Import các component mới
import GachaBanner from '@/components/gacha/GachaBanner';
import CardSpinner from '@/components/gacha/CardSpinner';
import ResultPopup from '@/components/gacha/ResultPopup';
import GachaInfo from '@/components/gacha/GachaInfo';
import GachaMoreInfo from '@/components/gacha/GachaMoreInfo';
import GachaStyles from '@/components/gacha/GachaStyles';
import { Card, CardsData } from '@/components/gacha/CardInterface';

export default function GachaPage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showResult, setShowResult] = useState(false);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Sử dụng dữ liệu từ CardInterface
  const cards = CardsData;

  // Tạo bộ thẻ mở rộng để hiệu ứng di chuyển liên tục - nhiều hơn để tránh khoảng trống
  const extendedCards = [...cards, ...cards, ...cards, ...cards, ...cards, ...cards, ...cards, ...cards, ...cards, ...cards]; // 10 bộ thẻ để cuộn

  // Randomize card with weighted probability
  const getRandomCard = () => {
    // Định nghĩa xác suất nâng cao hơn
    const rarityProbabilities = {
      'S': 0.05,  // 5%
      'A': 0.10,  // 10%
      'B': 0.30,  // 30%
      'C': 0.55   // 55%
    };

    const classProbabilities = {
      'Gunner': 0.4,     // 40%
      'Sniper': 0.35,    // 35% 
      'Rocket': 0.25     // 25%
    };

    // Xác định độ hiếm trước
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
    // Reset container position khi component được mount
    if (cardsContainerRef.current) {
      cardsContainerRef.current.style.transform = 'translateX(0)';
    }
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
    <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)]">
      {/* Menu điều hướng */}
      <ThanhDieuHuongResponsive />

      {/* Gacha Banner */}
      <GachaBanner />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Gacha Content */}
        <div className="flex flex-col items-center justify-center">
          {/* Cards Container */}
          <CardSpinner 
            extendedCards={extendedCards} 
            isSpinning={isSpinning} 
            cardRefs={cardRefs}
            cardsContainerRef={cardsContainerRef}
          />
          
          {/* Spin Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`font-rajdhani text-xl font-bold tracking-wider text-shadow-sm px-12 py-4 button-cyber clip-hexagon hexagon-border text-white transition-all duration-300 ${
              isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-[var(--accent-blue-glow)]/40'
            }`}
          >
            {isSpinning ? 'Đang Quay...' : 'Quay Gacha'}
          </button>
        </div>
      </div>

      {/* Result Popup */}
      <ResultPopup 
        showResult={showResult} 
        selectedCard={selectedCard} 
        closePopup={closePopup} 
        handleSpin={handleSpin} 
      />

      {/* Gacha Information Sections */}
      <GachaInfo />
      <GachaMoreInfo />

      {/* Styles */}
      <GachaStyles />
    </div>
  );
} 