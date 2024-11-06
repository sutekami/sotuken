import { apiHandler } from "$lib/client/index";

export async function POST({ fetch, request, cookies }) {
  return await apiHandler({
    uri: '/signup',
    method: 'POST',
    to: 'server',
    cookies,
    body: (await request.json()),
  })
}
