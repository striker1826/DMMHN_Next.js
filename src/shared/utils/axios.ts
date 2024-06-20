import axios from 'axios';
import { getCookie } from './cookies';

export const apiInstance = axios.create({ baseURL: 'https://alstjq.shop' });

apiInstance.interceptors.request.use(config => {
  const access_token = getCookie('token');
  if (access_token) config.headers.Authorization = `Bearer ${access_token}`;
  return config;
});

apiInstance.interceptors.response.use(config => {
  return config.data;
});
