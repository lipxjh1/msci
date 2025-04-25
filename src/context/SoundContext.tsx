'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Howl } from 'howler';

type Sound = {
  id: string;
  howl: Howl;
};

type SoundContextType = {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (soundId: string) => void;
  stopSound: (soundId: string) => void;
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  volume: number;
  setVolume: (volume: number) => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const sounds: { [key: string]: Sound } = {
  background: {
    id: 'background',
    howl: typeof window !== 'undefined' ? new Howl({
      src: ['/sounds/hall-of-fame-ambient.mp3'],
      loop: true,
      volume: 0.3,
      preload: true,
    }) : null as unknown as Howl,
  },
  click: {
    id: 'click',
    howl: typeof window !== 'undefined' ? new Howl({
      src: ['/sounds/click.mp3'],
      volume: 0.5,
      preload: true,
    }) : null as unknown as Howl,
  },
  hover: {
    id: 'hover',
    howl: typeof window !== 'undefined' ? new Howl({
      src: ['/sounds/hover.mp3'],
      volume: 0.3,
      preload: true,
    }) : null as unknown as Howl,
  },
  achievement: {
    id: 'achievement',
    howl: typeof window !== 'undefined' ? new Howl({
      src: ['/sounds/achievement.mp3'],
      volume: 0.6,
      preload: true,
    }) : null as unknown as Howl,
  },
  page: {
    id: 'page',
    howl: typeof window !== 'undefined' ? new Howl({
      src: ['/sounds/page-turn.mp3'],
      volume: 0.5,
      preload: true,
    }) : null as unknown as Howl,
  },
};

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if user has previously muted sound
    const savedMuteState = localStorage.getItem('hallOfFame_isMuted');
    if (savedMuteState) {
      setIsMuted(savedMuteState === 'true');
    }
    
    // Check saved volume
    const savedVolume = localStorage.getItem('hallOfFame_volume');
    if (savedVolume) {
      setVolume(parseFloat(savedVolume));
    }
    
    return () => {
      // Clean up sounds when component unmounts
      Object.values(sounds).forEach(sound => {
        sound.howl.stop();
      });
    };
  }, []);

  // Update all sounds when volume changes
  useEffect(() => {
    if (isClient) {
      Object.values(sounds).forEach(sound => {
        sound.howl.volume(isMuted ? 0 : volume);
      });
      localStorage.setItem('hallOfFame_volume', volume.toString());
    }
  }, [volume, isMuted, isClient]);

  // Update mute state in localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('hallOfFame_isMuted', isMuted.toString());
      Object.values(sounds).forEach(sound => {
        sound.howl.volume(isMuted ? 0 : volume);
      });
    }
  }, [isMuted, volume, isClient]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const playSound = useCallback((soundId: string) => {
    if (isClient && sounds[soundId]) {
      sounds[soundId].howl.play();
    }
  }, [isClient]);

  const stopSound = useCallback((soundId: string) => {
    if (isClient && sounds[soundId]) {
      sounds[soundId].howl.stop();
    }
  }, [isClient]);

  const playBackgroundMusic = useCallback(() => {
    if (isClient && sounds.background && !sounds.background.howl.playing()) {
      sounds.background.howl.play();
    }
  }, [isClient]);

  const stopBackgroundMusic = useCallback(() => {
    if (isClient && sounds.background) {
      sounds.background.howl.stop();
    }
  }, [isClient]);

  const value = {
    isMuted,
    toggleMute,
    playSound,
    stopSound,
    playBackgroundMusic,
    stopBackgroundMusic,
    volume,
    setVolume,
  };

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}; 