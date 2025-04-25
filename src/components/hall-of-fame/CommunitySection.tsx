'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { hallOfFameData } from '@/data/hallOfFameData';
import SectionTitle from './ui/SectionTitle';
import NeonButton from './ui/NeonButton';
import { useSound } from '@/context/SoundContext';
import { FaUsers, FaTwitch, FaYoutube, FaDiscord, FaHeart } from 'react-icons/fa';

// Community type tabs
const types = [
  { id: 'creators', label: 'Content Creators', icon: <FaYoutube /> },
  { id: 'leaders', label: 'Community Leaders', icon: <FaUsers /> },
  { id: 'helpers', label: 'Game Helpers', icon: <FaHeart /> },
];

export default function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [activeTab, setActiveTab] = useState('creators');
  const { playSound } = useSound();

  const handleTabChange = (tab: string) => {
    playSound('click');
    setActiveTab(tab);
  };

  const getCommunityToDisplay = () => {
    if (activeTab === 'creators') {
      return hallOfFameData.community.creators;
    } else if (activeTab === 'leaders') {
      return hallOfFameData.community.leaders;
    } else if (activeTab === 'helpers') {
      return hallOfFameData.community.helpers;
    }
    return [];
  };

  // Get platform icon
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return <FaYoutube className="text-red-500" />;
      case 'twitch':
        return <FaTwitch className="text-purple-500" />;
      case 'discord':
        return <FaDiscord className="text-indigo-400" />;
      default:
        return <FaUsers className="text-blue-400" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-4 relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-1/3 h-[500px] bg-gradient-radial from-green-900/10 to-transparent opacity-30" />
        <div className="absolute bottom-1/3 left-0 w-1/3 h-[500px] bg-gradient-radial from-teal-900/10 to-transparent opacity-30" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <SectionTitle
          subtitle="The Heroes"
          title="Cộng Đồng Nổi Bật"
          description="Vinh danh những cá nhân đã đóng góp vào sự phát triển của cộng đồng M-SCI thông qua nội dung, hướng dẫn và đóng góp."
          isInView={isInView}
          lightColor="teal-400"
          darkColor="teal-900"
        />
        
        {/* Type tabs */}
        <div className="flex flex-wrap justify-center mb-16 gap-4">
          {types.map((type) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <NeonButton
                variant={activeTab === type.id ? 'primary' : 'outline'}
                onClick={() => handleTabChange(type.id)}
                icon={type.icon}
                glowColor={activeTab === type.id ? 'rgb(20, 184, 166)' : 'rgb(45, 212, 191)'}
                className="min-w-36"
              >
                {type.label}
              </NeonButton>
            </motion.div>
          ))}
        </div>
        
        {/* Community cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6"
        >
          {getCommunityToDisplay().map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {/* Avatar with platform badge */}
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-teal-500/30 shadow-lg shadow-teal-500/20">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Platform badge */}
                <div className="absolute -bottom-2 -right-2 bg-gray-900 rounded-full p-2 border border-teal-500/30">
                  {getPlatformIcon(member.platform)}
                </div>
              </div>
              
              {/* Name and platform */}
              <h3 className="text-white text-xl font-medium mb-1">{member.name}</h3>
              <p className="text-teal-400 text-sm mb-3">{member.platform}</p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                {Object.entries(member.stats).map(([key, value], i) => (
                  <div key={i} className="bg-gray-900/50 px-3 py-1 rounded-full border border-teal-500/20">
                    <span className="text-gray-400 text-xs capitalize">{key}:</span>{' '}
                    <span className="text-white text-xs font-medium">{value}</span>
                  </div>
                ))}
              </div>
              
              {/* View content button */}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  playSound('click');
                }}
                className="text-teal-400 text-sm hover:text-teal-300 transition-colors border-b border-dashed border-teal-500/30"
              >
                Xem nội dung
              </a>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call-to-action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-6">
            Muốn trở thành một phần của cộng đồng M-SCI?
          </p>
          <NeonButton 
            variant="primary"
            size="lg"
            glowColor="rgb(20, 184, 166)"
            onClick={() => window.open('/community', '_blank')}
          >
            Tham Gia Cộng Đồng
          </NeonButton>
        </motion.div>
      </div>
    </section>
  );
} 