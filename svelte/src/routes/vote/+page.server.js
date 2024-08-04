import { error } from '@sveltejs/kit';
import { session } from '$lib/client/session/index.js';

export async function load({ params, cookies }) {
  const res = await session(cookies.get("_session_id"));
  if (res.ok) return { user: await res.json() }
  else error(403, "ログインをしてください")
}
