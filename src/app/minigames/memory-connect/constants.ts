// Difficulty levels
export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  EXPERT = 'Expert',
}

// Board size configuration by difficulty - no time limit
export const GAME_CONFIG = {
  [Difficulty.EASY]: {
    rows: 8,
    cols: 10,
    pointsPerMatch: 10,
    minTileSize: 55, // Minimum tile size in pixels
  },
  [Difficulty.MEDIUM]: {
    rows: 10,
    cols: 12,
    pointsPerMatch: 15,
    minTileSize: 50,
  },
  [Difficulty.HARD]: {
    rows: 12,
    cols: 14,
    pointsPerMatch: 20,
    minTileSize: 45,
  },
  [Difficulty.EXPERT]: {
    rows: 14,
    cols: 16,
    pointsPerMatch: 30,
    minTileSize: 40,
  },
};

// Image paths for tiles (using Pokemon images as shown in user's screenshot)
export const TILE_IMAGES = [
  '/images/pokemon/1.png',
  '/images/pokemon/2.png',
  '/images/pokemon/3.png',
  '/images/pokemon/4.png',
  '/images/pokemon/5.png',
  '/images/pokemon/6.png',
  '/images/pokemon/7.png',
  '/images/pokemon/8.png',
  '/images/pokemon/9.png',
  '/images/pokemon/10.png',
  '/images/pokemon/11.png',
  '/images/pokemon/12.png',
  '/images/pokemon/13.png',
  '/images/pokemon/14.png',
  '/images/pokemon/15.png',
  '/images/pokemon/16.png',
  '/images/pokemon/17.png',
  '/images/pokemon/18.png',
  '/images/pokemon/19.png',
  '/images/pokemon/20.png',
  '/images/pokemon/21.png',
  '/images/pokemon/22.png',
  '/images/pokemon/23.png',
  '/images/pokemon/24.png',
  '/images/pokemon/25.png',
  '/images/pokemon/26.png',
  '/images/pokemon/27.png',
  '/images/pokemon/28.png',
  '/images/pokemon/29.png',
  '/images/pokemon/30.png',
  '/images/pokemon/31.png',
  '/images/pokemon/32.png',
  '/images/pokemon/33.png',
  '/images/pokemon/34.png',
  '/images/pokemon/35.png',
  '/images/pokemon/36.png',
  '/images/minigam/1.png',
  '/images/minigam/2.png',
  '/images/minigam/3.png',
  '/images/minigam/4.png',
  '/images/minigam/5.png',
  '/images/minigam/6.png',
  '/images/minigam/7.png',
  '/images/minigam/8.png',
  '/images/minigam/9.png',
  '/images/minigam/10.png',
  '/images/minigam/11.png',
  '/images/minigam/12.png',
];

// Maximum tiles for each difficulty
export const MAX_TILES = {
  [Difficulty.EASY]: 80,
  [Difficulty.MEDIUM]: 120,
  [Difficulty.HARD]: 168,
  [Difficulty.EXPERT]: 224,
};

// Animation durations (ms)
export const ANIMATION_DURATION = {
  SELECT: 300,
  MATCH: 500,
  MISMATCH: 1000,
};

// Connection line color
export const CONNECTION_COLOR = '#4ade80';

// Success messages and emojis
export const SUCCESS_MESSAGES = [
  { message: "Great match! 🎯", emoji: "🎯" },
  { message: "Excellent! 🌟", emoji: "🌟" },
  { message: "Perfect! ✨", emoji: "✨" },
  { message: "Well done! 👍", emoji: "👍" },
  { message: "Amazing! 🚀", emoji: "🚀" },
  { message: "Brilliant! 💡", emoji: "💡" },
  { message: "Nice one! 👏", emoji: "👏" },
  { message: "Awesome! 🔥", emoji: "🔥" }
];

// Local storage key
export const LOCAL_STORAGE_KEY = 'msci_memory_connect_scores';

// Generate 100 levels with increasing difficulty
export const generateLevels = () => {
  const levels = [];
  
  for (let i = 1; i <= 100; i++) {
    // Calculate difficulty parameters based on level number
    let rows, cols, minTileSize;
    let pointsPerMatch = 10 + Math.floor(i / 5); // Increase points every 5 levels
    
    if (i <= 20) { // Levels 1-20: Easy
      rows = 8;
      cols = 10;
      minTileSize = 55;
    } else if (i <= 50) { // Levels 21-50: Medium
      rows = 10;
      cols = 12;
      minTileSize = 50;
    } else if (i <= 80) { // Levels 51-80: Hard
      rows = 12;
      cols = 14;
      minTileSize = 45;
    } else { // Levels 81-100: Expert
      rows = 14;
      cols = 16;
      minTileSize = 40;
    }
    
    levels.push({
      level: i,
      rows,
      cols,
      pointsPerMatch,
      minTileSize
    });
  }
  
  return levels;
};

export const LEVELS = generateLevels(); 