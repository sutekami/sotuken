import { COOKIE_SESSION_ID, Req } from '$lib/request/index.js';
import { env } from '$env/dynamic/private';

export async function load({ cookies }) {
  const sessionId = cookies.get(COOKIE_SESSION_ID);

  let user;
  const req = Req.session(cookies.get(COOKIE_SESSION_ID));
  const res = await fetch(req);
  if (res.ok) user = await res.json();

  return { sessionId, env, user };
}
