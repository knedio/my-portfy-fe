import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: `${VITE_API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        clearAuthToken();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
  apiClient.defaults.headers.Authorization = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete apiClient.defaults.headers.Authorization;
};

export const api = {
  get: <T>(url: string, params = {}, config = {}) => apiClient.get<T>(url, { ...config, params }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: <T>(url: string, data?: any, config?: any) => apiClient.post<T>(url, data, config),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put: <T>(url: string, data?: any, config?: any) => apiClient.put<T>(url, data, config),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete: <T>(url: string, config?: any) => apiClient.delete<T>(url, config),
};

export default apiClient;
