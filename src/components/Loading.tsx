"use client";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-t-transparent border-r-cyan-400 border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        <div className="absolute inset-4 border-4 border-t-transparent border-r-transparent border-b-cyan-300 border-l-transparent rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
      </div>
    </div>
  );
} 