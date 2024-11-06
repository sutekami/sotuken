/** @type {import('@sveltejs/kit').Handle} */

export async function handle({ event, resolve }) {
  console.log(event);
  const res = await resolve(event);

  return res;
}
