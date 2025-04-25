'use client';

import { FaServer, FaFilm, FaCalendarAlt, FaCode } from 'react-icons/fa';

export default function PartnershipTypes() {
  // Dữ liệu các hình thức hợp tác
  const partnershipTypes = [
    {
      id: 1,
      title: 'Đối Tác Nền Tảng',
      forWho: 'Các nền tảng công nghệ, social media, streaming',
      icon: <FaServer className="text-blue-400 w-8 h-8" />,
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
      color: 'blue'
    },
    {
      id: 2,
      title: 'Đối Tác Nội Dung',
      forWho: 'MCN, Agency, Content Creator Network',
      icon: <FaFilm className="text-purple-400 w-8 h-8" />,
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
      color: 'purple'
    },
    {
      id: 3,
      title: 'Đối Tác Sự Kiện',
      forWho: 'Event organizer, Tournament operator',
      icon: <FaCalendarAlt className="text-yellow-400 w-8 h-8" />,
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
      color: 'yellow'
    },
    {
      id: 4,
      title: 'Đối Tác Công Nghệ',
      forWho: 'Tech company, Solution provider',
      icon: <FaCode className="text-green-400 w-8 h-8" />,
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
      color: 'green'
    }
  ];

  return (
    <div className="mb-16">
      <div className="flex flex-col items-center mb-8">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            CÁC HÌNH THỨC HỢP TÁC
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partnershipTypes.map((type) => (
          <div 
            key={type.id}
            className={`bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-${type.color}-500/50 transition-all shadow-lg hover:shadow-${type.color}-500/20 group overflow-hidden relative`}
          >
            {/* Background glow effect */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 blur-3xl bg-${type.color}-500/5 group-hover:bg-${type.color}-500/10 transition-opacity duration-500`}></div>
            
            <div className="flex items-start gap-4 mb-4 relative z-10">
              <div className={`p-3 rounded-lg bg-${type.color}-500/10 flex-shrink-0`}>
                {type.icon}
              </div>
              <div>
                <h3 className={`text-xl text-${type.color}-400 font-semibold font-rajdhani tracking-wide`}>
                  {type.title}
                </h3>
                <p className="text-white/60 text-sm">
                  <span className="italic">Dành cho:</span> {type.forWho}
                </p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              <div>
                <h4 className={`text-${type.color}-400 font-medium mb-2 border-b border-${type.color}-500/20 pb-2`}>
                  Lợi ích:
                </h4>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full bg-${type.color}-400 flex-shrink-0 mt-1.5`}></span>
                      <span className="text-white/80 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className={`text-${type.color}-400 font-medium mb-2 border-b border-${type.color}-500/20 pb-2`}>
                  Yêu cầu:
                </h4>
                <ul className="space-y-2">
                  {type.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full bg-${type.color}-400 flex-shrink-0 mt-1.5`}></span>
                      <span className="text-white/80 text-sm">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 