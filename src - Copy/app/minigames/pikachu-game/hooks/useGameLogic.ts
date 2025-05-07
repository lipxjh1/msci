import { useState, useEffect, useCallback, useRef } from 'react';
import { findPath } from '../utils/pathFinding';

export interface Card {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
  row: number;
  col: number;
}

export interface BoardSize {
  rows: number;
  cols: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface GameState {
  cards: Card[];
  selectedCards: Card[];
  highlightedPair: Card[] | null;
  connectingPath: Point[] | null;
  isGameOver: boolean;
  isPaused: boolean;
  timeLeft: number;
  score: number;
  boardSize: BoardSize;
}

export interface GameOptions {
  initialTime: number;
  boardSize: BoardSize;
  difficulty: 'easy' | 'medium' | 'hard';
}

const MATCH_SCORE = 10;
const TIME_BONUS = 5;

const generateCards = (rows: number, cols: number): Card[] => {
  // Số lượng thẻ phải chẵn
  const totalCards = rows * cols;
  if (totalCards % 2 !== 0) {
    throw new Error('Số lượng thẻ phải là số chẵn');
  }

  // Tạo mảng các giá trị (mỗi giá trị xuất hiện 2 lần)
  const values = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
  const pairedValues = [...values, ...values];
  
  // Xáo trộn mảng
  const shuffledValues = pairedValues.sort(() => Math.random() - 0.5);
  
  // Tạo mảng thẻ
  const cards: Card[] = [];
  for (let i = 0; i < totalCards; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    cards.push({
      id: i,
      value: shuffledValues[i],
      isFlipped: false,
      isMatched: false,
      row,
      col
    });
  }
  
  return cards;
};

export const useGameLogic = (options: GameOptions) => {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    selectedCards: [],
    highlightedPair: null,
    connectingPath: null,
    isGameOver: false,
    isPaused: false,
    timeLeft: options.initialTime,
    score: 0,
    boardSize: options.boardSize
  });
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Khởi tạo game
  useEffect(() => {
    resetGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [options.boardSize]);
  
  // Đồng hồ đếm ngược
  useEffect(() => {
    if (!gameState.isPaused && !gameState.isGameOver && gameState.timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
          isGameOver: prev.timeLeft <= 1 && !isAllMatched(prev.cards)
        }));
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState.isPaused, gameState.isGameOver, gameState.timeLeft]);
  
  // Kiểm tra thắng cuộc
  useEffect(() => {
    if (isAllMatched(gameState.cards) && !gameState.isGameOver) {
      setGameState(prev => ({
        ...prev,
        isGameOver: true
      }));
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [gameState.cards, gameState.isGameOver]);
  
  // Kiểm tra xem tất cả thẻ đã được ghép đôi chưa
  const isAllMatched = useCallback((cards: Card[]) => {
    return cards.every(card => card.isMatched);
  }, []);
  
  // Xử lý khi người chơi chọn thẻ
  const handleCardClick = useCallback((card: Card) => {
    if (
      gameState.isPaused || 
      gameState.isGameOver || 
      card.isMatched || 
      card.isFlipped ||
      gameState.selectedCards.length >= 2
    ) {
      return;
    }
    
    // Lật thẻ
    setGameState(prev => {
      const updatedCards = prev.cards.map(c => 
        c.id === card.id ? { ...c, isFlipped: true } : c
      );
      
      const updatedSelected = [...prev.selectedCards, card];
      
      // Nếu đã chọn 2 thẻ, kiểm tra xem có khớp không
      if (updatedSelected.length === 2) {
        const [first, second] = updatedSelected;
        
        if (first.value === second.value) {
          // Tìm đường đi giữa 2 thẻ
          const path = findPath(
            updatedCards,
            { row: first.row, col: first.col },
            { row: second.row, col: second.col },
            prev.boardSize
          );
          
          // Nếu tìm thấy đường đi, ghép đôi thành công
          if (path) {
            const pathPoints = path.map(p => ({ x: p.col, y: p.row }));
            
            // Cộng điểm và thời gian thưởng
            const newScore = prev.score + MATCH_SCORE;
            const newTimeLeft = prev.timeLeft + TIME_BONUS;
            
            return {
              ...prev,
              cards: updatedCards.map(c => 
                c.id === first.id || c.id === second.id 
                  ? { ...c, isMatched: true } 
                  : c
              ),
              selectedCards: [],
              highlightedPair: [first, second],
              connectingPath: pathPoints,
              score: newScore,
              timeLeft: newTimeLeft
            };
          }
        }
        
        // Nếu không khớp hoặc không tìm thấy đường đi, lật ngược thẻ sau 1 giây
        setTimeout(() => {
          setGameState(currentState => ({
            ...currentState,
            cards: currentState.cards.map(c => 
              (c.id === first.id || c.id === second.id) && !c.isMatched 
                ? { ...c, isFlipped: false } 
                : c
            ),
            selectedCards: [],
            highlightedPair: null,
            connectingPath: null
          }));
        }, 1000);
      }
      
      return {
        ...prev,
        cards: updatedCards,
        selectedCards: updatedSelected
      };
    });
  }, [gameState.isPaused, gameState.isGameOver, gameState.selectedCards]);
  
  // Tạm dừng hoặc tiếp tục game
  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  }, []);
  
  // Reset game
  const resetGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    setGameState({
      cards: generateCards(options.boardSize.rows, options.boardSize.cols),
      selectedCards: [],
      highlightedPair: null,
      connectingPath: null,
      isGameOver: false,
      isPaused: false,
      timeLeft: options.initialTime,
      score: 0,
      boardSize: options.boardSize
    });
  }, [options.initialTime, options.boardSize]);
  
  // Xóa đường nối sau khi hiển thị
  useEffect(() => {
    if (gameState.connectingPath) {
      const timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          connectingPath: null,
          highlightedPair: null
        }));
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState.connectingPath]);
  
  return {
    ...gameState,
    handleCardClick,
    togglePause,
    resetGame
  };
}; 