import { COOKIE_SESSION_ID, Req } from '$lib/request';
import { error, redirect } from '@sveltejs/kit';

export async function load({ fetch, params, cookies }) {
  const sessionId = cookies.get(COOKIE_SESSION_ID);
  const req = Req.vote.guest.roomId.GET(params.roomId, sessionId);
  const res = await fetch(req);
  const statusCode = res.status;

  if (res.ok)
    return {
      sessionId,
    };

  switch (statusCode) {
    case 400:
    case 403:
      return redirect(302, `/vote/guest?roomId=${params.roomId}`);
    case 404:
      error(statusCode, '部屋が存在しません');
    default:
      error(statusCode, 'サーバーエラーが発生しました');
  }
}
