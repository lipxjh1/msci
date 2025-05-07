'use client';

import { FaYoutube, FaFacebookF, FaTiktok, FaTwitch, FaRss, FaFootballBall } from 'react-icons/fa';
import { SiRiotgames } from 'react-icons/si';
import Link from 'next/link';

export default function CreatorPartners() {
  return (
    <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
      <div className="flex justify-center mb-8">
        <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
          <span className="text-shadow-blue relative inline-block">
            ĐỐI TÁC CHIẾN LƯỢC
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Platform Partners */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-bright)]/20 overflow-hidden relative">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--accent-blue-bright)]/5 rounded-full blur-3xl"></div>
          
          <h3 className="text-xl text-[var(--accent-blue-bright)] font-semibold mb-6 font-rajdhani tracking-wide relative z-10">
            Đối Tác Nền Tảng
          </h3>
          
          <div className="grid grid-cols-2 gap-6">
            {/* YouTube */}
            <div className="group">
              <div className="flex flex-col items-center">
                <div className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg w-full flex items-center justify-center h-24">
                  <FaYoutube className="w-10 h-10 text-red-500" />
                </div>
                <span className="mt-2 text-white/80 group-hover:text-white transition-colors">YouTube</span>
              </div>
            </div>
            
            {/* Facebook Gaming */}
            <div className="group">
              <div className="flex flex-col items-center">
                <div className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg w-full flex items-center justify-center h-24">
                  <FaFacebookF className="w-10 h-10 text-blue-500" />
                </div>
                <span className="mt-2 text-white/80 group-hover:text-white transition-colors">Facebook Gaming</span>
              </div>
            </div>
            
            {/* TikTok */}
            <div className="group">
              <div className="flex flex-col items-center">
                <div className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg w-full flex items-center justify-center h-24">
                  <FaTiktok className="w-10 h-10 text-white" />
                </div>
                <span className="mt-2 text-white/80 group-hover:text-white transition-colors">TikTok</span>
              </div>
            </div>
            
            {/* Twitch */}
            <div className="group">
              <div className="flex flex-col items-center">
                <div className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg w-full flex items-center justify-center h-24">
                  <FaTwitch className="w-10 h-10 text-purple-500" />
                </div>
                <span className="mt-2 text-white/80 group-hover:text-white transition-colors">Twitch</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-white/60 text-sm text-center italic">
              Hợp tác với các nền tảng phát trực tiếp và chia sẻ nội dung hàng đầu.
            </p>
          </div>
        </div>
        
        {/* Network Partners */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-purple-500/20 overflow-hidden relative">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
          
          <h3 className="text-xl text-purple-400 font-semibold mb-6 font-rajdhani tracking-wide relative z-10">
            Đối Tác Mạng Lưới
          </h3>
          
          <div className="space-y-4">
            <div className="group">
              <div className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-md flex items-center justify-center flex-shrink-0">
                  <FaRss className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white group-hover:text-purple-300 transition-colors font-medium">Mạng lưới A</h4>
                  <p className="text-white/60 text-sm">Mạng lưới nội dung đa nền tảng</p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-md flex items-center justify-center flex-shrink-0">
                  <FaRss className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white group-hover:text-purple-300 transition-colors font-medium">Mạng lưới B</h4>
                  <p className="text-white/60 text-sm">Chuyên về nội dung thể thao điện tử</p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-md flex items-center justify-center flex-shrink-0">
                  <FaRss className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white group-hover:text-purple-300 transition-colors font-medium">Mạng lưới C</h4>
                  <p className="text-white/60 text-sm">Liên kết sáng tạo nội dung game</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-white/60 text-sm text-center italic">
              Những mạng lưới nội dung hàng đầu cùng hợp tác với M-SCI.
            </p>
          </div>
        </div>
        
        {/* Event Partners */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-yellow-500/50 transition-all shadow-lg hover:shadow-yellow-500/20 overflow-hidden relative">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl"></div>
          
          <h3 className="text-xl text-yellow-400 font-semibold mb-6 font-rajdhani tracking-wide relative z-10">
            Đối Tác Sự Kiện
          </h3>
          
          <div className="space-y-4">
            <div className="group">
              <div className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg gap-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-md flex items-center justify-center flex-shrink-0">
                  <SiRiotgames className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-white group-hover:text-yellow-300 transition-colors font-medium">Ban tổ chức giải đấu</h4>
                  <p className="text-white/60 text-sm">Tổ chức các giải đấu M-SCI chuyên nghiệp</p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg gap-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-md flex items-center justify-center flex-shrink-0">
                  <FaFootballBall className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-white group-hover:text-yellow-300 transition-colors font-medium">Hội chợ game</h4>
                  <p className="text-white/60 text-sm">Sự kiện gaming lớn với các gian hàng M-SCI</p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg gap-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-md flex items-center justify-center flex-shrink-0">
                  <FaTrophy className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-white group-hover:text-yellow-300 transition-colors font-medium">Đội tuyển thể thao điện tử</h4>
                  <p className="text-white/60 text-sm">Các đội tuyển chuyên nghiệp thi đấu M-SCI</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-white/60 text-sm text-center italic">
              Các đối tác sự kiện giúp đưa M-SCI đến gần hơn với cộng đồng.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <Link 
          href="/creators/partners" 
          className="px-8 py-3 bg-[var(--accent-blue-bright)]/20 text-[var(--accent-blue-bright)] rounded-md border border-[var(--accent-blue-bright)]/40 hover:bg-[var(--accent-blue-bright)]/30 transition-colors font-rajdhani tracking-wide"
        >
          Trở Thành Đối Tác Ngay
        </Link>
      </div>
    </div>
  );
}

// Thêm icon Trophy cho phần đội tuyển thể thao điện tử
interface TrophyProps {
  w6?: string | number;
  h6?: string | number;
  className?: string;
}

function FaTrophy(props: TrophyProps) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 576 512"
      height={props.h6}
      width={props.w6}
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"></path>
    </svg>
  );
} 