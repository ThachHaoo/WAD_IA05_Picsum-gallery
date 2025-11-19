import { useState, useEffect } from 'react';

/**
 * Custom Hook: useImageLoaded
 * ---------------------------
 * Hook này giúp kiểm tra xem một hình ảnh đã thực sự được trình duyệt tải xong hay chưa.
 * Thường dùng để hiển thị Skeleton hoặc Spinner trong lúc chờ ảnh load.
 *
 * @param {string} src - Đường dẫn (URL) của ảnh cần theo dõi.
 * @returns {boolean} - Trả về `true` nếu ảnh đã tải xong, ngược lại là `false`.
 */
export function useImageLoaded(src) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Reset trạng thái về false mỗi khi đường dẫn src thay đổi
    // Điều này đảm bảo Spinner sẽ hiện lại nếu component này được tái sử dụng cho ảnh mới
    setIsLoaded(false);

    // Nếu không có src thì không làm gì cả
    if (!src) return;

    // 2. Tạo một đối tượng Image ảo (không render ra DOM)
    const img = new Image();
    
    // 3. Gắn sự kiện onload
    // Khi trình duyệt tải xong ảnh vào cache, sự kiện này sẽ kích hoạt
    const handleLoad = () => setIsLoaded(true);
    
    img.onload = handleLoad;
    
    // Bắt đầu tải ảnh
    img.src = src;

    // 4. Cleanup Function:
    // Hủy sự kiện nếu component bị unmount trước khi ảnh tải xong
    // Giúp tránh lỗi cập nhật state trên component đã unmount (memory leak)
    return () => {
      img.onload = null;
    };
  }, [src]);

  return isLoaded;
}