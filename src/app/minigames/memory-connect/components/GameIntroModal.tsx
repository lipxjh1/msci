"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GameIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

const GameIntroModal = ({ isOpen, onClose, onStart }: GameIntroModalProps) => {
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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-gray-900/90 border border-white/10 rounded-xl w-full max-w-2xl relative z-10 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Top decoration */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            
            {/* Modal header */}
            <div className="p-6 border-b border-white/5">
              <h2 className="text-2xl font-bold text-white">M-SCI: Memory Connect Challenge</h2>
              <p className="text-white/60 mt-1">Memory connection challenge in the M-SCI universe</p>
            </div>
            
            {/* Modal content */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="bg-black/30 rounded-lg p-4 mb-4">
                    <h3 className="text-white font-bold mb-2">Story</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      In the M-SCI world of 2049, your special forces team has discovered a mysterious coding system designed by X-Corp. It's a memory challenge that connects matching data fragments, designed to train robot units and drones.
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed mt-2">
                      Your mission is to master this challenge and demonstrate your cognitive abilities in the M-SCI universe.
                    </p>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-4">
                    <h3 className="text-white font-bold mb-2">How to Play</h3>
                    <ul className="text-white/80 text-sm leading-relaxed space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Connect matching symbol pairs using straight lines (up to 3 segments)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>When successfully connected, both symbols disappear</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Your goal is to clear all symbols before time runs out</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Each level gets progressively harder with more symbols and less time</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <div className="relative mb-4 rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src="/images/minigam/7.png"
                      alt="Memory Connect Challenge"
                      width={600}
                      height={300}
                      className="w-full h-[180px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-medium">Memory Connect Challenge</p>
                      <p className="text-white/60 text-sm">Training Center - M-SCI</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-4">
                    <h3 className="text-white font-bold mb-2">Game Features</h3>
                    <ul className="text-white/80 text-sm leading-relaxed space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>100 progressively challenging levels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Four difficulty modes: Easy, Medium, Hard, and Expert</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Track your high scores for each level</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Optimized for both desktop and mobile gameplay</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal footer */}
            <div className="p-6 border-t border-white/5 flex justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
              >
                Close
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onStart();
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2"
              >
                <span className="material-icons text-sm">play_arrow</span>
                Start Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GameIntroModal; 