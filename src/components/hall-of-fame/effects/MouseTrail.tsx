'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MouseTrail() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; opacity: number }[]>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  useEffect(() => {
    // Add position to trail and limit trail length
    setTrail(prev => {
      const newTrail = [...prev, { ...mousePosition, opacity: 1 }];
      return newTrail.slice(-20); // Limit to 20 points
    });

    // Reduce opacity of trail points over time
    const fadeInterval = setInterval(() => {
      setTrail(prev => 
        prev.map((point, i) => ({
          ...point,
          opacity: point.opacity > 0 ? point.opacity - 0.05 : 0,
        }))
      );
    }, 50);

    return () => clearInterval(fadeInterval);
  }, [mousePosition]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Main cursor */}
      <motion.div
        className="w-6 h-6 rounded-full fixed pointer-events-none z-50 flex items-center justify-center"
        style={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          boxShadow: '0 0 10px rgba(6, 182, 212, 0.7), 0 0 20px rgba(6, 182, 212, 0.3)',
        }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
      </motion.div>

      {/* Trail */}
      {trail.map((point, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-cyan-500"
          style={{
            left: point.x,
            top: point.y,
            width: `${8 - index * 0.3}px`,
            height: `${8 - index * 0.3}px`,
            opacity: point.opacity,
            filter: 'blur(1px)',
            transform: 'translate(-50%, -50%)',
            boxShadow: index < 5 ? '0 0 5px rgba(6, 182, 212, 0.5)' : 'none',
          }}
          transition={{ duration: 0.1 }}
        />
      ))}

      {/* Large halo that follows with delay */}
      <motion.div
        className="w-24 h-24 rounded-full fixed pointer-events-none mix-blend-screen"
        style={{
          backgroundColor: 'rgba(6, 182, 212, 0.02)',
          boxShadow: 'inset 0 0 15px rgba(6, 182, 212, 0.2), 0 0 30px rgba(6, 182, 212, 0.1)',
          x: mousePosition.x - 48,
          y: mousePosition.y - 48,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 100 }}
      />
    </div>
  );
} 