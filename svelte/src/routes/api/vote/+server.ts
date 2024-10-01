// お試しにfetchで行っているので、もしかしたら他にもheaderを入れる必要あるかもしれない

import { headers } from '$lib/client';

export async function GET({ fetch, cookies }) {
  const req = new Request('http://express:3000/vote', {
    headers: headers(cookies.get("_session_id")),
    method: "GET",
  });
  return await fetch(req);
}

export async function POST({ request }) {
  const params = await request.json();
  const req = new Request('http://express:3000/signin');
  return await fetch(req, {
    body: JSON.stringify(params),
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
}
