<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<table class="Base-table">
  <thead class="thead">
    <slot name="thead"></slot>
  </thead>
  <tbody class="tbody">
    <slot name="tbody" class="tbody"></slot>
  </tbody>
</table>

<style lang="scss">
  .Base-table {
    & {
      border-collapse: collapse;
      border: 2px solid rgb(140 140 140);
      font-size: 0.8rem;
      letter-spacing: 1px;
      width: 100%;
    }

    .thead,
    .tbody {
      // background-color: rgb(228 240 245);
    }
  }
</style>
