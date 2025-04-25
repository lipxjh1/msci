'use client';

import { FaCheck, FaTimes } from 'react-icons/fa';

export default function CreatorGuidelines() {
  const encouragedContent = [
    "Hướng dẫn và mẹo chơi game",
    "Cách xây dựng nhân vật và chiến lược",
    "Những khoảnh khắc chơi game nổi bật",
    "Bình luận thể thao điện tử",
    "Đưa tin sự kiện cộng đồng",
    "Nghệ thuật người hâm mộ",
    "Thảo luận về cốt truyện",
    "Đánh giá bản cập nhật"
  ];
  
  const communityRules = [
    "Không có nội dung thù hận/phân biệt đối xử",
    "Không spam hoặc câu view",
    "Tôn trọng bản quyền",
    "Không tiết lộ thông tin bảo mật",
    "Duy trì môi trường tích cực",
    "Tuân thủ quy định của nền tảng"
  ];

  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-8">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            HƯỚNG DẪN NỘI DUNG
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Encouraged Content */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-green-500/50 transition-all shadow-lg hover:shadow-green-500/20 group relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/5 rounded-full blur-3xl"></div>
          
          <h3 className="text-xl text-green-400 font-semibold mb-6 font-rajdhani tracking-wide flex items-center relative z-10">
            <span className="inline-block w-8 h-8 mr-3 rounded-full bg-green-500/20 flex items-center justify-center">
              <FaCheck className="h-4 w-4 text-green-400" />
            </span>
            Nội Dung Được Khuyến Khích
          </h3>
          
          <div className="space-y-3 pl-2">
            {encouragedContent.map((item, index) => (
              <div key={index} className="flex items-start gap-2 group/item relative">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5"></span>
                <p className="text-white/80">{item}</p>
                <div className="absolute -inset-2 bg-green-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity rounded pointer-events-none"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-white/60 text-sm italic">
              Nội dung tập trung vào gameplay, chiến thuật, và kinh nghiệm người chơi thường nhận được tương tác cao hơn.
            </p>
          </div>
        </div>
        
        {/* Community Rules */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-red-500/50 transition-all shadow-lg hover:shadow-red-500/20 group relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-500/5 rounded-full blur-3xl"></div>
          
          <h3 className="text-xl text-red-400 font-semibold mb-6 font-rajdhani tracking-wide flex items-center relative z-10">
            <span className="inline-block w-8 h-8 mr-3 rounded-full bg-red-500/20 flex items-center justify-center">
              <FaTimes className="h-4 w-4 text-red-400" />
            </span>
            Quy Tắc Cộng Đồng
          </h3>
          
          <div className="space-y-3 pl-2">
            {communityRules.map((rule, index) => (
              <div key={index} className="flex items-start gap-2 group/item relative">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5"></span>
                <p className="text-white/80">{rule}</p>
                <div className="absolute -inset-2 bg-red-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity rounded pointer-events-none"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-white/60 text-sm italic">
              Vi phạm quy tắc cộng đồng có thể dẫn đến cảnh báo, tạm ngưng hoặc loại bỏ khỏi chương trình.
            </p>
          </div>
        </div>
      </div>
      
      {/* Additional Guidelines Box */}
      <div className="mt-8 bg-white/5 backdrop-blur-md rounded-lg p-6 border border-[var(--accent-blue-bright)]/30 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-[var(--accent-blue-bright)] p-2 rounded-full bg-[var(--accent-blue-bright)]/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg text-white font-semibold font-rajdhani tracking-wide">Lưu Ý Quan Trọng</h3>
        </div>
        
        <div className="text-white/70 space-y-2">
          <p>Tất cả nội dung phải tuân thủ điều khoản dịch vụ của M-SCI và nền tảng của bạn.</p>
          <p>Bạn cần gắn thẻ <span className="text-[var(--accent-blue-bright)]">#MSCICreator</span> trong nội dung để được theo dõi và tính thưởng.</p>
          <p>Đội ngũ M-SCI sẽ xem xét nội dung định kỳ để đảm bảo chất lượng và tính phù hợp.</p>
          <p>Hỗ trợ các nhà sáng tạo nội dung khác và góp phần xây dựng cộng đồng tích cực.</p>
        </div>
      </div>
    </div>
  );
} 