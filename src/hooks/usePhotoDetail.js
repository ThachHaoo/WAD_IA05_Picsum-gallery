import { useState, useEffect } from 'react';
import { fetchPhotoDetail, fetchPhotoMeta } from '../services/photoService';

/**
 * Custom Hook: usePhotoDetail
 * ---------------------------
 * Hook này quản lý toàn bộ logic dữ liệu cho trang chi tiết ảnh.
 * * **Điểm nổi bật (Performance Pattern):**
 * Sử dụng kỹ thuật **Parallel Fetching** để tải thông tin ảnh và metadata cùng một lúc.
 * Điều này giúp trang load nhanh hơn đáng kể so với việc chờ tải tuần tự (Sequential Fetching).
 *
 * @param {string|number} id - ID của bức ảnh cần lấy thông tin
 * @returns {Object} Kết quả trả về bao gồm:
 * - photo: Dữ liệu chính của ảnh (url, author, width, height...)
 * - meta: Dữ liệu bổ sung (title, description) - lấy từ nguồn khác
 * - loading: Trạng thái đang tải (true/false)
 * - error: Thông báo lỗi nếu việc tải ảnh chính thất bại
 */
export function usePhotoDetail(id) {
  const [photo, setPhoto] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cờ kiểm tra component còn được mount hay không (để tránh set state khi đã unmount)
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // --- KỸ THUẬT PARALLEL FETCHING ---
        // Gọi cả 2 API cùng một lúc thay vì chờ đợi nhau.
        // Sử dụng Promise.allSettled thay vì Promise.all:
        // -> Promise.all: Nếu 1 cái lỗi, tất cả đều lỗi (Fail Fast).
        // -> Promise.allSettled: Cho phép 1 cái lỗi, cái kia vẫn chạy (Resilience).
        const [photoResult, metaResult] = await Promise.allSettled([
          fetchPhotoDetail(id),
          fetchPhotoMeta(id)
        ]);

        // Nếu component đã bị hủy (người dùng back ra ngoài), dừng lại ngay
        if (!isMounted) return;

        // 1. Xử lý kết quả ảnh chính (QUAN TRỌNG)
        // Nếu ảnh chính lỗi -> Coi như cả trang lỗi
        if (photoResult.status === 'fulfilled') {
          setPhoto(photoResult.value);
        } else {
          throw new Error("Không thể tải thông tin ảnh gốc.");
        }

        // 2. Xử lý kết quả Metadata (KHÔNG QUAN TRỌNG)
        // Nếu metadata lỗi (do API dummy chết), ta vẫn hiện ảnh bình thường
        // Đây là tư duy "Graceful Degradation" (Xuống cấp nhẹ nhàng)
        if (metaResult.status === 'fulfilled') {
          setMeta({
            title: metaResult.value.title,
            description: metaResult.value.body
          });
        } else {
          console.warn("Không tải được metadata, dùng fallback text.");
          setMeta({ title: null, description: null });
        }

      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError(err.message || "Có lỗi xảy ra");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) loadData();

    // Cleanup function: Chạy khi component unmount hoặc id thay đổi
    return () => {
      isMounted = false;
    };
  }, [id]);

  return { photo, meta, loading, error };
}