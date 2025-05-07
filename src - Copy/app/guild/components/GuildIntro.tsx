"use client";

import Image from "next/image";

export default function GuildIntro() {
  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 md:p-8 rounded-xl border border-white/10 shadow-xl relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <Image 
          src="/images/grid_pattern.svg" 
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex justify-center mb-8">
        <h2 className="font-[var(--font-orbitron)] text-2xl md:text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            TRONG THẾ GIỚI M-SCI NĂM 2049
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden border border-white/20">
          <Image 
            src="/images/guild/guild-team.jpg" 
            alt="Liên minh Guild"
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041019]/80 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="font-be-vietnam-pro text-white text-lg font-bold">Guild - Gia Đình Thứ Hai Của Bạn</p>
          </div>
        </div>
        
        <div className="prose prose-lg prose-invert max-w-none">
          <p className="font-be-vietnam-pro text-gray-200 leading-relaxed">
            Không anh hùng đơn độc nào có thể đánh bại được đội quân robot và drone của X-Corp.
            Hệ thống Guild chính là nơi các chiến binh tập hợp, xây dựng sức mạnh tập thể và
            cùng nhau viết nên những huyền thoại bất diệt!
          </p>
          <p className="font-be-vietnam-pro text-gray-200 leading-relaxed mt-4">
            Trong vũ trụ M-SCI, Guild không chỉ là nơi gặp gỡ những người chơi có cùng chí hướng, 
            mà còn là điểm tựa vững chắc, nơi bạn tìm thấy sức mạnh tập thể và tình bạn bền vững.
            Đoàn kết là sức mạnh - Guild là gia đình - Chiến thắng là vinh quang!
          </p>
        </div>
      </div>
    </div>
  );
} 