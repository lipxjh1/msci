'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

export default function TokenFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs: FAQ[] = [
    {
      question: "Token M-SCI có tổng cung là bao nhiêu?",
      answer: "Tổng cung của token M-SCI là 1 tỷ (1,000,000,000) token, được phân bổ cho nhiều mục đích khác nhau bao gồm phần thưởng chơi game, đội ngũ phát triển, marketing, và thanh khoản."
    },
    {
      question: "Làm thế nào để kiếm token M-SCI?",
      answer: "Bạn có thể kiếm token M-SCI thông qua nhiều cách: (1) Tham gia chơi game và nhận phần thưởng Play-to-Earn, (2) Tham gia các giải đấu và sự kiện trong game, (3) Stake token để nhận lãi, (4) Tham gia chương trình giới thiệu người dùng mới, hoặc (5) Mua token trên các sàn giao dịch được hỗ trợ."
    },
    {
      question: "Token M-SCI có đốt (burning) không?",
      answer: "Có, chúng tôi áp dụng cơ chế đốt token định kỳ để giảm lạm phát và bảo vệ giá trị dài hạn cho người nắm giữ. 30% phí giao dịch marketplace, 50% phí nâng cấp nhân vật và 100% phí tạo guild sẽ được đưa vào quỹ đốt token."
    },
    {
      question: "Vesting schedule của token như thế nào?",
      answer: "Token dành cho đội ngũ và nhà đầu tư sẽ được khóa trong thời gian nhất định để đảm bảo cam kết dài hạn. Đội ngũ phát triển sẽ có lịch vesting 24 tháng với 6 tháng cliff. Nhà đầu tư chiến lược có lịch vesting 18 tháng với 3 tháng cliff. Chi tiết đầy đủ có thể tìm hiểu trong whitepaper của chúng tôi."
    },
    {
      question: "M-SCI sẽ được niêm yết ở đâu?",
      answer: "M-SCI sẽ được niêm yết trên các sàn giao dịch tập trung (CEX) hàng đầu như Binance, OKX, Gate.io và các sàn phi tập trung (DEX) như PancakeSwap. Chúng tôi sẽ liên tục mở rộng danh sách sàn giao dịch để tăng khả năng tiếp cận và thanh khoản."
    },
    {
      question: "Có thể stake token M-SCI không?",
      answer: "Có, người dùng có thể stake token M-SCI để nhận lãi suất hấp dẫn và các đặc quyền trong game như: giảm phí giao dịch, truy cập sớm vào các tính năng mới, và cơ hội tham gia vào quản trị DAO."
    },
    {
      question: "Token M-SCI xây dựng trên blockchain nào?",
      answer: "Token M-SCI được phát triển trên blockchain Polygon (Layer 2 của Ethereum) để tận dụng tốc độ giao dịch nhanh, phí thấp và tính bền vững. Trong tương lai, chúng tôi có kế hoạch mở rộng sang các blockchain khác để tăng khả năng tương tác."
    },
    {
      question: "Làm thế nào để tham gia Private Sale/Public Sale?",
      answer: "Thông tin về các đợt mở bán private và public sale sẽ được thông báo trên các kênh chính thức của chúng tôi. Để không bỏ lỡ cơ hội, hãy theo dõi website chính thức và các kênh mạng xã hội của M-SCI."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl card-neon">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CÂU HỎI THƯỜNG GẶP
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className={`rounded-lg overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'bg-white/10 shadow-lg' : 'bg-white/5'
            }`}
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="font-rajdhani font-semibold text-white text-lg">
                {faq.question}
              </h3>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                openIndex === index ? 'bg-[#FFD700]/20 rotate-180' : 'bg-white/10'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4 text-white/70">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <p className="text-white/70 text-sm max-w-2xl mx-auto mb-6">
          Bạn có thêm câu hỏi? Hãy liên hệ với đội ngũ của chúng tôi qua các kênh cộng đồng dưới đây.
        </p>
        
        <div className="flex justify-center gap-4">
          <a 
            href="https://t.me/MSCIToken" 
            className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white transition-colors"
          >
            Telegram
          </a>
          <a 
            href="https://discord.gg/msci-game" 
            className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white transition-colors"
          >
            Discord
          </a>
          <a 
            href="mailto:info@msci.game" 
            className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
} 