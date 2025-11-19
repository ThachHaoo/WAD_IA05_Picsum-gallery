// src/pages/PhotoDetailPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { usePhotoDetail } from '../hooks/usePhotoDetail';

/**
 * PhotoDetailPage Component
 * -------------------------
 * Trang chi tiết hiển thị đầy đủ thông tin của một bức ảnh.
 * * **Các tính năng chính:**
 * 1. **Data Fetching:** Sử dụng hook `usePhotoDetail` để lấy dữ liệu song song (ảnh + metadata).
 * 2. **Error Handling:** Hiển thị thông báo lỗi thân thiện nếu ID không tồn tại hoặc mất mạng.
 * 3. **Responsive UI:** Bố cục 2 cột trên Desktop, 1 cột trên Mobile.
 * 4. **Navigation:** Nút "Quay về" có hiệu ứng Gradient và Animation mượt mà.
 *
 * @component
 * @returns {JSX.Element} Giao diện trang chi tiết
 */
export default function PhotoDetailPage() {
  // Lấy tham số 'id' từ URL (VD: /photos/10 -> id = 10)
  const { id } = useParams();
  
  // Gọi Hook lấy dữ liệu
  const { photo, meta, loading, error } = usePhotoDetail(id);

  // State 1: Loading - Đang tải toàn bộ trang
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <LoadingSpinner size="w-12 h-12" color="border-sky-500" />
        <p className="text-neutral-400 animate-pulse font-medium">Đang tìm ảnh...</p>
      </div>
    );
  }

  // State 2: Error - Lỗi hoặc không tìm thấy ảnh
  if (error || !photo) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Rất tiếc!</h2>
        <p className="text-neutral-400 mb-8 max-w-md">
          {error || "Không tìm thấy ảnh yêu cầu. Có thể ảnh đã bị xóa hoặc đường dẫn không đúng."}
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-neutral-800 text-white rounded-xl hover:bg-neutral-700 transition-colors border border-neutral-700"
        >
          Quay về trang chủ
        </Link>
      </div>
    );
  }

  // State 3: Success - Hiển thị dữ liệu
  return (
    <div className="max-w-5xl mx-auto p-4 pb-20">
      
      {/* --- Nút Quay về (Back Button) --- */}
      <Link 
        to="/" 
        className="
          group
          mb-8 inline-flex items-center gap-3
          px-6 py-3 rounded-full
          text-white font-bold tracking-wide
          
          /* Gradient Background Effect */
          bg-linear-to-r from-sky-500 to-purple-600
          bg-size-[200%_auto] /* Sửa cú pháp bg-size chuẩn Tailwind */
          hover:bg-right
          transition-all duration-500 ease-in-out
          
          /* Shadow & Interaction */
          shadow-lg shadow-sky-500/40
          hover:shadow-sky-500/60
          active:scale-95
        "
      >
        {/* SVG Arrow Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2.5} 
          stroke="currentColor" 
          className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>

        <span>Quay về Gallery</span>
      </Link>

      {/* --- Main Content Card --- */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-neutral-200">
        
        {/* 1. Ảnh chính (Image Header) */}
        <div className="aspect-video w-full bg-neutral-100 relative group">
           <img 
             src={photo.download_url}
             alt={photo.author}
             className="w-full h-full object-contain bg-neutral-900 shadow-inner"
           />
           {/* Nút mở rộng ảnh gốc (Overlay) */}
           <a 
             href={photo.download_url} 
             target="_blank" 
             rel="noreferrer"
             className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
             title="Xem ảnh gốc"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
             </svg>
           </a>
        </div>

        <div className="p-6 md:p-10 space-y-8">
          
          {/* 2. Tiêu đề & Tác giả */}
          <div>
            <p className="text-xs text-sky-600 uppercase tracking-widest font-bold mb-2">Photographer</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
              {photo.author}
            </h1>
          </div>

          {/* 3. Nội dung chi tiết (Grid Layout) */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Cột trái: Metadata Text */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-sky-500 rounded-full"></span>
                  Tiêu đề tác phẩm
                </h3>
                {meta?.title ? (
                  <p className="text-xl md:text-2xl font-serif text-slate-700 italic leading-relaxed">
                    "{meta.title}"
                  </p>
                ) : (
                   <p className="text-neutral-400 italic">Đang cập nhật tiêu đề...</p>
                )}
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                  Mô tả chi tiết
                </h3>
                {meta?.description ? (
                  <p className="text-slate-600 leading-loose text-justify">
                    {meta.description}
                  </p>
                ) : (
                  <p className="text-neutral-400 italic">Chưa có mô tả cho bức ảnh này.</p>
                )}
              </div>
            </div>

            {/* Cột phải: Thông số kỹ thuật (Specs Card) */}
            {/* Đã tối ưu: max-w-sm, mx-auto (mobile) -> mx-0 (desktop) */}
            <div className="
              bg-slate-50 p-6 rounded-2xl h-fit 
              w-full max-w-sm mx-auto lg:mx-0
              border border-slate-100 shadow-sm
            ">
              <h3 className="font-bold text-slate-900 mb-5 border-b border-slate-200 pb-3">
                Thông số kỹ thuật
              </h3>
              
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex justify-between items-center">
                  <span className="font-medium">ID Ảnh:</span> 
                  <span className="font-mono font-bold text-slate-700 bg-slate-200 px-2 py-1 rounded text-xs">
                    #{photo.id}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium">Chiều rộng:</span> 
                  <span className="font-semibold text-slate-800">{photo.width} px</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium">Chiều cao:</span> 
                  <span className="font-semibold text-slate-800">{photo.height} px</span>
                </li>
                
                <li className="pt-6">
                   <a 
                     href={photo.url} 
                     target="_blank" 
                     rel="noreferrer"
                     className="
                       block w-full text-center py-3 
                       bg-slate-900 text-white font-medium rounded-xl 
                       hover:bg-black hover:shadow-xl hover:-translate-y-1
                       transition-all duration-300
                     "
                   >
                     Tải xuống từ Picsum
                   </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}