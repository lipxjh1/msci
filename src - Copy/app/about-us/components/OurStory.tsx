"use client";

import Image from "next/image";

export default function OurStory() {
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
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CÂU CHUYỆN M-SCI
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden border border-white/20">
          <Image 
            src="/images/overwatch_bg_2.jpg" 
            alt="Câu chuyện M-SCI"
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041019]/80 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <Image 
              src="/images/overwatch_logo.png" 
              alt="M-SCI Logo"
              width={120}
              height={40}
              className="mx-auto"
            />
          </div>
        </div>
        
        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-gray-200 leading-relaxed">
            M-SCI không chỉ là một tựa game - đó là giấc mơ về một vũ trụ game được xây dựng bởi cộng đồng, cho cộng đồng. 
            Khởi đầu từ năm 2023, chúng tôi đặt ra sứ mệnh tạo nên một trải nghiệm game hành động sci-fi độc đáo, 
            nơi mọi người chơi đều có thể trở thành một phần của câu chuyện.
          </p>
          <p className="text-gray-200 leading-relaxed mt-4">
            Với đội ngũ phát triển đam mê và tài năng, M-SCI đang từng bước hiện thực hóa tầm nhìn về một game Việt Nam 
            đạt chuẩn quốc tế, nơi công nghệ và nghệ thuật hòa quyện để tạo nên trải nghiệm gaming hoàn toàn mới.
          </p>
        </div>
      </div>
    </div>
  );
} 