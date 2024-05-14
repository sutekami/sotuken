import { error } from "@sveltejs/kit";

export async function load({ params }) {
  console.log('test from +page.js (root)');
}
