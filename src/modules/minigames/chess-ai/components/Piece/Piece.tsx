import React from 'react';
import { PieceType, PieceColor } from '../../types';
import styles from './Piece.module.css';

interface PieceProps {
  type: PieceType;
  color: PieceColor;
}

export const Piece: React.FC<PieceProps> = ({ type, color }) => {
  // Xác định đường dẫn đến hình ảnh quân cờ
  const getPieceImageSrc = (): string => {
    return `/images/chess/pieces/${color}${type.toUpperCase()}.svg`;
  };

  // Fallback sử dụng Unicode khi không tải được hình ảnh
  const getUnicodePiece = (): string => {
    const pieces: Record<string, string> = {
      'wp': '♙', 'wb': '♗', 'wn': '♘', 'wr': '♖', 'wq': '♕', 'wk': '♔',
      'bp': '♟', 'bb': '♝', 'bn': '♞', 'br': '♜', 'bq': '♛', 'bk': '♚'
    };
    return pieces[`${color}${type}`] || '';
  };

  // Tên quân cờ đầy đủ cho thuộc tính alt
  const getPieceName = (): string => {
    const pieceNames: Record<PieceType, string> = {
      'p': 'tốt',
      'n': 'mã',
      'b': 'tượng',
      'r': 'xe',
      'q': 'hậu',
      'k': 'vua'
    };
    
    const colorNames: Record<PieceColor, string> = {
      'w': 'trắng',
      'b': 'đen'
    };
    
    return `${pieceNames[type]} ${colorNames[color]}`;
  };

  return (
    <div className={styles.piece} data-piece-type={type} data-piece-color={color}>
      <img
        src={getPieceImageSrc()}
        alt={getPieceName()}
        className={styles.pieceImage}
        onError={(e) => {
          // Fallback to Unicode if image fails to load
          const target = e.target as HTMLElement;
          target.style.display = 'none';
          target.parentElement!.setAttribute('data-unicode', getUnicodePiece());
          target.parentElement!.classList.add(styles.unicodeFallback);
        }}
      />
    </div>
  );
}; 