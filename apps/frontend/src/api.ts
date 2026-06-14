import axios from 'axios';
import { isStaticMode, handleStaticRequest } from './staticApi';

const api = axios.create({
  baseURL: '/api',
});

// В статическом режиме (GitHub Pages) — перехватываем все запросы
if (isStaticMode()) {
  api.get = async function(url: string, config?: any) {
    return { data: handleStaticRequest('/api' + url, config?.params) };
  } as any;

  api.post = async function(url: string, data?: any, config?: any) {
    return { data: handleStaticRequest('/api' + url, data) };
  } as any;

  api.put = async function(url: string, data?: any, config?: any) {
    return { data: handleStaticRequest('/api' + url, data) };
  } as any;

  api.delete = async function(url: string, config?: any) {
    return { data: handleStaticRequest('/api' + url) };
  } as any;
} else {
  // В.normalном режиме — прикрепляем JWT токен
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
      }
      return Promise.reject(error);
    }
  );
}

export default api;