'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  initialTime: number;  // Thời gian ban đầu tính bằng giây
  isRunning: boolean;   // Trạng thái game đang chạy hay không
  onTimeUp: () => void;  // Callback khi hết thời gian
  onTimeUpdate?: (timeLeft: number) => void;
}

const Timer: React.FC<TimerProps> = ({
  initialTime,
  isRunning,
  onTimeUp,
  onTimeUpdate
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const timeLeftRef = useRef(timeLeft);
  const onTimeUpdateRef = useRef(onTimeUpdate);
  
  // Cập nhật ref khi timeLeft hoặc onTimeUpdate thay đổi
  useEffect(() => {
    timeLeftRef.current = timeLeft;
    onTimeUpdateRef.current = onTimeUpdate;
  }, [timeLeft, onTimeUpdate]);
  
  // Cập nhật lại thời gian khi initialTime thay đổi
  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  // Xử lý đếm ngược
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          // Sử dụng ref để tránh gọi hàm trong quá trình render
          if (onTimeUpdateRef.current) {
            setTimeout(() => {
              onTimeUpdateRef.current?.(newTime);
            }, 0);
          }
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      onTimeUp();
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft, onTimeUp]);

  // Tính toán phần trăm thời gian còn lại
  const percentage = (timeLeft / initialTime) * 100;
  
  // Xác định màu dựa trên thời gian còn lại
  const getColor = () => {
    if (percentage > 60) return 'bg-green-500';
    if (percentage > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full max-w-md py-2 px-4">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Thời gian</span>
          <span className="text-sm font-medium text-gray-700">{formatTime(timeLeft)}</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${getColor()}`}
            initial={{ width: '100%' }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Timer; 