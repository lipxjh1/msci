"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGamepad, FaSearch, FaRegStar, FaStar, FaFilter } from 'react-icons/fa';
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
  
  const categories = ['Casual', 'Puzzle', 'Strategy', 'Arcade', 'Board Game', 'Card Game'];
  
  const games: GameCardProps[] = [
    {
      title: 'Tic Tac Toe with Akane',
      description: 'Challenge your strategic thinking against Akane, an intelligent AI with multiple difficulty levels. Can you defeat her in this classic board game?',
      image: '/images/minigam/3.png',
      link: '/minigames/tic-tac-toe',
      category: ['Strategy', 'Board Game', 'Casual'],
      rating: 4.5,
      badge: {
        text: 'Popular',
        color: 'F44336'
      }
    },
    {
      title: 'Flappy Bird',
      description: 'Control the bird through pipes in this classic game that tests your reflexes and control. How far can you go in this addictive arcade game?',
      image: '/images/minigam/5.png',
      link: '/minigames/flappy-bird',
      category: ['Arcade', 'Casual'],
      rating: 4.7,
      badge: {
        text: 'Challenging',
        color: 'FFD700'
      }
    },
    {
      title: 'Pikachu Match',
      description: 'Find and match identical Pokémon within the time limit. Test your memory and observation skills in this exciting matching puzzle game!',
      image: '/images/minigam/2.png',
      link: '/minigames/pikachu-game',
      category: ['Puzzle', 'Casual'],
      rating: 4.3,
      badge: {
        text: 'Family',
        color: '9C27B0'
      }
    },
    {
      title: 'Chess AI Challenge',
      description: 'Challenge your intellect with the legendary game of chess. Play against AI at various difficulty levels from beginner to grandmaster.',
      image: '/images/minigam/chess.png',
      link: '/minigames/chess-ai',
      category: ['Strategy', 'Board Game'],
      rating: 4.8,
      badge: {
        text: 'Classic',
        color: '2196F3'
      }
    },
    {
      title: 'Memory Match',
      description: 'Test your memory by matching pairs of cards in this classic game. Multiple difficulty levels for all ages and memory training capabilities.',
      image: '/images/heroes/new.png',
      link: '/minigames/memory-match',
      category: ['Puzzle', 'Casual'],
      rating: 4.2,
      badge: {
        text: 'Kids',
        color: '4CAF50'
      }
    },
    {
      title: 'Solitaire Classic',
      description: 'The timeless card game that challenges your strategic thinking and planning. Relax and enjoy this classic pastime with beautiful animations.',
      image: '/images/heroes/battle.png',
      link: '/minigames/solitaire',
      category: ['Card Game', 'Strategy'],
      rating: 4.4,
      badge: {
        text: 'Relaxing',
        color: 'FF9800'
      }
    }
  ];
  
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a141e] to-[#1a2634]">
      <ThanhDieuHuongResponsive />
      
      {/* Hero section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
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
          {/* Introduction */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-white mb-6 relative inline-block">
                  Mini Games Collection
                  <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
                </h2>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  Take a break from the main game and enjoy our collection of mini games. These games are designed to provide a fun and relaxing experience while still challenging your skills in different ways.
                </p>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  From classic board games to arcade challenges, there's something for everyone. Compete with friends, challenge AI opponents, or just enjoy some casual gaming time.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      6+
                    </div>
                    <div className="text-white/60 text-sm">Games</div>
                  </div>
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      5
                    </div>
                    <div className="text-white/60 text-sm">Categories</div>
                  </div>
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      4.5
                    </div>
                    <div className="text-white/60 text-sm">Avg Rating</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative rounded-xl overflow-hidden border border-white/5 shadow-xl">
                  <Image
                    src="/images/minigam/chess.png"
                    alt="Mini Games Collection"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a141e] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-white font-bold text-lg mb-2">
                      Featured Games
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 px-3 bg-[#F44336]/20 backdrop-blur-sm rounded-md border border-[#F44336]/30">
                        <span className="text-[#F44336] font-medium text-sm">
                          Tic Tac Toe
                        </span>
                      </div>
                      <div className="p-2 px-3 bg-[#3f51b5]/20 backdrop-blur-sm rounded-md border border-[#3f51b5]/30">
                        <span className="text-[#3f51b5] font-medium text-sm">
                          Chess
                        </span>
                      </div>
                      <div className="p-2 px-3 bg-[#4CAF50]/20 backdrop-blur-sm rounded-md border border-[#4CAF50]/30">
                        <span className="text-[#4CAF50] font-medium text-sm">
                          Flappy Bird
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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