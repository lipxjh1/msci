'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import RoadmapBanner from './components/RoadmapBanner';
import JoinUsFooter from '@/thanh_phan/JoinUsFooter';
import { useDeepSeekChat } from '@/modules/box-akane';
import CustomChatInterface from '@/thanh_phan/CustomChatInterface';

// Lazy load heavy components to increase page loading speed
const TimelineSection = lazy(() => import('./components/TimelineSection'));
const KPIStatsSection = lazy(() => import('./components/KPIStatsSection'));
const TechCommunitySection = lazy(() => import('./components/TechCommunitySection'));

// Loading component
const TabLoadingComponent = () => (
  <div className="flex justify-center items-center h-[400px]">
    <div className="relative">
      <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-[#00A4EA] animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-[#FF7D00] animate-spin animation-delay-150"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full bg-[#00A4EA]/30 animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default function RoadmapPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('timeline');
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Reduced waiting time for faster page loading
    
    // Preload necessary images
    const preloadImages = () => {
      const iconsList = [
        '/images/overwatch_bg_2.webp', // Use webp format instead of jpg for lighter files
        '/images/grid_pattern.svg', // Use SVG instead of PNG for pattern grid
        '/images/particle_overlay.svg', // Use SVG instead of PNG for overlay
        '/images/heroes/player_0_ui_idle.png', // Character image for timeline
        '/images/heroes/robot bc.png', // Robot image for timeline
        '/images/heroes/drone_2.png', // Drone image for timeline
      ];

      const preloadPromises = iconsList.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // Don't fail if an image doesn't exist
        });
      });

      Promise.all(preloadPromises).then(() => {
        setImagesPreloaded(true);
      });
    };

    preloadImages();
    
    return () => clearTimeout(timer);
  }, []);

  // Tab components mapping
  const tabComponents = {
    timeline: <TimelineSection />,
    kpi: <KPIStatsSection />,
    tech: <TechCommunitySection />
  };

  // Tab configuration
  const tabs = [
    {
      id: 'timeline',
      label: 'Road Map',
      icon: '/images/badge-1.svg',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'kpi',
      label: 'Growth Metrics',
      icon: '/images/badge-2.svg',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'tech',
      label: 'Technology & Community',
      icon: '/images/badge-3.svg',
      gradient: 'from-emerald-500 to-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-[#16181D] text-white overflow-hidden">
      {/* Navigation Menu */}
      <ThanhDieuHuongResponsive />

      {/* Roadmap Banner - using optimized version with webp */}
      <RoadmapBanner />

      {/* Roadmap Content */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="relative">
            <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-[#00A4EA] animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-[#FF7D00] animate-spin animation-delay-150"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-[#00A4EA] animate-spin animation-delay-300"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full bg-[#00A4EA]/30 animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : (
        <div id="roadmap-content" className="max-w-7xl mx-auto px-4 py-10 relative z-10 -mt-10">
          {/* Introduction */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A4EA] to-[#00D7FF] relative inline-block">
                    VISION
                  </span>
                </h2>
                <div className="w-20 h-1 bg-[#FF7D00] mx-auto md:mx-0 mb-3"></div>
                <p className="text-gray-300">
                  M-SCI is not just a game - it's the beginning of a journey to bring the Vietnamese game industry to global recognition. The roadmap below outlines our detailed development plan.
                </p>
              </div>
              <div className="flex-shrink-0 flex justify-center">
                <div className="relative w-40 h-40 md:w-48 md:h-48">
                  <Image 
                    src="/images/heroes/player_0_ui_idle.png" 
                    alt="M-SCI Character"
                    width={200}
                    height={200}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-3">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id 
                    ? `bg-gradient-to-r ${tab.gradient} shadow-lg shadow-${tab.gradient.split(' ')[0].replace('from-', '')}/30` 
                    : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="w-5 h-5 flex-shrink-0">
                    <Image 
                      src={tab.icon} 
                      alt={tab.label}
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                      loading="eager" // Load immediately, no lazy loading
                    />
                  </div>
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Active Tab Content with Suspense fallback */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Suspense fallback={<TabLoadingComponent />}>
              {tabComponents[activeTab as keyof typeof tabComponents]}
            </Suspense>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center my-12 py-12 rounded-xl bg-gradient-to-br from-[#00A4EA]/20 to-transparent border border-[#00A4EA]/30 backdrop-blur-sm relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 opacity-10 w-56 h-56 -translate-y-1/4 translate-x-1/4">
              <Image
                src="/images/heroes/drone_2.png"
                alt="Drone"
                width={200}
                height={200}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute bottom-0 left-0 opacity-10 w-56 h-56 translate-y-1/4 -translate-x-1/4">
              <Image
                src="/images/heroes/robot bc.png" 
                alt="Robot"
                width={200}
                height={200}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Join the Journey?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Be part of the revolution in the Vietnamese gaming industry. Sign up to receive the latest news and opportunities to participate in exclusive events.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link 
                  href="/events"
                  className="bg-[#00A4EA] hover:bg-[#00B5FF] text-white font-medium px-8 py-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-[#00A4EA]/30"
                >
                  View Upcoming Events
                </Link>
                <Link 
                  href="/download"
                  className="bg-[#FF7D00] hover:bg-[#FF9D40] text-white font-medium px-8 py-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-[#FF7D00]/30"
                >
                  Register for Closed Beta
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Join Us Footer */}
      <JoinUsFooter />
      
      {/* Add ChatInterface with custom image */}
      <CustomChatInterface
        systemPrompt="I'm Akane, an intelligent and friendly AI assistant. I'll help users enthusiastically and accurately in English."
        modelName="deepseek-chat"
        enableStreaming={true}
        botName="Akane AI"
      />
    </div>
  );
} 