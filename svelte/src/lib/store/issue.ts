import { writable } from "svelte/store";

type Issue = {
  issueId?: number;
  userId?: number;
  title?: string;
  issueSections?: Array<IssueSection>;
}

const writableIssues = writable<Array<Issue>>()

let issues: Array<Issue>;

writableIssues.subscribe((value) => {
  issues = value;
})

export { writableIssues, issues }
