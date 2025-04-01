import { createClient } from '@supabase/supabase-js';
import { BaiViet } from '@/types/bai_viet';
import ThanhDieuHuong from '@/thanh_phan/thanh_dieu_huong';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatRelativeTime } from '@/utils/dateUtils';

// Khởi tạo Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Lấy thông tin chi tiết bài viết
async function getBaiViet(id: string) {
  try {
    // Lấy đường dẫn mặc định từ biến môi trường
    const defaultAvatar = process.env.NEXT_PUBLIC_DEFAULT_AVATAR || '/images/avatar-default.png';
    
    // Trước tiên, lấy bài viết không có join để đảm bảo hoạt động
    const { data: baiVietData, error: baiVietError } = await supabase
      .from('bai_viet')
      .select('*')
      .eq('id', id)
      .single();

    if (baiVietError) {
      console.error('Error fetching bai viet basic data:', baiVietError);
      return null;
    }

    // Nếu không có nguoi_dung_id, trả về bài viết với thông tin người dùng mặc định
    if (!baiVietData.nguoi_dung_id) {
      return {
        ...baiVietData,
        nguoi_dung: {
          id: 'unknown',
          ten: 'Người dùng ẩn danh',
          avatar: defaultAvatar
        }
      } as BaiViet & { nguoi_dung: { id: string, ten: string, avatar: string } };
    }

    // Sau đó, thử lấy thông tin người dùng
    const { data: nguoiDungData, error: nguoiDungError } = await supabase
      .from('nguoi_dung')
      .select('id, ten, avatar')
      .eq('id', baiVietData.nguoi_dung_id)
      .single();

    // Nếu có lỗi khi lấy thông tin người dùng, sử dụng thông tin mặc định
    if (nguoiDungError) {
      console.warn('Error fetching user data:', nguoiDungError);
      return {
        ...baiVietData,
        nguoi_dung: {
          id: baiVietData.nguoi_dung_id,
          ten: 'Người dùng không xác định',
          avatar: defaultAvatar
        }
      } as BaiViet & { nguoi_dung: { id: string, ten: string, avatar: string } };
    }

    // Trả về bài viết với thông tin người dùng
    return {
      ...baiVietData,
      nguoi_dung: nguoiDungData || {
        id: baiVietData.nguoi_dung_id,
        ten: 'Người dùng không xác định',
        avatar: defaultAvatar
      }
    } as BaiViet & { nguoi_dung: { id: string, ten: string, avatar: string } };
  } catch (error) {
    console.error('Unexpected error in getBaiViet:', error);
    return null;
  }
}

// Lấy các bài viết liên quan (cùng loại)
async function getBaiVietLienQuan(loai: string, currentId: string, limit = 3) {
  const { data, error } = await supabase
    .from('bai_viet')
    .select('*')
    .eq('loai', loai)
    .neq('id', currentId)
    .order('ngay_dang', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }

  return data as BaiViet[];
}

// Hàm generateMetadata để tạo metadata động cho SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const baiViet = await getBaiViet(params.id);
  
  if (!baiViet) {
    return {
      title: 'Không tìm thấy bài viết',
      description: 'Bài viết không tồn tại hoặc đã bị xóa'
    };
  }
  
  return {
    title: `${baiViet.tieu_de} | Overwatch Clone`,
    description: baiViet.noi_dung.substring(0, 160) + '...',
    openGraph: {
      title: baiViet.tieu_de,
      description: baiViet.noi_dung.substring(0, 160) + '...',
      images: [baiViet.anh_dai_dien]
    }
  };
}

// Cấu hình cho phép tham số động
export const dynamicParams = true;

// Đảm bảo rằng trang này luôn được render động
export const dynamic = 'force-dynamic';

export default async function BaiVietDetailPage({ params }: { params: { id: string } }) {
  const baiViet = await getBaiViet(params.id);
  
  if (!baiViet) {
    notFound();
  }
  
  // Đảm bảo loại bài viết hợp lệ để tránh lỗi khi truy vấn bài viết liên quan
  const loai = baiViet.loai === 'tin_tuc' || baiViet.loai === 'cong_dong' 
    ? baiViet.loai 
    : 'tin_tuc';
  
  const baiVietLienQuan = await getBaiVietLienQuan(loai, params.id);
  
  // Sử dụng biến môi trường cho đường dẫn mặc định
  const defaultAvatar = process.env.NEXT_PUBLIC_DEFAULT_AVATAR || '/images/avatar-default.png';
  const defaultBanner = process.env.NEXT_PUBLIC_DEFAULT_BANNER || '/images/overwatch_bg_2.jpg';
  
  // Giá trị mặc định cho hình ảnh nếu không có
  const avatarUrl = baiViet.nguoi_dung?.avatar || defaultAvatar;
  const nguoiDungTen = baiViet.nguoi_dung?.ten || 'Người dùng ẩn danh';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a141e] to-[#1a2634]">
      <ThanhDieuHuong />
      
      {/* Hero section với parallax effect */}
      <div className="relative h-[100vh] w-full overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0">
          {/* Main image */}
          <div className="absolute inset-0">
            <Image 
              src={baiViet.anh_dai_dien || defaultBanner}
              alt={baiViet.tieu_de}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-110"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a141e]/70 via-[#0a141e]/30 to-[#0a141e] z-10"></div>
          
          {/* Particle effect */}
          <div className="absolute inset-0 z-10">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-100"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-200"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse delay-300"></div>
          </div>
        </div>
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-block mb-6">
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md ${
                  baiViet.loai === 'tin_tuc' 
                    ? 'bg-[#F44336]/20 text-[#F44336] border-[#F44336]/30 border' 
                    : 'bg-[#4CAF50]/20 text-[#4CAF50] border-[#4CAF50]/30 border'
                }`}>
                  {baiViet.loai === 'tin_tuc' ? 'Tin tức' : 'Cộng đồng'}
                </span>
              </div>
              
              {/* Title with glow effect */}
              <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white relative">
                  {baiViet.tieu_de}
                  <span className="absolute -inset-1 animate-pulse-very-slow opacity-30 blur-md bg-[#f44336]/20 -z-10 rounded-lg"></span>
                </span>
              </h1>
            </div>
          </div>
        </div>
        
        {/* Decorative bottom curve */}
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform rotate-1 scale-110 z-20"></div>
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#0a141e] transform -rotate-1 scale-110 z-20"></div>
      </div>
      
      {/* Main content section */}
      <div className="container mx-auto px-4 relative z-30 -mt-16 pt-20">
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden bg-[#1a2634]/80 backdrop-blur-md border border-white/5 shadow-xl pt-16">
          {/* Author info card - elevated above content */}
          <div className="relative -mt-8 mx-6 md:mx-10 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 bg-[#0f1923]/90 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl">
              <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden border-2 border-white/20">
                <Image 
                  src={avatarUrl}
                  alt={nguoiDungTen}
                  fill
                  sizes="(max-width: 768px) 64px, 80px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-white">{nguoiDungTen}</h3>
                  <span className="hidden md:inline text-white/40">•</span>
                  <span suppressHydrationWarning className="hidden md:inline text-white/40 text-sm">
                    {new Date(baiViet.ngay_dang).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <span suppressHydrationWarning className="md:hidden text-white/40 text-sm">
                  {new Date(baiViet.ngay_dang).toLocaleDateString('vi-VN')}
                </span>
                <span className="mt-2 px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-white/70">
                  Tác giả
                </span>
              </div>
            </div>
          </div>
          
          {/* Article content */}
          <div className="p-6 md:p-10">
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="whitespace-pre-line text-white/85 leading-relaxed text-lg">
                {baiViet.noi_dung}
              </div>
            </div>
            
            {/* Tags */}
            <div className="mt-10 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-white/5 text-sm font-medium text-white/60 hover:bg-white/10 transition-colors cursor-pointer">
                #{baiViet.loai === 'tin_tuc' ? 'overwatch' : 'community'}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-sm font-medium text-white/60 hover:bg-white/10 transition-colors cursor-pointer">
                #gaming
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-sm font-medium text-white/60 hover:bg-white/10 transition-colors cursor-pointer">
                #{baiViet.loai}
              </span>
            </div>
            
            {/* Share buttons */}
            <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
              <div className="flex gap-3">
                <button className="p-2 rounded-full bg-white/5 hover:bg-[#F44336]/20 hover:text-[#F44336] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-white/5 hover:bg-[#1877F2]/20 hover:text-[#1877F2] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-white/5 hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
              </div>
              
              <Link 
                href="/tin-tuc" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a2634] hover:bg-[#F44336]/80 transition-colors duration-300 border border-white/10 hover:border-[#F44336] group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Quay lại</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related posts with better styling */}
      {baiVietLienQuan.length > 0 && (
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-white relative inline-block">
                Bài viết liên quan
                <div className="absolute -bottom-2 left-0 h-1 w-12 bg-gradient-to-r from-[#F44336] to-transparent"></div>
              </h2>
              <Link href="/tin-tuc" className="text-white/70 hover:text-white flex items-center gap-1 transition-colors">
                Xem tất cả
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {baiVietLienQuan.map((post) => (
                <Link href={`/tin-tuc/${post.id}`} key={post.id} className="block group">
                  <div className="bg-[#1a2634]/60 rounded-xl overflow-hidden border border-white/5 hover:border-[#F44336]/30 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.anh_dai_dien || defaultBanner}
                        alt={post.tieu_de}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634] to-transparent opacity-70"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          post.loai === 'tin_tuc' 
                            ? 'bg-[#F44336]/30 text-white' 
                            : 'bg-[#4CAF50]/30 text-white'
                        }`}>
                          {post.loai === 'tin_tuc' ? 'Tin tức' : 'Cộng đồng'}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-[#F44336] transition-colors">
                        {post.tieu_de}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-3 flex-grow">
                        {post.noi_dung}
                      </p>
                      <div className="flex justify-between items-center mt-auto pt-3 border-t border-white/5">
                        <span suppressHydrationWarning className="text-sm text-gray-500">
                          {formatRelativeTime(post.ngay_dang)}
                        </span>
                        <span className="text-[#F44336] text-sm font-medium group-hover:translate-x-1 transition-transform">
                          Đọc thêm
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 