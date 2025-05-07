'use client';

import { useCallback, useEffect } from 'react';

interface LinkTrackerProps {
  linkName: string;
  url: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  category?: string; // Category cho analytics
}

export default function LinkTracker({
  linkName,
  url,
  children,
  className = '',
  target = '_blank',
  rel = 'noopener noreferrer',
  category = 'social_media',
}: LinkTrackerProps) {
  // Hàm theo dõi nhấp chuột
  const trackClick = useCallback(async () => {
    const trackingData = { 
      linkName,
      timestamp: new Date().toISOString(),
      category
    };
    
    try {
      // Gửi request API để lưu lượt nhấp
      const response = await fetch('/api/track-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackingData),
      });
      
      if (!response.ok) {
        // Nếu request thất bại, lưu vào localStorage để thử lại sau
        saveClickToLocalStorage(trackingData);
      } else {
        console.log(`Đã ghi nhận lượt nhấp vào: ${linkName}`);
      }
    } catch (error) {
      console.error('Lỗi khi ghi nhận lượt nhấp:', error);
      // Lưu vào localStorage khi offline
      saveClickToLocalStorage(trackingData);
    }
  }, [linkName, category]);

  // Lưu lượt nhấp vào localStorage khi offline
  const saveClickToLocalStorage = (data: any) => {
    try {
      const storedClicks = localStorage.getItem('pendingClicks');
      const clicks = storedClicks ? JSON.parse(storedClicks) : [];
      clicks.push(data);
      localStorage.setItem('pendingClicks', JSON.stringify(clicks));
      console.log('Đã lưu lượt nhấp vào bộ nhớ cục bộ');
    } catch (e) {
      console.error('Lỗi khi lưu vào localStorage:', e);
    }
  };

  // Đồng bộ hóa các lượt nhấp chưa gửi khi online
  useEffect(() => {
    const syncPendingClicks = async () => {
      if (navigator.onLine) {
        try {
          const storedClicks = localStorage.getItem('pendingClicks');
          if (!storedClicks) return;
          
          const clicks = JSON.parse(storedClicks);
          if (clicks.length === 0) return;
          
          // Gửi các lượt nhấp đã lưu
          const results = await Promise.allSettled(
            clicks.map((click: any) => 
              fetch('/api/track-click', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(click),
              })
            )
          );
          
          // Lọc ra các lượt nhấp chưa gửi thành công
          const failedClicks = clicks.filter((_: any, index: number) => 
            results[index].status === 'rejected' || 
            (results[index].status === 'fulfilled' && 
             (results[index] as PromiseFulfilledResult<Response>).value.ok === false)
          );
          
          // Cập nhật localStorage
          localStorage.setItem('pendingClicks', JSON.stringify(failedClicks));
          console.log(`Đã đồng bộ ${clicks.length - failedClicks.length}/${clicks.length} lượt nhấp`);
        } catch (error) {
          console.error('Lỗi khi đồng bộ lượt nhấp:', error);
        }
      }
    };
    
    // Chạy khi component mount và khi kết nối mạng thay đổi
    syncPendingClicks();
    window.addEventListener('online', syncPendingClicks);
    
    return () => {
      window.removeEventListener('online', syncPendingClicks);
    };
  }, []);

  return (
    <a
      href={url}
      className={className}
      target={target}
      rel={rel}
      onClick={(e) => {
        // Ghi nhận lượt nhấp trước khi chuyển hướng
        trackClick();
      }}
      data-tracking="true"
      data-tracking-name={linkName}
      data-tracking-category={category}
    >
      {children}
    </a>
  );
} 