"use client";

import { motion } from 'framer-motion';
import { GameStatusProps } from '../types';

const GameStatus = ({ 
  score, 
  tilesRemaining, 
  elapsedTime, 
  difficulty, 
  gameStatus, 
  currentLevel,
  highScore,
  bestTime
}: GameStatusProps) => {
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="w-full bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800 shadow-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Score */}
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs font-medium mb-1">Score</span>
          <div className="flex items-center">
            <motion.span 
              key={score}
              initial={{ scale: 1.3, color: '#4ade80' }}
              animate={{ scale: 1, color: '#ffffff' }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500"
            >
              {score}
            </motion.span>
            {highScore > 0 && (
              <span className="text-yellow-400 text-xs font-medium ml-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                {highScore}
              </span>
            )}
          </div>
        </div>
        
        {/* Level */}
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs font-medium mb-1">Level</span>
          <div className="flex items-center">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">{currentLevel}</span>
            <span className="text-gray-500 text-xs font-medium ml-1">/ 100</span>
          </div>
        </div>
        
        {/* Tiles Remaining */}
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs font-medium mb-1">Tiles Remaining</span>
          <div className="flex items-center">
            <motion.span 
              key={tilesRemaining}
              initial={{ scale: 1.3, color: '#f97316' }}
              animate={{ scale: 1, color: '#ffffff' }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500"
            >
              {tilesRemaining}
            </motion.span>
          </div>
        </div>
        
        {/* Time */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <span className="text-gray-400 text-xs font-medium">Time</span>
            <span className="text-sm font-medium text-cyan-400">
              {formatTime(elapsedTime)}
            </span>
          </div>
          
          {/* Best Time (if available) */}
          {bestTime && gameStatus !== 'waiting' && (
            <div className="flex items-center text-xs text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Best: {formatTime(bestTime)}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Game status message */}
      {gameStatus === 'waiting' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-gray-300 text-sm font-medium bg-gray-800/70 py-2 px-4 rounded-lg"
        >
          Select difficulty and press Start to play
        </motion.div>
      )}
      
      {gameStatus === 'paused' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-yellow-400 text-sm font-medium bg-yellow-900/20 py-2 px-4 rounded-lg border border-yellow-700/30"
        >
          Game paused
        </motion.div>
      )}
      
      {gameStatus === 'completed' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-green-400 text-sm font-medium bg-green-900/20 py-2 px-4 rounded-lg border border-green-700/30"
        >
          Level completed! {bestTime ? `Time: ${formatTime(elapsedTime)}` : 'Congratulations!'}
        </motion.div>
      )}
      
      {gameStatus === 'failed' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-red-400 text-sm font-medium bg-red-900/20 py-2 px-4 rounded-lg border border-red-700/30"
        >
          Try again!
        </motion.div>
      )}
    </div>
  );
};

export default GameStatus; 