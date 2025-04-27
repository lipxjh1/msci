import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mini Games | Overwatch',
  description: 'Khám phá các trò chơi nhỏ thú vị bên trong hệ sinh thái Overwatch.'
};

export default function MinigamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b1e] to-[#1a1b3d] text-white px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3498db] to-[#9b59b6]">
          Mini Games
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Giải trí với những trò chơi mini đầy thú vị
        </p>
        {children}
      </div>
    </div>
  );
} 