<script>
  // import { io } from 'socket.io-client';

  // const socket = io('ws://localhost:3000');
  import { count } from "./store";
</script>

<div>{$count}</div>
<button on:click={() => count.update((n) => n + 1)}>+</button>
<style>
</style>
