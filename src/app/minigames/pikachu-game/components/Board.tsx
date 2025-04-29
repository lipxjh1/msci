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
  const maxCol = Math.max(...cards.map(card => card.col)) + 1;
  const maxRow = Math.max(...cards.map(card => card.row)) + 1;
  
  // Điều chỉnh kích thước bảng và thẻ bài
  const calculateSizes = useCallback(() => {
    // Lấy kích thước container
    const containerWidth = window.innerWidth > 1200 ? 800 : window.innerWidth * 0.9;
    const containerHeight = window.innerHeight * 0.7;
    
    // Tính toán kích thước thẻ bài
    const calculatedCardWidth = Math.floor(containerWidth / maxCol) - 2;
    const calculatedCardHeight = Math.floor(containerHeight / maxRow) - 2;
    const calculatedCardSize = Math.min(calculatedCardWidth, calculatedCardHeight);
    
    // Cập nhật kích thước
    setBoardSize({
      width: calculatedCardSize * maxCol + (maxCol * 2),
      height: calculatedCardSize * maxRow + (maxRow * 2),
    });
    setCardSize(calculatedCardSize);
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

  return (
    <div className="flex items-center justify-center w-full">
      <div 
        className="bg-gray-100 rounded-lg p-2 shadow-lg overflow-hidden"
        style={{ 
          width: boardSize.width,
          height: boardSize.height,
          display: 'grid',
          gridTemplateColumns: `repeat(${maxCol}, 1fr)`,
          gridTemplateRows: `repeat(${maxRow}, 1fr)`,
          gap: '2px'
        }}
      >
        {cards.map(card => (
          <div 
            key={card.id}
            style={{ 
              gridColumn: card.col + 1, 
              gridRow: card.row + 1 
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