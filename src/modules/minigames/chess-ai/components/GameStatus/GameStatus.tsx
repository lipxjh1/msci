import React from 'react';
import { useGameContext } from '../../contexts/GameContext';
import styles from './GameStatus.module.css';

export const GameStatus: React.FC = () => {
  const { gameState, isPlayerTurn, playerColor, aiEvaluation } = useGameContext();
  
  // Hàm chuyển đổi trạng thái game sang thông báo tiếng Việt
  const getStatusMessage = (): string => {
    const { status, turn } = gameState;
    
    const isPlayerWinner = status === 'checkmate' && turn !== playerColor;
    const isAIWinner = status === 'checkmate' && turn === playerColor;
    
    if (isPlayerWinner) {
      return '🏆 Chúc mừng! Bạn đã thắng.';
    } else if (isAIWinner) {
      return '😢 Bạn đã thua. Cố gắng lần sau nhé!';
    }
    
    switch (status) {
      case 'check':
        if (isPlayerTurn) {
          return '⚠️ Vua của bạn đang bị chiếu!';
        } else {
          return '⚠️ Vua đối phương đang bị chiếu!';
        }
      case 'stalemate':
        return '🤝 Hòa cờ do bế tắc.';
      case 'draw':
        return '🤝 Hòa cờ.';
      default:
        if (isPlayerTurn) {
          return '⏳ Lượt của bạn.';
        } else {
          return '🤔 Đối thủ đang suy nghĩ...';
        }
    }
  };
  
  // Hiển thị đánh giá vị thế (chỉ hiển thị khi aiEvaluation có giá trị)
  const getEvaluationBar = () => {
    if (aiEvaluation === null) return null;
    
    // Giới hạn giá trị trong khoảng -1000 đến 1000 cho biểu diễn thanh đánh giá
    const clampedEval = Math.max(-1000, Math.min(1000, aiEvaluation));
    
    // Chuyển đổi giá trị từ -1000...1000 thành 0...100 cho thanh tiến trình
    // 0 là ưu thế tuyệt đối cho quân đen, 100 là ưu thế tuyệt đối cho quân trắng, 50 là cân bằng
    const percentage = 50 + (clampedEval / 20);
    
    // Xác định màu cho thanh đánh giá
    const getBarColor = () => {
      if (percentage > 50) {
        return playerColor === 'w' ? '#4ade80' : '#ef4444'; // Xanh nếu người chơi đang thắng, đỏ nếu đang thua
      } else if (percentage < 50) {
        return playerColor === 'b' ? '#4ade80' : '#ef4444'; // Ngược lại
      } else {
        return '#f59e0b'; // Vàng nếu cân bằng
      }
    };
    
    const barStyle = {
      width: `${percentage}%`,
      backgroundColor: getBarColor()
    };
    
    // Định dạng số đánh giá
    const formattedEval = (aiEvaluation / 100).toFixed(1);
    const displayEval = aiEvaluation > 0 ? `+${formattedEval}` : formattedEval;
    
    return (
      <div className={styles.evaluationContainer}>
        <div className={styles.evaluationBar}>
          <div className={styles.evaluationProgress} style={barStyle}></div>
        </div>
        <div className={styles.evaluationValue}>{displayEval}</div>
      </div>
    );
  };
  
  return (
    <div className={styles.statusContainer}>
      <div className={styles.statusMessage}>
        {getStatusMessage()}
      </div>
      {getEvaluationBar()}
    </div>
  );
}; 