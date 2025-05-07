'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { hallOfFameData } from '@/data/hallOfFameData';
import FounderCard from './cards/FounderCard';

export default function FoundersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: '100%',
      transition: { duration: 1, delay: 0.3 }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-4 relative bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute top-10 left-10 w-10 h-10 border-t border-l border-cyan-500/20" />
      <div className="absolute top-10 right-10 w-10 h-10 border-t border-r border-cyan-500/20" />
      <div className="absolute bottom-10 left-10 w-10 h-10 border-b border-l border-cyan-500/20" />
      <div className="absolute bottom-10 right-10 w-10 h-10 border-b border-r border-cyan-500/20" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20 relative">
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="inline-block"
          >
            <span className="text-xs text-cyan-400 tracking-widest uppercase font-medium mb-2 block">The Visionaries</span>
            <h2 className="text-3xl md:text-4xl font-cyber text-white mb-4">Những Người Sáng Lập</h2>
          </motion.div>
          
          <motion.div 
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent max-w-xs mx-auto"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl mx-auto text-gray-400 mt-6"
          >
            Những người tiên phong đã đặt nền móng và xây dựng nên game M-SCI với tầm nhìn đưa game Việt Nam vươn tầm quốc tế.
          </motion.p>
        </div>
        
        {/* Founders cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {hallOfFameData.founders.map((founder, index) => (
            <FounderCard key={founder.id} founder={founder} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 