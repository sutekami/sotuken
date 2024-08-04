import { writable, derived } from "svelte/store";

// type
type User = {
  userId: number | null;
  name: string | null;
  email: string | null;
}

// based
const writableUser = writable<User>({
  userId: null,
  name: null,
  email: null,
})

const { subscribe, set, update } = writableUser;

let user: User;
subscribe(value => user = value);

function updateUser({ userId, name, email }) {
  update(user => { return { userId, name, email } });
}

export {
  user,
  updateUser,
};
