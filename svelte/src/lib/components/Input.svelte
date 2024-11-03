<script>
  export let title = 'ロータイトル';
  export let type = 'text';
  export let value;
</script>

<div class="Input">
  <div class="title">{title}</div>
  {#if type === 'email'}
    <input type="email" class="input" bind:value />
  {:else if type === 'password'}
    <input type="password" class="input" bind:value />
  {:else}
    <input type="text" class="input" bind:value />
  {/if}
</div>

<style>
  .Input {
    margin: 12px;
  }

  .Input .title {
    font-weight: 600;
  }

  .Input .input {
    width: 100%;
    height: 34px;
    font-size: 20px;
    border: 1px solid #bfbfbf;
  }
</style>
