<script lang="ts">
  // initialize
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  //

  // props
  export let placeholder: string = '';
  export let value: string = "";
  // props

  function handleInputDispatcher(v: EventElements): void {
    value = v.currentTarget.value;
    dispatch('input', value);
  }
</script>

<input
  class="base-input"
  type="text"
  placeholder={placeholder}
  value={value}
  on:input={handleInputDispatcher}
>

<style lang="scss">
.base-input {
  & {
    border: 2px solid #ccc;
    border-radius: 25px;
    padding: 10px 18px;
    background-color: #f9f9f9;
    color: #444;
    width: 100%;
    font-size: 15px;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, border-color 0.3s;
  }
  &:focus {
    background-color: #fff;
    border-color: #aaa;
    outline: none;
  }
}
</style>
