'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { 
  FaTwitter, 
  FaFacebookF, 
  FaYoutube, 
  FaInstagram, 
  FaDiscord, 
  FaTelegramPlane,
  FaLinkedinIn,
  FaMedium,
  FaTiktok,
  FaRedditAlien
} from 'react-icons/fa';

// Định nghĩa kiểu dữ liệu
type SocialLink = {
  name: string;
  icon: JSX.Element | null;
  href: string;
};

type SocialLinksContextType = {
  socialLinks: SocialLink[];
  loading: boolean;
  error: string | null;
  refreshSocialLinks: () => Promise<void>;
};

// Map tên mạng xã hội với icon tương ứng
const socialIconMap: Record<string, JSX.Element> = {
  'Facebook': <FaFacebookF />,
  'Twitter': <FaTwitter />,
  'Instagram': <FaInstagram />,
  'LinkedIn': <FaLinkedinIn />,
  'YouTube': <FaYoutube />,
  'Discord': <FaDiscord />,
  'Telegram': <FaTelegramPlane />,
  'Medium': <FaMedium />,
  'TikTok': <FaTiktok />,
  'Reddit': <FaRedditAlien />
};

// Tạo context
const SocialLinksContext = createContext<SocialLinksContextType | undefined>(undefined);

// Provider component
export function SocialLinksProvider({ children }: { children: ReactNode }) {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hàm tải liên kết mạng xã hội
  const fetchSocialLinks = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/social-links');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Chuyển đổi dữ liệu thành danh sách liên kết với icon
      const links: SocialLink[] = Object.entries(data.links).map(([name, url]) => ({
        name,
        icon: socialIconMap[name] || null,
        href: url as string
      }));
      
      setSocialLinks(links);
    } catch (err) {
      console.error("Error fetching social links:", err);
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải dữ liệu');
      
      // Sử dụng giá trị mặc định nếu có lỗi
      setSocialLinks([
        { name: "Facebook", icon: <FaFacebookF />, href: "https://facebook.com" },
        { name: "Twitter", icon: <FaTwitter />, href: "https://twitter.com" },
        { name: "Instagram", icon: <FaInstagram />, href: "https://instagram.com" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Tải liên kết khi component được mount
  useEffect(() => {
    fetchSocialLinks();
  }, []);

  return (
    <SocialLinksContext.Provider
      value={{
        socialLinks,
        loading,
        error,
        refreshSocialLinks: fetchSocialLinks,
      }}
    >
      {children}
    </SocialLinksContext.Provider>
  );
}

// Hook để sử dụng context
export function useSocialLinks() {
  const context = useContext(SocialLinksContext);
  
  if (context === undefined) {
    throw new Error('useSocialLinks must be used within a SocialLinksProvider');
  }
  
  return context;
}

// Hook để lấy màu cho icon mạng xã hội
export function getSocialIconColor(name: string): string {
  const colorMap: Record<string, string> = {
    'Facebook': 'text-blue-600',
    'Twitter': 'text-blue-400',
    'Instagram': 'text-pink-500',
    'LinkedIn': 'text-blue-700',
    'YouTube': 'text-red-600',
    'Discord': 'text-indigo-500',
    'Telegram': 'text-blue-500',
    'Medium': 'text-gray-800',
    'TikTok': 'text-black',
    'Reddit': 'text-orange-600'
  };
  
  return colorMap[name] || 'text-gray-600';
} 