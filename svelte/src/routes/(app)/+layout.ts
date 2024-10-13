import { Req } from "$lib/request/index.js";

export const ssr = false;

export async function load({ fetch }) {
  const req = Req.api.root();
  await fetch(req);
}
