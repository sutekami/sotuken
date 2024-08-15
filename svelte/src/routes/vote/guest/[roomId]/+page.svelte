<script>
  import { io } from "socket.io-client";
  import { onMount } from "svelte";

  export let data;
  let inProgress;

  const socket = io('ws://localhost:3000')

  onMount(() => {
    socket.emit('join_vote_room', data.roomId);
    inProgress = data.voteStatus.inProgress;
  })

  socket.on('receive_room_chat', msg => {console.log(msg)});

  socket.on('receive_start_vote', arg => {
    inProgress = arg.inProgress;
  })
</script>

{#if inProgress}
<p>ここTrue</p>
{:else}
<p>Home画面</p>
{/if}
