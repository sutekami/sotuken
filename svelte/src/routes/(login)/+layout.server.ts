import { COOKIE_SESSION_ID, Req } from "$lib/request/index.js";
import { redirect } from "@sveltejs/kit";

export async function load({ fetch, cookies }) {
  const req = Req.session(cookies.get(COOKIE_SESSION_ID));
  const res = await fetch(req);
  if (res.ok) redirect(302, "/mypage");
}
