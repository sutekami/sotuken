import type { Cookies } from '@sveltejs/kit';

type HttpMethodsType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

type ApiHandlerType = {
  uri: string;
  to: 'api' | 'server';
  method: HttpMethodsType;
  cookies?: Cookies;
  body?: Record<string, any>;
  keys?: string[];
};

const BASE_URL = `http://express:3000`;
const BASE_API_URL = `/api`;
const BASE_COOKIE_KEYS = ['_session_id'];

const createCookies = (cookies: Cookies, keys?: string[]) => {
  return [...BASE_COOKIE_KEYS, ...(keys ?? [])].map(key => `${key}=${cookies.get(key)};`).join(' ');
};

const createHeaders = (cookies?: Cookies, keys?: string[]) =>
  new Headers({
    'Content-type': 'application/json',
    'X-Request_With': 'XMLHttpRequest',
    Cookie: !!cookies ? createCookies(cookies, keys) : '',
  });

export const apiHandler = async ({ uri, to, method, cookies, body, keys }: ApiHandlerType) => {
  const url = to === 'api' ? BASE_API_URL + uri : BASE_URL + uri;

  const request = new Request(url, {
    credentials: 'include',
    method,
    headers: createHeaders(cookies, keys),
    body: method !== 'GET' ? JSON.stringify(body ?? {}) : undefined,
  });

  return fetch(request);
};
