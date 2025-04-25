'use client';

import Image from 'next/image';

export default function PartnersHero() {
  return (
    <div className="relative h-[300px] md:h-[400px] overflow-hidden">
      <Image 
        src="/images/overwatch_bg_2.jpg" 
        alt="Partners Banner" 
        fill
        sizes="100vw"
        className="object-cover object-center brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/50 to-[#041019]/80"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 cyber-halo text-shadow-blue">
            TRỞ THÀNH ĐỐI TÁC M-SCI
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto px-4">
            M-SCI mời gọi các tổ chức, doanh nghiệp và cá nhân có tầm nhìn cùng hợp tác để phát triển hệ sinh thái game toàn diện. Hãy cùng chúng tôi tạo nên những giá trị bền vững cho cộng đồng game thủ toàn cầu.
          </p>
        </div>
      </div>
    </div>
  );
} 