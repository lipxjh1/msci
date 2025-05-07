'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loader() {
  const [loadingText, setLoadingText] = useState('Đang khởi tạo');
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 100);
    
    // Update loading text
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        if (prev === 'Đang khởi tạo...') return 'Đang khởi tạo';
        if (prev === 'Đang khởi tạo..') return 'Đang khởi tạo...';
        if (prev === 'Đang khởi tạo.') return 'Đang khởi tạo..';
        return 'Đang khởi tạo.';
      });
    }, 300);
    
    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-5xl sm:text-7xl font-cyber bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-widest">
          M-SCI
        </h1>
      </motion.div>
      
      {/* HALL OF FAME text */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-16 text-center"
      >
        <p className="text-xl text-cyan-300 font-medium tracking-wider mb-1">HALL OF FAME</p>
        <p className="text-sm text-gray-400">Đại Sảnh Danh Vọng</p>
      </motion.div>
      
      {/* Loading bar */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '80%' }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md h-[2px] bg-gray-800 relative mb-6 overflow-hidden rounded-full"
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500"
          style={{
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.7), 0 0 20px rgba(6, 182, 212, 0.5)'
          }}
        />
      </motion.div>
      
      {/* Loading text and percentage */}
      <div className="flex items-center justify-between w-full max-w-md px-2">
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-sm text-gray-400"
        >
          {loadingText}
        </motion.p>
        <p className="text-sm text-cyan-300 font-mono">
          {progress}%
        </p>
      </div>
      
      {/* Subtle particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-cyan-500 rounded-full opacity-50 w-1 h-1"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
              delay: Math.random() * 2,
            }}
            style={{
              filter: 'blur(1px)',
              boxShadow: '0 0 5px rgba(6, 182, 212, 0.7), 0 0 10px rgba(6, 182, 212, 0.3)'
            }}
          />
        ))}
      </div>
    </div>
  );
} 