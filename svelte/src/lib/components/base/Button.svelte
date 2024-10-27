<script lang="ts">
  // initialize
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  // initialize

  // props
  export let disabled: boolean = false;
  export let hoverColor: string = '';
  // props

  function handleClickDispatch() {
    dispatch('click');
  }
</script>

<button class="base-button {disabled ? 'disabled' : 'active' + hoverColor}" on:click={handleClickDispatch}>
  <slot></slot>
</button>

<style lang="scss">
  .base-button {
    & {
      width: 100%;
      border: 2px solid #ccc;
      border-radius: 25px;
      padding: 10px 18px;
      background-color: #f9f9f9;
      color: #555;
      font-size: 14px;
      box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition:
        background-color 0.3s,
        border-color 0.3s,
        color 0.3s;
      &.disabled {
        cursor: not-allowed;
      }
      &.active {
        & {
          &:hover {
            background-color: #98fb98;
            color: #333;
          }
        }
        &_blue {
          &:hover {
            background-color: aqua;
            color: #333;
          }
        }
        &_red {
          &:hover {
            background-color: #e57373;
            color: #333;
          }
        }
        &_orange {
          &:hover {
            background-color: #ffb74d;
            color: #333;
          }
        }
        &_yellow {
          &:hover {
            background-color: #fff176;
            color: #333;
          }
        }
        &_indigo {
          &:hover {
            background-color: #7986cb;
            color: #333;
          }
        }
        &_purple {
          &:hover {
            background-color: #ba68c8;
            color: #333;
          }
        }
        &:active {
          background-color: #ddd;
          box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
</style>
