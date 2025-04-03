'use client';

import React, { ReactNode } from 'react';

interface ScrollButtonProps {
  targetId: string;
  className?: string;
  children: ReactNode;
}

export default function ScrollButton({ targetId, className, children }: ScrollButtonProps) {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
} 