import React, { useEffect } from 'react';
import { GameProvider } from './contexts/GameContext';
import { Board, GameControls, GameStatus, MoveHistory } from './components';

import styles from './ChessGame.module.css';

export const ChessGame: React.FC = () => {
<<<<<<< HEAD
  // Preload chess piece images
=======
  // Preload hình ảnh quân cờ
>>>>>>> 68c8b9797f44f99677222a0bad0cf7c0094b104f
  useEffect(() => {
    const pieceTypes = ['p', 'n', 'b', 'r', 'q', 'k'];
    const colors = ['w', 'b'];
    
    colors.forEach(color => {
      pieceTypes.forEach(type => {
        const img = new Image();
        img.src = `/images/chess/pieces/${color}${type.toUpperCase()}.svg`;
      });
    });
  }, []);
  
  return (
    <GameProvider>
      <div className={styles.container}>
<<<<<<< HEAD
        <h1 className={styles.title}>Chess AI Challenge</h1>
=======
        <h1 className={styles.title}>Cờ Vua với AI</h1>
>>>>>>> 68c8b9797f44f99677222a0bad0cf7c0094b104f
        
        <div className={styles.gameLayout}>
          <div className={styles.boardSection}>
            <GameStatus />
            <Board />
          </div>
          
          <div className={styles.controlsSection}>
            <GameControls />
            <MoveHistory />
          </div>
        </div>
        
        <div className={styles.footer}>
<<<<<<< HEAD
          <p>Challenge the AI at different skill levels</p>
=======
          <p>Đấu với AI ở nhiều cấp độ khác nhau</p>
>>>>>>> 68c8b9797f44f99677222a0bad0cf7c0094b104f
        </div>
      </div>
    </GameProvider>
  );
}; 