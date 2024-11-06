import { COOKIE_SESSION_ID } from '$lib/request/index.ts';

export async function load({ cookies, params }) {
  cookies.set('room_id', params.roomId, { path: '/' });
  return {
    roomId: params.roomId,
    sessionId: cookies.get(COOKIE_SESSION_ID),
  };
}
