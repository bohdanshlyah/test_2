import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_SERVER_CONNECTOR;

export const instance = axios.create({
  baseURL,
  withCredentials: true
});

export const setAuthHeader = () => {
  const token = Cookies.get('accessToken');
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};

instance.interceptors.request.use(config => {
  const accessToken = Cookies.get('accessToken');
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const { status, data } = error.response;
    // TODO: data.message?
    if (status === 401 && data.message === 'Token expired') {
      const accessToken = Cookies.get('accessToken');
      originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);
