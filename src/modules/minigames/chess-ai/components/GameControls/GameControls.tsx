<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React from 'react';
>>>>>>> 68c8b9797f44f99677222a0bad0cf7c0094b104f
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
  
<<<<<<< HEAD
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
=======
  // Danh sách các cấp độ khó
  const difficultyLevels: { label: string; value: DifficultyLevel }[] = [
    { label: 'Dễ', value: 'beginner' },
    { label: 'Trung bình', value: 'intermediate' },
    { label: 'Khó', value: 'advanced' },
    { label: 'Chuyên gia', value: 'expert' }
  ];
  
  // Xử lý khi thay đổi màu quân người chơi
  const handleColorChange = (color: PieceColor) => {
    setPlayerColor(color);
    startNewGame(); // Bắt đầu trò chơi mới khi đổi màu
  };
  
  // Xử lý khi thay đổi cấp độ khó
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value as DifficultyLevel);
>>>>>>> 68c8b9797f44f99677222a0bad0cf7c0094b104f
  };
  
  return (
    <div className={styles.controls}>
      <div className={styles.controlsGroup}>
<<<<<<< HEAD
        <h3 className={styles.groupTitle}>Controls</h3>
=======
        <h3 className={styles.groupTitle}>Điều khiển</h3>
>>>>>>> 68c8b9797f44f99677222a0bad0cf7c0094b104f
        <div className={styles.buttonsContainer}>
          <button 
            className={styles.button}
            onClick={startNewGame}
          >
<<<<<<< HEAD
            New Game
=======
            Ván mới
>>>>>>> 68c8b9797f44f99677222a0bad0cf7c0094b104f
          </button>
          
          <button 
            className={styles.button}
            onClick={undoMove}
            disabled={isGameOver}
          >
<<<<<<< HEAD
            Undo Move
=======
            Đi lại
>>>>>>> 68c8b9797f44f99677222a0bad0cf7c0094b104f
          </button>
        </div>
      </div>
      
      <div className={styles.controlsGroup}>
<<<<<<< HEAD
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
=======
        <h3 className={styles.groupTitle}>Cấp độ</h3>
        <select 
          className={styles.select}
          value={difficulty}
          onChange={handleDifficultyChange}
        >
          {difficultyLevels.map(level => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className={styles.controlsGroup}>
        <h3 className={styles.groupTitle}>Quân cờ</h3>
>>>>>>> 68c8b9797f44f99677222a0bad0cf7c0094b104f
        <div className={styles.colorOptions}>
          <button
            className={`${styles.colorOption} ${playerColor === 'w' ? styles.active : ''}`}
            onClick={() => handleColorChange('w')}
          >
<<<<<<< HEAD
            White
=======
            Trắng
>>>>>>> 68c8b9797f44f99677222a0bad0cf7c0094b104f
          </button>
          
          <button
            className={`${styles.colorOption} ${playerColor === 'b' ? styles.active : ''}`}
            onClick={() => handleColorChange('b')}
          >
<<<<<<< HEAD
            Black
=======
            Đen
>>>>>>> 68c8b9797f44f99677222a0bad0cf7c0094b104f
          </button>
        </div>
      </div>
    </div>
  );
}; 