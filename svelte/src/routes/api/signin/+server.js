import Client from '$lib/client/index.js';

export async function POST({ fetch, request }) {
  const res = await new Client(Client.SERVER, {
    url: '/signin',
    method: 'POST',
    body: JSON.stringify(await request.json()),
  });

  return await fetch(res.request);

  // return res;
}

// import { Req } from '$lib/request/index';

// export async function POST({ fetch, request }) {
//   const body = JSON.stringify(await request.json());
//   const req = Req.signin.POST(body);
//   return await fetch(req);
// }
