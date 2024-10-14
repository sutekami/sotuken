import { writable } from 'svelte/store';
import type { IssueSectionType } from './issue_section';

export type IssueType = {
  issueId?: number;
  userId?: number;
  title?: string;
  issueSections?: Array<IssueSectionType>;
};

function createIssue() {
  const { subscribe, set, update } = writable<IssueType>(undefined);

  return {
    subscribe,
    updateIssue: (params: IssueType) => update(() => params),
    reset: () => set({}),
  };
}

function createIssues() {
  const { subscribe, set, update } = writable<Array<IssueType>>(undefined);

  return {
    subscribe,
    updateIssues: (params: Array<IssueType>) => update(() => params),
    reset: () => set([]),
  };
}

export const issue = createIssue();
export const issues = createIssues();
