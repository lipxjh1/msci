'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const FeatureCard = ({ icon, title, description, gradient, delay }: { 
  icon: string;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 h-full"
    >
      <div className={`relative p-6 h-full bg-gradient-to-br ${gradient}`}>
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center p-2.5">
            <Image 
              src={icon} 
              alt={title}
              width={28}
              height={28}
              className="w-7 h-7 object-contain" 
            />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        
        <p className="text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default function TechCommunitySection() {
  const features = [
    {
      icon: '/images/heroes/ui 5.png',
      title: 'Technology Innovation',
      description: 'M-SCI pioneers with the most modern technologies, from artificial intelligence to advanced physics systems.',
      gradient: 'from-blue-900/10 to-blue-800/5'
    },
    {
      icon: '/images/heroes/player_0_gameplay_idle.png',
      title: 'Community Building',
      description: 'We put the player community at the center, with the goal of creating a vibrant ecosystem around M-SCI.',
      gradient: 'from-purple-900/10 to-purple-800/5'
    },
    {
      icon: '/images/home/FS-img/free.png',
      title: 'Business Model',
      description: 'M-SCI aims for a fair Free-to-Play model, with non-coercive monetization and a focus on user experience.',
      gradient: 'from-amber-900/10 to-amber-800/5'
    },
    {
      icon: '/images/heroes/ui 2.png',
      title: 'Esports Ecosystem',
      description: 'M-SCI is designed from the ground up to develop into a leading esports title in Southeast Asia and globally.',
      gradient: 'from-emerald-900/10 to-emerald-800/5'
    }
  ];

  return (
    <section className="relative backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 shadow-xl p-6">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10"></div>
        <Image
          src="/images/grid_pattern.svg"
          alt="Background Pattern"
          fill
          className="object-cover opacity-[0.03]"
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold font-orbitron text-white mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-500">
            COMMUNITY & TECHNOLOGY
          </span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto font-rajdhani">
          Community and technology are the two main pillars in M-SCI's development journey.
          We focus on building sustainable relationships with players and continuous innovation.
        </p>
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            gradient={feature.gradient}
            delay={0.1 + index * 0.1}
          />
        ))}
      </div>
      
      {/* Tech Partners Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-10"
      >
        <h3 className="text-xl font-bold text-white mb-6 text-center">Technology Partners</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 flex items-center justify-center h-20">
              <div className="h-12 w-full relative">
                <Image 
                  src="/images/overwatch_logo.png" 
                  alt="Tech Partner" 
                  fill
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Community Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6 text-center">Community Development Progress</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="inline-flex mb-2 w-16 h-16 rounded-full bg-green-500/20 items-center justify-center">
              <Image 
                src="/images/heroes/robot bc.png" 
                alt="Discord Members"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
            <h4 className="text-2xl font-bold text-white">10K+</h4>
            <p className="text-gray-400 text-sm">Discord Members</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex mb-2 w-16 h-16 rounded-full bg-blue-500/20 items-center justify-center">
              <Image 
                src="/images/heroes/drone 1.png" 
                alt="Twitter Followers"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
            <h4 className="text-2xl font-bold text-white">5K+</h4>
            <p className="text-gray-400 text-sm">Twitter Followers</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex mb-2 w-16 h-16 rounded-full bg-purple-500/20 items-center justify-center">
              <Image 
                src="/images/heroes/player_0_ui_idle.png" 
                alt="Tester Community"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
            <h4 className="text-2xl font-bold text-white">1K+</h4>
            <p className="text-gray-400 text-sm">Alpha Testers</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex mb-2 w-16 h-16 rounded-full bg-amber-500/20 items-center justify-center">
              <Image 
                src="/images/heroes/uiux 1.png" 
                alt="Community Feedback"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
            <h4 className="text-2xl font-bold text-white">300+</h4>
            <p className="text-gray-400 text-sm">Updates</p>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-1/4 h-1/4 bg-emerald-500/20 rounded-full filter blur-[80px] -z-10"></div>
      <div className="absolute bottom-1/3 left-0 w-1/4 h-1/4 bg-green-500/20 rounded-full filter blur-[80px] -z-10"></div>
    </section>
  );
} 