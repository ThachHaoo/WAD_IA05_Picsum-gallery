import axios from 'axios';

// --- CẤU HÌNH API ENDPOINTS ---
const API_URL = 'https://picsum.photos/v2/list';       // API lấy danh sách
const INFO_URL = 'https://picsum.photos/id';           // API lấy chi tiết 1 ảnh
const MOCK_META_URL = 'https://dummyjson.com/posts';   // API giả lập để lấy title/description

/**
 * Gọi API lấy danh sách ảnh từ Picsum (có phân trang).
 * * @param {number} page - Số thứ tự trang cần tải (VD: 1, 2...).
 * @param {number} [limit=9] - Số lượng ảnh trên mỗi trang (Mặc định là 9).
 * @returns {Promise<Array>} Trả về Promise chứa mảng các đối tượng ảnh.
 * @throws {Error} Ném ra lỗi nếu kết nối mạng thất bại hoặc API lỗi.
 */
export const fetchPhotosAPI = async (page, limit = 9) => {
  const response = await axios.get(API_URL, {
    params: { page, limit }
  });
  return response.data;
};

/**
 * Gọi API lấy thông tin chi tiết của một bức ảnh cụ thể.
 * Bao gồm: kích thước gốc, url tải về, tên tác giả...
 * * @param {string|number} id - ID của bức ảnh (VD: "10", 237).
 * @returns {Promise<Object>} Trả về Promise chứa object thông tin ảnh.
 */
export const fetchPhotoDetail = async (id) => {
  const response = await axios.get(`${INFO_URL}/${id}/info`);
  return response.data;
};

/**
 * Gọi API giả lập (Mock) để lấy metadata bổ sung (Tiêu đề & Mô tả).
 * Do Picsum không cung cấp tiêu đề ảnh, ta dùng DummyJSON để "fake" dữ liệu này
 * dựa trên ID ảnh để đảm bảo tính nhất quán (cùng ID luôn ra cùng Text).
 * * @param {string|number} id - ID của ảnh gốc.
 * @returns {Promise<Object>} Trả về Promise chứa object { title, body, ... }.
 */
export const fetchPhotoMeta = async (id) => {
  // Logic Mock: Map ID ảnh sang ID bài viết của DummyJSON
  // Vì DummyJSON chỉ có khoảng 150 bài viết, ta dùng toán tử chia lấy dư (%)
  // để đảm bảo ID luôn nằm trong khoảng hợp lệ (1-30).
  const mockId = (Number(id) % 30) + 1; 
  
  const response = await axios.get(`${MOCK_META_URL}/${mockId}`);
  return response.data;
};