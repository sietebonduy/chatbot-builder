import apiClient from '../api/client';

export const FetchHelpers = {
  get: async <T>(url: string) => {
    const response = await apiClient.get<T>(url);
    return {
      data: response.data,
      headers: response.headers,
    };
  },

  post: async <T>(url: string, data?: any) => {
    const response = await apiClient.post<T>(url, data);
    return {
      data: response.data,
      headers: response.headers,
    };
  },

  put: async <T>(url: string, data?: any) => {
    const response = await apiClient.put<T>(url, data);
    return {
      data: response.data,
      headers: response.headers,
    };
  },

  delete: async <T>(url: string, headers?: Record<string, string>) => {
    const response = await apiClient.delete<T>(url, { headers });
    return {
      data: response.data,
      headers: response.headers,
    };
  },
};
