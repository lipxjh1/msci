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

  return (
    <>
      <div className="sticky top-0 z-30 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 -mx-6 px-6 py-3 mb-6 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/story" className="mr-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Home size={18} className="text-gray-600 dark:text-gray-300" />
            </Link>
            <button 
              onClick={() => setShowTOC(!showTOC)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <List size={18} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <div className="mx-auto">
            <h2 className="text-lg md:text-xl font-semibold text-center truncate max-w-[200px] md:max-w-md">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-1">
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

      {/* Secondary controls */}
      <div className="flex flex-wrap items-center justify-between mb-8 pb-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center mb-3 md:mb-0">
          <span className="flex items-center mr-6">
            <Book size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Hồi {currentChapter}/{totalChapters}
            </span>
          </span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => onPrevChapter?.()}
              disabled={currentChapter <= 1}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} className="text-gray-700 dark:text-gray-300" />
            </button>
            <button 
              onClick={() => onNextChapter?.()}
              disabled={currentChapter >= totalChapters}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center">
          {/* Font size controls */}
          <div className="flex items-center mr-4">
            <Type size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
            <button 
              onClick={() => setFontSize(prev => Math.max(12, prev - 1))}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              aria-label="Giảm cỡ chữ"
            >
              <span className="text-sm font-medium">A-</span>
            </button>
            <span className="text-xs font-medium mx-2 text-gray-600 dark:text-gray-400 w-8 text-center">{fontSize}px</span>
            <button 
              onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              aria-label="Tăng cỡ chữ"
            >
              <span className="text-sm font-medium">A+</span>
            </button>
          </div>
          
          {/* Theme switcher */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setTheme('light')}
              className={`p-2 rounded transition-colors ${
                theme === 'light'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
              aria-label="Chế độ sáng"
              title="Chế độ sáng"
            >
              <Sun size={16} />
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`p-2 rounded transition-colors ${
                theme === 'dark'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
              aria-label="Chế độ tối"
              title="Chế độ tối"
            >
              <Moon size={16} />
            </button>
            <button 
              onClick={() => setTheme('sepia')}
              className={`p-2 rounded transition-colors ${
                theme === 'sepia'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
              aria-label="Chế độ sepia"
              title="Chế độ sepia"
            >
              <Scroll size={16} />
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