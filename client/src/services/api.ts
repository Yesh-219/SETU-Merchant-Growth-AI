import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from '../types/api';

const BASE_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Centralized, reusable Axios client instance.
 * Reads backend URL dynamically from VITE_API_URL.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor for logging & attaching auth headers in future
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to provide clean error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    const customMessage =
      error.response?.data?.message ||
      error.message ||
      'An unexpected network error occurred while reaching the SETU backend.';

    return Promise.reject(new Error(customMessage));
  }
);

export default apiClient;

