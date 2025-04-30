import React, { useEffect } from 'react';
import { GameProvider } from './contexts/GameContext';
import { Board, GameControls, GameStatus, MoveHistory } from './components';

import styles from './ChessGame.module.css';

export const ChessGame: React.FC = () => {
  // Preload chess piece images
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
        <h1 className={styles.title}>Chess AI Challenge</h1>
        
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
          <p>Challenge the AI at different skill levels</p>
        </div>
      </div>
    </GameProvider>
  );
}; 