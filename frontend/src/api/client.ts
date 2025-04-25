import axios from 'axios';
import humps from 'humps';

const getCookie = (name: string) => {
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
  if (jwtCookie) {
    config.headers.Authorization = jwtCookie;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = humps.camelizeKeys(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
