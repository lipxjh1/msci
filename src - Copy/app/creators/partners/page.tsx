'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaArrowLeft, FaArrowUp } from 'react-icons/fa';
import PartnersHero from './components/PartnersHero';
import PartnershipTypes from './components/PartnershipTypes';
import PartnerRegistrationSteps from './components/PartnerRegistrationSteps';
import PartnerRegistrationForm from './components/PartnerRegistrationForm';
import PartnerCommitment from './components/PartnerCommitment';
import PartnerContact from './components/PartnerContact';

export default function PartnersPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)]">
      {/* Menu điều hướng */}
      <ThanhDieuHuongResponsive />

      {/* Header Banner */}
      <PartnersHero />

      <motion.div 
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        {/* Back button */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Link 
            href="/creators" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
          >
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <FaArrowLeft className="text-white/80 group-hover:text-white" />
            </span>
            <span>Quay lại trang Creators</span>
          </Link>
        </motion.div>

        {/* Các hình thức hợp tác */}
        <PartnershipTypes />
        
        {/* Quy trình trở thành đối tác */}
        <PartnerRegistrationSteps />
        
        {/* Form đăng ký đối tác */}
        <div id="partner-form">
          <PartnerRegistrationForm />
        </div>
        
        {/* Cam kết của M-SCI */}
        <PartnerCommitment />
        
        {/* Liên hệ hỗ trợ */}
        <PartnerContact />
        
        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-white/80 italic mb-4 text-lg">
            M-SCI - Cùng nhau kiến tạo tương lai gaming
          </p>
          <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent mx-auto"></div>
        </motion.div>
      </motion.div>

      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 z-50 hover:scale-110 transition-transform"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
} 