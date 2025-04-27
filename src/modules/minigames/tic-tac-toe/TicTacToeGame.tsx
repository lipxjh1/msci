"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Board, Player, Difficulty, GameState, MoveResult } from './types';
import TicTacToeAI from './TicTacToeAI';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

const BOARD_SIZE = 9;
const WIN_LENGTH = 5;
const CELL_SIZE = 40; // Cố định kích thước ô

const TicTacToeGame: React.FC = () => {
  const [board, setBoard] = useState<Board>(initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameState, setGameState] = useState<GameState>('playing');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [playerMark, setPlayerMark] = useState<Player>('X');
  const [aiMark, setAiMark] = useState<Player>('O');
  const [winningLine, setWinningLine] = useState<number[][]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [ai] = useState(new TicTacToeAI('medium', 'O'));
  const [currentMessage, setCurrentMessage] = useState<number>(0);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [totalMoves, setTotalMoves] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const gameStateRef = useRef<GameState>('playing');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Phát hiện thiết bị di động
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    const handleResize = () => {
      checkIfMobile();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      // Dọn dẹp các timeout khi component unmount
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Cập nhật ref khi state thay đổi để tránh closure issues
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Danh sách tin nhắn của Akane
  const akaneMessages = useMemo(() => [
    "Lượt của tôi! Xem tôi đánh thế nào nào!",
    "Bạn đánh khá đấy, nhưng tôi vẫn giỏi hơn!",
    "Hmm, nước đi thú vị đấy!",
    "Bạn đang sắp thắng rồi, nhưng đừng ảo tưởng!",
    "Oops, tôi không thấy nước đi đó!",
    "Bạn chơi rất giỏi! Nhưng tôi cũng không vừa đâu!",
    "Ố ồ! Nước đi thông minh đấy!",
    "Thử sức với độ khó cao hơn đi, dễ quá!",
    "Tôi đang để bạn thắng đấy nhé! Hihi!",
    "Ái chà, đánh vậy sao thắng được tôi?",
    "Đừng lo! Ai cũng thua tôi vài lần đầu tiên mà!",
    "Bạn đang chơi rất tốt! Tôi thích điều đó!",
    "Đây là nước đi bí mật của tôi nè!",
    "Bạn có chắc đó là nước đi đúng không?",
    "Tôi đang tính kế hoạch chiến thắng rồi!",
    "Chà, bạn thật sự muốn thách thức tôi!",
    "Haha! Dễ quá! À không, tôi đùa thôi!",
    "Làm tốt lắm! Tôi sẽ còn khó hơn nữa đấy!",
    "Chúc may mắn lần sau nhé!",
    "Quả là đối thủ xứng tầm!",
    "Đừng buồn khi thua tôi nhé, tôi được lập trình mà!",
    "Có vẻ như hôm nay bạn rất may mắn!",
    "Tôi đang để bạn đi trước đấy!",
    "Chà! Tôi không nghĩ đến nước đi đó!",
    "Game này vui thật đấy! Bạn thấy sao?",
    "Akane luôn sẵn sàng cho một thách thức!",
    "Bạn biết không, tôi rất thích chơi cờ caro!",
    "Hãy cẩn thận với nước đi tiếp theo của tôi!",
    "Ui! Tôi không thấy điều đó đến!",
    "Hmm, chiến thuật của bạn khá lạ đấy!"
  ], []);
  
  // Hàm chọn tin nhắn ngẫu nhiên
  const getRandomMessage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * akaneMessages.length);
    setCurrentMessage(randomIndex);
    setShowMessage(true);
    
    // Ẩn tin nhắn sau 3 giây
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      setShowMessage(false);
      timerRef.current = null;
    }, 3000);
  }, [akaneMessages]);

  // Khởi tạo bàn cờ
  function initializeBoard(): Board {
    const newBoard: Board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      newBoard.push(Array(BOARD_SIZE).fill(null));
    }
    return newBoard;
  }

  // Đặt lại trò chơi
  const resetGame = useCallback(() => {
    setBoard(initializeBoard());
    setCurrentPlayer(playerMark);
    setGameState('playing');
    gameStateRef.current = 'playing';
    setWinningLine([]);
    setTotalMoves(0);
    setIsAiThinking(false);
    ai.setDifficulty(difficulty);
    ai.setAiMark(aiMark);
    
    // Huỷ mọi timeout đang chạy
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [playerMark, difficulty, aiMark, ai]);

  // Xử lý thay đổi cài đặt
  const handleSettingsChange = useCallback((newDifficulty: Difficulty, newPlayerMark: Player) => {
    const newAiMark = newPlayerMark === 'X' ? 'O' : 'X';
    setDifficulty(newDifficulty);
    setPlayerMark(newPlayerMark);
    setAiMark(newAiMark);
    ai.setDifficulty(newDifficulty);
    ai.setAiMark(newAiMark);
    
    // Đặt lại trò chơi với cài đặt mới
    setBoard(initializeBoard());
    setCurrentPlayer(newPlayerMark);
    setGameState('playing');
    gameStateRef.current = 'playing';
    setWinningLine([]);
    setTotalMoves(0);
    setIsAiThinking(false);

    // Huỷ mọi timeout đang chạy
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // Nếu AI đi trước
    if (newPlayerMark === 'O') {
      timerRef.current = setTimeout(() => {
        makeAiMove(initializeBoard());
        timerRef.current = null;
      }, 500);
    }
  }, [ai]);

  // Kiểm tra người thắng
  const checkWinner = useCallback((board: Board, row: number, col: number): MoveResult => {
    const size = board.length;
    const player = board[row][col];
    if (!player) return { winner: null, gameOver: false };
    
    // Các hướng kiểm tra: ngang, dọc, chéo chính, chéo phụ
    const directions = [
      { dr: 0, dc: 1 },  // ngang
      { dr: 1, dc: 0 },  // dọc
      { dr: 1, dc: 1 },  // chéo chính
      { dr: 1, dc: -1 }, // chéo phụ
    ];
    
    for (const dir of directions) {
      let count = 1;
      const lineCoords = [[row, col]];
      
      // Kiểm tra theo hướng thuận
      for (let i = 1; i < WIN_LENGTH; i++) {
        const r = row + dir.dr * i;
        const c = col + dir.dc * i;
        if (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
          count++;
          lineCoords.push([r, c]);
        } else {
          break;
        }
      }
      
      // Kiểm tra theo hướng ngược
      for (let i = 1; i < WIN_LENGTH; i++) {
        const r = row - dir.dr * i;
        const c = col - dir.dc * i;
        if (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
          count++;
          lineCoords.push([r, c]);
        } else {
          break;
        }
      }
      
      // Nếu đủ WIN_LENGTH ô liên tiếp
      if (count >= WIN_LENGTH) {
        return { winner: player, gameOver: true, winningLine: lineCoords };
      }
    }
    
    // Kiểm tra hòa
    let isDraw = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (board[r][c] === null) {
          isDraw = false;
          break;
        }
      }
      if (!isDraw) break;
    }
    
    return { winner: null, gameOver: isDraw };
  }, []);

  // Xử lý nước đi của người chơi
  const handleCellClick = useCallback((row: number, col: number) => {
    // Không cho phép đánh nếu ô đã có giá trị hoặc game đã kết thúc hoặc AI đang nghĩ
    if (board[row][col] !== null || gameStateRef.current !== 'playing' || currentPlayer !== playerMark || isAiThinking) {
      return;
    }

    // Tạo bàn cờ mới với nước đi của người chơi
    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = playerMark;
    setBoard(newBoard);
    setTotalMoves(prev => prev + 1);

    // Kiểm tra trạng thái trò chơi
    const result = checkWinner(newBoard, row, col);
    if (result.gameOver) {
      if (result.winner) {
        setGameState(`${result.winner}_won` as GameState);
        gameStateRef.current = `${result.winner}_won` as GameState;
        if (result.winningLine) setWinningLine(result.winningLine);
      } else {
        setGameState('draw');
        gameStateRef.current = 'draw';
      }
    } else {
      // Chuyển lượt cho AI
      setCurrentPlayer(aiMark);
      // AI đánh sau 500ms để tạo hiệu ứng suy nghĩ
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      timerRef.current = setTimeout(() => {
        makeAiMove(newBoard);
        timerRef.current = null;
      }, 500);
    }
  }, [board, currentPlayer, playerMark, isAiThinking, aiMark, checkWinner]);

  // Xử lý nước đi của AI
  const makeAiMove = useCallback((currentBoard: Board) => {
    if (gameStateRef.current !== 'playing') return;

    setIsAiThinking(true);
    getRandomMessage(); // Hiển thị tin nhắn ngẫu nhiên
    
    // Sử dụng setTimeout để tạo hiệu ứng AI đang suy nghĩ
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      try {
        // Kiểm tra lại trạng thái game trước khi AI đi
        if (gameStateRef.current !== 'playing') {
          setIsAiThinking(false);
          return;
        }
        
        const move = ai.makeMove(currentBoard);
        
        // Tạo bàn cờ mới với nước đi của AI
        const newBoard = currentBoard.map(row => [...row]);
        newBoard[move.row][move.col] = aiMark;
        setBoard(newBoard);
        setTotalMoves(prev => prev + 1);
        
        // Kiểm tra trạng thái trò chơi
        const result = checkWinner(newBoard, move.row, move.col);
        if (result.gameOver) {
          if (result.winner) {
            setGameState(`${result.winner}_won` as GameState);
            gameStateRef.current = `${result.winner}_won` as GameState;
            if (result.winningLine) setWinningLine(result.winningLine);
          } else {
            setGameState('draw');
            gameStateRef.current = 'draw';
          }
        } else {
          // Chuyển lượt cho người chơi
          setCurrentPlayer(playerMark);
        }
      } catch (error) {
        console.error('AI error:', error);
      } finally {
        setIsAiThinking(false);
        timerRef.current = null;
      }
    }, 1000);
  }, [ai, aiMark, playerMark, checkWinner, getRandomMessage]);

  // Tự động kích hoạt AI nếu đến lượt AI
  useEffect(() => {
    // Chỉ chạy một lần khi component mount
    if (gameState === 'playing' && currentPlayer === aiMark) {
      makeAiMove(board);
    }
    
    // Cleanup khi unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Nút quay lại
  const BackButton = () => (
    <Link href="/minigames" 
      className="inline-flex items-center mb-4 text-blue-400 hover:text-blue-300 transition-colors">
      <FiArrowLeft className="mr-2" />
      <span>Quay lại danh sách game</span>
    </Link>
  );

  // Render giao diện cho desktop
  const renderDesktopUI = () => (
    <div className="space-y-4">
      <BackButton />
      
      <div className="flex flex-row gap-6 items-start">
        <div className="w-full lg:w-3/5">
          <div className="relative bg-gradient-to-br from-indigo-900 to-blue-900 rounded-lg p-4 shadow-xl border border-indigo-700">
            <div className="grid grid-cols-9 gap-1.5">
              {board.map((row, rowIndex) => (
                row.map((cell, colIndex) => {
                  const isWinningCell = winningLine.some(([r, c]) => r === rowIndex && c === colIndex);
                  return (
                    <motion.div
                      key={`${rowIndex}-${colIndex}`}
                      className={`w-[${CELL_SIZE}px] h-[${CELL_SIZE}px] flex items-center justify-center cursor-pointer rounded-md transition-all ${
                        isWinningCell ? 'bg-green-600 animate-pulse' : 'bg-indigo-800 hover:bg-indigo-700'
                      }`}
                      style={{ 
                        width: `${CELL_SIZE}px`, 
                        height: `${CELL_SIZE}px`,
                        minWidth: `${CELL_SIZE}px`,
                        minHeight: `${CELL_SIZE}px` 
                      }}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {cell && (
                        <motion.span 
                          className={`text-2xl font-bold ${cell === 'X' ? 'text-pink-500' : 'text-cyan-400'}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          {cell}
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })
              ))}
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            {renderSettings()}
            
            {/* Trạng thái và nút chơi lại */}
            <div className="bg-[#151530] p-4 rounded-lg border border-indigo-900/50">
              <div className="mb-4 h-16 flex items-center justify-center">{renderGameStatus()}</div>
              <motion.button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                onClick={resetGame}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Chơi lại
              </motion.button>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block w-2/5">
          <div className="relative bg-[#151530] p-5 rounded-lg border border-indigo-900/50">
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-64 mb-4">
                <Image 
                  src="/images/minigam/3.png"
                  alt="Akane"
                  fill
                  sizes="256px"
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
              
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
                Akane
              </h2>
              
              <div className="text-gray-300 text-center mb-4">
                Xin chào! Tôi là Akane, đối thủ cờ caro của bạn hôm nay. Hãy thách thức tôi nào!
              </div>
              
              {/* Tin nhắn từ Akane */}
              <div className="min-h-24 w-full relative h-24 mb-4">
                <AnimatePresence>
                  {showMessage && (
                    <motion.div 
                      className="bg-purple-900/50 border border-purple-700 p-4 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <div className="absolute -top-8 -left-4 w-8 h-8 transform rotate-45 text-2xl">💭</div>
                      </div>
                      <p className="text-purple-100 italic">{akaneMessages[currentMessage]}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="mt-6 w-full">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">Luật chơi</h3>
                <ul className="text-gray-300 list-disc list-inside space-y-2">
                  <li>Mục tiêu: Tạo được 5 ô liên tiếp theo hàng ngang, dọc hoặc chéo</li>
                  <li>Người đầu tiên tạo được 5 ô liên tiếp sẽ thắng</li>
                  <li>Nếu bàn cờ đầy mà không có người thắng, kết quả sẽ là hòa</li>
                </ul>
                
                <h3 className="text-lg font-semibold mt-6 mb-3 text-blue-400">Độ khó</h3>
                <ul className="text-gray-300 list-disc list-inside space-y-2">
                  <li><span className="text-green-400">Dễ</span>: Akane đánh ngẫu nhiên</li>
                  <li><span className="text-yellow-400">Trung bình</span>: Akane kết hợp giữa đánh ngẫu nhiên và thông minh</li>
                  <li><span className="text-red-400">Khó</span>: Akane sử dụng thuật toán minimax, rất khó để đánh bại</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render giao diện cho mobile
  const renderMobileUI = () => (
    <div className="flex flex-col gap-4">
      <BackButton />
      
      {/* Phần Akane và thông báo */}
      <div className="bg-[#151530] p-4 rounded-lg border border-indigo-900/50">
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image 
              src="/images/minigam/3.png"
              alt="Akane"
              fill
              sizes="64px"
              className="object-cover rounded-full border-2 border-purple-600"
              priority
            />
          </div>
          
          <div className="flex-1">
            <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Akane
            </h2>
            
            {/* Tin nhắn từ Akane */}
            <div className="min-h-8 h-8 relative">
              <AnimatePresence>
                {showMessage ? (
                  <motion.div 
                    className="text-purple-100 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {akaneMessages[currentMessage]}
                  </motion.div>
                ) : (
                  <div className="text-gray-400 text-sm">
                    {isAiThinking ? "Đang suy nghĩ..." : "Hãy thách thức tôi!"}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trạng thái trò chơi */}
      <div className="bg-[#151530] p-3 rounded-lg border border-indigo-900/50 h-[80px] flex items-center justify-center">
        {renderGameStatus()}
      </div>
      
      {/* Bàn cờ */}
      <div className="relative bg-gradient-to-br from-indigo-900 to-blue-900 rounded-lg p-2 shadow-xl border border-indigo-700 mx-auto">
        <div className="grid grid-cols-9 gap-1">
          {board.map((row, rowIndex) => (
            row.map((cell, colIndex) => {
              const isWinningCell = winningLine.some(([r, c]) => r === rowIndex && c === colIndex);
              const mobileSize = 32; // Kích thước nhỏ hơn cho mobile
              
              return (
                <motion.div
                  key={`${rowIndex}-${colIndex}`}
                  className={`flex items-center justify-center cursor-pointer rounded transition-all ${
                    isWinningCell ? 'bg-green-600 animate-pulse' : 'bg-indigo-800 hover:bg-indigo-700'
                  }`}
                  style={{ 
                    width: `${mobileSize}px`, 
                    height: `${mobileSize}px`,
                    minWidth: `${mobileSize}px`,
                    minHeight: `${mobileSize}px` 
                  }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  whileTap={{ scale: 0.95 }}
                >
                  {cell && (
                    <motion.span 
                      className={`text-lg font-bold ${cell === 'X' ? 'text-pink-500' : 'text-cyan-400'}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {cell}
                    </motion.span>
                  )}
                </motion.div>
              );
            })
          ))}
        </div>
      </div>
      
      {/* Điều khiển và cài đặt */}
      <div className="grid grid-cols-1 gap-4">
        <motion.button
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          onClick={resetGame}
          whileTap={{ scale: 0.95 }}
        >
          Chơi lại
        </motion.button>
        
        {renderSettings()}
        
        {/* Luật chơi ngắn gọn cho mobile */}
        <div className="bg-[#151530] p-4 rounded-lg border border-indigo-900/50">
          <details className="text-sm">
            <summary className="font-medium text-blue-400 cursor-pointer mb-2">Luật chơi & Độ khó</summary>
            <ul className="text-gray-300 list-disc list-inside space-y-1 pl-1 text-xs">
              <li>Tạo được 5 ô liên tiếp để thắng</li>
              <li><span className="text-green-400">Dễ</span>: Akane đánh ngẫu nhiên</li>
              <li><span className="text-yellow-400">Trung bình</span>: Akane đánh bán thông minh</li>
              <li><span className="text-red-400">Khó</span>: Akane sử dụng minimax</li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );

  // Hiển thị trạng thái game
  const renderGameStatus = () => {
    if (gameState === 'playing') {
      return (
        <div className="text-center">
          {isAiThinking ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 relative">
                <div className="animate-ping absolute w-full h-full rounded-full bg-purple-500 opacity-30"></div>
                <div className="relative w-5 h-5 rounded-full bg-purple-500"></div>
              </div>
              <span className="text-purple-300">Akane đang suy nghĩ...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-gray-300 mb-1">Lượt của</span>
              <div className={`inline-flex items-center justify-center ${currentPlayer === 'X' ? 'text-pink-500' : 'text-cyan-400'} text-xl font-bold`}>
                {currentPlayer === playerMark ? 'BẠN' : 'AKANE'}
                <span className="ml-2 text-xl">{currentPlayer}</span>
              </div>
            </div>
          )}
        </div>
      );
    } else if (gameState === 'draw') {
      return (
        <div className="text-center">
          <div className="inline-block px-4 py-2 bg-yellow-500/20 rounded-lg text-yellow-300 font-medium">
            HÒA!
          </div>
          <div className="mt-1 text-gray-400 text-sm">
            Trận đấu kết thúc với tỷ số hòa
          </div>
        </div>
      );
    } else {
      const winner = gameState.split('_')[0] as Player;
      const isPlayerWin = winner === playerMark;
      
      return (
        <div className="text-center">
          <div className={`inline-block px-4 py-2 ${isPlayerWin ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'} rounded-lg font-medium`}>
            {isPlayerWin ? 'BẠN THẮNG!' : 'AKANE THẮNG!'}
          </div>
          <div className="mt-1 text-gray-400 text-sm">
            {isPlayerWin ? 'Chúc mừng! Bạn đã đánh bại Akane!' : 'Đừng buồn! Hãy thử lại lần sau nhé!'}
          </div>
        </div>
      );
    }
  };

  // Hiển thị cài đặt
  const renderSettings = () => {
    return (
      <div className={`bg-[#151530] p-4 rounded-lg border border-indigo-900/50 ${isMobile ? '' : 'h-full'}`}>
        <h3 className="text-center font-semibold mb-4 text-blue-400">Cài đặt trò chơi</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-gray-300 text-sm text-center mb-2">Độ khó:</p>
            <div className="grid grid-cols-3 gap-2">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
                <motion.button
                  key={level}
                  className={`py-2 px-3 rounded-md text-center text-sm ${
                    difficulty === level
                      ? level === 'easy' 
                        ? 'bg-green-600 text-white' 
                        : level === 'medium'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => handleSettingsChange(level, playerMark)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {level === 'easy' ? 'Dễ' : level === 'medium' ? 'Trung bình' : 'Khó'}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-300 text-sm text-center mb-2">Chọn quân cờ:</p>
            <div className="grid grid-cols-2 gap-4">
              {(['X', 'O'] as Player[]).map((mark) => (
                mark && (
                  <motion.button
                    key={mark}
                    className={`py-2 px-3 rounded-md flex items-center justify-center ${
                      playerMark === mark
                        ? mark === 'X' 
                          ? 'bg-pink-600 text-white border-2 border-pink-400' 
                          : 'bg-cyan-600 text-white border-2 border-cyan-400'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-2 border-transparent'
                    }`}
                    onClick={() => handleSettingsChange(difficulty, mark)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={`text-2xl font-bold ${playerMark === mark ? 'text-white' : mark === 'X' ? 'text-pink-500' : 'text-cyan-400'}`}>
                      {mark}
                    </span>
                    <span className="ml-2 text-sm">
                      {mark === playerMark ? '(Bạn)' : '(Akane)'}
                    </span>
                  </motion.button>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return isMobile ? renderMobileUI() : renderDesktopUI();
};

export default TicTacToeGame; 