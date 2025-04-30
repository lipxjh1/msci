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
  // Luôn khởi tạo state với initialTime
  const [time, setTime] = useState(initialTime);
  const [progress, setProgress] = useState(100);
  
  // Dùng để theo dõi sự thay đổi của isRunning
  const prevRunningRef = useRef(isRunning);
  
  // Reset khi component được tạo mới hoặc initialTime thay đổi
  useEffect(() => {
    console.log('Timer reset to:', initialTime);
    setTime(initialTime);
    setProgress(100);
    
    // Thông báo cho component cha về thời gian ban đầu
    setTimeout(() => {
      onTimeUpdate(initialTime);
    }, 0);
  }, [initialTime]);
  
  // Khi isRunning chuyển từ false sang true, reset lại thời gian nếu cần
  useEffect(() => {
    // Nếu trạng thái chuyển từ dừng sang chạy và time = 0
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

  // Hiệu ứng đếm ngược
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime - 1;
          // Cập nhật tiến trình
          setProgress((newTime / initialTime) * 100);
          
          // Thông báo cho component cha về thời gian mới
          // Sử dụng setTimeout để tránh cập nhật state trong quá trình render
          setTimeout(() => {
            onTimeUpdate(newTime);
          }, 0);
          
          return newTime;
        });
      }, 1000);
    } else if (time === 0 && isRunning) {
      onTimeUp();
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, time, initialTime, onTimeUp, onTimeUpdate]);

  // Định dạng thời gian (phút:giây)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Tính toán màu sắc dựa trên thời gian còn lại
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
            Thời gian: {formatTime(time)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Timer; 