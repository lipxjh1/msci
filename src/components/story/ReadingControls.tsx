"use client";

import React, { useState } from 'react';
import { Book, Type, Sun, Moon, Scroll, Share, Bookmark, BookmarkCheck, List, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface ReadingControlsProps {
  fontSize: number;
  setFontSize: (value: number | ((prevValue: number) => number)) => void;
  theme: 'light' | 'dark' | 'sepia';
  setTheme: (theme: 'light' | 'dark' | 'sepia') => void;
  title: string;
  currentChapter?: number;
  totalChapters?: number;
  onNextChapter?: () => void;
  onPrevChapter?: () => void;
}

const ReadingControls: React.FC<ReadingControlsProps> = ({
  fontSize,
  setFontSize,
  theme,
  setTheme,
  title,
  currentChapter = 1,
  totalChapters = 1,
  onNextChapter,
  onPrevChapter
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // Thực hiện lưu bookmark vào localStorage hoặc state
    if (!bookmarked) {
      // Lưu trữ bookmark
      localStorage.setItem('bookmark_story', JSON.stringify({
        title,
        chapter: currentChapter,
        position: window.scrollY
      }));
    }
  };

  // Base classes for theme buttons
  const baseThemeButtonClass = "p-2.5 rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto";
  const activeThemeButtonClass = "bg-blue-600 text-white shadow-lg";
  const inactiveThemeButtonClass = "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600";

  return (
    <>
      <div className="sticky top-0 z-30 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 mb-6 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/story" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Về trang danh sách truyện">
              <Home size={18} className="text-gray-600 dark:text-gray-300" />
            </Link>
            <button 
              onClick={() => setShowTOC(!showTOC)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Mục lục"
            >
              <List size={18} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <div className="mx-auto px-2">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-center truncate max-w-[150px] xs:max-w-[200px] sm:max-w-xs md:max-w-md">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={handleBookmark}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={bookmarked ? "Xóa đánh dấu" : "Đánh dấu"}
              title={bookmarked ? "Xóa đánh dấu" : "Đánh dấu"}
            >
              {bookmarked ? 
                <BookmarkCheck size={18} className="text-blue-600 dark:text-blue-400" /> : 
                <Bookmark size={18} className="text-gray-600 dark:text-gray-300" />
              }
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Chia sẻ"
              title="Chia sẻ"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: title,
                    url: window.location.href
                  });
                }
              }}
            >
              <Share size={18} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary controls: Chapter, Font, Theme */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:justify-between gap-4 mb-8 pb-3 border-b border-gray-200 dark:border-gray-800 px-1 sm:px-0">
        {/* Left Group: Chapter Nav */}
        <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto">
          <span className="flex items-center mr-3 sm:mr-6">
            <Book size={18} className="mr-2 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
              Hồi {currentChapter}/{totalChapters}
            </span>
          </span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => onPrevChapter?.()}
              disabled={currentChapter <= 1}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Chương trước"
            >
              <ChevronLeft size={20} className="text-gray-700 dark:text-gray-300" />
            </button>
            <button 
              onClick={() => onNextChapter?.()}
              disabled={!totalChapters || currentChapter >= totalChapters}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Chương sau"
            >
              <ChevronRight size={20} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
        
        {/* Right Group: Font Size + Theme - Stacks vertically on small screens */} 
        <div className="flex flex-col xs:flex-row items-center gap-x-4 gap-y-3 w-full xs:w-auto mt-4 sm:mt-0">
          {/* Font size controls */}
          <div className="flex items-center justify-between xs:justify-start w-full xs:w-auto bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button 
              onClick={() => setFontSize(prev => Math.max(12, prev - 1))}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              aria-label="Giảm cỡ chữ"
            >
              <Type size={18} className="mr-1 xs:mr-0" /> <span className="hidden xs:inline">A-</span>
            </button>
            <span className="text-sm font-medium mx-2 text-gray-600 dark:text-gray-400 w-10 text-center">{fontSize}px</span>
            <button 
              onClick={() => setFontSize(prev => Math.min(30, prev + 1))} // Increased max font size
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              aria-label="Tăng cỡ chữ"
            >
              <Type size={18} className="mr-1 xs:mr-0" /> <span className="hidden xs:inline">A+</span>
            </button>
          </div>
          
          {/* Theme switcher */}
          <div className="flex items-center justify-around xs:justify-start gap-2 w-full xs:w-auto">
            <button 
              onClick={() => setTheme('light')}
              className={`${baseThemeButtonClass} ${theme === 'light' ? activeThemeButtonClass : inactiveThemeButtonClass}`}
              aria-label="Chế độ sáng" title="Chế độ sáng"
            >
              <Sun size={18} />
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`${baseThemeButtonClass} ${theme === 'dark' ? activeThemeButtonClass : inactiveThemeButtonClass}`}
              aria-label="Chế độ tối" title="Chế độ tối"
            >
              <Moon size={18} />
            </button>
            <button 
              onClick={() => setTheme('sepia')}
              className={`${baseThemeButtonClass} ${theme === 'sepia' ? activeThemeButtonClass : inactiveThemeButtonClass}`}
              aria-label="Chế độ sepia" title="Chế độ sepia"
            >
              <Scroll size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Table of Contents Dropdown */}
      {showTOC && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Mục lục</h3>
          <ul className="space-y-2">
            <li>
              <button 
                className={`w-full text-left px-3 py-2 rounded-md ${currentChapter === 1 ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700/30'}`}
                onClick={() => {
                  onPrevChapter?.();
                  setShowTOC(false);
                }}
              >
                <span className="font-medium">Mở Đầu: Thời Đại Kết Nối</span>
              </button>
            </li>
            {Array.from({ length: totalChapters }).map((_, index) => (
              <li key={index}>
                <button 
                  className={`w-full text-left px-3 py-2 rounded-md ${currentChapter === index + 1 ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700/30'}`}
                  onClick={() => {
                    // Giả lập chuyển đến chương
                    if (index + 1 < currentChapter) {
                      onPrevChapter?.();
                    } else if (index + 1 > currentChapter) {
                      onNextChapter?.();
                    }
                    setShowTOC(false);
                  }}
                >
                  <span className="text-gray-500 dark:text-gray-400 mr-2">Hồi {index + 1}:</span>
                  <span className="font-medium">Chương {index + 1}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ReadingControls; 