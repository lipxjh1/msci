/**
 * Chuyển đổi thời gian thành dạng tương đối (vd: "2 giờ trước", "3 ngày trước")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Nếu thời gian chưa đến 1 phút
  if (diffInSeconds < 60) {
    return 'Vừa mới đăng';
  }
  
  // Nếu thời gian chưa đến 1 giờ
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  }
  
  // Nếu thời gian chưa đến 1 ngày
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  }
  
  // Nếu thời gian chưa đến 1 tuần
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ngày trước`;
  }
  
  // Nếu thời gian chưa đến 1 tháng
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} tuần trước`;
  }
  
  // Nếu thời gian chưa đến 1 năm
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} tháng trước`;
  }
  
  // Nếu thời gian trên 1 năm
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} năm trước`;
} 