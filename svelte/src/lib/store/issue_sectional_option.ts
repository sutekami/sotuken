import { writable } from "svelte/store";

export type IssueSectionalOptionType = {
  issueSectionalOptionId?: number | string;
  issueSectionId?: number | string;
  body?: string;
}

function createIssueSectionalOption() {
  const { subscribe, set, update } = writable<IssueSectionalOptionType>({});

  return {
    subscribe,
    updateUser: (params: IssueSectionalOptionType) => update(() => params),
    reset: () => set({}),
  }
}

function createIssueSectionalOptions() {
  const { subscribe, set, update } = writable<Array<IssueSectionalOptionType>>([]);

  return {
    subscribe,
    updateUser: (params: Array<IssueSectionalOptionType>) => update(() => params),
    reset: () => set([]),
  }
}

export const issueSectionalOption = createIssueSectionalOption();
export const issueSectionalOptions = createIssueSectionalOptions();
