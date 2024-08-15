<script>
  // import { io } from 'socket.io-client';
  import { user } from "$lib/store/user";

  // const socket = io('ws://localhost:3000');
  import { count } from "./store";

  export let data;
  let test = '';

  // // const sendTest = () => {
  // //   socket.emit('test', `${test}`);
  // // }

  // // socket.on('test', (msg) => {
  // //   console.log(msg);
  // }
</script>

<h3>{user.userId}</h3>
<div>{data.message}</div>
<div>{$count}</div>
<textarea bind:value={test}></textarea>
<button on:click={() => count.update((n) => n + 1)}>+</button>
<style>
</style>
