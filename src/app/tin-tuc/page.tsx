import { createClient } from '@supabase/supabase-js';
import { BaiViet } from '@/types/bai_viet';
import ThanhDieuHuong from '@/thanh_phan/thanh_dieu_huong';
import BoLocBaiViet from '@/components/BoLocBaiViet';
import DanhSachBaiViet from '@/components/DanhSachBaiViet';
import Image from 'next/image';
import Link from 'next/link';
import ScrollButton from '@/components/ScrollButton';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getBaiViet() {
  const { data, error } = await supabase
    .from('bai_viet')
    .select('*')
    .order('ngay_dang', { ascending: false });

  if (error) {
    console.error('Error fetching bai viet:', error);
    return [];
  }

  return data as BaiViet[];
}

export default async function TinTucPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const baiViets = await getBaiViet();
  const loai = typeof searchParams.loai === 'string' ? searchParams.loai : undefined;
  
  // Lọc bài viết theo loại nếu có
  const filteredBaiViets = loai 
    ? baiViets.filter(baiViet => baiViet.loai === loai)
    : baiViets;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a141e] to-[#1a2634]">
      <ThanhDieuHuong />
      
      {/* Hero Section với banner cải tiến */}
      <div className="relative h-[100vh] w-full overflow-hidden pt-20">
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a141e]/70 via-transparent to-[#0a141e] z-20" />
        
        {/* Background layers */}
        <div className="absolute inset-0">
          {/* Background layer 1 - Main image */}
          <div className="absolute inset-0">
            <Image 
              src="/images/overwatch_bg_2.jpg" 
              alt="Overwatch Banner"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          
          {/* Background layer 2 - Parallax effect */}
          <div className="absolute inset-0 animate-float-slow">
            <Image 
              src="/images/particle_overlay.png" 
              alt="Particles"
              fill
              sizes="100vw"
              className="object-cover opacity-30"
            />
          </div>

          {/* Add scanline effect */}
          <div className="absolute inset-0 scanline"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-30 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-orbitron text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-6 uppercase text-shadow-blue animate-title-glow cyber-halo">
                <span className="relative inline-block">
                  NEWS
                  <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
                </span>
              </h1>
              <p className="font-rajdhani text-xl md:text-2xl text-[var(--accent-blue-bright)] font-semibold mb-10 tracking-wide uppercase animate-fade-in">
                Cập nhật mới nhất về game, chia sẻ chiến thuật và tương tác với cộng đồng Overwatch
              </p>
              
              {/* Nút */}
              <div className="animate-slide-up">
                <ScrollButton 
                  targetId="news-content"
                  className="font-rajdhani font-bold tracking-wider text-shadow-sm px-10 py-3 button-cyber clip-hexagon hexagon-border text-white"
                >
                  Xem tin tức
                </ScrollButton>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a141e] to-transparent z-10" />
      </div>

      {/* Content Section */}
      <div id="news-content" className="container mx-auto px-4 py-12 relative z-10">
        <BoLocBaiViet activeFilter={loai} />
        
        <DanhSachBaiViet baiViets={filteredBaiViets} />
        
        {filteredBaiViets.length === 0 && (
          <div className="text-center py-24 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl card-neon">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center cyber-halo">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="font-orbitron text-2xl font-bold text-white mb-3 text-shadow-blue">Không có bài viết nào</h3>
            <p className="font-rajdhani text-white/60 max-w-lg mx-auto">Không có bài viết nào trong danh mục này. Vui lòng thử lại với bộ lọc khác.</p>
            <Link 
              href="/tin-tuc" 
              className="font-rajdhani mt-6 px-6 py-3 tracking-wider text-shadow-sm button-cyber clip-hexagon hexagon-border inline-block text-white"
            >
              Xem tất cả tin tức
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 