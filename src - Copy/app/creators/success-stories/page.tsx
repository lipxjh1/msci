'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import { FaArrowLeft, FaUserAlt, FaTrophy, FaPalette } from 'react-icons/fa';

export default function SuccessStoriesPage() {
  const [activeTab, setActiveTab] = useState('thay-game');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)]">
      {/* Menu điều hướng */}
      <ThanhDieuHuongResponsive />

      {/* Header Banner */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image 
          src="/images/overwatch_bg_2.jpg" 
          alt="Success Stories Banner" 
          fill
          sizes="100vw"
          className="object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041019]/50 to-[#041019]/80"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 cyber-halo text-shadow-blue">
              CÂU CHUYỆN THÀNH CÔNG
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto px-4">
              Những người sáng tạo nội dung hàng đầu đã thành công trong chương trình của chúng tôi. Họ không chỉ xây dựng cộng đồng người hâm mộ lớn mạnh mà còn phát triển sự nghiệp và thu nhập từ niềm đam mê.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Back button */}
        <div className="mb-8">
          <Link 
            href="/creators" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <FaArrowLeft />
            <span>Quay lại trang Creators</span>
          </Link>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => handleTabChange('thay-game')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors ${
              activeTab === 'thay-game'
                ? 'bg-blue-500/30 text-white border border-blue-400/50'
                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
            }`}
          >
            <FaUserAlt className="text-blue-400" />
            <span>"Thầy Game"</span>
          </button>
          
          <button
            onClick={() => handleTabChange('cao-thu')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors ${
              activeTab === 'cao-thu'
                ? 'bg-purple-500/30 text-white border border-purple-400/50'
                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
            }`}
          >
            <FaTrophy className="text-purple-400" />
            <span>"Cao Thủ MSCI"</span>
          </button>
          
          <button
            onClick={() => handleTabChange('nghe-thuat')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors ${
              activeTab === 'nghe-thuat'
                ? 'bg-pink-500/30 text-white border border-pink-400/50'
                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
            }`}
          >
            <FaPalette className="text-pink-400" />
            <span>"Nghệ Thuật MSCI"</span>
          </button>
        </div>

        {/* Content Sections */}
        <div className="backdrop-blur-sm bg-white/5 p-6 md:p-10 rounded-xl border border-white/10 shadow-xl">
          {/* Thầy Game Content */}
          {activeTab === 'thay-game' && (
            <div className="animate-fade-in">
              <div className="flex flex-col md:flex-row gap-8 mb-10">
                <div className="w-full md:w-1/3 rounded-lg overflow-hidden border-4 border-blue-500/20">
                  <div className="relative h-[300px]">
                    <Image
                      src="/images/like.jpg"
                      alt="Thầy Game"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <div className="flex items-center gap-3 mb-4">
                    <FaUserAlt className="text-blue-400 text-xl" />
                    <h2 className="text-3xl font-bold text-white">
                      "Thầy Game" - Từ Sinh Viên Đến Mentor Hàng Đầu
                    </h2>
                  </div>
                  <div className="text-white/70 mb-4 flex items-center gap-2">
                    <span className="bg-blue-500/20 py-1 px-3 rounded-full">500K người theo dõi</span>
                  </div>
                  
                  <div className="space-y-6 text-white/80">
                    <h3 className="text-xl text-blue-400 font-semibold">Hành trình khởi đầu</h3>
                    <p>
                      Minh Quân, 23 tuổi, từng là một sinh viên CNTT bình thường với niềm đam mê game M-SCI. Anh bắt đầu bằng việc chia sẻ những mẹo chơi game đơn giản trên YouTube vào buổi tối sau giờ học.
                    </p>
                    
                    <h3 className="text-xl text-blue-400 font-semibold">Bước ngoặt</h3>
                    <p>
                      Sau 3 tháng đầu chỉ có 100 người theo dõi, Quân quyết định tập trung vào việc tạo ra series "Học viện M-SCI" - chuỗi video hướng dẫn chi tiết từ cơ bản đến nâng cao. Video "Cách vượt màn 50 trong 30 giây" của anh bất ngờ viral với 1 triệu view.
                    </p>
                    
                    <h3 className="text-xl text-blue-400 font-semibold">Thành công rực rỡ</h3>
                    <p>
                      Hiện tại, "Thầy Game" Minh Quân đã:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Kiếm được 5 triệu+ M-Coin từ content creation</li>
                      <li>Trở thành đối tác chính thức của M-SCI</li>
                      <li>Điều hành học viện đào tạo game thủ với 10,000 học viên</li>
                      <li>Thu nhập ổn định $8,000/tháng</li>
                    </ul>
                    
                    <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg italic">
                      "Từ một sinh viên nghèo, giờ tôi có thể lo cho gia đình và theo đuổi đam mê. M-SCI không chỉ thay đổi cuộc đời tôi mà còn giúp tôi thay đổi cuộc đời của hàng nghìn người khác."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cao Thủ MSCI Content */}
          {activeTab === 'cao-thu' && (
            <div className="animate-fade-in">
              <div className="flex flex-col md:flex-row gap-8 mb-10">
                <div className="w-full md:w-1/3 rounded-lg overflow-hidden border-4 border-purple-500/20">
                  <div className="relative h-[300px]">
                    <Image
                      src="/images/new.jpg"
                      alt="Cao Thủ MSCI"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <div className="flex items-center gap-3 mb-4">
                    <FaTrophy className="text-purple-400 text-xl" />
                    <h2 className="text-3xl font-bold text-white">
                      "Cao Thủ MSCI" - Huyền Thoại PvP Hồi Sinh
                    </h2>
                  </div>
                  <div className="text-white/70 mb-4 flex items-center gap-2">
                    <span className="bg-purple-500/20 py-1 px-3 rounded-full">200K người theo dõi</span>
                  </div>
                  
                  <div className="space-y-6 text-white/80">
                    <h3 className="text-xl text-purple-400 font-semibold">Quá khứ đau thương</h3>
                    <p>
                      Hoàng Long, cựu game thủ chuyên nghiệp, từng phải giải nghệ sau chấn thương tay năm 2023. Với bàn tay run rẩy không thể chơi game cạnh tranh, anh rơi vào trầm cảm và nợ nần.
                    </p>
                    
                    <h3 className="text-xl text-purple-400 font-semibold">Tái sinh từ M-SCI</h3>
                    <p>
                      Khi M-SCI ra mắt với cơ chế điều khiển thân thiện, Long nhận ra đây là cơ hội cuối cùng. Anh dành 6 tháng nghiên cứu chiến thuật, phân tích meta game và bắt đầu stream những trận đấu của mình.
                    </p>
                    
                    <h3 className="text-xl text-purple-400 font-semibold">Đỉnh cao mới</h3>
                    <p>
                      Thành tựu hiện tại:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Vô địch 3 giải đấu lớn liên tiếp</li>
                      <li>Phát triển "Long's Meta" - chiến thuật được cả cộng đồng học theo</li>
                      <li>Thành lập đội tuyển "Dragon Force" với 5 thành viên</li>
                      <li>Thu nhập $12,000/tháng từ streaming, coaching và giải đấu</li>
                    </ul>
                    
                    <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-lg italic">
                      "M-SCI cho tôi cơ hội thứ hai trong sự nghiệp. Giờ đây, tôi không chỉ chơi game mà còn truyền cảm hứng cho những người từng như tôi - không bao giờ từ bỏ ước mơ."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nghệ Thuật MSCI Content */}
          {activeTab === 'nghe-thuat' && (
            <div className="animate-fade-in">
              <div className="flex flex-col md:flex-row gap-8 mb-10">
                <div className="w-full md:w-1/3 rounded-lg overflow-hidden border-4 border-pink-500/20">
                  <div className="relative h-[300px]">
                    <Image
                      src="/images/free.jpg"
                      alt="Nghệ Thuật MSCI"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <div className="flex items-center gap-3 mb-4">
                    <FaPalette className="text-pink-400 text-xl" />
                    <h2 className="text-3xl font-bold text-white">
                      "Nghệ Thuật MSCI" - Cô Gái Vẽ Nên Giấc Mơ
                    </h2>
                  </div>
                  <div className="text-white/70 mb-4 flex items-center gap-2">
                    <span className="bg-pink-500/20 py-1 px-3 rounded-full">100K người theo dõi</span>
                  </div>
                  
                  <div className="space-y-6 text-white/80">
                    <h3 className="text-xl text-pink-400 font-semibold">Khởi đầu từ đam mê</h3>
                    <p>
                      Linh Chi, họa sĩ tự do 26 tuổi, bắt đầu vẽ fan art M-SCI vì yêu thích nhân vật Akane. Những bức vẽ đầu tiên của cô chỉ nhận được vài chục like trên Twitter.
                    </p>
                    
                    <h3 className="text-xl text-pink-400 font-semibold">Bước đột phá</h3>
                    <p>
                      Khi M-SCI tổ chức cuộc thi thiết kế skin "Di sản Anh hùng", Chi quyết định thử sức với bộ skin "Akane - Chiến binh Ánh sáng". Tác phẩm của cô không chỉ giành giải nhất mà còn được chọn đưa vào game chính thức.
                    </p>
                    
                    <h3 className="text-xl text-pink-400 font-semibold">Sự nghiệp rực rỡ</h3>
                    <p>
                      Thành công hiện tại:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Art Director cho dòng skin "Huyền thoại M-SCI"</li>
                      <li>7 skin thiết kế được đưa vào game</li>
                      <li>Mở studio riêng với 5 họa sĩ</li>
                      <li>Thu nhập $15,000/tháng từ thiết kế và bản quyền</li>
                    </ul>
                    
                    <div className="p-6 bg-pink-500/10 border border-pink-500/20 rounded-lg italic">
                      "Từ một cô gái vẽ tranh trong phòng trọ, giờ tôi được sống với nghệ thuật mỗi ngày. M-SCI đã biến giấc mơ không tưởng của tôi thành hiện thực."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Start Your Journey Section */}
        <div className="mt-16 backdrop-blur-sm bg-white/5 p-8 rounded-xl border border-white/10 shadow-xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Bắt Đầu Câu Chuyện Của Bạn
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto mb-8">
            Mỗi câu chuyện thành công đều bắt đầu từ những bước đi đầu tiên. Hãy để M-SCI giúp bạn viết nên câu chuyện của riêng mình.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/creators/register"
              className="px-8 py-3 bg-[#FF7D00] hover:bg-[#FF9D40] text-white font-medium rounded transition-colors duration-300 uppercase tracking-wider text-lg shadow-lg hover:shadow-[#FF7D00]/50"
            >
              ĐĂNG KÝ NGAY
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 