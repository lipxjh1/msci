"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Board, Player, Difficulty, GameState, MoveResult } from './types';
import TicTacToeAI from './TicTacToeAI';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiSettings, FiRefreshCw, FiAward, FiInfo } from 'react-icons/fi';

const BOARD_SIZE = 9;
const WIN_LENGTH = 5;
const CELL_SIZE = 50; // Kích thước ô để hiển thị vuông vắn

const TicTacToeGame: React.FC = () => {
  const [board, setBoard] = useState<Board>(initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameState, setGameState] = useState<GameState>('playing');
  const [difficulty, setDifficulty] = useState<Difficulty>('hard');
  const [playerMark, setPlayerMark] = useState<Player>('X');
  const [aiMark, setAiMark] = useState<Player>('O');
  const [winningLine, setWinningLine] = useState<number[][]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [ai] = useState(new TicTacToeAI('hard', 'O'));
  const [currentMessage, setCurrentMessage] = useState<number>(0);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [totalMoves, setTotalMoves] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const gameStateRef = useRef<GameState>('playing');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Thêm mảng các emoji vui nhộn khi AI chặn được người chơi
  const BLOCKING_EMOJIS = [
    '😎', '🤓', '🧠', '🚫', '🛑', '🔥', '💪', '👊', '🤖', '👾',
    '😏', '😈', '🙅‍♂️', '🧐', '🤔', '💭', '��', '✨', '⚡️', '🎯'
  ];

  // Thêm biến state để lưu trữ trạng thái chặn
  const [blockingMove, setBlockingMove] = useState<{row: number, col: number} | null>(null);
  const [blockingEmoji, setBlockingEmoji] = useState<string>('');
  
  // Mobile detection
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
      // Clean up timeouts when component unmounts
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Update ref when state changes to avoid closure issues
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // AI character messages
  const aiMessages = useMemo(() => [
    "My turn! Watch my move!",
    "Good play, but I'm still better!",
    "Hmm, interesting move!",
    "You're getting close, but don't get too confident!",
    "Oops, I didn't see that coming!",
    "You play well! But I won't go easy on you!",
    "Oh! That was a smart move!",
    "Try a higher difficulty, this is too easy!",
    "I'm letting you win this time! Haha!",
    "Is that the best you can do?",
    "Don't worry! Everyone loses to me the first few times!",
    "You're playing very well! I like that!",
    "Here's my secret move!",
    "Are you sure that's the right move?",
    "I'm planning my victory already!",
    "You're really challenging me!",
    "Haha! Too easy! Just kidding!",
    "Well done! I'll be tougher next time!",
    "Better luck next time!",
    "A worthy opponent indeed!",
    "Don't feel bad losing to me, I'm programmed to win!",
    "Seems like you're having a lucky day!",
    "I'm letting you go first!",
    "Wow! I didn't think of that move!",
    "This game is fun! What do you think?",
    "Always ready for a challenge!",
    "You know, I really enjoy tic-tac-toe!",
    "Be careful with your next move!",
    "Ouch! I didn't see that coming!",
    "Your strategy is quite unusual!"
  ], []);
  
  // Random message selection function
  const getRandomMessage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * aiMessages.length);
    setCurrentMessage(randomIndex);
    setShowMessage(true);
    
    // Hide message after 3 seconds
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      setShowMessage(false);
      timerRef.current = null;
    }, 3000);
  }, [aiMessages]);

  // Initialize the board
  function initializeBoard(): Board {
    const newBoard: Board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      newBoard.push(Array(BOARD_SIZE).fill(null));
    }
    return newBoard;
  }

  // Reset game
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
    
    // Cancel any running timeouts
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [playerMark, difficulty, aiMark, ai]);

  // Handle settings changes
  const handleSettingsChange = useCallback((newDifficulty: Difficulty, newPlayerMark: Player) => {
    const newAiMark = newPlayerMark === 'X' ? 'O' : 'X';
    setDifficulty(newDifficulty);
    setPlayerMark(newPlayerMark);
    setAiMark(newAiMark);
    ai.setDifficulty(newDifficulty);
    ai.setAiMark(newAiMark);
    
    // Reset game with new settings
    setBoard(initializeBoard());
    setCurrentPlayer(newPlayerMark);
    setGameState('playing');
    gameStateRef.current = 'playing';
    setWinningLine([]);
    setTotalMoves(0);
    setIsAiThinking(false);

    // Cancel any running timeouts
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // If AI goes first
    if (newPlayerMark === 'O') {
      timerRef.current = setTimeout(() => {
        makeAiMove(initializeBoard());
        timerRef.current = null;
      }, 500);
    }
  }, [ai]);

  // Check for winner
  const checkWinner = useCallback((board: Board, row: number, col: number): MoveResult => {
    const size = board.length;
    const player = board[row][col];
    if (!player) return { winner: null, gameOver: false };
    
    // Directions to check: horizontal, vertical, main diagonal, anti-diagonal
    const directions = [
      { dr: 0, dc: 1 },  // horizontal
      { dr: 1, dc: 0 },  // vertical
      { dr: 1, dc: 1 },  // main diagonal
      { dr: 1, dc: -1 }, // anti-diagonal
    ];
    
    for (const dir of directions) {
      let count = 1;
      const lineCoords = [[row, col]];
      
      // Check in forward direction
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
      
      // Check in backward direction
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
      
      // Check if we have a winner
      if (count >= WIN_LENGTH) {
        return { 
          winner: player, 
          gameOver: true,
          winningLine: lineCoords 
        };
      }
    }
    
    // Check for draw (all cells filled)
    let filledCells = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (board[r][c] !== null) {
          filledCells++;
        }
      }
    }
    
    return {
      winner: null,
      gameOver: filledCells === size * size,
    };
  }, []);

  // Handle player move
  const handleCellClick = useCallback((row: number, col: number) => {
    // Ignore if game is over or cell is already filled or if it's AI's turn
    if (gameStateRef.current !== 'playing' || board[row][col] !== null || 
        (currentPlayer !== playerMark) || isAiThinking) {
      return;
    }
    
    // Make player move
    const newBoard = [...board.map(row => [...row])];
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);
    setTotalMoves(prev => prev + 1);
    
    // Check for winner
    const result = checkWinner(newBoard, row, col);
    if (result.winner) {
      setGameState('won');
      gameStateRef.current = 'won';
      if (result.winningLine) {
        setWinningLine(result.winningLine);
      }
      return;
    } else if (result.gameOver) {
      setGameState('draw');
      gameStateRef.current = 'draw';
      return;
    }
    
    // Switch player
    setCurrentPlayer(aiMark);
    
    // AI's turn
    timerRef.current = setTimeout(() => {
      makeAiMove(newBoard);
      timerRef.current = null;
    }, 500);
  }, [board, currentPlayer, gameState, playerMark, aiMark, isAiThinking, checkWinner]);
  
  // AI move
  const makeAiMove = useCallback((currentBoard: Board) => {
    if (gameStateRef.current !== 'playing') {
      return;
    }
    
    setIsAiThinking(true);
    getRandomMessage();
    
    // Small delay for "thinking" effect
    setTimeout(() => {
      const aiMove = ai.makeMove(currentBoard);
      
      if (aiMove && aiMove.row !== -1 && aiMove.col !== -1) {
        const newBoard = [...currentBoard.map(row => [...row])];
        newBoard[aiMove.row][aiMove.col] = aiMark;
        setBoard(newBoard);
        setTotalMoves(prev => prev + 1);
        
        // Kiểm tra xem có phải nước chặn hay không
        const isBlockingMove = checkIfBlockingMove(currentBoard, aiMove.row, aiMove.col);
        if (isBlockingMove) {
          // Hiển thị emoji chặn
          setBlockingEmoji(BLOCKING_EMOJIS[Math.floor(Math.random() * BLOCKING_EMOJIS.length)]);
          setBlockingMove({row: aiMove.row, col: aiMove.col});
          // Tự động xóa emoji sau 2 giây
          setTimeout(() => {
            setBlockingMove(null);
          }, 2000);
        }
        
        // Check for winner
        const result = checkWinner(newBoard, aiMove.row, aiMove.col);
        if (result.winner) {
          setGameState('lost');
          gameStateRef.current = 'lost';
          if (result.winningLine) {
            setWinningLine(result.winningLine);
          }
        } else if (result.gameOver) {
          setGameState('draw');
          gameStateRef.current = 'draw';
        } else {
          setCurrentPlayer(playerMark);
        }
      } else {
        console.error("AI couldn't find a valid move");
        setCurrentPlayer(playerMark);
      }
      
      setIsAiThinking(false);
    }, 800);
  }, [ai, aiMark, playerMark, checkWinner, getRandomMessage]);

  // Thêm hàm kiểm tra nước đi có phải là nước chặn không
  const checkIfBlockingMove = (board: Board, row: number, col: number): boolean => {
    const size = board.length;
    const threatThreshold = 3; // Số quân liên tiếp coi là nguy hiểm
    
    // Các hướng để kiểm tra: ngang, dọc, chéo chính, chéo phụ
    const directions = [
      { dr: 0, dc: 1 },  // ngang
      { dr: 1, dc: 0 },  // dọc
      { dr: 1, dc: 1 },  // chéo chính
      { dr: 1, dc: -1 }, // chéo phụ
    ];
    
    // Đặt quân cờ AI để kiểm tra
    board[row][col] = aiMark;
    
    for (const dir of directions) {
      // Kiểm tra hai hướng ngược nhau
      let threatCount = 0;
      
      // Kiểm tra theo hướng thuận
      for (let i = 1; i < WIN_LENGTH; i++) {
        const r = row + dir.dr * i;
        const c = col + dir.dc * i;
        if (r >= 0 && r < size && c >= 0 && c < size) {
          if (board[r][c] === playerMark) {
            threatCount++;
          } else {
            break;
          }
        }
      }
      
      // Kiểm tra theo hướng ngược
      for (let i = 1; i < WIN_LENGTH; i++) {
        const r = row - dir.dr * i;
        const c = col - dir.dc * i;
        if (r >= 0 && r < size && c >= 0 && c < size) {
          if (board[r][c] === playerMark) {
            threatCount++;
          } else {
            break;
          }
        }
      }
      
      // Hoàn tác nước đi
      board[row][col] = null;
      
      // Nếu có đủ quân liên tiếp theo bất kỳ hướng nào, đây là nước chặn
      if (threatCount >= threatThreshold) {
        return true;
      }
    }
    
    // Hoàn tác nước đi (trong trường hợp chưa hoàn tác ở vòng lặp)
    board[row][col] = null;
    return false;
  };

  // Initialize game when component mounts
  useEffect(() => {
    ai.setDifficulty(difficulty);
    ai.setAiMark(aiMark);
    
    // If AI goes first
    if (playerMark === 'O') {
      makeAiMove(board);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Back button component
  const BackButton = () => (
    <Link href="/minigames" className="inline-flex items-center text-blue-300 hover:text-blue-200 font-medium transition-colors">
      <FiArrowLeft className="mr-2" />
      <span>Back to Mini Games</span>
    </Link>
  );

  // Cập nhật render cell để hiển thị emoji khi AI chặn
  const renderCell = (rowIndex: number, colIndex: number, cell: Player) => {
    const isBlockingCell = blockingMove && blockingMove.row === rowIndex && blockingMove.col === colIndex;
    const isWinningCell = winningLine.some(([r, c]) => r === rowIndex && c === colIndex);
    
    return (
      <div 
        key={`${rowIndex}-${colIndex}`}
        className={`flex items-center justify-center cursor-pointer transition-all duration-200 ${
          isWinningCell
            ? 'bg-green-900 bg-opacity-75' 
            : 'bg-[#1a2234] hover:bg-[#2a3344]'
        }`}
        style={{ width: isMobile ? '100%' : CELL_SIZE, height: isMobile ? '100%' : CELL_SIZE }}
        onClick={() => handleCellClick(rowIndex, colIndex)}
      >
        {cell === 'X' && (
          <div className="text-red-400 text-3xl font-bold drop-shadow-[0_0_3px_rgba(248,113,113,0.6)]">X</div>
        )}
        {cell === 'O' && (
          <div className="relative">
            <div className="text-blue-400 text-3xl font-bold drop-shadow-[0_0_3px_rgba(96,165,250,0.6)]">O</div>
            {isBlockingCell && (
              <motion.div 
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: -25 }}
                exit={{ scale: 0 }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 text-2xl"
              >
                {blockingEmoji}
              </motion.div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Desktop UI render
  const renderDesktopUI = () => (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* Game board section */}
      <div className="flex-1 flex flex-col items-center">
        <div 
          className="grid bg-[#1a2234] rounded-lg relative overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          style={{ 
            gridTemplateColumns: `repeat(${BOARD_SIZE}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${BOARD_SIZE}, ${CELL_SIZE}px)`,
            gap: '1px',
            backgroundColor: '#374151',
          }}
        >
          {board.map((row, rowIndex) => 
            row.map((cell, colIndex) => renderCell(rowIndex, colIndex, cell))
          )}
        </div>
        
        <div className="mt-6 flex space-x-3">
          <button 
            className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-lg text-white font-medium flex items-center shadow-lg hover:shadow-xl transition-all"
            onClick={resetGame}
          >
            <FiRefreshCw className="mr-2" /> New Game
          </button>
        </div>
      </div>
      
      {/* Game status and settings section */}
      <div className="w-full md:w-80">
        {renderGameStatus()}
        {renderSettings()}
      </div>
    </div>
  );

  // Mobile UI render
  const renderMobileUI = () => (
    <div className="flex flex-col w-full">
      {/* Game status and AI character */}
      {renderGameStatus()}
      
      {/* Game board with correct width for mobile */}
      <div className="flex justify-center my-4">
        <div 
          className="grid bg-[#1a2234] rounded-lg relative shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          style={{ 
            gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(30px, 36px))`,
            gridTemplateRows: `repeat(${BOARD_SIZE}, minmax(30px, 36px))`,
            gap: '1px',
            backgroundColor: '#374151',
          }}
        >
          {board.map((row, rowIndex) => 
            row.map((cell, colIndex) => renderCell(rowIndex, colIndex, cell))
          )}
        </div>
      </div>
      
      {/* Mobile controls */}
      <div className="flex justify-center space-x-4 mb-4">
        <button 
          className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-lg text-white font-medium flex items-center shadow-lg hover:shadow-xl transition-all"
          onClick={resetGame}
        >
          <FiRefreshCw className="mr-2" /> New Game
        </button>
      </div>
      
      {/* Settings section */}
      {renderSettings()}
    </div>
  );

  // Game status rendering
  const renderGameStatus = () => {
    return (
      <div className="bg-[#1a2234] rounded-lg p-5 mb-5 relative shadow-lg border border-[#2e3a54]">
        <h2 className="text-xl font-bold mb-3 flex items-center text-white">
          <FiInfo className="mr-2 text-blue-400" /> Game Status
        </h2>
        
        <div className="flex items-center mb-3">
          <div className="w-full bg-[#111827] rounded-full h-5">
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-5 rounded-full flex items-center justify-end pr-2 text-xs font-medium"
              initial={{ width: '0%' }}
              animate={{ width: `${(totalMoves / (BOARD_SIZE * BOARD_SIZE)) * 100}%` }}
              transition={{ duration: 0.5 }}
            >
            </motion.div>
          </div>
          <span className="ml-3 font-medium text-white">Moves: {totalMoves}</span>
        </div>
        
        {/* AI Message Bubble */}
        <div className="relative">
          <div className="flex items-end mb-4">
            <div className="w-16 h-16 mr-3 relative">
              <Image 
                src="/images/minigam/7.png" 
                alt="AI Assistant" 
                fill
                sizes="(max-width: 768px) 64px, 64px"
                className="object-cover rounded-full border-2 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                priority
              />
            </div>
            <AnimatePresence>
              {showMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 p-3 rounded-lg rounded-bl-none max-w-[250px] shadow-lg"
                >
                  <p className="text-sm text-white font-medium">{aiMessages[currentMessage]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="text-center font-bold text-lg">
          {isAiThinking ? (
            <span className="text-indigo-300">AI is thinking...</span>
          ) : gameState === 'playing' ? (
            <span className={currentPlayer === playerMark ? 'text-green-300' : 'text-indigo-300'}>
              {currentPlayer === playerMark ? 'Your turn' : 'AI turn'}
            </span>
          ) : gameState === 'won' ? (
            <span className="text-green-300">You won! Congratulations!</span>
          ) : gameState === 'lost' ? (
            <span className="text-red-300">AI won. Better luck next time!</span>
          ) : (
            <span className="text-yellow-300">It's a draw!</span>
          )}
        </div>
      </div>
    );
  };

  // Settings rendering
  const renderSettings = () => {
    return (
      <div className="bg-[#1a2234] rounded-lg p-5 shadow-lg border border-[#2e3a54]">
        <h2 className="text-xl font-bold mb-4 flex items-center text-white">
          <FiSettings className="mr-2 text-indigo-400" /> Game Settings
        </h2>
        
        <div className="mb-5">
          <h3 className="text-sm font-medium mb-2 text-gray-200">Choose your mark:</h3>
          <div className="flex space-x-3">
            <button 
              className={`flex-1 py-2.5 rounded-md font-medium transition-all ${
                playerMark === 'X' 
                  ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg' 
                  : 'bg-[#111827] text-gray-300 hover:bg-[#1d2536]'
              }`}
              onClick={() => gameState !== 'playing' && handleSettingsChange(difficulty, 'X')}
              disabled={gameState === 'playing' && playerMark !== 'X'}
            >
              X
            </button>
            <button 
              className={`flex-1 py-2.5 rounded-md font-medium transition-all ${
                playerMark === 'O' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg' 
                  : 'bg-[#111827] text-gray-300 hover:bg-[#1d2536]'
              }`}
              onClick={() => gameState !== 'playing' && handleSettingsChange(difficulty, 'O')}
              disabled={gameState === 'playing' && playerMark !== 'O'}
            >
              O
            </button>
          </div>
          <p className="text-xs text-blue-300 mt-2">
            You can change your mark before starting a new game
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2 text-gray-200">Difficulty level:</h3>
          <div className="flex flex-col space-y-2">
            <button 
              className={`py-2.5 rounded-md font-medium transition-all ${
                difficulty === 'easy' 
                  ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg' 
                  : 'bg-[#111827] text-gray-300 hover:bg-[#1d2536]'
              }`}
              onClick={() => gameState !== 'playing' && handleSettingsChange('easy', playerMark)}
              disabled={gameState === 'playing' && difficulty !== 'easy'}
            >
              Easy
            </button>
            <button 
              className={`py-2.5 rounded-md font-medium transition-all ${
                difficulty === 'medium' 
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-700 text-white shadow-lg' 
                  : 'bg-[#111827] text-gray-300 hover:bg-[#1d2536]'
              }`}
              onClick={() => gameState !== 'playing' && handleSettingsChange('medium', playerMark)}
              disabled={gameState === 'playing' && difficulty !== 'medium'}
            >
              Medium
            </button>
            <button 
              className={`py-2.5 rounded-md font-medium transition-all ${
                difficulty === 'hard' 
                  ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg' 
                  : 'bg-[#111827] text-gray-300 hover:bg-[#1d2536]'
              }`}
              onClick={() => gameState !== 'playing' && handleSettingsChange('hard', playerMark)}
              disabled={gameState === 'playing' && difficulty !== 'hard'}
            >
              Hard
            </button>
          </div>
          <p className="text-xs text-blue-300 mt-2">
            You can change difficulty before starting a new game
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <BackButton />
      </div>
      
      {isMobile ? renderMobileUI() : renderDesktopUI()}
    </div>
  );
};

export default TicTacToeGame; 