import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:37111/graphql',
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;
