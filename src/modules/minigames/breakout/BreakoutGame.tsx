"use client";

import React, { useEffect, useRef, useState } from 'react';

const BreakoutGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [message, setMessage] = useState('Click to start');
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameLevel, setGameLevel] = useState(1);
  
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
    let bricks: { x: number, y: number, width: number, height: number, color: string, visible: boolean, glowColor: string }[] = [];
    let currentScore = 0;
    let currentLives = 3;
    let currentLevel = 1;
    
    // Màu sắc Glassmorphism theme
    const COLORS = [
      { fill: 'rgba(144, 85, 255, 0.7)', glow: 'rgba(144, 85, 255, 0.8)' }, // Primary (purple)
      { fill: 'rgba(19, 176, 233, 0.7)', glow: 'rgba(19, 176, 233, 0.8)' }, // Secondary (blue)
      { fill: 'rgba(255, 153, 51, 0.7)', glow: 'rgba(255, 153, 51, 0.8)' }, // Accent (orange)
      { fill: 'rgba(187, 134, 252, 0.7)', glow: 'rgba(187, 134, 252, 0.8)' }, // Light purple
      { fill: 'rgba(3, 218, 198, 0.7)', glow: 'rgba(3, 218, 198, 0.8)' }, // Teal
      { fill: 'rgba(255, 87, 51, 0.7)', glow: 'rgba(255, 87, 51, 0.8)' }, // Red
    ];
    
    // Hàm vẽ hình chữ nhật bo góc - Di chuyển lên trước khi sử dụng
    const roundRect = (
      ctx: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      width: number, 
      height: number, 
      radius: number, 
      fill: boolean = false,
      stroke: boolean = false
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      if (fill) {
        ctx.fill();
      }
      if (stroke) {
        ctx.stroke();
      }
    };
    
    // Vẽ panel kính mờ
    const drawGlassPanel = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
      ctx.save();
      
      // Vẽ background mờ
      ctx.fillStyle = 'rgba(30, 30, 50, 0.3)';
      roundRect(ctx, x, y, width, height, 10, true);
      
      // Vẽ đường viền sáng
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      roundRect(ctx, x, y, width, height, 10, false, true);
      
      // Vẽ hiệu ứng đánh bóng trên cùng
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.moveTo(x + 10, y + 3);
      ctx.lineTo(x + width - 10, y + 3);
      ctx.quadraticCurveTo(x + width - 5, y + 3, x + width - 5, y + 8);
      ctx.quadraticCurveTo(x + width - 5, y + 13, x + width - 10, y + 13);
      ctx.lineTo(x + 10, y + 13);
      ctx.quadraticCurveTo(x + 5, y + 13, x + 5, y + 8);
      ctx.quadraticCurveTo(x + 5, y + 3, x + 10, y + 3);
      ctx.fill();
      
      ctx.restore();
    };
    
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
        const colorIndex = r % COLORS.length;
        for (let c = 0; c < cols; c++) {
          bricks.push({
            x: offsetX + c * (brickWidth + padding),
            y: offsetY + r * (brickHeight + padding),
            width: brickWidth,
            height: brickHeight,
            color: COLORS[colorIndex].fill,
            glowColor: COLORS[colorIndex].glow,
            visible: true
          });
        }
      }
      
      setGameLevel(currentLevel);
    };
    
    // Vẽ tất cả đối tượng game
    const drawGame = () => {
      // Xóa canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Vẽ background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f0723');
      gradient.addColorStop(1, '#1a1033');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Vẽ grid lines - hiệu ứng không gian ảo
      ctx.strokeStyle = 'rgba(144, 85, 255, 0.1)';
      ctx.lineWidth = 1;
      
      // Vẽ các đường dọc
      for (let x = 0; x <= canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Vẽ các đường ngang
      for (let y = 0; y <= canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vẽ paddle với hiệu ứng glow
      ctx.save();
      // Glow effect
      ctx.shadowColor = 'rgba(19, 176, 233, 0.8)';
      ctx.shadowBlur = 15;
      
      // Paddle gradient
      const paddleGradient = ctx.createLinearGradient(paddleX - 50, canvas.height - 30, paddleX + 50, canvas.height - 15);
      paddleGradient.addColorStop(0, '#9055FF');
      paddleGradient.addColorStop(1, '#13B0E9');
      ctx.fillStyle = paddleGradient;
      
      // Paddle rounded rectangle
      roundRect(ctx, paddleX - 50, canvas.height - 30, 100, 15, 5, true);
      ctx.restore();
      
      // Vẽ bóng với hiệu ứng glow
      ctx.save();
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 10;
      
      // Ball gradient
      const ballGradient = ctx.createRadialGradient(ballX, ballY, 0, ballX, ballY, 10);
      ballGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      ballGradient.addColorStop(1, 'rgba(19, 176, 233, 0.7)');
      
      ctx.beginPath();
      ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
      ctx.fillStyle = ballGradient;
      ctx.fill();
      ctx.restore();
      
      // Vẽ gạch với hiệu ứng glow
      bricks.forEach(brick => {
        if (brick.visible) {
          ctx.save();
          ctx.shadowColor = brick.glowColor;
          ctx.shadowBlur = 10;
          ctx.fillStyle = brick.color;
          
          // Brick rounded rectangle
          roundRect(ctx, brick.x, brick.y, brick.width, brick.height, 5, true);
          
          // Hiệu ứng kính mờ
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.fillRect(brick.x + 5, brick.y + 2, brick.width - 15, 3);
          ctx.restore();
        }
      });
      
      // Vẽ panel điểm và thông tin với hiệu ứng glassmorphism
      drawGlassPanel(ctx, 15, 15, 200, 40);
      
      // Vẽ điểm
      ctx.font = 'bold 20px Arial';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${currentScore}`, 30, 42);
      
      // Vẽ panel mạng bên phải
      drawGlassPanel(ctx, canvas.width - 215, 15, 200, 40);
      
      // Vẽ mạng
      ctx.font = 'bold 20px Arial';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'right';
      ctx.fillText(`Lives: ${currentLives}`, canvas.width - 30, 42);
      
      // Vẽ level hiện tại ở giữa
      drawGlassPanel(ctx, canvas.width/2 - 70, 15, 140, 40);
      ctx.font = 'bold 20px Arial';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText(`Level: ${currentLevel}`, canvas.width/2, 42);
      
      // Vẽ thông báo
      if (!gameRunning) {
        // Vẽ một panel kính mờ cho thông báo
        drawGlassPanel(ctx, canvas.width/2 - 150, canvas.height/2 - 50, 300, 100);
        
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(message, canvas.width / 2, canvas.height / 2);
        
        // Thêm hướng dẫn nhỏ bên dưới
        ctx.font = '16px Arial';
        ctx.fillText('Use mouse to control the paddle', canvas.width / 2, canvas.height / 2 + 30);
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
        
        // Thêm hiệu ứng âm thanh bằng cách thay đổi màu nền
        canvas.style.backgroundColor = 'rgba(144, 85, 255, 0.1)';
        setTimeout(() => {
          canvas.style.backgroundColor = 'transparent';
        }, 50);
      }
      
      // Kiểm tra va chạm với trần
      if (ballY <= 10) {
        ballSpeedY = -ballSpeedY;
        
        // Thêm hiệu ứng âm thanh bằng cách thay đổi màu nền
        canvas.style.backgroundColor = 'rgba(19, 176, 233, 0.1)';
        setTimeout(() => {
          canvas.style.backgroundColor = 'transparent';
        }, 50);
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
        
        // Thêm hiệu ứng âm thanh bằng cách thay đổi màu nền
        canvas.style.backgroundColor = 'rgba(255, 153, 51, 0.1)';
        setTimeout(() => {
          canvas.style.backgroundColor = 'transparent';
        }, 50);
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
          
          // Thêm hiệu ứng âm thanh bằng cách thay đổi màu nền
          canvas.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          setTimeout(() => {
            canvas.style.backgroundColor = 'transparent';
          }, 50);
          
          // Kiểm tra đã phá hết gạch chưa
          if (bricks.every(b => !b.visible)) {
            // Tăng level
            currentLevel++;
            setGameLevel(currentLevel);
            
            // Level mới
            initBricks();
            resetBall();
            setMessage(`Level ${currentLevel - 1} Completed! Click to continue`);
            gameRunning = false;
            setIsGameActive(false);
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
          setMessage(`Game Over! Final Score: ${currentScore} - Click to restart`);
          gameRunning = false;
          setIsGameActive(false);
          currentScore = 0;
          currentLives = 3;
          currentLevel = 1;
          setScore(0);
          setLives(3);
          setGameLevel(1);
          initBricks();
        } else {
          // Mất một mạng
          resetBall();
          setMessage(`Ball lost! Lives left: ${currentLives} - Click to continue`);
          gameRunning = false;
          setIsGameActive(false);
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
        setIsGameActive(true);
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
    drawGame();
    gameLoop();
    
    // Thêm event listener
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    
    // Cleanup
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 flex justify-between items-center w-full max-w-[800px]">
        <div className="bg-glass rounded-lg p-3 px-5 shadow-neon-primary">
          <span className="text-white">SCORE: <span className="text-primary font-bold">{score}</span></span>
        </div>
        <div className="bg-glass rounded-lg p-3 px-5 shadow-neon-primary">
          <span className="text-white">LEVEL: <span className="text-secondary font-bold">{gameLevel}</span></span>
        </div>
        <div className="bg-glass rounded-lg p-3 px-5 shadow-neon-primary">
          <span className="text-white">LIVES: <span className="text-accent font-bold">{lives}</span></span>
        </div>
      </div>
      
      <div className="relative">
        <canvas 
          ref={canvasRef} 
          className="rounded-lg shadow-neon-primary-lg border border-[rgba(255,255,255,0.1)]"
          style={{ background: "linear-gradient(135deg, #0f0723 0%, #1a1033 100%)" }}
        />
        
        {!isGameActive && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="bg-glass px-10 py-5 rounded-xl shadow-neon-primary">
              <h2 className="text-white text-xl mb-2 text-shadow-neon">{message}</h2>
              <p className="text-gray-300 text-sm mb-2">Use your mouse to control the paddle</p>
              <p className="text-primary text-xs">Click anywhere to {lives === 3 && score === 0 ? 'start' : 'continue'}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex justify-center">
        <div className="bg-glass rounded-lg p-4 shadow-neon-primary text-center max-w-[800px]">
          <p className="text-gray-300 text-sm">
            Break all the bricks to advance to the next level. Don't let the ball fall!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreakoutGame; 