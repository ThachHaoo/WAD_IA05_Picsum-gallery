import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * ---------------------
 * Component tiện ích giúp tự động cuộn trang lên đầu mỗi khi thay đổi đường dẫn (Route).
 * * Vấn đề giải quyết:
 * Trong các ứng dụng SPA (React Router), khi chuyển trang, trình duyệt mặc định
 * sẽ giữ nguyên vị trí cuộn của trang trước đó. Điều này gây khó chịu cho người dùng
 * (ví dụ: đang xem footer trang trước, qua trang mới vẫn nằm ở footer).
 * Component này khắc phục vấn đề đó.
 *
 * @component
 * @example
 * // Đặt component này bên trong <BrowserRouter> nhưng bên ngoài <Routes>
 * <BrowserRouter>
 * <ScrollToTop />
 * <App />
 * </BrowserRouter>
 *
 * @returns {null} Component này không hiển thị giao diện (render null)
 */
export default function ScrollToTop() {
  // Lấy pathname hiện tại từ React Router (ví dụ: "/photos", "/photos/10")
  const { pathname } = useLocation();

  useEffect(() => {
    // Sử dụng window.scrollTo để cuộn ngay lập tức lên tọa độ (0, 0) - góc trên cùng bên trái
    // Có thể thêm behavior: 'smooth' nếu muốn cuộn mượt (tuy nhiên cuộn ngay lập tức thường tốt hơn cho chuyển trang)
    window.scrollTo(0, 0);
    
  }, [pathname]); // Dependency: Chỉ chạy lại khi 'pathname' thay đổi

  return null; // Component logic thuần túy, không render UI
}