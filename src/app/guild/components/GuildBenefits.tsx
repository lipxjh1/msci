"use client";

import Image from "next/image";

export default function GuildBenefits() {
  const benefits = [
    "Buff sức mạnh: Tăng đến 10% damage",
    "Buff may mắn: Tăng đến 10% tỷ lệ may mắn khi nâng cấp hero",
    "Phần thưởng khổng lồ từ Guild War",
    "Trải nghiệm chiến thuật trong các trận chiến quy mô lớn",
    "Kết nối và chiến đấu cùng những người chơi cùng chí hướng",
    "Hỗ trợ tài nguyên từ Guild Treasury",
    "Tham gia các nhiệm vụ Guild độc quyền"
  ];

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            LỢI ÍCH KHI THAM GIA GUILD
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="backdrop-blur-sm bg-white/5 p-8 rounded-xl border border-white/10 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="prose prose-lg prose-invert max-w-none">
              <ul className="space-y-3 text-gray-200">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span className="font-be-vietnam-pro">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-lg border border-cyan-500/20">
              <p className="text-center text-lg text-white font-orbitron">
                "Đoàn kết là sức mạnh - Guild là gia đình - Chiến thắng là vinh quang!"
              </p>
            </div>
          </div>
          
          <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden border border-white/20">
            <Image 
              src="/images/guild/guild-benefits.jpg" 
              alt="Guild Benefits"
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041019]/80 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="font-be-vietnam-pro text-white text-lg font-bold">Chiến đấu cùng đồng đội. Chiến thắng cùng Guild.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10 text-center">
            <p className="text-cyan-400 font-semibold mb-2">Level 1-3</p>
            <p className="font-be-vietnam-pro text-gray-300 text-sm">Buff Attack +3%</p>
          </div>
          <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10 text-center">
            <p className="text-cyan-400 font-semibold mb-2">Level 4-6</p>
            <p className="font-be-vietnam-pro text-gray-300 text-sm">Buff Attack +5%</p>
          </div>
          <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10 text-center">
            <p className="text-cyan-400 font-semibold mb-2">Level 7-9</p>
            <p className="font-be-vietnam-pro text-gray-300 text-sm">Buff Attack +8%</p>
          </div>
          <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10 text-center">
            <p className="text-cyan-400 font-semibold mb-2">Level 10</p>
            <p className="font-be-vietnam-pro text-gray-300 text-sm">Buff Attack +10%</p>
          </div>
        </div>
      </div>
    </div>
  );
} 