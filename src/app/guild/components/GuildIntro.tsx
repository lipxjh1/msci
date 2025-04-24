"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GuildIntro() {
  return (
    <motion.section 
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
            Trong thế giới M-SCI năm 2049
          </h2>
          <p className="text-lg mb-6 text-gray-300">
            Không anh hùng đơn độc nào có thể đánh bại được đội quân robot và drone của X-Corp. 
            Hệ thống Guild chính là nơi các chiến binh tập hợp, xây dựng sức mạnh tập thể và 
            cùng nhau viết nên những huyền thoại bất diệt!
          </p>
          <div className="p-6 bg-gray-900 border border-cyan-800 rounded-lg">
            <h3 className="font-orbitron text-2xl font-semibold text-cyan-400 mb-4">
              🏰 Guild - Gia Đình Thứ Hai Của Bạn
            </h3>
            <p className="text-lg text-gray-300">
              Đoàn kết là sức mạnh - Guild là gia đình - Chiến thắng là vinh quang!
            </p>
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden border-2 border-cyan-700">
          <Image
            src="/images/guild/guild-team.jpg"
            alt="Guild Team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6">
              <p className="text-xl font-orbitron text-white">
                Chiến đấu cùng đồng đội. Chiến thắng cùng Guild.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
} 