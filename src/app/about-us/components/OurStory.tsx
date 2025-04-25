"use client";

export default function OurStory() {
  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CÂU CHUYỆN M-SCI
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="prose prose-lg prose-invert max-w-none">
        <p className="text-center max-w-4xl mx-auto">
          M-SCI không chỉ là một tựa game - đó là giấc mơ về một vũ trụ game được xây dựng bởi cộng đồng, cho cộng đồng. 
          Khởi đầu từ năm 2023, chúng tôi đặt ra sứ mệnh tạo nên một trải nghiệm game hành động sci-fi độc đáo, 
          nơi mọi người chơi đều có thể trở thành một phần của câu chuyện.
        </p>
      </div>
    </div>
  );
} 