import { createClient } from '@supabase/supabase-js';
import { BaiViet } from '@/loai/bai_viet';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatRelativeTime } from '@/utils/dateUtils';
import VideoSection from './VideoSection';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Get article details
async function getArticle(id: string) {
  try {
    // Get default path from environment variables
    const defaultAvatar = process.env.NEXT_PUBLIC_DEFAULT_AVATAR || '/images/avatar-default.png';
    
    // First, get the article without joins to ensure it works
    const { data: articleData, error: articleError } = await supabase
      .from('bai_viet')
      .select('*')
      .eq('id', id)
      .single();

    if (articleError) {
      console.error('Error fetching article basic data:', articleError);
      return null;
    }

    // If there is no user_id, return the article with default user info
    if (!articleData.nguoi_dung_id) {
      return {
        ...articleData,
        nguoi_dung: {
          id: 'unknown',
          ten: 'Anonymous User',
          avatar: defaultAvatar
        }
      } as BaiViet & { nguoi_dung: { id: string, ten: string, avatar: string } };
    }

    // Then, try to get user information
    const { data: userData, error: userError } = await supabase
      .from('nguoi_dung')
      .select('id, ten, avatar')
      .eq('id', articleData.nguoi_dung_id)
      .single();

    // If there is an error when fetching user info, use default info
    if (userError) {
      console.warn('Error fetching user data:', userError);
      return {
        ...articleData,
        nguoi_dung: {
          id: articleData.nguoi_dung_id,
          ten: 'Unknown User',
          avatar: defaultAvatar
        }
      } as BaiViet & { nguoi_dung: { id: string, ten: string, avatar: string } };
    }

    // Return the article with user information
    return {
      ...articleData,
      nguoi_dung: userData || {
        id: articleData.nguoi_dung_id,
        ten: 'Unknown User',
        avatar: defaultAvatar
      }
    } as BaiViet & { nguoi_dung: { id: string, ten: string, avatar: string } };
  } catch (error) {
    console.error('Unexpected error in getArticle:', error);
    return null;
  }
}

// Get related articles (same type)
async function getRelatedArticles(type: string, currentId: string, limit = 3) {
  const { data, error } = await supabase
    .from('bai_viet')
    .select('*')
    .eq('loai', type)
    .neq('id', currentId)
    .order('ngay_dang', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }

  return data as BaiViet[];
}

// Function to generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The article does not exist or has been removed'
    };
  }
  
  return {
    title: `${article.tieu_de || 'No Title'} | Overwatch Clone`,
    description: (article.noi_dung || '').substring(0, 160) + '...',
    openGraph: {
      title: article.tieu_de || 'No Title',
      description: (article.noi_dung || '').substring(0, 160) + '...',
      images: [article.anh_dai_dien || process.env.NEXT_PUBLIC_DEFAULT_BANNER || '/images/overwatch_bg_2.jpg']
    }
  };
}

// Configure to allow dynamic parameters
export const dynamicParams = true;

// Ensure this page is always dynamically rendered
export const dynamic = 'force-dynamic';

export default async function ArticleDetailPage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);
  
  if (!article) {
    notFound();
  }
  
  // Ensure article type is valid to avoid errors when querying related articles
  const type = article.loai === 'tin_tuc' || article.loai === 'cong_dong' 
    ? article.loai 
    : 'tin_tuc';
  
  const relatedArticles = await getRelatedArticles(type, params.id);
  
  // Use environment variables for default paths
  const defaultAvatar = process.env.NEXT_PUBLIC_DEFAULT_AVATAR || '/images/avatar-default.png';
  const defaultBanner = process.env.NEXT_PUBLIC_DEFAULT_BANNER || '/images/overwatch_bg_2.jpg';
  
  // Default values for images if not available
  const avatarUrl = article.nguoi_dung?.avatar || defaultAvatar;
  const userName = article.nguoi_dung?.ten || 'Anonymous User';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a141e] to-[#1a2634]">
      <ThanhDieuHuongResponsive />
      
      {/* Hero section with parallax effect */}
      <div className="relative h-[100vh] w-full overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0">
          {/* Main image */}
          <div className="absolute inset-0">
            <Image 
              src={article.anh_dai_dien || defaultBanner}
              alt={article.tieu_de || 'No Title'}
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
                  article.loai === 'tin_tuc' 
                    ? 'bg-[#F44336]/20 text-[#F44336] border-[#F44336]/30 border' 
                    : 'bg-[#4CAF50]/20 text-[#4CAF50] border-[#4CAF50]/30 border'
                }`}>
                  {article.loai === 'tin_tuc' ? 'News' : 'Community'}
                </span>
              </div>
              
              {/* Title with glow effect */}
              <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white relative">
                  {article.tieu_de || 'No Title'}
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
                  alt={userName}
                  fill
                  sizes="(max-width: 768px) 64px, 80px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-white">{userName}</h3>
                  <span className="hidden md:inline text-white/40">•</span>
                  <span suppressHydrationWarning className="hidden md:inline text-white/40 text-sm">
                    {article.ngay_dang ? new Date(article.ngay_dang).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    }) : 'No date'}
                  </span>
                </div>
                <span suppressHydrationWarning className="md:hidden text-white/40 text-sm">
                  {article.ngay_dang ? new Date(article.ngay_dang).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  }) : 'No date'}
                </span>
                <span className="mt-2 px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-white/70">
                  Author
                </span>
              </div>
            </div>
          </div>
          
          {/* Article content */}
          <div className="p-6 md:p-10">
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="whitespace-pre-line text-white/85 leading-relaxed text-lg">
                {article.noi_dung || 'No content available'}
              </div>
            </div>
          </div>
          
          {/* Video section */}
          {article.video && article.video.includes('iframe') && (
            <div className="p-6 md:p-10 pt-0">
              <VideoSection video={article.video} />
            </div>
          )}
          
          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <div className="p-6 md:p-10 bg-[#0f1923]/70 border-t border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-[#F44336] to-transparent rounded-full"></div>
                <h2 className="text-xl font-bold text-white">Related Articles</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((article) => (
                  <Link 
                    key={article.id} 
                    href={`/new/${article.id}`}
                    className="group bg-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/10 hover:shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={article.anh_dai_dien || defaultBanner}
                        alt={article.tieu_de || 'Related Article'}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-bold text-white group-hover:text-[#F44336] transition-colors line-clamp-2 mb-2">
                        {article.tieu_de}
                      </h3>
                      <p className="text-sm text-white/60 line-clamp-2 mb-4">
                        {article.noi_dung}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-white/40">
                          {article.ngay_dang ? new Date(article.ngay_dang).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          }) : 'No date'}
                        </span>
                        <span className="text-xs text-[#F44336] flex items-center">
                          View details
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 transition-transform transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Back to news button */}
        <div className="max-w-4xl mx-auto mt-10 mb-20 flex justify-center">
          <Link 
            href="/new"
            className="px-6 py-3 bg-[#0f1923] hover:bg-[#0f1923]/80 text-white rounded-lg transition-all duration-300 flex items-center gap-2 border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to News
          </Link>
        </div>
      </div>
    </div>
  );
} 