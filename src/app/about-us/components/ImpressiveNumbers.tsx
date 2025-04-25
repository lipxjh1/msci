"use client";

export default function ImpressiveNumbers() {
  return (
    <div className="mb-16">
      <div className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
        <div className="flex justify-center mb-6">
          <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
            <span className="text-shadow-blue relative inline-block">
              CON SỐ ẤN TƯỢNG
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
          {/* Pre-registrations */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="text-3xl md:text-4xl font-bold text-[var(--accent-blue-bright)] mb-2">50,000+</div>
            <div className="text-gray-300 text-sm">Pre-registration</div>
          </div>
          
          {/* Community Members */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="text-3xl md:text-4xl font-bold text-[var(--accent-blue-bright)] mb-2">25,000+</div>
            <div className="text-gray-300 text-sm">Thành viên cộng đồng</div>
          </div>
          
          {/* Satisfaction Rate */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="text-3xl md:text-4xl font-bold text-[var(--accent-blue-bright)] mb-2">98%</div>
            <div className="text-gray-300 text-sm">Tỷ lệ hài lòng từ Beta testers</div>
          </div>
          
          {/* Team Size */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="text-3xl md:text-4xl font-bold text-[var(--accent-blue-bright)] mb-2">20+</div>
            <div className="text-gray-300 text-sm">Đội ngũ phát triển đam mê</div>
          </div>
          
          {/* Strategic Partners */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="text-3xl md:text-4xl font-bold text-[var(--accent-blue-bright)] mb-2">5</div>
            <div className="text-gray-300 text-sm">Đối tác chiến lược hàng đầu</div>
          </div>
        </div>
      </div>
    </div>
  );
}
