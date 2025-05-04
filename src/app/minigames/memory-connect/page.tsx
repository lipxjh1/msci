"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';
import { FaHome, FaLightbulb, FaTrophy, FaExpandAlt, FaCompressAlt, FaPlay, FaPause, FaRedo, FaArrowLeft } from 'react-icons/fa';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import Footer from '@/app/home/components/Footer';
import { motion } from 'framer-motion';

import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import GameStatus from './components/GameStatus';
import GameOverModal from './components/GameOverModal';

import { Difficulty, GAME_CONFIG, ANIMATION_DURATION, CONNECTION_COLOR, SUCCESS_MESSAGES, LEVELS, LOCAL_STORAGE_KEY } from './constants';
import { 
  Tile, 
  GameState, 
  Connection,
  ConnectionPoint
} from './types';
import { 
  generateTiles, 
  checkTilesMatch, 
  findPath, 
  allTilesMatched,
  positionToCoordinates,
  createConnection
} from './gameLogic';

import './styles.css';

const MemoryConnect = () => {
  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    tiles: [],
    selectedTiles: [],
    connections: [],
    difficulty: Difficulty.EASY,
    score: 0,
    elapsedTime: 0,
    gameStatus: 'waiting',
    tilesRemaining: 0,
    currentLevel: 1,
    successMessage: null
  });
  
  // Modal states
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [bestTime, setBestTime] = useState<number | undefined>(undefined);
  
  // Timer reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  // Animation frame reference
  const animationFrameRef = useRef<number | null>(null);
  
  // Performance optimization
  const requestIdleCallbackRef = useRef<NodeJS.Timeout | null>(null);
  
  // Fullscreen handler
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (gameContainerRef.current?.requestFullscreen) {
        gameContainerRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(err => {
          console.error(`Error attempting to exit full-screen mode: ${err.message}`);
        });
      }
    }
  }, []);
  
  // Check fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Optimized render count
  const renderCountRef = useRef(0);
  useEffect(() => {
    renderCountRef.current++;
  });
  
  // Tile dimensions for calculating connections
  const tileSize = useMemo(() => {
    // Calculate based on difficulty and fullscreen mode
    const baseSize = GAME_CONFIG[gameState.difficulty].minTileSize;
    return isFullscreen ? Math.max(baseSize + 20, baseSize * 1.4) : baseSize;
  }, [gameState.difficulty, isFullscreen]);
  
  const gap = useMemo(() => {
    return Math.min(Math.floor(tileSize * 0.15), isFullscreen ? 15 : 10);
  }, [tileSize, isFullscreen]);
  
  // Initialize the game with performance optimization
  const initializeGame = useCallback((difficulty: Difficulty, level = 1) => {
    // Any cleanup before initializing a new game
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (requestIdleCallbackRef.current) {
      clearTimeout(requestIdleCallbackRef.current);
      requestIdleCallbackRef.current = null;
    }
    
    // Get level configuration
    const levelConfig = LEVELS[level - 1];
    
    // Initialize tiles - use setTimeout to avoid blocking UI thread
    setTimeout(() => {
      const tiles = generateTiles(difficulty, levelConfig);
      
      // Reset timer
      startTimeRef.current = null;
      
      setGameState({
        tiles,
        selectedTiles: [],
        connections: [],
        difficulty,
        score: 0,
        elapsedTime: 0,
        gameStatus: 'waiting',
        tilesRemaining: tiles.length,
        currentLevel: level,
        successMessage: null
      });
      
      // Load high score and best time from local storage
      const savedStats = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedStats) {
        try {
          const stats = JSON.parse(savedStats);
          if (stats.highScores && stats.highScores[level]) {
            setHighScore(stats.highScores[level].score);
            
            // Set best time if available
            if (stats.highScores[level].time) {
              setBestTime(stats.highScores[level].time);
            } else {
              setBestTime(undefined);
            }
          } else {
            setHighScore(0);
            setBestTime(undefined);
          }
        } catch (e) {
          console.error("Error parsing saved stats:", e);
          setHighScore(0);
          setBestTime(undefined);
        }
      }
      
      // Clear existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 0);
  }, []);
  
  // Start the game - begin timer
  const startGame = useCallback(() => {
    // Set start time reference
    startTimeRef.current = Date.now();
    
    setGameState(prev => ({
      ...prev,
      gameStatus: 'playing',
      elapsedTime: 0
    }));
    
    // Start the timer to track elapsed time - optimize for less resource usage
    timerRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setGameState(prev => ({
          ...prev,
          elapsedTime: elapsed
        }));
      }
    }, 1000);
  }, []);
  
  // Pause game - pause timer
  const pauseGame = useCallback(() => {
    // Store current elapsed time
    const currentElapsedTime = gameState.elapsedTime;
    
    setGameState(prev => ({
      ...prev,
      gameStatus: 'paused',
    }));
    
    // Pause the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Reset start time reference to account for pause time
    startTimeRef.current = null;
  }, [gameState.elapsedTime]);
  
  // Resume game - resume timer
  const resumeGame = useCallback(() => {
    // Record new start time based on existing elapsed time
    startTimeRef.current = Date.now() - (gameState.elapsedTime * 1000);
    
    setGameState(prev => ({
      ...prev,
      gameStatus: 'playing',
    }));
    
    // Resume the timer
    timerRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setGameState(prev => ({
          ...prev,
          elapsedTime: elapsed
        }));
      }
    }, 1000);
  }, [gameState.elapsedTime]);
  
  // Reset the game
  const resetGame = useCallback(() => {
    initializeGame(gameState.difficulty, gameState.currentLevel);
  }, [gameState.difficulty, gameState.currentLevel, initializeGame]);
  
  // Change difficulty
  const changeDifficulty = useCallback((difficulty: Difficulty) => {
    initializeGame(difficulty);
  }, [initializeGame]);
  
  // Handle tile click - optimized
  const handleTileClick = useCallback((clickedTile: Tile) => {
    // Ignore clicks if game is not playing
    if (gameState.gameStatus !== 'playing') return;
    
    // Ignore clicks on matched tiles
    if (clickedTile.isMatched) return;
    
    // Ignore clicks on already selected tiles
    if (clickedTile.isSelected) {
      // Deselect the tile
      setGameState(prev => ({
        ...prev,
        selectedTiles: prev.selectedTiles.filter(tile => tile.id !== clickedTile.id),
        tiles: prev.tiles.map(tile => 
          tile.id === clickedTile.id ? { ...tile, isSelected: false } : tile
        ),
      }));
      return;
    }
    
    setGameState(prev => {
      // If no tiles are selected yet
      if (prev.selectedTiles.length === 0) {
        return {
          ...prev,
          selectedTiles: [clickedTile],
          tiles: prev.tiles.map(tile => 
            tile.id === clickedTile.id ? { ...tile, isSelected: true } : tile
          ),
        };
      }
      
      // If one tile is already selected
      const selectedTile = prev.selectedTiles[0];
      
      // Check if tiles match
      if (checkTilesMatch(selectedTile, clickedTile)) {
        // Find a valid path between the tiles
        const path = findPath(selectedTile, clickedTile, prev.tiles);
        
        if (path) {
          // Calculate connection points
          const connection = createConnection(path.path, tileSize, tileSize, gap);
          
          // Mark tiles as matched and add connection
          const updatedTiles = prev.tiles.map(tile => {
            if (tile.id === selectedTile.id || tile.id === clickedTile.id) {
              return { ...tile, isMatched: true, isSelected: false };
            }
            return tile;
          });
          
          // Calculate new score
          const newScore = prev.score + GAME_CONFIG[prev.difficulty].pointsPerMatch;
          
          // Check if all tiles are matched
          const allMatched = allTilesMatched(updatedTiles);
          
          // Show success message
          const randomSuccessMessage = SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
          const successMsg = {
            ...randomSuccessMessage,
            timestamp: Date.now()
          };
          
          // If all tiles are matched, end the game
          if (allMatched) {
            // Stop the timer and record final time
            const finalTime = prev.elapsedTime;
            
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            
            // Save high score and best time to local storage - optimize for not blocking UI thread
            setTimeout(() => {
              const savedStats = localStorage.getItem(LOCAL_STORAGE_KEY);
              let stats = {
                highScores: {} as Record<number, any>,
                lastPlayedLevel: prev.currentLevel,
                totalScore: newScore,
                matchesCompleted: 1
              };
              
              if (savedStats) {
                try {
                  stats = JSON.parse(savedStats);
                  stats.totalScore += newScore;
                  stats.matchesCompleted += 1;
                  stats.lastPlayedLevel = prev.currentLevel;
                } catch (e) {
                  console.error("Error parsing saved stats:", e);
                }
              }
              
              // Update high score and best time if current score/time is better
              let newBestTime = bestTime;
              
              // Check if this is a new high score
              const isNewHighScore = !stats.highScores[prev.currentLevel] || newScore > stats.highScores[prev.currentLevel].score;
              
              // Check if this is a new best time
              const isNewBestTime = !stats.highScores[prev.currentLevel]?.time || finalTime < stats.highScores[prev.currentLevel].time;
              
              // Update stats
              if (isNewHighScore || isNewBestTime) {
                if (!stats.highScores[prev.currentLevel]) {
                  stats.highScores[prev.currentLevel] = {
                    level: prev.currentLevel,
                    score: newScore,
                    time: finalTime,
                    date: new Date().toISOString()
                  };
                } else {
                  if (isNewHighScore) {
                    stats.highScores[prev.currentLevel].score = newScore;
                  }
                  
                  if (isNewBestTime) {
                    stats.highScores[prev.currentLevel].time = finalTime;
                    newBestTime = finalTime;
                  }
                  
                  stats.highScores[prev.currentLevel].date = new Date().toISOString();
                }
                
                setHighScore(isNewHighScore ? newScore : stats.highScores[prev.currentLevel].score);
                setBestTime(newBestTime);
              }
              
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stats));
            }, 0);
            
            // Show game over modal after a delay
            setTimeout(() => {
              setShowGameOverModal(true);
            }, 1500);
            
            return {
              ...prev,
              tiles: updatedTiles,
              selectedTiles: [],
              connections: [...prev.connections, connection],
              score: newScore,
              gameStatus: 'completed',
              tilesRemaining: 0,
              successMessage: successMsg
            };
          }
          
          // Remove connection and success message after animation
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              connections: prev.connections.filter(c => c !== connection),
              successMessage: null
            }));
          }, ANIMATION_DURATION.MATCH);
          
          return {
            ...prev,
            tiles: updatedTiles,
            selectedTiles: [],
            connections: [...prev.connections, connection],
            score: newScore,
            tilesRemaining: updatedTiles.filter(t => !t.isMatched).length,
            successMessage: successMsg
          };
        }
      }
      
      // If tiles don't match or no valid path, select the new tile and deselect the old one
      return {
        ...prev,
        selectedTiles: [clickedTile],
        tiles: prev.tiles.map(tile => 
          tile.id === clickedTile.id ? { ...tile, isSelected: true } : 
          { ...tile, isSelected: false }
        ),
      };
    });
  }, [gameState.gameStatus, bestTime, tileSize, gap]);
  
  // Initialize the game on mount
  useEffect(() => {
    initializeGame(Difficulty.EASY);
    
    // Start the game immediately instead of waiting for user to press Start
    // (since GameIntroModal has been removed)
    startGame();
    
    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (requestIdleCallbackRef.current) {
        clearTimeout(requestIdleCallbackRef.current);
      }
    };
  }, [initializeGame, startGame]);
  
  return (
    <div className="min-h-screen bg-[#0a0f1a]" ref={gameContainerRef}>
      {!isFullscreen && <ThanhDieuHuongResponsive />}
      
      {/* Game container */}
      <div className={`container mx-auto px-4 py-8 game-container ${isFullscreen ? 'fullscreen-mode' : ''}`}>
        {/* Header - Hide in fullscreen */}
        {!isFullscreen && (
          <div className="mb-6 mt-12 text-center relative">
            {/* Back button */}
            <Link
              href="/minigames"
              className="absolute left-0 top-0 text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-all"
              title="Quay lại trang Minigames"
            >
              <FaArrowLeft className="text-xl" />
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                M-SCI: Memory Connect Challenge
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Connect matching symbol pairs to complete the challenge.
              <span className="hidden md:inline"><br /></span> 
              Test your memory with 100 progressively challenging levels!
            </p>
          </div>
        )}
        
        {/* Game Status Bar */}
        <div className="mb-6 flex items-center justify-between gap-4">
          {/* Game status & stats */}
          <div className="flex-1">
            <GameStatus
              score={gameState.score}
              tilesRemaining={gameState.tilesRemaining}
              elapsedTime={gameState.elapsedTime}
              difficulty={gameState.difficulty}
              gameStatus={gameState.gameStatus}
              currentLevel={gameState.currentLevel}
              highScore={highScore}
              bestTime={bestTime}
            />
          </div>
          
          {/* Game Controls - Simplified */}
          <div className="flex items-center gap-2">
            {/* Start/Pause/Resume Button */}
            {gameState.gameStatus === 'waiting' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 px-5 rounded-md font-medium transition-all shadow-md shadow-green-500/30 flex items-center gap-2"
              >
                <FaPlay className="text-sm" />
                <span className="hidden sm:inline">Start</span>
              </motion.button>
            )}
            
            {gameState.gameStatus === 'playing' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={pauseGame}
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white py-2 px-5 rounded-md font-medium transition-all shadow-md shadow-yellow-500/30 flex items-center gap-2"
              >
                <FaPause className="text-sm" />
                <span className="hidden sm:inline">Pause</span>
              </motion.button>
            )}
            
            {gameState.gameStatus === 'paused' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resumeGame}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 px-5 rounded-md font-medium transition-all shadow-md shadow-green-500/30 flex items-center gap-2"
              >
                <FaPlay className="text-sm" />
                <span className="hidden sm:inline">Resume</span>
              </motion.button>
            )}
            
            {/* Restart Button */}
            {(gameState.gameStatus === 'playing' || gameState.gameStatus === 'paused' || gameState.gameStatus === 'completed' || gameState.gameStatus === 'failed') && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-2 px-5 rounded-md font-medium transition-all shadow-md shadow-gray-600/30 flex items-center gap-2"
              >
                <FaRedo className="text-sm" />
                <span className="hidden sm:inline">Restart</span>
              </motion.button>
            )}
            
            {/* Fullscreen button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFullscreen}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2 px-4 rounded-md font-medium transition-all shadow-md shadow-indigo-500/30 flex items-center gap-2"
            >
              {isFullscreen ? <FaCompressAlt className="text-sm" /> : <FaExpandAlt className="text-sm" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
            </motion.button>
          </div>
        </div>
        
        {/* Game board */}
        <div className={`game-board-container bg-gray-900/40 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-6 shadow-lg ${isFullscreen ? 'fullscreen-game-board' : ''}`}>
          <GameBoard
            tiles={gameState.tiles}
            connections={gameState.connections}
            onTileClick={handleTileClick}
            gameStatus={gameState.gameStatus}
            successMessage={gameState.successMessage}
          />
        </div>
      </div>
      
      {/* Modals */}
      <GameOverModal
        isOpen={showGameOverModal}
        onClose={() => setShowGameOverModal(false)}
        onRestart={resetGame}
        score={gameState.score}
        isSuccess={gameState.gameStatus === 'completed'}
        difficulty={gameState.difficulty}
        currentLevel={gameState.currentLevel}
        highScore={highScore}
        elapsedTime={gameState.elapsedTime}
        bestTime={bestTime}
        onNextLevel={() => {
          const nextLevel = gameState.currentLevel + 1;
          if (nextLevel <= 100) {
            setGameState(prev => ({
              ...prev,
              currentLevel: nextLevel
            }));
            setShowGameOverModal(false);
            initializeGame(gameState.difficulty, nextLevel);
          }
        }}
      />
      
      {!isFullscreen && <Footer />}
    </div>
  );
};

export default MemoryConnect; 