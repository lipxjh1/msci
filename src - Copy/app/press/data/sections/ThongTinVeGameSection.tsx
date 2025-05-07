import React from 'react';
import Image from 'next/image';

export const ThongTinVeGameSection = (
  <div className="space-y-8">
    {/* Tổng Quan */}
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Tổng Quan</h3>
      
      <div className="prose prose-invert prose-cyan max-w-none">
        <p>
          <span className="font-bold text-white">M-SCI: Modern Special Combat Intelligence</span> là một tựa game RPG chiến thuật theo lượt kết hợp với cơ chế gacha, lấy bối cảnh từ thế giới tương lai khi công nghệ trí tuệ nhân tạo phát triển vượt bậc.
        </p>
        
        <p>
          Trò chơi diễn ra trong bối cảnh năm 2075, khi nhân loại đã phát triển các đơn vị chiến đấu đặc biệt được tăng cường năng lực nhờ trí tuệ nhân tạo. Người chơi sẽ vào vai một Chỉ huy (Commander) điều khiển một đội quân gồm các đặc vụ M-SCI - những chiến binh ưu tú được trang bị công nghệ AI tiên tiến.
        </p>
        
        <p>
          M-SCI nổi bật với hệ thống chiến đấu chiến thuật phức tạp, đồ họa anime 3D đẹp mắt, và cốt truyện sâu sắc khám phá mối quan hệ giữa con người và trí tuệ nhân tạo. Trò chơi cung cấp trải nghiệm chơi đơn sâu rộng cùng với các chế độ PvP và Co-op phong phú.
        </p>
      </div>
    </div>
    
    {/* Cốt Truyện */}
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Cốt Truyện</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 prose prose-invert prose-cyan max-w-none">
          <p>
            Năm 2075, công nghệ AI đã đạt đến đỉnh cao, dẫn đến sự ra đời của M-SCI (Modern Special Combat Intelligence) - những chiến binh tăng cường được hỗ trợ bởi AI tiên tiến.
          </p>
          
          <p>
            Thế giới đang trong tình trạng căng thẳng giữa sáu thế lực chính:
          </p>
          
          <ul>
            <li><span className="text-cyan-400 font-medium">Luminous Order</span> - Tổ chức chính phủ toàn cầu, tiên phong trong công nghệ M-SCI.</li>
            <li><span className="text-cyan-400 font-medium">Eclipse Syndicate</span> - Liên minh doanh nghiệp công nghệ tư nhân với tham vọng kiểm soát.</li>
            <li><span className="text-cyan-400 font-medium">Neo-Ronin</span> - Lực lượng nổi dậy chống lại sự kiểm soát bằng AI.</li>
            <li><span className="text-cyan-400 font-medium">Phantom Protocol</span> - Mạng lưới tình báo bí mật với các đặc vụ hoạt động ngầm.</li>
            <li><span className="text-cyan-400 font-medium">Gaia Collective</span> - Phe bảo vệ môi trường, sử dụng công nghệ xanh và AI sinh học.</li>
            <li><span className="text-cyan-400 font-medium">Nexus Entity</span> - Thực thể AI thông minh có ý thức, với động cơ bí ẩn.</li>
          </ul>
          
          <p>
            Người chơi vào vai một Chỉ huy trẻ tuổi của Luminous Order, nhưng sau một sự cố bí ẩn, họ phát hiện ra một âm mưu sâu xa đe dọa cả nhân loại. Hành trình của người chơi sẽ đưa họ khám phá bí mật của các phe phái, tìm hiểu về nguồn gốc thực sự của M-SCI, và quyết định tương lai của mối quan hệ giữa con người và AI.
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center">
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-4">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10"></div>
            <Image
              src="/images/game-story.jpg"
              alt="M-SCI Game Story"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-white/70 text-center italic">Hình ảnh minh họa từ trailer cốt truyện</p>
        </div>
      </div>
    </div>
    
    {/* Gameplay */}
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Gameplay</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-medium text-white mb-3">Hệ Thống Chiến Đấu</h4>
          <div className="prose prose-invert prose-cyan max-w-none text-sm">
            <p>
              M-SCI sử dụng hệ thống chiến đấu theo lượt trên bản đồ lưới, với độ sâu chiến thuật đặc biệt:
            </p>
            
            <ul>
              <li>Hệ thống địa hình 3D với độ cao và chướng ngại vật</li>
              <li>Cơ chế "Action Points" cho phép kết hợp linh hoạt các hành động</li>
              <li>Hệ thống "Synergy" giữa các nhân vật cùng phe</li>
              <li>Tính năng "Overcharge" cho phép dùng kỹ năng mạnh đặc biệt</li>
              <li>Cơ chế "Cover" và "Flanking" ảnh hưởng đến hiệu quả tấn công</li>
              <li>Hệ thống "Weather" và "Time" tác động đến khả năng chiến đấu</li>
            </ul>
            
            <p>
              Mỗi trận đấu yêu cầu người chơi phân tích tình hình, điều chỉnh đội hình, và đưa ra quyết định chiến thuật để giành chiến thắng.
            </p>
          </div>
          
          <div className="mt-6">
            <h4 className="text-lg font-medium text-white mb-3">Hệ Thống Nhân Vật</h4>
            <div className="prose prose-invert prose-cyan max-w-none text-sm">
              <p>
                Game hiện có hơn 150 nhân vật với các đặc điểm:
              </p>
              
              <ul>
                <li>5 cấp độ hiếm: R, SR, SSR, UR, LR</li>
                <li>6 vai trò: Attacker, Defender, Support, Tactician, Sniper, Specialist</li>
                <li>6 phe phái khác nhau với các hiệp đồng riêng</li>
                <li>Hệ thống "Signature Weapon" và "Personal AI" độc quyền</li>
                <li>Cơ chế "Affinity" và "Bond" để mở khóa câu chuyện và kỹ năng đặc biệt</li>
                <li>Hệ thống "Alternate Versions" cho các nhân vật theo sự kiện và mùa</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium text-white mb-3">Chế Độ Chơi</h4>
          
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h5 className="text-white font-medium mb-2">Main Story Campaign</h5>
              <p className="text-white/70 text-sm">
                Hành trình chính với 12 Chapter, mỗi chapter gồm 8-10 nhiệm vụ chính và nhiều nhiệm vụ phụ. Cốt truyện được cập nhật định kỳ qua các phiên bản.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h5 className="text-white font-medium mb-2">Shadow Operations</h5>
              <p className="text-white/70 text-sm">
                Nhiệm vụ ngắn hạn có độ khó cao, thách thức kỹ năng của người chơi với giới hạn về nhân vật và điều kiện đặc biệt.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h5 className="text-white font-medium mb-2">Arena PvP</h5>
              <p className="text-white/70 text-sm">
                Đấu trường 1v1, 2v2 và 4v4 với hệ thống xếp hạng theo mùa. Người chơi có thể thiết lập đội hình phòng thủ và tấn công.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h5 className="text-white font-medium mb-2">Co-op Raids</h5>
              <p className="text-white/70 text-sm">
                Hoạt động hợp tác 4-12 người chơi chống lại boss khổng lồ với cơ chế đặc biệt. Raids thay đổi hàng tuần và theo sự kiện.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h5 className="text-white font-medium mb-2">Faction Wars</h5>
              <p className="text-white/70 text-sm">
                Hoạt động Guild chống Guild, người chơi chọn phe và chiến đấu để giành lãnh thổ trên bản đồ toàn cầu với phần thưởng theo mùa.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h5 className="text-white font-medium mb-2">Special Events</h5>
              <p className="text-white/70 text-sm">
                Sự kiện giới hạn thời gian với cốt truyện đặc biệt, nhân vật mới, và phần thưởng độc quyền. Bao gồm cả sự kiện hợp tác.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Tính Năng Đặc Biệt */}
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Tính Năng Đặc Biệt</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-500/20 transition-all">
          <h4 className="text-lg font-medium text-white mb-3">Base Building</h4>
          <p className="text-white/70 text-sm">
            Xây dựng và nâng cấp căn cứ M-SCI với các cơ sở như Training Facility, Research Lab, Intel Center, và Armory. Căn cứ mở rộng theo cấp độ người chơi và mở khóa tính năng mới.
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-500/20 transition-all">
          <h4 className="text-lg font-medium text-white mb-3">Customization</h4>
          <p className="text-white/70 text-sm">
            Tùy chỉnh nhân vật với hệ thống skin, vũ khí, và phụ kiện đa dạng. Người chơi cũng có thể thay đổi hiệu ứng kỹ năng và tiếng nói của nhân vật.
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-500/20 transition-all">
          <h4 className="text-lg font-medium text-white mb-3">AI Companion</h4>
          <p className="text-white/70 text-sm">
            Hệ thống trợ lý AI độc đáo giúp quản lý tài nguyên, gợi ý chiến thuật, và tương tác với người chơi. AI Companion phát triển theo thời gian dựa trên cách chơi.
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-500/20 transition-all">
          <h4 className="text-lg font-medium text-white mb-3">Dynamic Weather</h4>
          <p className="text-white/70 text-sm">
            Hệ thống thời tiết động ảnh hưởng đến gameplay với các hiệu ứng như mưa giảm tầm nhìn, tuyết làm chậm di chuyển, và bão sét gây sát thương ngẫu nhiên.
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-500/20 transition-all">
          <h4 className="text-lg font-medium text-white mb-3">Neural Link</h4>
          <p className="text-white/70 text-sm">
            Tính năng đặc biệt cho phép kết hợp hai nhân vật để tạo ra kỹ năng combo mạnh mẽ. Mỗi cặp nhân vật có Neural Link riêng với hiệu ứng và hoạt ảnh độc đáo.
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-cyan-500/20 transition-all">
          <h4 className="text-lg font-medium text-white mb-3">Memory Fragments</h4>
          <p className="text-white/70 text-sm">
            Cơ chế thu thập các mảnh ký ức của nhân vật để mở khóa câu chuyện cá nhân, trang bị đặc biệt, và nâng cấp kỹ năng. Mỗi nhân vật có Memory Tree riêng.
          </p>
        </div>
      </div>
    </div>
    
    {/* Đồ Họa & Âm Thanh */}
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Đồ Họa & Âm Thanh</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium text-white mb-3">Đồ Họa</h4>
          <div className="prose prose-invert prose-cyan max-w-none text-sm">
            <ul>
              <li>Kết hợp đồ họa 3D cel-shaded và 2D spine animation</li>
              <li>Thiết kế nhân vật theo phong cách anime sci-fi hiện đại</li>
              <li>Hiệu ứng kỹ năng được thiết kế bởi đội ngũ từng làm việc cho các studio anime hàng đầu</li>
              <li>Maps với thiết kế 3D chi tiết và nhiều lớp địa hình</li>
              <li>Tối ưu hóa cho cả thiết bị cao cấp và phổ thông</li>
              <li>Hỗ trợ Ray-tracing trên thiết bị cao cấp</li>
              <li>Hoạt ảnh chiến đấu mượt mà với 60fps</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium text-white mb-3">Âm Thanh</h4>
          <div className="prose prose-invert prose-cyan max-w-none text-sm">
            <ul>
              <li>Nhạc nền được sáng tác bởi nhóm nhạc sĩ từng tham gia các dự án game và anime AAA</li>
              <li>Voice acting đầy đủ bởi các seiyuu nổi tiếng cho phiên bản tiếng Nhật</li>
              <li>Âm thanh môi trường động theo thời tiết và địa hình</li>
              <li>Hiệu ứng âm thanh 3D với hỗ trợ spatial audio</li>
              <li>Mỗi nhân vật có theme music riêng</li>
              <li>Hệ thống AI tạo nhạc động theo gameplay và tình huống</li>
              <li>Đa dạng voice lines theo tình huống và mối quan hệ giữa các nhân vật</li>
            </ul>
          </div>
          
          <div className="mt-4 bg-white/5 rounded-lg p-4 border border-white/10">
            <h5 className="text-white font-medium mb-2">Soundtrack</h5>
            <p className="text-white/70 text-sm">
              Album nhạc chính thức "Echoes of Intelligence" bao gồm 42 bản nhạc sẽ được phát hành cùng game, có sẵn trên các nền tảng nhạc số và dưới dạng đĩa CD giới hạn kèm artbook.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
); 