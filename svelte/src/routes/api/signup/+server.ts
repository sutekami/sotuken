import { Req } from "$lib/request/index.ts";

export async function POST({ fetch, request }) {
  const params = JSON.stringify(await request.json());
  const req = Req.signup.POST(params);
  return await fetch(req);
}
