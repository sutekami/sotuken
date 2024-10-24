<script lang="ts">
  import { storeIssues } from '$lib/store/issue';
  import { createEventDispatcher } from 'svelte';
  import { BaseButton, BaseRadio } from '$lib/components/index.ts';

  const dispatch = createEventDispatcher<{
    copy: null;
    start: null;
    debug: null;
    reset: null;
    select: number;
  }>();

  export let selectedIssueId: number;

  const handleClickRadioButton = (e: CustomEvent<string>) => {
    selectedIssueId = parseInt(e.detail);
  };

  $: {
    dispatch('select', selectedIssueId);
  }
</script>

<div class="btns">
  <BaseButton hoverColor="_blue" on:click={() => dispatch('copy')}>ゲストユーザーを招待する</BaseButton>
  <BaseButton hoverColor="_purple" on:click={() => dispatch('start')}>投票を始める</BaseButton>
  <BaseButton hoverColor="_indigo" on:click={() => dispatch('debug')}>デバッグ用ボタン</BaseButton>
  <BaseButton on:click={() => dispatch('reset')}>リセット</BaseButton>
</div>

<div>
  <div>問題を選択する</div>
  <div class="issues">
    {#each $storeIssues || [] as issue}
      <BaseRadio
        name="issue"
        value={`${issue.issueId}`}
        id="issue_id_{issue.issueId}"
        on:click={handleClickRadioButton}
        selectedValue={`${selectedIssueId}`}
      >
        {issue.title}
      </BaseRadio>
    {/each}
  </div>
</div>

<style lang="scss">
  .btns {
    display: flex;
    justify-content: space-evenly;
  }

  .issues {
    display: flex;
    padding: 10px 0;
    justify-content: space-evenly;
  }
</style>
