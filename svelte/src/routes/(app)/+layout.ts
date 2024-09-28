export const ssr = false;

export async function load({ fetch, params }) {
  const req = new Request('/api', {
    method: "GET"
  })
  await fetch(req);
}
