'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const Loader = () => {
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prev => {
        if (prev === 'Loading...') return 'Loading';
        if (prev === 'Loading..') return 'Loading...';
        if (prev === 'Loading.') return 'Loading..';
        return 'Loading.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center w-full h-screen z-50">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute w-full h-full rounded-full border-t-4 border-blue-500 animate-spin"></div>
        <div className="absolute w-full h-full rounded-full border-r-4 border-yellow-500 animate-spin animate-delay-150"></div>
        <div className="absolute w-full h-full rounded-full border-b-4 border-red-500 animate-spin animate-delay-300"></div>
      </div>
      <h2 className="text-white text-2xl font-bold mt-4">{loadingText}</h2>
      <p className="text-gray-400 mt-2">Preparing Hall of Fame...</p>
    </div>
  );
};

export default Loader; 