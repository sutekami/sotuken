<script>
  import { io } from "socket.io-client";
  import { onMount } from "svelte";

  export let data;

  const socket = io('ws://localhost:3000')

  onMount(() => {
    socket.emit('create_vote_room', data.roomId)
  })

  socket.on('test', (arg) => {
    console.log(arg);
  })
</script>

<p>this is host page</p>

<h2>
  Click URL: <a href={`/vote/guest/${data.roomId}`}>
    redirect!!!
  </a>
</h2>

