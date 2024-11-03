import { COOKIE_SESSION_ID, Req } from '$lib/request/index.ts';

export async function POST({ fetch, request, cookies }) {
  const body = JSON.stringify(await request.json());
  const sessionId = cookies.get(COOKIE_SESSION_ID);
  const req = Req.new_issue.POST(body, sessionId);
  return await fetch(req);
}
