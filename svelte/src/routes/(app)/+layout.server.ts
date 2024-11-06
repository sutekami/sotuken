import { env } from '$env/dynamic/private';
import { apiHandler } from '$lib/client/index.js';

export async function load({ cookies }) {
  let user;
  const res = await apiHandler({
    uri: '/session',
    method: 'GET',
    to: 'server',
    cookies,
  });
  if (res.status === 200) user = await res.json();

  res.headers.getSetCookie().forEach(cookie => {
    const parsedCookie = parse(cookie);
    let options: { path: string; expires?: Date } = {
      path: '/',
    };
    let name: string, value: string;
    for (let key in parsedCookie) {
      switch (key) {
        case 'Path':
          options.path = parsedCookie['Path']!;
          break;
        case 'Expires':
          options.expires = new Date(parsedCookie['Expires']!);
          break;
        default:
          name = key;
          value = parsedCookie[key]!;
          break;
      }
    }
    cookies.set(name!, value!, options);
  });

  return { env, user };
}
