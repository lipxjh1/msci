'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { Founder } from '@/types/hallOfFame';
import { useSound } from '@/context/SoundContext';

type FounderCardProps = {
  founder: Founder;
  index: number;
};

export default function FounderCard({ founder, index }: FounderCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSound();
  
  // Variables for 3D tilt effect
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  // Handle holographic effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const cardRect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;
    
    // Calculate rotation based on mouse position
    // Limit rotation to a smaller range for subtle effect
    const rotX = (mouseY / (cardRect.height / 2)) * 5; // max 5 degree rotation
    const rotY = -(mouseX / (cardRect.width / 2)) * 5;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };
  
  // Play sound on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    playSound('hover');
  };
  
  // Social media icons
  const getSocialIcons = () => {
    if (!founder.socialLinks) return null;
    
    return (
      <div className="flex gap-4 mt-4">
        {founder.socialLinks.twitter && (
          <a 
            href={founder.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              playSound('click');
            }}
          >
            <FaTwitter size={18} />
          </a>
        )}
        
        {founder.socialLinks.linkedin && (
          <a 
            href={founder.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              playSound('click');
            }}
          >
            <FaLinkedinIn size={18} />
          </a>
        )}
        
        {founder.socialLinks.github && (
          <a 
            href={founder.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              playSound('click');
            }}
          >
            <FaGithub size={18} />
          </a>
        )}
      </div>
    );
  };
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="relative w-full max-w-sm mx-auto perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card */}
      <motion.div
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          z: isHovered ? 20 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative group bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg overflow-hidden shadow-2xl border border-gray-800 transform-style-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Holographic overlay effect */}
        <div 
          className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none z-10 bg-gradient-to-br from-cyan-300 to-blue-500 mix-blend-overlay`}
          style={{
            background: `linear-gradient(
              130deg,
              rgba(6, 182, 212, 0.3) 0%,
              rgba(59, 130, 246, 0.1) 30%,
              rgba(139, 92, 246, 0.1) 70%,
              rgba(6, 182, 212, 0.3) 100%
            )`,
          }}
        />
        
        {/* Scanline effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 pointer-events-none z-10 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="w-full h-px bg-cyan-300"
              style={{ marginTop: `${i * 16}px` }}
            />
          ))}
        </div>
        
        {/* Image Area with glow effect */}
        <div className="relative h-72 mb-4 overflow-hidden">
          {/* Background gradient and patterns */}
          <div className="absolute inset-0 bg-blue-900/20 z-0" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400 to-transparent" />
          
          {/* Portrait Image */}
          <div 
            className="absolute inset-0 z-10" 
            style={{
              backgroundImage: `url(${founder.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'contrast(1.1) saturate(1.2)',
            }}
          />
          
          {/* Bottom fade gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent z-20" />
          
          {/* Name badge */}
          <div className="absolute left-4 bottom-4 max-w-[80%] z-30">
            <motion.div
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-cyber text-white mb-1 tracking-wide">{founder.name}</h3>
              <p className="text-cyan-400 text-sm font-medium tracking-wider">{founder.title}</p>
            </motion.div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="p-6 z-20 relative">
          {/* Quote */}
          <p className="text-gray-300 italic text-sm mb-3">"{founder.quote}"</p>
          
          {/* Description */}
          <p className="text-gray-400 text-sm">{founder.description}</p>
          
          {/* Social media links */}
          {getSocialIcons()}
        </div>
        
        {/* Edge glow on hover */}
        <motion.div
          animate={{
            boxShadow: isHovered 
              ? '0 0 20px 2px rgba(6, 182, 212, 0.3), inset 0 0 20px 2px rgba(6, 182, 212, 0.1)' 
              : '0 0 0px 0px rgba(6, 182, 212, 0), inset 0 0 0px 0px rgba(6, 182, 212, 0)'
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-lg pointer-events-none z-0"
        />
      </motion.div>
    </motion.div>
  );
} 