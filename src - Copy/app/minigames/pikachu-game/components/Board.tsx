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
  
  // Find maximum rows and columns
  const maxCol = Math.max(...cards.map(card => card.col), 0) + 1;
  const maxRow = Math.max(...cards.map(card => card.row), 0) + 1;
  
  // Adjust board and card sizes
  const calculateSizes = useCallback(() => {
    // Check if it's a mobile device
    const isMobile = window.innerWidth <= 768;
    
    // Ensure container size is appropriate for the device
    const containerWidth = isMobile 
      ? window.innerWidth * 0.95 - 24 // Subtract container padding
      : Math.min(window.innerWidth * 0.9, 800);
    
    const containerHeight = isMobile 
      ? window.innerHeight * 0.5 
      : Math.min(window.innerHeight * 0.65, 600);
    
    // Calculate card size
    const actualWidth = Math.min(containerWidth, containerHeight * (maxCol / maxRow));
    const actualHeight = Math.min(containerHeight, containerWidth * (maxRow / maxCol));
    
    // Calculate card size based on device
    let calculatedCardSize;
    
    if (isMobile) {
      // Calculate card size for mobile
      calculatedCardSize = Math.floor(Math.min(
        actualWidth / maxCol,
        actualHeight / maxRow
      )) - (isMobile ? 4 : 8); // Reduce padding on mobile
    } else {
      calculatedCardSize = Math.floor(Math.min(
        actualWidth / maxCol,
        actualHeight / maxRow
      )) - 8;
    }
    
    // Ensure minimum size based on device
    const minSize = isMobile ? 40 : 60;
    const finalCardSize = Math.max(calculatedCardSize, minSize);
    
    // Recalculate board size
    const finalWidth = finalCardSize * maxCol + (maxCol - 1) * (isMobile ? 2 : 4);
    const finalHeight = finalCardSize * maxRow + (maxRow - 1) * (isMobile ? 2 : 4);
    
    setBoardSize({
      width: finalWidth,
      height: finalHeight
    });
    
    setCardSize(finalCardSize - (isMobile ? 2 : 4));
  }, [maxCol, maxRow]);

  // Handle window resize
  useEffect(() => {
    calculateSizes();
    
    const handleResize = () => {
      calculateSizes();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateSizes]);

  // Check if a card is selected
  const isCardSelected = (card: CardType) => {
    return selectedCards.some(selected => selected.id === card.id);
  };

  // Check if it's a mobile device
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