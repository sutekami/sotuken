import { apiHandler } from '$lib/client/index.js';

export async function POST({ params, cookies, request }) {
  return await apiHandler({
    uri: `/vote/guest/${params.roomId}`,
    method: 'POST',
    to: 'server',
    cookies,
    body: await request.json(),
  });
}
