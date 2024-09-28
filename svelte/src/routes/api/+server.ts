import { headers } from '$lib/client/index.js';

export async function GET({ fetch, cookies }) {
  const req = new Request('http://express:3000', {
    headers: headers(cookies.get("_session_id")),
    method: "GET",
  })

  return await fetch(req);
}
