import { apiHandler } from '$lib/client/index.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  const res = await apiHandler({
    uri: '/session',
    to: 'server',
    method: 'GET',
    cookies,
  });
  if (res.ok) redirect(302, '/mypage');
}
