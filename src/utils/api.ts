import axios, { AxiosRequestConfig } from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: `${VITE_API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// ─── Request Interceptor ─────────────────────────────────────────────
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

// ─── Response Interceptor ────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401 && localStorage.getItem('token')) {
        clearAuthToken();
        window.location.href = '/sign-in';
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth Helpers ────────────────────────────────────────────────────
export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
  apiClient.defaults.headers.Authorization = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete apiClient.defaults.headers.Authorization;
};

// ─── Typed API Methods ───────────────────────────────────────────────
export const api = {
  get: <T>(url: string, queryParams = {}, config: AxiosRequestConfig = {}) =>
    apiClient.get<T>(url, { ...config, params: queryParams }),

  post: <T>(url: string, data?: unknown, config: AxiosRequestConfig = {}) =>
    apiClient.post<T>(url, data, config),

  put: <T>(url: string, data?: unknown, config: AxiosRequestConfig = {}) =>
    apiClient.put<T>(url, data, config),

  delete: <T>(url: string, config: AxiosRequestConfig = {}) => apiClient.delete<T>(url, config),
};

export default apiClient;
