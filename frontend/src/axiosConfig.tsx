import axios from 'axios';

/**
 * Crea una instancia de axios con la url del backend 
 */
const axiosConfig = axios.create({
  baseURL: 'http://localhost:37111/graphql',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Agrega funcionlidad a la instancia de axios para enviar el 
 * token jwt (en caso de que exista en localStorage)
 * en cada request realizado por esta instancia
 */
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
