/* File định nghĩa chủ đề */

// Định nghĩa các màu được sử dụng trong ứng dụng
export const mauSac = {
  // Màu chủ đạo (Overwatch)
  overwatchBlue: '#26A9E0',
  overwatchDarkBlue: '#1E88E5',
  overwatchWhite: '#F5F5F5',
  overwatchBlack: '#1A2526',
  overwatchGray: '#B0BEC5',
  
  // Màu bổ sung
  overwatchOrange: '#F99B2A',
  overwatchYellow: '#FFCA28',
  
  // Màu độ hiếm
  doHiemC: '#4CAF50', // Common (xanh lá)
  doHiemB: '#2196F3', // Rare (xanh dương)
  doHiemA: '#9C27B0', // Epic (tím)
  doHiemS: '#F44336', // Legendary (đỏ)
  
  // Màu vai trò
  vaiTroTank: '#F5B041', // Vàng cam
  vaiTroDamage: '#E74C3C', // Đỏ
  vaiTroSupport: '#58D68D', // Xanh lá
};

// Định nghĩa các breakpoint cho responsive
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Định nghĩa font và font sizes
export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    heading: 'Futura, "Trebuchet MS", Arial, sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
};

// Định nghĩa các hiệu ứng animation
export const animations = {
  transition: {
    fast: 'all 0.2s ease',
    medium: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  },
  hover: {
    scale: 'transform: scale(1.05)',
    brighten: 'filter: brightness(1.1)',
    glow: `box-shadow: 0 0 8px ${mauSac.overwatchYellow}`,
  },
}; 