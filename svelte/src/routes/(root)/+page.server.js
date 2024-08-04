import { error } from "@sveltejs/kit";

export async function load({ params, cookies }) {
  // こっちは本当にサーバー側で実装されるみたい
  console.log('test from +page.server.js (root)');
  return {
    message: 'test from +page.server.js (root)',
  };
}
