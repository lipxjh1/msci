'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Interface cho đối tượng Partner
interface Partner {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  details: {
    [key: string]: string | string[] | number | null;
  };
  color?: string;
}

export default function PartnersContent({ selectedCategory }: { selectedCategory: string | null }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  
  // Mô phỏng việc tải dữ liệu đối tác
  useEffect(() => {
    const loadPartners = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Giả lập việc tải dữ liệu từ API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dữ liệu đối tác dựa trên nội dung từ file 10toitac.txt
        const partnersData = generatePartnersData();
        
        // Lọc đối tác theo danh mục nếu có chọn danh mục
        const filteredPartners = selectedCategory 
          ? partnersData.filter(partner => partner.category === selectedCategory)
          : partnersData;
        
        setPartners(filteredPartners);
      } catch (err: any) {
        console.error('Lỗi khi tải dữ liệu đối tác:', err);
        setError(err.message || 'Không thể tải dữ liệu đối tác');
      } finally {
        setLoading(false);
      }
    };
    
    loadPartners();
  }, [selectedCategory]);
  
  // Hiển thị trạng thái loading
  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="relative cyber-halo">
          <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-[var(--accent-blue-bright)] animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-[var(--accent-blue-glow)] animate-spin animation-delay-150"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-[var(--accent-blue-bright)] animate-spin animation-delay-300"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-[var(--accent-blue-bright)]/30 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Hiển thị thông báo lỗi
  if (error) {
    return (
      <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-8 text-white text-center my-12 shadow-lg shadow-red-500/10 max-w-2xl mx-auto card-neon">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center cyber-halo">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="font-orbitron text-xl font-bold text-red-400 mb-2 text-shadow-sm">Đã xảy ra lỗi</h3>
        <p className="font-rajdhani text-white/80">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="font-rajdhani mt-6 px-6 py-2 tracking-wider text-shadow-sm button-cyber clip-hexagon hexagon-border"
        >
          Thử lại
        </button>
      </div>
    );
  }
  
  // Hiển thị khi không có kết quả
  if (partners.length === 0) {
    return (
      <div className="text-center py-24 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl card-neon">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="font-orbitron text-2xl font-bold text-white mb-3 text-shadow-blue">Không tìm thấy đối tác</h3>
        <p className="font-rajdhani text-white/60 max-w-lg mx-auto">Không có đối tác nào phù hợp với điều kiện tìm kiếm. Vui lòng thử lại với bộ lọc khác.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="font-rajdhani mt-6 px-6 py-3 tracking-wider text-shadow-sm button-cyber clip-hexagon hexagon-border"
        >
          Xem tất cả đối tác
        </button>
      </div>
    );
  }
  
  // Nhóm partners theo danh mục
  const groupedPartners: { [key: string]: Partner[] } = {};
  
  partners.forEach(partner => {
    if (!groupedPartners[partner.category]) {
      groupedPartners[partner.category] = [];
    }
    groupedPartners[partner.category].push(partner);
  });
  
  // Mapping tên danh mục
  const categoryNames: {[key: string]: string} = {
    'investors': 'NHÀ ĐẦU TƯ CHIẾN LƯỢC',
    'technology': 'ĐỐI TÁC CÔNG NGHỆ HÀNG ĐẦU',
    'publishers': 'ĐỐI TÁC PHÁT HÀNH TOÀN CẦU',
    'creative': 'ĐỐI TÁC SÁNG TẠO & PHÁT TRIỂN',
    'academic': 'ĐỐI TÁC HỌC THUẬT & NGHIÊN CỨU'
  };
  
  // Mapping màu sắc danh mục
  const categoryColors: {[key: string]: string} = {
    'investors': 'var(--vaiTroTank)',
    'technology': 'var(--vaiTroDamage)',
    'publishers': 'var(--vaiTroSupport)',
    'creative': '#9c27b0',
    'academic': '#2196f3'
  };
  
  return (
    <div>
      {/* Hiển thị đối tác theo từng nhóm */}
      {Object.keys(groupedPartners).map((category) => (
        <div key={category} className="mb-20">
          <div className="mb-10">
            <h2 className="font-orbitron text-3xl font-bold text-white mb-5 text-shadow-blue text-center">
              <span className="relative inline-block">
                {categoryNames[category] || category.toUpperCase()}
                <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupedPartners[category].map((partner, index) => (
              <div 
                key={partner.id}
                className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 card-neon group hover:scale-[1.02]"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Header với logo */}
                <div className="relative h-36 bg-gradient-to-r from-[#041019] to-[#061f2c] flex items-center justify-center p-4 overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-grid-pattern bg-[length:30px_30px]"></div>
                  </div>
                  
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{ 
                      background: `radial-gradient(circle at center, ${partner.color || categoryColors[category]} 0%, transparent 70%)` 
                    }}
                  ></div>
                  
                  {/* Logo */}
                  <div className="h-20 w-44 relative backdrop-blur bg-white/10 p-2 rounded-lg shadow-inner border border-white/20">
                    <div className="relative h-full w-full flex items-center justify-center">
                      {/* Placeholder logo */}
                      <div className="text-white font-orbitron font-bold text-xl tracking-tight text-center">
                        {partner.name}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="font-rajdhani text-xl font-bold text-white mb-2 tracking-wide">{partner.name}</h3>
                  
                  <div className="mb-4">
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white backdrop-blur-sm"
                      style={{ 
                        backgroundColor: `${partner.color || categoryColors[category]}30`,
                        borderLeft: `3px solid ${partner.color || categoryColors[category]}`
                      }}
                    >
                      {categoryNames[partner.category].split(' ')[0]}
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-4">{partner.description}</p>
                  
                  {/* Details */}
                  <ul className="space-y-2 mb-4">
                    {Object.entries(partner.details).map(([key, value]) => (
                      <li key={key} className="flex items-start">
                        <span className="flex-shrink-0 mr-2 mt-1">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: partner.color || categoryColors[partner.category] }}
                          ></div>
                        </span>
                        <span className="text-white/80 text-sm">
                          <span className="font-medium">{formatDetailKey(key)}:</span> {formatDetailValue(value)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Footer */}
                <div className="px-6 pb-6 pt-2 flex justify-end">
                  <Link 
                    href="#" 
                    className="font-rajdhani text-sm font-medium tracking-wider text-shadow-sm button-cyber py-2 px-4 transition-all duration-300"
                    style={{ 
                      borderColor: partner.color || categoryColors[partner.category],
                      backgroundColor: `${partner.color || categoryColors[partner.category]}20`
                    }}
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Hàm định dạng key của chi tiết
function formatDetailKey(key: string): string {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Hàm định dạng giá trị của chi tiết
function formatDetailValue(value: string | string[] | number | null): string {
  if (value === null) return 'N/A';
  if (Array.isArray(value)) return value.join(', ');
  return String(value);
}

// Hàm tạo dữ liệu đối tác từ nội dung file 10toitac.txt
function generatePartnersData(): Partner[] {
  return [
    // Nhà đầu tư
    {
      id: 'sequoia-capital',
      name: 'Sequoia Capital Southeast Asia',
      category: 'investors',
      description: 'Nhà đầu tư dẫn đầu vòng gọi vốn Series A, cung cấp vốn và hỗ trợ chiến lược tăng trưởng',
      logo: '/images/partners/sequoia.png',
      color: '#FFC107',
      details: {
        von_dau_tu: '$8M',
        linh_vuc_tap_trung: 'Chiến lược tăng trưởng, Mở rộng thị trường',
        dai_dien_hdqt: 'Managing Partner',
        gia_tri_gia_tang: 'Kết nối mạng lưới toàn cầu, Tư vấn chiến lược'
      }
    },
    {
      id: 'andreessen-horowitz',
      name: 'Andreessen Horowitz (a16z)',
      category: 'investors',
      description: 'Quỹ đầu tư hàng đầu trong lĩnh vực công nghệ và gaming, chuyên về Web3 và blockchain',
      logo: '/images/partners/a16z.png',
      color: '#FFC107',
      details: {
        von_dau_tu: '$4M',
        portfolio: '50+ gaming companies',
        chuyen_mon: 'Web3 gaming, Tokenomics, Community building',
        gia_tri_gia_tang: 'Technical advisory, Token design, Go-to-market strategy'
      }
    },
    {
      id: 'tencent-games',
      name: 'Tencent Games',
      category: 'investors',
      description: 'Nhà đầu tư chiến lược và đối tác phát hành tại thị trường Trung Quốc',
      logo: '/images/partners/tencent.png',
      color: '#FFC107',
      details: {
        von_dau_tu: '$5M',
        doi_tac_chien_luoc: 'Publishing rights tại Trung Quốc',
        ho_tro_ky_thuat: 'Cloud gaming, AI technology',
        thi_truong: 'Tiếp cận 800M+ gamers'
      }
    },
    
    // Đối tác công nghệ
    {
      id: 'unity-technologies',
      name: 'Unity Technologies',
      category: 'technology',
      description: 'Đối tác chiến lược cung cấp công nghệ game engine và hỗ trợ kỹ thuật chuyên sâu',
      logo: '/images/partners/unity.png',
      color: '#E53935',
      details: {
        cap_do_doi_tac: 'Strategic Partner',
        thoa_thuan: 'Custom enterprise license',
        ho_tro: 'Dedicated engineering support',
        dao_tao: 'Advanced Unity certification program'
      }
    },
    {
      id: 'epic-games',
      name: 'Epic Games (Unreal Engine)',
      category: 'technology',
      description: 'Đối tác cung cấp công nghệ Unreal Engine và công cụ phát triển game hiện đại',
      logo: '/images/partners/epic.png',
      color: '#E53935',
      details: {
        thoa_thuan: 'MegaGrant recipient - $500,000',
        cong_nghe: 'MetaHuman Creator access',
        ho_tro: 'Direct support channel',
        tich_hop: 'Epic Online Services'
      }
    },
    {
      id: 'aws',
      name: 'Amazon Web Services (AWS)',
      category: 'technology',
      description: 'Đối tác hạ tầng đám mây cung cấp dịch vụ hosting và công nghệ GameLift',
      logo: '/images/partners/aws.png',
      color: '#E53935',
      details: {
        partnership_tier: 'Advanced Technology Partner',
        credits: '$250,000 AWS Activate',
        solutions: 'GameLift, Lumberyard integration',
        support: '24/7 Premium support'
      }
    },
    
    // Đối tác phát hành
    {
      id: 'netease-games',
      name: 'NetEase Games',
      category: 'publishers',
      description: 'Đối tác phát hành độc quyền tại thị trường Trung Quốc và châu Á',
      logo: '/images/partners/netease.png',
      color: '#4CAF50',
      details: {
        khu_vuc: 'Trung Quốc & Châu Á',
        thoa_thuan: 'Exclusive publishing rights',
        marketing_budget: '$10M commitment',
        user_acquisition: '200M+ player base'
      }
    },
    {
      id: 'level-infinite',
      name: 'Level Infinite (Tencent)',
      category: 'publishers',
      description: 'Đối tác phát hành toàn cầu với dịch vụ quốc tế hóa và tiếp thị đa nền tảng',
      logo: '/images/partners/level-infinite.png',
      color: '#4CAF50',
      details: {
        khu_vuc: 'Global markets',
        services: 'Full publishing suite',
        localization: '15+ languages',
        marketing: 'Integrated campaigns'
      }
    },
    {
      id: 'garena',
      name: 'Garena',
      category: 'publishers',
      description: 'Đối tác phát hành khu vực Đông Nam Á với hệ sinh thái esports mạnh mẽ',
      logo: '/images/partners/garena.png',
      color: '#4CAF50',
      details: {
        khu_vuc: 'Southeast Asia',
        platforms: 'Mobile & PC',
        payment: 'Local payment integration',
        community: 'Esports ecosystem'
      }
    },
    
    // Đối tác sáng tạo
    {
      id: 'virtuos',
      name: 'Virtuos',
      category: 'creative',
      description: 'Studio chuyên về phát triển nghệ thuật và hoạt họa cho các dự án AAA',
      logo: '/images/partners/virtuos.png',
      color: '#9C27B0',
      details: {
        services: 'Art production, Animation',
        team_size: '50+ dedicated artists',
        projects: 'Character design, Environment art',
        quality: 'AAA standard deliverables'
      }
    },
    {
      id: 'qloc',
      name: 'QLOC',
      category: 'creative',
      description: 'Đối tác chuyên về QA, bản địa hóa và chuyển đổi nền tảng cho game',
      logo: '/images/partners/qloc.png',
      color: '#9C27B0',
      details: {
        services: 'QA, Localization, Porting',
        coverage: '30+ languages',
        testing: '1000+ test cases',
        platforms: 'Multi-platform expertise'
      }
    },
    {
      id: 'dynamedion',
      name: 'Dynamedion',
      category: 'creative',
      description: 'Công ty sản xuất âm nhạc và âm thanh hàng đầu cho game và phương tiện tương tác',
      logo: '/images/partners/dynamedion.png',
      color: '#9C27B0',
      details: {
        portfolio: '500+ game soundtracks',
        services: 'Original score, SFX, Voice direction',
        orchestra: 'Live orchestra recording',
        awards: 'Multiple industry awards'
      }
    },
    
    // Đối tác học thuật
    {
      id: 'mit-game-lab',
      name: 'MIT Game Lab',
      category: 'academic',
      description: 'Đối tác nghiên cứu học thuật về AI và công nghệ game tiên tiến',
      logo: '/images/partners/mit.png',
      color: '#2196F3',
      details: {
        collaboration: 'AI research program',
        focus: 'Procedural content generation',
        funding: '$2M research grant',
        output: '5 published papers'
      }
    },
    {
      id: 'stanford-vhil',
      name: 'Stanford Virtual Human Interaction Lab',
      category: 'academic',
      description: 'Nghiên cứu hành vi người chơi và công nghệ thực tế ảo tiên tiến',
      logo: '/images/partners/stanford.png',
      color: '#2196F3',
      details: {
        research: 'Player behavior analysis',
        technology: 'VR/AR integration',
        grant: 'NSF funding partnership'
      }
    },
    {
      id: 'digipen',
      name: 'DigiPen Institute of Technology',
      category: 'academic',
      description: 'Đối tác đào tạo và phát triển tài năng trong ngành game',
      logo: '/images/partners/digipen.png',
      color: '#2196F3',
      details: {
        program: 'Talent pipeline',
        internships: '20+ interns annually',
        curriculum: 'Industry-aligned courses',
        recruitment: 'Priority hiring'
      }
    }
  ];
} 