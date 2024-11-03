import { writable } from 'svelte/store';

export type UserType = {
  userId?: number;
  name?: string;
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
        };
      }),
    reset: () => set({}),
  };
}

export const storeUser = createUser();
