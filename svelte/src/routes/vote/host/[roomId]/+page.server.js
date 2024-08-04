import { headers } from '$lib/client/index.js';
import { session } from '$lib/client/session/index.js';
import { error } from '@sveltejs/kit';

export async function load({ params, cookies }) {
  const s = await session(cookies.get("_session_id"));
  let user;
  if (!s.ok) error(s.status, "ログインしてください")
  else user = await s.json();

  let roomId;
  const fetchCheckRoomId = await checkRoomId({ params, cookies });
  if (!fetchCheckRoomId.ok) error(fetchCheckRoomId.status, "存在しない部屋です")
  roomId = params.roomId;

  const issues = await fetchIssues({ params, cookies, userId: user.userId });
  return {
    issues: await issues.json(),
    roomId: roomId,
  };
}

async function checkRoomId({ params, cookies }) {
  const req = new Request(`http://express:3000/vote/${params.roomId}`, {
    headers: headers(cookies.get("_session_id")),
    method: 'GET',
  });

  return await fetch(req);
}

async function fetchIssues({ params, cookies, userId }) {
  const req = new Request(`http://express:3000/issues/${userId}`, {
    headers: headers(cookies.get("_session_id")),
    method: 'GET',
  });

  return await fetch(req);
}
