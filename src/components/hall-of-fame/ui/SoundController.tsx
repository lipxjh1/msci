'use client';

import { useEffect, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSound } from '@/context/SoundContext';

export default function SoundController() {
  const { isMuted, toggleMute, playBackgroundMusic, volume, setVolume } = useSound();
  const [showVolume, setShowVolume] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Start background music after a slight delay
    const timer = setTimeout(() => {
      playBackgroundMusic();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [playBackgroundMusic]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2">
      {showVolume && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-cyan-500/30 mb-2"
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            style={{
              // Custom styling for volume slider with neon effect
              background: 'linear-gradient(90deg, rgb(6, 182, 212) 0%, rgb(59, 130, 246) 100%)',
              height: '4px',
              boxShadow: '0 0 5px rgb(6, 182, 212), 0 0 10px rgb(59, 130, 246)'
            }}
          />
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition duration-300 ${
          isMuted ? 'bg-gray-800' : 'bg-cyan-900'
        } border ${isMuted ? 'border-gray-600' : 'border-cyan-500'}`}
        style={{
          boxShadow: isMuted 
            ? 'none' 
            : '0 0 10px rgba(6, 182, 212, 0.7), 0 0 20px rgba(6, 182, 212, 0.3)'
        }}
      >
        {isMuted ? (
          <FaVolumeMute className="text-gray-400" size={18} />
        ) : (
          <FaVolumeUp className="text-cyan-300" size={18} />
        )}
      </motion.button>
    </div>
  );
} 