import axios from 'axios';
import humps from 'humps';
import { isBlank, present } from "@/utils/presence";

const getCookie = (name: string) => {
  if (isBlank(document)) return null;

  const cookies = document.cookie.split(';').map(c => c.trim());
  const targetCookie = cookies.find(c => c.startsWith(`${name}=`));
  return targetCookie ? decodeURIComponent(targetCookie.split('=')[1]) : null;
};

const apiClient = axios.create({
  baseURL: 'http://localhost:80',
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (present(config.data)) {
    config.data = humps.decamelizeKeys(config.data);
  }

  const jwtCookie = getCookie('jwt');
  if (present(jwtCookie)) {
    config.headers.Authorization = jwtCookie;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (present(response.data)) {
      response.data = humps.camelizeKeys(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
