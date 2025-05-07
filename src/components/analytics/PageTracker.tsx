'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/tien_ich/analytics';
import { useAuth } from '@/context/AuthContext';

export default function PageTracker() {
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    // Theo dõi lượt truy cập khi pathname thay đổi
    if (pathname) {
      trackPageView(pathname, user?.id);
    }
  }, [pathname, user]);

  return null; // Component không hiển thị gì
} 