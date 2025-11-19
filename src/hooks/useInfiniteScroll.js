import { useRef, useCallback } from 'react';

/**
 * Custom Hook: useInfiniteScroll
 * ------------------------------
 * Hook này sử dụng API 'Intersection Observer' của trình duyệt để phát hiện
 * khi người dùng cuộn xuống phần tử cuối cùng của danh sách.
 * Khi thấy phần tử cuối, nó sẽ tự động tăng số trang để tải thêm dữ liệu.
 *
 * @param {boolean} loading - Trạng thái đang tải dữ liệu (để tránh kích hoạt trùng lặp)
 * @param {boolean} hasMore - Còn dữ liệu để tải nữa không (nếu false thì ngưng theo dõi)
 * @param {Function} setPage - Hàm state setter để tăng số trang (prev => prev + 1)
 * * @returns {Function} lastElementRef - Một "Callback Ref" để gắn vào phần tử cuối cùng trong danh sách
 */
export function useInfiniteScroll(loading, hasMore, setPage) {
  // Lưu trữ instance của IntersectionObserver để dùng lại qua các lần render
  const observer = useRef();

  // Sử dụng useCallback thay vì useEffect vì chúng ta cần xử lý node DOM ngay khi nó được mount
  const lastElementRef = useCallback(node => {
    // 1. Nếu đang tải dữ liệu, không làm gì cả (để tránh gọi API nhiều lần cùng lúc)
    if (loading) return;

    // 2. Nếu đã có observer cũ đang chạy, ngắt kết nối nó trước khi tạo cái mới
    // Điều này rất quan trọng để tránh memory leak và logic sai
    if (observer.current) observer.current.disconnect();

    // 3. Khởi tạo Observer mới
    observer.current = new IntersectionObserver(entries => {
      // entries[0] là phần tử đang được theo dõi (node)
      // isIntersecting = true nghĩa là phần tử đó đã xuất hiện trong vùng nhìn thấy (viewport)
      if (entries[0].isIntersecting && hasMore) {
        // Tăng page lên 1 -> Kích hoạt useEffect trong usePhotoList gọi API mới
        setPage(prevPage => prevPage + 1);
      }
    });

    // 4. Bắt đầu theo dõi phần tử (node) nếu nó tồn tại
    if (node) observer.current.observe(node);
    
  }, [loading, hasMore, setPage]); // Dependencies: Re-create observer khi loading hoặc hasMore thay đổi

  return lastElementRef;
}