import { error } from "@sveltejs/kit";

export async function load({ params }) {
  console.log('this is page.js');
  // error(404, 'error')
}
