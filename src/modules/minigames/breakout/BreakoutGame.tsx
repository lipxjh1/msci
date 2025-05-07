"use client";

import React, { useEffect, useRef, useState } from 'react';

const BreakoutGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [message, setMessage] = useState('Click to start');
  
  useEffect(() => {
    // Đảm bảo chỉ chạy ở phía client
    if (typeof window === 'undefined') return;
    
    // Đảm bảo có canvas để vẽ
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Kích thước canvas
    canvas.width = 800;
    canvas.height = 600;
    
    // Game variables
    let animationId: number;
    let paddleX = canvas.width / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height - 60;
    let ballSpeedX = 0;
    let ballSpeedY = 0;
    let gameRunning = false;
    let bricks: { x: number, y: number, width: number, height: number, color: string, visible: boolean }[] = [];
    let currentScore = 0;
    let currentLives = 3;
    
    // Màu sắc để dùng cho gạch
    const COLORS = ['#FF0000', '#FF8800', '#FFFF00', '#00FF00', '#00FFFF', '#0088FF'];
    
    // Khởi tạo các viên gạch
    const initBricks = () => {
      bricks = [];
      const rows = 5;
      const cols = 10;
      const brickWidth = 70;
      const brickHeight = 25;
      const padding = 10;
      const offsetX = 55;
      const offsetY = 60;
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          bricks.push({
            x: offsetX + c * (brickWidth + padding),
            y: offsetY + r * (brickHeight + padding),
            width: brickWidth,
            height: brickHeight,
            color: COLORS[r % COLORS.length],
            visible: true
          });
        }
      }
    };
    
    // Vẽ tất cả đối tượng game
    const drawGame = () => {
      // Xóa canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Vẽ background
      ctx.fillStyle = '#000022';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Vẽ paddle
      ctx.fillStyle = '#0088FF';
      ctx.fillRect(paddleX - 50, canvas.height - 30, 100, 15);
      
      // Vẽ bóng
      ctx.beginPath();
      ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      
      // Vẽ gạch
      bricks.forEach(brick => {
        if (brick.visible) {
          ctx.fillStyle = brick.color;
          ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
          
          // Viền cho gạch
          ctx.strokeStyle = '#FFFFFF';
          ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
        }
      });
      
      // Vẽ điểm và mạng
      ctx.font = '20px Arial';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${currentScore}`, 20, 30);
      ctx.textAlign = 'right';
      ctx.fillText(`Lives: ${currentLives}`, canvas.width - 20, 30);
      
      // Vẽ thông báo
      if (!gameRunning) {
        ctx.font = '24px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.fillText(message, canvas.width / 2, canvas.height / 2);
      }
    };
    
    // Cập nhật vị trí các đối tượng
    const updateGame = () => {
      if (!gameRunning) return;
      
      // Di chuyển bóng
      ballX += ballSpeedX;
      ballY += ballSpeedY;
      
      // Kiểm tra va chạm với tường
      if (ballX <= 10 || ballX >= canvas.width - 10) {
        ballSpeedX = -ballSpeedX;
      }
      
      // Kiểm tra va chạm với trần
      if (ballY <= 10) {
        ballSpeedY = -ballSpeedY;
      }
      
      // Kiểm tra va chạm với paddle
      if (
        ballY >= canvas.height - 40 && 
        ballY <= canvas.height - 20 &&
        ballX >= paddleX - 50 && 
        ballX <= paddleX + 50
      ) {
        // Đổi hướng bóng
        ballSpeedY = -Math.abs(ballSpeedY);
        
        // Thay đổi góc phản xạ dựa vào vị trí va chạm
        const hitPosition = ballX - paddleX;
        ballSpeedX = hitPosition * 0.2;
      }
      
      // Kiểm tra va chạm với gạch
      for (let i = 0; i < bricks.length; i++) {
        const brick = bricks[i];
        
        if (brick.visible && 
            ballX >= brick.x - 10 && 
            ballX <= brick.x + brick.width + 10 &&
            ballY >= brick.y - 10 && 
            ballY <= brick.y + brick.height + 10) {
          
          // Gạch biến mất
          brick.visible = false;
          
          // Đổi hướng bóng
          ballSpeedY = -ballSpeedY;
          
          // Cộng điểm
          currentScore += 10;
          setScore(currentScore);
          
          // Kiểm tra đã phá hết gạch chưa
          if (bricks.every(b => !b.visible)) {
            // Level mới
            initBricks();
            resetBall();
            setMessage('Level Completed! Click to continue');
            gameRunning = false;
          }
          
          break;
        }
      }
      
      // Kiểm tra nếu bóng rơi khỏi màn hình
      if (ballY >= canvas.height) {
        currentLives--;
        setLives(currentLives);
        
        if (currentLives <= 0) {
          // Game over
          setMessage('Game Over! Click to restart');
          gameRunning = false;
          currentScore = 0;
          currentLives = 3;
          setScore(0);
          setLives(3);
          initBricks();
        } else {
          // Mất một mạng
          resetBall();
          setMessage('Ball lost! Click to continue');
          gameRunning = false;
        }
      }
    };
    
    // Reset bóng về vị trí ban đầu
    const resetBall = () => {
      ballX = paddleX;
      ballY = canvas.height - 60;
      ballSpeedX = 0;
      ballSpeedY = 0;
    };
    
    // Game loop
    const gameLoop = () => {
      updateGame();
      drawGame();
      animationId = requestAnimationFrame(gameLoop);
    };
    
    // Khởi động game
    const startGame = () => {
      if (!gameRunning) {
        gameRunning = true;
        ballSpeedY = -5;
        ballSpeedX = (Math.random() - 0.5) * 6;
      }
    };
    
    // Xử lý sự kiện di chuyển chuột
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      
      // Đảm bảo paddle không vượt ra ngoài màn hình
      if (x > 50 && x < canvas.width - 50) {
        paddleX = x;
        
        // Nếu game chưa chạy, di chuyển bóng theo paddle
        if (!gameRunning) {
          ballX = x;
        }
      }
    };
    
    // Xử lý sự kiện click chuột
    const handleClick = () => {
      if (!gameRunning) {
        startGame();
      }
    };
    
    // Khởi tạo game
    initBricks();
    resetBall();
    
    // Bắt đầu game loop
    gameLoop();
    
    // Đăng ký sự kiện
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    
    // Cleanup khi unmount
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);
  
  return (
    <div className="flex flex-col items-center">
      <canvas 
        ref={canvasRef} 
        className="rounded-lg shadow-xl border-4 border-indigo-900"
        width="800"
        height="600"
        style={{ maxWidth: '100%' }}
      />
      
      <div className="mt-6 bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-2xl">
        <h3 className="text-xl font-bold text-white mb-3 border-b border-indigo-600/30 pb-2">
          Hướng dẫn chơi
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Di chuyển chuột để điều khiển thanh trượt</li>
          <li>Nhấp chuột để phóng bóng và bắt đầu chơi</li>
          <li>Phá hết các viên gạch để hoàn thành level</li>
          <li>Bạn có {lives} mạng</li>
          <li>Điểm hiện tại: {score}</li>
        </ul>
      </div>
    </div>
  );
};

export default BreakoutGame; 