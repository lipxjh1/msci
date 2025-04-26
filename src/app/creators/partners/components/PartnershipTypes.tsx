'use client';

import { useState } from 'react';
import { FaServer, FaFilm, FaCalendarAlt, FaCode, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function PartnershipTypes() {
  // State để quản lý popup
  const [selectedPartner, setSelectedPartner] = useState<number | null>(null);

  // Dữ liệu các hình thức hợp tác
  const partnershipTypes = [
    {
      id: 1,
      title: 'Đối Tác Nền Tảng',
      forWho: 'Các nền tảng công nghệ, social media, streaming',
      icon: <FaServer className="text-blue-400 w-10 h-10" />,
      benefits: [
        'Tích hợp API độc quyền',
        'Chia sẻ dữ liệu người dùng (tuân thủ GDPR)',
        'Co-branding và marketing chung',
        'Revenue sharing model linh hoạt'
      ],
      requirements: [
        'Nền tảng có từ 1 triệu người dùng hoạt động',
        'Hạ tầng công nghệ ổn định',
        'Cam kết hợp tác dài hạn (tối thiểu 1 năm)'
      ],
      color: 'blue',
      gradient: 'from-blue-500/20 to-blue-700/5',
      description: 'Là đối tác chiến lược giúp M-SCI mở rộng phạm vi tiếp cận và tương tác với người dùng. Chúng tôi cung cấp các công cụ API và SDK để tích hợp dịch vụ một cách liền mạch, đảm bảo trải nghiệm người dùng được nâng cao trên nhiều nền tảng khác nhau. Đối tác nền tảng còn được ưu tiên trong các hoạt động marketing và PR chung, cùng chia sẻ doanh thu theo mô hình linh hoạt phù hợp với đặc thù mỗi đối tác.',
      offer: 'Chúng tôi cung cấp hỗ trợ kỹ thuật 24/7, đào tạo đội ngũ của bạn, và phát triển các tính năng riêng biệt để tối ưu hóa hiệu suất hợp tác. Đối tác nền tảng còn được ưu tiên trong các sự kiện thương mại và cơ hội kết nối với mạng lưới đối tác toàn cầu của M-SCI.'
    },
    {
      id: 2,
      title: 'Đối Tác Nội Dung',
      forWho: 'MCN, Agency, Content Creator Network',
      icon: <FaFilm className="text-purple-400 w-10 h-10" />,
      benefits: [
        'Công cụ sáng tạo nội dung độc quyền',
        'Chương trình đào tạo creator',
        'Hỗ trợ marketing và phát triển kênh',
        'Mức hoa hồng ưu đãi đặc biệt'
      ],
      requirements: [
        'Quản lý tối thiểu 50 creator',
        'Tổng reach từ 10 triệu người',
        'Kinh nghiệm trong lĩnh vực gaming/esports'
      ],
      color: 'purple',
      gradient: 'from-purple-500/20 to-purple-700/5',
      description: 'Đối tác nội dung là những đơn vị tạo ra và quản lý nội dung chất lượng trong lĩnh vực gaming và esports. Chúng tôi cung cấp cho đối tác những công cụ sáng tạo nội dung độc quyền, nguồn tài nguyên phong phú, và sự hỗ trợ chuyên sâu để tăng hiệu quả sản xuất nội dung. Bạn sẽ được tham gia vào chương trình đào tạo creator toàn diện do các chuyên gia hàng đầu trong ngành hướng dẫn.',
      offer: 'Đối tác nội dung được hưởng mức hoa hồng ưu đãi đặc biệt, được ưu tiên tham gia các sự kiện độc quyền, và nhận được sự hỗ trợ về marketing để phát triển kênh. Chúng tôi cũng cung cấp cơ hội kết nối với các nhãn hàng và nhà tài trợ trong mạng lưới của M-SCI.'
    },
    {
      id: 3,
      title: 'Đối Tác Sự Kiện',
      forWho: 'Event organizer, Tournament operator',
      icon: <FaCalendarAlt className="text-yellow-400 w-10 h-10" />,
      benefits: [
        'License tổ chức giải đấu chính thức',
        'Hỗ trợ prize pool và tài trợ',
        'Quyền phát sóng độc quyền',
        'Branding và marketing support'
      ],
      requirements: [
        'Kinh nghiệm tổ chức tối thiểu 5 sự kiện gaming',
        'Đội ngũ chuyên nghiệp từ 10 người',
        'Khả năng tổ chức online/offline'
      ],
      color: 'yellow',
      gradient: 'from-yellow-500/20 to-yellow-700/5',
      description: 'Đối tác sự kiện là những đơn vị tổ chức sự kiện gaming và esports chuyên nghiệp. Khi tham gia chương trình đối tác, bạn sẽ được cấp license tổ chức các giải đấu chính thức của M-SCI, nhận được sự hỗ trợ prize pool và tài trợ từ các đối tác của chúng tôi. Bạn cũng sẽ có quyền phát sóng độc quyền và tiếp cận tới cộng đồng người chơi lớn mạnh của M-SCI.',
      offer: 'Chúng tôi hỗ trợ toàn diện trong việc tổ chức sự kiện từ khâu lên kế hoạch, marketing, vận hành đến phát sóng. Đối tác sự kiện còn được ưu tiên trong việc tổ chức các giải đấu quốc tế và sự kiện đặc biệt của M-SCI.'
    },
    {
      id: 4,
      title: 'Đối Tác Công Nghệ',
      forWho: 'Tech company, Solution provider',
      icon: <FaCode className="text-green-400 w-10 h-10" />,
      benefits: [
        'Tích hợp công nghệ vào hệ sinh thái M-SCI',
        'Tiếp cận cơ sở người dùng lớn',
        'Co-development opportunities',
        'Revenue sharing từ sản phẩm tích hợp'
      ],
      requirements: [
        'Công nghệ đã được thử nghiệm thực tế',
        'Đội ngũ kỹ thuật chuyên môn cao',
        'Khả năng scale và support 24/7'
      ],
      color: 'green',
      gradient: 'from-green-500/20 to-green-700/5',
      description: 'Đối tác công nghệ là những đơn vị có giải pháp công nghệ đột phá và sáng tạo có thể tích hợp vào hệ sinh thái M-SCI. Chúng tôi tạo cơ hội cho các đối tác công nghệ được tiếp cận với cơ sở người dùng lớn của mình, đồng thời cung cấp môi trường để thử nghiệm và hoàn thiện sản phẩm. Bạn sẽ được tham gia vào các dự án co-development và nhận được revenue sharing từ các sản phẩm tích hợp.',
      offer: 'M-SCI cung cấp cho đối tác công nghệ những thông tin phân tích thị trường chuyên sâu, hỗ trợ kỹ thuật, và cơ hội kết nối với các đối tác chiến lược khác trong hệ sinh thái. Chúng tôi cũng đầu tư vào các giải pháp công nghệ tiềm năng để cùng phát triển thành các sản phẩm thương mại.'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, 
      transition: { 
        type: "spring",
        stiffness: 50
      }
    }
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 25 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { 
        duration: 0.2
      }
    }
  };

  // Hàm mở popup
  const openPopup = (id: number) => {
    setSelectedPartner(id);
    // Ngăn cuộn trang khi popup mở
    document.body.style.overflow = 'hidden';
  };

  // Hàm đóng popup
  const closePopup = () => {
    setSelectedPartner(null);
    // Cho phép cuộn trang trở lại
    document.body.style.overflow = 'auto';
  };

  // Lấy thông tin đối tác được chọn
  const selectedPartnerInfo = selectedPartner 
    ? partnershipTypes.find(partner => partner.id === selectedPartner) 
    : null;

  return (
    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="mb-20"
    >
      <div className="flex flex-col items-center mb-12">
        <motion.h2 
          variants={itemVariants}
          className="font-orbitron text-3xl md:text-4xl font-bold text-white cyber-halo mb-4"
        >
          <span className="text-shadow-blue relative inline-block">
            CÁC HÌNH THỨC HỢP TÁC
          </span>
        </motion.h2>
        <motion.div 
          variants={itemVariants}
          className="h-1 w-32 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"
        ></motion.div>
        <motion.p 
          variants={itemVariants} 
          className="text-white/80 text-center max-w-2xl mt-4 text-lg"
        >
          M-SCI cung cấp nhiều phương thức hợp tác linh hoạt, phù hợp với tiềm năng và thế mạnh của từng đối tác
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {partnershipTypes.map((type) => (
          <motion.div 
            key={type.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className={`bg-gradient-to-br ${type.gradient} backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-lg overflow-hidden relative transition-all duration-300`}
          >
            {/* Background glow effect */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 blur-3xl bg-${type.color}-500/20 opacity-60`}></div>
            
            <div className="flex flex-col md:flex-row items-start gap-5 mb-6 relative z-10">
              <div className={`p-4 rounded-2xl bg-${type.color}-500/20 backdrop-blur-sm flex-shrink-0 shadow-lg shadow-${type.color}-500/10`}>
                {type.icon}
              </div>
              <div>
                <h3 className={`text-2xl text-${type.color}-400 font-bold font-rajdhani tracking-wide mb-1`}>
                  {type.title}
                </h3>
                <p className="text-white/70 text-base italic">
                  {type.forWho}
                </p>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div>
                <h4 className={`text-${type.color}-400 font-semibold text-lg mb-3 border-b border-${type.color}-500/30 pb-2 flex items-center`}>
                  <span className={`inline-block mr-2 w-2 h-2 rounded-full bg-${type.color}-400`}></span>
                  Lợi ích:
                </h4>
                <ul className="space-y-3">
                  {type.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className={`w-2 h-2 rounded-full bg-${type.color}-400 flex-shrink-0 mt-2`}></span>
                      <span className="text-white/90 text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className={`text-${type.color}-400 font-semibold text-lg mb-3 border-b border-${type.color}-500/30 pb-2 flex items-center`}>
                  <span className={`inline-block mr-2 w-2 h-2 rounded-full bg-${type.color}-400`}></span>
                  Yêu cầu:
                </h4>
                <ul className="space-y-3">
                  {type.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className={`w-2 h-2 rounded-full bg-${type.color}-400 flex-shrink-0 mt-2`}></span>
                      <span className="text-white/90 text-base">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* View more button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => openPopup(type.id)}
                className={`px-4 py-2 bg-${type.color}-500/20 text-${type.color}-400 rounded-lg border border-${type.color}-500/30 hover:bg-${type.color}-500/30 transition-colors duration-300 flex items-center gap-2`}
              >
                Xem thêm chi tiết
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </button>
            </div>
            
            {/* Hover effect overlay */}
            <div className={`absolute inset-0 border-2 border-${type.color}-500/0 rounded-xl transition-all duration-300 pointer-events-none group-hover:border-${type.color}-500/50`}></div>
          </motion.div>
        ))}
      </div>

      {/* Popup overlay */}
      <AnimatePresence>
        {selectedPartner && selectedPartnerInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closePopup}
          >
            {/* Popup content */}
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`bg-gradient-to-br from-[#041019] to-[#072030] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()} // Ngăn click truyền xuống overlay
            >
              {/* Header */}
              <div className={`p-6 border-b border-${selectedPartnerInfo.color}-500/30 relative`}>
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl bg-${selectedPartnerInfo.color}-500/20 backdrop-blur-sm shadow-lg`}>
                    {selectedPartnerInfo.icon}
                  </div>
                  <div>
                    <h3 className={`text-3xl text-${selectedPartnerInfo.color}-400 font-bold font-rajdhani tracking-wide`}>
                      {selectedPartnerInfo.title}
                    </h3>
                    <p className="text-white/70 text-lg italic">
                      {selectedPartnerInfo.forWho}
                    </p>
                  </div>
                </div>
                
                {/* Close button */}
                <button 
                  onClick={closePopup}
                  className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                <div>
                  <h4 className={`text-${selectedPartnerInfo.color}-400 font-semibold text-xl mb-3`}>
                    Mô tả chương trình
                  </h4>
                  <p className="text-white/90 text-lg leading-relaxed">
                    {selectedPartnerInfo.description}
                  </p>
                </div>

                <div>
                  <h4 className={`text-${selectedPartnerInfo.color}-400 font-semibold text-xl mb-3`}>
                    Lợi ích 
                  </h4>
                  <ul className="space-y-3">
                    {selectedPartnerInfo.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className={`w-2 h-2 rounded-full bg-${selectedPartnerInfo.color}-400 flex-shrink-0 mt-2`}></span>
                        <span className="text-white/90 text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className={`text-${selectedPartnerInfo.color}-400 font-semibold text-xl mb-3`}>
                    Yêu cầu
                  </h4>
                  <ul className="space-y-3">
                    {selectedPartnerInfo.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className={`w-2 h-2 rounded-full bg-${selectedPartnerInfo.color}-400 flex-shrink-0 mt-2`}></span>
                        <span className="text-white/90 text-lg">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className={`text-${selectedPartnerInfo.color}-400 font-semibold text-xl mb-3`}>
                    Đề xuất của chúng tôi
                  </h4>
                  <p className="text-white/90 text-lg leading-relaxed">
                    {selectedPartnerInfo.offer}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className={`p-6 border-t border-${selectedPartnerInfo.color}-500/30 flex justify-center`}>
                <a 
                  href="#partner-form" 
                  onClick={closePopup}
                  className={`px-6 py-3 bg-gradient-to-r from-${selectedPartnerInfo.color}-600 to-${selectedPartnerInfo.color}-700 text-white rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-${selectedPartnerInfo.color}-500/30 hover:scale-105 flex items-center gap-2`}
                >
                  Đăng ký ngay
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 