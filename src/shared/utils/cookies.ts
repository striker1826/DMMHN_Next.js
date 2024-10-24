import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (key: string, data: string) => {
  cookies.set(key, data, {
    path: '/',
    domain: process.env.COOKIE_DOMAIN,
    maxAge: 1000 * 60 * 60 * 24,
  });
};

export const getCookie = (data: string) => {
  return cookies.get(data);
};

export const removeCookie = (key: string, path: string) => {
  cookies.remove(key, { path });
};
