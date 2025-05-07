'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 20);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const hexagonVariants = {
    initial: {
      rotate: 0,
      scale: 1
    },
    animate: {
      rotate: 360,
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  const dotVariants = {
    initial: {
      y: 0,
      opacity: 0.3
    },
    animate: (i: number) => ({
      y: [-5, 5, -5],
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <motion.div
        className="w-24 h-24 mb-8 text-center relative"
        animate={{
          scale: [1, 1.1, 1],
          transition: { duration: 1.5, repeat: Infinity }
        }}
      >
        <motion.div 
          className="absolute inset-0 border-4 border-cyan-500 opacity-75"
          style={{ 
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
          }}
          variants={hexagonVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div 
          className="absolute inset-1 border-2 border-blue-300 opacity-75"
          style={{ 
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
          }}
          variants={hexagonVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold">
          M-SCI
        </div>
      </motion.div>
      
      <h2 className="text-2xl text-cyan-400 mb-2 font-bold">LOADING TOURNAMENTS</h2>
      
      <div className="flex mb-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 mx-1 rounded-full bg-blue-500"
            variants={dotVariants}
            initial="initial"
            animate="animate"
            custom={i}
          />
        ))}
      </div>
      
      <div className="w-64 bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400" 
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <p className="text-gray-400 text-sm">Đang kết nối với máy chủ M-SCI</p>
    </div>
  );
};

export default LoadingScreen; 