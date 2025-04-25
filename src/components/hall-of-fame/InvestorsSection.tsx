'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { hallOfFameData } from '@/data/hallOfFameData';
import SectionTitle from './ui/SectionTitle';
import InvestorCard from './cards/InvestorCard';
import NeonButton from './ui/NeonButton';
import { useSound } from '@/context/SoundContext';

// Investor tier tabs
const tiers = [
  { id: 'eternal', label: 'Eternal Guardians' },
  { id: 'diamond', label: 'Diamond Supporters' },
];

export default function InvestorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [activeTab, setActiveTab] = useState('eternal');
  const { playSound } = useSound();

  const handleTabChange = (tab: string) => {
    playSound('click');
    setActiveTab(tab);
  };

  const getInvestorsToDisplay = () => {
    if (activeTab === 'eternal') {
      return hallOfFameData.investors.eternal;
    } else if (activeTab === 'diamond') {
      return hallOfFameData.investors.diamond;
    }
    return [];
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-4 relative"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-blue-900/10 to-transparent opacity-20" />
      <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-cyan-900/10 blur-[80px] opacity-30" />
      
      <div className="max-w-7xl mx-auto relative">
        <SectionTitle
          subtitle="The Supporters"
          title="Nhà Đầu Tư Huyền Thoại"
          description="Tri ân những nhà đầu tư đã tin tưởng và đóng góp vào sự phát triển của M-SCI từ những ngày đầu."
          isInView={isInView}
        />
        
        {/* Tabs for investor tiers */}
        <div className="flex flex-wrap justify-center mb-12 gap-4">
          {tiers.map((tier) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <NeonButton
                variant={activeTab === tier.id ? 'primary' : 'outline'}
                onClick={() => handleTabChange(tier.id)}
                className="min-w-32"
              >
                {tier.label}
              </NeonButton>
            </motion.div>
          ))}
        </div>
        
        {/* Investors grid with animation */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {getInvestorsToDisplay().map((investor, index) => (
            <InvestorCard key={investor.id} investor={investor} index={index} />
          ))}
        </motion.div>
        
        {/* Call-to-action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">
            Bạn muốn trở thành một phần của lịch sử M-SCI?
          </p>
          <NeonButton 
            variant="secondary"
            size="lg"
            onClick={() => window.open('/invest', '_blank')}
          >
            Trở Thành Nhà Đầu Tư
          </NeonButton>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-10 right-10 w-10 h-10 border-b border-r border-purple-500/20" />
      </div>
    </section>
  );
} 