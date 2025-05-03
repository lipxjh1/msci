"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { Card } from './CardInterface';

interface CardSpinnerProps {
  extendedCards: Card[];
  isSpinning: boolean;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  cardsContainerRef: React.RefObject<HTMLDivElement>;
}

const CardSpinner: React.FC<CardSpinnerProps> = ({ 
  extendedCards, 
  isSpinning, 
  cardRefs,
  cardsContainerRef
}) => {
  // Map rarity to color
  const getRarityColor = (rarity?: string) => {
    switch(rarity) {
      case 'S': return 'rgba(255, 0, 0, 0.7)'; // Red
      case 'A': return 'rgba(138, 43, 226, 0.7)'; // Purple
      case 'B': return 'rgba(0, 123, 255, 0.7)'; // Blue
      case 'C': return 'rgba(40, 167, 69, 0.7)'; // Green
      default: return 'rgba(255, 255, 255, 0.7)';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 relative">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-blue-500/10 rounded-xl blur-xl -z-10"></div>
      
      {/* Cyberpunk frame */}
      <div className="absolute inset-0 border border-[var(--accent-blue-bright)]/30 rounded-xl"></div>
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[var(--accent-blue-bright)] rounded-tl-xl"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[var(--accent-blue-bright)] rounded-tr-xl"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[var(--accent-blue-bright)] rounded-bl-xl"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[var(--accent-blue-bright)] rounded-br-xl"></div>
      
      {/* Indicator line with pulse effect */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400/20 via-blue-400/80 to-blue-400/20 z-10 transform -translate-x-1/2 rounded-full animate-pulse"></div>
      <div className="absolute left-1/2 top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 z-10 opacity-80">
        <div className="w-full h-full bg-blue-400/30 rounded-full animate-ping-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
      </div>
      
      {/* Masking container */}
      <div className="relative h-96 overflow-hidden rounded-xl">
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#041019] to-transparent z-20"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#041019] to-transparent z-20"></div>
        
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
              className="flex-shrink-0 w-56 mx-4 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
            >
              <div className={`relative w-full h-80 rounded-lg overflow-hidden group`}>
                {/* Card background glow based on rarity */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ 
                    boxShadow: `0 0 20px ${getRarityColor(card.rarity)}`,
                    background: `linear-gradient(135deg, ${getRarityColor(card.rarity)} 0%, transparent 80%)`
                  }}
                ></div>
                
                {/* Card border glow effect */}
                <div 
                  className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[var(--accent-blue-bright)] transition-all duration-300 z-10"
                ></div>
                
                {/* Card image */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={card.imageUrl}
                    alt={card.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 224px, 256px"
                  />
                  
                  {/* Card overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                  
                  {/* Card info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-center transform transition-transform duration-300">
                    {/* Rarity indicator */}
                    <div className="absolute top-0 right-0 transform -translate-y-full mr-2">
                      <span 
                        className="inline-block px-2 py-0.5 rounded text-xs font-bold"
                        style={{ 
                          backgroundColor: getRarityColor(card.rarity),
                          boxShadow: `0 0 10px ${getRarityColor(card.rarity)}`
                        }}
                      >
                        {card.rarity}
                      </span>
                    </div>
                    
                    <h3 className="text-white font-orbitron text-lg font-bold group-hover:text-shadow-blue transition-all duration-300">{card.name}</h3>
                    <p className="flex items-center justify-center gap-1 mt-1">
                      <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: card.classColor }}></span>
                      <span style={{ color: card.classColor }}>{card.class}</span>
                    </p>
                  </div>
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