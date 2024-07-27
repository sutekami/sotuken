<script>
  import { io } from "socket.io-client";
  import { onMount } from "svelte";

  export let data;

  const socket = io('ws://localhost:3000')

  onMount(() => {
    socket.emit('join_vote_room', data.roomId);
  })

  socket.on('test', (arg) => {
    console.log(arg);
  })
</script>

<h2>this is guest page!!</h2>
