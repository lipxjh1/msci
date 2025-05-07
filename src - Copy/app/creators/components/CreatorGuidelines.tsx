'use client';

import { useState } from 'react';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';
import GuidelineModal from './GuidelineModal';

export default function CreatorGuidelines() {
  const [showGuidelineModal, setShowGuidelineModal] = useState(false);
  const [activeGuideline, setActiveGuideline] = useState<'content' | 'community' | 'branding'>('content');
  
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

  // Dữ liệu chi tiết hướng dẫn
  const guidelineData = {
    content: {
      title: 'Hướng Dẫn Nội Dung',
      content: 'Hướng dẫn dưới đây giúp bạn tạo ra những nội dung có giá trị, chất lượng cao và phù hợp với cộng đồng M-SCI. Việc tuân thủ những hướng dẫn này sẽ giúp nội dung của bạn tiếp cận được nhiều người hơn và có khả năng được đề xuất bởi đội ngũ của chúng tôi.',
      dos: [
        "Tạo nội dung hướng dẫn chi tiết với lời giải thích rõ ràng",
        "Chia sẻ chiến thuật độc đáo và phương pháp chơi sáng tạo",
        "Tạo video phân tích sâu về cơ chế trò chơi",
        "Kể câu chuyện và chia sẻ trải nghiệm cá nhân với game",
        "Đưa tin về các sự kiện và cập nhật game một cách chính xác",
        "Thể hiện sự đam mê và nhiệt huyết với trò chơi",
        "Tổ chức các buổi phát sóng trực tiếp tương tác với cộng đồng",
        "Sử dụng thumbnail và tiêu đề hấp dẫn nhưng không gây hiểu lầm"
      ],
      donts: [
        "Sử dụng clickbait quá mức hoặc tiêu đề sai sự thật",
        "Đăng nội dung nhàm chán, lặp lại nhiều lần",
        "Giả vờ có thông tin độc quyền khi không có",
        "Quảng cáo quá nhiều hoặc không liên quan đến nội dung",
        "Sao chép nội dung của người sáng tạo khác",
        "Làm nội dung với chất lượng thấp chỉ để đạt số lượng",
        "Tạo nội dung tiêu cực chủ yếu chỉ trích trò chơi",
        "Chia sẻ thông tin sai lệch về gameplay hoặc cơ chế"
      ],
      tips: [
        "Tạo lịch phát hành nội dung đều đặn và thông báo cho người xem về lịch này",
        "Tương tác với bình luận và phản hồi từ cộng đồng của bạn",
        "Theo dõi các số liệu phân tích để hiểu loại nội dung nào hoạt động tốt nhất",
        "Cộng tác với các nhà sáng tạo nội dung khác để mở rộng phạm vi tiếp cận",
        "Đầu tư thời gian nghiên cứu xu hướng và cập nhật mới nhất",
        "Nâng cao kỹ năng biên tập để nội dung trở nên mạch lạc và hấp dẫn hơn"
      ]
    },
    community: {
      title: 'Quy Tắc Cộng Đồng',
      content: 'Quy tắc cộng đồng của chúng tôi được thiết kế để đảm bảo M-SCI là một không gian an toàn, tôn trọng và thân thiện cho mọi người. Chúng tôi tin rằng một cộng đồng lành mạnh sẽ thúc đẩy sự phát triển của trò chơi và mang lại trải nghiệm tốt nhất cho tất cả mọi người.',
      dos: [
        "Tôn trọng mọi thành viên trong cộng đồng bất kể nền tảng hay trình độ",
        "Giữ ngôn ngữ văn minh và phù hợp trong tất cả tương tác",
        "Khuyến khích thảo luận tích cực và hỗ trợ người mới",
        "Báo cáo hành vi không phù hợp thay vì đáp trả",
        "Sử dụng các kênh phản hồi chính thức để góp ý xây dựng",
        "Chia sẻ kiến thức và kinh nghiệm với cộng đồng",
        "Tôn trọng sự đa dạng và khác biệt trong quan điểm",
        "Giữ các cuộc tranh luận tập trung vào vấn đề, không cá nhân hóa"
      ],
      donts: [
        "Sử dụng ngôn ngữ thù ghét, phân biệt đối xử hoặc quấy rối",
        "Spam nội dung, bình luận hoặc tin nhắn trong các kênh cộng đồng",
        "Kêu gọi tẩy chay hoặc tấn công cá nhân/nhóm người chơi",
        "Chia sẻ thông tin cá nhân của người khác mà không được phép",
        "Lợi dụng lỗi game và khuyến khích người khác làm điều tương tự",
        "Quảng cáo dịch vụ bên ngoài không liên quan hoặc chưa được phê duyệt",
        "Cố tình gây rối loạn trong các sự kiện cộng đồng",
        "Phát tán thông tin sai lệch về trò chơi hoặc nhà phát triển"
      ],
      tips: [
        "Tham gia các sự kiện cộng đồng thường xuyên để xây dựng mối quan hệ",
        "Hỗ trợ người mới chơi game bằng cách chia sẻ kinh nghiệm và hướng dẫn",
        "Tham gia các cuộc thảo luận một cách xây dựng, đưa ra ý kiến có cơ sở",
        "Sử dụng các kênh phản hồi chính thức để báo cáo lỗi hoặc vấn đề",
        "Hãy nhớ rằng đằng sau mỗi nhân vật là một người thật với cảm xúc thật",
        "Luôn cân nhắc về tác động của từ ngữ trước khi gửi tin nhắn"
      ]
    },
    branding: {
      title: 'Hướng Dẫn Thương Hiệu',
      content: 'Hướng dẫn sử dụng thương hiệu M-SCI nhằm đảm bảo tính nhất quán và chuyên nghiệp khi bạn đại diện cho M-SCI trong nội dung của mình. Việc tuân thủ những hướng dẫn này giúp tăng cường nhận diện thương hiệu và tạo sự tin cậy với người xem.',
      dos: [
        "Sử dụng logo M-SCI chính thức từ bộ công cụ nhà sáng tạo",
        "Theo đúng bảng màu và phông chữ được cung cấp",
        "Đặt logo ở vị trí rõ ràng nhưng không quá lớn",
        "Sử dụng hashtag #MSCICreator trong tất cả nội dung liên quan",
        "Đề cập M-SCI một cách chính xác và tôn trọng",
        "Sử dụng hình ảnh trò chơi chất lượng cao",
        "Làm rõ vai trò của bạn là nhà sáng tạo nội dung đối tác",
        "Sử dụng các mẫu thumbnail và biểu ngữ được cung cấp"
      ],
      donts: [
        "Biến đổi hoặc làm méo mó logo M-SCI",
        "Sử dụng màu sắc không phù hợp với hướng dẫn thương hiệu",
        "Đặt logo trên nền khó nhìn hoặc kém chất lượng",
        "Tự nhận là nhân viên chính thức của M-SCI",
        "Sử dụng tài sản thương hiệu M-SCI cho dự án không liên quan",
        "Tạo nội dung giả mạo như thông báo hoặc cập nhật chính thức",
        "Kết hợp logo M-SCI với nội dung không phù hợp",
        "Sử dụng các tài sản thương hiệu quá hạn hoặc đã bị thu hồi"
      ],
      tips: [
        "Tải về bộ công cụ thương hiệu đầy đủ từ cổng thông tin nhà sáng tạo",
        "Kiểm tra thường xuyên các cập nhật hướng dẫn thương hiệu",
        "Tạo mẫu thumbnail riêng phù hợp với hướng dẫn để sử dụng nhất quán",
        "Kết hợp màu sắc thương hiệu vào phong cách nội dung của bạn",
        "Tham khảo ý kiến từ đội ngũ M-SCI nếu không chắc chắn về việc sử dụng",
        "Học hỏi từ các nhà sáng tạo nội dung hàng đầu về cách họ sử dụng thương hiệu"
      ]
    }
  };

  const handleOpenGuidelineModal = (type: 'content' | 'community' | 'branding') => {
    setActiveGuideline(type);
    setShowGuidelineModal(true);
  };

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
          
          <div className="mt-4">
            <button 
              onClick={() => handleOpenGuidelineModal('content')}
              className="w-full py-2.5 bg-green-500 text-white font-bold border border-green-400/40 hover:bg-green-600 rounded transition-colors uppercase text-sm tracking-wider"
            >
              Xem Chi Tiết
            </button>
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
          
          <div className="mt-4">
            <button 
              onClick={() => handleOpenGuidelineModal('community')}
              className="w-full py-2.5 bg-red-500 text-white font-bold border border-red-400/40 hover:bg-red-600 rounded transition-colors uppercase text-sm tracking-wider"
            >
              Xem Chi Tiết
            </button>
          </div>
        </div>
      </div>
      
      {/* Additional Guidelines Box */}
      <div className="mt-8 bg-white/5 backdrop-blur-md rounded-lg p-6 border border-[var(--accent-blue-bright)]/30 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-[var(--accent-blue-bright)] p-2 rounded-full bg-[var(--accent-blue-bright)]/10">
            <FaInfoCircle className="h-5 w-5" />
          </div>
          <h3 className="text-lg text-white font-semibold font-rajdhani tracking-wide">Hướng Dẫn Thương Hiệu</h3>
        </div>
        
        <div className="text-white/70 space-y-2">
          <p>Tất cả nội dung phải tuân thủ điều khoản dịch vụ của M-SCI và nền tảng của bạn.</p>
          <p>Bạn cần gắn thẻ <span className="text-[var(--accent-blue-bright)]">#MSCICreator</span> trong nội dung để được theo dõi và tính thưởng.</p>
          <p>Đội ngũ M-SCI sẽ xem xét nội dung định kỳ để đảm bảo chất lượng và tính phù hợp.</p>
          <p>Hỗ trợ các nhà sáng tạo nội dung khác và góp phần xây dựng cộng đồng tích cực.</p>
        </div>
        
        <div className="mt-4">
          <button 
            onClick={() => handleOpenGuidelineModal('branding')}
            className="w-full py-2.5 bg-[var(--accent-blue-bright)] text-white font-bold border border-[var(--accent-blue-bright)]/40 hover:bg-blue-600 rounded transition-colors uppercase text-sm tracking-wider"
          >
            Xem Chi Tiết
          </button>
        </div>
      </div>
      
      {/* Modal */}
      <Modal
        isOpen={showGuidelineModal}
        onClose={() => setShowGuidelineModal(false)}
        title={guidelineData[activeGuideline].title}
        size="lg"
      >
        <GuidelineModal section={guidelineData[activeGuideline]} />
      </Modal>
    </div>
  );
} 