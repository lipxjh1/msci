"use client";

import { useEffect, useState } from "react";
import HeroSection from "./home/components/HeroSection";
import FeatureSection from "./home/components/FeatureSection";
import HeroesSection from "./home/components/HeroesSection";
import NewsSection from "./home/components/NewsSection";
import CTASection from "./home/components/CTASection";
import Footer from "./home/components/Footer";
import HomeMobile from "./home_mobile";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  // Scroll reveal effect
  useEffect(() => {
    const scrollReveal = () => {
      const reveals = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale'
      );
      
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        } else {
          reveals[i].classList.remove('active');
        }
      }
    };
    
    window.addEventListener('scroll', scrollReveal);
    scrollReveal();
    
    return () => window.removeEventListener('scroll', scrollReveal);
  }, []);

  if (isClient && isMobile) {
    return <HomeMobile />;
  }

  return (
    <main className="bg-gradient-to-b from-[var(--bg-dark)] to-[var(--bg-darker)]">
      <HeroSection />
      <FeatureSection />
      <HeroesSection />
      <NewsSection />
      <CTASection />
      <Footer />
    </main>
  );
}