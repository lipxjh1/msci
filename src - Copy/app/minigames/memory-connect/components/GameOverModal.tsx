"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameOverModalProps } from '../types';

const GameOverModal = ({ 
  isOpen, 
  onClose, 
  onRestart, 
  score, 
  isSuccess,
  difficulty,
  currentLevel,
  highScore,
  onNextLevel
}: GameOverModalProps) => {
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-gray-900/90 border border-white/10 rounded-xl w-full max-w-md relative z-10 overflow-hidden"
          >
            {/* Top decoration */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            
            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isSuccess ? 'Mission Complete!' : 'Mission Failed!'}
                </h2>
                <p className="text-white/60">
                  {isSuccess 
                    ? 'You successfully connected all the symbols and completed the level.' 
                    : 'Time\'s up! You didn\'t connect all the symbols in time.'}
                </p>
              </div>
              
              {/* Score */}
              <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <p className="text-white/60 mb-1">Your Score</p>
                  <p className="text-3xl font-bold text-white">{score}</p>
                  {highScore > 0 && (
                    <p className="text-sm text-yellow-400 mt-1">Best: {highScore}</p>
                  )}
                </div>
              </div>
              
              {/* Level info */}
              <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <p className="text-white/60 mb-1">Level</p>
                  <p className="text-2xl font-bold text-white">{currentLevel} <span className="text-sm text-white/40">/ 100</span></p>
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex gap-3">
                {isSuccess && currentLevel < 100 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNextLevel}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
                  >
                    Next Level
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onRestart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
                >
                  Play Again
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-md font-medium transition-colors"
                >
                  Exit
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GameOverModal; 