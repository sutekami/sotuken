import { session } from "$lib/client/session";
import { redirect } from "@sveltejs/kit";

export async function load({ params, cookies }) {
  const res = await session(cookies.get("_session_id"));
  if (res.ok) redirect(302, '/mypage');
}
