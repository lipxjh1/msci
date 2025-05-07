'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { hallOfFameData } from '@/data/hallOfFameData';
import SectionTitle from './ui/SectionTitle';
import PlayerCard from './cards/PlayerCard';
import NeonButton from './ui/NeonButton';
import { useSound } from '@/context/SoundContext';

// Player category tabs
const categories = [
  { id: 'legends', label: 'All-Time Legends' },
  { id: 'season1', label: 'Season 1: Dawn of Heroes' },
  { id: 'season2', label: 'Season 2: Robot Uprising' },
];

export default function PlayersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [activeTab, setActiveTab] = useState('legends');
  const { playSound } = useSound();

  const handleTabChange = (tab: string) => {
    playSound('click');
    setActiveTab(tab);
  };

  const getPlayersToDisplay = () => {
    if (activeTab === 'legends') {
      return hallOfFameData.players.legends;
    } else if (activeTab === 'season1') {
      return hallOfFameData.players.champions['Season 1: Dawn of Heroes'] || [];
    } else if (activeTab === 'season2') {
      return hallOfFameData.players.champions['Season 2: Robot Uprising'] || [];
    }
    return [];
  };

  return (
    <section
      id="players-section"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 relative bg-gradient-to-b from-gray-950 via-gray-900/70 to-gray-950"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        
        {/* Diagonal lines */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i}
              className="absolute bg-gradient-to-r from-purple-500/50 to-cyan-500/50"
              style={{
                height: '1px',
                width: '200%',
                left: '-50%',
                top: `${i * 10}%`,
                transform: 'rotate(25deg)',
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <SectionTitle
          subtitle="The Champions"
          title="Huyền Thoại Game Thủ"
          description="Những game thủ đã làm nên lịch sử với thành tích xuất sắc của mình trong thế giới M-SCI."
          isInView={isInView}
          lightColor="purple-400"
          darkColor="purple-900"
        />
        
        {/* Category tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-4">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <NeonButton
                variant={activeTab === category.id ? 'secondary' : 'outline'}
                onClick={() => handleTabChange(category.id)}
                glowColor={activeTab === category.id ? 'rgb(168, 85, 247)' : 'rgb(139, 92, 246)'}
                className="min-w-36"
              >
                {category.label}
              </NeonButton>
            </motion.div>
          ))}
        </div>
        
        {/* Players grid with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {getPlayersToDisplay().map((player, index) => (
            <PlayerCard key={player.id} player={player} index={index} />
          ))}
        </motion.div>
        
        {/* Pagination or navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex justify-center gap-2"
        >
          <span className="w-3 h-3 rounded-full bg-purple-500"></span>
          <span className="w-3 h-3 rounded-full bg-gray-700"></span>
          <span className="w-3 h-3 rounded-full bg-gray-700"></span>
        </motion.div>
        
        {/* Call-to-action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">
            Muốn trở thành một huyền thoại tiếp theo?
          </p>
          <NeonButton 
            variant="secondary"
            size="lg"
            glowColor="rgb(168, 85, 247)"
            onClick={() => window.open('/join-game', '_blank')}
          >
            Tham Gia Game
          </NeonButton>
        </motion.div>
      </div>
    </section>
  );
} 