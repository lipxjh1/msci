"use client";

import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import HeroBanner from "./components/HeroBanner";
import VisionMission from "./components/VisionMission";
import CoreValues from "./components/CoreValues";
import DevelopmentJourney from "./components/DevelopmentJourney";
import ImpressiveNumbers from "./components/ImpressiveNumbers";
import Technology from "./components/Technology";
import ThanhDieuHuongResponsive from "@/thanh_phan/thanh_dieu_huong_responsive";
import Loading from "@/components/Loading";

const Footer = dynamic(() => import("@/app/home/components/Footer"), {
  loading: () => <Loading />,
  ssr: false
});

export default function AboutUsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#041019] text-white overflow-hidden">
      {/* Navigation */}
      <div className="relative z-30">
        <ThanhDieuHuongResponsive />
      </div>
      
      {/* Hero Banner */}
      <HeroBanner />

      <div id="about-content" className="max-w-7xl mx-auto px-4 py-12 relative z-10 -mt-10">
        {/* Curved section top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#041019] -translate-y-full"></div>
        
        {/* Vision & Mission Section */}
        <VisionMission />
        
        {/* Core Values */}
        <CoreValues />
        
        {/* Development Journey */}
        <DevelopmentJourney />
        
        {/* Impressive Numbers */}
        <ImpressiveNumbers />
        
        {/* Technology & Innovation */}
        <Technology />
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  );
} 