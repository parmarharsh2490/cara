import axios from 'axios';

const apiClient = axios.create({
  // baseURL: "https://cara-backend-nine.vercel.app/api/v1",
  baseURL : "http://localhost:3000/api/v1",
  withCredentials: true
});

export default apiClient