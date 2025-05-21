import { useState, useEffect } from 'react';

type SocialLink = {
  name: string;
  url: string;
};

type SocialLinksData = {
  links: Record<string, string>;
  raw: string;
};

export default function useSocialLinks() {
  const [data, setData] = useState<SocialLinksData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Lấy dữ liệu liên kết mạng xã hội
  const fetchSocialLinks = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/social-links');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("Error fetching social links:", err);
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  // Lưu dữ liệu liên kết mạng xã hội
  const saveSocialLinks = async (rawData: string) => {
    try {
      setSaving(true);
      setSaveError(null);
      setSaveSuccess(false);

      const response = await fetch('/api/social-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: rawData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      // Cập nhật dữ liệu sau khi lưu thành công
      setData({
        raw: rawData,
        links: parseSocialLinksFromRaw(rawData),
      });
      
      setSaveSuccess(true);
    } catch (err) {
      console.error("Error saving social links:", err);
      setSaveError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi lưu dữ liệu');
      setSaveSuccess(false);
    } finally {
      setSaving(false);
    }
  };

  // Chuyển đổi dữ liệu liên kết từ chuỗi sang đối tượng
  const parseSocialLinksFromRaw = (rawData: string): Record<string, string> => {
    const links: Record<string, string> = {};
    const lines = rawData.split('\n');
    
    lines.forEach(line => {
      const [name, url] = line.split('=');
      if (name && url) {
        links[name.trim()] = url.trim();
      }
    });
    
    return links;
  };

  // Chuyển đổi dữ liệu liên kết từ đối tượng sang danh sách
  const getSocialLinksList = (): SocialLink[] => {
    if (!data?.links) return [];
    
    return Object.entries(data.links).map(([name, url]) => ({
      name,
      url
    }));
  };

  // Tự động tải dữ liệu khi component mount
  useEffect(() => {
    fetchSocialLinks();
  }, []);

  return {
    socialLinks: data?.links || {},
    socialLinksRaw: data?.raw || '',
    socialLinksList: getSocialLinksList(),
    loading,
    error,
    saving,
    saveError,
    saveSuccess,
    fetchSocialLinks,
    saveSocialLinks,
  };
} 