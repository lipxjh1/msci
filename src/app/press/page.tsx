"use client";

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiClock } from 'react-icons/fi';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import { useEffect, useState } from 'react';

export default function PressComingSoonPage() {
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
      boxShadow: ["0px 0px 0px rgba(66, 153, 225, 0.3)", "0px 0px 20px rgba(66, 153, 225, 0.7)", "0px 0px 0px rgba(66, 153, 225, 0.3)"],
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
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-[#0B0E18] via-[#0F1F3A] to-[#1A2634] text-white">
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
              className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-cyan-500 border-l-transparent rounded-full"
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
              className="absolute rounded-full bg-blue-500 opacity-10"
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
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-400 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Press Kit <br />
              <span className="text-2xl md:text-3xl text-white/90 italic mt-2 inline-block">Coming Soon</span>
            </motion.h1>
            
            <motion.div 
              className="h-1 w-32 mb-8 bg-gradient-to-r from-blue-500 to-cyan-500"
              variants={itemVariants}
            />
            
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              variants={itemVariants}
            >
              Our comprehensive press kit will include media resources, brand guidelines, game assets, and company information for journalists, content creators, and media partners.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <motion.button 
                onClick={() => router.back()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-md flex items-center justify-center group transition-all duration-300 shadow-lg shadow-blue-900/30"
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
                className="flex items-center justify-center w-14 h-14 mr-4 rounded-full bg-blue-900/20 border border-blue-500/40"
              >
                <FiClock className="w-6 h-6 text-blue-400" />
              </motion.div>
              <div className="text-left">
                <p className="text-sm text-blue-300">Estimated Launch</p>
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
                className="absolute inset-0 -m-5 rounded-full bg-blue-900/20 blur-xl"
              />
              
              {/* Character floating animation */}
              <motion.div
                animate={floatingAnimation.animate}
                className="relative z-10"
              >
                <div className="relative h-[500px] w-[350px]">
                  <Image
                    src="/images/heronoew/player_16_anna.png"
                    alt="Press Kit Character"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
              
              {/* Circular decorative elements */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-blue-500/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 0.2 + (i * 0.1),
                    transition: { delay: 0.8 + (i * 0.2), duration: 1 }
                  }}
                  style={{
                    width: `${100 + i * 100}px`,
                    height: `${100 + i * 100}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: -i
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Bottom content */}
        <motion.div 
          className="mt-24 relative py-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="h-px w-full max-w-lg mx-auto bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute -top-px left-1/2 -translate-x-1/2 px-6 bg-[#0F1F3A] text-sm text-blue-300 tracking-widest">
            M-SCI MEDIA CENTER
          </div>
        </motion.div>
      </div>
    </div>
  );
} 