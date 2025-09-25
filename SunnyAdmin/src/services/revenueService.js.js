import axios from "axios";

// Lấy URL của Backend từ file .env
const API_URL = process.env.REACT_APP_API_URL;

// Hàm lấy token từ localStorage
const getToken = () => {
  const token = localStorage.getItem("auth_token");
  return token ? token : null;
};

// Hàm lấy tất cả đơn hàng với phân trang
export const getRevunueSumary = async () => {
  try {
    const response = await axios.get(`${API_URL}/revenue/summary`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Thêm token vào header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders", error);
    throw error;
  }
};

// Bổ sung hàm để lấy doanh thu hàng ngày theo startDate và endDate
export const getDailyRevenue = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/revenue/daily`, {
      params: {
        startDate,
        endDate,
      },
      headers: {
        Authorization: `Bearer ${getToken()}`, // Thêm token vào header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching daily revenue", error);
    throw error;
  }
};
// Hàm lấy Top sản phẩm bán chạy & bán chậm
export const getTopProducts = async (limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/revenue/top-products`, {
      params: { limit },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data; // { bestSelling: [...], worstSelling: [...] }
  } catch (error) {
    console.error("Error fetching top products", error);
    throw error;
  }
};

// Hàm lấy doanh thu theo tháng (MM/yyyy)
export const getMonthlyRevenue = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/revenue/monthly`, {
      params: { startDate, endDate }, // VD: "01/2024", "06/2024"
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data; // [{ month: "2024-01", revenue: ...}, ...]
  } catch (error) {
    console.error("Error fetching monthly revenue", error);
    throw error;
  }
};