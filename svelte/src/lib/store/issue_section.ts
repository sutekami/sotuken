import { writable } from "svelte/store"
import type { IssueSectionalOptionType } from "./issue_sectional_option";

export type IssueSectionType = {
  issueSectionId?: number | string;
  issueId?: number;
  type?: string;
  title?: string;
  issueSectionalOptions?: Array<IssueSectionalOptionType>;
}

function createIssueSection() {
  const { subscribe, set, update } = writable<IssueSectionType>({});

  return {
    subscribe,
    updateIssueSection: (params: IssueSectionType) => update((v) => {
      return {
        issueSectionId: params.issueSectionId || v.issueSectionId,
        issueId: params.issueId || v.issueId,
        type: params.type || v.type,
        title: params.title || v.title,
        issueSectionalOptions: params.issueSectionalOptions || v.issueSectionalOptions,
      }
    }),
    reset: () => set({}),
  }
}

function createIssueSections() {
  const { subscribe, set, update } = writable<Array<IssueSectionType>>([]);

  return {
    subscribe,
    updateIssueSections: (params: Array<IssueSectionType>) => update(() => params),
    reset: () => set([]),
  }
}

export const issueSection = createIssueSection();
export const issueSections = createIssueSections();
