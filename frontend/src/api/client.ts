import axios from 'axios';
import humps from 'humps';

const apiClient = axios.create({
  baseURL: 'http://localhost:80',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (config.data) {
    config.data = humps.decamelizeKeys(config.data);
  }
  return config;
});

apiClient.interceptors.response.use((response) => {
  if (response.data) {
    response.data = humps.camelizeKeys(response.data);
  }
  return response;
});

export default apiClient;
