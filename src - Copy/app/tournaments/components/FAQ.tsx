'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

const faqs = [
  {
    id: 1,
    question: 'Tôi có cần biết cốt truyện để tham gia không?',
    answer: 'Không bắt buộc, nhưng hiểu cốt truyện sẽ giúp bạn đắm chìm hơn vào trải nghiệm và nắm bắt được các quy tắc và sự kiện đặc biệt dựa trên thế giới M-SCI.'
  },
  {
    id: 2,
    question: 'Làm sao để được vào Hội Đồng M-SCI?',
    answer: 'Để được vào Hội Đồng M-SCI gồm 21 thành viên xuất sắc, bạn cần đạt thành tích xuất sắc trong các giải đấu, có đóng góp tích cực cho cộng đồng và được bầu chọn bởi các thành viên hiện tại của Hội Đồng.'
  },
  {
    id: 3,
    question: 'Nhân vật nào mạnh nhất trong giải đấu?',
    answer: 'Mỗi nhân vật có điểm mạnh riêng, tùy thuộc vào chiến thuật và kỹ năng người chơi. Không có nhân vật nào mạnh nhất tuyệt đối, việc kết hợp nhân vật và chiến thuật phù hợp sẽ quyết định sự thành công.'
  },
  {
    id: 4,
    question: 'Làm thế nào để mở khóa các đấu trường đặc biệt?',
    answer: 'Đấu trường đặc biệt như Sao Hỏa Đỏ được mở khóa khi bạn hoàn thành các giải đấu cơ bản hoặc đạt đến một cấp độ nhất định trong hệ thống xếp hạng, thường là Chỉ Huy trở lên.'
  },
  {
    id: 5,
    question: 'Token $MSCI có thể sử dụng để làm gì?',
    answer: 'Token $MSCI là đơn vị tiền tệ chính của hệ sinh thái M-SCI, có thể sử dụng để mua nhân vật, vũ khí, trang phục đặc biệt, đăng ký giải đấu premium và đổi lấy các phần thưởng vật lý thực tế.'
  },
  {
    id: 6,
    question: 'Làm thế nào để nhận được danh hiệu đặc biệt?',
    answer: 'Danh hiệu đặc biệt như "Kẻ Hy Sinh" hay "Người Cứu Rỗi" được trao cho người chơi khi họ hoàn thành các nhiệm vụ đặc biệt trong giải đấu hoặc thể hiện kỹ năng/hành động đáng chú ý phù hợp với tiêu chí của danh hiệu đó.'
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 relative"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-cyan-400">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-gray-400 mt-2 max-w-2xl">
              Những thắc mắc phổ biến về giải đấu Esports M-SCI và cách tham gia
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-5 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors duration-300"
          >
            <FaQuestionCircle className="mr-2" />
            Đặt Câu Hỏi Mới
          </motion.button>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="border-b border-gray-700 last:border-b-0">
              <button
                className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-700/30 transition-colors duration-200"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-white font-medium">{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-cyan-400 flex-shrink-0 ml-4"
                >
                  <FaChevronDown />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-400 mb-4">Không tìm thấy câu trả lời cho câu hỏi của bạn?</p>
          <a href="#" className="text-cyan-400 hover:text-cyan-300 inline-flex items-center">
            Liên hệ với team hỗ trợ
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default FAQ; 