'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { hallOfFameData } from '@/data/hallOfFameData';
import SectionTitle from './ui/SectionTitle';
import NeonButton from './ui/NeonButton';
import { useSound } from '@/context/SoundContext';
import { FaTrophy, FaAward, FaMedal, FaCalendarAlt } from 'react-icons/fa';

// Achievement type tabs
const types = [
  { id: 'worldFirst', label: 'World First', icon: <FaTrophy /> },
  { id: 'unique', label: 'Unique', icon: <FaAward /> },
  { id: 'special', label: 'Special', icon: <FaMedal /> },
];

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [activeTab, setActiveTab] = useState('worldFirst');
  const { playSound } = useSound();

  const handleTabChange = (tab: string) => {
    playSound('page');
    setActiveTab(tab);
  };

  const getAchievementsToDisplay = () => {
    if (activeTab === 'worldFirst') {
      return hallOfFameData.achievements.worldFirst;
    } else if (activeTab === 'unique') {
      return hallOfFameData.achievements.unique;
    } else if (activeTab === 'special') {
      return hallOfFameData.achievements.special;
    }
    return [];
  };

  // Get icon based on achievement type
  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'world-first':
        return <FaTrophy className="text-amber-400" />;
      case 'unique':
        return <FaAward className="text-indigo-400" />;
      case 'special':
        return <FaMedal className="text-emerald-400" />;
      default:
        return <FaTrophy className="text-amber-400" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-4 relative bg-gradient-to-b from-gray-950 via-gray-900/70 to-gray-950"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/achievement-bg-pattern.png')] bg-repeat opacity-5" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-900/10 blur-[80px] opacity-30" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-amber-900/10 blur-[80px] opacity-20" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <SectionTitle
          subtitle="Milestones"
          title="Thành Tựu Vẻ Vang"
          description="Những khoảnh khắc lịch sử và thành tựu đáng nhớ đã góp phần tạo nên di sản của M-SCI."
          isInView={isInView}
          lightColor="amber-400"
          darkColor="amber-900"
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
                glowColor="rgb(251, 191, 36)"
                className="min-w-36"
              >
                {type.label}
              </NeonButton>
            </motion.div>
          ))}
        </div>
        
        {/* Achievement timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto"
        >
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent" />
          
          {/* Achievements */}
          <div className="relative">
            {getAchievementsToDisplay().map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`flex items-start mb-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col`}
              >
                {/* Content box */}
                <div className={`md:w-5/12 relative z-10 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <div 
                    onMouseEnter={() => playSound('hover')}
                    className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-amber-500/20 shadow-lg transform transition-all duration-300 hover:shadow-amber-500/10 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`${index % 2 === 0 ? 'md:order-2' : ''}`}>
                        {getAchievementIcon(achievement.type)}
                      </div>
                      <h3 className={`text-xl font-cyber text-white ${index % 2 === 0 ? 'md:order-1' : ''}`}>
                        {achievement.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{achievement.description}</p>
                    
                    <div className="flex flex-wrap gap-3 items-center justify-between">
                      <div className="bg-gray-800 px-3 py-1 rounded-full text-xs">
                        <span className="text-amber-400">{achievement.achievedBy}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <FaCalendarAlt />
                        <span>{achievement.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline node */}
                <div className="md:w-2/12 flex justify-center items-center">
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-amber-500 border-4 border-gray-900 z-20 relative">
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.4, 1],
                          opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 rounded-full bg-amber-500 blur-sm"
                      />
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-amber-500/30 animate-ping" />
                  </div>
                </div>
                
                {/* Image */}
                <div className={`md:w-5/12 relative z-10 ${
                  index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
                }`}>
                  <div className="h-40 rounded-lg overflow-hidden border border-amber-500/20 shadow-lg shadow-amber-500/5 md:mt-0 mt-4">
                    <img 
                      src={achievement.imageUrl} 
                      alt={achievement.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 