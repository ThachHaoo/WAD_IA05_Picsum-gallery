import React from 'react';

/**
 * Footer Component
 * ----------------
 * Hiển thị chân trang cố định (sticky bottom) cho toàn bộ ứng dụng.
 * Bao gồm thông tin bản quyền (tự động cập nhật năm) và các liên kết pháp lý.
 * * @component
 * @example
 * return <Footer />
 * * @returns {JSX.Element} Phần tử JSX hiển thị Footer
 */
export default function Footer() {
  // Lấy năm hiện tại của hệ thống (VD: 2025)
  const currentYear = new Date().getFullYear();

  return (
    // Sử dụng 'mt-auto' để đẩy Footer xuống đáy nếu nội dung trang ngắn
    <footer className="w-full py-6 mt-auto border-t border-neutral-800 bg-neutral-950 text-center">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* --- Phần 1: Thông tin Copyright & Tech Stack --- */}
        <p className="text-neutral-500 text-sm">
          © {currentYear} Picsum Gallery. Built with 
          <span className="text-sky-500 font-bold mx-1">React</span> 
          & 
          <span className="text-sky-500 font-bold mx-1">Tailwind CSS</span>.
        </p>
        
        {/* --- Phần 2: Các liên kết pháp lý (Legal Links) --- */}
        <div className="mt-2 space-x-4 text-xs text-neutral-600">
          <a href="#" className="hover:text-neutral-300 transition-colors" aria-label="Privacy Policy">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="#" className="hover:text-neutral-300 transition-colors" aria-label="Terms of Service">
            Terms of Service
          </a>
          <span>•</span>
          <span className="hover:text-neutral-300 transition-colors cursor-pointer" aria-label="License Information">
            License
          </span>
        </div>

      </div>
    </footer>
  );
}