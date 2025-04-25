import React from 'react';

export const TinhNangSection = (
  <div className="space-y-8">
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Tính Năng Nổi Bật</h3>
      <p className="text-white/80 mb-6 leading-relaxed">
        M-SCI mang đến nhiều tính năng hấp dẫn, kết hợp giữa các yếu tố của FPS, MOBA, và RPG để tạo nên trải nghiệm chơi game độc đáo và cạnh tranh:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/5 rounded-lg p-5 hover:bg-white/10 transition-all border border-white/5 hover:border-cyan-500/30">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-white mb-2">Hệ Thống Nhân Vật Đa Dạng</h4>
          <p className="text-white/70">
            20+ nhân vật với khả năng đặc biệt riêng, được phân chia thành 5 vai trò: Tấn công, Phòng thủ, Hỗ trợ, Trinh sát và Kiểm soát.
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 hover:bg-white/10 transition-all border border-white/5 hover:border-cyan-500/30">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-white mb-2">Gameplay Độc Đáo</h4>
          <p className="text-white/70">
            Kết hợp giữa bắn súng tốc độ cao với các kỹ năng độc đáo của từng nhân vật, tạo nên trải nghiệm chiến đấu đa dạng và đầy thử thách.
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 hover:bg-white/10 transition-all border border-white/5 hover:border-cyan-500/30">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-white mb-2">Guild System</h4>
          <p className="text-white/70">
            Hệ thống guild cho phép người chơi tạo hoặc tham gia vào các cộng đồng, cùng nhau tham gia các sự kiện và nhận phần thưởng đặc biệt.
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 hover:bg-white/10 transition-all border border-white/5 hover:border-cyan-500/30">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-white mb-2">Gacha System</h4>
          <p className="text-white/70">
            Hệ thống Gacha với tỷ lệ công bằng và minh bạch, cho phép người chơi mở rộng bộ sưu tập nhân vật và vũ khí.
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 hover:bg-white/10 transition-all border border-white/5 hover:border-cyan-500/30">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-white mb-2">Blockchain Integration</h4>
          <p className="text-white/70">
            Tích hợp công nghệ blockchain cho phép người chơi sở hữu thực sự các vật phẩm trong game dưới dạng NFT và tham gia vào nền kinh tế token.
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-5 hover:bg-white/10 transition-all border border-white/5 hover:border-cyan-500/30">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-white mb-2">Chế Độ Chơi</h4>
          <p className="text-white/70">
            Nhiều chế độ chơi đa dạng: Team Deathmatch, Control Point, Payload, Battle Royale và các sự kiện thời gian giới hạn.
          </p>
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Hệ Thống Tiến Triển</h3>
        <p className="text-white/80 mb-4">
          M-SCI cung cấp hệ thống tiến triển sâu rộng, cho phép người chơi tùy chỉnh nhân vật và phong cách chơi của mình:
        </p>
        <ul className="space-y-2 text-white/70">
          <li className="flex items-start">
            <div className="text-cyan-400 mr-2">•</div>
            <span>Hệ thống cấp độ Battle Pass với phần thưởng hàng ngày và hàng tuần</span>
          </li>
          <li className="flex items-start">
            <div className="text-cyan-400 mr-2">•</div>
            <span>Thăng cấp và tùy chỉnh vũ khí với các mod đa dạng</span>
          </li>
          <li className="flex items-start">
            <div className="text-cyan-400 mr-2">•</div>
            <span>Hệ thống xếp hạng cạnh tranh với mùa giải và phần thưởng độc quyền</span>
          </li>
          <li className="flex items-start">
            <div className="text-cyan-400 mr-2">•</div>
            <span>Cơ chế thách đấu và nhiệm vụ hàng ngày để nhận thêm phần thưởng</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Tùy Biến Nhân Vật</h3>
        <p className="text-white/80 mb-4">
          Người chơi có thể tùy biến nhân vật của mình với nhiều lựa chọn:
        </p>
        <ul className="space-y-2 text-white/70">
          <li className="flex items-start">
            <div className="text-cyan-400 mr-2">•</div>
            <span>Hàng trăm skin với các hiệu ứng hình ảnh và âm thanh độc đáo</span>
          </li>
          <li className="flex items-start">
            <div className="text-cyan-400 mr-2">•</div>
            <span>Hệ thống Loadout cho phép tùy chỉnh vũ khí và trang bị</span>
          </li>
          <li className="flex items-start">
            <div className="text-cyan-400 mr-2">•</div>
            <span>Emote, Spray và các vật phẩm trang trí khác để thể hiện phong cách</span>
          </li>
          <li className="flex items-start">
            <div className="text-cyan-400 mr-2">•</div>
            <span>Hệ thống Talent cho phép tùy chỉnh khả năng của nhân vật theo phong cách chơi</span>
          </li>
        </ul>
      </div>
    </div>
    
    <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all shadow-lg">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/4 p-4 flex justify-center">
          <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        <div className="w-full md:w-3/4 p-4">
          <h3 className="text-xl font-bold text-cyan-400 mb-2 text-center md:text-left font-rajdhani">Sắp Tới: Chế Độ Esports</h3>
          <p className="text-white/80 leading-relaxed">
            Chúng tôi đang phát triển chế độ Esports chính thức với giải đấu, hệ thống xếp hạng và phân tích chuyên nghiệp.
            Hệ thống này sẽ ra mắt trong Q3 2024, mang đến cơ hội cho người chơi và đội tuyển tham gia vào các giải đấu cạnh tranh,
            nhận phần thưởng giá trị và xây dựng sự nghiệp trong lĩnh vực Esports.
          </p>
        </div>
      </div>
    </div>
  </div>
); 