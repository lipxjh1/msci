import React from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import Footer from '@/app/home/components/Footer';

// Dynamic import with English loading message
const TicTacToeGame = dynamic(
  () => import('@/modules/minigames/tic-tac-toe/TicTacToeGame'),
  { loading: () => <div className="p-8 text-center">Loading game...</div> }
);

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe | Mini Games',
  description: 'Play Tic-Tac-Toe with intelligent AI on a 9x9 grid with multiple difficulty levels.',
};

export default function TicTacToePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0f1a]">
      <NavBar />
      
      <main className="flex-grow pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Tic-Tac-Toe Challenge
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Test your skills against our intelligent AI on a 9x9 grid. 
            <span className="hidden md:inline"><br /></span> 
            Challenge yourself with different difficulty levels!
          </p>
        </div>
        
        <TicTacToeGame />
      </main>
      
      <Footer />
    </div>
  );
} 