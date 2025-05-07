import React from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import Footer from '@/app/home/components/Footer';

// Dynamic import với thông báo loading bằng tiếng Anh
const BreakoutGame = dynamic(
  () => import('@/modules/minigames/breakout/BreakoutGame'),
  { loading: () => <div className="p-8 text-center">Loading game...</div> }
);

export const metadata: Metadata = {
  title: 'Breakout | Mini Games',
  description: 'Play classic Breakout arcade game with colorful bricks and dynamic gameplay.',
};

export default function BreakoutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0f1a]">
      <NavBar />
      
      <main className="flex-grow pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Breakout Arcade
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Test your reflexes in this classic arcade game. 
            <span className="hidden md:inline"><br /></span> 
            Break all the bricks to advance to the next level!
          </p>
        </div>
        
        <BreakoutGame />
      </main>
      
      <Footer />
    </div>
  );
} 