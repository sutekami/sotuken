<script lang="ts">
  // initialize
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // props
  export let name: string = "name";
  export let id: string | number;
  export let selectedValue: string | number;
  export let value: string | number;

  function handleClickDispatch(e: CustomEvent) {
    dispatch('click', e);
  }
</script>

<input
  type="radio"
  name={name}
  id={`${id}`}
  value={value}
  bind:group={selectedValue}
  on:click={handleClickDispatch}
>

<style lang="scss"></style>
