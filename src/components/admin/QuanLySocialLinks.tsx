import { useState, useEffect, useRef } from 'react';
import useSocialLinks from '@/hooks/useSocialLinks';
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

// Ánh xạ tên liên kết mạng xã hội với icon tương ứng
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

// Hàm kiểm tra URL có hợp lệ không
function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export default function QuanLySocialLinks() {
  const {
    socialLinksRaw,
    loading,
    error,
    saving,
    saveError,
    saveSuccess,
    fetchSocialLinks,
    saveSocialLinks,
  } = useSocialLinks();

  const [textContent, setTextContent] = useState('');
  const [previewLinks, setPreviewLinks] = useState<{ name: string; url: string }[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cập nhật nội dung khi dữ liệu được tải
  useEffect(() => {
    if (socialLinksRaw) {
      setTextContent(socialLinksRaw);
    }
  }, [socialLinksRaw]);

  // Cập nhật xem trước khi nội dung thay đổi
  useEffect(() => {
    updatePreview(textContent);
  }, [textContent]);

  // Hàm xử lý khi nội dung thay đổi
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.target.value);
  };

  // Hàm cập nhật xem trước các liên kết
  const updatePreview = (content: string) => {
    const links: { name: string; url: string }[] = [];
    const errors: string[] = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const [name, url] = line.split('=');
      if (name && url) {
        const trimmedName = name.trim();
        const trimmedUrl = url.trim();
        
        links.push({ name: trimmedName, url: trimmedUrl });
        
        if (!isValidUrl(trimmedUrl)) {
          errors.push(`Dòng ${index + 1}: URL "${trimmedUrl}" không hợp lệ`);
        }
      } else if (line.trim() !== '') {
        errors.push(`Dòng ${index + 1}: Định dạng không đúng. Phải là "Tên=URL"`);
      }
    });

    setPreviewLinks(links);
    setValidationErrors(errors);
  };

  // Hàm xử lý khi lưu dữ liệu
  const handleSave = async () => {
    // Xoá thông báo thành công sau khoảng thời gian
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    await saveSocialLinks(textContent);

    // Tự động ẩn thông báo thành công sau 3 giây
    saveTimeoutRef.current = setTimeout(() => {
      saveTimeoutRef.current = null;
    }, 3000);
  };

  // Làm mới dữ liệu
  const handleRefresh = () => {
    fetchSocialLinks();
  };

  // Hiển thị icon dựa vào tên mạng xã hội
  const getSocialIcon = (name: string) => {
    return socialIconMap[name] || null;
  };

  // Hiển thị màu cho icon mạng xã hội
  const getSocialColor = (name: string) => {
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
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Quản lý liên kết mạng xã hội</h2>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
        >
          Làm mới
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">Lỗi: {error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Text editor */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Chỉnh sửa liên kết</h3>
          <p className="text-sm text-gray-600">
            Mỗi liên kết nên được nhập trên một dòng, theo định dạng: Tên=URL<br />
            Ví dụ: <code>Facebook=https://facebook.com/mypage</code>
          </p>

          <textarea
            value={textContent}
            onChange={handleTextChange}
            className="w-full h-80 border rounded p-3 font-mono text-sm"
            placeholder="Facebook=https://facebook.com/mypage
Twitter=https://twitter.com/myhandle"
            disabled={loading}
          />

          {validationErrors.length > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3">
              <h4 className="text-yellow-800 font-medium">Lỗi định dạng:</h4>
              <ul className="list-disc pl-5 text-yellow-700 text-sm">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              onClick={handleSave}
              disabled={loading || saving || validationErrors.length > 0}
              className={`px-4 py-2 rounded text-white font-medium ${
                validationErrors.length > 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>

            {saveError && (
              <p className="text-red-600 text-sm">{saveError}</p>
            )}

            {saveSuccess && (
              <p className="text-green-600 text-sm">Đã lưu thành công!</p>
            )}
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Xem trước</h3>
          
          <div className="bg-white p-5 border rounded-lg">
            <h4 className="font-medium mb-3">Icon mạng xã hội:</h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {previewLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 ${getSocialColor(link.name)}`}
                  title={link.name}
                >
                  {getSocialIcon(link.name) || link.name.charAt(0)}
                </a>
              ))}
            </div>

            <h4 className="font-medium mb-3">Danh sách liên kết:</h4>
            <div className="divide-y">
              {previewLinks.map((link, index) => (
                <div key={index} className="flex items-center py-2">
                  <div className={`mr-3 ${getSocialColor(link.name)}`}>
                    {getSocialIcon(link.name) || link.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{link.name}</div>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {link.url}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 text-sm text-blue-700 rounded-md">
            <h4 className="font-medium">Lưu ý:</h4>
            <ul className="list-disc pl-5 mt-2">
              <li>Các liên kết sẽ hiển thị ở footer và các trang có liên quan</li>
              <li>Đảm bảo URL được nhập đầy đủ (bắt đầu bằng http:// hoặc https://)</li>
              <li>Thứ tự hiển thị sẽ theo đúng thứ tự trong danh sách</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 