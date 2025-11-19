import React from 'react';

/**
 * LoadingSpinner Component
 * ------------------------
 * Hiển thị biểu tượng vòng xoay (spinner) để báo hiệu trạng thái đang tải dữ liệu.
 * Component này có thể tùy biến kích thước và màu sắc thông qua Props.
 *
 * @component
 * @param {Object} props - Các thuộc tính cấu hình
 * @param {string} [props.size="w-8 h-8"] - Class Tailwind quy định kích thước (VD: "w-12 h-12")
 * @param {string} [props.color="border-sky-500"] - Class Tailwind quy định màu sắc viền (VD: "border-white")
 * @param {string} [props.className=""] - Class tùy chỉnh thêm cho container bao ngoài (nếu cần chỉnh margin/padding)
 *
 * @example
 * // Sử dụng mặc định (size w-8 h-8, màu xanh sky)
 * <LoadingSpinner />
 *
 * @example
 * // Tùy chỉnh to hơn và màu trắng (dùng trong overlay tối)
 * <LoadingSpinner size="w-12 h-12" color="border-white" />
 *
 * @returns {JSX.Element} Phần tử JSX hiển thị spinner xoay
 */
function LoadingSpinner({ 
  size = "w-8 h-8", 
  color = "border-sky-500", // Đã đổi sang màu sky cho đồng bộ theme App
  className = "" 
}) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      {/* Cấu tạo Spinner:
        - border-4: Độ dày viền
        - rounded-full: Bo tròn 100% để tạo hình tròn
        - animate-spin: Keyframe animation xoay vòng có sẵn của Tailwind
        - border-t-transparent: MẤU CHỐT - Làm trong suốt cạnh trên để tạo cảm giác vòng xoay
      */}
      <div 
        className={`
          ${size} 
          ${color} 
          border-4 
          border-t-transparent 
          rounded-full 
          animate-spin
        `}
        role="status" // Accessibility: Giúp trình đọc màn hình nhận biết
        aria-label="Loading"
      ></div>
    </div>
  );
}

export default LoadingSpinner;