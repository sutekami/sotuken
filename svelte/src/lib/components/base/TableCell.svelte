<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let th: boolean = false;
  export let td: boolean = false;
</script>

{#if th}
  <th>
    <slot></slot>
  </th>
{:else if td}
  <td>
    <slot></slot>
  </td>
{:else}
  <td>
    <slot></slot>
  </td>
{/if}

<style lang="scss">
  th,
  td {
    border: 1px solid rgb(160 160 160);
    padding: 8px 10px;
    text-align: center;
  }
</style>
