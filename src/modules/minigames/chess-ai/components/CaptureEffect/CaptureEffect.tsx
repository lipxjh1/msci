import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChessPiece, Square } from '../../types';
import styles from './CaptureEffect.module.css';

interface CaptureEffectProps {
  piece: ChessPiece;
  position: Square;
  squareSize: number;
  onComplete: () => void;
}

export const CaptureEffect: React.FC<CaptureEffectProps> = ({
  piece,
  position,
  squareSize,
  onComplete
}) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    angle: number;
    speed: number;
    opacity: number;
    rotation: number;
    color: string;
  }>>([]);

  // Tạo hiệu ứng nổ khi component được mount
  useEffect(() => {
    // Tạo 20 hạt nổ với các thuộc tính ngẫu nhiên
    const newParticles = Array.from({ length: 20 }, (_, i) => {
      const colors = piece.color === 'w' 
        ? ['#f0d9b5', '#f5e5c1', '#ffffff', '#e6e6e6'] 
        : ['#b58863', '#a77c58', '#8b5e3c', '#704b30'];
      
      return {
        id: i,
        size: Math.random() * (squareSize * 0.15) + (squareSize * 0.05),
        x: 0,
        y: 0,
        angle: Math.random() * 360,
        speed: Math.random() * 3 + 1,
        opacity: 1,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });
    
    setParticles(newParticles);

    // Kết thúc hiệu ứng sau 600ms
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      onComplete();
    }, 600);

    return () => clearTimeout(timer);
  }, [piece, squareSize, onComplete]);

  if (animationComplete) return null;

  // Tính toán vị trí thực tế trên màn hình
  const posX = position.x * squareSize + (squareSize / 2);
  const posY = position.y * squareSize + (squareSize / 2);

  // Tạo style cho container
  const containerStyle = {
    left: `${posX}px`,
    top: `${posY}px`,
  } as React.CSSProperties;

  // Tạo portal để render hiệu ứng ở cấp cao nhất của DOM
  return createPortal(
    <div className={styles.captureContainer} style={containerStyle}>
      {/* Hiệu ứng flash ban đầu */}
      <div className={styles.flash}></div>
      
      {/* Hiệu ứng sóng xung kích */}
      <div className={styles.shockwave}></div>
      
      {/* Các mảnh vỡ */}
      {particles.map(particle => {
        const particleStyle = {
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          background: particle.color,
          transform: `rotate(${particle.rotation}deg) translate(
            ${Math.cos(particle.angle * Math.PI / 180) * particle.speed * 20}px,
            ${Math.sin(particle.angle * Math.PI / 180) * particle.speed * 20}px
          )`,
          opacity: particle.opacity
        } as React.CSSProperties;
        
        return (
          <div 
            key={particle.id} 
            className={styles.particle} 
            style={particleStyle}
          />
        );
      })}
      
      {/* Hiệu ứng quân cờ vỡ ra */}
      <div className={styles.pieceFragment}>
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <polygon 
            points="0,0 50,0 50,50 0,50" 
            fill={`url(#piece-${piece.color}${piece.type})`} 
            className={styles.fragmentTopLeft}
          />
          <polygon 
            points="50,0 100,0 100,50 50,50" 
            fill={`url(#piece-${piece.color}${piece.type})`} 
            className={styles.fragmentTopRight}
          />
          <polygon 
            points="0,50 50,50 50,100 0,100" 
            fill={`url(#piece-${piece.color}${piece.type})`} 
            className={styles.fragmentBottomLeft}
          />
          <polygon 
            points="50,50 100,50 100,100 50,100" 
            fill={`url(#piece-${piece.color}${piece.type})`} 
            className={styles.fragmentBottomRight}
          />
          
          <defs>
            <pattern id={`piece-${piece.color}${piece.type}`} patternUnits="userSpaceOnUse" width="100" height="100">
              <image 
                href={`/images/chess/pieces/${piece.color}${piece.type.toUpperCase()}.svg`} 
                x="0" 
                y="0" 
                width="100" 
                height="100"
              />
            </pattern>
          </defs>
        </svg>
      </div>
    </div>,
    document.body
  );
}; 