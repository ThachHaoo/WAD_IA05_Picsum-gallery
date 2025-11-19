import { useState, useEffect, useRef } from 'react';
import { fetchPhotosAPI } from '../services/photoService';

/**
 * Custom Hook: usePhotoList
 * -------------------------
 * Hook quản lý logic tải danh sách ảnh theo phân trang (Pagination/Infinite Scroll).
 * * * **Các vấn đề kỹ thuật được giải quyết:**
 * 1. **Race Conditions:** Sử dụng Cleanup Flag (`ignore`) để đảm bảo dữ liệu của trang 1 không đè lên trang 2 nếu mạng lag.
 * 2. **Data Deduplication:** Tự động lọc bỏ các ảnh trùng ID (đôi khi API trả về trùng lặp).
 * 3. **Double Render Optimization:** Sử dụng `useRef` để tối ưu hóa hiệu năng trong React Strict Mode.
 *
 * @param {number} pageNumber - Số thứ tự trang cần tải (VD: 1, 2, 3...)
 * @returns {Object} Kết quả trả về:
 * - photos: Mảng chứa tất cả ảnh đã tải (tích lũy từ trang 1 -> trang hiện tại)
 * - loading: Trạng thái đang tải API
 * - error: Trạng thái lỗi nếu có
 * - hasMore: Boolean cho biết server còn ảnh để tải nữa không
 */
export function usePhotoList(pageNumber) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Ref này dùng để theo dõi lần render đầu tiên
  // Giúp tránh set state loading thừa thãi khi component vừa được mount
  const isFirstMount = useRef(true);

  useEffect(() => {
    // --- CLEANUP FLAG PATTERN ---
    // Biến cờ để hủy cập nhật state nếu component bị unmount hoặc pageNumber đổi nhanh quá
    // Đây là Best Practice khi gọi Async trong useEffect
    let ignore = false;

    // Logic: Chỉ set loading = true nếu đây KHÔNG phải lần đầu
    // (Vì giá trị khởi tạo của loading state dòng 23 đã là true rồi, set lại nữa sẽ gây render thừa)
    if (isFirstMount.current) {
      isFirstMount.current = false;
    } else {
      setLoading(true);
    }
    
    setError(false);

    // Gọi Service lấy dữ liệu
    fetchPhotosAPI(pageNumber)
      .then(newPhotos => {
        if (ignore) return; // Nếu cờ ignore bật lên (người dùng đã bỏ đi), thì dừng lại, không làm gì cả

        if (newPhotos.length === 0) {
          setHasMore(false); // Hết dữ liệu từ server
        } else {
          // Logic nối mảng (Append) và Lọc trùng (Deduplicate)
          setPhotos(prevPhotos => {
            // Dùng Set để tra cứu ID đã tồn tại với độ phức tạp O(1) -> Cực nhanh
            const existingIds = new Set(prevPhotos.map(p => p.id));
            
            // Chỉ lấy những ảnh chưa có trong danh sách cũ
            const uniqueNewPhotos = newPhotos.filter(p => !existingIds.has(p.id));
            
            // Nối ảnh cũ + ảnh mới đã lọc
            return [...prevPhotos, ...uniqueNewPhotos];
          });
        }
        setLoading(false);
      })
      .catch(e => {
        if (ignore) return;
        console.error("Error fetching photos:", e);
        setError(true);
        setLoading(false);
      });

    // CLEANUP FUNCTION: Chạy trước khi effect chạy lần kế tiếp hoặc khi unmount
    // Lúc này ta bật cờ ignore = true để chặn mọi phản hồi chậm từ API
    return () => {
      ignore = true;
    };
  }, [pageNumber]);

  return { photos, loading, error, hasMore };
}