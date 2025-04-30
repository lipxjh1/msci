export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
export type PieceColor = 'w' | 'b';

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
}

export interface Square {
  x: number;
  y: number;
}

export interface Move {
  from: Square;
  to: Square;
  promotion?: PieceType;
}

export type GameStatus = 'playing' | 'check' | 'checkmate' | 'stalemate' | 'draw';

export interface GameState {
  board: (ChessPiece | null)[][];
  turn: PieceColor;
  status: GameStatus;
  selectedPiece: Square | null;
  validMoves: Square[];
  moveHistory: string[];
  capturedPieces: {
    w: ChessPiece[];
    b: ChessPiece[];
  };
  fenString: string;
}

export interface HistoryEntry {
  move: string;
  fen: string;
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'; 