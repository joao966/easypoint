
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://easypoint.onrender.com',
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || error)
);

export default axiosInstance;