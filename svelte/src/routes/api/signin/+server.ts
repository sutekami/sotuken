import { apiHandler } from '$lib/client/index.js';

export async function POST({ request, cookies }) {
  const res = apiHandler({
    uri: '/signin',
    to: 'server',
    cookies,
    method: 'POST',
    body: await request.json(),
  });

  return res;
}
