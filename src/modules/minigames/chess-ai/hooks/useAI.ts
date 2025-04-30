import { useState, useCallback, useEffect } from 'react';
import { Chess } from 'chess.js';
import { AIConfig, AIMove, DifficultyLevel, Move, Square } from '../types';
import { algebraicToSquare, squareToAlgebraic, DEFAULT_AI_THINKING_TIME, deepClone, PIECE_VALUES, isEndgame } from '../lib/utils';
import { defaultAIConfigs } from '../types/ai.types';

/**
 * Hook quản lý logic AI cờ vua
 */
export function useChessAI(chess: Chess, initialLevel: DifficultyLevel = 'intermediate') {
  const [aiConfig, setAIConfig] = useState<AIConfig>(defaultAIConfigs[initialLevel]);
  const [isThinking, setIsThinking] = useState(false);
  const [lastEvaluation, setLastEvaluation] = useState<number | null>(null);

  // Đánh giá vị thế hiện tại cho quân trắng (w)
  const evaluatePosition = useCallback((chessInstance: Chess): number => {
    // Nếu kết thúc trò chơi, trả về điểm tùy thuộc vào kết quả
    if (chessInstance.isCheckmate()) {
      // Rất tệ nếu bên đánh giá bị chiếu bí, rất tốt nếu đối phương bị chiếu bí
      return chessInstance.turn() === 'w' ? -10000 : 10000;
    }
    
    if (chessInstance.isDraw()) {
      return 0; // Hòa cờ
    }
    
    // Đánh giá vị thế dựa trên các yếu tố khác nhau
    const { evaluationWeights } = aiConfig;
    let score = 0;
    
    // 1. Đánh giá dựa trên quân cờ (material)
    const board = chessInstance.board();
    let materialScore = 0;
    
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const square = board[y][x];
        if (square) {
          const pieceValue = PIECE_VALUES[square.type];
          materialScore += square.color === 'w' ? pieceValue : -pieceValue;
        }
      }
    }
    
    score += materialScore * evaluationWeights.material / 100;
    
    // 2. Đánh giá vị trí (mobility)
    const whiteValidMoves = new Chess(chessInstance.fen());
    whiteValidMoves.load(chessInstance.fen());
    const whiteMoveCount = whiteValidMoves.turn() === 'w' 
      ? whiteValidMoves.moves().length 
      : 0;
    
    const blackValidMoves = new Chess(chessInstance.fen());
    blackValidMoves.load(chessInstance.fen());
    if (blackValidMoves.turn() === 'b') {
      // Nếu đang là lượt của đen, đã có số nước đi sẵn
      const blackMoveCount = blackValidMoves.moves().length;
      score += (whiteMoveCount - blackMoveCount) * evaluationWeights.mobility / 10;
    } else {
      // Cần chuyển lượt để tính số nước đi của đen
      try {
        // Đây là hack, thực hiện một nước đi không hợp lệ để chuyển lượt
        // Tạo một FEN mới với lượt của đen
        const fenParts = chessInstance.fen().split(' ');
        fenParts[1] = 'b';
        const blackFen = fenParts.join(' ');
        blackValidMoves.load(blackFen);
        const blackMoveCount = blackValidMoves.moves().length;
        score += (whiteMoveCount - blackMoveCount) * evaluationWeights.mobility / 10;
      } catch (e) {
        // Bỏ qua nếu không thể hack
      }
    }
    
    // 3. Các đánh giá khác tùy vào cấp độ AI
    // Kiểm soát trung tâm (4 ô ở giữa)
    if (evaluationWeights.centerControl > 0) {
      const centerSquares = ['d4', 'e4', 'd5', 'e5'];
      for (const square of centerSquares) {
        const piece = chessInstance.get(square);
        if (piece) {
          score += piece.color === 'w' 
            ? evaluationWeights.centerControl 
            : -evaluationWeights.centerControl;
        }
      }
    }
    
    // Cấu trúc tốt
    if (evaluationWeights.pawnStructure > 0) {
      // Đơn giản hóa: Tính số tốt bị cô lập hoặc bị đôi
      const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      
      let whiteIsolatedPawns = 0;
      let blackIsolatedPawns = 0;
      let whiteDoubledPawns = 0;
      let blackDoubledPawns = 0;
      
      for (const file of files) {
        // Đếm số tốt trên mỗi cột
        let whitePawnsInFile = 0;
        let blackPawnsInFile = 0;
        
        for (let rank = 1; rank <= 8; rank++) {
          const square = `${file}${rank}`;
          const piece = chessInstance.get(square);
          
          if (piece && piece.type === 'p') {
            if (piece.color === 'w') whitePawnsInFile++;
            else blackPawnsInFile++;
          }
        }
        
        // Tính tốt đôi
        if (whitePawnsInFile > 1) whiteDoubledPawns += whitePawnsInFile - 1;
        if (blackPawnsInFile > 1) blackDoubledPawns += blackPawnsInFile - 1;
        
        // Kiểm tra tốt cô lập
        if (whitePawnsInFile > 0) {
          const fileIndex = files.indexOf(file);
          const hasNeighborPawns = 
            (fileIndex > 0 && hasWhitePawnInFile(chessInstance, files[fileIndex - 1])) || 
            (fileIndex < 7 && hasWhitePawnInFile(chessInstance, files[fileIndex + 1]));
          
          if (!hasNeighborPawns) whiteIsolatedPawns += whitePawnsInFile;
        }
        
        if (blackPawnsInFile > 0) {
          const fileIndex = files.indexOf(file);
          const hasNeighborPawns = 
            (fileIndex > 0 && hasBlackPawnInFile(chessInstance, files[fileIndex - 1])) || 
            (fileIndex < 7 && hasBlackPawnInFile(chessInstance, files[fileIndex + 1]));
          
          if (!hasNeighborPawns) blackIsolatedPawns += blackPawnsInFile;
        }
      }
      
      // Áp dụng điểm phạt cho tốt cô lập và tốt đôi
      score -= whiteIsolatedPawns * evaluationWeights.pawnStructure;
      score += blackIsolatedPawns * evaluationWeights.pawnStructure;
      score -= whiteDoubledPawns * evaluationWeights.pawnStructure;
      score += blackDoubledPawns * evaluationWeights.pawnStructure;
    }
    
    // Ưu tiên nước nhập thành cho cấp độ cao hơn
    if (evaluationWeights.kingSafety > 0) {
      // Kiểm tra nhập thành
      const whiteCanCastle = chessInstance.fen().includes('K') || chessInstance.fen().includes('Q');
      const blackCanCastle = chessInstance.fen().includes('k') || chessInstance.fen().includes('q');
      
      score += whiteCanCastle ? evaluationWeights.kingSafety : 0;
      score -= blackCanCastle ? evaluationWeights.kingSafety : 0;
    }
    
    return score;
  }, [aiConfig]);

  // Kiểm tra xem có tốt trắng trong cột không
  const hasWhitePawnInFile = (chessInstance: Chess, file: string): boolean => {
    for (let rank = 1; rank <= 8; rank++) {
      const square = `${file}${rank}`;
      const piece = chessInstance.get(square);
      if (piece && piece.type === 'p' && piece.color === 'w') {
        return true;
      }
    }
    return false;
  };

  // Kiểm tra xem có tốt đen trong cột không
  const hasBlackPawnInFile = (chessInstance: Chess, file: string): boolean => {
    for (let rank = 1; rank <= 8; rank++) {
      const square = `${file}${rank}`;
      const piece = chessInstance.get(square);
      if (piece && piece.type === 'p' && piece.color === 'b') {
        return true;
      }
    }
    return false;
  };

  // Thuật toán minimax với alpha-beta pruning
  const minimax = useCallback((
    chessInstance: Chess, 
    depth: number, 
    alpha: number, 
    beta: number, 
    isMaximizingPlayer: boolean
  ): number => {
    // Điều kiện dừng
    if (depth === 0 || chessInstance.isGameOver()) {
      return evaluatePosition(chessInstance);
    }
    
    if (isMaximizingPlayer) {
      let maxEval = -Infinity;
      const moves = chessInstance.moves({ verbose: true });
      
      for (const move of moves) {
        const newChess = new Chess(chessInstance.fen());
        newChess.move(move);
        
        const evaluation = minimax(newChess, depth - 1, alpha, beta, false);
        maxEval = Math.max(maxEval, evaluation);
        
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      
      return maxEval;
    } else {
      let minEval = Infinity;
      const moves = chessInstance.moves({ verbose: true });
      
      for (const move of moves) {
        const newChess = new Chess(chessInstance.fen());
        newChess.move(move);
        
        const evaluation = minimax(newChess, depth - 1, alpha, beta, true);
        minEval = Math.min(minEval, evaluation);
        
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      
      return minEval;
    }
  }, [evaluatePosition]);

  // Hàm chính để tìm nước đi tốt nhất cho AI
  const findBestMove = useCallback(async (): Promise<AIMove | null> => {
    setIsThinking(true);
    
    try {
      // Trì hoãn cho hiệu ứng "AI đang suy nghĩ"
      const thinkingTime = DEFAULT_AI_THINKING_TIME[aiConfig.level];
      await new Promise(resolve => setTimeout(resolve, thinkingTime));
      
      // Nếu không có nước đi hợp lệ hoặc trò chơi đã kết thúc
      if (chess.isGameOver()) {
        setIsThinking(false);
        return null;
      }
      
      const startTime = Date.now();
      const moves = chess.moves({ verbose: true });
      
      if (moves.length === 0) {
        setIsThinking(false);
        return null;
      }
      
      let bestMove: any = null;
      let bestScore = -Infinity;
      
      // Lặp qua tất cả nước đi hợp lệ để tìm nước tốt nhất
      for (const move of moves) {
        const newChess = new Chess(chess.fen());
        newChess.move(move);
        
        // Áp dụng minimax
        const score = minimax(
          newChess, 
          aiConfig.maxDepth, 
          -Infinity, 
          Infinity, 
          false
        );
        
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }
      
      const endTime = Date.now();
      const timeSpent = endTime - startTime;
      
      setLastEvaluation(bestScore);
      
      if (bestMove) {
        // Chuyển đổi sang định dạng Move của chúng ta
        const from = algebraicToSquare(bestMove.from);
        const to = algebraicToSquare(bestMove.to);
        
        const result: AIMove = {
          move: { from, to, promotion: bestMove.promotion },
          score: bestScore,
          depth: aiConfig.maxDepth,
          timeSpent
        };
        
        setIsThinking(false);
        return result;
      }
      
      setIsThinking(false);
      return null;
    } catch (error) {
      console.error('AI error:', error);
      setIsThinking(false);
      return null;
    }
  }, [chess, aiConfig.level, aiConfig.maxDepth, minimax]);

  // Thay đổi cấp độ AI
  const setDifficulty = useCallback((level: DifficultyLevel) => {
    setAIConfig(defaultAIConfigs[level]);
  }, []);

  return {
    findBestMove,
    setDifficulty,
    aiConfig,
    isThinking,
    lastEvaluation
  };
} 