/**
 * Hàm định dạng ngày tháng thành chuỗi đẹp hơn
 * @param dateString Chuỗi ngày tháng dạng ISO
 * @returns Chuỗi ngày tháng đã định dạng
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    console.error('Lỗi khi định dạng ngày tháng:', error);
    return dateString;
  }
}

/**
 * Hàm rút gọn văn bản
 * @param text Văn bản cần rút gọn
 * @param maxLength Độ dài tối đa
 * @returns Văn bản đã rút gọn
 */
export function truncateText(text: string | null, maxLength: number = 100): string {
  if (!text) return '';
  
  return text.length > maxLength
    ? text.substring(0, maxLength) + '...'
    : text;
}

/**
 * Hàm định dạng số
 * @param num Số cần định dạng
 * @returns Chuỗi đã định dạng
 */
export function formatNumber(num: number | null): string {
  if (num === null || isNaN(Number(num))) return '';
  
  return new Intl.NumberFormat('vi-VN').format(num);
}

/**
 * Định dạng số thành định dạng tiền tệ
 * @param value Giá trị cần định dạng
 * @param currency Đơn vị tiền tệ (mặc định USD)
 * @returns Chuỗi đã định dạng
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  // Sử dụng Intl.NumberFormat để định dạng tiền tệ
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 4,
    maximumFractionDigits: 6
  }).format(value);
}

/**
 * Chuyển đổi timestamp thành chuỗi ngày theo định dạng tùy chỉnh
 * @param timestamp Timestamp cần định dạng
 * @param format Định dạng ngày tháng (mặc định: DD/MM/YYYY)
 * @returns Chuỗi ngày đã định dạng
 */
export function formatDateCustom(timestamp: string, format: string = 'DD/MM/YYYY'): string {
  const date = new Date(timestamp);
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year.toString())
    .replace('YY', year.toString().slice(-2))
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * Chuyển đổi số byte thành chuỗi đơn vị đọc được (KB, MB, GB)
 * @param bytes Kích thước tính bằng byte
 * @param decimals Số chữ số thập phân (mặc định: 2)
 * @returns Chuỗi đã định dạng
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
} 