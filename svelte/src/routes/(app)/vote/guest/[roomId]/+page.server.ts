import { COOKIE_SESSION_ID } from '$lib/request';
import { redirect } from '@sveltejs/kit';

export async function load({ params, cookies }) {
  const sessionId = cookies.get(COOKIE_SESSION_ID);
  if (!sessionId) redirect(302, `/vote/guest?roomId=${params.roomId}`);
}

// import { error } from "@sveltejs/kit";

// export async function load({ params, cookies }) {
//   const fetchCheckRoomId = await checkRoomId({ params, cookies });
//   if (!fetchCheckRoomId.ok)
//     error(fetchCheckRoomId.status, "存在しない部屋です");

//   const item = await (await getUserName({ params, cookies })).json();

//   return {
//     roomId: params.roomId,
//     voteStatus: await fetchCheckRoomId.json(),
//     sessionId: cookies.get("_session_id"),
//     guestUserName: item.userName,
//   };
// }

// async function checkRoomId({ params, cookies }) {
//   const req = new Request(`http://express:3000/vote/${params.roomId}`, {
//     headers: headers(cookies.get("_session_id")),
//     method: "GET",
//   });

//   return await fetch(req);
// }

// async function getUserName({ params, cookies }) {
//   const req = new Request(`http://express:3000/vote/${params.roomId}/guest`, {
//     headers: headers(cookies.get("_session_id")),
//     method: "GET",
//   });

//   return await fetch(req);
// }
