<script>
  import { io } from "socket.io-client";
  import { onMount } from "svelte";
  // HACK: なぜか$libエイリアスがこれだけ使えない…
  import { writableIssues, issues } from "../../../../lib/store/issue";

  export let data;
  let value;

  const socket = io('ws://localhost:3000')

  onMount(async () => {
    writableIssues.set(data.issues);
    socket.emit('create_vote_room', data.roomId)
  })

  socket.on('test', (arg) => {
    console.log(arg);
  })

  function test() {
    socket.emit('room_chat', data.roomId, value);
  }
</script>

<p>this is host page</p>

<h2>
  Click URL: <a href={`/vote/guest/${data.roomId}`}>
    redirect!!!
  </a>
</h2>

<input type="text" bind:value>
<button on:click={test}>issues test</button>

