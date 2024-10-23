<script lang="ts">
  // initialize
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{
    click: string;
  }>();

  // props
  export let name: string = 'name';
  export let id: string;
  export let selectedValue: string;
  export let value: string;

  function handleClickDispatch() {
    dispatch('click', value);
  }
</script>

<label class="base-radio" for={id}>
  <input
    class="input-radio"
    type="radio"
    {name}
    {id}
    {value}
    bind:group={selectedValue}
    on:click={handleClickDispatch}
  />
  <span class="radio-mark"></span>
  <label for={id}>
    <slot></slot>
  </label>
</label>

<style lang="scss">
  .base-radio {
    & {
      padding: 10px 18px;
      border: 2px solid #ccc;
      border-radius: 5px;
      background-color: #f9f9f9;
      color: #555;
      font-size: 14px;
      box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      user-select: none;
      transition:
        color 0.3s,
        background-color 0.3s;
    }

    &:hover {
      background-color: #7986cb;
      color: #333;
    }
  }
</style>
