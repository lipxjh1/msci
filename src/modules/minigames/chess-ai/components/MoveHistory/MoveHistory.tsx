import React, { useEffect, useRef } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { pieceToUnicode } from '../../lib/utils/notation';
import styles from './MoveHistory.module.css';

export const MoveHistory: React.FC = () => {
  const { gameHistory } = useGameContext();
  const historyRef = useRef<HTMLDivElement>(null);
  
  // Tự động cuộn xuống khi có nước đi mới
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [gameHistory]);
  
  // Format nước đi với biểu tượng Unicode
  const formatMove = (move: string): React.ReactNode => {
    // Bỏ qua các ký tự đặc biệt như +, # từ SAN move
    let displayMove = move.replace(/[+#]$/, '');
    
    // Xử lý nước nhập thành
    if (displayMove === 'O-O') {
      return <span title="Nhập thành ngắn">O-O</span>;
    } else if (displayMove === 'O-O-O') {
      return <span title="Nhập thành dài">O-O-O</span>;
    }
    
    // Xử lý ký hiệu quân cờ
    return displayMove.replace(/([KQRBN])/g, (match, piece) => {
      const unicode = pieceToUnicode(piece);
      return (
        <span className={styles.pieceSymbol} title={getPieceName(piece)}>
          {unicode}
        </span>
      );
    });
  };
  
  // Lấy tên đầy đủ của quân cờ
  const getPieceName = (piece: string): string => {
    const pieceNames: Record<string, string> = {
      'K': 'Vua',
      'Q': 'Hậu',
      'R': 'Xe',
      'B': 'Tượng',
      'N': 'Mã',
      'P': 'Tốt'
    };
    
    return pieceNames[piece] || '';
  };
  
  // Chia lịch sử nước đi thành cặp (trắng và đen)
  const renderMoveHistory = () => {
    const pairs = [];
    
    for (let i = 0; i < gameHistory.length; i += 2) {
      const whiteMove = gameHistory[i];
      const blackMove = i + 1 < gameHistory.length ? gameHistory[i + 1] : null;
      const moveNumber = Math.floor(i / 2) + 1;
      
      pairs.push(
        <div key={i} className={styles.movePair}>
          <div className={styles.moveNumber}>{moveNumber}.</div>
          <div className={styles.move}>{formatMove(whiteMove)}</div>
          {blackMove && <div className={styles.move}>{formatMove(blackMove)}</div>}
        </div>
      );
    }
    
    return pairs;
  };
  
  return (
    <div className={styles.historyContainer}>
      <h3 className={styles.historyTitle}>Lịch sử nước đi</h3>
      
      <div className={styles.moveHistory} ref={historyRef}>
        {gameHistory.length === 0 ? (
          <div className={styles.emptyHistory}>
            Chưa có nước đi nào
          </div>
        ) : (
          renderMoveHistory()
        )}
      </div>
    </div>
  );
}; 