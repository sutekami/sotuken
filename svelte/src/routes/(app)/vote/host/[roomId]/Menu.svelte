<script lang="ts">
  import { issues } from '$lib/store/issue';
  import { createEventDispatcher } from 'svelte';
  import { BaseButton, BaseRadio } from '$lib/components/index.ts';

  const dispatch = createEventDispatcher();

  let selectedValue = 1;

  function hoge(value: CustomEvent) {
    selectedValue = value.detail.detail;
  }
</script>

<div class="btns">
  <BaseButton hoverColor="_blue" on:click={() => dispatch('copy')}>ゲストユーザーを招待する</BaseButton>
  <BaseButton hoverColor="_purple" on:click={() => dispatch('start')}>投票を始める</BaseButton>
  <BaseButton hoverColor="_indigo" on:click={() => dispatch('debug')}>デバッグ用ボタン</BaseButton>
</div>

{#each $issues || [] as issue}
  <input
    type="radio"
    name="issue"
    bind:value={issue.issueId}
    id="issue_id_{issue.issueId}"
    on:click={e => dispatch('selected', e)}
  />
  <label for="issue_id_{issue.issueId}">{issue.title}</label>
{/each}

<!-- <BaseRadio name="test" value="1" selectedValue={selectedValue} id="1" on:click={hoge} />
<BaseRadio name="test" value="2" selectedValue={selectedValue} id="2" on:click={hoge} />
<BaseRadio name="test" value="3" selectedValue={selectedValue} id="3" on:click={hoge} />
<BaseRadio name="test" value="4" selectedValue={selectedValue} id="4" on:click={hoge} />
<BaseRadio name="test" value="5" selectedValue={selectedValue} id="5" on:click={hoge} /> -->

<style lang="scss">
  .btns {
    display: flex;
    justify-content: space-evenly;
  }
</style>
