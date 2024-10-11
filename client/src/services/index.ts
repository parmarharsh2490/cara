import axios from 'axios';

const apiClient = axios.create({
  baseURL : import.meta.env.VITE_API_BASE_URL || "https://cara-backend-nine.vercel.app/api/v1",
  withCredentials: true
});

export default apiClient