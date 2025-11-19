import React, { useState } from 'react';
import PhotoItem from '../components/PhotoItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { usePhotoList } from '../hooks/usePhotoList';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

/**
 * PhotoListPage Component
 * -----------------------
 * Trang chính hiển thị danh sách ảnh dưới dạng lưới (Grid) với tính năng cuộn vô tận (Infinite Scroll).
 * * **Các tính năng chính:**
 * 1. **Infinite Scroll:** Tự động tải thêm ảnh khi người dùng cuộn xuống cuối trang.
 * 2. **Responsive Grid:** Hiển thị 1 cột (Mobile), 2 cột (Tablet), 4 cột (Desktop).
 * 3. **Data Hook:** Tách biệt logic lấy dữ liệu sang `usePhotoList`.
 * 4. **Intersection Observer:** Sử dụng hook `useInfiniteScroll` để tối ưu hiệu năng cuộn.
 *
 * @component
 * @returns {JSX.Element} Giao diện danh sách ảnh
 */
function PhotoListPage() {
  // State quản lý số trang hiện tại (bắt đầu từ 1)
  const [page, setPage] = useState(1);
  
  // 1. Gọi Hook Data: Lấy danh sách ảnh, trạng thái loading và lỗi
  const { photos, loading, hasMore, error } = usePhotoList(page);

  // 2. Gọi Hook UI: Lấy ref để gắn vào phần tử cuối cùng nhằm kích hoạt load more
  const lastPhotoRef = useInfiniteScroll(loading, hasMore, setPage);

  return (
    <div className="container mx-auto pb-20">
      
      {/* --- HEADER SECTION --- */}
      <div className="relative text-center mb-16 mt-12">
        
        {/* 1. Hiệu ứng nền Glow (Phát sáng) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-sky-500/40 blur-[80px] rounded-full -z-10"></div>

        {/* 2. Icon trang trí */}
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-sky-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
        </div>

        {/* 3. Tiêu đề chính với Gradient */}
        {/* SỬA LỖI: Đổi 'bg-linear-to-r' -> 'bg-gradient-to-r' */}
        <h1 className="
          text-5xl md:text-7xl font-bold tracking-tighter drop-shadow-2xl
          text-transparent bg-clip-text 
          bg-linear-to-r from-sky-500 via-blue-400 to-purple-500
        ">
          Picsum Gallery
        </h1>
        
        <p className="mt-4 text-neutral-300 max-w-lg mx-auto text-lg">
          Khám phá bộ sưu tập ảnh ngẫu nhiên tuyệt đẹp từ Unsplash & Picsum.
        </p>

        {/* 4. Badge "Developed by" */}
        <div className="mt-8 flex justify-center">
          <div className="
            group relative
            inline-flex items-center gap-2 
            px-5 py-2 rounded-full 
            bg-neutral-900/50 backdrop-blur-sm
            border border-neutral-800 
            hover:border-sky-500/50 
            transition-all duration-300
          ">
            <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
              Developed by
            </span>
            
            <span className="
              font-bold 
              text-transparent bg-clip-text 
              bg-linear-to-r from-sky-500 to-purple-500
            ">
              Le Tan Hiep
            </span>

            {/* Đốm sáng trang trí chạy dưới chân badge khi hover */}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-sky-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </div>
        </div>
      </div>
      
      {/* --- ERROR STATE --- */}
      {error && (
        <div className="text-center mb-8">
          <p className="text-red-500 font-medium">⚠️ Đã có lỗi xảy ra khi tải ảnh. Vui lòng tải lại trang.</p>
        </div>
      )}

      {/* --- PHOTO GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-12">
        {photos.map((photo, index) => {
          // Logic Infinite Scroll:
          // Kiểm tra nếu đây là phần tử cuối cùng của mảng, gán ref vào nó.
          // Khi phần tử này xuất hiện trên màn hình, hook useInfiniteScroll sẽ chạy setPage(+1).
          if (photos.length === index + 1) {
            return (
              <div ref={lastPhotoRef} key={`${photo.id}-${index}`}>
                <PhotoItem photo={photo} />
              </div>
            );
          } else {
            return <PhotoItem key={photo.id} photo={photo} />;
          }
        })}
      </div>

      {/* --- LOADING STATE (Bottom) --- */}
      {loading && (
        <div className="text-center p-8 mt-4">
          <LoadingSpinner size="w-10 h-10" />
          <p className="text-neutral-500 mt-2 animate-pulse">Đang tải thêm ảnh...</p>
        </div>
      )}

      {/* --- END OF LIST MESSAGE --- */}
      {!loading && !hasMore && (
        <div className="text-center p-12 mt-8 border-t border-neutral-800/50 mx-auto max-w-lg">
          <p className="text-neutral-500 text-lg font-medium">🎉 Bạn đã xem hết danh sách ảnh!</p>
        </div>
      )}
    </div>
  );
}

export default PhotoListPage;