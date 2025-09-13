import apiClient from '@/api/client';

import type { AxiosRequestConfig } from 'axios';

export const FetchHelpers = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    console.log(config);
    const { data, headers } = await apiClient.get<T>(url, config);

    return { data, headers };
  },

  post: async <T, P = unknown>(url: string, params?: P, config?: AxiosRequestConfig) => {
    const { data, headers } = await apiClient.post<T>(url, params, config);

    return { data, headers };
  },

  put: async <T, P = unknown>(url: string, params?: P, config?: AxiosRequestConfig) => {
    const { data, headers } = await apiClient.put<T>(url, params, config);

    return { data, headers };
  },

  patch: async <T, P = unknown>(url: string, params?: P, config?: AxiosRequestConfig) => {
    const { data, headers } = await apiClient.patch<T>(url, params, config);

    return { data, headers };
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    const { data, headers } = await apiClient.delete<T>(url, config);

    return { data, headers };
  },
};
