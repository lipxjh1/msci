'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/context/SupabaseContext';
import { AnhHung, ChiSoLevel, ThuongChip } from '@/loai';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';


// Mở rộng kiểu ChiSoLevel để thêm các thuộc tính mới
interface ChiSoLevelExtended extends ChiSoLevel {
  hp?: number;
  phong_thu?: number;
  toc_do_tan_cong?: number;
}

export default function HeroDetailPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = useSupabase();
  const [hero, setHero] = useState<AnhHung | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ChiSoLevelExtended[]>([]);
  const [rewards, setRewards] = useState<ThuongChip[]>([]);
  const [activeStar, setActiveStar] = useState(1);

  // Lấy thông tin chi tiết anh hùng
  useEffect(() => {
    async function fetchHero() {
      setLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('anh_hung')
          .select(`
            *,
            vai_tro(id, ten, mo_ta),
            do_hi_em(id, ma, ten, mau_sac)
          `)
          .eq('id', params.id)
          .single();
        
        if (error) throw error;
        setHero(data as AnhHung);
        
        // Lấy thông tin chi số level
        if (data.do_hi_em_id) {
          const { data: statsData, error: statsError } = await supabase
            .from('chi_so_level')
            .select('*')
            .eq('do_hi_em_id', data.do_hi_em_id)
            .order('sao')
            .order('level');
          
          if (!statsError && statsData) {
            setStats(statsData as ChiSoLevelExtended[]);
          }
          
          // Lấy thông tin thưởng chip
          const { data: rewardsData, error: rewardsError } = await supabase
            .from('thuong_chip')
            .select('*')
            .eq('do_hi_em_id', data.do_hi_em_id)
            .order('sao');
          
          if (!rewardsError && rewardsData) {
            setRewards(rewardsData as ThuongChip[]);
          }
        }
      } catch (err) {
        console.error('Lỗi khi lấy thông tin anh hùng:', err);
        setError('Không thể lấy thông tin anh hùng');
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchHero();
    }
  }, [supabase, params.id]);

  // Lấy chỉ số level của sao đang chọn
  const getStatsForActiveStar = () => {
    return stats.filter(s => s.sao === activeStar);
  };

  // Lấy thưởng chip của sao đang chọn
  const getRewardForActiveStar = () => {
    return rewards.find(r => r.sao === activeStar);
  };

  // Định dạng chip mỗi giây thành đơn vị lớn hơn
  const formatChipRate = (rate: number | null) => {
    if (!rate) return '0';
    
    // Chuyển đổi thành chip mỗi phút/giờ/ngày
    if (rate < 0.01) {
      return `${(rate * 1440).toFixed(2)} chip/ngày`;
    } else if (rate < 0.1) {
      return `${(rate * 60).toFixed(2)} chip/giờ`;
    } else {
      return `${rate.toFixed(4)} chip/giây`;
    }
  };
  
  // Tạo các biến tạm để sử dụng các hàm tránh lỗi linter
  const currentStarReward = getRewardForActiveStar();
  const formattedChipRate = currentStarReward ? formatChipRate(currentStarReward.chip_moi_giay) : '0';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[var(--overwatch-blue)] border-solid"></div>
      </div>
    );
  }

  if (error || !hero) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)] flex flex-col items-center justify-center p-4">
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 text-white text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Lỗi</h2>
          <p>{error || 'Không tìm thấy anh hùng'}</p>
          <button
            onClick={() => router.push('/heroes')}
            className="mt-6 px-6 py-3 bg-[var(--overwatch-blue)] rounded-lg text-white font-bold hover:bg-blue-600 transition-colors"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  // Lấy màu từ độ hiếm
  const rarityColor = hero.do_hi_em?.mau_sac || '#4CAF50';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--overwatch-dark-blue)] to-[var(--overwatch-black)]">
      {/* Navigation Bar */}
     
      
      {/* Back Button - Đặt ở giữa như trong ảnh mẫu */}
      <div className="w-full bg-[#F44336] py-3 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
        <Link 
          href="/heroes" 
            className="inline-flex items-center text-white hover:text-white/90 transition-colors group relative"
        >
            <div className="mr-2 h-8 w-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </div>
            <span className="font-medium text-white">Quay lại danh sách</span>
        </Link>
        </div>
      </div>

      {/* Hero Header - Cải tiến với hiệu ứng parallax và glow */}
      <div className="relative py-20">
        {/* Background Effects - Nâng cấp với hiệu ứng parallax và ánh sáng động */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--overwatch-dark-blue)]/50 to-[var(--overwatch-dark-blue)] z-10"></div>
          <div 
            className="w-full h-full bg-gradient-to-br from-[#071a2e] to-[#041019]"
          >
            {/* Enhanced animated background elements based on rarity */}
            <div 
              className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse-slow motion-safe:animate-floating"
              style={{ backgroundColor: "#F44336" }}
            ></div>
            <div 
              className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full blur-2xl opacity-10 animate-pulse-slow animation-delay-1000 motion-safe:animate-floating-delay"
              style={{ backgroundColor: "#F44336" }}
            ></div>
            <div 
              className="absolute top-1/3 left-1/2 w-48 h-48 rounded-full blur-xl opacity-10 animate-pulse-slow animation-delay-2000 motion-safe:animate-floating-alt"
              style={{ backgroundColor: "#F44336" }}
            ></div>
          </div>
          
          {/* Enhanced animated particles with more variety */}
          <div className="absolute inset-0 overflow-hidden z-5">
            <div className="absolute top-1/5 left-1/5 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse motion-safe:animate-floating-fast"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-300 motion-safe:animate-floating-fast-alt"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-500 motion-safe:animate-floating-fast-delay"></div>
            <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-red-300 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-700 motion-safe:animate-floating-fast"></div>
            <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-1000 motion-safe:animate-floating-fast-alt"></div>
          </div>
        </div>
        
        {/* Hero Content - Cải tiến với hiệu ứng và layout mới */}
        <div className="max-w-7xl mx-auto px-4 relative z-10 animate-fadeIn">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Hero Image with Enhanced Effects */}
            <div className="w-full md:w-1/3">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl group perspective">
                {/* Enhanced animated border glow */}
                <div className="absolute inset-0 z-0 rounded-xl animate-border-glow-enhanced" style={{ 
                  background: `linear-gradient(90deg, transparent, #F44336aa, transparent)`,
                  backgroundSize: '200% 100%'
                }}></div>
                
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-12 h-12 z-20 pointer-events-none">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H20V4H4V20H0V0Z" fill={`${rarityColor}CC`} />
                  </svg>
                </div>
                <div className="absolute bottom-0 right-0 w-12 h-12 z-20 pointer-events-none">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M48 48H28V44H44V28H48V48Z" fill={`${rarityColor}CC`} />
                  </svg>
                </div>
                
                {/* Inner frame with 3D hover effect */}
                <div className="absolute inset-[2px] rounded-xl overflow-hidden z-10 group-hover:transform group-hover:scale-105 transition-all duration-700 ease-out">
                  {hero.anh_dai_dien ? (
                    <Image
                      src={hero.anh_dai_dien}
                      alt={hero.ten}
                      fill
                      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 filter saturate-[1.1]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-white/30">Không có ảnh</span>
                    </div>
                  )}
                  
                  {/* Enhanced overlay gradient */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"
                  ></div>
                </div>
                
                {/* Enhanced Rarity Badge */}
                <div 
                  className="absolute top-4 right-4 px-3 py-1 rounded-sm text-white text-sm font-bold z-20 backdrop-blur-sm shadow-lg border border-white/20 flex items-center space-x-1 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl"
                  style={{ backgroundColor: `#F44336DD` }}
                >
                  <span className="text-xs mr-1 opacity-80">⭐</span>
                  <span>{hero.do_hi_em?.ma || 'C'}</span>
                </div>
                
                {/* Character name in bottom frame with enhanced design */}
                <div className="absolute bottom-0 inset-x-0 p-4 flex items-end z-20">
                  <div 
                    className="w-full py-3 px-4 backdrop-blur-md rounded-lg bg-black/60 border border-white/10 transform transition-all duration-500 group-hover:translate-y-[-4px]"
                    style={{ 
                      borderColor: `#F44336AA`,
                      boxShadow: `0 4px 20px -2px #F4433630`
                    }}
                  >
                    <h2 className="text-2xl font-bold text-white text-shadow-sm">{hero.ten}</h2>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "#F44336" }}></div>
                      <p className="text-white/90">{hero.do_hi_em?.ten || 'Common'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hero Info with Enhanced Design - cải tiến với thẻ, hiệu ứng và bố cục */}
            <div className="w-full md:w-2/3 text-white">
              <div className="p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 shadow-xl relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                      <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.2" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#smallGrid)" />
                  </svg>
                </div>
                
                {/* Rarity accent in corner */}
                <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full blur-xl opacity-20" style={{ backgroundColor: rarityColor }}></div>
                
                {/* Role tag with animation - Điều chỉnh màu đỏ như trong ảnh */}
                <div className="inline-flex px-4 py-1.5 rounded-full text-sm bg-[#F44336] text-white mb-4 border border-white/5 items-center" style={{ boxShadow: `0 0 8px rgba(244, 67, 54, 0.3)` }}>
                  <span className="font-medium">● {hero.vai_tro?.ten || 'Không xác định'}</span>
                </div>
                
                {/* Hero name with shimmering effect - Điều chỉnh màu theo ảnh mẫu */}
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 relative inline-block">
                  <span className="text-white hero-name-shimmer relative">
                    {hero.ten}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </h1>
                
                {/* Rarity name with customized color */}
                <p className="text-xl mb-6 flex items-center">
                  <span className="font-bold mr-2" style={{ color: rarityColor }}>
                    {hero.do_hi_em?.ma || 'C'}
                  </span>
                  <span className="text-white/80">
                    {hero.do_hi_em?.ten || 'Common'}
                  </span>
                </p>
                
                <div className="border-t border-white/10 pt-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F44336]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="relative">
                    Thông tin chi tiết
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#F44336]/50 to-transparent"></span>
                    </span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
                    <div className="p-5 rounded-lg bg-white/5 border border-white/10 backdrop-filter backdrop-blur-sm hover:bg-white/8 transition-colors duration-300 group relative overflow-hidden">
                      {/* Decorative corner accent */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0L20 0L0 20L0 0Z" fill={`${rarityColor}50`} />
                        </svg>
                      </div>
                      
                      <h3 className="text-sm text-white/50 uppercase mb-1 font-medium tracking-wider">TỐC ĐỘ BẮN</h3>
                      <p className="font-semibold text-lg flex items-center">
                        <span className="text-[#F44336] mr-2">●</span>
                        {hero.toc_do_ban || '1s/10 phát bắn'}
                      </p>
                    </div>
                    
                    <div className="p-5 rounded-lg bg-white/5 border border-white/10 backdrop-filter backdrop-blur-sm hover:bg-white/8 transition-colors duration-300 group relative overflow-hidden">
                      {/* Decorative corner accent */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0L20 0L0 20L0 0Z" fill={`${rarityColor}50`} />
                        </svg>
                      </div>
                      
                      <h3 className="text-sm text-white/50 uppercase mb-1 font-medium tracking-wider">ĐẶC ĐIỂM</h3>
                      <p className="font-semibold text-lg flex items-center">
                        <span className="text-[#F44336] mr-2">●</span>
                        {hero.dac_diem || '-50% ứng khi tấn công Drone và Shield'}
                      </p>
                    </div>
                    
                    {hero.ky_nang && (
                      <div className="col-span-2 p-5 rounded-lg bg-white/5 border border-white/10 backdrop-filter backdrop-blur-sm hover:bg-white/8 transition-colors duration-300 group relative overflow-hidden">
                        {/* Decorative corner accent */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0L20 0L0 20L0 0Z" fill={`${rarityColor}50`} />
                          </svg>
                        </div>
                      
                        <h3 className="text-sm text-white/50 uppercase mb-1 font-medium tracking-wider">KỸ NĂNG</h3>
                        <p className="font-semibold flex items-start">
                          <span className="text-[#F44336] mr-2 mt-1.5">●</span>
                          <span>{hero.ky_nang || 'Shooting Star: Bắn tất cả Robot trong 3s nhưng giảm sát thương'}</span>
                        </p>
                      </div>
                    )}

                    {currentStarReward && (
                      <div className="col-span-2 p-5 rounded-lg bg-white/5 border border-white/10 backdrop-filter backdrop-blur-sm hover:bg-white/8 transition-colors duration-300 group relative overflow-hidden">
                        {/* Decorative corner accent */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0L20 0L0 20L0 0Z" fill={`${rarityColor}50`} />
                          </svg>
                        </div>
                      
                        <h3 className="text-sm text-white/50 uppercase mb-1 font-medium tracking-wider">THU NHẬP CHIP</h3>
                        <p className="font-semibold flex items-start">
                          <span className="text-[#F44336] mr-2 mt-1.5">●</span>
                          <span>{formattedChipRate}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Star selector with improved design - Điều chỉnh theo mẫu trong ảnh (nút vuông, chữ S, chọn theo sao) */}
                {stats.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3 text-white/80 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[var(--overwatch-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span className="relative">
                        Chọn cấp sao
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--overwatch-blue)]/50 to-transparent"></span>
                      </span>
                    </h3>
                    <div className="flex gap-2">
                      {[...new Set(stats.map(s => s.sao))].map(star => (
                        <button
                          key={star}
                          onClick={() => setActiveStar(star)}
                          className={`w-10 h-10 rounded flex items-center justify-center transition-all duration-300 ${
                            activeStar === star
                              ? `bg-[#F44336] text-white`
                              : 'bg-white/8 text-white/70 hover:bg-white/15'
                          }`}
                        >
                          <span>S</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats and Details with Enhanced Design */}
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Decorative elements */}
        <div className="absolute left-0 top-1/3 w-16 h-64 bg-gradient-to-r from-[#F44336]/20 to-transparent blur-2xl opacity-30 pointer-events-none"></div>
        <div className="absolute right-0 bottom-1/3 w-16 h-64 bg-gradient-to-l from-[#F44336]/20 to-transparent blur-2xl opacity-30 pointer-events-none"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Content - Responsive column layout */}
          <div className="lg:col-span-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Enhanced Stats section with 3D cards */}
              <div className="bg-gradient-to-br from-[#0D1B2A] to-[#071a2e] rounded-xl shadow-xl border border-white/5 backdrop-blur-sm overflow-hidden h-full">
                <div className="p-6 border-b border-white/10 bg-gradient-to-r from-[#F44336]/10 to-transparent">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F44336]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                    Chỉ số cơ bản
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-4">
                    {/* Enhanced stat cards with hover effects */}
                    <div className="p-4 rounded-lg bg-gradient-to-br from-[#F44336]/5 to-transparent border border-white/10 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg relative group perspective overflow-hidden">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#F44336]/10 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F44336]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-white/80 text-sm uppercase tracking-wider">Máu cơ bản</h3>
                          <p className="text-xl font-bold text-white">{getStatsForActiveStar()[0]?.hp || 0}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gradient-to-br from-[#F44336]/5 to-transparent border border-white/10 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg relative group perspective overflow-hidden">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#F44336]/10 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F44336]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-white/80 text-sm uppercase tracking-wider">Sát thương</h3>
                          <p className="text-xl font-bold text-white">{getStatsForActiveStar()[0]?.sat_thuong || 0}</p>
                        </div>
                      </div>
              </div>
              
                    <div className="p-4 rounded-lg bg-gradient-to-br from-[#F44336]/5 to-transparent border border-white/10 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg relative group perspective overflow-hidden">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#F44336]/10 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F44336]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-white/80 text-sm uppercase tracking-wider">Phòng thủ</h3>
                          <p className="text-xl font-bold text-white">{getStatsForActiveStar()[0]?.phong_thu || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              {/* Thông tin chi tiết */}
              <div className="bg-gradient-to-br from-[#0D1B2A] to-[#071a2e] rounded-xl shadow-xl border border-white/5 backdrop-blur-sm overflow-hidden h-full">
                <div className="p-6 border-b border-white/10 bg-gradient-to-r from-[#F44336]/10 to-transparent">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F44336]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Thông tin chi tiết
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 backdrop-filter backdrop-blur-sm hover:bg-white/8 transition-colors duration-300 group relative overflow-hidden">
                      <h3 className="text-sm text-white/50 uppercase mb-1 font-medium tracking-wider">TỐC ĐỘ BẮN</h3>
                      <p className="font-semibold text-lg flex items-center">
                        <span className="text-[#F44336] mr-2">●</span>
                        {hero.toc_do_ban || '1s/10 phát bắn'}
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 backdrop-filter backdrop-blur-sm hover:bg-white/8 transition-colors duration-300 group relative overflow-hidden">
                      <h3 className="text-sm text-white/50 uppercase mb-1 font-medium tracking-wider">ĐẶC ĐIỂM</h3>
                      <p className="font-semibold text-lg flex items-center">
                        <span className="text-[#F44336] mr-2">●</span>
                        {hero.dac_diem || '-50% ứng khi tấn công Drone và Shield'}
                      </p>
                    </div>
                    
                    {hero.ky_nang && (
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10 backdrop-filter backdrop-blur-sm hover:bg-white/8 transition-colors duration-300 group relative overflow-hidden">
                        <h3 className="text-sm text-white/50 uppercase mb-1 font-medium tracking-wider">KỸ NĂNG</h3>
                        <p className="font-semibold flex items-start">
                          <span className="text-[#F44336] mr-2 mt-1.5">●</span>
                          <span>{hero.ky_nang || 'Shooting Star: Bắn tất cả Robot trong 3s nhưng giảm sát thương'}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chip Rewards section */}
            <div className="bg-gradient-to-br from-[#0D1B2A] to-[#071a2e] rounded-xl shadow-xl border border-white/5 backdrop-blur-sm overflow-hidden">
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-[#F44336]/10 to-transparent">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F44336]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Chip Rewards
                </h2>
              </div>
              
              {/* Chip rewards content */}
              <div className="p-6">
                {currentStarReward ? (
                  <div className="p-5 rounded-lg bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10 flex items-center relative overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#F44336]/5 rounded-full blur-xl"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#F44336]/5 rounded-full blur-md"></div>
                    
                    {/* Interactive chip icon */}
                    <div className="mr-6 relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F44336]/50 to-[#F44336]/20 flex items-center justify-center shadow-lg shadow-[#F44336]/10 animate-pulse-slow transform hover:scale-110 transition-transform duration-300 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F44336] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                        
                        {/* Animated rings */}
                        <div className="absolute inset-0 border border-[#F44336]/30 rounded-full animate-ping-slow opacity-60"></div>
                        <div className="absolute inset-[-6px] border border-[#F44336]/20 rounded-full animate-ping-slow animation-delay-500 opacity-40"></div>
                  </div>
                    </div>
                    
                    <div className="relative z-10 flex-1">
                      <div className="text-sm text-white/70 mb-1 uppercase tracking-wider">Tốc độ thu nhập chip</div>
                      <div className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-[#F44336] to-white inline-block">
                        {formattedChipRate}
                      </div>
                      
                      {/* Enhanced estimated rates */}
                      {currentStarReward?.chip_moi_giay && (
                        <div className="mt-2 flex flex-wrap gap-3">
                          <div className="text-sm text-white/60 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                            <span className="font-mono">{((currentStarReward.chip_moi_giay) * 3600).toFixed(2)}</span>
                            <span className="ml-1">chip/giờ</span>
                          </div>
                          <div className="text-sm text-white/60 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></span>
                            <span className="font-mono">{((currentStarReward.chip_moi_giay) * 3600 * 24).toFixed(2)}</span>
                            <span className="ml-1">chip/ngày</span>
                          </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                  <div className="text-white/60 text-center py-8 bg-white/5 rounded-lg border border-white/10 flex flex-col items-center">
                    <div className="w-12 h-12 mb-3 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p>Không có dữ liệu thưởng chip</p>
                </div>
              )}
            </div>
          </div>
          
            {/* Data table for statistics by level and star */}
            <div className="bg-gradient-to-br from-[#0D1B2A] to-[#071a2e] rounded-xl shadow-xl border border-white/5 backdrop-blur-sm overflow-hidden mt-6">
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-[#F44336]/10 to-transparent">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F44336]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Thông tin chi tiết
                  </h2>
                  
                  {/* Star selector with enhanced design - Điều chỉnh theo ảnh mẫu */}
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setActiveStar(star)}
                        className={`w-9 h-9 flex items-center justify-center border ${activeStar === star ? 'bg-[#F44336] text-white border-white/20' : 'bg-white/5 text-white/70 border-white/10'} hover:bg-white/10 transition-colors duration-300 hover:text-white`}
                      >
                        <span className="font-bold">S{star}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Statistics Table with improved styling */}
              <div className="p-6">
                {getStatsForActiveStar().length > 0 ? (
                  <div className="relative overflow-x-auto rounded-lg">
                    <table className="w-full text-sm text-left text-white/80">
                      <thead className="text-xs uppercase bg-gradient-to-r from-[#F44336]/20 to-white/5 backdrop-blur-sm">
                        <tr>
                          <th className="px-6 py-3 rounded-tl-lg font-semibold">Level</th>
                          <th className="px-6 py-3 font-semibold">HP</th>
                          <th className="px-6 py-3 font-semibold">Sát thương</th>
                          <th className="px-6 py-3 font-semibold">Phòng thủ</th>
                          <th className="px-6 py-3 rounded-tr-lg font-semibold">Tốc độ tấn công</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getStatsForActiveStar().map((stat, index) => (
                          <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-semibold whitespace-nowrap bg-[#F44336]/10">
                              {stat.level}
                            </td>
                            <td className="px-6 py-4">{stat.hp || 0}</td>
                            <td className="px-6 py-4">{stat.sat_thuong || 0}</td>
                            <td className="px-6 py-4">{stat.phong_thu || 0}</td>
                            <td className="px-6 py-4">{stat.toc_do_tan_cong || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-white/60 text-center py-16 bg-white/5 rounded-lg border border-white/10 flex flex-col items-center">
                    <div className="w-16 h-16 mb-4 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p>Không có dữ liệu cho mức sao này</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Role Info Sidebar - Enhanced with 3D effect and better visual hierarchy */}
          <div className="lg:col-span-4 animate-fadeIn animation-delay-500">
            <div className="bg-gradient-to-br from-[#0D1B2A] to-[#071a2e] rounded-xl shadow-xl border border-white/5 backdrop-blur-sm sticky top-4 overflow-hidden transform perspective hover:translate-y-[-2px] transition-transform duration-300">
              {/* Background decorative elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full blur-2xl opacity-30" 
                     style={{ 
                       background: `radial-gradient(circle, rgba(244, 67, 54, 0.3) 0%, transparent 70%)` 
                     }}></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 rounded-b-xl" 
                     style={{ 
                       background: `linear-gradient(to top, rgba(244, 67, 54, 0.05) 0%, transparent 100%)` 
                     }}></div>
                
                {/* Subtle hexagon pattern */}
                <div className="absolute inset-0 opacity-5">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="hexPattern" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                      <path d="M0,0 L10,0 L15,8.66 L10,17.32 L0,17.32 L-5,8.66z" fill="none" stroke="white" strokeWidth="0.2" transform="translate(15,15)"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#hexPattern)" />
                  </svg>
                </div>
              </div>
              
              {/* Header with enhanced design */}
              <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-white/[0.02] to-white/[0.05]">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#F44336]/20 flex items-center justify-center mr-4 shadow-inner shadow-[#F44336]/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F44336]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Thông tin chi tiết</h2>
                </div>
                
                {/* Decorative accent */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-[#F44336]/40 to-transparent"></div>
              </div>
              
              <div className="p-6">
              {hero.vai_tro ? (
                  <div className="space-y-6 relative z-10">
                    <div className="p-5 rounded-lg bg-gradient-to-br from-[#F44336]/10 to-transparent border border-white/10 transform transition-transform hover:scale-[1.02] duration-300 overflow-hidden relative">
                      {/* Chỉ báo độ hiếm theo ảnh mẫu */}
                      <div className="px-4 py-2 bg-[#F44336] mb-3 inline-block rounded text-white font-bold">
                        Legendary
                  </div>
                  
                      {/* Role name with customized badge */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="text-xl font-semibold text-white">{hero.vai_tro.ten}</div>
                      </div>
                      
                      {/* Role description with styled paragraph */}
                      <p className="text-white/70 leading-relaxed">
                        {hero.vai_tro.mo_ta || 'Không có mô tả'}
                      </p>
                    </div>
                    
                    <div className="pt-6 border-t border-white/10 space-y-6">
                      {/* Hero counter section - New addition */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F44336]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="relative">
                            Sức mạnh
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#F44336]/50 to-transparent"></span>
                          </span>
                        </h3>
                        
                        {/* Power meter - New visual element */}
                        <div className="p-5 rounded-lg bg-gradient-to-br from-white/8 to-white/[0.01] border border-white/10 relative overflow-hidden transform transition-transform hover:scale-[1.02] duration-300">
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
                              <div className="text-xs text-white/50 uppercase mb-1">Tấn công</div>
                              <div className="flex justify-center">
                                {Array.from({ length: Math.min(5, hero.vai_tro?.ten === 'Damage' ? 4 : (hero.vai_tro?.ten === 'Tank' ? 2 : 3)) }).map((_, i) => (
                                  <div key={i} className="w-2 h-2 rounded-full bg-[#F44336] mx-0.5"></div>
                                ))}
                                {Array.from({ length: 5 - Math.min(5, hero.vai_tro?.ten === 'Damage' ? 4 : (hero.vai_tro?.ten === 'Tank' ? 2 : 3)) }).map((_, i) => (
                                  <div key={i} className="w-2 h-2 rounded-full bg-white/20 mx-0.5"></div>
                                ))}
                              </div>
                            </div>
                            <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
                              <div className="text-xs text-white/50 uppercase mb-1">Phòng thủ</div>
                              <div className="flex justify-center">
                                {Array.from({ length: Math.min(5, hero.vai_tro?.ten === 'Tank' ? 5 : (hero.vai_tro?.ten === 'Support' ? 3 : 1)) }).map((_, i) => (
                                  <div key={i} className="w-2 h-2 rounded-full bg-[#F44336] mx-0.5"></div>
                                ))}
                                {Array.from({ length: 5 - Math.min(5, hero.vai_tro?.ten === 'Tank' ? 5 : (hero.vai_tro?.ten === 'Support' ? 3 : 1)) }).map((_, i) => (
                                  <div key={i} className="w-2 h-2 rounded-full bg-white/20 mx-0.5"></div>
                                ))}
                              </div>
                            </div>
                            <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
                              <div className="text-xs text-white/50 uppercase mb-1">Hỗ trợ</div>
                              <div className="flex justify-center">
                                {Array.from({ length: Math.min(5, hero.vai_tro?.ten === 'Support' ? 5 : (hero.vai_tro?.ten === 'Tank' ? 2 : 1)) }).map((_, i) => (
                                  <div key={i} className="w-2 h-2 rounded-full bg-[#F44336] mx-0.5"></div>
                                ))}
                                {Array.from({ length: 5 - Math.min(5, hero.vai_tro?.ten === 'Support' ? 5 : (hero.vai_tro?.ten === 'Tank' ? 2 : 1)) }).map((_, i) => (
                                  <div key={i} className="w-2 h-2 rounded-full bg-white/20 mx-0.5"></div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-xs text-white/50 uppercase mb-1">Độ khó</div>
                          <div className="w-full bg-white/10 h-2 rounded-full mb-1 overflow-hidden">
                            <div 
                              className="h-full rounded-full"
                          style={{ 
                                width: `${hero.do_hi_em?.ma === 'L' ? '80%' : (hero.do_hi_em?.ma === 'E' ? '60%' : (hero.do_hi_em?.ma === 'R' ? '40%' : '20%'))}`, 
                                backgroundColor: '#F44336'
                          }}
                        ></div>
                          </div>
                          <div className="flex justify-between text-xs text-white/50">
                            <span>Dễ</span>
                            <span>Khó</span>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                  <div className="text-white/60 text-center py-16 bg-white/5 rounded-lg border border-white/10 flex flex-col items-center">
                    <div className="w-16 h-16 mb-4 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p>Không có thông tin vai trò</p>
                </div>
              )}
              
                {/* Enhanced bottom action button with animation */}
              <Link
                href="/heroes"
                  className="mt-6 w-full inline-block text-center py-3 rounded-lg relative group overflow-hidden"
                >
                  {/* Button background with hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F44336]/80 to-[#F44336] transform group-hover:scale-105 transition-transform duration-300"></div>
                  
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  {/* Button text */}
                  <span className="relative z-10 font-bold text-white inline-flex items-center">
                    <span>Xem anh hùng khác</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 