"use client";

import React, { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import { TileProps } from '../types';
import { motion } from 'framer-motion';

// Memoize GameTile để tránh re-render không cần thiết
const GameTile = memo(({ tile, onClick, disabled, tileSize }: TileProps) => {
  const [visible, setVisible] = useState(!tile.isMatched);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Ẩn tile khi đã khớp
  useEffect(() => {
    if (tile.isMatched) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [tile.isMatched]);
  
  // Reset trạng thái load khi url thay đổi
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [tile.url]);
  
  // Xử lý sự kiện click
  const handleClick = () => {
    if (!disabled && !tile.isMatched) {
      onClick(tile);
    }
  };
  
  if (!visible) {
    return null;
  }
  
  return (
    <motion.div
      className={`tile relative rounded-lg overflow-hidden cursor-pointer shadow-lg transition-all
                ${tile.isSelected ? 'selected ring-2 ring-indigo-500 ring-offset-1 ring-offset-indigo-900' : ''}
                ${tile.isMatched ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
      style={{
        width: `${tileSize}px`,
        height: `${tileSize}px`,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      onClick={handleClick}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      layout 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 500, 
        damping: 30,
        layoutDependency: tile.id 
      }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-gray-900"></div>
      
      {/* Placeholder while image is loading */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/2 h-1/2 rounded-full border-t-2 border-blue-500 animate-spin"></div>
        </div>
      )}
      
      {/* Fallback for image error */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-1/2 w-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      )}
      
      {/* Tile image - optimize with priority for visible tiles */}
      <div className="tile-content absolute inset-0 flex items-center justify-center p-2">
        <div className="relative w-full h-full">
          <Image
            src={tile.url}
            alt={`Tile ${tile.id}`}
            fill
            sizes={`${tileSize}px`}
            className={`object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            priority={tile.isSelected} // Load with priority if selected
            loading="eager" // Eager loading for better UX
            style={{
              willChange: 'transform, opacity',
            }}
          />
        </div>
      </div>
      
      {/* Selection effect */}
      {tile.isSelected && (
        <div className="absolute inset-0 border-2 border-indigo-500 rounded-lg pointer-events-none z-10 
                      animate-pulse"></div>
      )}
    </motion.div>
  );
});

// DisplayName for debugging
GameTile.displayName = 'GameTile';

export default GameTile; 