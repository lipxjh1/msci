"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGamepad, FaSearch, FaRegStar, FaStar, FaFilter, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import Footer from '@/app/home/components/Footer';

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  category: string[];
  rating: number;
  badge?: {
    text: string;
    color: string;
  };
}

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="text-sm">
          {star <= rating ? (
            <FaStar className="text-yellow-400" />
          ) : (
            <FaRegStar className="text-gray-400" />
          )}
        </span>
      ))}
      <span className="ml-1 text-xs text-gray-400">{rating.toFixed(1)}</span>
    </div>
  );
};

// Main Component
export default function MinigamesHome() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // State for carousel
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  
  const categories = ['Casual', 'Puzzle', 'Strategy', 'Arcade', 'Board Game', 'Card Game'];
  
  const games: GameCardProps[] = [
    {
      title: 'Breakout Arcade',
      description: 'Classic arcade game where you control a paddle to break bricks with a bouncing ball. Test your reflexes and aim for the highest score!',
      image: '/images/minigame/breakout.jpg',
      link: '/minigames/breakout',
      category: ['Arcade', 'Casual'],
      rating: 4.6,
      badge: {
        text: 'New',
        color: '4CAF50'
      }
    },
    {
      title: 'MSCI Emoji Match',
      description: 'Challenge your memory in this fun emoji matching game. Find all the matching pairs before time runs out to score points!',
      image: '/images/minigame/msci-emoji.jpg',
      link: '/minigames/msci-emoji',
      category: ['Puzzle', 'Casual'],
      rating: 4.7,
      badge: {
        text: 'New',
        color: '9C27B0'
      }
    },
    {
      title: 'MSCI Clicker',
      description: 'Click as fast as you can to collect MSCI coins in this addictive clicker game. How many coins can you gather in just 10 seconds?',
      image: '/images/minigame/msci-clicker.jpg',
      link: '/minigames/msci-clicker',
      category: ['Arcade', 'Casual'],
      rating: 4.8,
      badge: {
        text: 'New',
        color: '4CAF50'
      }
    },
    {
      title: 'Tic Tac Toe with Akane',
      description: 'Challenge your strategic thinking against Akane, an intelligent AI with multiple difficulty levels. Can you defeat her in this classic board game?',
      image: '/images/minigame/tictac.jpg',
      link: '/minigames/tic-tac-toe',
      category: ['Strategy', 'Board Game', 'Casual'],
      rating: 4.5,
      badge: {
        text: 'Popular',
        color: 'F44336'
      }
    },
    
    {
      title: 'M-SCI: Memory Connect Challenge',
      description: 'Connect matching symbol pairs to decrypt the X-Corp system. A memory-based puzzle game set in the M-SCI universe in 2049.',
      image: '/images/minigame/memory.jpg',
      link: '/minigames/memory-connect',
      category: ['Puzzle', 'Strategy', 'Casual'],
      rating: 4.7,
      badge: {
        text: 'New',
        color: '4CAF50'
      }
    },

    {
      title: 'M-SCI Card Match',
      description: 'Match identical cards featuring heroes from the M-SCI universe in this memory challenge. Test your memory skills while discovering characters like Victoria, Akane and other heroes!',
      image: '/images/minigame/card.jpg',
      link: '/minigames/pikachu-game',
      category: ['Puzzle', 'Casual'],
      rating: 4.3,
      badge: {
        text: 'Family',
        color: '9C27B0'
      }
    }
  ];
  
  // Auto rotation for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGameIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [games.length]);
  
  // Manual navigation for carousel
  const goToNextGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex + 1) % games.length);
  };
  
  const goToPrevGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length);
  };
  
  // Filter games based on search and category
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? game.category.includes(selectedCategory) : true;
    return matchesSearch && matchesCategory;
  });
  
  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };
  
  // Current game in carousel
  const currentGame = games[currentGameIndex];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a141e] to-[#1a2634]">
      <ThanhDieuHuongResponsive />
      
      {/* Hero section */}
      <div className="relative w-full h-[50vh] overflow-hidden pt-40">
        {/* Background image with parallax effect */}
        <div className="absolute inset-0">
          <Image
            src="/images/banner/trangchu.jpg"
            alt="Mini Games"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-110"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a141e]/70 via-transparent to-[#0a141e] z-10"></div>

          {/* Animated particles */}
          <div className="absolute inset-0 z-10">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50 animate-pulse delay-100"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-200"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse delay-300"></div>
          </div>

          {/* Add scanline effect */}
          <div className="absolute inset-0 scanline"></div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-orbitron text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo">
                <span className="relative inline-block">
                  MINI GAMES
                  <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform rotate-1 scale-110 z-20"></div>
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform -rotate-1 scale-110 z-20"></div>
      </div>

      {/* Main content */}
      <div className="w-full px-4 pt-16 pb-20 relative z-30">
        <div className="max-w-full mx-auto">
          {/* Mini Games Collection - Carousel */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 relative inline-block">
              Mini Games Collection
              <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
            </h2>
            
            <div className="relative mx-auto max-w-4xl">
              <div className="relative overflow-hidden rounded-xl">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentGameIndex}
                    initial={{ opacity: 0, x: 100, filter: 'blur(8px)' }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      filter: 'blur(0px)',
                      transition: { 
                        duration: 0.7,
                        ease: [0.25, 0.1, 0.25, 1.0],
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: -100, 
                      filter: 'blur(8px)',
                      transition: {
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1.0],
                      }
                    }}
                    className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg relative"
                  >
                    {/* Thêm hiệu ứng ánh sáng nền */}
                    <div className="absolute -left-40 -top-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -right-40 -bottom-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    
                    <div className="flex flex-col md:flex-row relative z-10">
                      <div className="w-full md:w-1/2 relative h-[300px] group overflow-hidden">
                        <motion.div
                          initial={{ scale: 1.0 }}
                          animate={{ 
                            scale: 1.05,
                            transition: { 
                              duration: 5, 
                              ease: "easeInOut",
                              repeat: Infinity,
                              repeatType: "reverse"
                            }
                          }}
                          className="w-full h-full"
                        >
                          <Image
                            src={currentGame.image}
                            alt={currentGame.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] via-[#1a2634]/20 to-transparent opacity-70"></div>
                        {currentGame.badge && (
                          <motion.div 
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ 
                              y: 0, 
                              opacity: 1,
                              transition: { 
                                delay: 0.3,
                                duration: 0.5
                              }
                            }}
                            className="absolute top-4 left-4 p-2 px-3 bg-[#${currentGame.badge.color}]/30 backdrop-blur-sm rounded-md border border-[#${currentGame.badge.color}]/30 shadow-lg shadow-[#${currentGame.badge.color}]/20"
                          >
                            <span className="text-white font-medium text-sm">
                              {currentGame.badge.text}
                            </span>
                          </motion.div>
                        )}
                        
                        {/* Hiệu ứng ánh sáng khi hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                      <div className="w-full md:w-1/2 p-6 flex flex-col justify-between relative">
                        <div>
                          <motion.h3 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ 
                              y: 0, 
                              opacity: 1,
                              transition: { duration: 0.5, delay: 0.2 }
                            }}
                            className="text-2xl font-bold text-white mb-3"
                          >
                            {currentGame.title}
                          </motion.h3>
                          <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ 
                              y: 0, 
                              opacity: 1,
                              transition: { duration: 0.5, delay: 0.3 }
                            }}
                            className="text-white/80 mb-4"
                          >
                            {currentGame.description}
                          </motion.p>
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ 
                              y: 0, 
                              opacity: 1,
                              transition: { duration: 0.5, delay: 0.4 }
                            }}
                            className="flex items-center space-x-2 mb-4"
                          >
                            <StarRating rating={currentGame.rating} />
                            <span className="text-white/60 text-sm">
                              ({currentGame.rating.toFixed(1)})
                            </span>
                          </motion.div>
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ 
                              y: 0, 
                              opacity: 1,
                              transition: { duration: 0.5, delay: 0.5 }
                            }}
                            className="flex flex-wrap gap-2 mb-6"
                          >
                            {currentGame.category.map((cat, idx) => (
                              <span 
                                key={idx} 
                                className="p-1 px-3 bg-[#0f1923]/80 backdrop-blur-sm rounded-md text-white/70 text-xs border border-white/5"
                              >
                                {cat}
                              </span>
                            ))}
                          </motion.div>
                        </div>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: 0, 
                            opacity: 1,
                            transition: { duration: 0.5, delay: 0.6 }
                          }}
                        >
                          <Link 
                            href={currentGame.link}
                            className="block w-full px-4 py-3 bg-gradient-to-r from-[#${currentGame.badge?.color || 'F44336'}]/20 to-[#${currentGame.badge?.color || 'F44336'}]/10 hover:from-[#${currentGame.badge?.color || 'F44336'}]/40 hover:to-[#${currentGame.badge?.color || 'F44336'}]/20 text-white rounded-lg text-center transition-all text-lg font-medium relative overflow-hidden group"
                          >
                            <span className="relative z-10">Play Now</span>
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer-button"></span>
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation arrows - Cải thiện giao diện */}
                <button 
                  onClick={goToPrevGame}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all z-10 border border-white/10 hover:border-white/20"
                >
                  <FaArrowLeft />
                </button>
                <button 
                  onClick={goToNextGame}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all z-10 border border-white/10 hover:border-white/20"
                >
                  <FaArrowRight />
                </button>
                
                {/* Pagination dots - Cải thiện thiết kế */}
                <div className="flex justify-center mt-6 gap-2">
                  {games.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentGameIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentGameIndex 
                          ? `bg-gradient-to-r from-[#${games[idx].badge?.color || 'F44336'}]/80 to-[#${games[idx].badge?.color || 'F44336'}]/50 w-8` 
                          : 'bg-white/20 hover:bg-white/30 w-2'
                      }`}
                      aria-label={`Go to game ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <p className="max-w-4xl mx-auto text-white/80 text-lg mt-8 mb-6 leading-relaxed text-center">
              Take a break from the main game and enjoy our collection of mini games. These games are designed to provide a fun and relaxing experience while still challenging your skills in different ways.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <h2 className="text-3xl font-bold text-white relative inline-block">
                All Games
                <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
              </h2>
              
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#141528]/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex gap-2">
                  {selectedCategory && (
                    <button 
                      onClick={clearFilters}
                      className="px-4 py-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition-colors"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Category Filters */}
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Game Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredGames.map((game, index) => (
                <div key={index} className="bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1 group">
                  <div className="relative h-48">
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent"></div>
                    {game.badge && (
                      <div className="absolute top-4 left-4 p-2 px-3 bg-[#${game.badge.color}]/30 backdrop-blur-sm rounded-md border border-[#${game.badge.color}]/30">
                        <span className="text-white font-medium text-sm">
                          {game.badge.text}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#${game.badge?.color || 'F44336'}] transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-white/70 mb-4">
                      {game.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <StarRating rating={game.rating} />
                      <div className="flex items-center space-x-2">
                        {game.category.slice(0, 2).map((cat, idx) => (
                          <div key={idx} className="p-1 px-2 bg-[#0f1923]/80 backdrop-blur-sm rounded-md">
                            <span className="text-white/80 text-xs">{cat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link 
                      href={game.link}
                      className="mt-4 block w-full px-4 py-2 bg-gradient-to-r from-[#${game.badge?.color || 'F44336'}]/20 to-[#${game.badge?.color || 'F44336'}]/10 hover:from-[#${game.badge?.color || 'F44336'}]/30 hover:to-[#${game.badge?.color || 'F44336'}]/20 text-white rounded-lg text-center transition-all"
                    >
                      Play Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-8 shadow-lg mb-16">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-2xl font-semibold mb-2">No games found</h3>
              <p className="text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
          
          {/* Footer section */}
          <div className="mt-16 bg-[#1a2634]/60 backdrop-blur-md border border-white/5 rounded-xl p-8 shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                More Mini Games Coming Soon!
              </h2>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                We're constantly working on new mini-games to enhance your M-SCI experience. 
                Stay tuned for exciting new additions to our collection!
              </p>
              <Link
                href="/community"
                className="px-8 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-[#F44336] to-[#e53935] hover:from-[#e53935] hover:to-[#F44336] transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/30"
              >
                Join Our Community
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 