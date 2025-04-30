import React from 'react';
import styles from './Square.module.css';

interface SquareProps {
  x: number;
  y: number;
  isSelected?: boolean;
  isValidMove?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

export const Square: React.FC<SquareProps> = ({ 
  x, 
  y, 
  isSelected = false, 
  isValidMove = false, 
  onClick, 
  children 
}) => {
  // Kiểm tra màu ô (đen hoặc trắng)
  const isDarkSquare = (x + y) % 2 === 1;
  
  // Tạo tên class động dựa vào các props
  const squareClass = `
    ${styles.square} 
    ${isDarkSquare ? styles.dark : styles.light}
    ${isSelected ? styles.selected : ''}
    ${isValidMove ? styles.validMove : ''}
  `;
  
  return (
    <div 
      className={squareClass}
      onClick={onClick}
      data-x={x}
      data-y={y}
    >
      {children}
      {isValidMove && !children && (
        <div className={styles.moveIndicator} />
      )}
      {isValidMove && children && (
        <div className={styles.captureIndicator} />
      )}
    </div>
  );
}; 