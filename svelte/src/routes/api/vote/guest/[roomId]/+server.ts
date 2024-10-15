import { COOKIE_SESSION_ID, Req } from '$lib/request/index.js';

export async function POST({ fetch, params, cookies, request }) {
  const sessionId = cookies.get(COOKIE_SESSION_ID);
  const bodyParams = JSON.stringify(await request.json());
  const req = Req.vote.guest.roomId.POST(params.roomId, bodyParams, sessionId);
  return await fetch(req);
}
