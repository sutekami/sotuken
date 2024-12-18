import { apiHandler } from '$lib/client/index.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  const res = await apiHandler({
    uri: '/session',
    to: 'server',
    method: 'GET',
    cookies,
  });
  if (res.status === 200) redirect(302, '/mypage');
}
