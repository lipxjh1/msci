'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TimerProps {
  initialTime: number;
  isRunning: boolean;
  onTimeUp: () => void;
  onTimeUpdate: (newTime: number) => void;
}

const Timer: React.FC<TimerProps> = ({
  initialTime,
  isRunning,
  onTimeUp,
  onTimeUpdate
}) => {
  // Always initialize state with initialTime
  const [time, setTime] = useState(initialTime);
  const [progress, setProgress] = useState(100);
  
  // Used to track changes in isRunning
  const prevRunningRef = useRef(isRunning);
  
  // Reset when component is newly created or initialTime changes
  useEffect(() => {
    console.log('Timer reset to:', initialTime);
    setTime(initialTime);
    setProgress(100);
    
    // Notify parent component about initial time
    setTimeout(() => {
      onTimeUpdate(initialTime);
    }, 0);
  }, [initialTime]);
  
  // When isRunning changes from false to true, reset time if needed
  useEffect(() => {
    // If status changes from paused to running and time = 0
    if (isRunning && !prevRunningRef.current && time === 0) {
      console.log('Restarting timer from zero');
      setTime(initialTime);
      setProgress(100);
      
      setTimeout(() => {
        onTimeUpdate(initialTime);
      }, 0);
    }
    
    prevRunningRef.current = isRunning;
  }, [isRunning, time, initialTime, onTimeUpdate]);

  // Countdown effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime - 1;
          // Update progress
          setProgress((newTime / initialTime) * 100);
          
          // Notify parent component about new time
          // Use setTimeout to avoid updating state during render
          setTimeout(() => {
            onTimeUpdate(newTime);
          }, 0);
          
          // If time reaches zero, call onTimeUp
          if (newTime === 0) {
            setTimeout(() => {
              onTimeUp();
            }, 0);
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, time, initialTime, onTimeUp, onTimeUpdate]);

  // Format time (minutes:seconds)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate color based on remaining time
  const getColorClass = () => {
    if (progress > 60) return 'from-green-400 to-green-500';
    if (progress > 30) return 'from-yellow-400 to-yellow-500';
    return 'from-red-400 to-red-500';
  };

  return (
    <div className="text-center">
      <div className="relative w-48 md:w-64 h-6 md:h-8 bg-gray-200 rounded-full shadow-inner overflow-hidden">
        <div 
          className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${getColorClass()} transition-all duration-1000 ease-linear`}
          style={{ width: `${progress}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs md:text-sm font-bold text-gray-800">
            Time: {formatTime(time)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Timer; 