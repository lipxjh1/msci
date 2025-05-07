"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tile, Connection, GameBoardProps, SuccessMessage } from '../types';
import GameTile from './GameTile';
import { Difficulty, GAME_CONFIG } from '../constants';

const GameBoard = ({ tiles, connections, onTileClick, gameStatus, successMessage }: GameBoardProps) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tileSize, setTileSize] = useState(80);
  const [gap, setGap] = useState(10);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Kiểm tra chế độ fullscreen và thiết bị di động
  useEffect(() => {
    const checkScreenMode = () => {
      setIsMobile(window.innerWidth < 768);
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    checkScreenMode();
    
    const resizeListener = () => {
      checkScreenMode();
      updateDimensions();
    };
    
    // Sử dụng requestAnimationFrame để tối ưu hiệu suất khi resize
    let rafId: number;
    const optimizedResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(resizeListener);
    };
    
    window.addEventListener('resize', optimizedResize);
    document.addEventListener('fullscreenchange', checkScreenMode);
    
    return () => {
      window.removeEventListener('resize', optimizedResize);
      document.removeEventListener('fullscreenchange', checkScreenMode);
      cancelAnimationFrame(rafId);
    };
  }, []);
  
  // Lấy độ khó từ tiles - tối ưu bằng useMemo
  const difficulty = useMemo(() => {
    if (!tiles.length) return Difficulty.EASY;
    
    // Tìm số hàng và cột cao nhất từ các ô
    const rows = Math.max(...tiles.map(tile => tile.position.row)) + 1;
    const cols = Math.max(...tiles.map(tile => tile.position.col)) + 1;
    
    // So sánh với cấu hình từng độ khó
    for (const [difficulty, config] of Object.entries(GAME_CONFIG)) {
      if (config.rows === rows && config.cols === cols) {
        return difficulty as Difficulty;
      }
    }
    
    return Difficulty.EASY; // Mặc định
  }, [tiles]);
  
  const config = useMemo(() => GAME_CONFIG[difficulty], [difficulty]);
  
  // Tính toán kích thước ô và khoảng cách dựa vào kích thước board
  const updateDimensions = useCallback(() => {
    if (boardRef.current) {
      const containerWidth = boardRef.current.clientWidth;
      const containerHeight = boardRef.current.clientHeight;
      
      setDimensions({
        width: containerWidth,
        height: containerHeight,
      });
      
      // Kích thước dựa vào container và fullscreen mode
      let adjustedMinTileSize = config.minTileSize;
      
      // Tăng kích thước ô trong chế độ fullscreen
      if (isFullscreen) {
        adjustedMinTileSize = Math.max(config.minTileSize + 20, config.minTileSize * 1.4);
      }
      
      // Tính kích thước ô
      const maxTileWidth = Math.floor((containerWidth - (config.cols - 1) * 10) / config.cols);
      const maxTileHeight = Math.floor((containerHeight - (config.rows - 1) * 10) / config.rows);
      
      // Lấy giá trị lớn nhất có thể nhưng không nhỏ hơn adjustedMinTileSize
      const baseSize = Math.max(
        Math.min(maxTileWidth, maxTileHeight), 
        isMobile ? adjustedMinTileSize * 0.8 : adjustedMinTileSize
      );

      setTileSize(baseSize);
      
      // Điều chỉnh khoảng cách theo kích thước ô
      setGap(Math.min(Math.floor(baseSize * 0.15), isFullscreen ? 15 : 10));
    }
  }, [config.minTileSize, config.cols, config.rows, isFullscreen, isMobile]);
  
  // Cập nhật kích thước khi các dependency thay đổi
  useEffect(() => {
    updateDimensions();
    
    // Thêm RAF để làm mượt quá trình render
    let rafId: number;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateDimensions);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [updateDimensions, isFullscreen]);
  
  // Tính toán chiều rộng và chiều cao của bảng - tối ưu với useMemo
  const boardSize = useMemo(() => {
    const boardWidth = config.cols * tileSize + (config.cols - 1) * gap;
    const boardHeight = config.rows * tileSize + (config.rows - 1) * gap;
    return { boardWidth, boardHeight };
  }, [config.cols, config.rows, tileSize, gap]);
  
  // Tối ưu hóa kết xuất bằng useMemo - chỉ render lại khi connections thay đổi
  const renderConnections = useMemo(() => {
    return connections.map((connection, index) => (
      <motion.g key={index}>
        <motion.polyline
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: connection.duration / 1000, ease: "easeOut" }}
          points={connection.points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#4ade80"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1"
        />
        {!isMobile && connection.points.map((point, pointIndex) => (
          <motion.circle
            key={pointIndex}
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: 5, opacity: 1 }}
            exit={{ r: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: pointIndex * 0.1 }}
            cx={point.x}
            cy={point.y}
            fill="#4ade80"
          />
        ))}
      </motion.g>
    ));
  }, [connections, isMobile]);
  
  // Tối ưu hóa kết xuất ô bằng useMemo
  const renderTiles = useMemo(() => {
    // Lọc các ô đã khớp để không render
    const visibleTiles = tiles.filter(tile => !tile.isMatched);
    
    // Sử dụng key ổn định để tránh re-render không cần thiết
    return visibleTiles.map((tile) => {
      const x = tile.position.col * (tileSize + gap);
      const y = tile.position.row * (tileSize + gap);
      
      return (
        <div 
          key={tile.id} 
          className="absolute transition-transform"
          style={{ 
            transform: `translate(${x}px, ${y}px)`,
            willChange: 'transform',
          }}
        >
          <GameTile
            tile={tile}
            onClick={onTileClick}
            disabled={gameStatus !== 'playing'}
            tileSize={tileSize}
          />
        </div>
      );
    });
  }, [tiles, tileSize, gap, gameStatus, onTileClick]);
  
  // Chỉ render lại success message khi cần thiết
  const renderSuccessMessage = useMemo(() => {
    if (!successMessage) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.8 }}
        transition={{ type: "spring", damping: 15 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 
                  bg-green-500/20 backdrop-blur-md px-6 py-3 rounded-full border border-green-500/30 
                  flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 
                  success-message"
      >
        <span className="text-xl md:text-2xl">{successMessage.emoji}</span>
        <span className="text-green-400 font-bold text-sm md:text-base">{successMessage.message}</span>
      </motion.div>
    );
  }, [successMessage]);
  
  return (
    <div 
      ref={boardRef} 
      className="w-full h-full flex items-center justify-center overflow-hidden relative"
    >
      <div 
        className="relative"
        style={{ 
          width: `${boardSize.boardWidth}px`, 
          height: `${boardSize.boardHeight}px`,
          transform: 'translateZ(0)', // Kích hoạt GPU acceleration
          willChange: 'transform', // Tối ưu cho animation
          contain: 'layout paint size' // Tránh re-paint không cần thiết
        }}
      >
        {/* Board background */}
        <div className="absolute inset-0 bg-gray-900/40 rounded-xl backdrop-blur-sm border border-white/5 overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30"></div>
        </div>
        
        {/* Connection lines */}
        <svg 
          className="absolute inset-0 z-10 pointer-events-none" 
          width={boardSize.boardWidth} 
          height={boardSize.boardHeight}
          style={{ contain: 'strict' }} // Tối ưu hiệu suất thêm
        >
          {renderConnections}
        </svg>
        
        {/* Success message */}
        <AnimatePresence>
          {renderSuccessMessage}
        </AnimatePresence>
        
        {/* Tiles */}
        <div style={{ contain: 'layout size' }}> {/* Tối ưu hiệu suất */}
          {renderTiles}
        </div>
      </div>
    </div>
  );
};

export default GameBoard; 