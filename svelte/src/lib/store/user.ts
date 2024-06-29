import { get, readonly, writable } from "svelte/store";

type User = {
  userId: number | null;
  name: string | null;
  email: string | null;
}

const writableUser = writable<User>({
  userId: null,
  name: null,
  email: null,
})

let user: User;

writableUser.subscribe((value) => {
  user = value;
})

export { writableUser, user };
