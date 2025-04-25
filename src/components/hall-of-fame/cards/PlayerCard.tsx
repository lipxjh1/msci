'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types/hallOfFame';
import { useSound } from '@/context/SoundContext';
import { FaTrophy, FaGamepad, FaChartLine, FaUsers } from 'react-icons/fa';
import Confetti from 'react-confetti';

type PlayerCardProps = {
  player: Player;
  index: number;
};

export default function PlayerCard({ player, index }: PlayerCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSound();

  // Get tier-specific styles
  const getTierStyles = () => {
    switch (player.tier) {
      case 'legend':
        return {
          borderColor: 'border-purple-500',
          glowColor: 'rgba(168, 85, 247, 0.5)',
          badgeGradient: 'from-purple-500 to-pink-500',
          headingColor: 'text-purple-400',
          iconColor: 'text-purple-400',
        };
      case 'champion':
        return {
          borderColor: 'border-orange-500',
          glowColor: 'rgba(249, 115, 22, 0.5)',
          badgeGradient: 'from-orange-500 to-amber-500',
          headingColor: 'text-orange-400',
          iconColor: 'text-orange-400',
        };
      default:
        return {
          borderColor: 'border-blue-500',
          glowColor: 'rgba(59, 130, 246, 0.5)',
          badgeGradient: 'from-blue-500 to-cyan-500',
          headingColor: 'text-blue-400',
          iconColor: 'text-blue-400',
        };
    }
  };

  const { borderColor, glowColor, badgeGradient, headingColor, iconColor } = getTierStyles();

  const handleMouseEnter = () => {
    setIsHovered(true);
    playSound('hover');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    playSound('click');
    setIsFlipped(!isFlipped);
    
    if (!isFlipped && player.tier === 'legend') {
      playSound('achievement');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  // Front of card rendering
  const renderFront = () => (
    <div className="relative w-full h-full">
      {/* Player avatar */}
      <div className="relative h-64 mb-1">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />
        
        {/* Player image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-10 opacity-90"
          style={{ backgroundImage: `url(${player.imageUrl})` }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        
        {/* Tier badge */}
        <div className="absolute top-4 right-4 z-30">
          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${badgeGradient} text-white text-xs font-medium uppercase tracking-wider`}>
            {player.tier}
          </div>
        </div>
      </div>
      
      {/* Player info */}
      <div className="p-6 pt-4">
        <h3 className={`text-2xl font-cyber ${headingColor} mb-1`}>{player.nickname}</h3>
        <p className="text-white font-medium mb-4">{player.achievement}</p>
        
        {/* Guild info */}
        {player.guild && (
          <div className="flex items-center mb-4">
            <FaUsers className="text-gray-400 mr-2" />
            <span className="text-gray-300">Guild: <span className="text-white">{player.guild}</span></span>
          </div>
        )}
        
        {/* Season info */}
        {player.season && (
          <div className="text-sm text-gray-400 mb-4">
            {player.season}
          </div>
        )}
        
        {/* Stats preview (limited) */}
        <div className="flex justify-center mt-3">
          <button 
            onClick={handleClick}
            className={`text-sm ${headingColor} hover:text-white transition-colors flex items-center gap-1 border-b border-dashed ${borderColor} pb-1`}
          >
            <FaChartLine className="mr-1" /> Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );

  // Back of card rendering
  const renderBack = () => (
    <div className="relative w-full h-full flex flex-col p-6">
      <h3 className={`text-xl font-cyber ${headingColor} mb-3 text-center`}>{player.nickname}</h3>
      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-4">
          <h4 className="text-white font-medium mb-3 flex items-center">
            <FaTrophy className={`${iconColor} mr-2`} /> Thành tựu
          </h4>
          <p className="text-gray-300 mb-6">{player.achievement}</p>
          
          <h4 className="text-white font-medium mb-3 flex items-center">
            <FaGamepad className={`${iconColor} mr-2`} /> Thống kê
          </h4>
          <div className="space-y-3 mb-6">
            {Object.entries(player.stats).map(([key, value], i) => (
              <div key={i} className="flex justify-between">
                <span className="text-gray-400 capitalize">{key}:</span>
                <span className="text-white font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Back button */}
      <div className="text-center mt-auto">
        <button 
          onClick={handleClick}
          className={`text-sm ${headingColor} hover:text-white transition-colors border-b border-dashed ${borderColor} pb-1`}
        >
          Quay lại
        </button>
      </div>
    </div>
  );

  return (
    <>
      {showConfetti && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            gravity={0.2}
          />
        </div>
      )}
      
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: index * 0.1 }}
        className="relative w-full h-full perspective-1000 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className="w-full relative preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Card Container */}
          <motion.div
            animate={{
              scale: isHovered ? 1.02 : 1,
              boxShadow: isHovered ? `0 0 20px ${glowColor}` : '0 0 0 rgba(0,0,0,0)'
            }}
            transition={{ duration: 0.3 }}
            className={`w-full rounded-lg border ${borderColor} bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden`}
          >
            {/* Front */}
            <div
              className="w-full backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {renderFront()}
            </div>
            
            {/* Back */}
            <div
              className="w-full h-full absolute top-0 left-0 backface-hidden rounded-lg border bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              {renderBack()}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
} 