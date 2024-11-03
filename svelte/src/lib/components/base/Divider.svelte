<script lang="ts">
  export let empty: boolean = false;
</script>

<div class={empty ? `` : 'divider'}></div>

<style lang="scss">
  .divider {
    border: 1px solid #ececec;
  }

  .empty {
    border: 1px hidden;
  }
</style>
