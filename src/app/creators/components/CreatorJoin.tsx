'use client';

import { useState } from 'react';
import { FaUserPlus, FaRocket, FaPencilAlt } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';
import TutorialModal from './TutorialModal';

export default function CreatorJoin() {
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [activeTutorial, setActiveTutorial] = useState<'register' | 'onboarding' | 'create'>('register');

  // Dữ liệu tutorial
  const tutorialData = {
    register: {
      id: 'register-tutorial',
      title: 'Hướng Dẫn Đăng Ký Nhà Sáng Tạo',
      category: 'Đăng Ký',
      description: 'Quy trình đăng ký để trở thành Nhà sáng tạo nội dung M-SCI từng bước một.',
      difficulty: 'beginner' as const,
      steps: [
        {
          id: 'step1',
          title: 'Chuẩn Bị Thông Tin',
          content: 'Trước khi đăng ký, hãy đảm bảo bạn đã chuẩn bị các thông tin sau: tên kênh/trang cá nhân, liên kết đến các nền tảng mạng xã hội, số lượng người theo dõi, và một vài ví dụ về nội dung bạn đã tạo trước đây.',
          image: '/images/register-prep.jpg'
        },
        {
          id: 'step2',
          title: 'Điền Mẫu Đăng Ký',
          content: 'Điền đầy đủ vào mẫu đăng ký trực tuyến trên trang web của chúng tôi. Hãy cung cấp thông tin chính xác và chi tiết, đặc biệt là về lượng người theo dõi và loại nội dung bạn tạo. Mẫu đăng ký sẽ mất khoảng 10-15 phút để hoàn thành.',
          videoUrl: 'https://www.youtube.com/embed/example'
        },
        {
          id: 'step3',
          title: 'Mô Tả Chiến Lược Nội Dung',
          content: 'Viết một đoạn mô tả ngắn gọn (khoảng 300-500 từ) về chiến lược nội dung của bạn cho M-SCI. Hãy nêu rõ loại nội dung bạn dự định tạo, tần suất đăng bài, và cách bạn sẽ tiếp cận đối tượng mục tiêu.'
        },
        {
          id: 'step4',
          title: 'Gửi Mẫu Đăng Ký',
          content: 'Sau khi kiểm tra lại thông tin, nhấn nút "Gửi" để hoàn tất quá trình đăng ký. Bạn sẽ nhận được email xác nhận cho biết đơn đăng ký của bạn đã được tiếp nhận và đang được xem xét.'
        },
        {
          id: 'step5',
          title: 'Quá Trình Xem Xét',
          content: 'Đội ngũ của chúng tôi sẽ xem xét đơn đăng ký của bạn trong vòng 3-5 ngày làm việc. Chúng tôi đánh giá dựa trên nhiều yếu tố, bao gồm chất lượng nội dung, số lượng người theo dõi, và sự phù hợp với M-SCI.'
        },
        {
          id: 'step6',
          title: 'Nhận Kết Quả',
          content: 'Bạn sẽ nhận được email thông báo kết quả. Nếu được chấp nhận, email sẽ bao gồm các bước tiếp theo để bắt đầu quá trình onboarding. Nếu không được chấp nhận, chúng tôi sẽ cung cấp phản hồi và bạn có thể đăng ký lại sau 3 tháng.'
        }
      ]
    },
    onboarding: {
      id: 'onboarding-tutorial',
      title: 'Quy Trình Khởi Động',
      category: 'Onboarding',
      description: 'Hướng dẫn các bước khởi động sau khi đơn đăng ký của bạn được chấp nhận.',
      difficulty: 'beginner' as const,
      steps: [
        {
          id: 'step1',
          title: 'Xác Nhận Tham Gia',
          content: 'Trong vòng 48 giờ sau khi nhận được email chấp nhận, hãy xác nhận sự tham gia của bạn bằng cách nhấp vào liên kết trong email. Điều này sẽ kích hoạt tài khoản Nhà sáng tạo của bạn.'
        },
        {
          id: 'step2',
          title: 'Đặt Lịch Buổi Định Hướng',
          content: 'Chọn thời gian tham gia buổi định hướng trực tuyến từ lịch có sẵn. Buổi định hướng này kéo dài khoảng 60 phút, trong đó đội ngũ M-SCI sẽ giới thiệu về chương trình và trả lời các câu hỏi của bạn.',
          videoUrl: 'https://www.youtube.com/embed/example2'
        },
        {
          id: 'step3',
          title: 'Tham Gia Buổi Định Hướng',
          content: 'Tham gia buổi định hướng thông qua nền tảng Discord hoặc Zoom theo liên kết được cung cấp. Đảm bảo bạn có kết nối internet ổn định và môi trường yên tĩnh để tham gia hiệu quả.'
        },
        {
          id: 'step4',
          title: 'Nhận Bộ Công Cụ Người Sáng Tạo',
          content: 'Sau buổi định hướng, bạn sẽ được cấp quyền truy cập vào kho tài nguyên với đầy đủ bộ công cụ người sáng tạo, bao gồm logo, hình ảnh, âm thanh, và tài liệu hướng dẫn thương hiệu.'
        },
        {
          id: 'step5',
          title: 'Thiết Lập Tài Khoản Bảng Điều Khiển',
          content: 'Tạo tài khoản trên bảng điều khiển Nhà sáng tạo M-SCI, nơi bạn có thể theo dõi hiệu suất, nhận nhiệm vụ, và quản lý thanh toán.'
        },
        {
          id: 'step6',
          title: 'Kết Nối Phương Thức Thanh Toán',
          content: 'Thiết lập thông tin thanh toán trong phần "Tài khoản" của bảng điều khiển để nhận phần thưởng M-Coin hàng tháng và các khoản thanh toán khác.'
        }
      ]
    },
    create: {
      id: 'create-tutorial',
      title: 'Bắt Đầu Sáng Tạo Nội Dung',
      category: 'Content',
      description: 'Hướng dẫn bắt đầu tạo nội dung chất lượng cao cho M-SCI.',
      difficulty: 'intermediate' as const,
      steps: [
        {
          id: 'step1',
          title: 'Lập Kế Hoạch Nội Dung',
          content: 'Bắt đầu bằng cách lập kế hoạch nội dung hàng tháng của bạn. Sử dụng template lịch nội dung trong bộ công cụ để quản lý và duy trì tần suất đăng bài đều đặn. Đảm bảo bạn tuân theo các yêu cầu tối thiểu của cấp độ Nhà sáng tạo của mình.'
        },
        {
          id: 'step2',
          title: 'Sử Dụng Bộ Công Cụ',
          content: 'Tận dụng các tài nguyên trong bộ công cụ Nhà sáng tạo, bao gồm logo, hình ảnh game, âm thanh, và template. Sử dụng đúng theo hướng dẫn thương hiệu để đảm bảo tính nhất quán và chuyên nghiệp.',
          image: '/images/creator-toolkit.jpg'
        },
        {
          id: 'step3',
          title: 'Tạo Nội Dung Đầu Tiên',
          content: 'Tạo nội dung đầu tiên của bạn theo hướng dẫn. Tập trung vào chất lượng hơn số lượng, và đảm bảo nội dung của bạn mang giá trị cho cộng đồng M-SCI. Đừng quên gắn các hashtag bắt buộc: #MSCICreator, #MSCI.'
        },
        {
          id: 'step4',
          title: 'Đăng và Quảng Bá Nội Dung',
          content: 'Đăng nội dung lên nền tảng của bạn, sau đó chia sẻ liên kết trong bảng điều khiển Nhà sáng tạo. Quảng bá nội dung của bạn trên các kênh xã hội khác để tăng tầm với và tương tác.',
          videoUrl: 'https://www.youtube.com/embed/example3'
        },
        {
          id: 'step5',
          title: 'Gửi Nội Dung Để Đánh Giá',
          content: 'Gửi nội dung của bạn để đánh giá thông qua bảng điều khiển Nhà sáng tạo. Đội ngũ của chúng tôi sẽ xem xét và cung cấp phản hồi trong vòng 48 giờ, đồng thời tính toán phần thưởng dựa trên chất lượng và tương tác.'
        },
        {
          id: 'step6',
          title: 'Nhận Thưởng và Phân Tích',
          content: 'Theo dõi hiệu suất nội dung của bạn trong bảng điều khiển phân tích. Nhận M-Coin và các phần thưởng khác vào ngày 15 hàng tháng. Sử dụng số liệu phân tích để cải thiện nội dung trong tương lai.'
        }
      ]
    }
  };

  const handleOpenTutorialModal = (type: 'register' | 'onboarding' | 'create') => {
    setActiveTutorial(type);
    setShowTutorialModal(true);
  };

  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-8">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CÁCH THAM GIA
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Step 1: Register */}
        <div className="flex-1 relative group">
          {/* Line connector for desktop */}
          <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-transparent z-10"></div>
          
          <div className="relative bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/20 h-full overflow-hidden">
            {/* Background Effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Step Number */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold">
              1
            </div>
            
            {/* Icon */}
            <div className="relative z-10 bg-blue-500/10 text-blue-400 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 transition-transform">
              <FaUserPlus className="w-7 h-7" />
            </div>
            
            {/* Title */}
            <h3 className="text-xl text-center text-white font-semibold mb-4 font-rajdhani tracking-wide">
              Đăng Ký
            </h3>
            
            {/* Content */}
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Điền mẫu đăng ký tại trang web của chúng tôi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Cung cấp liên kết đến kênh/trang cá nhân</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Mô tả chiến lược nội dung của bạn</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Chờ phê duyệt (3-5 ngày làm việc)</span>
              </li>
            </ul>
            
            {/* Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button 
                onClick={() => handleOpenTutorialModal('register')}
                className="w-full py-2.5 bg-blue-500 text-white font-bold border border-blue-400/40 hover:bg-blue-600 rounded transition-colors uppercase text-sm tracking-wider"
              >
                Xem Hướng Dẫn Đăng Ký
              </button>
            </div>
          </div>
        </div>
        
        {/* Step 2: Onboarding */}
        <div className="flex-1 relative group">
          {/* Line connectors for desktop */}
          <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-0.5 bg-gradient-to-l from-purple-500 to-transparent z-10"></div>
          <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-transparent z-10"></div>
          
          <div className="relative bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-purple-500/20 h-full overflow-hidden">
            {/* Background Effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Step Number */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold">
              2
            </div>
            
            {/* Icon */}
            <div className="relative z-10 bg-purple-500/10 text-purple-400 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 transition-transform">
              <FaRocket className="w-7 h-7" />
            </div>
            
            {/* Title */}
            <h3 className="text-xl text-center text-white font-semibold mb-4 font-rajdhani tracking-wide">
              Khởi Động
            </h3>
            
            {/* Content */}
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Tham gia buổi định hướng trực tuyến</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Nhận bộ công cụ người sáng tạo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Thiết lập quyền truy cập bảng điều khiển</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Kết nối phương thức thanh toán</span>
              </li>
            </ul>
            
            {/* Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button 
                onClick={() => handleOpenTutorialModal('onboarding')}
                className="w-full py-2.5 bg-purple-500 text-white font-bold border border-purple-400/40 hover:bg-purple-600 rounded transition-colors uppercase text-sm tracking-wider"
              >
                Xem Quy Trình Khởi Động
              </button>
            </div>
          </div>
        </div>
        
        {/* Step 3: Create */}
        <div className="flex-1 relative group">
          {/* Line connector for desktop */}
          <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-0.5 bg-gradient-to-l from-green-500 to-transparent z-10"></div>
          
          <div className="relative bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-green-500/50 transition-all shadow-lg hover:shadow-green-500/20 h-full overflow-hidden">
            {/* Background Effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Step Number */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 font-bold">
              3
            </div>
            
            {/* Icon */}
            <div className="relative z-10 bg-green-500/10 text-green-400 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 transition-transform">
              <FaPencilAlt className="w-7 h-7" />
            </div>
            
            {/* Title */}
            <h3 className="text-xl text-center text-white font-semibold mb-4 font-rajdhani tracking-wide">
              Bắt Đầu Sáng Tạo
            </h3>
            
            {/* Content */}
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Tạo nội dung theo hướng dẫn</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Gắn thẻ #MSCICreator</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Gửi nội dung để đánh giá</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Nhận thưởng hàng tháng</span>
              </li>
            </ul>
            
            {/* Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button 
                onClick={() => handleOpenTutorialModal('create')}
                className="w-full py-2.5 bg-green-500 text-white font-bold border border-green-400/40 hover:bg-green-600 rounded transition-colors uppercase text-sm tracking-wider"
              >
                Xem Hướng Dẫn Sáng Tạo
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Indicator Dots */}
      <div className="flex justify-center mt-6 gap-1 md:hidden">
        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
        <span className="w-2 h-2 rounded-full bg-purple-400"></span>
        <span className="w-2 h-2 rounded-full bg-green-400"></span>
      </div>
      
      {/* Tutorial Modal */}
      <Modal
        isOpen={showTutorialModal}
        onClose={() => setShowTutorialModal(false)}
        title={tutorialData[activeTutorial].title}
        size="lg"
      >
        <TutorialModal tutorial={tutorialData[activeTutorial]} />
      </Modal>
    </div>
  );
} 