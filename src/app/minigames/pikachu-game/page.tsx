'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Timer from './components/Timer';
import Board from './components/Board';
import { CardType } from './components/Card';
import { createShuffledCards, isMatch, calculateScore } from './utils/gameUtils';
import { checkPathExists } from './utils/pathFinding';
import Image from 'next/image';
import HelpModal from './components/HelpModal';

// Thiết lập trò chơi
const ROWS = 6;
const COLS = 6;
const INITIAL_TIME = 180; // 3 phút

const PikachuGame: React.FC = () => {
  // Trạng thái trò chơi
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Component để buộc Timer re-render khi reset
  const [timerKey, setTimerKey] = useState(0);

  // Khởi tạo trò chơi
  const initGame = useCallback(() => {
    const shuffledCards = createShuffledCards(ROWS, COLS);
    setCards(shuffledCards);
    setSelectedCards([]);
    setMatchedPairs([]);
    setIsAnimating(false);
    setGameOver(false);
    setIsPaused(false);
    setScore(0);
    // Đảm bảo thời gian được reset hoàn toàn
    setTimeLeft(INITIAL_TIME);
    setGameStarted(true);
  }, []);

  // Hàm để khởi động game mới và đảm bảo reset thời gian
  const handleRestart = useCallback(() => {
    // Tăng key để buộc Timer re-render
    setTimerKey(prevKey => prevKey + 1);
    // Reset game
    initGame();
  }, [initGame]);

  // Xử lý khi thời gian kết thúc
  const handleTimeUp = useCallback(() => {
    setGameOver(true);
    const finalScore = calculateScore(
      0,
      INITIAL_TIME,
      matchedPairs.length,
      (ROWS * COLS) / 2
    );
    setScore(finalScore);
  }, [matchedPairs.length]);

  // Xử lý cập nhật thời gian
  const handleTimeUpdate = useCallback((newTime: number) => {
    // Sử dụng dạng hàm của setState để tránh lỗi cập nhật khi rendering
    // và để đảm bảo luôn lấy giá trị mới nhất
    if (newTime !== timeLeft) {
      setTimeLeft(prev => newTime);
    }
  }, [timeLeft]);

  // Xử lý khi người chơi chọn thẻ
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

    // Nếu đã chọn 2 thẻ
    if (newSelected.length === 2) {
      const [card1, card2] = newSelected;

      // Ngăn chặn trường hợp chọn cùng một thẻ
      if (card1.id === card2.id) {
        setTimeout(() => {
          setSelectedCards([]);
        }, 800);
        return;
      }

      // Kiểm tra nếu hai thẻ có cùng giá trị
      if (isMatch(card1, card2)) {
        console.log("Thẻ khớp nhau:", card1.value, card2.value);
        
        // Bỏ qua kiểm tra đường đi và luôn đánh dấu thẻ đã khớp
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
              return [...prev, `${card1.value}`];
            }
            return prev;
          });

          setSelectedCards([]);
          setIsAnimating(false);
        }, 500);
      } else {
        console.log("Thẻ không khớp:", card1.value, card2.value);
        
        // Hai thẻ không khớp
        setTimeout(() => {
          setSelectedCards([]);
        }, 800);
      }
    }
  }, [cards, isPaused, gameOver, selectedCards, isAnimating]);

  // Kiểm tra khi tất cả cặp đã được ghép nối
  useEffect(() => {
    if (gameStarted && matchedPairs.length === (ROWS * COLS) / 2) {
      setGameOver(true);
      const finalScore = calculateScore(
        timeLeft,
        INITIAL_TIME,
        matchedPairs.length,
        (ROWS * COLS) / 2
      );
      setScore(finalScore);
    }
  }, [matchedPairs.length, timeLeft, gameStarted]);

  // Chuyển đổi trạng thái tạm dừng
  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  // Mở/đóng modal hướng dẫn
  const toggleHelp = () => {
    setIsHelpOpen(prev => !prev);
    if (gameStarted) {
      setIsPaused(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-indigo-900 py-4 md:py-8">
      <div className="container mx-auto px-2 md:px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4 md:mb-6 relative">
            <a 
              href="/minigames" 
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors flex items-center"
              aria-label="Quay lại"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span className="ml-1 hidden md:inline">Quay lại</span>
            </a>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-lg">Pikachu Game</h1>
            <p className="text-white text-base md:text-lg mt-1 md:mt-2">Kết nối các Pokémon giống nhau</p>
            <button 
              onClick={toggleHelp}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              aria-label="Hướng dẫn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
            </button>
          </div>

          {!gameStarted ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-4 md:p-8 text-center">
              <div className="mb-4 md:mb-6 relative w-32 h-32 md:w-48 md:h-48 mx-auto">
                <Image 
                  src="/images/minigam/1.png"
                  alt="Hình ảnh trò chơi" 
                  width={200} 
                  height={200}
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-blue-800">Chào mừng đến với Pikachu Game!</h2>
              <p className="mb-4 md:mb-6 text-gray-700 text-sm md:text-lg">
                Kết nối các Pokémon giống nhau bằng đường thẳng có tối đa ba khúc ngoặt.
                Bạn có 3 phút để hoàn thành trò chơi.
              </p>
              <div className="flex justify-center space-x-3 md:space-x-4">
                <button
                  onClick={initGame}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 md:py-3 px-4 md:px-8 rounded-full transition-all transform hover:scale-105 shadow-lg text-sm md:text-base"
                >
                  Bắt đầu
                </button>
                <button
                  onClick={toggleHelp}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 md:py-3 px-3 md:px-6 rounded-full transition-all hover:scale-105 shadow-lg text-sm md:text-base"
                >
                  Hướng dẫn
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-3 md:p-6">
              <div className="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-2">
                <div className="px-3 py-1 md:px-4 md:py-2 bg-blue-100 rounded-lg shadow-sm text-sm md:text-base">
                  <span className="font-bold text-blue-800">Số cặp: </span>
                  <span className="text-blue-600 font-bold">{matchedPairs.length}</span>
                  <span className="text-gray-500">/{(ROWS * COLS) / 2}</span>
                </div>
                
                <div className="w-full sm:w-auto order-3 sm:order-2 mt-2 sm:mt-0">
                  <Timer
                    key={timerKey}
                    initialTime={INITIAL_TIME}
                    isRunning={gameStarted && !isPaused && !gameOver}
                    onTimeUp={handleTimeUp}
                    onTimeUpdate={handleTimeUpdate}
                  />
                </div>
                
                <div className="flex space-x-1 md:space-x-2 order-2 sm:order-3">
                  <button
                    onClick={toggleHelp}
                    className="py-1 md:py-2 px-2 md:px-4 rounded-lg shadow-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-colors text-sm md:text-base"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={togglePause}
                    className={`py-1 md:py-2 px-2 md:px-4 rounded-lg shadow-md transition-colors text-sm md:text-base ${
                      isPaused
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-yellow-500 hover:bg-yellow-600'
                    } text-white font-medium`}
                    disabled={gameOver}
                  >
                    {isPaused ? 'Tiếp tục' : 'Tạm dừng'}
                  </button>
                  
                  <button
                    onClick={handleRestart}
                    className="py-1 md:py-2 px-2 md:px-4 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors text-sm md:text-base"
                  >
                    Chơi lại
                  </button>
                </div>
              </div>

              <div className="flex justify-center w-full overflow-hidden">
                <Board
                  cards={cards}
                  onCardClick={handleCardClick}
                  selectedCards={selectedCards}
                  matchedPairs={matchedPairs}
                  isAnimating={isAnimating}
                  isPaused={isPaused}
                  isGameOver={gameOver}
                />
              </div>

              {gameOver && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
                    <div className="w-32 h-32 mx-auto mb-4 relative">
                      {matchedPairs.length === (ROWS * COLS) / 2 ? (
                        <Image 
                          src="/images/minigam/3.png"
                          alt="Chiến thắng" 
                          width={120} 
                          height={120}
                          className="object-contain"
                        />
                      ) : (
                        <Image 
                          src="/images/minigam/7.png"
                          alt="Thất bại" 
                          width={120} 
                          height={120}
                          className="object-contain"
                        />
                      )}
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">
                      {matchedPairs.length === (ROWS * COLS) / 2
                        ? 'Chúc mừng! Bạn đã chiến thắng!'
                        : 'Hết thời gian!'}
                    </h2>
                    <div className="text-center mb-6">
                      <p className="text-xl mb-2 font-bold">
                        Điểm số: <span className="text-blue-600">{score}</span>
                      </p>
                      <p className="text-gray-700">
                        Số cặp đã ghép: <span className="font-bold">{matchedPairs.length}</span>/{(ROWS * COLS) / 2}
                      </p>
                      <p className="text-gray-700">
                        Thời gian còn lại: <span className="font-bold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={handleRestart}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
                      >
                        Chơi lại
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Modal hướng dẫn */}
          <HelpModal isOpen={isHelpOpen} onClose={toggleHelp} />
        </div>
      </div>
    </div>
  );
};

export default PikachuGame; 