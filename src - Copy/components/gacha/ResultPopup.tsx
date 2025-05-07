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

  // Create light effect based on rarity
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
  
  // Create dynamic array for cosmic particles
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
              CONGRATULATIONS!
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
          <p className="text-gray-300 text-lg animate-fade-in">You have received a special reward!</p>
        </div>
        
        {/* Card and Message */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Card Container with Animation */}
          <div className="relative w-56 h-80 md:w-64 md:h-96 overflow-hidden rounded-lg group animate-float">
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
            <div className="relative w-full h-full">
              <Image
                src={selectedCard.imageUrl}
                alt={selectedCard.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 224px, 256px"
              />
              
              {/* Dark overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            </div>
            
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
              {selectedCard.classImage && (
                <div className="relative w-5 h-5 mr-1">
                  <Image
                    src={selectedCard.classImage}
                    alt={selectedCard.class}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
              )}
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: selectedCard.classColor }}></span>
              <span className="text-sm font-bold" style={{ color: selectedCard.classColor }}>{selectedCard.class}</span>
            </div>
            
            {/* Character name at bottom */}
            <div className="absolute bottom-10 inset-x-0 text-center z-30">
              <h3 className="font-orbitron text-xl font-bold text-white text-shadow-sm">{selectedCard.name}</h3>
            </div>
            
            {/* Subtle scanlines effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30 pointer-events-none z-20 scanline"></div>
          </div>
          
          <div className="flex-1 text-center md:text-left animate-fade-in">
            <h3 className="font-orbitron text-xl text-gray-200 mb-2">
              You have received
            </h3>
            <p className="font-orbitron text-3xl md:text-4xl font-bold mb-3 text-shadow-blue animate-title-glow" style={{ color: selectedCard.classColor }}>
              {selectedCard.name}
            </p>
            
            {/* Class with icon */}
            <div className="inline-flex items-center px-3 py-1 mb-3 bg-[#05121d]/80 rounded-full">
              {selectedCard.classImage && (
                <div className="relative w-6 h-6 mr-2">
                  <Image
                    src={selectedCard.classImage}
                    alt={selectedCard.class}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              )}
              <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: selectedCard.classColor }}></span>
              <span className="text-sm font-semibold" style={{ color: selectedCard.classColor }}>
                {selectedCard.class}
              </span>
            </div>
            
            {/* Character description */}
            <p className="text-gray-300 mb-6">
              {selectedCard.description}
            </p>
            
            {/* Character stats */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
              <div>
                <p className="text-xs text-gray-400">Attack</p>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${selectedCard.stats.attack}%` }}></div>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400">Defense</p>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${selectedCard.stats.defense}%` }}></div>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400">Health</p>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${selectedCard.stats.health}%` }}></div>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400">Speed</p>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: `${selectedCard.stats.speed}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="pt-8 border-t border-white/10 mt-8 flex flex-col md:flex-row gap-4 items-center justify-center">
          <button 
            onClick={closePopup}
            className="px-5 py-2 border border-[var(--accent-blue-bright)] rounded-md text-[var(--accent-blue-bright)] hover:bg-[var(--accent-blue-bright)]/10 transition-colors duration-300"
          >
            Close
          </button>
          <button 
            onClick={() => {
              closePopup();
              handleSpin();
            }}
            className="px-5 py-2 bg-gradient-to-r from-[var(--accent-blue-bright)] to-[var(--accent-blue-glow)] text-white rounded-md hover:shadow-lg hover:shadow-[var(--accent-blue-bright)]/20 transition-all duration-300"
          >
            Spin Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPopup; 