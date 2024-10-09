import { COOKIE_SESSION_ID, Req } from "$lib/request";

export async function GET({ fetch, cookies, request }) {
  const req = Req.session(cookies.get(COOKIE_SESSION_ID));
  return await fetch(req);
}
