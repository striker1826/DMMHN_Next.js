import axios from 'axios';
import { getCookie, removeCookie } from './cookies';

export const apiInstance = axios.create({ baseURL: process.env.BASE_URL, withCredentials: true });

apiInstance.interceptors.request.use(config => {
  return config;
});

apiInstance.interceptors.response.use(config => {
  return config.data;
});
