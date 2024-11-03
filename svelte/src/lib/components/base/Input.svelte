<script lang="ts">
  // initialize
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{
    input: string;
  }>();
  //

  // props
  export let placeholder: string = '';
  export let value: string = '';
  export let sm: boolean = false;
  // props

  function handleInputDispatcher(v: EventElements): void {
    value = v.currentTarget.value;
    dispatch('input', value);
  }
</script>

<input class="base-input {sm ? 'sm' : ''}" type="text" {placeholder} {value} on:input={handleInputDispatcher} />

<style lang="scss">
  .base-input {
    & {
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 10px 18px;
      background-color: #f9f9f9;
      color: #444;
      width: 100%;
      font-size: 15px;
      transition:
        background-color 0.3s,
        border-color 0.3s;
    }
    &:focus {
      background-color: #fff;
      border-color: #aaa;
      outline: none;
    }
  }

  .sm {
    padding: 3px 6px;
    font-size: 13px;
  }
</style>
