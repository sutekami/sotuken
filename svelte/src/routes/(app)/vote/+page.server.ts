import { apiHandler } from '$lib/client';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  const res = await apiHandler({
    uri: '/session',
    method: 'GET',
    cookies,
    to: 'server',
  });

  if (res.status !== 200) redirect(302, '/signin');
}
