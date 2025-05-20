"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { BaiViet } from '@/types/bai_viet';
import { createClient } from '@supabase/supabase-js';

// Tạo Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function NewsSection() {
  const [news, setNews] = useState<BaiViet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Kiểm tra nếu URL hoặc key Supabase không tồn tại
        if (!supabaseUrl || !supabaseKey) {
          throw new Error('Supabase URL or Key is not configured');
        }

        // Khởi tạo Supabase client
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Lấy dữ liệu từ bảng bai_viet
        const { data, error } = await supabase
          .from('bai_viet')
          .select('*')
          .order('ngay_dang', { ascending: false })
          .limit(4);
        
        if (error) {
          throw error;
        }
        
        // Cập nhật state với dữ liệu từ Supabase
        setNews(data || []);
      } catch (e) {
        if (e instanceof Error) {
          console.error('Error loading news from Supabase:', e);
          setError(e.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0d2e4b] to-[#050a0c] relative overflow-hidden particle-effect transition-all duration-300">
      {/* Particle elements */}
      <div className="particle" style={{ left: '10%', animationDelay: '0s' }}></div>
      <div className="particle" style={{ left: '20%', animationDelay: '1s' }}></div>
      <div className="particle" style={{ left: '35%', animationDelay: '2s' }}></div>
      <div className="particle" style={{ left: '50%', animationDelay: '0.5s' }}></div>
      <div className="particle" style={{ left: '65%', animationDelay: '1.5s' }}></div>
      <div className="particle" style={{ left: '80%', animationDelay: '2.5s' }}></div>
      <div className="particle" style={{ left: '90%', animationDelay: '0.2s' }}></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header - Centered with glow */}
        <div className="text-center mb-14 reveal-scale">
          <div className="inline-block">
            <h2 className="inline-block text-5xl font-extrabold text-white mb-6 relative cyber-halo">
              <span className="text-shadow-blue">NEWS </span>
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--overwatch-blue)] to-transparent"></div>
            </h2>
          </div>
          <p className="text-white/60 max-w-2xl mx-auto">
          Get the latest updates about M-SCI. From World Boss events, Guild War to giftcodes and new character updates. Follow important announcements about game feature upgrades.
          </p>
        </div>
        
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-56">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--overwatch-blue)]"></div>
          </div>
        )}
        
        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-10 bg-[#1F2326]/50 backdrop-blur-sm rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Unable to load news</h3>
            <p className="text-white/60 mb-4">There was an error loading the latest news. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[var(--overwatch-blue)]/20 hover:bg-[var(--overwatch-blue)]/30 text-[var(--overwatch-blue)] rounded-md transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Main featured news */}
        {!loading && !error && news.length > 0 && (
          <div className="mb-12 reveal">
            {/* Featured news from the first item */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-xl hover:shadow-blue-500/10 transition-all duration-300 card-neon">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-80 lg:h-auto overflow-hidden">
                  <Image
                    src={news[0].anh_dai_dien || "/images/overwatch_bg_2.jpg"} // Fallback image
                    alt={news[0].tieu_de}
                    fill
                    className="object-cover transform transition-transform duration-700 hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-[var(--overwatch-blue)] text-white text-sm font-bold px-3 py-1 rounded">
                    {news[0].loai === 'tin_tuc' ? 'GAME' : 'COMMUNITY'} 
                  </div>
                </div>
                
                <div className="p-6 lg:p-10 flex flex-col justify-center">
                  <div className="text-[var(--overwatch-blue)] font-semibold mb-3 flex items-center dot-flicker">
                    <span className="inline-block w-2 h-2 bg-[var(--overwatch-blue)] rounded-full mr-2"></span>
                    {news[0].loai === 'tin_tuc' ? 'GAME UPDATE' : 'COMMUNITY'}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{news[0].tieu_de}</h3>
                  <p className="text-white/70 mb-6">
                    {news[0].noi_dung}
                  </p>
                  <div className="mt-auto">
                    <Link 
                      href={`/new/${news[0].id}`}
                      className="inline-flex items-center text-white font-bold transition-all hover:text-[var(--overwatch-blue)] button-cyber"
                    >
                      READ MORE
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* News grid */}
        {!loading && !error && news.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(1).map((item) => (
              <div key={item.id} className="reveal bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 card-neon">
                <Link href={`/new/${item.id}`} className="block group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.anh_dai_dien || "/images/overwatch_bg_2.jpg"} // Fallback image cho card
                      alt={item.tieu_de}
                      fill
                      className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-[var(--overwatch-blue)]/70 text-white text-xs font-bold px-2 py-1 rounded">
                      {item.loai === 'tin_tuc' ? 'GAME' : 'COMMUNITY'}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--overwatch-blue)] transition-colors">{item.tieu_de}</h4>
                    <p className="text-white/60 text-sm mb-3 line-clamp-3">{item.noi_dung}</p>
                    <div className="text-xs text-white/50">{new Date(item.ngay_dang).toLocaleDateString()}</div> 
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <p className="text-center text-white/70">No news available at the moment.</p>
        )}
        
        {/* See all news button */}
        <div className="text-center mt-12 reveal">
          <Link 
            href="/new"
            className="inline-block bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full border border-white/10 transition-all duration-300 hover:border-[var(--overwatch-blue)]/50 hover:shadow-lg hover:shadow-blue-500/10 button-glow"
          >
            VIEW ALL NEWS
          </Link>
        </div>
      </div>
    </section>
  );
} 