'use client';

import { motion } from 'framer-motion';

type SectionTitleProps = {
  subtitle: string;
  title: string;
  description?: string;
  isInView: boolean;
  center?: boolean;
  lightColor?: string;
  darkColor?: string;
};

export default function SectionTitle({
  subtitle,
  title,
  description,
  isInView,
  center = true,
  lightColor = 'cyan-400',
  darkColor = 'cyan-700',
}: SectionTitleProps) {
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
    <div className={`relative mb-16 ${center ? 'text-center' : 'text-left'}`}>
      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-block"
      >
        <span className={`text-xs text-${lightColor} tracking-widest uppercase font-medium mb-2 block`}>
          {subtitle}
        </span>
        <h2 className="text-3xl md:text-4xl font-cyber text-white mb-4">
          {title}
        </h2>
      </motion.div>
      
      <motion.div 
        variants={lineVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`h-px bg-gradient-to-r from-transparent via-${lightColor} to-transparent ${center ? 'max-w-xs mx-auto' : 'max-w-xs'}`}
      />
      
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`text-gray-400 mt-6 ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
        >
          {description}
        </motion.p>
      )}
      
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className={`absolute -top-10 -left-10 w-20 h-20 text-${darkColor} opacity-20 pointer-events-none`}
        style={{
          background: `radial-gradient(circle, var(--tw-text-opacity) 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
} 