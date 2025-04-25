'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const Loader = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING HALL OF FAME');
  const [showTips, setShowTips] = useState(false);

  const tips = [
    "The Hall of Fame celebrates the best players in M-SCI history",
    "Legendary players have earned their place through exceptional skill",
    "Our Hall of Fame includes international champions and local heroes",
    "Some inductees have changed the meta forever",
    "Community leaders are recognized for their contributions"
  ];
  
  const [currentTip, setCurrentTip] = useState(tips[0]);

  useEffect(() => {
    // Simulating loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 150);

    // Show tips after 1 second
    const tipTimer = setTimeout(() => {
      setShowTips(true);
    }, 1000);

    // Change tips every 3 seconds
    const tipInterval = setInterval(() => {
      setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 3000);

    // Update loading text based on progress
    const textInterval = setInterval(() => {
      if (loadingProgress < 30) {
        setLoadingText('LOADING ASSETS');
      } else if (loadingProgress < 60) {
        setLoadingText('PREPARING HALL OF FAME');
      } else if (loadingProgress < 90) {
        setLoadingText('ALMOST THERE');
      } else {
        setLoadingText('FINALIZING');
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(tipInterval);
      clearInterval(textInterval);
      clearTimeout(tipTimer);
    };
  }, [loadingProgress]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center w-full h-screen z-50">
      {/* Background with particles and gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black/80"></div>
        <div className="stars"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-20"></div>
      </div>
      
      {/* Logo */}
      <div className="relative mb-12 z-10">
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image 
              src="/images/overwatch_logo.png" 
              alt="M-SCI Logo" 
              width={150} 
              height={150}
              className="object-contain animate-float" 
            />
          </div>
        </div>
      </div>
      
      {/* Hexagonal loading bar */}
      <div className="relative w-80 h-4 bg-gray-800/50 rounded-md mb-3 overflow-hidden backdrop-blur-sm z-10 border border-gray-700/50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-md"
          style={{ width: `${loadingProgress}%` }}
        ></div>
        <div className="absolute inset-0 grid grid-cols-10">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="border-r border-gray-700/30 h-full"></div>
          ))}
        </div>
      </div>
      
      {/* Progress percentage */}
      <div className="text-blue-300 font-mono text-sm mb-8 z-10">
        {loadingProgress}% - {loadingText}
      </div>
      
      {/* Tips section */}
      {showTips && (
        <div className="max-w-md px-6 py-3 bg-blue-900/20 border border-blue-500/30 rounded-md backdrop-blur-md mt-4 z-10 animate-fade-in">
          <p className="text-gray-300 text-sm text-center">
            <span className="text-blue-400 font-semibold">TIP:</span> {currentTip}
          </p>
        </div>
      )}
      
      {/* Footer text */}
      <div className="absolute bottom-6 text-gray-500 text-xs z-10">
        © 2023-2024 M-SCI Entertainment. All rights reserved.
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .animate-delay-150 {
          animation-delay: 150ms;
        }
        
        .animate-delay-300 {
          animation-delay: 300ms;
        }
        
        .stars {
          position: absolute;
          width: 100%;
          height: 100%;
          background: url('/images/stars.png') repeat;
          animation: stars-move 100s linear infinite;
        }
        
        @keyframes stars-move {
          from { background-position: 0 0; }
          to { background-position: 1000px 1000px; }
        }
      `}</style>
    </div>
  );
};

export default Loader; 