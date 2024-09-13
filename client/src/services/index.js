import axios from 'axios';
var apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});
export default apiClient;
