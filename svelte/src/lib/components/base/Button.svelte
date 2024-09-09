<script lang="ts">
  // initialize
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  // initialize

  // props
  export let value: string = "";
  export let disabled: boolean = false;
  // props

  function handleClickDispatch() {
    dispatch('click');
  }
</script>

<input
  class="base-button {disabled ? 'disabled' : 'active'}"
  type="button"
  bind:value
  on:click={handleClickDispatch}
>

<style lang="scss">
.base-button {
  & {
    border: 2px solid #ccc;
    border-radius: 25px;
    padding: 10px 18px;
    background-color: #f9f9f9;
    color: #555;
    font-size: 16px;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;
    &.disabled {
      cursor: not-allowed;
    }
    &.active {
      &:hover {
        background-color: #98FB98;
        color: #333;
      }
      &:active {
        background-color: #ddd;
        box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>
