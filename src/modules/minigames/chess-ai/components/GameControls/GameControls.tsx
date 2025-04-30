import React from 'react';
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
  };
  
  return (
    <div className={styles.controls}>
      <div className={styles.controlsGroup}>
        <h3 className={styles.groupTitle}>Điều khiển</h3>
        <div className={styles.buttonsContainer}>
          <button 
            className={styles.button}
            onClick={startNewGame}
          >
            Ván mới
          </button>
          
          <button 
            className={styles.button}
            onClick={undoMove}
            disabled={isGameOver}
          >
            Đi lại
          </button>
        </div>
      </div>
      
      <div className={styles.controlsGroup}>
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
        <div className={styles.colorOptions}>
          <button
            className={`${styles.colorOption} ${playerColor === 'w' ? styles.active : ''}`}
            onClick={() => handleColorChange('w')}
          >
            Trắng
          </button>
          
          <button
            className={`${styles.colorOption} ${playerColor === 'b' ? styles.active : ''}`}
            onClick={() => handleColorChange('b')}
          >
            Đen
          </button>
        </div>
      </div>
    </div>
  );
}; 