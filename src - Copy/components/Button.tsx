import React, { ButtonHTMLAttributes, useState } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'hexagon' | 'transparent';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  animate?: 'pulse' | 'glow' | 'shine' | 'none' | 'arrow-slide';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  animate = 'none',
  fullWidth = false,
  children,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Xác định style dựa trên variant
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[var(--overwatch-blue)] to-[#1a73e8] text-white border-[#42abff]/60',
    secondary: 'bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20',
    outline: 'bg-transparent backdrop-blur-sm border-[var(--overwatch-blue)]/60 text-[var(--overwatch-blue)] hover:bg-[var(--overwatch-blue)]/10',
    hexagon: 'bg-gradient-to-r from-[var(--overwatch-blue)] to-[#0d47a1] text-white border-[#42abff]/60 clip-hexagon hover:shadow-lg hover:shadow-blue-500/20',
    transparent: 'bg-transparent backdrop-blur-sm border border-white/30 text-white hover:border-white/60',
  };

  // Xác định kích thước
  const sizeStyles = {
    sm: 'py-2 px-6 text-sm',
    md: 'py-3 px-8 text-base',
    lg: 'py-4 px-10 text-lg',
  };

  // Xác định hiệu ứng animation
  const animationStyles = {
    pulse: 'animate-pulse',
    glow: 'hover:animate-pulse-slow',
    shine: 'animate-button-shine',
    'arrow-slide': 'arrow-slide-button',
    none: '',
  };

  // Style cơ bản cho tất cả các nút
  const baseStyles = `
    relative overflow-hidden
    font-bold
    border-2
    transition-all duration-300
    uppercase tracking-wider
    flex items-center justify-center
    ${fullWidth ? 'w-full' : ''}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${animationStyles[animate]}
    ${className}
  `;

  // Event handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Component bọc bên trong với các hiệu ứng
  const ButtonContent = () => (
    <>
      {/* Hexagon pattern overlay */}
      <span className="absolute inset-0 hexagon-pattern opacity-20 z-20 mix-blend-overlay"></span>
      
      {/* Animated shimmer effect */}
      {isHovered && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/40 to-white/0 transform -translate-x-full animate-shimmer-button-fast z-30"></span>
      )}
      
      {/* Ripple effect container */}
      <span className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
        <span className="h-0 w-0 bg-white/40 rounded-full"></span>
      </span>
      
      {/* Corner accents for hexagon buttons */}
      {variant === 'hexagon' && (
        <>
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#42abff] animate-corner-pulse z-40"></span>
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#42abff] animate-corner-pulse delay-2 z-40"></span>
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#42abff] animate-corner-pulse delay-4 z-40"></span>
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#42abff] animate-corner-pulse delay-3 z-40"></span>
        </>
      )}
      
      {/* Extra glow effect for hexagon buttons */}
      {variant === 'hexagon' && (
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[0_0_30px_6px_rgba(66,171,255,0.7)] rounded-md transition-opacity duration-500 z-10"></span>
      )}
      
      {/* Arrow slide effect for transparent buttons */}
      {animate === 'arrow-slide' && (
        <>
          <span className="absolute left-0 top-0 h-full w-0 group-hover:w-full bg-gradient-to-r from-white/5 via-white/15 to-white/5 transition-all duration-700 -z-10"></span>
          <span className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
            →
          </span>
        </>
      )}
      
      {/* Button content */}
      <span className="relative z-50 flex items-center justify-center">
        {children}
      </span>
    </>
  );

  // Render as link if href is provided
  if (href) {
    return (
      <div className={`button-container ${variant === 'transparent' ? 'transparent-button-container' : 'hexagon-button-container'}`}>
        <Link 
          href={href} 
          className={`button group ${baseStyles} ${variant === 'hexagon' ? 'transform hover:scale-105' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ButtonContent />
        </Link>
      </div>
    );
  }

  // Otherwise render as button
  return (
    <div className={`button-container ${variant === 'transparent' ? 'transparent-button-container' : 'hexagon-button-container'}`}>
      <button 
        className={`button group ${baseStyles} ${variant === 'hexagon' ? 'transform hover:scale-105' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <ButtonContent />
      </button>
    </div>
  );
} 