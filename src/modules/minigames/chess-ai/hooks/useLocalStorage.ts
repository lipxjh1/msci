import { useState, useEffect } from 'react';

/**
 * Hook để lưu trữ và đọc dữ liệu từ localStorage
 * @param key Khóa để lưu trong localStorage
 * @param initialValue Giá trị ban đầu nếu không có dữ liệu
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Hàm để lấy giá trị từ localStorage hoặc giá trị mặc định
  const readValue = (): T => {
    // Kiểm tra nếu đang chạy trên trình duyệt
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Lỗi khi đọc localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // State để lưu giá trị
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Hàm để cập nhật cả state và localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Cho phép giá trị là một function như setState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Lưu vào state
      setStoredValue(valueToStore);
      
      // Lưu vào localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Lỗi khi lưu vào localStorage key "${key}":`, error);
    }
  };

  // Lắng nghe sự thay đổi của storage nếu cửa sổ khác thay đổi nó
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue));
      }
    };
    
    // Lắng nghe sự kiện storage change
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      
      // Cleanup
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [key]);

  return [storedValue, setValue] as const;
} 