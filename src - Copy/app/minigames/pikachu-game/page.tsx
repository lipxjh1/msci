'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiSettings, FiRefreshCw, FiAward, FiInfo, FiHelpCircle, FiPlay, FiPause } from 'react-icons/fi';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import Footer from '@/app/home/components/Footer';
import Timer from './components/Timer';
import Board from './components/Board';
import { CardType } from './components/Card';
import { createShuffledCards, isMatch, calculateScore } from './utils/gameUtils';

// Game setup
const ROWS = 6;
const COLS = 6;
const INITIAL_TIME = 180; // 3 minutes

// Array of congratulatory messages and emojis when finding a pair
const CONGRATULATION_MESSAGES = [
  { text: "Excellent! You found a match!", emoji: "🎉" },
  { text: "Perfect match!", emoji: "✨" },
  { text: "Correct! Keep going!", emoji: "👏" },
  { text: "Outstanding!", emoji: "🌟" },
  { text: "Great memory!", emoji: "🧠" },
  { text: "You're really talented!", emoji: "🔥" },
  { text: "Fantastic memory!", emoji: "💯" },
  { text: "Any more pairs left?", emoji: "🤔" },
  { text: "You're doing great!", emoji: "👍" },
  { text: "Keep up the momentum!", emoji: "🚀" },
  { text: "Wow! You found a match!", emoji: "😲" },
  { text: "That's right! Continue!", emoji: "🎮" },
  { text: "Amazing work!", emoji: "💫" },
  { text: "Perfect pair!", emoji: "💕" },
  { text: "Correct! You're so good!", emoji: "🏆" },
  { text: "Unbelievable! So skilled!", emoji: "😍" },
  { text: "Impressive progress!", emoji: "📈" },
  { text: "Another pair down!", emoji: "🎯" },
  { text: "That's right!", emoji: "🥳" },
  { text: "Superhuman memory!", emoji: "🧩" },
];

const PikachuGame: React.FC = () => {
  // Game state
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [matchMessage, setMatchMessage] = useState<{text: string, emoji: string} | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Component to force Timer re-render when reset
  const [timerKey, setTimerKey] = useState(0);

  // Initialize the game with appropriate number of cells based on difficulty
  const initGame = useCallback(() => {
    let rows = ROWS;
    let cols = COLS;
    let time = INITIAL_TIME;
    
    // Adjust board size and time according to difficulty
    if (difficulty === 'easy') {
      rows = 4;
      cols = 4;
      time = 240; // 4 minutes
    } else if (difficulty === 'medium') {
      rows = 6;
      cols = 6;
      time = 180; // 3 minutes
    } else if (difficulty === 'hard') {
      rows = 6;
      cols = 8;
      time = 150; // 2.5 minutes
    }
    
    const shuffledCards = createShuffledCards(rows, cols);
    setCards(shuffledCards);
    setSelectedCards([]);
    setMatchedPairs([]);
    setIsAnimating(false);
    setGameOver(false);
    setIsPaused(false);
    setScore(0);
    setTimeLeft(time);
    setGameStarted(true);
  }, [difficulty]);

  // Function to start a new game and ensure time reset
  const handleRestart = useCallback(() => {
    // Increase key to force Timer re-render
    setTimerKey(prevKey => prevKey + 1);
    // Reset game
    initGame();
  }, [initGame]);

  // Handle when time is up
  const handleTimeUp = useCallback(() => {
    setGameOver(true);
    const finalScore = calculateScore(
      0,
      INITIAL_TIME,
      matchedPairs.length,
      (cards.length / 2)
    );
    setScore(finalScore);
  }, [matchedPairs.length, cards.length]);

  // Handle time update
  const handleTimeUpdate = useCallback((newTime: number) => {
    if (newTime !== timeLeft) {
      setTimeLeft(newTime);
    }
  }, [timeLeft]);

  // Show congratulation message when finding a pair
  const showCongratulation = useCallback(() => {
    // Select a random message
    const randomMessage = CONGRATULATION_MESSAGES[Math.floor(Math.random() * CONGRATULATION_MESSAGES.length)];
    setMatchMessage(randomMessage);
    
    // Clear message after 2 seconds
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      setMatchMessage(null);
      timerRef.current = null;
    }, 2000);
  }, []);

  // Handle when player selects a card
  const handleCardClick = useCallback((card: CardType) => {
    if (
      isPaused ||
      gameOver ||
      card.isMatched ||
      selectedCards.length === 2 ||
      isAnimating ||
      selectedCards.some((selected) => selected.id === card.id)
    ) {
      return;
    }

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    // If two cards are selected
    if (newSelected.length === 2) {
      const [card1, card2] = newSelected;

      // Prevent selecting the same card
      if (card1.id === card2.id) {
        setTimeout(() => {
          setSelectedCards([]);
        }, 800);
        return;
      }

      // Check if the two cards have the same value
      if (isMatch(card1, card2)) {
        setIsAnimating(true);

        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(c => {
              if (c.id === card1.id || c.id === card2.id) {
                return { ...c, isMatched: true };
              }
              return c;
            })
          );
          
          setMatchedPairs(prev => {
            if (!prev.includes(`${card1.value}`)) {
              // Show congratulation message
              showCongratulation();
              // Increase score
              setScore(prevScore => prevScore + 100);
              return [...prev, `${card1.value}`];
            }
            return prev;
          });

          setSelectedCards([]);
          setIsAnimating(false);
        }, 500);
      } else {
        // Two cards don't match
        setTimeout(() => {
          setSelectedCards([]);
        }, 800);
      }
    }
  }, [cards, isPaused, gameOver, selectedCards, isAnimating, showCongratulation]);

  // Check when all pairs have been matched
  useEffect(() => {
    if (gameStarted && matchedPairs.length > 0 && matchedPairs.length === (cards.length / 2)) {
      setGameOver(true);
      const finalScore = calculateScore(
        timeLeft,
        INITIAL_TIME,
        matchedPairs.length,
        (cards.length / 2)
      );
      setScore(finalScore);
    }
  }, [matchedPairs.length, timeLeft, gameStarted, cards.length]);

  // Clear timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Toggle pause state
  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  // Change difficulty level
  const changeDifficulty = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    if (difficulty !== newDifficulty) {
      setDifficulty(newDifficulty);
      // Restart game with new difficulty if game has started
      if (gameStarted) {
        setTimeout(() => {
          handleRestart();
        }, 100);
      }
    }
  };

  // Render game board
  const renderGameBoard = () => {
    return (
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Game board section */}
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-[#1a2234] rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] overflow-hidden relative">
            <Board 
              cards={cards}
              selectedCards={selectedCards}
              onCardClick={handleCardClick}
              isAnimating={isAnimating}
              matchedPairs={matchedPairs}
              isPaused={isPaused}
              isGameOver={gameOver}
            />
            
            {/* Display congratulation message */}
            <AnimatePresence>
              {matchMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg z-20"
                >
                  <div className="flex items-center text-white font-bold">
                    <span className="text-2xl mr-2">{matchMessage.emoji}</span>
                    <span>{matchMessage.text}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="mt-6 flex space-x-3">
            <button 
              className={`px-5 py-2.5 rounded-lg text-white font-medium flex items-center shadow-lg hover:shadow-xl transition-all ${
                isPaused 
                ? 'bg-green-600 hover:bg-green-500' 
                : 'bg-yellow-600 hover:bg-yellow-500'
              }`}
              onClick={togglePause}
              disabled={gameOver || !gameStarted}
            >
              {isPaused ? (
                <><FiPlay className="mr-2" /> Resume</>
              ) : (
                <><FiPause className="mr-2" /> Pause</>
              )}
            </button>
            
            <button 
              className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-lg text-white font-medium flex items-center shadow-lg hover:shadow-xl transition-all"
              onClick={handleRestart}
            >
              <FiRefreshCw className="mr-2" /> Restart
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
  };

  // Game status rendering
  const renderGameStatus = () => {
    return (
      <div className="bg-[#1a2234] rounded-lg p-5 mb-5 relative shadow-lg border border-[#2e3a54]">
        <h2 className="text-xl font-bold mb-3 flex items-center text-white">
          <FiInfo className="mr-2 text-blue-400" /> Status
        </h2>
        
        <div className="flex items-center mb-3">
          <div className="w-full bg-[#111827] rounded-full h-5">
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-5 rounded-full flex items-center justify-end pr-2 text-xs font-medium"
              initial={{ width: '0%' }}
              animate={{ width: `${cards.length > 0 ? (matchedPairs.length / (cards.length / 2)) * 100 : 0}%` }}
              transition={{ duration: 0.5 }}
            >
            </motion.div>
          </div>
          <span className="ml-3 font-medium text-white">
            Progress: {matchedPairs.length}/{cards.length > 0 ? (cards.length / 2) : 0}
          </span>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div className="px-4 py-2 bg-blue-900/50 rounded-lg">
            <span className="text-blue-300 font-medium">Score: {score}</span>
          </div>
          
          <div className="px-4 py-2 bg-purple-900/50 rounded-lg">
            <span className="text-purple-300 font-medium">
              Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
        
        <div className="text-center font-bold text-lg">
          {gameOver ? (
            cards.length > 0 && matchedPairs.length === (cards.length / 2) ? (
              <span className="text-green-300">Congratulations! You completed the game!</span>
            ) : (
              <span className="text-red-300">Time's up! Try again!</span>
            )
          ) : isPaused ? (
            <span className="text-yellow-300">Paused</span>
          ) : (
            <span className="text-green-300">Playing...</span>
          )}
        </div>
        
        {gameStarted && !gameOver && (
          <div className="mt-4">
            <Timer
              key={timerKey}
              initialTime={timeLeft}
              isRunning={gameStarted && !isPaused && !gameOver}
              onTimeUp={handleTimeUp}
              onTimeUpdate={handleTimeUpdate}
            />
          </div>
        )}
      </div>
    );
  };

  // Settings rendering
  const renderSettings = () => {
    return (
      <div className="bg-[#1a2234] rounded-lg p-5 shadow-lg border border-[#2e3a54]">
        <h2 className="text-xl font-bold mb-4 flex items-center text-white">
          <FiSettings className="mr-2 text-indigo-400" /> Settings
        </h2>
        
        <div className="mb-5">
          <h3 className="text-sm font-medium mb-2 text-gray-200">Select difficulty:</h3>
          <div className="flex flex-col space-y-2">
            <button 
              className={`py-2.5 rounded-md font-medium transition-all ${
                difficulty === 'easy' 
                  ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg' 
                  : 'bg-[#111827] text-gray-300 hover:bg-[#1d2536]'
              }`}
              onClick={() => changeDifficulty('easy')}
              disabled={gameStarted && !gameOver}
            >
              Easy (4x4)
            </button>
            <button 
              className={`py-2.5 rounded-md font-medium transition-all ${
                difficulty === 'medium' 
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-700 text-white shadow-lg' 
                  : 'bg-[#111827] text-gray-300 hover:bg-[#1d2536]'
              }`}
              onClick={() => changeDifficulty('medium')}
              disabled={gameStarted && !gameOver}
            >
              Medium (6x6)
            </button>
            <button 
              className={`py-2.5 rounded-md font-medium transition-all ${
                difficulty === 'hard' 
                  ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg' 
                  : 'bg-[#111827] text-gray-300 hover:bg-[#1d2536]'
              }`}
              onClick={() => changeDifficulty('hard')}
              disabled={gameStarted && !gameOver}
            >
              Hard (6x8)
            </button>
          </div>
          <p className="text-xs text-blue-300 mt-2">
            {gameStarted && !gameOver ? 
              "Difficulty can only be changed when the game ends" : 
              "Select difficulty before starting the game"}
          </p>
        </div>
        
        <div className="mt-4 space-y-2">
          <button
            onClick={() => setShowHowToPlay(true)}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md font-medium hover:from-blue-700 hover:to-blue-900 transition-colors shadow-md"
          >
            <FiHelpCircle className="inline mr-2" /> How to Play
          </button>
          
          {!gameStarted && (
            <button
              onClick={initGame}
              className="w-full py-2.5 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-md font-medium hover:from-green-700 hover:to-green-900 transition-colors shadow-md"
            >
              <FiPlay className="inline mr-2" /> Start Game
            </button>
          )}
        </div>
      </div>
    );
  };

  // Render welcome screen
  const renderWelcomeScreen = () => {
    return (
      <div className="max-w-4xl mx-auto bg-[#1a2234] rounded-xl shadow-2xl p-8 border border-blue-900/50">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            M-SCI: Discover the Heroes World
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"></div>
          
          <div className="w-32 h-32 relative mb-4">
            <Image 
              src="/images/minigam/2.png" 
              alt="M-SCI Card Match" 
              fill
              className="object-contain"
            />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Welcome to M-SCI Card Match!
          </h2>
          
          <p className="text-gray-300 text-center mb-6 max-w-2xl">
            In this game, you'll challenge your memory and observation skills by finding and matching identical heroes from the M-SCI world of 2049 - where technology and humans are facing off on a global scale.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-8">
            <div className="bg-[#111827] rounded-lg p-4 border border-blue-900/30">
              <h3 className="text-lg font-medium text-blue-400 mb-2">How to Play:</h3>
              <ul className="text-gray-300 space-y-2 list-disc pl-5">
                <li>Flip cards and look for matching M-SCI characters</li>
                <li>Match as many pairs as possible within the time limit</li>
                <li>Discover a diverse cast of characters from Gunners to Snipers to Rockets</li>
                <li>Get to know Victoria, Akane, Alice, Caitlyn and many other heroes from the M-SCI universe</li>
              </ul>
            </div>
            
            <div className="bg-[#111827] rounded-lg p-4 border border-blue-900/30">
              <h3 className="text-lg font-medium text-purple-400 mb-2">Key Features:</h3>
              <ul className="text-gray-300 space-y-2 list-disc pl-5">
                <li>Immersive experience with beautiful character art and modern design</li>
                <li>Connect with the rich M-SCI story about the battle to protect humanity</li>
                <li>Challenge your memory with different difficulty levels</li>
                <li>Awaken your fighting spirit and quick reflexes</li>
              </ul>
            </div>
          </div>
          
          <button
            onClick={initGame}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform transition-all hover:scale-105"
          >
            Start playing now
          </button>
        </div>
      </div>
    );
  };

  // Back button component
  const BackButton = () => (
    <Link href="/minigames" className="inline-flex items-center text-blue-300 hover:text-blue-200 font-medium transition-colors">
      <FiArrowLeft className="mr-2" />
      <span>Back to Mini Games</span>
    </Link>
  );

  // How to play modal
  const renderHowToPlayModal = () => {
    return (
      <AnimatePresence>
        {showHowToPlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1a2234] rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-blue-900/50"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">How to Play</h2>
                <button
                  onClick={() => setShowHowToPlay(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="prose prose-invert prose-blue max-w-none">
                <h3 className="text-blue-400">Game Objective</h3>
                <p>Find and match all card pairs with identical images within the time limit.</p>
                
                <h3 className="text-blue-400">How to Play</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Click on a card to flip it.</li>
                  <li>Click on a second card to find a match.</li>
                  <li>If the two cards match, they will disappear from the board.</li>
                  <li>If they don't match, both cards will flip back down.</li>
                  <li>Continue until you find all pairs or run out of time.</li>
                </ol>
                
                <h3 className="text-blue-400">Difficulty Levels</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="text-green-400 font-bold">Easy:</span> Longer time, fewer cards.</li>
                  <li><span className="text-yellow-400 font-bold">Medium:</span> Moderate number of cards, adequate time.</li>
                  <li><span className="text-red-400 font-bold">Hard:</span> More cards, less time, more complex card arrangements.</li>
                </ul>
                
                <h3 className="text-blue-400">Helpful Tips</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Try to remember the positions of cards you've flipped.</li>
                  <li>Prioritize finding pairs you've already seen before.</li>
                  <li>Stay focused and avoid flipping many unrelated cards.</li>
                </ul>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowHowToPlay(false)}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#0a141e] to-[#1a2634]">
      <ThanhDieuHuongResponsive />
      
      {/* Add padding to prevent overlap with navigation bar */}
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-6xl mx-auto">
            <div className="mb-6">
              <BackButton />
            </div>
            
            {!gameStarted ? renderWelcomeScreen() : renderGameBoard()}
            {renderHowToPlayModal()}
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default PikachuGame; 