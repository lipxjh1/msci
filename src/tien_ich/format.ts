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