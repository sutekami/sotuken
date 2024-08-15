<script>
  import { writableIssues } from "$lib/store/issue";
  import { createEventDispatcher } from "svelte";
  export let data;

  const dispatch = createEventDispatcher();
</script>

<p>this is host page</p>

<h2>
  Click URL: <a href={`/vote/guest/${data.roomId}`}>
    redirect!!!
  </a>
</h2>

<div>
  <input type="button" value="copy invitation" on:click={() => dispatch('copy')}>
  <input type="button" value="start" on:click={() => dispatch('start')}>
</div>

{#if !!$writableIssues}
  {#each $writableIssues as issue}
    <input type="radio" name="issue" bind:value={issue.issueId} id="issue_id_{issue.issueId}" on:click={(e) => dispatch('selected', e)}>
    <label for="issue_id_{issue.issueId}">{ issue.title }</label>
  {/each}
{/if}
