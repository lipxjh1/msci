import React, { useRef } from 'react';
import Image from 'next/image';
import { Card } from './CardInterface';

interface CardSpinnerProps {
  extendedCards: Card[];
  isSpinning: boolean;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  cardsContainerRef: React.RefObject<HTMLDivElement | null>;
}

const CardSpinner: React.FC<CardSpinnerProps> = ({ 
  extendedCards, 
  isSpinning, 
  cardRefs,
  cardsContainerRef
}) => {
  return (
    <div className="w-full max-w-4xl mb-10 relative">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-blue-500/10 rounded-xl blur-xl -z-10"></div>
      
      {/* Indicator line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400/20 via-blue-400/80 to-blue-400/20 z-10 transform -translate-x-1/2 rounded-full"></div>
      
      {/* Masking container */}
      <div className="relative h-80 overflow-hidden rounded-xl">
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--overwatch-dark-blue)] to-transparent z-20"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--overwatch-dark-blue)] to-transparent z-20"></div>
        
        {/* Scrolling cards container */}
        <div 
          ref={cardsContainerRef}
          className="flex items-center h-full px-8 overflow-x-auto scrolling-cards no-scrollbar"
          style={{ width: 'max-content' }}
        >
          {extendedCards.map((card, index) => (
            <div 
              key={`${card.id}-${index}`}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="flex-shrink-0 w-56 mx-4 transition-all duration-200 transform hover:scale-105"
            >
              <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md group">
                {/* Card border glow effect */}
                <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-blue-500/50 transition-all duration-300 z-10"></div>
                
                <Image
                  src={card.imageUrl}
                  alt={card.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/90 to-transparent text-center">
                  <h3 className="text-white font-orbitron text-lg font-bold">{card.name}</h3>
                  <p className="flex items-center justify-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: card.classColor }}></span>
                    <span style={{ color: card.classColor }}>{card.class}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSpinner; 