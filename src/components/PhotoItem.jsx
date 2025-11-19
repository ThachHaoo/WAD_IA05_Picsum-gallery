import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { getImageUrl } from '../utils/imageUtils';
import { useImageLoaded } from '../hooks/useImageLoaded';

/**
 * PhotoItem Component
 * -------------------
 * Component hiển thị một thẻ ảnh (Card) đơn lẻ trong danh sách Gallery.
 * * Các tính năng UI/UX:
 * 1. **Progressive Loading:** Hiển thị Spinner trong lúc ảnh đang được tải về.
 * 2. **Smooth Transition:** Ảnh hiện dần (fade-in) thay vì hiện đột ngột.
 * 3. **Hover Effects:** Phóng to ảnh nhẹ và hiển thị tên tác giả khi rê chuột.
 *
 * @component
 * @param {Object} props - Các thuộc tính truyền vào
 * @param {Object} props.photo - Đối tượng chứa dữ liệu ảnh từ API
 * @param {string|number} props.photo.id - ID của ảnh (dùng để tạo URL ảnh thumbnail)
 * @param {string} props.photo.author - Tên tác giả
 * * @returns {JSX.Element} Thẻ Card chứa ảnh và thông tin
 */
function PhotoItem({ photo }) {
  // 1. Logic tạo URL ảnh thumbnail (600x400 là kích thước tối ưu cho thẻ này)
  const imageUrl = getImageUrl(photo.id, 600, 400);
  
  // 2. Custom Hook: Theo dõi xem ảnh thực sự đã tải xong chưa
  // Trả về true nếu ảnh đã sẵn sàng hiển thị
  const isLoaded = useImageLoaded(imageUrl);

  return (
    <Link
      to={`/photos/${photo.id}`}
      className="
        group block relative
        rounded-xl overflow-hidden 
        bg-neutral-900 border border-neutral-700 
        shadow-lg hover:shadow-2xl 
        transition-all duration-300 hover:-translate-y-1 
      "
    >
      {/* Container chứa ảnh: Cố định chiều cao h-64 để layout không bị nhảy */}
      <div className="relative h-64 w-full bg-neutral-800 flex items-center justify-center overflow-hidden">
        
        {/* State 1: Loading - Hiển thị Spinner khi ảnh chưa tải xong */}
        {!isLoaded && (
           <LoadingSpinner size="w-8 h-8" color="border-neutral-500" />
        )}

        {/* State 2: Loaded - Ảnh chính */}
        <img
          src={imageUrl}
          alt={photo.author}
          loading="lazy" // Hỗ trợ native lazy load của trình duyệt
          className={`
            absolute inset-0 w-full h-full object-cover 
            transition-all duration-700 ease-in-out
            group-hover:scale-110 /* Zoom ảnh khi hover */
            
            /* Hiệu ứng Fade-in: Ẩn (opacity-0) khi chưa load, hiện (opacity-100) khi đã load */
            ${isLoaded ? 'opacity-100' : 'opacity-0'} 
          `}
        />

        {/* Overlay & Text: Chỉ hiện khi ảnh đã tải xong để tránh hiện chữ trên nền đen trống */}
        {isLoaded && (
          <>
            {/* Lớp phủ Gradient đen mờ ở dưới đáy để làm nổi bật chữ trắng */}
            <div className="
              absolute inset-0 
              bg-linear-to-t from-black/80 via-transparent to-transparent 
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-300
            "></div>
            
            {/* Tên tác giả */}
            <p className="
              absolute bottom-3 left-3 z-10
              text-white text-lg font-bold drop-shadow-md
              translate-y-4 group-hover:translate-y-0 /* Trượt chữ lên khi hover */
              opacity-0 group-hover:opacity-100
              transition-all duration-300 delay-75
            ">
              {photo.author}
            </p>
          </>
        )}
      </div>

      {/* Phần Footer nhỏ của Card: Hiển thị ID */}
      <div className="p-4 bg-neutral-600 group-hover:bg-neutral-700 transition-colors duration-300">
        <p className="text-sm text-neutral-400 truncate">
          ID: <span className="text-neutral-200">{photo.id}</span>
        </p>
      </div>
    </Link>
  );
}

export default PhotoItem;