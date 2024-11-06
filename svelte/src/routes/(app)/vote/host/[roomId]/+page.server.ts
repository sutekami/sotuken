export async function load({ cookies, params }) {
  cookies.set('room_id', params.roomId, { path: '/' });
  return {
    roomId: params.roomId,
  };
}
