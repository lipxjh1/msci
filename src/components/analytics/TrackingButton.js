'use client';

import { useAnalytics } from '@/hooks/useAnalytics';

/**
 * Button có tích hợp tracking analytics
 * 
 * @param {Object} props - Component props
 * @param {string} props.buttonType - Loại nút để tracking (ví dụ: play_now, sign_up)
 * @param {Object} props.metadata - Thông tin bổ sung cho tracking
 * @param {string} props.className - CSS classes cho button
 * @param {React.ReactNode} props.children - Nội dung bên trong button
 * @param {Function} props.onClick - Hàm callback khi click
 * @param {string} props.href - Đường dẫn (nếu là nút link)
 * @param {any} props.rest - Các props khác
 */
export default function TrackingButton({
  buttonType = 'default',
  metadata = {},
  className = '',
  children,
  onClick,
  href,
  ...rest
}) {
  const { trackButtonClick } = useAnalytics();

  const handleClick = (e) => {
    // Track sự kiện click
    trackButtonClick(buttonType, metadata);

    // Gọi callback onClick nếu được cung cấp
    if (onClick) {
      onClick(e);
    }
  };

  // Nếu có href, render dưới dạng link
  if (href) {
    return (
      <a
        href={href}
        className={`inline-block px-6 py-2 rounded ${className}`}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  // Mặc định render dưới dạng button
  return (
    <button
      className={`px-6 py-2 rounded ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
}

/**
 * Button "Play Now" đặc biệt với tracking tích hợp
 */
export function PlayNowButton({ metadata = {}, className = '', children, ...rest }) {
  const { trackPlayNowClick } = useAnalytics();

  const handleClick = (e) => {
    // Track sự kiện click Play Now
    trackPlayNowClick(metadata);

    // Gọi callback onClick nếu được cung cấp
    if (rest.onClick) {
      rest.onClick(e);
    }
  };

  return (
    <button
      className={`bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {children || 'Chơi Ngay'}
    </button>
  );
}

/**
 * Component theo dõi click mạng xã hội
 */
export function SocialButton({ network, action = 'click', className = '', children, ...rest }) {
  const { trackSocialClick } = useAnalytics();

  const handleClick = (e) => {
    // Track sự kiện click mạng xã hội
    trackSocialClick(network, action);

    // Gọi callback onClick nếu được cung cấp
    if (rest.onClick) {
      rest.onClick(e);
    }
  };

  return (
    <button
      className={`inline-flex items-center justify-center p-2 rounded-full ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
} 