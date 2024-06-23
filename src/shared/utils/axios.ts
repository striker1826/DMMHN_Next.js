import axios from 'axios';
import { getCookie, removeCookie } from './cookies';

export const apiInstance = axios.create({ baseURL: process.env.BASE_URL });

apiInstance.interceptors.request.use(config => {
  const access_token = getCookie('token');
  if (access_token) config.headers.Authorization = `Bearer ${access_token}`;
  return config;
});

apiInstance.interceptors.response.use(config => {
  return config.data;
});
