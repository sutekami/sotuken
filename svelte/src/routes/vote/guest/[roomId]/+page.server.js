import { headers } from '$lib/client/index.js';
import { error } from '@sveltejs/kit';

export async function load({ params, cookies }) {
  const fetchCheckRoomId = await checkRoomId({ params, cookies });
  if (!fetchCheckRoomId.ok) error(fetchCheckRoomId.status, "存在しない部屋です")

  return {
    roomId: params.roomId,
    voteStatus: await fetchCheckRoomId.json(),
  };
}

async function checkRoomId({ params, cookies }) {
  const req = new Request(`http://express:3000/vote/${params.roomId}`, {
    headers: headers(cookies.get("_session_id")),
    method: 'GET',
  });

  return await fetch(req);
}
