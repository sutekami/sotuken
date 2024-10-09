import { COOKIE_SESSION_ID, Req } from "$lib/request";

export async function POST({ fetch, request, cookies }) {
  const params = JSON.stringify({
    sessionId: cookies.get(COOKIE_SESSION_ID),
    roomId: (await request.json()).roomId,
  });
  const req = Req.vote.roomSession.POST(params, cookies.get(COOKIE_SESSION_ID));
  return fetch(req);
}
