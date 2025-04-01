import { createClient } from '@supabase/supabase-js';
import { BaiViet } from '@/types/bai_viet';
import ThanhDieuHuong from '@/thanh_phan/thanh_dieu_huong';
import BoLocBaiViet from '@/components/BoLocBaiViet';
import DanhSachBaiViet from '@/components/DanhSachBaiViet';
import Image from 'next/image';

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
        </div>
        
        {/* Content */}
        <div className="relative z-30 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
            <h1 className="font-orbitron text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-none drop-shadow-lg">
            <span className="relative inline-block">
              NEWS 
              <span className="absolute -inset-1 opacity-50 blur-sm bg-gradient-to-r from-[#F44336]/40 to-[#ff9900]/40 -z-10 rounded-lg animate-pulse"></span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F44336] to-transparent"></span>
            </span>
          </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-[#F44336] to-[#FF9800] mb-6 animate-width-expand" />
              <p className="text-xl text-white/90 max-w-2xl animate-fade-in-delay drop-shadow-md">
                Cập nhật mới nhất về game, chia sẻ chiến thuật và tương tác với cộng đồng Overwatch
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a141e] to-transparent z-10" />
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <BoLocBaiViet activeFilter={loai} />
        
        <DanhSachBaiViet baiViets={filteredBaiViets} />
        
        {filteredBaiViets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white text-xl">Không có bài viết nào trong danh mục này</p>
          </div>
        )}
      </div>
    </div>
  );
} 