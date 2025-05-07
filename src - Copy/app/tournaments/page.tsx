'use client';

import { useEffect, useState } from 'react';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TournamentList from './components/TournamentList';
import { fetchTournaments } from './api/tournamentApi';
import { Tournament } from './types/tournament';
import LoadingScreen from './components/LoadingScreen';
import UpcomingEvents from './components/UpcomingEvents';
import RankingSystem from './components/RankingSystem';
import BattleArenas from './components/BattleArenas';
import SpecialModes from './components/SpecialModes';
import RewardsSection from './components/RewardsSection';
import FAQ from './components/FAQ';
import CommunitySection from './components/CommunitySection';
import TournamentCategories from './components/TournamentCategories';

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        // Giả lập thời gian tải để hiển thị loading screen
        setTimeout(async () => {
          const data = await fetchTournaments();
          setTournaments(data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Failed to load tournaments:', error);
        setLoading(false);
      }
    };

    loadTournaments();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a141e] to-[#1a2634]">
      <ThanhDieuHuongResponsive />

      {/* Hero section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        {/* Background image with parallax effect */}
        <div className="absolute inset-0">
          <Image
            src="/images/overwatch_bg_2.jpg"
            alt="Giải Đấu"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-110"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a141e]/70 via-transparent to-[#0a141e] z-10"></div>

          {/* Animated particles */}
          <div className="absolute inset-0 z-10">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50 animate-pulse delay-100"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-200"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse delay-300"></div>
          </div>

          {/* Add scanline effect */}
          <div className="absolute inset-0 scanline"></div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-orbitron text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo">
                <span className="relative inline-block">
                  GIẢI ĐẤU
                  <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
                </span>
              </h1>
              <p className="font-rajdhani text-xl md:text-2xl text-[var(--accent-blue-bright)] font-semibold mb-10 tracking-wide uppercase animate-fade-in">
                THỂ THAO ĐIỆN TỬ M-SCI: VƯỢT QUA GIỚI HẠN - ĐỊNH NGHĨA LẠI VINH QUANG
              </p>
            </div>
          </div>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform rotate-1 scale-110 z-20"></div>
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform -rotate-1 scale-110 z-20"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pt-16 pb-20 relative z-30">
        <div className="max-w-7xl mx-auto">
          {/* Giới thiệu */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-white mb-6 relative inline-block">
                  Giải Đấu Hiện Tại
                  <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
                </h2>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  M-SCI tổ chức nhiều giải đấu chuyên nghiệp hàng năm, từ giải đấu cấp cộng đồng đến giải vô địch quốc tế. 
                  Các giải đấu được tổ chức theo nhiều thể thức khác nhau, từ đối kháng trực tiếp, vòng bảng đến thể thức 
                  Swiss-system.
                </p>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  Mỗi giải đấu cung cấp cơ hội cho người chơi thể hiện kỹ năng, chiến thuật và nhận các phần thưởng giá trị 
                  từ token $MSCI đến các vật phẩm độc quyền trong game. Hãy tham gia ngay để trở thành một phần của cộng đồng 
                  thể thao điện tử M-SCI!
                </p>
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      3v3
                    </div>
                    <div className="text-white/60 text-sm">Đội hình</div>
                  </div>
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      100K
                    </div>
                    <div className="text-white/60 text-sm">Giải thưởng</div>
                  </div>
                  <div className="p-4 bg-[#0f1923]/80 backdrop-blur-sm rounded-xl border border-white/5 flex flex-col items-center">
                    <div className="text-[#F44336] font-bold text-2xl mb-1">
                      32
                    </div>
                    <div className="text-white/60 text-sm">Đội</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative rounded-xl overflow-hidden border border-white/5 shadow-xl">
                  <Image
                    src="/images/overwatch_bg_2.jpg"
                    alt="Giải đấu M-SCI"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a141e] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-white font-bold text-lg mb-2">
                      Giải vô địch M-SCI 2049
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 px-3 bg-[#F44336]/20 backdrop-blur-sm rounded-md border border-[#F44336]/30">
                        <span className="text-[#F44336] font-medium text-sm">
                          Quốc tế
                        </span>
                      </div>
                      <div className="p-2 px-3 bg-[#3f51b5]/20 backdrop-blur-sm rounded-md border border-[#3f51b5]/30">
                        <span className="text-[#3f51b5] font-medium text-sm">
                          Vòng loại
                        </span>
                      </div>
                      <div className="p-2 px-3 bg-[#4CAF50]/20 backdrop-blur-sm rounded-md border border-[#4CAF50]/30">
                        <span className="text-[#4CAF50] font-medium text-sm">
                          Đang diễn ra
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Danh mục giải đấu */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-8 relative inline-block">
              Các Giải Đấu
              <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-[#F44336] to-transparent"></div>
            </h2>
            
            <TournamentCategories 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory}
            />
          </div>
          
          {/* Danh sách giải đấu */}
          <div className="mb-16">
            <TournamentList 
              tournaments={tournaments} 
              category={activeCategory}
            />
          </div>

          {/* Các phần khác */}
          <div className="space-y-16">
            <UpcomingEvents />
            <RankingSystem />
            <BattleArenas />
            <SpecialModes />
            <RewardsSection />
            <FAQ />
            <CommunitySection />
          </div>
        </div>
      </div>
    </div>
  );
} 