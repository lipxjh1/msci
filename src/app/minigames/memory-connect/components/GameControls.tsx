"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaRedo, FaChevronDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Difficulty, LEVELS } from '../constants';
import { GameControlsProps } from '../types';

const GameControls = ({ 
  difficulty, 
  onDifficultyChange, 
  onReset, 
  onStart, 
  gameStatus,
  onPause,
  onResume,
  currentLevel,
  onLevelChange
}: GameControlsProps) => {
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile device
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // List of difficulties
  const difficulties = Object.values(Difficulty);
  
  // Pagination for level selector
  const itemsPerPage = isMobile ? 20 : 40;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(LEVELS.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, LEVELS.length);
  const visibleLevels = LEVELS.slice(startIndex, endIndex);
  
  return (
    <div className="w-full bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Difficulty and level selectors */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Difficulty selection */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="text-gray-400 text-sm font-medium">Difficulty:</span>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((level) => (
                <motion.button
                  key={level}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onDifficultyChange(level as Difficulty)}
                  disabled={gameStatus === 'playing' || gameStatus === 'paused'}
                  className={`
                    py-1.5 px-3 text-xs rounded-md transition-all
                    ${difficulty === level 
                      ? 'bg-indigo-500 text-white font-medium shadow-md shadow-indigo-500/30' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                    ${(gameStatus === 'playing' || gameStatus === 'paused') && 'opacity-50 cursor-not-allowed'}
                  `}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Level selector */}
          <div className="relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="text-gray-400 text-sm font-medium">Level:</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLevelSelector(!showLevelSelector)}
                disabled={gameStatus === 'playing' || gameStatus === 'paused'}
                className={`
                  py-1.5 px-3 text-xs rounded-md transition-all flex items-center gap-2
                  bg-indigo-500 text-white font-medium shadow-md shadow-indigo-500/30
                  ${(gameStatus === 'playing' || gameStatus === 'paused') && 'opacity-50 cursor-not-allowed'}
                `}
              >
                {currentLevel} <FaChevronDown className="text-xs" />
              </motion.button>
            </div>
            
            {/* Level dropdown */}
            {showLevelSelector && (
              <div className="absolute z-20 mt-2 w-[280px] max-h-[300px] overflow-y-auto bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
                <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-2 flex justify-between items-center">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`p-1 rounded ${currentPage === 1 ? 'text-gray-600' : 'text-gray-300 hover:bg-gray-800'}`}
                  >
                    <FaArrowLeft size={14} />
                  </button>
                  <span className="text-xs text-gray-400">
                    Page {currentPage}/{totalPages}
                  </span>
                  <button 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-1 rounded ${currentPage === totalPages ? 'text-gray-600' : 'text-gray-300 hover:bg-gray-800'}`}
                  >
                    <FaArrowRight size={14} />
                  </button>
                </div>
                <div className="p-2 grid grid-cols-5 gap-1">
                  {visibleLevels.map((level) => (
                    <motion.button
                      key={level.level}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        onLevelChange(level.level);
                        setShowLevelSelector(false);
                      }}
                      className={`
                        p-1.5 text-xs rounded transition-all
                        ${currentLevel === level.level 
                          ? 'bg-indigo-500 text-white font-medium shadow-sm shadow-indigo-500/30' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                      `}
                    >
                      {level.level}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Game controls */}
        <div className="flex items-center gap-2">
          {gameStatus === 'waiting' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 px-5 rounded-md font-medium transition-all shadow-md shadow-green-500/30 flex items-center gap-2"
            >
              <FaPlay className="text-sm" />
              <span>Start</span>
            </motion.button>
          )}
          
          {gameStatus === 'playing' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPause}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white py-2 px-5 rounded-md font-medium transition-all shadow-md shadow-yellow-500/30 flex items-center gap-2"
            >
              <FaPause className="text-sm" />
              <span>Pause</span>
            </motion.button>
          )}
          
          {gameStatus === 'paused' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onResume}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 px-5 rounded-md font-medium transition-all shadow-md shadow-green-500/30 flex items-center gap-2"
            >
              <FaPlay className="text-sm" />
              <span>Resume</span>
            </motion.button>
          )}
          
          {(gameStatus === 'playing' || gameStatus === 'paused' || gameStatus === 'completed' || gameStatus === 'failed') && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-2 px-5 rounded-md font-medium transition-all shadow-md shadow-gray-600/30 flex items-center gap-2"
            >
              <FaRedo className="text-sm" />
              <span>Restart</span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameControls; 