'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Card, { CardType } from './Card';

interface BoardProps {
  cards: CardType[];
  onCardClick: (card: CardType) => void;
  selectedCards: CardType[];
  matchedPairs: string[];
  isAnimating: boolean;
  isPaused: boolean;
  isGameOver: boolean;
}

const Board: React.FC<BoardProps> = ({
  cards,
  onCardClick,
  selectedCards,
  matchedPairs,
  isAnimating,
  isPaused,
  isGameOver
}) => {
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
  const [cardSize, setCardSize] = useState(0);
  
  // Tìm số hàng và số cột tối đa
  const maxCol = Math.max(...cards.map(card => card.col), 0) + 1;
  const maxRow = Math.max(...cards.map(card => card.row), 0) + 1;
  
  // Điều chỉnh kích thước bảng và thẻ bài
  const calculateSizes = useCallback(() => {
    // Kiểm tra xem có phải là thiết bị di động không
    const isMobile = window.innerWidth <= 768;
    
    // Đảm bảo kích thước container phù hợp với thiết bị
    const containerWidth = isMobile 
      ? window.innerWidth * 0.95 - 24 // Trừ đi padding container
      : Math.min(window.innerWidth * 0.9, 800);
    
    const containerHeight = isMobile 
      ? window.innerHeight * 0.5 
      : Math.min(window.innerHeight * 0.65, 600);
    
    // Tính toán kích thước thẻ bài
    const actualWidth = Math.min(containerWidth, containerHeight * (maxCol / maxRow));
    const actualHeight = Math.min(containerHeight, containerWidth * (maxRow / maxCol));
    
    // Tính toán kích thước thẻ dựa trên thiết bị
    let calculatedCardSize;
    
    if (isMobile) {
      // Tính toán kích thước thẻ cho mobile
      calculatedCardSize = Math.floor(Math.min(
        actualWidth / maxCol,
        actualHeight / maxRow
      )) - (isMobile ? 4 : 8); // Giảm padding trên mobile
    } else {
      calculatedCardSize = Math.floor(Math.min(
        actualWidth / maxCol,
        actualHeight / maxRow
      )) - 8;
    }
    
    // Đảm bảo kích thước tối thiểu dựa trên thiết bị
    const minSize = isMobile ? 40 : 60;
    const finalCardSize = Math.max(calculatedCardSize, minSize);
    
    // Tính toán lại kích thước của bảng
    const finalWidth = finalCardSize * maxCol + (maxCol - 1) * (isMobile ? 2 : 4);
    const finalHeight = finalCardSize * maxRow + (maxRow - 1) * (isMobile ? 2 : 4);
    
    setBoardSize({
      width: finalWidth,
      height: finalHeight
    });
    
    setCardSize(finalCardSize - (isMobile ? 2 : 4));
  }, [maxCol, maxRow]);

  // Xử lý resize cửa sổ
  useEffect(() => {
    calculateSizes();
    
    const handleResize = () => {
      calculateSizes();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateSizes]);

  // Kiểm tra một thẻ có đang được chọn không
  const isCardSelected = (card: CardType) => {
    return selectedCards.some(selected => selected.id === card.id);
  };

  // Kiểm tra xem có phải là thiết bị di động không
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div className="flex items-center justify-center w-full my-2">
      <div 
        className="bg-gray-100 rounded-lg p-1 shadow-lg grid"
        style={{ 
          width: `${boardSize.width}px`,
          height: `${boardSize.height}px`,
          gridTemplateColumns: `repeat(${maxCol}, 1fr)`,
          gridTemplateRows: `repeat(${maxRow}, 1fr)`,
          gap: isMobile ? '2px' : '4px'
        }}
      >
        {cards.map(card => (
          <div 
            key={card.id}
            style={{ 
              gridColumn: card.col + 1, 
              gridRow: card.row + 1,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Card
              card={card}
              isSelected={isCardSelected(card)}
              isAnimating={isAnimating}
              size={cardSize}
              onClick={onCardClick}
              isPaused={isPaused}
              isGameOver={isGameOver}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board; 