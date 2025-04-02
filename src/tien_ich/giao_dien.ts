/**
 * Hiển thị hộp thoại xác nhận với người dùng
 * @param message Thông báo cần hiển thị
 * @returns Promise<boolean> True nếu người dùng xác nhận, False nếu hủy
 */
export async function confirmDialog(message: string): Promise<boolean> {
  return window.confirm(message);
}

/**
 * Hiển thị thông báo lỗi
 * @param message Thông báo lỗi
 */
export function showError(message: string): void {
  alert(`Lỗi: ${message}`);
}

/**
 * Hiển thị thông báo thành công
 * @param message Thông báo thành công
 */
export function showSuccess(message: string): void {
  alert(`Thành công: ${message}`);
} 