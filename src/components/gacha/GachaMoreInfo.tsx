import React from 'react';
import Image from 'next/image';

const GachaMoreInfo: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white/5 p-6 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all shadow-lg group">
            <h3 className="font-orbitron text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-yellow-400 mr-2 group-hover:animate-pulse">⚡</span> Những Huyền Thoại Đang Chờ Bạn
            </h3>
            
            <div className="mb-6">
              <h4 className="font-orbitron text-xl font-bold text-white/90 mb-3 border-b border-white/10 pb-2">Nhân Vật S Huyền Thoại</h4>
              
              <div className="relative h-40 mb-4">
                <div className="absolute inset-0 grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((num, idx) => (
                    <div key={idx} className="relative overflow-hidden rounded-md shadow-md group">
                      <Image 
                        src={`/images/ga-cha/anh${num}.png`} 
                        alt={`Legendary ${idx+1}`} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    </div>
                  ))}
                </div>
              </div>
              
              <ul className="space-y-3 text-white/80">
                <li className="bg-black/20 p-3 rounded-md hover:bg-black/30 transition-colors">
                  <div className="flex items-center mb-1">
                    <span className="text-red-500 mr-2">🔥</span>
                    <span className="font-bold text-red-500">Akane (Gunner)</span>
                  </div>
                  <p className="ml-6">"Shooting Star" - Bắn toàn bộ robot trong 3 giây!</p>
                </li>
                <li className="bg-black/20 p-3 rounded-md hover:bg-black/30 transition-colors">
                  <div className="flex items-center mb-1">
                    <span className="text-blue-500 mr-2">❄️</span>
                    <span className="font-bold text-blue-500">Alice (Sniper)</span>
                  </div>
                  <p className="ml-6">"Hide on Bush" - Ẩn thân và bất tử 5 giây</p>
                </li>
                <li className="bg-black/20 p-3 rounded-md hover:bg-black/30 transition-colors">
                  <div className="flex items-center mb-1">
                    <span className="text-orange-500 mr-2">💥</span>
                    <span className="font-bold text-orange-500">Caitlyn (Rocket)</span>
                  </div>
                  <p className="ml-6">"Big Bang" - Càn quét toàn màn chơi</p>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-orbitron text-xl font-bold text-white/90 mb-2">Anh Hùng Các Cấp Độ</h4>
              <p className="text-white/80 p-3 bg-black/20 rounded-md">
                Mỗi nhân vật Epic, Rare hay Common đều có vai trò quan trọng trong chiến lược của bạn. Đừng coi thường những anh hùng cấp thấp - họ có thể tiến hóa lên cấp S!
              </p>
              
              {/* Star evolution visualization */}
              <div className="flex items-center justify-center mt-4 p-3 bg-black/10 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500/20 flex items-center justify-center rounded-full text-green-500 text-sm">C</div>
                  <div className="w-6 h-0.5 bg-gradient-to-r from-green-500/50 to-blue-500/50"></div>
                  <div className="w-8 h-8 bg-blue-500/20 flex items-center justify-center rounded-full text-blue-500 text-sm">B</div>
                  <div className="w-6 h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50"></div>
                  <div className="w-8 h-8 bg-purple-500/20 flex items-center justify-center rounded-full text-purple-500 text-sm">A</div>
                  <div className="w-6 h-0.5 bg-gradient-to-r from-purple-500/50 to-red-500/50"></div>
                  <div className="w-8 h-8 bg-red-500/20 flex items-center justify-center rounded-full text-red-500 text-sm">S</div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-white/5 p-6 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all shadow-lg group">
            <h3 className="font-orbitron text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-purple-400 mr-2 group-hover:animate-pulse">💎</span> Tỷ Lệ Minh Bạch
            </h3>
            
            <div className="mb-8">
              <div className="mb-4 p-4 bg-gradient-to-r from-black/40 to-black/20 rounded-lg font-mono">
                <pre className="text-white/90">
S (Legendary): 1-5%
A (Epic):      ~10%  
B (Rare):      25-35%
C (Common):    50-60%
                </pre>
              </div>
              
              {/* Visualization of drop rates */}
              <div className="relative h-32 w-full bg-black/20 rounded-lg p-2 overflow-hidden">
                <div className="absolute bottom-0 left-0 h-full w-[55%] bg-green-500/30 rounded-tl-md rounded-bl-md">
                  <div className="absolute top-2 left-2 text-xs text-green-500 font-bold">Common</div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-green-500 font-bold">55%</div>
                </div>
                <div className="absolute bottom-0 left-[55%] h-full w-[30%] bg-blue-500/30">
                  <div className="absolute top-2 left-2 text-xs text-blue-500 font-bold">Rare</div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-blue-500 font-bold">30%</div>
                </div>
                <div className="absolute bottom-0 left-[85%] h-full w-[10%] bg-purple-500/30">
                  <div className="absolute top-2 left-1 text-xs text-purple-500 font-bold">Epic</div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-purple-500 font-bold">10%</div>
                </div>
                <div className="absolute bottom-0 left-[95%] h-full w-[5%] bg-red-500/30 rounded-tr-md rounded-br-md">
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-red-500 font-bold">5%</div>
                </div>
              </div>
            </div>
            
            <h3 className="font-orbitron text-2xl font-bold text-white mb-4 flex items-center mt-2">
              <span className="text-cyan-400 mr-2">🚀</span> Mẹo Pro Gacha
            </h3>
            
            <ol className="list-decimal pl-6 space-y-2 text-white/80">
              <li className="p-2 hover:bg-black/20 rounded-md transition-colors">
                <b>Kết hợp thông minh</b>: Dùng Character Ticket cho may mắn lớn, Piece Ticket cho tiến độ ổn định
              </li>
              <li className="p-2 hover:bg-black/20 rounded-md transition-colors">
                <b>Săn sự kiện</b>: Rate up cho nhân vật hot trong các event đặc biệt
              </li>
              <li className="p-2 hover:bg-black/20 rounded-md transition-colors">
                <b>Blind Bag 2 M-Coin</b>: Vé số nhỏ nhưng bất ngờ lớn!
              </li>
              <li className="p-2 hover:bg-black/20 rounded-md transition-colors">
                <b>Giữ nhân vật trùng</b>: Dùng để nâng Star hoặc tiến hóa sau này
              </li>
            </ol>
            
            {/* Animated tip banner */}
            <div className="relative overflow-hidden mt-4 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <div className="absolute top-0 left-0 w-full h-full bg-blue-500/5 animate-pulse"></div>
              <p className="relative z-10 text-white/90 text-center">
                <span className="text-yellow-400 font-bold">PRO TIP:</span> Tham gia Discord cộng đồng để nhận code quà tặng miễn phí mỗi tuần!
              </p>
            </div>
          </section>
        </div>
        
        <section className="bg-white/5 p-6 rounded-lg border border-indigo-500/10 hover:border-indigo-500/30 transition-all shadow-lg">
          <h3 className="font-orbitron text-2xl font-bold text-white mb-4 flex items-center">
            <span className="text-indigo-400 mr-2">🌌</span> Không Chỉ Là Con Số
          </h3>
          
          <p className="text-white/90 mb-4">
            Mỗi nhân vật trong M-SCI không chỉ là dữ liệu - họ có:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/10 p-4 rounded-lg text-center transform transition-transform hover:scale-105 hover:bg-white/15">
              <div className="text-3xl mb-2">📜</div>
              <div className="text-white font-bold mb-1">Câu chuyện riêng biệt</div>
              <p className="text-white/60 text-xs">Mỗi nhân vật có một quá khứ và động cơ riêng</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg text-center transform transition-transform hover:scale-105 hover:bg-white/15">
              <div className="text-3xl mb-2">🎭</div>
              <div className="text-white font-bold mb-1">Tính cách độc đáo</div>
              <p className="text-white/60 text-xs">Từ lạnh lùng đến nhiệt huyết, mỗi nhân vật có cá tính riêng</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg text-center transform transition-transform hover:scale-105 hover:bg-white/15">
              <div className="text-3xl mb-2">⚔️</div>
              <div className="text-white font-bold mb-1">Kỹ năng đặc trưng</div>
              <p className="text-white/60 text-xs">Kỹ năng chủ động và bị động cho chiến thuật đa dạng</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg text-center transform transition-transform hover:scale-105 hover:bg-white/15">
              <div className="text-3xl mb-2">♟️</div>
              <div className="text-white font-bold mb-1">Vai trò chiến lược</div>
              <p className="text-white/60 text-xs">Trước tuyến, hỗ trợ hay chuyên gia sát thương</p>
            </div>
          </div>
          
          <p className="text-white/90 mb-6">
            Khi bạn triệu hồi Akane với khẩu súng máy rực lửa, Alice lạnh lùng với khẩu sniper, hay Caitlyn vui vẻ với rocket khổng lồ - đó là những đồng đội sẽ cùng bạn viết nên huyền thoại.
          </p>
          
          <div className="bg-gradient-to-r from-[var(--overwatch-dark-blue)] via-[var(--accent-blue-bright)]/20 to-[var(--overwatch-dark-blue)] p-6 rounded-lg shadow-inner">
            <p className="text-center text-white font-bold text-xl italic animate-pulse">
              "Mỗi lần quay Gacha là một cơ hội để thay đổi vận mệnh - Hãy triệu hồi những anh hùng vĩ đại nhất!"
            </p>
          </div>
        </section>
        
        <div className="text-center pt-4 border-t border-white/10">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25"></div>
            <p className="relative bg-black px-6 py-3 rounded-lg text-white/80 italic">
              *Tham gia M-SCI ngay hôm nay và xây dựng đội hình huyền thoại của riêng bạn!*
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GachaMoreInfo; 