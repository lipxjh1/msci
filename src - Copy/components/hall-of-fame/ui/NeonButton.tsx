'use client';

import { ReactNode, ButtonHTMLAttributes, useState } from 'react';
import { useSound } from '@/context/SoundContext';

type NeonButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glowColor?: string;
  className?: string;
  icon?: ReactNode;
  withSound?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function NeonButton({
  children,
  variant = 'primary',
  size = 'md',
  glowColor = 'rgb(0, 217, 255)',
  className = '',
  icon,
  withSound = true,
  onClick,
  ...props
}: NeonButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { playSound } = useSound();

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return `bg-gradient-to-r from-blue-600 to-cyan-400 text-white border-none ${isHovered ? 'shadow-lg shadow-cyan-500/50' : ''}`;
      case 'secondary':
        return `bg-gradient-to-r from-purple-600 to-pink-400 text-white border-none ${isHovered ? 'shadow-lg shadow-purple-500/50' : ''}`;
      case 'outline':
        return `bg-transparent border border-cyan-500 text-cyan-300 ${isHovered ? 'shadow-lg shadow-cyan-500/30' : ''}`;
      case 'ghost':
        return `bg-transparent hover:bg-cyan-900/20 text-cyan-300 border-none`;
      default:
        return `bg-gradient-to-r from-blue-600 to-cyan-400 text-white border-none ${isHovered ? 'shadow-lg shadow-cyan-500/50' : ''}`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm py-2 px-3';
      case 'md':
        return 'text-base py-2.5 px-5';
      case 'lg':
        return 'text-lg py-3 px-6';
      default:
        return 'text-base py-2.5 px-5';
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (withSound) {
      playSound('click');
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (withSound) {
      playSound('hover');
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      type="button"
      className={`relative transform active:scale-95 transition-all duration-300 font-cyber tracking-wider uppercase rounded-md flex items-center justify-center gap-2 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {/* Glow effect */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-md blur opacity-70 z-0"
          style={{
            background: glowColor,
            filter: 'blur(15px)',
          }}
        ></div>
      )}
      <div className="relative z-10 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </div>
    </button>
  );
} 