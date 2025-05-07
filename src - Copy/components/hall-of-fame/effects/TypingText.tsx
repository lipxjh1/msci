'use client';

import { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  startDelay?: number;
  cursor?: boolean;
}

export const TypingText = ({
  text,
  className = '',
  typingSpeed = 80,
  startDelay = 300,
  cursor = true
}: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      if (displayedText.length === 0) {
        // Initial delay before starting to type
        timeout = setTimeout(() => {
          setDisplayedText(text.charAt(0));
        }, startDelay);
      } else if (displayedText.length < text.length) {
        // Continue typing
        timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text.charAt(prev.length));
        }, typingSpeed);
      } else {
        // Finished typing
        setIsTyping(false);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, text, typingSpeed, startDelay]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && cursor && (
        <span className="typing-cursor">|</span>
      )}
      
      <style jsx>{`
        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background-color: currentColor;
          margin-left: 2px;
          animation: blink 1s step-end infinite;
          vertical-align: text-bottom;
        }
        
        @keyframes blink {
          from, to {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}; 