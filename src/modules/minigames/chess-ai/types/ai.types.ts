import { DifficultyLevel, Move } from './chess.types';

export interface AIConfig {
  level: DifficultyLevel;
  maxDepth: number;
  useOpeningBook: boolean;
  evaluationWeights: EvaluationWeights;
  thinkingTime?: number; // Thời gian suy nghĩ tối đa (ms)
}

export interface EvaluationWeights {
  material: number;
  position: number;
  mobility: number;
  pawnStructure: number;
  kingSafety: number;
  centerControl: number;
  development: number;
}

export interface AIMove {
  move: Move;
  score: number;
  depth: number;
  timeSpent: number;
}

export const defaultAIConfigs: Record<DifficultyLevel, AIConfig> = {
  beginner: {
    level: 'beginner',
    maxDepth: 1,
    useOpeningBook: false,
    evaluationWeights: {
      material: 100,
      position: 10,
      mobility: 0,
      pawnStructure: 0,
      kingSafety: 0,
      centerControl: 0,
      development: 0
    }
  },
  intermediate: {
    level: 'intermediate',
    maxDepth: 2,
    useOpeningBook: true,
    evaluationWeights: {
      material: 100,
      position: 20,
      mobility: 5,
      pawnStructure: 5,
      kingSafety: 10,
      centerControl: 10,
      development: 0
    }
  },
  advanced: {
    level: 'advanced',
    maxDepth: 3,
    useOpeningBook: true,
    evaluationWeights: {
      material: 100,
      position: 30,
      mobility: 10,
      pawnStructure: 10,
      kingSafety: 20,
      centerControl: 15,
      development: 10
    }
  },
  expert: {
    level: 'expert',
    maxDepth: 4,
    useOpeningBook: true,
    evaluationWeights: {
      material: 100,
      position: 40,
      mobility: 15,
      pawnStructure: 15,
      kingSafety: 30,
      centerControl: 20,
      development: 15
    }
  }
}; 