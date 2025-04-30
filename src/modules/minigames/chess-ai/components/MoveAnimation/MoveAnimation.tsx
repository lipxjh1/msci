import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChessPiece, Square } from '../../types';
import styles from './MoveAnimation.module.css';

interface MoveAnimationProps {
  piece: ChessPiece;
  fromSquare: Square;
  toSquare: Square;
  squareSize: number;
  onComplete: () => void;
}

export const MoveAnimation: React.FC<MoveAnimationProps> = ({
  piece,
  fromSquare,
  toSquare,
  squareSize,
  onComplete
}) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      onComplete();
    }, 300); // Thời gian animation

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (animationComplete) return null;

  // Tính toán vị trí bắt đầu và kết thúc dựa trên kích thước ô
  const startX = fromSquare.x * squareSize;
  const startY = fromSquare.y * squareSize;
  const endX = toSquare.x * squareSize;
  const endY = toSquare.y * squareSize;

  // Tạo style cho animation
  const style = {
    '--start-x': `${startX}px`,
    '--start-y': `${startY}px`,
    '--end-x': `${endX}px`,
    '--end-y': `${endY}px`,
    width: `${squareSize * 0.9}px`,
    height: `${squareSize * 0.9}px`,
  } as React.CSSProperties;

  // Lấy src cho hình ảnh quân cờ
  const pieceImageSrc = `/images/chess/pieces/${piece.color}${piece.type.toUpperCase()}.svg`;

  // Tạo portal để render animation ở cấp cao nhất của DOM
  return createPortal(
    <div className={styles.animationContainer} style={style}>
      <img 
        src={pieceImageSrc} 
        alt="" 
        className={styles.pieceImage}
      />
    </div>,
    document.body
  );
}; 