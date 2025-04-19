import axios from 'axios';
import humps from 'humps';

const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split(';').map(c => c.trim());
  const targetCookie = cookies.find(c => c.startsWith(`${name}=`));
  return targetCookie ? decodeURIComponent(targetCookie.split('=')[1]) : null;
};

const apiClient = axios.create({
  baseURL: 'http://localhost:80',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (config.data) {
    config.data = humps.decamelizeKeys(config.data);
  }

  const jwtCookie = getCookie('jwt');

  if (jwtCookie && !config.headers.Authorization) {
    config.headers.Authorization = jwtCookie;
  }

  return config;
});

apiClient.interceptors.response.use((response) => {
  if (response.data) {
    response.data = humps.camelizeKeys(response.data);
  }
  return response;
}, (error) => {
  if (error.response?.status === 401) {
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default apiClient;
