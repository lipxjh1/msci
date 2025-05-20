"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BaiViet } from '@/types/bai_viet';
import ThanhDieuHuongResponsive from '@/thanh_phan/thanh_dieu_huong_responsive';
import Footer from "@/app/home/components/Footer";
import { createClient } from '@supabase/supabase-js';

// Tạo Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function NewsDetail({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<BaiViet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Lấy dữ liệu tin tức dựa trên ID
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Kiểm tra nếu URL hoặc key Supabase không tồn tại
        if (!supabaseUrl || !supabaseKey) {
          throw new Error('Supabase URL hoặc Key không được cấu hình');
        }

        // Khởi tạo Supabase client
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Lấy dữ liệu từ bảng bai_viet dựa trên ID
        const { data, error } = await supabase
          .from('bai_viet')
          .select('*')
          .eq('id', params.id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setArticle(data);
        } else {
          setError('Không tìm thấy bài viết');
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error('Lỗi khi tải chi tiết bài viết:', e);
          setError(e.message);
        } else {
          setError('Đã xảy ra lỗi không xác định');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-[#16181D] text-white">
      <ThanhDieuHuongResponsive />
      
      {loading && (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--overwatch-blue)]"></div>
        </div>
      )}
      
      {error && !loading && (
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-2xl mx-auto bg-[#1F2326]/50 rounded-lg p-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">{error}</h2>
            <p className="text-gray-400 mb-6">Không thể tải nội dung bài viết. Vui lòng thử lại sau.</p>
            <Link 
              href="/new"
              className="inline-block px-6 py-3 bg-[var(--overwatch-blue)] text-white font-medium rounded-md hover:bg-[var(--overwatch-blue)]/80 transition-colors"
            >
              Quay lại trang tin tức
            </Link>
          </div>
        </div>
      )}
      
      {article && !loading && !error && (
        <>
          {/* Hero Banner */}
          <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
            <Image 
              src={article.anh_dai_dien || "/images/overwatch_bg_2.jpg"} 
              alt={article.tieu_de} 
              fill 
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#16181D]/70 via-[#16181D]/60 to-[#16181D]"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-4xl px-4">
                <div className="inline-block mb-4 px-3 py-1 rounded text-sm font-bold" style={{
                  backgroundColor: article.loai === 'tin_tuc' ? 'var(--overwatch-blue)' : '#FF7D00'
                }}>
                  {article.loai === 'tin_tuc' ? 'GAME UPDATE' : 'COMMUNITY'}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                  {article.tieu_de}
                </h1>
                <div className="text-gray-300 text-sm md:text-base">
                  {formatDate(article.ngay_dang)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Article Content */}
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto bg-[#1F2326] rounded-lg p-6 md:p-8 shadow-xl">
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-lg leading-relaxed mb-6 whitespace-pre-line">{article.noi_dung}</p>
              </div>
              
              {/* Share and Navigation */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-6 border-t border-gray-700">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <span className="text-gray-400 text-sm">Chia sẻ:</span>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  </button>
                </div>
                
                <Link 
                  href="/new"
                  className="flex items-center text-[var(--overwatch-blue)] hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                  Quay lại danh sách tin tức
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      
      <Footer />
    </div>
  );
} 