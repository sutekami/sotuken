<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let label = 'ボタン';

  const handleSave = () => dispatch('save');
</script>

<button class="btn" on:click={handleSave}>{label}</button>

<style>
  .btn {
  }
</style>
