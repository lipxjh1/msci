'use client';

import { useEffect, useState } from 'react';
import HeroSection from '@/components/hall-of-fame/HeroSection';
import LegendSection from '@/components/hall-of-fame/LegendSection';
import DevelopersSection from '@/components/hall-of-fame/DevelopersSection';
import JoinUsSection from '@/components/hall-of-fame/JoinUsSection';
import StarsSection from '@/components/hall-of-fame/StarsSection';
import Loader from '@/components/hall-of-fame/Loader';
import { SoundProvider } from '@/context/SoundContext';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';

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
        <>
          <div className="fixed top-0 left-0 right-0 z-50">
            <ThanhDieuHuongResponsive />
          </div>
          <main className="bg-black text-white pt-16">
            <HeroSection />
            <StarsSection />
            <LegendSection />
            <DevelopersSection />
            <JoinUsSection />
          </main>
        </>
      )}
    </SoundProvider>
  );
} 