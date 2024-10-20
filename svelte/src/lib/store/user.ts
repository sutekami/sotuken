import { writable } from 'svelte/store';

export type UserType = {
  userId?: number;
  name?: string;
  email?: string;
};

function createUser() {
  const { subscribe, set, update } = writable<UserType>(undefined);

  return {
    subscribe,
    updateUser: (params: UserType) =>
      update(v => {
        return {
          userId: params.userId || v.userId,
          name: params.name || v.name,
          email: params.email || v.email,
        };
      }),
    reset: () => set({}),
  };
}

export const storeUser = createUser();
