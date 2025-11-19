import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * NotFoundPage Component
 * ----------------------
 * Trang hiển thị lỗi 404 khi người dùng truy cập vào một đường dẫn không tồn tại.
 * * * **Tính năng UX:**
 * 1. **Nút "Quay lại":** Cho phép người dùng quay về trang trước đó ngay lập tức thay vì bị lạc.
 * 2. **Nút "Về trang chủ":** Lối thoát an toàn để reset lại luồng trải nghiệm.
 * 3. **Giao diện:** Căn giữa màn hình, sử dụng Typography lớn và Gradient để giảm bớt cảm giác khó chịu khi gặp lỗi.
 *
 * @component
 * @returns {JSX.Element} Giao diện trang lỗi 404
 */
export default function NotFoundPage() {
  // Hook điều hướng của React Router
  // useNavigate cho phép điều hướng bằng code (programmatic navigation)
  const navigate = useNavigate();

  return (
    // min-h-[80vh]: Đảm bảo nội dung luôn nằm giữa màn hình laptop/PC một cách cân đối
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      
      {/* Hiệu ứng chữ 404 khổng lồ với màu Gradient */}
      {/* bg-clip-text + text-transparent: Giúp màu nền (gradient) hiển thị lên trên mặt chữ */}
      <h1 className="
        text-9xl font-extrabold 
        text-transparent bg-clip-text 
        bg-linear-to-r from-blue-500 to-purple-600 
        animate-pulse
      ">
        404
      </h1>

      <h2 className="text-3xl font-bold text-white mt-4">
        Oops! Không tìm thấy trang này.
      </h2>
      
      <p className="text-neutral-400 mt-2 max-w-md">
        Có vẻ như trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển đi nơi khác.
      </p>

      {/* Khu vực nút bấm hành động (Action Buttons) */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        
        {/* Nút 1: Quay lại trang trước đó (Back) */}
        {/* navigate(-1) tương đương với việc bấm nút Back trên trình duyệt */}
        <button
          onClick={() => navigate(-1)}
          className="
            px-6 py-3 rounded-xl font-medium
            border border-neutral-600 text-neutral-300 
            hover:bg-neutral-800 hover:border-neutral-500 
            transition-all duration-200 
          "
        >
          ← Quay lại
        </button>

        {/* Nút 2: Về trang chủ (Home) */}
        <Link
          to="/"
          className="
            px-6 py-3 rounded-xl font-medium
            bg-blue-600 text-white 
            hover:bg-blue-500 
            shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 
            transition-all duration-200 
          "
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}