'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// Chiều cao và chiều rộng của canvas
const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 480;

// Các thuộc tính của con chim
const BIRD_WIDTH = 34;
const BIRD_HEIGHT = 24;
const BIRD_INITIAL_X = 50;
const BIRD_INITIAL_Y = 150;
const GRAVITY = 0.5;
const JUMP_FORCE = -8;

// Các thuộc tính của ống
const PIPE_WIDTH = 52;
const PIPE_GAP = 120;
const PIPE_SPEED = 2;
const PIPE_SPAWN_RATE = 1500; // ms

// Game states
const GAME_STATES = {
  WAITING: 'waiting',
  PLAYING: 'playing',
  GAME_OVER: 'game_over',
};

const FlappyBirdGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<{
    bird: {
      x: number;
      y: number;
      velocity: number;
      rotation: number;
    };
    pipes: Array<{
      x: number;
      topHeight: number;
      passed: boolean;
    }>;
    score: number;
    highScore: number;
    background: {
      x: number;
    };
    ground: {
      y: number;
      height: number;
    };
    frameId: number | null;
    lastPipeTime: number;
  }>({
    bird: {
      x: BIRD_INITIAL_X,
      y: BIRD_INITIAL_Y,
      velocity: 0,
      rotation: 0,
    },
    pipes: [],
    score: 0,
    highScore: 0,
    background: {
      x: 0,
    },
    ground: {
      y: CANVAS_HEIGHT - 80,
      height: 80,
    },
    frameId: null,
    lastPipeTime: 0,
  });
  
  const [gameState, setGameState] = useState(GAME_STATES.WAITING);
  const router = useRouter();

  // Load images
  const [images, setImages] = useState<{
    bird: HTMLImageElement | null;
    background: HTMLImageElement | null;
    ground: HTMLImageElement | null;
    pipeTop: HTMLImageElement | null;
    pipeBottom: HTMLImageElement | null;
  }>({
    bird: null,
    background: null,
    ground: null,
    pipeTop: null,
    pipeBottom: null,
  });

  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  // Debug: Thêm state để theo dõi trạng thái
  const [debugInfo, setDebugInfo] = useState({
    imagesLoaded: false,
    gameStateChanged: false,
  });

  // Thêm trạng thái lưu vị trí của nút play
  const playButtonRef = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  
  const gameOverButtonRef = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // useEffect theo dõi thay đổi gameState
  useEffect(() => {
    console.log("Game state changed to:", gameState);
    setDebugInfo(prev => ({...prev, gameStateChanged: true}));
    
    // Đảm bảo reset game khi chuyển sang trạng thái chơi
    if (gameState === GAME_STATES.PLAYING) {
      if (gameRef.current.pipes.length === 0) {
        resetGame();
      }
    }
  }, [gameState]);

  useEffect(() => {
    // Tạo tất cả các ảnh mặc định ngay từ đầu
    const createDefaultImages = () => {
      // Tạo bird image mặc định
      const birdCanvas = document.createElement('canvas');
      birdCanvas.width = BIRD_WIDTH;
      birdCanvas.height = BIRD_HEIGHT;
      const birdCtx = birdCanvas.getContext('2d');
      if (birdCtx) {
        birdCtx.fillStyle = '#FFD700'; // vàng
        birdCtx.beginPath();
        birdCtx.arc(BIRD_WIDTH / 2, BIRD_HEIGHT / 2, BIRD_WIDTH / 2, 0, Math.PI * 2);
        birdCtx.fill();
        birdCtx.fillStyle = '#000000'; // đen
        birdCtx.beginPath();
        birdCtx.arc(BIRD_WIDTH / 2 + 5, BIRD_HEIGHT / 2 - 2, 3, 0, Math.PI * 2);
        birdCtx.fill();
      }
      
      // Tạo background image mặc định
      const bgCanvas = document.createElement('canvas');
      bgCanvas.width = CANVAS_WIDTH;
      bgCanvas.height = CANVAS_HEIGHT;
      const bgCtx = bgCanvas.getContext('2d');
      if (bgCtx) {
        const gradient = bgCtx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
        gradient.addColorStop(0, '#4FACFE');
        gradient.addColorStop(1, '#00F2FE');
        bgCtx.fillStyle = gradient;
        bgCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // Thêm một số đám mây đơn giản
        bgCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        bgCtx.beginPath();
        bgCtx.arc(50, 50, 20, 0, Math.PI * 2);
        bgCtx.arc(70, 50, 25, 0, Math.PI * 2);
        bgCtx.arc(90, 50, 15, 0, Math.PI * 2);
        bgCtx.fill();
        
        bgCtx.beginPath();
        bgCtx.arc(220, 80, 20, 0, Math.PI * 2);
        bgCtx.arc(240, 80, 25, 0, Math.PI * 2);
        bgCtx.arc(260, 80, 15, 0, Math.PI * 2);
        bgCtx.fill();
      }
      
      // Tạo ground image mặc định
      const groundCanvas = document.createElement('canvas');
      groundCanvas.width = CANVAS_WIDTH;
      groundCanvas.height = 80;
      const groundCtx = groundCanvas.getContext('2d');
      if (groundCtx) {
        const gradient = groundCtx.createLinearGradient(0, 0, 0, 80);
        gradient.addColorStop(0, '#A97142');
        gradient.addColorStop(1, '#8B4513');
        groundCtx.fillStyle = gradient;
        groundCtx.fillRect(0, 0, CANVAS_WIDTH, 80);
        
        // Vẽ cỏ ở trên mặt đất
        groundCtx.fillStyle = '#7CFC00';
        for (let i = 0; i < CANVAS_WIDTH; i += 10) {
          const height = 5 + Math.random() * 5;
          groundCtx.fillRect(i, 0, 2, height);
        }
      }
      
      // Tạo pipe top image mặc định
      const pipeTopCanvas = document.createElement('canvas');
      pipeTopCanvas.width = PIPE_WIDTH;
      pipeTopCanvas.height = CANVAS_HEIGHT;
      const pipeTopCtx = pipeTopCanvas.getContext('2d');
      if (pipeTopCtx) {
        const gradient = pipeTopCtx.createLinearGradient(0, 0, PIPE_WIDTH, 0);
        gradient.addColorStop(0, '#32CD32');
        gradient.addColorStop(0.5, '#4CBB17');
        gradient.addColorStop(1, '#32CD32');
        pipeTopCtx.fillStyle = gradient;
        pipeTopCtx.fillRect(0, 0, PIPE_WIDTH, CANVAS_HEIGHT);
        
        // Viền ống
        pipeTopCtx.fillStyle = '#228B22';
        pipeTopCtx.fillRect(0, CANVAS_HEIGHT - 30, PIPE_WIDTH, 30);
        pipeTopCtx.fillRect(0, 0, 5, CANVAS_HEIGHT);
        pipeTopCtx.fillRect(PIPE_WIDTH - 5, 0, 5, CANVAS_HEIGHT);
      }
      
      // Tạo pipe bottom image mặc định
      const pipeBottomCanvas = document.createElement('canvas');
      pipeBottomCanvas.width = PIPE_WIDTH;
      pipeBottomCanvas.height = CANVAS_HEIGHT;
      const pipeBottomCtx = pipeBottomCanvas.getContext('2d');
      if (pipeBottomCtx) {
        const gradient = pipeBottomCtx.createLinearGradient(0, 0, PIPE_WIDTH, 0);
        gradient.addColorStop(0, '#32CD32');
        gradient.addColorStop(0.5, '#4CBB17');
        gradient.addColorStop(1, '#32CD32');
        pipeBottomCtx.fillStyle = gradient;
        pipeBottomCtx.fillRect(0, 0, PIPE_WIDTH, CANVAS_HEIGHT);
        
        // Viền ống
        pipeBottomCtx.fillStyle = '#228B22';
        pipeBottomCtx.fillRect(0, 0, PIPE_WIDTH, 30);
        pipeBottomCtx.fillRect(0, 0, 5, CANVAS_HEIGHT);
        pipeBottomCtx.fillRect(PIPE_WIDTH - 5, 0, 5, CANVAS_HEIGHT);
      }
      
      // Tạo các ảnh từ canvas
      const birdImage = new Image();
      birdImage.src = birdCanvas.toDataURL();
      
      const backgroundImage = new Image();
      backgroundImage.src = bgCanvas.toDataURL();
      
      const groundImage = new Image();
      groundImage.src = groundCanvas.toDataURL();
      
      const pipeTopImage = new Image();
      pipeTopImage.src = pipeTopCanvas.toDataURL();
      
      const pipeBottomImage = new Image();
      pipeBottomImage.src = pipeBottomCanvas.toDataURL();
      
      return {
        bird: birdImage,
        background: backgroundImage,
        ground: groundImage,
        pipeTop: pipeTopImage,
        pipeBottom: pipeBottomImage
      };
    };
    
    // Tạo ảnh mặc định trước
    const defaultImages = createDefaultImages();
    
    // Thiết lập trạng thái mặc định với ảnh tạo sẵn
    setImages(defaultImages);
    
    // Đánh dấu là đã tải xong ảnh
    setIsImagesLoaded(true);
    setDebugInfo(prev => ({...prev, imagesLoaded: true}));
    console.log("Default images loaded");
    
    // Sau đó cố gắng tải ảnh thật
    const birdImage = new Image();
    const backgroundImage = new Image();
    const groundImage = new Image();
    const pipeTopImage = new Image();
    const pipeBottomImage = new Image();

    // Random một số từ 1-12 để chọn ảnh con chim
    const randomBirdNumber = Math.floor(Math.random() * 12) + 1;
    
    // Sử dụng ảnh từ thư mục public/images/minigam
    birdImage.onload = () => {
      console.log("Bird image loaded");
      setImages(prev => ({...prev, bird: birdImage}));
    };
    
    backgroundImage.onload = () => {
      console.log("Background image loaded");
      setImages(prev => ({...prev, background: backgroundImage}));
    };
    
    groundImage.onload = () => {
      console.log("Ground image loaded");
      setImages(prev => ({...prev, ground: groundImage}));
    };
    
    pipeTopImage.onload = () => {
      console.log("Pipe top image loaded");
      setImages(prev => ({...prev, pipeTop: pipeTopImage}));
    };
    
    pipeBottomImage.onload = () => {
      console.log("Pipe bottom image loaded");
      setImages(prev => ({...prev, pipeBottom: pipeBottomImage}));
    };
    
    birdImage.src = `/images/minigam/${randomBirdNumber}.png`;
    backgroundImage.src = '/images/background.png';
    groundImage.src = '/images/ground.png';
    pipeTopImage.src = '/images/pipe-top.png';
    pipeBottomImage.src = '/images/pipe-bottom.png';

    return () => {
      if (gameRef.current.frameId !== null) {
        cancelAnimationFrame(gameRef.current.frameId);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        handleAction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState]);

  useEffect(() => {
    if (isImagesLoaded) {
      // Load high score from localStorage
      const savedHighScore = localStorage.getItem('flappyBirdHighScore');
      if (savedHighScore) {
        gameRef.current.highScore = parseInt(savedHighScore, 10);
      }
      
      // Start the game loop
      draw();
      console.log("Game loop started");
    }
  }, [isImagesLoaded]);

  const handleAction = () => {
    console.log("Handle action called, current state:", gameState);
    if (gameState === GAME_STATES.WAITING) {
      setGameState(GAME_STATES.PLAYING);
    } else if (gameState === GAME_STATES.PLAYING) {
      jump();
    } else if (gameState === GAME_STATES.GAME_OVER) {
      resetGame();
      setGameState(GAME_STATES.PLAYING);
    }
  };

  const jump = () => {
    gameRef.current.bird.velocity = JUMP_FORCE;
  };

  const resetGame = () => {
    gameRef.current.bird.y = BIRD_INITIAL_Y;
    gameRef.current.bird.velocity = 0;
    gameRef.current.bird.rotation = 0;
    gameRef.current.pipes = [];
    gameRef.current.score = 0;
    gameRef.current.lastPipeTime = 0;
    console.log("Game reset");
  };

  const spawnPipe = (time: number) => {
    if (time - gameRef.current.lastPipeTime > PIPE_SPAWN_RATE) {
      const minHeight = 50;
      const maxHeight = CANVAS_HEIGHT - PIPE_GAP - minHeight - gameRef.current.ground.height;
      const height = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
      
      gameRef.current.pipes.push({
        x: CANVAS_WIDTH,
        topHeight: height,
        passed: false,
      });
      
      gameRef.current.lastPipeTime = time;
      console.log("Pipe spawned at:", CANVAS_WIDTH, "with height:", height);
      console.log("Total pipes:", gameRef.current.pipes.length);
    }
  };

  const updateBird = () => {
    gameRef.current.bird.velocity += GRAVITY;
    gameRef.current.bird.y += gameRef.current.bird.velocity;
    
    // Update rotation based on velocity
    gameRef.current.bird.rotation = gameRef.current.bird.velocity * 2;
    
    // Limit rotation
    if (gameRef.current.bird.rotation > 90) {
      gameRef.current.bird.rotation = 90;
    }
    if (gameRef.current.bird.rotation < -45) {
      gameRef.current.bird.rotation = -45;
    }
    
    // Check ground collision
    if (gameRef.current.bird.y + BIRD_HEIGHT > gameRef.current.ground.y) {
      gameRef.current.bird.y = gameRef.current.ground.y - BIRD_HEIGHT;
      setGameState(GAME_STATES.GAME_OVER);
    }
    
    // Check ceiling collision
    if (gameRef.current.bird.y < 0) {
      gameRef.current.bird.y = 0;
      gameRef.current.bird.velocity = 0;
    }
  };

  const updatePipes = () => {
    gameRef.current.pipes = gameRef.current.pipes.filter(pipe => {
      pipe.x -= PIPE_SPEED;
      
      // Check if bird passed the pipe
      if (!pipe.passed && pipe.x + PIPE_WIDTH < gameRef.current.bird.x) {
        pipe.passed = true;
        gameRef.current.score++;
        
        // Update high score if needed
        if (gameRef.current.score > gameRef.current.highScore) {
          gameRef.current.highScore = gameRef.current.score;
          localStorage.setItem('flappyBirdHighScore', gameRef.current.highScore.toString());
        }
      }
      
      // Check collision
      if (
        gameRef.current.bird.x + BIRD_WIDTH > pipe.x &&
        gameRef.current.bird.x < pipe.x + PIPE_WIDTH &&
        (
          gameRef.current.bird.y < pipe.topHeight ||
          gameRef.current.bird.y + BIRD_HEIGHT > pipe.topHeight + PIPE_GAP
        )
      ) {
        setGameState(GAME_STATES.GAME_OVER);
      }
      
      // Keep pipe in array if still visible
      return pipe.x + PIPE_WIDTH > 0;
    });
  };

  const updateBackground = () => {
    // Scroll background
    gameRef.current.background.x -= 0.5;
    if (gameRef.current.background.x <= -CANVAS_WIDTH) {
      gameRef.current.background.x = 0;
    }
  };

  const drawBird = (ctx: CanvasRenderingContext2D) => {
    if (!images.bird) return;
    
    ctx.save();
    ctx.translate(
      gameRef.current.bird.x + BIRD_WIDTH / 2,
      gameRef.current.bird.y + BIRD_HEIGHT / 2
    );
    ctx.rotate((gameRef.current.bird.rotation * Math.PI) / 180);
    try {
      ctx.drawImage(
        images.bird as HTMLImageElement,
        -BIRD_WIDTH / 2,
        -BIRD_HEIGHT / 2,
        BIRD_WIDTH,
        BIRD_HEIGHT
      );
    } catch (error) {
      console.error("Error drawing bird:", error);
    }
    ctx.restore();
  };

  const drawPipes = (ctx: CanvasRenderingContext2D) => {
    if (!images.pipeTop || !images.pipeBottom) return;
    
    gameRef.current.pipes.forEach(pipe => {
      // Top pipe
      ctx.drawImage(
        images.pipeTop as HTMLImageElement,
        pipe.x,
        pipe.topHeight - CANVAS_HEIGHT,
        PIPE_WIDTH,
        CANVAS_HEIGHT
      );
      
      // Bottom pipe
      ctx.drawImage(
        images.pipeBottom as HTMLImageElement,
        pipe.x,
        pipe.topHeight + PIPE_GAP,
        PIPE_WIDTH,
        CANVAS_HEIGHT
      );
    });
  };

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    if (!images.background) return;
    
    // Draw background twice for scrolling effect
    ctx.drawImage(
      images.background as HTMLImageElement,
      gameRef.current.background.x,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
    ctx.drawImage(
      images.background as HTMLImageElement,
      gameRef.current.background.x + CANVAS_WIDTH,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
  };

  const drawGround = (ctx: CanvasRenderingContext2D) => {
    if (!images.ground) return;
    
    ctx.drawImage(
      images.ground as HTMLImageElement,
      gameRef.current.background.x % 20,
      gameRef.current.ground.y,
      CANVAS_WIDTH,
      gameRef.current.ground.height
    );
    ctx.drawImage(
      images.ground as HTMLImageElement,
      (gameRef.current.background.x % 20) + CANVAS_WIDTH,
      gameRef.current.ground.y,
      CANVAS_WIDTH,
      gameRef.current.ground.height
    );
  };

  const drawScore = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.font = '35px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(gameRef.current.score.toString(), CANVAS_WIDTH / 2, 50);
    ctx.strokeText(gameRef.current.score.toString(), CANVAS_WIDTH / 2, 50);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    console.log("Canvas clicked");
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Lấy vị trí click tương đối với canvas
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    console.log("Click position:", x, y);
    console.log("Button position:", playButtonRef.current);
    
    if (gameState === GAME_STATES.WAITING) {
      // Kiểm tra xem click có trong vùng nút chơi ngay không
      if (
        x >= playButtonRef.current.x &&
        x <= playButtonRef.current.x + playButtonRef.current.width &&
        y >= playButtonRef.current.y &&
        y <= playButtonRef.current.y + playButtonRef.current.height
      ) {
        console.log("Play button clicked");
        setGameState(GAME_STATES.PLAYING);
      } else {
        // Thêm trường hợp này để dễ chơi hơn
        console.log("Canvas clicked but not on button, starting game anyway");
        setGameState(GAME_STATES.PLAYING);
      }
    } else if (gameState === GAME_STATES.PLAYING) {
      jump();
    } else if (gameState === GAME_STATES.GAME_OVER) {
      // Kiểm tra xem click có trong vùng nút chơi lại không
      if (
        x >= gameOverButtonRef.current.x &&
        x <= gameOverButtonRef.current.x + gameOverButtonRef.current.width &&
        y >= gameOverButtonRef.current.y &&
        y <= gameOverButtonRef.current.y + gameOverButtonRef.current.height
      ) {
        console.log("Play again button clicked");
        resetGame();
        setGameState(GAME_STATES.PLAYING);
      } else {
        // Thêm trường hợp này để dễ chơi hơn
        console.log("Canvas clicked but not on button, restarting game anyway");
        resetGame();
        setGameState(GAME_STATES.PLAYING);
      }
    }
  };

  const drawUI = (ctx: CanvasRenderingContext2D) => {
    if (gameState === GAME_STATES.WAITING) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      // Logo Flappy Bird
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Flappy Bird', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 70);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeText('Flappy Bird', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 70);
      
      // Button play
      ctx.fillStyle = '#4CAF50';
      const buttonWidth = 140;
      const buttonHeight = 50;
      const buttonX = CANVAS_WIDTH / 2 - buttonWidth / 2;
      const buttonY = CANVAS_HEIGHT / 2 - 20;
      
      // Lưu vị trí nút play để kiểm tra khi click
      playButtonRef.current = {
        x: buttonX,
        y: buttonY,
        width: buttonWidth,
        height: buttonHeight,
      };
      
      ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
      
      // Button border
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);
      
      // Button text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('CHƠI NGAY', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);
      
      // Vẽ một hình tròn nhỏ để chỉ ra vùng có thể click
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(buttonX + buttonWidth / 2, buttonY + buttonHeight / 2, 5, 0, Math.PI * 2);
      ctx.fill();
      
      // High score
      ctx.font = '18px Arial';
      ctx.fillText('Điểm cao nhất: ' + gameRef.current.highScore, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60);
    }
    
    if (gameState === GAME_STATES.GAME_OVER) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      // Game Over text
      ctx.fillStyle = '#FF6347';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 70);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 70);
      
      // Score background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT / 2 - 40, 200, 80);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.strokeRect(CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT / 2 - 40, 200, 80);
      
      // Score text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '18px Arial';
      ctx.fillText('Điểm: ' + gameRef.current.score, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 15);
      ctx.fillText('Điểm cao nhất: ' + gameRef.current.highScore, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 15);
      
      // Play again button
      ctx.fillStyle = '#4CAF50';
      const buttonWidth = 140;
      const buttonHeight = 50;
      const buttonX = CANVAS_WIDTH / 2 - buttonWidth / 2;
      const buttonY = CANVAS_HEIGHT / 2 + 50;
      
      // Lưu vị trí nút chơi lại để kiểm tra khi click
      gameOverButtonRef.current = {
        x: buttonX,
        y: buttonY,
        width: buttonWidth,
        height: buttonHeight,
      };
      
      ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
      
      // Button border
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);
      
      // Button text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px Arial';
      ctx.fillText('CHƠI LẠI', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 80);
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx || !isImagesLoaded) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw background
    drawBackground(ctx);
    
    // Update game state
    if (gameState === GAME_STATES.PLAYING) {
      // Spawn pipes in playing state only
      spawnPipe(performance.now());
      
      // Update pipes positions and check collisions
      updatePipes();
      
      // Update bird position and check collisions
      updateBird();
      
      // Scroll background
      updateBackground();
      
      // Log game state for debugging - Sửa lỗi frameId có thể null
      const frameId = gameRef.current.frameId || 0;
      if (frameId % 60 === 0) { // Log once per second at 60fps
        console.log("Game running: Bird position:", gameRef.current.bird.y, 
                    "Pipes:", gameRef.current.pipes.length,
                    "Score:", gameRef.current.score);
      }
    }
    
    // Draw game elements
    drawPipes(ctx);
    drawGround(ctx);
    drawBird(ctx);
    
    // Draw score
    if (gameState === GAME_STATES.PLAYING || gameState === GAME_STATES.GAME_OVER) {
      drawScore(ctx);
    }
    
    // Draw UI overlays
    drawUI(ctx);
    
    // Request next frame
    gameRef.current.frameId = requestAnimationFrame(draw);
  };

  const goBack = () => {
    router.push('/minigames');
  };

  // Force the first pipe to spawn right after switching to PLAYING state
  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING) {
      // Đặt lastPipeTime để pipe đầu tiên xuất hiện ngay lập tức
      gameRef.current.lastPipeTime = 0;
      console.log("Game state changed to PLAYING, forcing first pipe spawn");
    }
  }, [gameState]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-black">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={handleCanvasClick}
          className="border-4 border-blue-500 rounded-lg shadow-2xl cursor-pointer"
          style={{ 
            maxWidth: '100%',
            touchAction: 'manipulation'
          }}
        />
        <button
          onClick={goBack}
          className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-colors duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Quay lại
        </button>
      </div>
      
      <div className="mt-6 text-white text-center">
        <p className="text-lg font-semibold mb-2">Hướng dẫn chơi:</p>
        <p className="mb-1">• Nhấn chuột hoặc phím Space/phím mũi tên lên để điều khiển chim</p>
        <p>• Tránh các ống và cố gắng đạt điểm cao nhất</p>
      </div>
    </div>
  );
};

export default FlappyBirdGame; 