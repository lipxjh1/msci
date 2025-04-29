'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export type CardType = {
  id: string;
  value: number;
  row: number;
  col: number;
  isMatched: boolean;
  isRevealed: boolean;
};

interface CardProps {
  card: CardType;
  isSelected: boolean;
  isAnimating: boolean;
  size: number;
  onClick: (card: CardType) => void;
  isPaused: boolean;
  isGameOver: boolean;
}

const Card: React.FC<CardProps> = ({
  card,
  isSelected,
  isAnimating,
  size,
  onClick,
  isPaused,
  isGameOver
}) => {
  const { value, isMatched, isRevealed } = card;
  const [imageError, setImageError] = useState(false);
  
  const handleClick = () => {
    if (isMatched || isSelected || isAnimating || isPaused || isGameOver) return;
    onClick(card);
  };

  // Tạo đường dẫn cho hình ảnh minigam
  const getImagePath = () => {
    try {
      // Sử dụng hình ảnh từ thư mục public/images/minigam
      // Chỉ có 12 hình ảnh trong thư mục (1.png đến 12.png)
      const imageId = ((value % 12) + 1);
      return `/images/minigam/${imageId}.png`;
    } catch (error) {
      console.error("Lỗi khi lấy đường dẫn hình ảnh:", error);
      return `/images/minigam/1.png`;
    }
  };

  // Xử lý khi không tải được hình ảnh
  const handleImageError = () => {
    console.log(`Không thể tải hình ảnh #${value}`);
    setImageError(true);
  };

  if (isMatched) {
    return (
      <div 
        className="m-0.5"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div 
      className="m-0.5 perspective-500 cursor-pointer"
      style={{ width: size, height: size }}
    >
      <motion.div
        className={`w-full h-full rounded-md flex items-center justify-center relative transition-shadow ${
          isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
        }`}
        onClick={handleClick}
        animate={{
          rotateY: isSelected || isRevealed ? 180 : 0,
          scale: isAnimating ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 0.4,
          rotateY: { type: "spring", stiffness: 200, damping: 15 }
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Mặt sau */}
        <div 
          className="absolute w-full h-full rounded-md bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center"
          style={{ 
            backfaceVisibility: "hidden",
            zIndex: isSelected ? "0" : "1"
          }}
        >
          <span className="text-white font-bold text-xl">?</span>
        </div>
        
        {/* Mặt trước */}
        <div 
          className="absolute w-full h-full rounded-md bg-white flex items-center justify-center"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)",
            zIndex: isSelected ? "1" : "0" 
          }}
        >
          <div className="relative w-[90%] h-[90%] flex items-center justify-center">
            {imageError ? (
              <div className="text-lg text-center font-bold text-purple-500">
                {value}
              </div>
            ) : (
              <img
                src={getImagePath()}
                alt={`Hình ${value}`}
                onError={handleImageError}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card; 