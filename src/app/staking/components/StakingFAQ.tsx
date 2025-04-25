'use client';

import { useState } from 'react';

export default function StakingFAQ() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    if (activeQuestion === index) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(index);
    }
  };

  const faqs = [
    {
      question: 'Làm sao để bắt đầu staking?',
      answer: (
        <div className="space-y-2">
          <p>Để bắt đầu staking, bạn cần thực hiện các bước sau:</p>
          <ol className="list-decimal ml-5 space-y-1">
            <li>Kết nối ví Web3 với game</li>
            <li>Chọn loại tài sản muốn stake</li>
            <li>Chọn gói thời gian phù hợp</li>
            <li>Xác nhận giao dịch</li>
          </ol>
        </div>
      )
    },
    {
      question: 'Tôi có thể rút sớm không?',
      answer: (
        <div className="space-y-2">
          <ul className="list-disc ml-5 space-y-1">
            <li>Gói Flexible: Rút bất cứ lúc nào</li>
            <li>Gói cố định: Rút sớm mất 50% thưởng tích lũy</li>
            <li>Emergency withdrawal: Mất toàn bộ thưởng</li>
          </ul>
        </div>
      )
    },
    {
      question: 'Phần thưởng được trả như thế nào?',
      answer: (
        <div className="space-y-2">
          <ul className="list-disc ml-5 space-y-1">
            <li>Token rewards: Tự động vào ví staking</li>
            <li>M-Coin: Cộng vào tài khoản game</li>
            <li>NFT/Items: Gửi vào inventory</li>
          </ul>
        </div>
      )
    },
    {
      question: 'Rủi ro của staking là gì?',
      answer: (
        <div className="space-y-2">
          <ul className="list-disc ml-5 space-y-1">
            <li>Biến động giá token</li>
            <li>Smart contract risk (đã được audit)</li>
            <li>Opportunity cost khi khóa tài sản</li>
          </ul>
          <p className="text-sm text-white/70 mt-2">
            Mặc dù chúng tôi đã thực hiện nhiều biện pháp bảo mật, nhưng vẫn có một số rủi ro vốn có khi tham gia staking. Hãy chắc chắn rằng bạn hiểu rõ các rủi ro này trước khi tham gia.
          </p>
        </div>
      )
    },
    {
      question: 'Tỷ lệ APY có thay đổi không?',
      answer: (
        <div className="space-y-2">
          <p>
            Tỷ lệ APY có thể thay đổi dựa trên các yếu tố sau:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Điều kiện thị trường</li>
            <li>Tổng giá trị đã stake (TVL)</li>
            <li>Các chương trình khuyến mãi đặc biệt</li>
          </ul>
          <p className="text-sm text-white/70 mt-2">
            Tỷ lệ APY được cập nhật hàng tuần và được công bố trên trang chủ của dự án.
          </p>
        </div>
      )
    },
    {
      question: 'Tôi có thể stake nhiều loại tài sản cùng lúc không?',
      answer: (
        <div className="space-y-2">
          <p>
            Có, bạn có thể stake nhiều loại tài sản cùng lúc:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Token $MSCI ở nhiều gói khác nhau</li>
            <li>Nhiều NFT Heroes cùng lúc</li>
            <li>Cung cấp thanh khoản cho nhiều pool</li>
          </ul>
          <p className="text-sm text-white/70 mt-2">
            Việc đa dạng hóa tài sản stake có thể giúp tối ưu hóa thu nhập thụ động.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-6">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CÂU HỎI THƯỜNG GẶP
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="space-y-4 mt-6">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full p-4 flex justify-between items-center text-left text-white font-rajdhani font-medium"
            >
              <span className="mr-2">{faq.question}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 transform transition-transform duration-300 ${activeQuestion === index ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              className={`px-4 overflow-hidden transition-all duration-300 ${
                activeQuestion === index ? 'max-h-96 pb-4' : 'max-h-0'
              }`}
            >
              <div className="text-white/80 font-rajdhani">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-[var(--accent-blue-bright)]/5 to-[var(--accent-blue-glow)]/10 rounded-lg border border-[var(--accent-blue-bright)]/20 text-center">
        <p className="text-white font-rajdhani mb-2">Không tìm thấy câu trả lời bạn cần?</p>
        <button className="bg-[var(--accent-blue-bright)]/20 hover:bg-[var(--accent-blue-bright)]/30 text-[var(--accent-blue-bright)] font-medium px-6 py-2 rounded-md transition-colors border border-[var(--accent-blue-bright)]/40 font-rajdhani tracking-wide">
          Xem FAQ mở rộng
        </button>
      </div>
    </div>
  );
} 