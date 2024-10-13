<script lang="ts">
  import { issues } from "$lib/store/issue";
  import { createEventDispatcher } from "svelte";
  import { BaseButton, BaseRadio } from "$lib/components/index.ts";
  export let roomId;

  const dispatch = createEventDispatcher();

  let selectedValue = 1

  function hoge(value: CustomEvent) {
    selectedValue = value.detail.detail
  }
</script>

<div>
  <BaseButton hoverColor="_blue" label="ゲストユーザーを招待する" on:click={() => dispatch('copy')} />
  <BaseButton hoverColor="_purple" label="投票を始める" on:click={() => dispatch('start')} />
  <BaseButton hoverColor="_indigo" label="デバッグ" on:click={() => dispatch('debug')} />
</div>

{#each $issues || [] as issue}
  <input type="radio" name="issue" bind:value={issue.issueId} id="issue_id_{issue.issueId}" on:click={(e) => dispatch('selected', e)}>
  <label for="issue_id_{issue.issueId}">{ issue.title }</label>
{/each}

<BaseRadio name="test" value="1" selectedValue={selectedValue} id="1" on:click={hoge} />
<BaseRadio name="test" value="2" selectedValue={selectedValue} id="2" on:click={hoge} />
<BaseRadio name="test" value="3" selectedValue={selectedValue} id="3" on:click={hoge} />
<BaseRadio name="test" value="4" selectedValue={selectedValue} id="4" on:click={hoge} />
<BaseRadio name="test" value="5" selectedValue={selectedValue} id="5" on:click={hoge} />
