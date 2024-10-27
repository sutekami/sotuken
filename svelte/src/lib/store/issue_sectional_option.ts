import { writable } from 'svelte/store';

export type IssueSectionalOptionType = {
  issueSectionalOptionId?: number;
  issueSectionId?: number;
  body?: string;
};

function createIssueSectionalOption() {
  const { subscribe, set, update } = writable<IssueSectionalOptionType>(undefined);

  return {
    subscribe,
    updateUser: (params: IssueSectionalOptionType) => update(() => params),
    reset: () => set({}),
  };
}

function createIssueSectionalOptions() {
  const { subscribe, set, update } = writable<Array<IssueSectionalOptionType>>(undefined);

  return {
    subscribe,
    updateUser: (params: Array<IssueSectionalOptionType>) => update(() => params),
    reset: () => set([]),
  };
}

export const storeissueSectionalOption = createIssueSectionalOption();
export const storeIssueSectionalOptions = createIssueSectionalOptions();
