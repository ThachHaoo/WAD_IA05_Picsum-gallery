/**
 * Hàm tiện ích: Tạo URL ảnh từ Picsum
 * -----------------------------------
 * Giúp tập trung logic tạo đường dẫn ảnh vào một nơi duy nhất.
 * Dễ dàng thay đổi kích thước mặc định hoặc đổi nhà cung cấp ảnh (Provider) sau này.
 *
 * @param {string|number} id - ID của bức ảnh (bắt buộc).
 * @param {number} [width=600] - Chiều rộng mong muốn (mặc định 600px).
 * @param {number} [height=400] - Chiều cao mong muốn (mặc định 400px).
 * * @returns {string} Đường dẫn URL hoàn chỉnh (VD: "https://picsum.photos/id/237/600/400")
 *
 * @example
 * // Lấy ảnh kích thước mặc định (600x400)
 * const url = getImageUrl(10);
 *
 * @example
 * // Lấy ảnh kích thước tùy chỉnh (Square thumbnail)
 * const avatarUrl = getImageUrl(10, 100, 100);
 */
export const getImageUrl = (id, width = 600, height = 400) => {
  return `https://picsum.photos/id/${id}/${width}/${height}`;
};