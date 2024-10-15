<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<tr class="Base-tr">
  <slot></slot>
</tr>

<style lang="scss">
  .Base-tr {
  }
</style>
