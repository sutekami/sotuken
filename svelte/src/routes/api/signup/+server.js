import Client from "$lib/client";

export async function POST({ request }) {
  const res = await new Client(Client.SERVER, {
    url: '/signup',
    method: "POST",
    body: JSON.stringify(await request.json()),
  }).fetch();

  return res;
}
