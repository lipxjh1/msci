import { useState, useCallback, useEffect } from 'react';
import { Chess } from 'chess.js';
import { GameState, Square, PieceColor, GameStatus, ChessPiece } from '../types';
import { algebraicToSquare, squareToAlgebraic, INITIAL_FEN } from '../lib/utils';

// Hàm riêng, nằm ngoài hook để tránh Temporal Dead Zone
function createGameStateFromChess(chessInstance: Chess): GameState {
  // Lấy bàn cờ dưới dạng mảng 2D
  const board: (ChessPiece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Lấp đầy bàn cờ từ instance chess.js
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const square = squareToAlgebraic({ x, y });
      const piece = chessInstance.get(square);
      if (piece) {
        board[y][x] = {
          type: piece.type as any,
          color: piece.color as PieceColor
        };
      }
    }
  }
  
  // Xác định trạng thái trò chơi
  let status: GameStatus = 'playing';
  if (chessInstance.isCheckmate()) status = 'checkmate';
  else if (chessInstance.isStalemate()) status = 'stalemate';
  else if (chessInstance.isDraw()) status = 'draw';
  else if (chessInstance.isCheck()) status = 'check';
  
  // Lấy lịch sử nước đi
  const history = chessInstance.history();
  
  // Lấy danh sách quân bị bắt
  const capturedPieces = {
    w: [] as ChessPiece[],
    b: [] as ChessPiece[]
  };
  
  // Trả về trạng thái trò chơi
  return {
    board,
    turn: chessInstance.turn() as PieceColor,
    status,
    selectedPiece: null,
    validMoves: [],
    moveHistory: history,
    capturedPieces,
    fenString: chessInstance.fen()
  };
}

/**
 * Hook quản lý trạng thái và logic cờ vua cơ bản
 */
export function useChessEngine(initialFen = INITIAL_FEN) {
  const [chess, setChess] = useState<Chess>(() => new Chess(initialFen));
  const [gameState, setGameState] = useState<GameState>(() => createGameStateFromChess(new Chess(initialFen)));

  // Cập nhật trạng thái trò chơi từ đối tượng chess
  const updateGameState = useCallback(() => {
    setGameState(createGameStateFromChess(chess));
  }, [chess]);

  // Chọn quân cờ
  const selectPiece = useCallback((square: Square) => {
    const { x, y } = square;
    
    // Không cho phép chọn quân nếu trò chơi đã kết thúc
    if (gameState.status === 'checkmate' || gameState.status === 'stalemate' || gameState.status === 'draw') {
      return;
    }
    
    // Lấy quân cờ tại vị trí được chọn
    const piece = gameState.board[y][x];
    
    // Nếu không có quân cờ hoặc không phải lượt đi của quân cờ đó
    if (!piece || piece.color !== gameState.turn) {
      setGameState(prev => ({
        ...prev,
        selectedPiece: null,
        validMoves: []
      }));
      return;
    }
    
    // Lấy các nước đi hợp lệ
    const algebraicSquare = squareToAlgebraic(square);
    const validMoves: Square[] = [];
    
    chess.moves({ square: algebraicSquare, verbose: true }).forEach((move: any) => {
      validMoves.push(algebraicToSquare(move.to));
    });
    
    // Cập nhật trạng thái
    setGameState(prev => ({
      ...prev,
      selectedPiece: square,
      validMoves
    }));
  }, [chess, gameState.board, gameState.status, gameState.turn]);

  // Di chuyển quân cờ
  const movePiece = useCallback((from: Square, to: Square, promotion?: string): boolean => {
    // Không cho phép di chuyển nếu trò chơi đã kết thúc
    if (gameState.status === 'checkmate' || gameState.status === 'stalemate' || gameState.status === 'draw') {
      return false;
    }
    
    const fromAlgebraic = squareToAlgebraic(from);
    const toAlgebraic = squareToAlgebraic(to);
    
    try {
      const result = chess.move({
        from: fromAlgebraic,
        to: toAlgebraic,
        promotion: promotion as any
      });
      
      if (result) {
        updateGameState();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Invalid move:', error);
      return false;
    }
  }, [chess, gameState.status, updateGameState]);

  // Reset lại trò chơi
  const resetGame = useCallback((fen = INITIAL_FEN) => {
    const newChess = new Chess(fen);
    setChess(newChess);
    setGameState(createGameStateFromChess(newChess));
  }, []);

  // Lùi lại 1 nước
  const undoMove = useCallback(() => {
    const success = chess.undo();
    if (success) {
      updateGameState();
      return true;
    }
    return false;
  }, [chess, updateGameState]);

  // Lấy lịch sử nước đi FEN
  const getHistoryFen = useCallback(() => {
    // Chú ý: chess.js không cung cấp trực tiếp lịch sử FEN
    // Đây là phương pháp để mô phỏng nó
    const tempChess = new Chess(initialFen);
    const moves = chess.history({ verbose: true });
    const fenHistory = [initialFen];
    
    for (const move of moves) {
      tempChess.move(move as any);
      fenHistory.push(tempChess.fen());
    }
    
    return fenHistory;
  }, [chess, initialFen]);

  // Lấy tất cả nước đi hợp lệ
  const getAllLegalMoves = useCallback(() => {
    return chess.moves({ verbose: true }) as any[];
  }, [chess]);

  // Kiểm tra xem trò chơi đã kết thúc chưa
  const isGameOver = useCallback(() => {
    return chess.isGameOver();
  }, [chess]);

  // Cập nhật trạng thái khi chess object thay đổi
  useEffect(() => {
    updateGameState();
  }, [chess, updateGameState]);

  return {
    gameState,
    selectPiece,
    movePiece,
    resetGame,
    undoMove,
    getHistoryFen,
    getAllLegalMoves,
    isGameOver,
    chess // trả về instance chess.js để có thể sử dụng API của nó khi cần
  };
} 