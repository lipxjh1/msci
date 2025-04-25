'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design
 * @param query CSS media query string
 * @returns boolean indicating if the query matches
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (!isClient) return;
    
    const media = window.matchMedia(query);
    
    // Update the state when component mounts
    setMatches(media.matches);
    
    // Create listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add the listener to media
    media.addEventListener('change', listener);
    
    // Remove listener on cleanup
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query, isClient]);

  return isClient ? matches : false;
}

export default useMediaQuery; 