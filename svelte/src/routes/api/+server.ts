import { COOKIE_SESSION_ID, Req } from '$lib/request/index';

export async function GET({ fetch, cookies }) {
  const req = Req.root(cookies.get(COOKIE_SESSION_ID));
  return await fetch(req);
}
