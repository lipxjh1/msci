"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function GuildCTA() {
  return (
    <motion.section 
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-2xl overflow-hidden border border-cyan-500/30 relative">
        <div className="absolute inset-0 bg-[url('/images/guild/guild-cta-bg.jpg')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative p-12 md:p-16 text-center">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
            BẮT ĐẦU HÀNH TRÌNH GUILD CỦA BẠN
          </h2>
          
          <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg">
            Tham gia M-SCI ngay hôm nay và trở thành một phần của cộng đồng Guild hùng mạnh nhất!
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/signup" className="inline-block px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg text-lg transition-colors">
                Đăng Ký Ngay
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/login" className="inline-block px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg text-lg transition-colors border border-cyan-500/50">
                Đăng Nhập
              </Link>
            </motion.div>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="bg-black/30 px-4 py-2 rounded-full border border-cyan-500/30">
              <p className="text-cyan-400 font-medium text-sm">
                "Đoàn kết là sức mạnh"
              </p>
            </div>
            <div className="bg-black/30 px-4 py-2 rounded-full border border-cyan-500/30">
              <p className="text-cyan-400 font-medium text-sm">
                "Guild là gia đình"
              </p>
            </div>
            <div className="bg-black/30 px-4 py-2 rounded-full border border-cyan-500/30">
              <p className="text-cyan-400 font-medium text-sm">
                "Chiến thắng là vinh quang"
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
} 