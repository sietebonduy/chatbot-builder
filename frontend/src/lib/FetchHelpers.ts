import type { AxiosRequestConfig } from 'axios';
import apiClient from '@/api/client';

export const FetchHelpers = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    const response = await apiClient.get<T>(url, config);
    return {
      data: response.data,
      headers: response.headers,
    };
  },

  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const response = await apiClient.post<T>(url, data, config);
    return {
      data: response.data,
      headers: response.headers,
    };
  },

  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const response = await apiClient.put<T>(url, data, config);
    return {
      data: response.data,
      headers: response.headers,
    };
  },

  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const response = await apiClient.patch<T>(url, data, config);
    return {
      data: response.data,
      headers: response.headers,
    };
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    const response = await apiClient.delete<T>(url, config);
    return {
      data: response.data,
      headers: response.headers,
    };
  },
};
