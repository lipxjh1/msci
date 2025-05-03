"use client";

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiClock } from 'react-icons/fi';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import { useEffect, useState } from 'react';

export default function CreatorsComingSoonPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    scale: number;
    width: number;
    height: number;
    left: string;
    top: string;
    animX: number;
    animY: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Simulate loading to show animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Create particles with random values only on client side
    const particlesArray = Array.from({ length: 20 }).map(() => {
      return {
        x: Math.random() * 100 - 50, 
        y: Math.random() * 100 - 50,
        scale: Math.random() * 0.2 + 0.1,
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        animX: Math.random() * 20 - 10,
        animY: Math.random() * 20 - 10,
        duration: Math.random() * 5 + 5
      };
    });
    
    setParticles(particlesArray);
    
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 60,
        damping: 10
      }
    }
  };
  
  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        delay: 0.5
      }
    }
  };

  const glowAnimation = {
    animate: {
      boxShadow: ["0px 0px 0px rgba(80, 200, 120, 0.3)", "0px 0px 20px rgba(80, 200, 120, 0.7)", "0px 0px 0px rgba(80, 200, 120, 0.3)"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-[#0B0E18] via-[#0B2A1A] to-[#1A2634] text-white">
      <NavBar />
      
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 flex items-center justify-center z-50 bg-[#0B0E18]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{
                rotate: 360,
                transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
              }}
              className="w-16 h-16 border-4 border-t-green-500 border-r-transparent border-b-teal-500 border-l-transparent rounded-full"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      
      <div className="relative container mx-auto px-4 pt-32 pb-20">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-green-500 opacity-10"
              initial={{ 
                x: particle.x + "%", 
                y: particle.y + "%",
                scale: particle.scale
              }}
              animate={{ 
                y: [0, particle.animY],
                x: [0, particle.animX],
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: particle.duration
              }}
              style={{
                width: particle.width,
                height: particle.height,
                left: particle.left,
                top: particle.top,
              }}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <motion.div 
            className="max-w-2xl mx-auto text-center lg:text-left z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-teal-500 to-cyan-400 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Content Creators <br />
              <span className="text-2xl md:text-3xl text-white/90 italic mt-2 inline-block">Coming Soon</span>
            </motion.h1>
            
            <motion.div 
              className="h-1 w-32 mb-8 bg-gradient-to-r from-green-500 to-teal-500"
              variants={itemVariants}
            />
            
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              variants={itemVariants}
            >
              Our Creator Program will offer exclusive opportunities, resources, and rewards for content creators who cover M-SCI. Join our community of streamers, video makers, and influencers.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <motion.button 
                onClick={() => router.back()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 rounded-md flex items-center justify-center group transition-all duration-300 shadow-lg shadow-green-900/30"
              >
                <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Go Back</span>
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="mt-12 flex items-center"
              variants={itemVariants}
            >
              <motion.div 
                animate={glowAnimation.animate}
                className="flex items-center justify-center w-14 h-14 mr-4 rounded-full bg-green-900/20 border border-green-500/40"
              >
                <FiClock className="w-6 h-6 text-green-400" />
              </motion.div>
              <div className="text-left">
                <p className="text-sm text-green-300">Estimated Launch</p>
                <p className="text-lg font-semibold">Q3 2025</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right content - Character image */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {/* Glow effect behind image */}
              <motion.div 
                animate={glowAnimation.animate}
                className="absolute inset-0 -m-5 rounded-full bg-green-900/20 blur-xl"
              />
              
              {/* Character floating animation */}
              <motion.div
                animate={floatingAnimation.animate}
                className="relative z-10"
              >
                <div className="relative h-[500px] w-[350px]">
                  <Image
                    src="/images/heronoew/player_03_marcus.png"
                    alt="Content Creator Character"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 