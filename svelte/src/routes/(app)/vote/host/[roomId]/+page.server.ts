import { CLIENT_PORT, DOMAIN_NAME, SERVER_PORT } from '$env/static/private';

export async function load({ cookies, params }) {
  cookies.set('room_id', params.roomId, { path: '/' });
  return {
    roomId: params.roomId,
    SERVER_PORT,
    DOMAIN_NAME,
    CLIENT_PORT,
  };
}
