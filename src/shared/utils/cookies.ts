import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (key: string, data: string) => {
  cookies.set(key, data, { path: '/' });
};

export const getCookie = (data: string) => {
  return cookies.get(data);
};
