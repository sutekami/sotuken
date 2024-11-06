import { apiHandler } from '$lib/client/index.ts';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  const res = await apiHandler({
    uri: '/session',
    method: 'GET',
    to: 'server',
    cookies,
  });

  if (res.status !== 200) {
    redirect(302, '/signin');
  }
}
