import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Chess } from 'chess.js';
import { useChessEngine, useChessAI, useLocalStorage } from '../hooks';
import { DifficultyLevel, GameState, Square, PieceColor } from '../types';
import { INITIAL_FEN } from '../lib/utils';

interface GameContextProps {
  gameState: GameState;
  selectPiece: (square: Square) => void;
  movePiece: (from: Square, to: Square, promotion?: string) => boolean;
  resetGame: (fen?: string) => void;
  undoMove: () => boolean;
  makeAIMove: () => Promise<boolean>;
  isAIThinking: boolean;
  playerColor: PieceColor;
  setPlayerColor: (color: PieceColor) => void;
  difficulty: DifficultyLevel;
  setDifficulty: (level: DifficultyLevel) => void;
  aiEvaluation: number | null;
  startNewGame: () => void;
  isPlayerTurn: boolean;
  gameHistory: string[];
  isGameOver: boolean;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext phải được sử dụng trong GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  // Lưu trữ cấu hình trò chơi trong localStorage
  const [savedDifficulty, setSavedDifficulty] = useLocalStorage<DifficultyLevel>('chess_difficulty', 'intermediate');
  const [savedPlayerColor, setSavedPlayerColor] = useLocalStorage<PieceColor>('chess_player_color', 'w');
  
  // State cục bộ
  const [playerColor, setPlayerColorState] = useState<PieceColor>(savedPlayerColor);
  const [difficulty, setDifficultyState] = useState<DifficultyLevel>(savedDifficulty);
  
  // Khởi tạo chess engine
  const { 
    gameState, 
    selectPiece, 
    movePiece, 
    resetGame, 
    undoMove, 
    isGameOver,
    chess 
  } = useChessEngine();
  
  // Khởi tạo AI
  const { 
    findBestMove, 
    setDifficulty: setAIDifficulty, 
    isThinking: isAIThinking,
    lastEvaluation
  } = useChessAI(chess, difficulty);
  
  // Lưu lại cấu hình vào localStorage khi thay đổi
  const setPlayerColor = (color: PieceColor) => {
    setPlayerColorState(color);
    setSavedPlayerColor(color);
  };
  
  const setDifficulty = (level: DifficultyLevel) => {
    setDifficultyState(level);
    setSavedDifficulty(level);
    setAIDifficulty(level);
  };
  
  // Kiểm tra xem có phải lượt của người chơi không
  const isPlayerTurn = gameState.turn === playerColor;
  
  // Thực hiện nước đi của AI
  const makeAIMove = async (): Promise<boolean> => {
    const bestMove = await findBestMove();
    if (bestMove) {
      return movePiece(
        bestMove.move.from, 
        bestMove.move.to, 
        bestMove.move.promotion
      );
    }
    return false;
  };
  
  // Tự động thực hiện nước đi của AI khi đến lượt của AI
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    // Nếu không phải lượt của người chơi và trò chơi chưa kết thúc
    if (!isPlayerTurn && !isGameOver() && !isAIThinking) {
      timeoutId = setTimeout(() => {
        makeAIMove();
      }, 500); // Delay một chút trước khi AI đi
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [gameState, isPlayerTurn, isAIThinking, isGameOver]);
  
  // Bắt đầu trò chơi mới
  const startNewGame = () => {
    resetGame();
  };
  
  return (
    <GameContext.Provider
      value={{
        gameState,
        selectPiece,
        movePiece,
        resetGame,
        undoMove,
        makeAIMove,
        isAIThinking,
        playerColor,
        setPlayerColor,
        difficulty,
        setDifficulty,
        aiEvaluation: lastEvaluation,
        startNewGame,
        isPlayerTurn,
        gameHistory: gameState.moveHistory,
        isGameOver: isGameOver()
      }}
    >
      {children}
    </GameContext.Provider>
  );
}; 