"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaArrowLeft, FaUser, FaCalendarAlt, FaEye, FaReply, FaThumbsUp, FaThumbsDown, FaShare, FaBookmark, FaFlag, FaAngleDown } from "react-icons/fa";
import Image from "next/image";

interface PostType {
  id: number;
  author: string;
  avatar: string;
  role: string;
  date: string;
  content: string;
  likes: number;
  views: number;
  isPinned: boolean;
  heroImage?: string;
}

// Fake data để mô phỏng bài viết
const generateFakeData = (topic: string): PostType[] => {
  const authors = [
    "Tracer",
    "Reaper",
    "NângTầmChiếnĐấu",
    "SoloYasuo",
    "AnalystUltim",
    "LongThủHạGiang",
    "NhiEmGiaoLiên",
    "Robot4.0",
    "TiênPhongGG",
    "ÁnhSaoBắc"
  ];
  
  const roles = [
    "Quản Trị Viên",
    "Người Kiểm Duyệt",
    "Thành Viên VIP",
    "Thành Viên Vàng",
    "Kỹ Thuật Viên",
    "Thành Viên",
    "Người Mới",
    "Người Dùng Chưa Xác Minh"
  ];

  // Danh sách ảnh nhân vật
  const heroImages = [
    "/images/heroes/robot_3.png",
    "/images/heroes/robot_4.png",
    "/images/heroes/robot bc.png",
    "/images/heroes/robot quais.png",
    "/images/heroes/drone_2.png",
    "/images/heroes/drone 1.png",
    "/images/heroes/elon_musk.png",
    "/images/heroes/idle_1.png",
    "/images/heroes/idle4.png",
    "/images/heroes/idle 5.png",
  ];
  
  const date = new Date();
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  
  const randomPosts: PostType[] = [];
  
  // Thêm bài viết ghim
  randomPosts.push({
    id: 1,
    author: "NgườiThăngThiên",
    avatar: "",
    role: "Quản Trị Viên",
    date: formattedDate,
    content: `<p>Chào mừng mọi người đến với chủ đề <strong>${formatTitle(topic)}</strong>!</p><p>Hãy cùng thảo luận về chủ đề này một cách văn minh và tôn trọng lẫn nhau.</p><p>Tôi đã tổng hợp một số điểm chính về chủ đề này:</p><ul><li>Đây là điểm thảo luận quan trọng nhất</li><li>Nên tập trung vào các khía cạnh chuyên môn</li><li>Chia sẻ kinh nghiệm thực tế sẽ rất hữu ích</li></ul><p>Dưới đây là một số hình ảnh minh họa:</p><p><img src="/images/overwatch_bg_2.jpg" alt="Overwatch Background" style="max-width: 100%; height: auto; border-radius: 8px;" /></p>`,
    likes: Math.floor(Math.random() * 100) + 50,
    views: Math.floor(Math.random() * 10000) + 1000,
    isPinned: true,
    heroImage: "/images/heroes/elon_musk.png"
  });
  
  // Thêm các bài viết khác
  for (let i = 2; i <= 10; i++) {
    const randomAuthorIndex = Math.floor(Math.random() * authors.length);
    randomPosts.push({
      id: i,
      author: authors[randomAuthorIndex],
      avatar: "",
      role: roles[Math.floor(Math.random() * roles.length)],
      date: formattedDate,
      content: generateRandomContent(),
      likes: Math.floor(Math.random() * 50),
      views: Math.floor(Math.random() * 5000) + 500,
      isPinned: false,
      heroImage: heroImages[randomAuthorIndex]
    });
  }
  
  return randomPosts;
};

function generateRandomContent(): string {
  const contents = [
    `<p>Tôi hoàn toàn đồng ý với quan điểm này. Đây là một chủ đề rất thú vị mà chúng ta nên thảo luận nhiều hơn.</p><p><img src="/images/overwatch_bg_2.jpg" alt="Overwatch Background" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 12px;" /></p>`,
    
    "<p>Tôi có một số kinh nghiệm về vấn đề này và muốn chia sẻ với mọi người:</p><ul><li>Luôn cập nhật thông tin mới nhất</li><li>Tham khảo ý kiến từ những người có kinh nghiệm</li><li>Thực hành thường xuyên để nâng cao kỹ năng</li></ul>",
    
    "<p>Theo kinh nghiệm của tôi, cách tốt nhất để tiếp cận vấn đề này là từng bước một. Đừng vội vàng và hãy kiên nhẫn với quá trình học tập.</p><p>Nếu bạn có bất kỳ câu hỏi cụ thể nào, đừng ngần ngại hỏi tôi!</p>",
    
    `<p>Tôi không hoàn toàn đồng ý với một số ý kiến đã được đề cập. Tôi nghĩ chúng ta nên xem xét vấn đề từ nhiều góc độ khác nhau để có cái nhìn toàn diện hơn.</p><p><img src="/images/heroes/shoot1.png" alt="Hero Image" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 12px;" /></p>`,
    
    `<p>Gần đây tôi đã tìm thấy một số tài liệu rất hữu ích về chủ đề này. Tôi sẽ chia sẻ với các bạn khi có thời gian tổng hợp lại.</p><p><img src="/images/heroes/shoot5.png" alt="Hero Image" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 12px;" /></p>`,
    
    "<p>Tôi có một câu hỏi: Làm thế nào để áp dụng những kiến thức này vào thực tế? Tôi đã thử một số phương pháp nhưng kết quả không như mong đợi.</p>",
    
    `<p>Cảm ơn chủ thớt đã tạo chủ đề thú vị này! Tôi đã học được rất nhiều từ các thảo luận ở đây.</p><p>Hy vọng chúng ta sẽ có thêm nhiều chủ đề chất lượng như thế này!</p><p><img src="/images/heroes/shoot6.png" alt="Hero Image" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 12px;" /></p>`,
    
    "<p>Tôi muốn thêm một góc nhìn khác: Đôi khi chúng ta quá tập trung vào lý thuyết mà quên mất thực hành. Hãy dành thời gian để áp dụng kiến thức vào thực tế!</p>"
  ];
  
  return contents[Math.floor(Math.random() * contents.length)];
}

interface CategoryTitles {
  [key: string]: string;
}

// Hàm để định dạng tiêu đề từ dạng URL slug
const formatTitle = (title: string): string => {
  return title
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function TopicPage() {
  const params = useParams();
  const category = params?.category as string || "";
  const topic = params?.topic as string || "";
  
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyContent, setReplyContent] = useState("");
  
  useEffect(() => {
    // Giả lập thời gian tải dữ liệu
    const timer = setTimeout(() => {
      setPosts(generateFakeData(topic));
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [topic]);
  
  const getCategoryTitle = (cat: string): string => {
    const categories: CategoryTitles = {
      "global": "Thảo Luận Toàn Cầu",
      "servers": "Máy Chủ Khu Vực",
      "story": "Cốt Truyện & Truyền Thuyết",
      "tactics": "Chiến Thuật & Hướng Dẫn",
      "competition": "Đấu Trường & Thi Đấu",
      "nft": "Chợ NFT",
      "crypto": "Tiền Mã Hóa & Token",
      "creative": "Sáng Tạo Cộng Đồng",
      "creators": "Trung Tâm Người Sáng Tạo",
      "bugs": "Báo Lỗi",
      "features": "Đề Xuất Tính Năng"
    };
    
    return categories[cat] || "Diễn đàn";
  };
  
  return (
    <div className="min-h-screen">
      {/* Header Banner */}
      <div className="relative w-full h-64 bg-gradient-to-r from-blue-900 to-indigo-900 overflow-hidden">
        <Image
          src="/images/overwatch_bg_2.jpg"
          alt="Forum Banner"
          fill
          style={{objectFit: "cover", opacity: 0.5}}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#080c17]"></div>
        
        {/* Particle Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/particle_overlay.png"
            alt="Particles"
            fill
            style={{objectFit: "cover", opacity: 0.2}}
          />
        </div>
        
        <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Diễn Đàn Overwatch</h1>
            <p className="text-blue-300">Nơi trao đổi và thảo luận về mọi chủ đề liên quan đến game</p>
          </div>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="bg-[#121626] py-4 border-b border-blue-900/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/forum" className="flex items-center gap-1 hover:text-blue-400 transition-colors">
              <FaArrowLeft className="text-xs" /> Diễn Đàn
            </Link>
            <span>/</span>
            <Link href={`/forum?tab=${category}`} className="hover:text-blue-400 transition-colors">
              {getCategoryTitle(category)}
            </Link>
            <span>/</span>
            <span className="text-white">{formatTitle(topic)}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Tiêu đề chủ đề */}
        <div className="mb-8 relative">
          <div className="absolute -top-12 -right-12 opacity-10 hidden md:block">
            <Image
              src="/images/overwatch_logo.png"
              alt="Overwatch Logo"
              width={300}
              height={300}
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{formatTitle(topic)}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <FaCalendarAlt className="text-blue-400" /> Tạo: 25/11/2025
            </div>
            <div className="flex items-center gap-1">
              <FaUser className="text-blue-400" /> Bởi: NgườiThăngThiên
            </div>
            <div className="flex items-center gap-1">
              <FaEye className="text-blue-400" /> {Math.floor(Math.random() * 10000) + 2000} lượt xem
            </div>
            <div className="flex items-center gap-1">
              <FaReply className="text-blue-400" /> {posts.length} phản hồi
            </div>
          </div>
        </div>
        
        {/* Danh sách bài viết */}
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#121626] border border-blue-900/20 rounded-xl p-6 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-700 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <div 
                key={post.id} 
                id={`post-${post.id}`}
                className={`bg-gradient-to-br ${index === 0 ? 'from-blue-900/10 to-indigo-900/10 border-blue-900/30' : 'from-[#121626] to-[#0d1018] border-blue-900/20'} border rounded-xl p-6 transition-all duration-300 hover:border-blue-900/40 ${post.isPinned ? 'relative overflow-hidden' : ''}`}
              >
                {post.isPinned && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                    Ghim
                  </div>
                )}
                
                <div className="flex gap-4 flex-col sm:flex-row">
                  {/* Thông tin người dùng */}
                  <div className="sm:w-48 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-2">
                    <div className="flex items-center gap-3 sm:gap-2">
                      {post.heroImage ? (
                        <div className="w-12 h-12 relative">
                          <Image 
                            src={post.heroImage}
                            alt={post.author}
                            width={48}
                            height={48}
                            className="rounded-full object-cover border-2 border-blue-500"
                          />
                        </div>
                      ) : (
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${index === 0 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-gray-600 to-gray-800'}`}>
                          {post.author.substring(0, 2)}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-white">{post.author}</div>
                        <div className={`text-xs ${index === 0 ? 'text-blue-400' : 'text-gray-400'}`}>{post.role}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 hidden sm:block">
                      Bài viết: {Math.floor(Math.random() * 5000) + 100}
                    </div>
                    {index === 0 && (
                      <div className="mt-4 hidden sm:block">
                        <Image 
                          src="/images/badge-1.svg"
                          alt="Admin Badge"
                          width={24}
                          height={24}
                          className="opacity-80"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Nội dung bài viết */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <FaCalendarAlt /> {post.date}
                      </div>
                      <div className="text-xs text-gray-400">#{post.id}</div>
                    </div>
                    
                    <div 
                      className="prose prose-invert prose-blue max-w-none"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    
                    {/* Actions bar */}
                    <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-blue-900/20">
                      <button className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
                        <FaThumbsUp /> <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors">
                        <FaThumbsDown />
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
                        <FaReply /> Trả lời
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
                        <FaShare /> Chia sẻ
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-yellow-400 transition-colors">
                        <FaBookmark /> Lưu
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors ml-auto">
                        <FaFlag /> Báo cáo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Form trả lời */}
        <div className="mt-8 bg-gradient-to-br from-[#121626] to-[#0d1018] border border-blue-900/20 rounded-xl p-6 relative overflow-hidden">
          {/* Hình nền trang trí */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
            <Image
              src="/images/heroes/robot bc.png"
              alt="Robot Background"
              width={256}
              height={256}
            />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-4">Trả lời chủ đề</h3>
          
          <div className="mb-4">
            <div className="border border-blue-900/30 rounded-lg overflow-hidden">
              <div className="bg-[#0a0d14] px-4 py-2 flex items-center gap-2 border-b border-blue-900/30">
                <button className="p-2 text-gray-400 hover:text-white transition-colors font-bold">B</button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors italic">I</button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors underline">U</button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <FaAngleDown />
                </button>
              </div>
              <textarea 
                rows={6}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Nhập nội dung trả lời của bạn..."
                className="w-full bg-[#121626] text-white p-4 focus:outline-none"
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-blue-900/20">
              Gửi trả lời
            </button>
          </div>
        </div>
        
        {/* Phân trang */}
        {posts.length > 10 && (
          <div className="mt-8 flex justify-center">
            <div className="flex">
              <button className="bg-[#121626] text-gray-400 hover:text-white border border-blue-900/30 py-2 px-4 rounded-l-lg">Trước</button>
              <button className="bg-blue-600 text-white border border-blue-600 py-2 px-4">1</button>
              <button className="bg-[#121626] text-gray-400 hover:text-white border border-blue-900/30 py-2 px-4">2</button>
              <button className="bg-[#121626] text-gray-400 hover:text-white border border-blue-900/30 py-2 px-4 rounded-r-lg">Sau</button>
            </div>
          </div>
        )}
        
        {/* Banner ở cuối trang */}
        <div className="mt-12 relative w-full h-36 rounded-xl overflow-hidden">
          <Image 
            src="/images/overwatch_bg_2.jpg" 
            alt="Join Us Banner"
            fill
            style={{objectFit: "cover"}}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Tham gia cộng đồng Overwatch</h3>
              <p className="text-blue-300 mb-4">Kết nối với hàng nghìn người chơi khác</p>
              <button className="bg-white text-blue-900 font-medium py-2 px-6 rounded-lg hover:bg-blue-100 transition-colors">
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 