import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AuthAPI } from './auth';

// Base URL: In production, this should be an environment variable.
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// Shared Axios Instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to set/remove Authorization token dynamically (called by Frontends after login/logout)
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Helper to set Tenant Isolation (schoolId) if needed manually
export const setSchoolScope = (schoolId: string | null) => {
  if (schoolId) {
    apiClient.defaults.headers.common['x-school-id'] = schoolId;
  } else {
    delete apiClient.defaults.headers.common['x-school-id'];
  }
};

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add global loading states or telemetry here
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized Access 401: Token might be expired or invalid.');
      // A global event listener can be triggered here to force apps to logout
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
    }
    return Promise.reject(error);
  }
);

// Exporting API Modules
export const Auth = new AuthAPI(apiClient);

export * from './auth';
