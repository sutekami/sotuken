/** @type {import('@sveltejs/kit').Handle} */

export async function handle({ event, resolve }) {
  const res = await resolve(event);

  return res;
}
