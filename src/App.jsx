// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';

// --- LAZY LOADING CONFIGURATION ---
// Tách code (Code Splitting) để giảm dung lượng tải ban đầu.
// Các trang chỉ được tải về trình duyệt khi người dùng thực sự truy cập vào nó.
const PhotoListPage = lazy(() => import('./pages/PhotoListPage'));
const PhotoDetailPage = lazy(() => import('./pages/PhotoDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/**
 * App Component (Root)
 * --------------------
 * Component gốc quản lý cấu trúc Layout và định tuyến (Routing) của toàn bộ ứng dụng.
 * * **Cấu trúc Layout (Sticky Footer):**
 * Sử dụng `min-h-screen` kết hợp với `flex-col` và `grow` để đảm bảo Footer
 * luôn nằm ở đáy trang ngay cả khi nội dung trang ngắn.
 *
 * @component
 * @returns {JSX.Element}
 */
function App() {
  return (
    <BrowserRouter>
      {/* Tiện ích: Tự động cuộn lên đầu trang khi chuyển Route */}
      <ScrollToTop />

      {/* MAIN CONTAINER 
        - min-h-screen: Chiều cao tối thiểu bằng 100% màn hình thiết bị.
        - flex flex-col: Sắp xếp các phần tử con (Content + Footer) theo chiều dọc.
        - bg-gradient-to-b: Tạo nền chuyển sắc tạo chiều sâu (Depth).
      */}
      <div className="
        min-h-screen flex flex-col 
        bg-linear-to-b from-neutral-700 via-neutral-900 to-neutral-950 
        text-gray-200 font-sans 
        selection:bg-sky-500 selection:text-white
      ">
        
        {/* CONTENT WRAPPER
          - grow (flex-grow): Chiếm toàn bộ khoảng trống còn lại, đẩy Footer xuống đáy.
        */}
        <div className="grow w-full max-w-7xl mx-auto px-4 py-6">
          <Suspense 
            fallback={
              // Loading UI hiển thị trong lúc chờ tải file JS của các trang Lazy Load
              <div className="flex h-[80vh] items-center justify-center">
                <LoadingSpinner size="w-12 h-12" color="border-sky-500" />
              </div>
            }
          >
            <Routes>
              {/* Redirect trang chủ về /photos */}
              <Route path="/" element={<Navigate replace to="/photos" />} />
              
              {/* Danh sách ảnh */}
              <Route path="/photos" element={<PhotoListPage />} />
              
              {/* Chi tiết ảnh */}
              <Route path="/photos/:id" element={<PhotoDetailPage />} />
              
              {/* Trang 404 - Bắt tất cả các route không xác định */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>

        {/* Footer luôn nằm ở cuối cùng của div cha */}
        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export default App;