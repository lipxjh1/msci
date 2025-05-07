import { Difficulty } from './constants';

export interface Position {
  row: number;
  col: number;
}

export interface Tile {
  id: number;
  imageIndex: number;
  url: string;
  isMatched: boolean;
  isSelected: boolean;
  position: Position;
}

export interface ConnectionPoint {
  x: number;
  y: number;
}

export interface Connection {
  points: ConnectionPoint[];
  duration: number;
}

export interface ConnectionPath {
  startTile: Tile;
  endTile: Tile;
  path: Position[];
}

export interface GameState {
  tiles: Tile[];
  selectedTiles: Tile[];
  connections: Connection[];
  difficulty: Difficulty;
  score: number;
  elapsedTime: number;
  gameStatus: 'waiting' | 'playing' | 'paused' | 'completed' | 'failed';
  tilesRemaining: number;
  currentLevel: number;
  successMessage: SuccessMessage | null;
}

export interface GameControlsProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onReset: () => void;
  onStart: () => void;
  gameStatus: GameState['gameStatus'];
  onPause: () => void;
  onResume: () => void;
  currentLevel: number;
  onLevelChange: (level: number) => void;
}

export interface GameStatusProps {
  score: number;
  tilesRemaining: number;
  elapsedTime: number;
  difficulty: Difficulty;
  gameStatus: GameState['gameStatus'];
  currentLevel: number;
  highScore: number;
  bestTime?: number;
}

export interface GameBoardProps {
  tiles: Tile[];
  connections: Connection[];
  onTileClick: (tile: Tile) => void;
  gameStatus: GameState['gameStatus'];
  successMessage: SuccessMessage | null;
}

export interface TileProps {
  tile: Tile;
  onClick: (tile: Tile) => void;
  disabled: boolean;
  tileSize: number;
}

export interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  score: number;
  isSuccess: boolean;
  difficulty: Difficulty;
  currentLevel: number;
  highScore: number;
  onNextLevel: () => void;
  elapsedTime?: number;
  bestTime?: number;
}

export interface GameIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

export interface GameLevel {
  level: number;
  rows: number;
  cols: number;
  timeLimit: number;
  pointsPerMatch: number;
  timeBonus: number;
}

export interface SuccessMessage {
  message: string;
  emoji: string;
  timestamp: number;
}

export interface HighScore {
  level: number;
  score: number;
  date: string;
}

export interface PlayerStats {
  highScores: Record<number, HighScore>;
  lastPlayedLevel: number;
  totalScore: number;
  matchesCompleted: number;
} 