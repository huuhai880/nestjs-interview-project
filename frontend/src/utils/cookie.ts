import Cookies from 'universal-cookie'

export const COOKIE_JWT = 'COOKIE_JWT'

const cookie = new Cookies();

export const setCookie = (key: string, value: any, expires: number = 1): void => {
  try {
    const minutes: number = expires * 1440;
    const d: Date = new Date();
    d.setTime(d.getTime() + minutes * 60 * 1000);
    cookie.set(key, value, { path: '/', expires: d });
  } catch (error) {
    // Handle error
  }
};

export const removeCookie = (key: string): void => {
  cookie.remove(key, {
    expires: 1,
  });
};

export const getAccessToken = (_ctx: any = null): string | null => {
  let accessToken: string | null = null;
  let cookieToken = cookie.get(COOKIE_JWT);
  if (cookieToken) {
    let { accessToken: token = '' } = cookieToken || {};
    accessToken = token;
  }
  return accessToken;
};

export const getCookie = (key: string): any => {
  try {
    return cookie.get(key);
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const getRefreshToken = (_ctx: any = null): any => {
  let tokenObj: any = null;
  let cookieToken = cookie.get(COOKIE_JWT);
  if (cookieToken) tokenObj = cookieToken;
  return tokenObj;
};
