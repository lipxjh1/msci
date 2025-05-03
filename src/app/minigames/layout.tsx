import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mini Games | Overwatch',
  description: 'Explore fun mini-games within the Overwatch ecosystem.'
};

export default function MinigamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0a0b1e] to-[#1a1b3d]">
      {children}
    </div>
  );
} 