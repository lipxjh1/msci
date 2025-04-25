'use client';

import { useState } from 'react';
import { FaChartLine, FaCoins, FaHandsHelping, FaStar, FaTrophy, FaVideo, FaGamepad, FaNewspaper, FaPalette, FaRegNewspaper, FaCrown, FaGem, FaTimes } from 'react-icons/fa';

// Component Popup hiển thị chi tiết từng loại phần thưởng
function RewardPopup({ reward, onClose }: { reward: RewardType, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className="w-full max-w-4xl bg-gradient-to-b from-[var(--overwatch-dark-blue)]/95 to-[var(--overwatch-black)]/95 rounded-xl border border-white/10 shadow-2xl transform transition-all duration-300 overflow-hidden"
      >
        {/* Header & Close button */}
        <div className={`p-6 ${reward.bgColor} relative`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <FaTimes />
          </button>

          <div className="flex items-center">
            <div className={`w-16 h-16 ${reward.iconBg} rounded-full flex items-center justify-center mr-6 flex-shrink-0`}>
              {reward.icon}
            </div>
            
            <div>
              <h2 className={`text-3xl font-bold ${reward.textColor} mb-1 font-rajdhani`}>
                {reward.title}
              </h2>
              <p className="text-white/70">{reward.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-xl text-white font-medium mb-3 pb-2 border-b border-white/10">
                  Mô Tả Chi Tiết
                </h3>
                <p className="text-white/80">
                  {reward.fullDescription}
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-xl text-white font-medium mb-3 pb-2 border-b border-white/10">
                  Cách Kiếm {reward.title}
                </h3>
                <ul className="space-y-3">
                  {reward.howToEarn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full ${reward.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <span className="text-xs font-bold">{index + 1}</span>
                      </span>
                      <div>
                        <h4 className={`font-medium ${reward.textColor}`}>{item.title}</h4>
                        <p className="text-white/70 text-sm">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-xl text-white font-medium mb-3 pb-2 border-b border-white/10">
                  Mức Thưởng
                </h3>
                <ul className="space-y-3">
                  {reward.rewards.map((item, index) => (
                    <li key={index} className="flex items-center justify-between gap-2 py-2 border-b border-white/5 last:border-0">
                      <span className="text-white/80">{item.name}</span>
                      <span className={`${reward.textColor} font-medium`}>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-2">Thưởng Đặc Biệt</h3>
                <div className={`mt-3 p-3 ${reward.bgColor} rounded-lg`}>
                  <h4 className={`${reward.textColor} font-medium mb-1`}>{reward.specialReward.title}</h4>
                  <p className="text-white/80 text-sm">{reward.specialReward.description}</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-2">Chu kỳ thanh toán</h3>
                <p className="text-white/70 text-sm mb-3">
                  Phần thưởng được thanh toán vào ngày 15 hàng tháng, dựa trên hoạt động của tháng trước.
                </p>
                <button className={`w-full py-2 ${reward.buttonColor} rounded-md transition-all duration-300`}>
                  Đăng Ký Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RewardItemType {
  name: string;
  value: string;
}

interface HowToEarnType {
  title: string;
  description: string;
}

interface SpecialRewardType {
  title: string;
  description: string;
}

interface RewardType {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  fullDescription: string;
  textColor: string;
  bgColor: string;
  iconBg: string;
  buttonColor: string;
  rewards: RewardItemType[];
  howToEarn: HowToEarnType[];
  specialReward: SpecialRewardType;
}

export default function CreatorRewards() {
  const [activeTab, setActiveTab] = useState<string>('performance');
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const rewards: RewardType[] = [
    {
      id: 'mcoin',
      title: 'M-Coin',
      subtitle: 'Phần thưởng tiền tệ',
      icon: <FaCoins className="w-8 h-8 text-yellow-400" />,
      description: 'Thu nhập đảm bảo hàng tháng dựa trên cấp độ và hiệu suất. Từ 5.000 đến 200.000 M-Coin mỗi tháng, có thể đổi thành tiền thật.',
      fullDescription: 'M-Coin là hệ thống tiền thưởng chính của chương trình Nhà Sáng Tạo Nội Dung M-SCI. Mỗi tháng, các thành viên đều nhận được một lượng M-Coin cố định dựa trên cấp độ của họ, cộng với phần thưởng bổ sung dựa trên hiệu suất nội dung. M-Coin có thể được đổi sang tiền thật với tỷ lệ 1 M-Coin = 1.000 VNĐ, hoặc sử dụng trong hệ sinh thái M-SCI để mua vật phẩm trong game, nâng cấp tài khoản và nhiều hơn nữa.',
      textColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      iconBg: 'bg-yellow-500/20',
      buttonColor: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 hover:bg-yellow-500/30',
      rewards: [
        { name: 'Cấp Đồng', value: '5.000 M-Coin/tháng' },
        { name: 'Cấp Bạc', value: '20.000 M-Coin/tháng' },
        { name: 'Cấp Vàng', value: '50.000 M-Coin/tháng' },
        { name: 'Cấp Kim Cương', value: '100.000 M-Coin/tháng' },
        { name: 'Cấp Huyền Thoại', value: '200.000 M-Coin/tháng' }
      ],
      howToEarn: [
        {
          title: 'Thưởng cố định hàng tháng',
          description: 'Nhận M-Coin cố định dựa trên cấp độ Nhà Sáng Tạo của bạn'
        },
        {
          title: 'Thưởng theo lượt xem',
          description: 'Nhận thêm M-Coin cho mỗi 1.000 lượt xem trên nội dung có gắn thẻ #MSCICreator'
        },
        {
          title: 'Thưởng tương tác',
          description: 'Nhận M-Coin thêm cho tỷ lệ tương tác cao (bình luận, chia sẻ, like)'
        },
        {
          title: 'Thưởng nội dung chất lượng',
          description: 'Nhận M-Coin bổ sung cho nội dung được đánh giá cao bởi đội ngũ M-SCI'
        }
      ],
      specialReward: {
        title: 'Thưởng đặc biệt 2x M-Coin',
        description: 'Kiếm gấp đôi M-Coin cho nội dung tạo ra trong các sự kiện đặc biệt và ra mắt tính năng mới'
      }
    },
    {
      id: 'exclusive',
      title: 'Nội Dung Độc Quyền',
      subtitle: 'Tiếp cận sớm',
      icon: <FaCrown className="w-8 h-8 text-purple-400" />,
      description: 'Truy cập vào nội dung chưa ra mắt, tính năng beta và thông tin nội bộ. Bao gồm phỏng vấn, lộ trình phát triển và tài liệu độc quyền.',
      fullDescription: 'Nhà Sáng Tạo Nội Dung M-SCI được cấp quyền truy cập đặc biệt vào nội dung chưa ra mắt và thông tin độc quyền mà người chơi thông thường không thể tiếp cận. Điều này bao gồm quyền truy cập sớm vào các bản cập nhật, lộ trình phát triển, phỏng vấn nhà phát triển, tính năng beta và nhiều tài liệu nội bộ khác. Nội dung độc quyền giúp Nhà Sáng Tạo luôn dẫn đầu xu hướng và tạo ra nội dung hấp dẫn trước những cập nhật mới.',
      textColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      iconBg: 'bg-purple-500/20',
      buttonColor: 'bg-purple-500/20 text-purple-400 border border-purple-500/40 hover:bg-purple-500/30',
      rewards: [
        { name: 'Cấp Đồng', value: 'Thông báo cập nhật sớm' },
        { name: 'Cấp Bạc', value: 'Quyền truy cập thử nghiệm beta' },
        { name: 'Cấp Vàng', value: 'Liên lạc với đội phát triển' },
        { name: 'Cấp Kim Cương', value: 'NPC mang tên bạn trong game' },
        { name: 'Cấp Huyền Thoại', value: 'Đồng thiết kế nội dung game' }
      ],
      howToEarn: [
        {
          title: 'Thăng cấp độ',
          description: 'Đạt các cấp độ cao hơn để mở khóa nhiều nội dung độc quyền hơn'
        },
        {
          title: 'Tham gia các sự kiện',
          description: 'Tham dự các buổi họp mặt và sự kiện cộng đồng để tiếp cận thông tin độc quyền'
        },
        {
          title: 'Tạo nội dung chất lượng cao',
          description: 'Được chọn để tiếp cận nội dung độc quyền dựa trên chất lượng nội dung trước đó'
        },
        {
          title: 'Đăng ký thử nghiệm beta',
          description: 'Đăng ký tham gia các chương trình thử nghiệm tính năng mới'
        }
      ],
      specialReward: {
        title: 'Phỏng vấn độc quyền',
        description: 'Cơ hội phỏng vấn độc quyền với các nhà phát triển và nghệ sĩ đằng sau trò chơi'
      }
    },
    {
      id: 'items',
      title: 'Vật Phẩm Game',
      subtitle: 'Đồ vật trong trò chơi',
      icon: <FaGem className="w-8 h-8 text-blue-400" />,
      description: 'Nhận vật phẩm trong game độc quyền và tùy chỉnh. Bao gồm trang phục, hiệu ứng, biểu tượng và các vật phẩm đặc biệt khác.',
      fullDescription: 'Người Sáng Tạo Nội Dung M-SCI có thể nhận các vật phẩm trong game độc quyền không có sẵn cho người chơi thông thường. Điều này bao gồm trang phục có chữ ký, hiệu ứng tùy chỉnh, gói ký hiệu đặc biệt, và nhiều vật phẩm độc đáo khác. Các vật phẩm này không chỉ giúp người sáng tạo nổi bật trong game mà còn cung cấp tài nguyên để họ tạo nội dung độc đáo. Ở cấp độ cao, thậm chí còn có thể có NPC trong game mang tên người sáng tạo nội dung!',
      textColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      iconBg: 'bg-blue-500/20',
      buttonColor: 'bg-blue-500/20 text-blue-400 border border-blue-500/40 hover:bg-blue-500/30',
      rewards: [
        { name: 'Cấp Đồng', value: 'Huy hiệu người sáng tạo' },
        { name: 'Cấp Bạc', value: 'Trang phục độc quyền' },
        { name: 'Cấp Vàng', value: 'Vật phẩm tùy chỉnh' },
        { name: 'Cấp Kim Cương', value: 'NPC mang tên bạn' },
        { name: 'Cấp Huyền Thoại', value: 'Thiết kế vật phẩm riêng' }
      ],
      howToEarn: [
        {
          title: 'Đăng nhập hàng ngày',
          description: 'Nhận các vật phẩm đặc biệt khi đăng nhập liên tục trong vai trò Nhà Sáng Tạo'
        },
        {
          title: 'Hoàn thành thử thách',
          description: 'Hoàn thành thử thách hàng tháng dành riêng cho người sáng tạo nội dung'
        },
        {
          title: 'Tạo nội dung chuyên sâu',
          description: 'Nhận vật phẩm đặc biệt khi tạo nội dung phân tích chuyên sâu về trò chơi'
        },
        {
          title: 'Tổ chức sự kiện cộng đồng',
          description: 'Tổ chức sự kiện trong game để mở khóa vật phẩm đặc biệt'
        }
      ],
      specialReward: {
        title: 'Vật phẩm độc quyền theo mùa',
        description: 'Bộ sưu tập vật phẩm độc quyền theo mùa chỉ dành cho Nhà Sáng Tạo Nội Dung'
      }
    },
    {
      id: 'recognition',
      title: 'Công Nhận',
      subtitle: 'Sự nổi tiếng và đánh giá',
      icon: <FaTrophy className="w-8 h-8 text-green-400" />,
      description: 'Được giới thiệu trên các kênh chính thức của M-SCI. Bao gồm xuất hiện trên blog, mạng xã hội, bản tin và các sự kiện.',
      fullDescription: 'Chương trình Nhà Sáng Tạo Nội Dung M-SCI cung cấp nhiều cơ hội để được công nhận rộng rãi trong cộng đồng game. Nhà sáng tạo nổi bật được giới thiệu trên các kênh chính thức của M-SCI, bao gồm blog, mạng xã hội, bản tin và trang chủ của trò chơi. Ngoài ra, còn có các giải thưởng Nhà Sáng Tạo Nội Dung hàng tháng và hàng năm, cùng với cơ hội xuất hiện tại các sự kiện và hội nghị chính thức. Sự công nhận này không chỉ giúp xây dựng danh tiếng của bạn mà còn có thể dẫn đến các cơ hội hợp tác lớn hơn.',
      textColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      iconBg: 'bg-green-500/20',
      buttonColor: 'bg-green-500/20 text-green-400 border border-green-500/40 hover:bg-green-500/30',
      rewards: [
        { name: 'Cấp Đồng', value: 'Danh sách người sáng tạo' },
        { name: 'Cấp Bạc', value: 'Chia sẻ trên mạng xã hội' },
        { name: 'Cấp Vàng', value: 'Nội dung được tài trợ' },
        { name: 'Cấp Kim Cương', value: 'Phỏng vấn độc quyền' },
        { name: 'Cấp Huyền Thoại', value: 'Đại sứ thương hiệu' }
      ],
      howToEarn: [
        {
          title: 'Tạo nội dung nổi bật',
          description: 'Được đội ngũ M-SCI chọn làm nội dung nổi bật của tuần/tháng'
        },
        {
          title: 'Tham gia giải thưởng',
          description: 'Đăng ký tham gia các giải thưởng Nhà Sáng Tạo Nội Dung định kỳ'
        },
        {
          title: 'Đạt thành tích đáng chú ý',
          description: 'Đạt được các mốc đáng chú ý về lượt xem, người theo dõi hoặc tương tác'
        },
        {
          title: 'Đóng góp cho cộng đồng',
          description: 'Được công nhận vì những đóng góp tích cực cho cộng đồng M-SCI'
        }
      ],
      specialReward: {
        title: 'Giải thưởng Nhà Sáng Tạo Của Năm',
        description: 'Cơ hội giành giải thưởng danh giá Nhà Sáng Tạo Nội Dung Của Năm với phần thưởng giá trị'
      }
    }
  ];

  const handleOpenPopup = (rewardId: string) => {
    setSelectedReward(rewardId);
  };

  const handleClosePopup = () => {
    setSelectedReward(null);
  };

  const getSelectedReward = () => {
    return rewards.find(reward => reward.id === selectedReward);
  };

  return (
    <>
      <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
        <div className="flex justify-center mb-8">
          <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
            <span className="text-shadow-blue relative inline-block">
              HỆ THỐNG PHẦN THƯỞNG
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-${reward.id === 'mcoin' ? 'yellow' : reward.id === 'exclusive' ? 'purple' : reward.id === 'items' ? 'blue' : 'green'}-500/50 transition-all shadow-lg hover:shadow-${reward.id === 'mcoin' ? 'yellow' : reward.id === 'exclusive' ? 'purple' : reward.id === 'items' ? 'blue' : 'green'}-500/20 flex flex-col h-full`}
            >
              {/* Icon */}
              <div className={`${reward.iconBg} rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto`}>
                {reward.icon}
              </div>
              
              {/* Title */}
              <h3 className={`text-xl ${reward.textColor} text-center font-semibold mb-3 font-rajdhani tracking-wide`}>
                {reward.title}
              </h3>
              
              {/* Description */}
              <p className="text-white/70 text-center mb-6 flex-grow">
                {reward.description}
              </p>
              
              {/* Button */}
              <button
                onClick={() => handleOpenPopup(reward.id)}
                className={`w-full py-2 ${reward.buttonColor} rounded-md transition-all duration-300 font-rajdhani tracking-wide font-medium mt-auto`}
              >
                Xem Chi Tiết
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {selectedReward && (
        <RewardPopup 
          reward={getSelectedReward()!} 
          onClose={handleClosePopup} 
        />
      )}
    </>
  );
} 