"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, MessageSquare, Share2, ThumbsUp, ChevronUp, Trophy, Bell } from "lucide-react";

// Components
import ReadingControls from "@/components/story/ReadingControls";
import StoryContent from "@/components/story/StoryContent";
import StoryList from "@/components/story/StoryList";
import StoryNotSelected from "@/components/story/StoryNotSelected";

// Types
interface Chapter {
  id: string;
  title: string;
  file: string;
  number: number;
}

interface Story {
  id: string;
  title: string;
  author: string;
  category: string;
  cover: string;
  description: string;
  createdAt: string;
  likes: number;
  views: number;
  chapters: Chapter[];
}

const StoryPage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState<string | null>(null);
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [storyContent, setStoryContent] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(18);
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>('light');
  const [loading, setLoading] = useState<boolean>(true);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [showPointsNotification, setShowPointsNotification] = useState(false);
  const [userPoints, setUserPoints] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply theme to body element
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
    
    // Handle scroll to show/hide scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('reader_theme');
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark' | 'sepia');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Default to dark if user prefers dark scheme
      setTheme('dark');
    }
    
    // Check for saved font size
    const savedFontSize = localStorage.getItem('reader_font_size');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
    }
    
    // Retrieve available stories
    const fetchStories = async () => {
      try {
        setLoading(true);
        
        // In a real application, this data would come from an API
        const sampleStories = [
          {
            id: "overwatch_story",
            title: "Thời Đại Kết Nối",
            author: "Tác giả 1",
            category: "Truyện",
            cover: "/images/overwatch_bg_2.jpg",
            description: "Câu chuyện về thế giới tương lai với công nghệ Neuralink kết nối con người",
            createdAt: "2024-04-01",
            likes: 120,
            views: 500,
            chapters: [
              {
                id: "1chuongmodau",
                title: "Mở Đầu: Thời Đại Kết Nối",
                file: "1chuongmodau.txt",
                number: 1
              },
              {
                id: "2chuong1",
                title: "Hồi 1: Sự Thức Tỉnh",
                file: "2chuong1.txt",
                number: 2
              },
              {
                id: "3chuong2",
                title: "Hồi 2: Cuộc Gặp Gỡ",
                file: "3chuong2.txt",
                number: 3
              }
            ]
          }
        ];
        
        setStories(sampleStories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setLoading(false);
      }
    };

    fetchStories();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update theme with effect
  useEffect(() => {
    localStorage.setItem('reader_theme', theme);
  }, [theme]);

  // Update fontSize with effect
  useEffect(() => {
    localStorage.setItem('reader_font_size', fontSize.toString());
  }, [fontSize]);

  // Function to fetch story content
  const fetchStoryContent = useCallback(async (storyId: string, chapter: number = 1) => {
    try {
      setLoading(true);
      
      // Get story and chapter info
      const story = stories.find(s => s.id === storyId);
      if (!story || story.chapters.length === 0) {
        throw new Error("Story or chapters not found");
      }
      
      // Find the chapter data
      const chapterData = story.chapters.find(c => c.number === chapter);
      if (!chapterData) {
        throw new Error(`Chapter ${chapter} not found`);
      }
      
      // Call to API endpoint
      const response = await fetch(`/api/story/${chapterData.id}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching story: ${response.statusText}`);
      }
      
      const data = await response.json();
      setStoryContent(data.content);
      setCurrentStory(storyId);
      setCurrentChapter(chapter);
      setLoading(false);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error fetching story content:", error);
      
      // Fallback to static content for demo
      try {
        const story = stories.find(s => s.id === storyId);
        if (!story) throw new Error("Story not found");
        
        const chapterData = story.chapters.find(c => c.number === chapter);
        if (!chapterData) throw new Error("Chapter not found");
        
        const response = await fetch(`/tailieu/truyen/${chapterData.file}`);
        if (!response.ok) {
          throw new Error("Chapter file not found");
        }
        
        const text = await response.text();
        setStoryContent(text);
        setCurrentStory(storyId);
        setCurrentChapter(chapter);
      } catch (fallbackError) {
        console.error("Fallback error:", fallbackError);
        setStoryContent("Không thể tải nội dung truyện. Vui lòng thử lại sau.");
      }
      
      setLoading(false);
    }
  }, [stories]);

  // Handle story selection
  const handleSelectStory = (storyId: string) => {
    setCurrentStory(storyId);
    setCurrentChapter(1); // Reset to first chapter when selecting a new story
    fetchStoryContent(storyId, 1);
  };

  // Handle chapter selection
  const handleSelectChapter = (storyId: string, chapter: number) => {
    fetchStoryContent(storyId, chapter);
  };

  // Handle next/previous chapter navigation
  const handleNextChapter = useCallback(() => {
    if (currentStory) {
      const story = stories.find(s => s.id === currentStory);
      if (story && currentChapter < story.chapters.length) {
        fetchStoryContent(currentStory, currentChapter + 1);
      }
    }
  }, [currentStory, currentChapter, fetchStoryContent, stories]);

  const handlePrevChapter = useCallback(() => {
    if (currentStory && currentChapter > 1) {
      fetchStoryContent(currentStory, currentChapter - 1);
    }
  }, [currentStory, currentChapter, fetchStoryContent]);

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Theme styles with improved contrast
  const themeStyles = {
    light: {
      background: '#ffffff',
      text: '#333333',
      secondary: '#4a5568'
    },
    dark: {
      background: '#111827', // Darker background for better contrast
      text: '#f3f4f6',      // Lighter text for better contrast
      secondary: '#9ca3af'   // Mid-tone gray for secondary text
    },
    sepia: {
      background: '#f8f0e3',
      text: '#422006',      // Darker sepia text for better contrast
      secondary: '#6b5e50'
    }
  };

  // Get current story object
  const currentStoryObj = currentStory ? stories.find(s => s.id === currentStory) : null;
  // Get current chapter title
  const currentChapterTitle = currentStoryObj?.chapters.find(c => c.number === currentChapter)?.title || '';
  // Get total chapters
  const totalChapters = currentStoryObj?.chapters.length || 0;

  // Effect to load user points
  useEffect(() => {
    // Lấy điểm từ localStorage
    const points = localStorage.getItem('user_points');
    if (points) {
      setUserPoints(parseInt(points));
    }
    
    // Hiển thị thông báo về tính năng kiếm điểm nếu người dùng chưa xem
    const hasSeenNotification = localStorage.getItem('points_notification_seen');
    if (!hasSeenNotification) {
      setTimeout(() => {
        setShowPointsNotification(true);
      }, 3000);
    }
  }, []);
  
  // Xử lý đóng thông báo
  const handleCloseNotification = () => {
    setShowPointsNotification(false);
    localStorage.setItem('points_notification_seen', 'true');
  };

  return (
    <div className="min-h-screen" style={{ 
      backgroundColor: themeStyles[theme].background, 
      color: themeStyles[theme].text,
      transition: 'background-color 0.3s, color 0.3s' 
    }}>
      {/* Hero section with background image */}
      <div className="relative h-60 md:h-72 bg-gradient-to-r from-blue-900 to-purple-900 mb-8">
        <Image 
          src="/images/overwatch_bg_2.jpg" 
          alt="Story background" 
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-4 drop-shadow-lg">
            Thư Viện Truyện
          </h1>
          <p className="text-lg text-white text-center max-w-2xl drop-shadow">
            Khám phá những câu chuyện hấp dẫn trong thế giới Overwatch
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Story list */}
          <div className="lg:w-1/4">
            <StoryList 
              stories={stories.map(story => ({
                id: story.id,
                title: story.title,
                coverImage: story.cover,
                description: story.description,
                chapters: story.chapters
              }))}
              currentStory={currentStory}
              currentChapter={currentChapter}
              onSelectStory={handleSelectStory}
              onSelectChapter={handleSelectChapter}
              loading={loading}
            />
            
            {/* Additional information */}
            <div className="sticky top-24 mt-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Về Thư Viện Truyện</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Thư viện truyện Overwatch là nơi lưu trữ và chia sẻ những câu chuyện đa dạng về thế giới và nhân vật trong trò chơi.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm">
                  Chia sẻ
                </button>
                <button className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">
                  Báo lỗi
                </button>
              </div>
            </div>
          </div>

          {/* Main content - Story reader */}
          <div className="lg:w-3/4">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
              {!currentStory ? (
                <StoryNotSelected />
              ) : (
                <>
                  {/* Reading controls */}
                  <ReadingControls 
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    theme={theme}
                    setTheme={setTheme}
                    title={currentStoryObj?.title || 'Đang đọc'}
                    currentChapter={currentChapter}
                    totalChapters={totalChapters}
                    onNextChapter={handleNextChapter}
                    onPrevChapter={handlePrevChapter}
                  />
                  
                  {/* Chapter title */}
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentChapterTitle}
                    </h2>
                  </div>
                  
                  {/* Story content */}
                  <StoryContent 
                    content={storyContent}
                    fontSize={fontSize}
                    loading={loading}
                  />
                  
                  {/* Navigation buttons */}
                  <div className="mt-10 flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      onClick={handlePrevChapter}
                      className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 story-nav-button"
                      disabled={currentChapter <= 1}
                    >
                      <ArrowLeft className="h-5 w-5" />
                      Chương Trước
                    </button>
                    
                    <button 
                      onClick={handleNextChapter}
                      className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 story-nav-button"
                      disabled={currentChapter >= totalChapters}
                    >
                      Chương Sau
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </>
              )}
            </div>
            
            {/* Comments section */}
            {currentStory && (
              <div className="mt-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
                  <MessageSquare className="mr-2 text-blue-500" size={20} />
                  Bình luận
                </h3>
                
                {/* Comment form */}
                <div className="mb-6">
                  <textarea 
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows={3}
                    placeholder="Viết bình luận của bạn..."
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors story-nav-button">
                      Đăng bình luận
                    </button>
                  </div>
                </div>
                
                {/* Sample comments */}
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        TH
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Trần Hưng</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 giờ trước</p>
                      </div>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200">
                      Cốt truyện rất hay và hấp dẫn! Mong chờ những chương tiếp theo.
                    </p>
                    <div className="flex items-center mt-2 gap-4">
                      <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
                        <ThumbsUp size={14} className="mr-1" />
                        <span className="text-sm">12</span>
                      </button>
                      <button className="text-gray-500 hover:text-blue-500 transition-colors text-sm">
                        Phản hồi
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-medium">
                        MT
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Minh Tú</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">1 ngày trước</p>
                      </div>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200">
                      Tôi thích cách tác giả xây dựng thế giới Neuralink, rất sáng tạo và có chiều sâu!
                    </p>
                    <div className="flex items-center mt-2 gap-4">
                      <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
                        <ThumbsUp size={14} className="mr-1" />
                        <span className="text-sm">8</span>
                      </button>
                      <button className="text-gray-500 hover:text-blue-500 transition-colors text-sm">
                        Phản hồi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50 animate-fade-in"
          aria-label="Cuộn lên đầu trang"
        >
          <ChevronUp size={24} />
        </button>
      )}
      
      {/* Points notification */}
      {showPointsNotification && (
        <div className="fixed bottom-6 left-6 max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border-l-4 border-yellow-500 z-50 animate-slide-up">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Trophy size={20} className="text-yellow-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Tính năng mới: Kiếm điểm!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Trả lời câu hỏi trong quá trình đọc truyện để nhận điểm thưởng và mở khóa các truyện đặc biệt.
                </p>
              </div>
            </div>
            <button 
              onClick={handleCloseNotification}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryPage; 