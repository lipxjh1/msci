'use client';

import { useState } from 'react';
import { FaTimes, FaQuestion, FaInfoCircle } from 'react-icons/fa';

// Component Popup cho hỏi đáp chi tiết
function FAQDetailPopup({ faqItem, onClose }: { faqItem: FAQItem, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className="w-full max-w-3xl bg-gradient-to-b from-[var(--overwatch-dark-blue)]/95 to-[var(--overwatch-black)]/95 rounded-xl border border-white/10 shadow-2xl transform transition-all duration-300 overflow-hidden"
      >
        {/* Header & Close button */}
        <div className="p-6 bg-[var(--accent-blue-bright)]/10 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <FaTimes />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[var(--accent-blue-bright)]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <FaQuestion className="text-[var(--accent-blue-bright)] w-6 h-6" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 font-rajdhani">
                {faqItem.question}
              </h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-white/5 rounded-lg p-5 border border-white/10 mb-6">
            <h3 className="text-xl text-white font-medium mb-3 pb-2 border-b border-white/10 flex items-center">
              <FaInfoCircle className="mr-2" /> Câu trả lời
            </h3>
            <div className="text-white/80 space-y-4">
              <p>{faqItem.answer}</p>
            </div>
          </div>

          {faqItem.relatedInfo && (
            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
              <h3 className="text-xl text-white font-medium mb-3 pb-2 border-b border-white/10">
                Thông tin liên quan
              </h3>
              <div className="space-y-3">
                {faqItem.relatedInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[var(--accent-blue-bright)] rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-white/80">{info}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {faqItem.additionalResources && (
            <div className="mt-6 bg-[var(--accent-blue-bright)]/5 p-4 rounded-lg border border-[var(--accent-blue-bright)]/20">
              <h4 className="text-white font-medium mb-2">Tài nguyên bổ sung</h4>
              <ul className="space-y-2 text-white/80">
                {faqItem.additionalResources.map((resource, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-[var(--accent-blue-bright)] rounded-full"></span>
                    <a 
                      href={resource.link} 
                      className="text-[var(--accent-blue-bright)] hover:underline"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] rounded-md border border-[var(--accent-blue-bright)]/40 hover:bg-[var(--accent-blue-bright)]/30 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ResourceLink {
  title: string;
  link: string;
}

interface FAQItem {
  question: string;
  answer: string;
  relatedInfo?: string[];
  additionalResources?: ResourceLink[];
}

export default function CreatorFAQ() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [detailFAQ, setDetailFAQ] = useState<FAQItem | null>(null);

  const toggleQuestion = (index: number) => {
    if (activeQuestion === index) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(index);
    }
  };

  const openFAQDetail = (faq: FAQItem) => {
    setDetailFAQ(faq);
  };

  const closeFAQDetail = () => {
    setDetailFAQ(null);
  };

  const faqs: FAQItem[] = [
    {
      question: "Ai có thể tham gia Chương Trình Nhà Sáng Tạo Nội Dung M-SCI?",
      answer: "Bất kỳ ai tạo nội dung game, có kênh YouTube, Twitch, TikTok hoặc các nền tảng xã hội khác với ít nhất 1.000 người theo dõi đều có thể đăng ký. Chúng tôi tìm kiếm những người đam mê game và có khả năng sáng tạo nội dung hấp dẫn về M-SCI.",
      relatedInfo: [
        "Chúng tôi xem xét cả chất lượng nội dung và lượng người theo dõi khi xét duyệt đơn đăng ký",
        "Người sáng tạo nội dung ở mọi ngôn ngữ đều được chào đón",
        "Cũng chấp nhận các nền tảng nội dung blog và podcast"
      ],
      additionalResources: [
        {
          title: "Hướng dẫn đăng ký chi tiết",
          link: "#"
        },
        {
          title: "Các tiêu chí xét duyệt",
          link: "#"
        }
      ]
    },
    {
      question: "Làm thế nào để tôi kiếm được M-Coin từ việc tạo nội dung?",
      answer: "Bạn kiếm được M-Coin dựa trên lượt xem, tương tác, chất lượng nội dung và sự tham gia của cộng đồng. Chúng tôi có hệ thống thưởng rõ ràng dựa trên hiệu suất và loại nội dung. Ngoài ra, còn có phần thưởng đặc biệt cho nội dung viral, lựa chọn của cộng đồng và các giải thưởng khác.",
      relatedInfo: [
        "Tỷ lệ quy đổi: 1 M-Coin = 1.000 VNĐ khi rút về tài khoản ngân hàng",
        "Có thể sử dụng M-Coin để mua vật phẩm trong game với giá ưu đãi",
        "Nhà sáng tạo cấp cao nhận được phần chia doanh thu từ các giao dịch được tạo ra qua liên kết của họ"
      ],
      additionalResources: [
        {
          title: "Bảng tỷ lệ thưởng chi tiết",
          link: "#"
        },
        {
          title: "Cách tối ưu hóa thu nhập M-Coin",
          link: "#"
        }
      ]
    },
    {
      question: "Tôi có thể tạo những loại nội dung nào cho chương trình?",
      answer: "Chúng tôi khuyến khích nhiều loại nội dung khác nhau như hướng dẫn, phát trực tiếp, đưa tin esports, nghệ thuật người hâm mộ, thảo luận cốt truyện và đánh giá bản cập nhật. Nội dung phải tuân thủ hướng dẫn của chúng tôi và quy tắc cộng đồng.",
      relatedInfo: [
        "Nội dung tập trung vào gameplay, chiến thuật và phân tích thường có hiệu suất tốt nhất",
        "Các video hướng dẫn ngắn dưới 10 phút rất phổ biến trong cộng đồng",
        "Các buổi phát trực tiếp ít nhất 2 giờ được khuyến khích để tăng tương tác"
      ],
      additionalResources: [
        {
          title: "Ý tưởng nội dung cho người sáng tạo mới",
          link: "#"
        },
        {
          title: "Bộ công cụ thiết kế thumbnail",
          link: "#"
        }
      ]
    },
    {
      question: "Tôi có thể thăng cấp trong chương trình như thế nào?",
      answer: "Việc thăng cấp dựa trên số lượng người theo dõi và chất lượng nội dung của bạn. Khi bạn đạt được các mốc người theo dõi (10.000, 50.000, 100.000, 500.000), đội ngũ của chúng tôi sẽ đánh giá nội dung của bạn và xem xét thăng cấp cho bạn lên các cấp độ Bạc, Vàng, Kim Cương và Huyền Thoại.",
      relatedInfo: [
        "Đánh giá hiệu suất được thực hiện hàng quý cho việc thăng cấp",
        "Tỷ lệ tương tác và thời gian xem trung bình cũng được tính vào quá trình đánh giá",
        "Cần duy trì tính nhất quán trong việc đăng nội dung để được xem xét thăng cấp"
      ],
      additionalResources: [
        {
          title: "Yêu cầu cụ thể cho từng cấp độ",
          link: "#"
        },
        {
          title: "Lộ trình phát triển người sáng tạo",
          link: "#"
        }
      ]
    },
    {
      question: "Tôi có bị giới hạn về số lượng nội dung có thể tạo không?",
      answer: "Không, không có giới hạn về số lượng nội dung bạn có thể tạo. Tuy nhiên, chất lượng quan trọng hơn số lượng, và chúng tôi khuyến khích bạn tập trung vào việc tạo ra nội dung hấp dẫn và giá trị cao thay vì số lượng lớn nội dung chất lượng thấp.",
      relatedInfo: [
        "Chúng tôi khuyến nghị lịch đăng nội dung ổn định (2-3 lần/tuần) để duy trì tương tác",
        "Nội dung dài hơn và chất lượng cao được ưu tiên trong thuật toán gợi ý của chúng tôi",
        "Việc lập kế hoạch nội dung theo lịch phát hành cập nhật và sự kiện game có thể tăng lượt xem"
      ]
    },
    {
      question: "Khi nào tôi nhận được phần thưởng M-Coin?",
      answer: "Phần thưởng M-Coin được phân phối vào ngày 15 hàng tháng, dựa trên hoạt động của tháng trước. Bạn có thể theo dõi thu nhập tiềm năng của mình thông qua Bảng Điều Khiển Người Sáng Tạo, nơi hiển thị các số liệu và ước tính phần thưởng theo thời gian thực.",
      relatedInfo: [
        "M-Coin có thể được rút về tài khoản ngân hàng khi đạt ngưỡng tối thiểu 100.000 M-Coin",
        "Không có giới hạn tối đa về số lượng M-Coin có thể kiếm được mỗi tháng",
        "Bảng điều khiển người sáng tạo cập nhật dữ liệu hiệu suất hàng ngày"
      ],
      additionalResources: [
        {
          title: "Hướng dẫn rút tiền chi tiết",
          link: "#"
        },
        {
          title: "Chính sách thuế và thanh toán",
          link: "#"
        }
      ]
    },
    {
      question: "Tôi có thể sử dụng nội dung của M-SCI trong video của mình không?",
      answer: "Có, là một phần của chương trình, bạn được phép sử dụng hình ảnh, video và tài sản khác của M-SCI trong nội dung của mình. Chúng tôi cung cấp Bộ Tài Liệu Truyền Thông cho người sáng tạo đã được chấp thuận, bao gồm logo, hình ảnh và clip chất lượng cao để sử dụng.",
      relatedInfo: [
        "Bộ tài liệu truyền thông được cập nhật hàng tháng với nội dung mới",
        "Bạn cần trích dẫn nguồn khi sử dụng tác phẩm nghệ thuật chính thức",
        "Âm nhạc từ game có thể được sử dụng trong video nhưng có thể bị gắn cờ bởi ContentID"
      ],
      additionalResources: [
        {
          title: "Tải xuống bộ công cụ truyền thông",
          link: "#"
        },
        {
          title: "Thư viện âm nhạc được phép sử dụng",
          link: "#"
        }
      ]
    },
    {
      question: "Tôi cần thêm trợ giúp hoặc có thắc mắc khác thì sao?",
      answer: "Bạn có thể liên hệ với đội ngũ hỗ trợ người sáng tạo nội dung của chúng tôi qua email hotro-sangtao@msci.game hoặc qua kênh Discord #hotro-sangtao. Chúng tôi cam kết phản hồi trong vòng 24 giờ và cung cấp hỗ trợ ưu tiên cho các thành viên của chương trình.",
      relatedInfo: [
        "Các câu hỏi thường gặp được cập nhật hàng tháng dựa trên phản hồi từ cộng đồng",
        "Kênh Discord dành riêng có các buổi hỏi đáp trực tiếp hàng tuần",
        "Người sáng tạo cấp Bạc trở lên được hỗ trợ qua số điện thoại trực tiếp"
      ],
      additionalResources: [
        {
          title: "Tham gia Discord hỗ trợ",
          link: "#"
        },
        {
          title: "Gửi yêu cầu hỗ trợ",
          link: "#"
        }
      ]
    }
  ];

  return (
    <>
      <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
        <div className="flex justify-center mb-8">
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
                className={`overflow-hidden transition-all duration-300 ${
                  activeQuestion === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-4 pb-4">
                  <div className="text-white/80 font-rajdhani">
                    {faq.answer}
                  </div>
                  
                  <button 
                    onClick={() => openFAQDetail(faq)}
                    className="mt-3 text-sm text-[var(--accent-blue-bright)] hover:text-[var(--accent-blue-bright)]/80 transition-colors flex items-center"
                  >
                    <FaInfoCircle className="mr-1" /> Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10 text-center">
          <p className="text-white/80 mb-4">
            Bạn không tìm thấy câu trả lời cho câu hỏi của mình? Liên hệ với chúng tôi!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] rounded-md border border-[var(--accent-blue-bright)]/40 hover:bg-[var(--accent-blue-bright)]/30 transition-colors font-rajdhani tracking-wide">
              Gửi Email Hỗ Trợ
            </button>
            <button className="px-6 py-3 bg-[#5865F2]/20 text-[#5865F2] rounded-md border border-[#5865F2]/40 hover:bg-[#5865F2]/30 transition-colors font-rajdhani tracking-wide">
              Tham Gia Discord
            </button>
          </div>
        </div>
      </div>

      {/* Popup chi tiết */}
      {detailFAQ && (
        <FAQDetailPopup 
          faqItem={detailFAQ} 
          onClose={closeFAQDetail} 
        />
      )}
    </>
  );
}