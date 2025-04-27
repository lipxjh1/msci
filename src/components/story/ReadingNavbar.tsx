"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Home, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  Bookmark, 
  Settings, 
  Sun, 
  Moon, 
  Coffee,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface ReadingNavbarProps {
  currentChapter: number;
  totalChapters: number;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  onFontSizeChange: (size: number) => void;
  onThemeChange: (theme: "light" | "dark" | "sepia") => void;
  fontSize: number;
  theme: "light" | "dark" | "sepia";
  storyTitle: string;
}

export function ReadingNavbar({
  currentChapter,
  totalChapters,
  onPrevChapter,
  onNextChapter,
  onFontSizeChange,
  onThemeChange,
  fontSize,
  theme,
  storyTitle
}: ReadingNavbarProps) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Xử lý ẩn hiện thanh navbar khi cuộn trang
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setShowNavbar(true);
        return;
      }
      
      if (currentScrollY > lastScrollY) {
        // Cuộn xuống
        setScrollingUp(false);
        if (showNavbar && !showSettings) {
          setShowNavbar(false);
        }
      } else {
        // Cuộn lên
        setScrollingUp(true);
        if (!showNavbar) {
          setShowNavbar(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY, showNavbar, showSettings]);

  // Xử lý đóng settings khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current && 
        !settingsRef.current.contains(event.target as Node) && 
        navbarRef.current && 
        !navbarRef.current.contains(event.target as Node)
      ) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Chia sẻ truyện
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${storyTitle} - Chương ${currentChapter}`,
          text: `Đang đọc ${storyTitle} - Chương ${currentChapter}`,
          url: window.location.href,
        });
      } else {
        // Fallback cho các trình duyệt không hỗ trợ Web Share API
        navigator.clipboard.writeText(window.location.href);
        // Thông báo đã copy
        alert("Đã sao chép đường dẫn vào clipboard!");
      }
    } catch (error) {
      console.error("Lỗi khi chia sẻ:", error);
    }
  };

  return (
    <>
      <div 
        ref={navbarRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md transition-transform duration-300 border-b",
          showNavbar ? "translate-y-0 animate-slide-down" : "-translate-y-full"
        )}
      >
        <div className="container flex items-center justify-between h-14 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Button variant="ghost" size="icon" aria-label="Trang chủ">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <div className="hidden md:block text-sm font-medium truncate max-w-[200px]">
              {storyTitle}
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onPrevChapter}
              disabled={currentChapter <= 1}
              aria-label="Chương trước"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="text-xs md:text-sm font-medium px-2">
              Chương {currentChapter}/{totalChapters}
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onNextChapter}
              disabled={currentChapter >= totalChapters}
              aria-label="Chương tiếp"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleShare}
              aria-label="Chia sẻ"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                // Logic đánh dấu truyện
                console.log("Đánh dấu truyện");
              }}
              aria-label="Đánh dấu"
            >
              <Bookmark className="h-5 w-5" />
            </Button>
            
            <Button 
              variant={showSettings ? "secondary" : "ghost"} 
              size="icon" 
              onClick={() => setShowSettings(!showSettings)}
              aria-label="Cài đặt"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Panel cài đặt */}
      {showSettings && (
        <div 
          ref={settingsRef}
          className="fixed top-14 right-0 z-50 w-64 md:w-72 p-4 bg-background border rounded-bl-lg shadow-lg animate-slide-down"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Cài đặt đọc truyện</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => setShowSettings(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">Cỡ chữ</span>
                <span className="text-xs font-medium">{fontSize}px</span>
              </div>
              <Slider 
                value={[fontSize]} 
                min={14} 
                max={24} 
                step={1} 
                onValueChange={(value) => onFontSizeChange(value[0])}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <span className="text-xs">Giao diện</span>
              <div className="flex items-center justify-between gap-2">
                <Button 
                  variant={theme === "light" ? "secondary" : "outline"} 
                  size="sm"
                  className="flex-1 py-1.5 h-auto"
                  onClick={() => onThemeChange("light")}
                >
                  <Sun className="h-4 w-4 mr-2" />
                  <span className="text-xs">Sáng</span>
                </Button>
                <Button 
                  variant={theme === "dark" ? "secondary" : "outline"} 
                  size="sm"
                  className="flex-1 py-1.5 h-auto"
                  onClick={() => onThemeChange("dark")}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  <span className="text-xs">Tối</span>
                </Button>
                <Button 
                  variant={theme === "sepia" ? "secondary" : "outline"} 
                  size="sm"
                  className="flex-1 py-1.5 h-auto"
                  onClick={() => onThemeChange("sepia")}
                >
                  <Coffee className="h-4 w-4 mr-2" />
                  <span className="text-xs">Sepia</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Thanh hiển thị khi cuộn lên trên mobile */}
      <div 
        className={cn(
          "fixed bottom-0 left-0 right-0 md:hidden bg-background/80 backdrop-blur-md border-t z-40 transition-transform duration-300",
          scrollingUp ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onPrevChapter}
            disabled={currentChapter <= 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="text-xs">Trước</span>
          </Button>
          
          <div className="text-xs font-medium">
            {currentChapter}/{totalChapters}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onNextChapter}
            disabled={currentChapter >= totalChapters}
          >
            <span className="text-xs">Tiếp</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </>
  );
} 