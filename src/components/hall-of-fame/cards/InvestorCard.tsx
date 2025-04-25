'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Investor } from '@/types/hallOfFame';
import { useSound } from '@/context/SoundContext';

type InvestorCardProps = {
  investor: Investor;
  index: number;
};

export default function InvestorCard({ investor, index }: InvestorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSound();
  
  // Get tier-specific styles
  const getTierStyles = () => {
    switch (investor.tier) {
      case 'eternal':
        return {
          borderGradient: 'from-yellow-400 via-orange-300 to-yellow-400',
          glowColor: 'rgba(234, 179, 8, 0.5)',
          badgeGradient: 'from-yellow-400 to-orange-300',
          textColor: 'text-yellow-300',
        };
      case 'diamond':
        return {
          borderGradient: 'from-cyan-400 via-blue-300 to-cyan-400',
          glowColor: 'rgba(6, 182, 212, 0.5)',
          badgeGradient: 'from-cyan-400 to-blue-300',
          textColor: 'text-cyan-300',
        };
      default:
        return {
          borderGradient: 'from-gray-400 via-gray-300 to-gray-400',
          glowColor: 'rgba(156, 163, 175, 0.5)',
          badgeGradient: 'from-gray-400 to-gray-300',
          textColor: 'text-gray-300',
        };
    }
  };
  
  const { borderGradient, glowColor, badgeGradient, textColor } = getTierStyles();

  const handleMouseEnter = () => {
    setIsHovered(true);
    playSound('hover');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative w-full"
    >
      {/* Card with metallic border effect */}
      <div
        className={`relative group rounded-lg overflow-hidden transition-all duration-300 transform ${
          isHovered ? 'scale-[1.02]' : 'scale-100'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Border gradient effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${borderGradient} opacity-50 blur-[2px]`} />
        
        {/* Inner card content */}
        <div className="relative m-[1px] bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg overflow-hidden z-10">
          {/* Badge showing tier */}
          <div className="absolute top-4 right-4 z-20">
            <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${badgeGradient} text-black text-xs font-medium uppercase tracking-wider`}>
              {investor.tier}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="mb-6 flex items-center">
              {/* Avatar with metallic frame */}
              <div className="relative mr-4">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${borderGradient}`} 
                  style={{ padding: '2px' }}
                />
                <div 
                  className="w-16 h-16 rounded-full relative z-10 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${investor.imageUrl})`,
                    border: '2px solid black',
                  }}
                />
              </div>
              
              {/* Name and title */}
              <div>
                <h3 className="text-xl font-cyber text-white mb-1">{investor.name}</h3>
                <p className={`text-sm ${textColor}`}>{investor.title}</p>
              </div>
            </div>
            
            {/* Investment and contribution info */}
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-gray-400 text-sm min-w-24">Đầu tư:</span>
                <span className={`${textColor} font-medium`}>{investor.investment}</span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-400 text-sm min-w-24">Đóng góp:</span>
                <span className="text-white">{investor.contribution}</span>
              </div>
              {investor.title2 && (
                <div className="flex items-start">
                  <span className="text-gray-400 text-sm min-w-24">Danh hiệu:</span>
                  <span className={`${textColor} font-medium`}>{investor.title2}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Bottom decorative element */}
          <div className={`h-1 w-full bg-gradient-to-r ${borderGradient}`} />
        </div>
      </div>
      
      {/* Glow effect on hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 -z-10 rounded-lg blur-md"
        style={{ 
          background: glowColor,
          filter: 'blur(16px)'
        }}
      />
    </motion.div>
  );
} 