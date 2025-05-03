// Định nghĩa các kiểu dữ liệu cho trò chơi Tic-Tac-Toe

export type Player = 'X' | 'O' | null;
export type Board = Player[][];
export type GameState = 'playing' | 'draw' | 'X_won' | 'O_won' | 'won' | 'lost';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameSettings {
  difficulty: Difficulty;
  playerMark: Player;
}

export interface MoveResult {
  winner: Player;
  gameOver: boolean;
  winningLine?: number[][];
}

export interface AIMove {
  row: number;
  col: number;
} 