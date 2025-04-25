'use client';

import { useEffect, useState } from 'react';
import HeroSection from '@/components/hall-of-fame/HeroSection';
import LegendSection from '@/components/hall-of-fame/LegendSection';
import DevelopersSection from '@/components/hall-of-fame/DevelopersSection';
import JoinUsSection from '@/components/hall-of-fame/JoinUsSection';
import StarsSection from '@/components/hall-of-fame/StarsSection';
import Loader from '@/components/hall-of-fame/Loader';
import { SoundProvider } from '@/context/SoundContext';

export default function HallOfFame() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hiển thị loader trong vài giây để tăng trải nghiệm
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SoundProvider>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="bg-black text-white">
          <HeroSection />
          <StarsSection />
          <LegendSection />
          <DevelopersSection />
          <JoinUsSection />
        </main>
      )}
    </SoundProvider>
  );
} 