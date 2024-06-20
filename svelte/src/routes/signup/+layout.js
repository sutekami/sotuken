import { writableUser } from "$lib/store/user";
import { redirect } from "@sveltejs/kit";

export function load() {
  let isUserExists;
  writableUser.subscribe((v) => {
    if (v.email && v.name && v.userId) isUserExists = true;
  })
  if (isUserExists) redirect(302, '/mypage');
}

