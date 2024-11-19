import { writable } from 'svelte/store';

export type ConfigType = {
  availableHeaderMenu: boolean;
};

const createConfig = () => {
  const { subscribe, set, update } = writable<ConfigType>({ availableHeaderMenu: true });

  return {
    subscribe,
    updateConfig: (params: ConfigType) =>
      update(v => ({
        availableHeaderMenu: params.availableHeaderMenu,
      })),
    reset: () => set({ availableHeaderMenu: true }),
  };
};

export const storeConfig = createConfig();
