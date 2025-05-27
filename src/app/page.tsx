"use client";

import { useEffect, useState, Suspense } from "react";
import dynamic from 'next/dynamic';
import Loading from "@/components/Loading";
import ThanhDieuHuongResponsive from "@/thanh_phan/thanh_dieu_huong_responsive";

// Dynamic imports với lazy loading
const HeroSection = dynamic(() => import("./home/components/HeroSection"), {
  loading: () => <Loading />,
  ssr: false
});

const FeatureSection = dynamic(() => import("./home/components/FeatureSection"), {
  loading: () => <Loading />,
  ssr: false
});

const HeroesSection = dynamic(() => import("./home/components/HeroesSection"), {
  loading: () => <Loading />,
  ssr: false
});

const NewsSection = dynamic(() => import("./home/components/NewsSection"), {
  loading: () => <Loading />,
  ssr: false
});

const CTASection = dynamic(() => import("./home/components/CTASection"), {
  loading: () => <Loading />,
  ssr: false
});

const Footer = dynamic(() => import("./home/components/Footer"), {
  loading: () => <Loading />,
  ssr: false
});

const ChatBox = dynamic(() => import("./home/ChatBot/ChatBox"), {
  loading: () => <div></div>,
  ssr: false
});

const HomeMobile = dynamic(() => import("./home_mobile"), {
  loading: () => <Loading />,
  ssr: false
});

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
    return (
      <>
        <ThanhDieuHuongResponsive />
        <Suspense fallback={<Loading />}>
          <HomeMobile />
        </Suspense>
        {/* <Suspense fallback={<div></div>}>
          <ChatBox />
        </Suspense> */}
      </>
    );
  }

  return (
    <main className="bg-gradient-to-b from-[var(--bg-dark)] to-[var(--bg-darker)]">
      <ThanhDieuHuongResponsive />
      <Suspense fallback={<Loading />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <FeatureSection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <HeroesSection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <NewsSection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <CTASection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
      {/* <Suspense fallback={<div></div>}>
        <ChatBox />
      </Suspense> */}
    </main>
  );
}