'use client';

import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'Token $MSCI có bao nhiêu tổng cung?',
    answer: 'Token $MSCI có tổng cung cố định là 1 tỷ (1,000,000,000) token. Cung lưu hành ban đầu là 150 triệu token. Các token còn lại sẽ được phân bổ theo lộ trình đã được công bố.'
  },
  {
    id: 2,
    question: 'Làm thế nào để mua token $MSCI?',
    answer: 'Bạn có thể mua token $MSCI trên các sàn DEX như PancakeSwap bằng cách kết nối ví (MetaMask, Trust Wallet) và swap BNB hoặc BUSD sang $MSCI. Sau này, token sẽ được niêm yết trên các sàn CEX lớn như Binance, OKX giúp việc mua bán dễ dàng hơn.'
  },
  {
    id: 3,
    question: 'Tại sao nên đầu tư vào token $MSCI?',
    answer: '$MSCI là token utility của dự án M-SCI, một hệ sinh thái gaming phi tập trung đầy tham vọng. Token có nhiều tính năng như governance, staking, và các use case trong game. Với tokenomics vững chắc, cơ chế đốt token, và đội ngũ phát triển mạnh mẽ, $MSCI có tiềm năng tăng trưởng lớn trong tương lai.'
  },
  {
    id: 4,
    question: 'Có thể stake token $MSCI để nhận thêm thu nhập không?',
    answer: 'Có, người dùng có thể stake token $MSCI để nhận lãi suất hấp dẫn từ 8-50% APY tùy vào thời gian stake và số lượng token. Nền tảng staking sẽ được ra mắt ngay sau đợt TGE (Token Generation Event).'
  },
  {
    id: 5,
    question: 'Token $MSCI được xây dựng trên blockchain nào?',
    answer: 'Token $MSCI được xây dựng trên nền tảng BNB Chain theo chuẩn BEP-20. Trong tương lai, dự án có kế hoạch mở rộng sang các blockchain khác thông qua các giải pháp cross-chain để tăng tính linh hoạt và khả năng tương tác.'
  },
  {
    id: 6,
    question: 'Làm thế nào để tham gia governance với token $MSCI?',
    answer: 'Người nắm giữ token $MSCI có thể tham gia bỏ phiếu cho các đề xuất phát triển trên nền tảng governance của dự án. Mỗi token tương đương với một phiếu bầu. Các quyết định quan trọng về phát triển game, tokenomics và các tính năng mới sẽ được quyết định bởi cộng đồng.'
  },
  {
    id: 7,
    question: 'Có bao nhiêu token MSCI đã được đốt?',
    answer: 'Từ khi ra mắt, đã có khoảng 10 triệu token MSCI đã được đốt thông qua cơ chế buy-back và đốt định kỳ. 30% phí giao dịch trong hệ sinh thái sẽ được sử dụng để mua lại và đốt token, giúp giảm cung và tăng giá trị token theo thời gian.'
  }
];

const TokenFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mb-20 animate-fade-in-section">
      <div className="flex justify-center mb-10">
        <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CÂU HỎI THƯỜNG GẶP
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>
      
      <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 shadow-xl overflow-hidden">
        <div className="divide-y divide-white/10">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="overflow-hidden faq-item">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left transition-colors hover:bg-white/5 focus:outline-none"
              >
                <h3 className="font-rajdhani text-lg font-bold text-white pr-8">{faq.question}</h3>
                <IoIosArrowDown 
                  className={`text-[var(--accent-blue-bright)] text-xl flex-shrink-0 transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : 'rotate-0'
                  }`} 
                />
              </button>
              
              <div 
                className={`faq-answer transition-all duration-300 ease-in-out overflow-hidden ${
                  activeIndex === index ? 'active max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 font-rajdhani text-gray-300">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <p className="font-rajdhani text-gray-400">
          Bạn có câu hỏi khác? <a href="#" className="text-[var(--accent-blue-bright)] hover:underline">Liên hệ với đội ngũ hỗ trợ</a>
        </p>
      </div>
    </div>
  );
};

export default TokenFAQ; 