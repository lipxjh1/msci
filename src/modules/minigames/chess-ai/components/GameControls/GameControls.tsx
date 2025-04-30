import React, { useState } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { DifficultyLevel, PieceColor } from '../../types';
import styles from './GameControls.module.css';

export const GameControls: React.FC = () => {
  const { 
    undoMove,
    resetGame,
    playerColor,
    setPlayerColor,
    difficulty,
    setDifficulty,
    isGameOver,
    startNewGame
  } = useGameContext();
  
  // List of difficulty levels
  const difficultyLevels: { label: string; value: DifficultyLevel }[] = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
    { label: 'Expert', value: 'expert' }
  ];
  
  // Handle player color change
  const handleColorChange = (color: PieceColor) => {
    setPlayerColor(color);
    startNewGame(); // Start a new game when color changes
  };
  
  // Handle difficulty level change
  const handleDifficultyChange = (difficulty: DifficultyLevel) => {
    setDifficulty(difficulty);
  };
  
  return (
    <div className={styles.controls}>
      <div className={styles.controlsGroup}>
        <h3 className={styles.groupTitle}>Controls</h3>
        <div className={styles.buttonsContainer}>
          <button 
            className={styles.button}
            onClick={startNewGame}
          >
            New Game
          </button>
          
          <button 
            className={styles.button}
            onClick={undoMove}
            disabled={isGameOver}
          >
            Undo Move
          </button>
        </div>
      </div>
      
      <div className={styles.controlsGroup}>
        <h3 className={styles.groupTitle}>Difficulty</h3>
        <div className={styles.difficultyButtons}>
          {difficultyLevels.map(level => (
            <button
              key={level.value}
              className={`${styles.difficultyBtn} ${difficulty === level.value ? styles.active : ''}`}
              onClick={() => handleDifficultyChange(level.value)}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.controlsGroup}>
        <h3 className={styles.groupTitle}>Piece Color</h3>
        <div className={styles.colorOptions}>
          <button
            className={`${styles.colorOption} ${playerColor === 'w' ? styles.active : ''}`}
            onClick={() => handleColorChange('w')}
          >
            White
          </button>
          
          <button
            className={`${styles.colorOption} ${playerColor === 'b' ? styles.active : ''}`}
            onClick={() => handleColorChange('b')}
          >
            Black
          </button>
        </div>
      </div>
    </div>
  );
}; 