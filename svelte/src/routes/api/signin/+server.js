import Client from '$lib/client/index.js';

export async function POST({ request }) {
  console.log(request);
  const res = await new Client(Client.SERVER, {
    url: '/signin',
    method: "POST",
    body: JSON.stringify(await request.json()),
  }).fetch()

  return res;
}
