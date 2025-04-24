import React from 'react';
import Image from 'next/image';

const GachaInfo: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="backdrop-blur-sm bg-gradient-to-b from-white/5 to-blue-900/5 p-6 rounded-xl border border-white/10 shadow-xl">
        <div className="flex justify-center mb-8">
          <h2 className="font-orbitron text-3xl font-bold text-white cyber-halo">
            <span className="text-shadow-blue relative inline-block">
              GACHA - THỬ VẬN MAY CỦA BẠN VỚI HỆ THỐNG GACHA ĐỘC ĐÁO
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
        </div>
        
        <div className="space-y-10">
          <section>
            <h3 className="font-orbitron text-2xl font-bold text-white mb-4 text-center">Khám Phá Vũ Trụ Anh Hùng M-SCI!</h3>
            <p className="text-white/90 mb-4 max-w-4xl mx-auto text-center">
              Chào mừng đến với hệ thống Gacha đỉnh cao của M-SCI - nơi vận mệnh nhân loại nằm trong tay bạn! Với mỗi lần quay, bạn có cơ hội sở hữu những chiến binh huyền thoại, mỗi người mang một sức mạnh và câu chuyện riêng.
            </p>
            
            {/* Thêm hình ảnh hero cho mục này */}
            <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden mb-8">
              <Image 
                src="/images/ga-cha/anh1.png" 
                alt="Gacha Hero" 
                fill 
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--overwatch-dark-blue)] to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <p className="text-white/90 font-bold text-xl">Hàng ngàn chiến binh đang chờ bạn khám phá!</p>
              </div>
            </div>
          </section>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white/10 p-6 rounded-lg border border-blue-500/10 hover:border-blue-500/30 transition-all shadow-lg">
              <h3 className="font-orbitron text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-yellow-400 mr-2">🌟</span> Đẳng Cấp Nhân Vật - Bạn Sẽ Triệu Hồi Ai?
              </h3>
              
              <div className="mb-6">
                <h4 className="font-orbitron text-xl font-bold text-white/90 mb-2">Hệ Thống Độ Hiếm</h4>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start p-2 rounded-md hover:bg-white/5 transition-colors">
                    <span className="text-red-500 mr-2 text-xl">🔴</span>
                    <span><b className="text-red-500">S (Legendary)</b> - Huyền thoại: Akane, Alice, Caitlyn</span>
                  </li>
                  <li className="flex items-start p-2 rounded-md hover:bg-white/5 transition-colors">
                    <span className="text-purple-500 mr-2 text-xl">💜</span>
                    <span><b className="text-purple-500">A (Epic)</b> - Sử thi: Victoria, Elizabeth, Alexandra</span>
                  </li>
                  <li className="flex items-start p-2 rounded-md hover:bg-white/5 transition-colors">
                    <span className="text-blue-500 mr-2 text-xl">🔵</span>
                    <span><b className="text-blue-500">B (Rare)</b> - Hiếm: Anna, Julia, Fiona</span>
                  </li>
                  <li className="flex items-start p-2 rounded-md hover:bg-white/5 transition-colors">
                    <span className="text-green-500 mr-2 text-xl">🟢</span>
                    <span><b className="text-green-500">C (Common)</b> - Phổ thông: Marcus, David, Henry</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-orbitron text-xl font-bold text-white/90 mb-2">Ba Class Độc Đáo</h4>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start p-2 rounded-md hover:bg-white/5 transition-colors">
                    <span className="text-red-500 mr-2 text-xl">⚔️</span>
                    <span><b className="text-red-500">Gunner</b>: Tấn công liên thanh (1s/10 phát)</span>
                  </li>
                  <li className="flex items-start p-2 rounded-md hover:bg-white/5 transition-colors">
                    <span className="text-blue-500 mr-2 text-xl">🎯</span>
                    <span><b className="text-blue-500">Sniper</b>: Bắn tỉa chính xác (1s/1 phát)</span>
                  </li>
                  <li className="flex items-start p-2 rounded-md hover:bg-white/5 transition-colors">
                    <span className="text-orange-500 mr-2 text-xl">💥</span>
                    <span><b className="text-orange-500">Rocket</b>: Sát thương diện rộng (3s/1 phát)</span>
                  </li>
                </ul>
              </div>
            </section>
            
            <section className="bg-white/10 p-6 rounded-lg border border-blue-500/10 hover:border-blue-500/30 transition-all shadow-lg">
              <h3 className="font-orbitron text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-blue-400 mr-2">🎯</span> Cách Thức Triệu Hồi
              </h3>
              
              <div className="mb-6">
                <h4 className="font-orbitron text-xl font-bold text-white/90 mb-2 text-yellow-400">Character Ticket - Vé May Mắn</h4>
                <div className="relative mb-3">
                  <div className="absolute -left-4 top-1/2 w-2 h-10 bg-yellow-400/50 rounded-r-md transform -translate-y-1/2"></div>
                  <div className="bg-black/20 rounded-md p-3">
                    <ul className="space-y-1 text-white/80">
                      <li><b>Giá:</b> 100 M-Coin</li>
                      <li><b>Phần thưởng:</b> Nhân vật ngẫu nhiên C đến S (1-4 sao)</li>
                      <li><b>Cơ hội vàng:</b> 1-5% nhận Legendary S!</li>
                    </ul>
                  </div>
                </div>
                
                <div className="relative w-full h-32 my-4 rounded-lg overflow-hidden">
                  <Image 
                    src="/images/ga-cha/anh3.png" 
                    alt="Character Ticket" 
                    fill 
                    className="object-cover object-top" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-2 left-0 right-0 text-center">
                    <span className="inline-block px-3 py-1 bg-yellow-500/80 text-black font-bold rounded-full text-sm">
                      CHARACTER TICKET
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-orbitron text-xl font-bold text-white/90 mb-2 text-blue-400">Piece Ticket - Con Đường Kiên Trì</h4>
                <div className="relative mb-3">
                  <div className="absolute -left-4 top-1/2 w-2 h-10 bg-blue-400/50 rounded-r-md transform -translate-y-1/2"></div>
                  <div className="bg-black/20 rounded-md p-3">
                    <ul className="space-y-1 text-white/80">
                      <li><b>Giá:</b> 10 M-Coin</li>
                      <li><b>Phần thưởng:</b> 1/4 mảnh ghép nhân vật</li>
                      <li><b>Đặc biệt:</b> Ghép đủ 4 mảnh = nhân vật hoàn chỉnh</li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {[2, 5, 6, 1].map((num, idx) => (
                    <div key={idx} className="relative w-full h-16 rounded overflow-hidden">
                      <Image 
                        src={`/images/ga-cha/anh${num}.png`} 
                        alt={`Mảnh ${idx+1}`} 
                        fill 
                        className="object-cover" 
                      />
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                        {idx+1}/4
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GachaInfo; 