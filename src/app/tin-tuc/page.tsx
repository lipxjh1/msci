import { createClient } from '@supabase/supabase-js';
import { BaiViet } from '@/types/bai_viet';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import Image from 'next/image';
import Link from 'next/link';

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

export default async function TinTucPage() {
  const baiViets = await getBaiViet();
  
  // Lấy tất cả bài viết không cần lọc
  const allArticles = baiViets;

  // Tách 4 bài viết nổi bật đầu tiên cho phần NEWS
  const featuredArticles = allArticles.slice(0, 4);
  
  // Tất cả bài viết cho phần hiển thị dưới cùng
  const regularArticles = allArticles;

  // Format ngày tháng
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-[#16181D] text-white">
      <ThanhDieuHuongResponsive />

      {/* Hero Banner */}
      <div className="relative w-full h-[30vh] md:h-[40vh] overflow-hidden">
        <Image 
          src="/images/overwatch_bg_2.jpg" 
          alt="News Hero Banner" 
          fill 
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#16181D]/70 via-[#16181D]/60 to-[#16181D]"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-2">
              NEWS
            </h1>
            <div className="w-20 h-1 bg-[#FF7D00] mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Featured News Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArticles.map((article) => (
              <Link 
                key={article.id}
                href={`/tin-tuc/${article.id}`}
                className="group"
              >
                <div className="bg-[#1F2326] rounded-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00A4EA]/10 h-full flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={article.anh_dai_dien || '/images/overwatch_bg_2.jpg'}
                      alt={article.tieu_de}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    <div className="absolute top-2 right-2 z-10">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        article.loai === 'tin_tuc' 
                          ? 'bg-[#00A4EA] text-white' 
                          : 'bg-[#FF7D00] text-white'
                      }`}>
                        {article.loai === 'tin_tuc' ? 'GAME' : 'COMMUNITY'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-base font-bold text-white group-hover:text-[#00A4EA] transition-colors mb-2 line-clamp-2">
                      {article.tieu_de}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3 flex-grow">
                      {article.noi_dung}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-700">
                      <span className="text-xs text-gray-500">
                        {formatDate(article.ngay_dang)}
                      </span>
                      <span className="text-xs text-[#00A4EA] group-hover:text-[#FF7D00] transition-colors flex items-center">
                        Xem chi tiết
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 transition-transform transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Patch Notes Button */}
        <div className="flex justify-center mb-16">
          <Link 
            href="/ban-cap-nhat"
            className="bg-[#FF7D00] hover:bg-[#FF9D40] text-white font-medium px-8 py-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-[#FF7D00]/30 uppercase tracking-wide flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            Bản Cập Nhật
          </Link>
        </div>

        {/* Divider */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#16181D] px-4 text-sm text-gray-400 uppercase tracking-widest">Tất cả bài viết</span>
          </div>
        </div>

        {/* Regular Articles Section */}
        <div className="space-y-6 mt-8">
          {regularArticles.length > 0 ? (
            regularArticles.map((article) => (
              <Link 
                key={article.id}
                href={`/tin-tuc/${article.id}`}
                className="block group"
              >
                <div className="flex flex-col md:flex-row bg-[#1F2326] rounded-md overflow-hidden transition-all duration-300 hover:bg-[#24282C] hover:shadow-lg">
                  <div className="relative h-56 md:h-40 md:w-64 lg:w-80 flex-shrink-0">
                    <Image
                      src={article.anh_dai_dien || '/images/overwatch_bg_2.jpg'}
                      alt={article.tieu_de}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 256px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                    
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        article.loai === 'tin_tuc' 
                          ? 'bg-[#00A4EA] text-white' 
                          : 'bg-[#FF7D00] text-white'
                      }`}>
                        {article.loai === 'tin_tuc' ? 'GAME' : 'COMMUNITY'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-6 flex flex-col justify-center flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#00A4EA] transition-colors mb-2">
                      {article.tieu_de}
                    </h3>
                    <p className="text-gray-400 line-clamp-2 mb-4 text-sm md:text-base">
                      {article.noi_dung}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-gray-500">
                        {formatDate(article.ngay_dang)}
                      </span>
                      <span className="text-sm text-[#00A4EA] group-hover:text-[#FF7D00] transition-colors flex items-center">
                        Xem chi tiết
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-16 bg-[#1F2326] rounded-md">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Không có bài viết nào</h3>
              <p className="text-gray-400 max-w-lg mx-auto">Hiện tại chưa có bài viết nào. Vui lòng quay lại sau.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 