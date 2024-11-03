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
  if (res.ok) user = await res.json();

  return { env, user };
}
