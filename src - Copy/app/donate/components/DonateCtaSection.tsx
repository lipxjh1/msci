"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

export default function DonateCtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 bg-[url('/images/particle_overlay.png')] opacity-10 z-0"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-6">
            Cùng Nhau <span className="text-cyan-400">Kiến Tạo</span> Tương Lai
          </h2>
          
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Mỗi đóng góp từ bạn đều góp phần vào sứ mệnh đưa game Việt Nam vươn tầm quốc tế.
            Hãy là một phần của hành trình này cùng M-SCI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/donate/premium-packages">
                <button
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg shadow-lg shadow-cyan-500/20 transform hover:scale-105 transition-all duration-300"
                >
                  Donate Ngay
                </button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/donate/thong-tin">
                <button
                  className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg border border-gray-700 transform hover:scale-105 transition-all duration-300"
                >
                  Tìm Hiểu Thêm
                </button>
              </Link>
            </motion.div>
          </div>
          
          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-gray-400 mb-4">Đã có hơn 5,000+ người ủng hộ</p>
            
            <div className="flex justify-center items-center gap-6">
              <div className="flex -space-x-4">
                {[...Array(5)].map((_, index) => (
                  <div 
                    key={index}
                    className="w-10 h-10 rounded-full border-2 border-gray-800 bg-gray-700"
                  ></div>
                ))}
                <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center text-white font-semibold text-sm">
                  +99
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-white font-semibold ml-1">4.9/5</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
    </section>
  );
} 