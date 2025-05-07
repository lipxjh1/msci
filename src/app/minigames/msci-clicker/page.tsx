"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

export default function MSCIClickerGame() {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Navigation bar */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href="/minigames"
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            <FaArrowLeft />
            <span>Back to Mini Games</span>
          </Link>
        </div>
        
        <Link 
          href="/"
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
        >
          <FaHome />
          <span>Home</span>
        </Link>
      </div>
      
      {/* Game container */}
      <div className="flex-1 w-full">
        <iframe
          src="/msci-clicker.html"
          className="w-full h-full border-0"
          title="MSCI Clicker Game"
          allow="autoplay"
        />
      </div>
    </div>
  );
} 