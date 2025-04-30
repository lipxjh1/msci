import React from 'react';
import { PieceColor, PieceType } from '../../types';
import { Piece } from '../Piece/Piece';
import styles from './PromotionModal.module.css';

interface PromotionModalProps {
  color: PieceColor;
  onSelect: (piece: PieceType) => void;
  onClose: () => void;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({ color, onSelect, onClose }) => {
  // Danh sách các quân cờ có thể phong cấp
  const promotionPieces: PieceType[] = ['q', 'r', 'b', 'n'];
  
  // Tên đầy đủ cho mỗi loại quân
  const pieceNames: Record<PieceType, string> = {
    'q': 'hậu',
    'r': 'xe',
    'b': 'tượng',
    'n': 'mã',
    'p': 'tốt',
    'k': 'vua'
  };
  
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>Chọn quân cờ để phong cấp</h3>
        
        <div className={styles.pieceOptions}>
          {promotionPieces.map(pieceType => (
            <div 
              key={pieceType}
              className={styles.pieceOption}
              onClick={() => onSelect(pieceType)}
            >
              <Piece type={pieceType} color={color} />
              <span className={styles.pieceName}>{pieceNames[pieceType]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 