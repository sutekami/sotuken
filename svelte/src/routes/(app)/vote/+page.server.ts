import { error } from "@sveltejs/kit";
import { COOKIE_SESSION_ID, Req } from "$lib/request/index";

export async function load({ fetch, cookies }) {
  const req = Req.session(cookies.get(COOKIE_SESSION_ID));
  const res = await fetch(req);
  if (res.ok) return { user: await res.json() };
  else error(403, "ログインをしてください");
}
