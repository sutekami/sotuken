<script>
  import { io } from "socket.io-client";
  import { onMount } from "svelte";
  import { issues } from "$lib/store/issue";
  import Menu from "./Menu.svelte";

  export let data;
  let selectedIssueId;
  let inProgress;

  const socket = io('ws://localhost:3000')

  onMount(async () => {
    issues.updateIssues(data.issues);
    socket.emit('joinVoteRoom', data.roomId)
    inProgress = data.voteStatus.inProgress;
    if (inProgress) socket.emit('fetchIssueSection', data.roomId);
  })

  socket.on('voteStarted', arg => {
    inProgress = arg.inProgress;
    socket.emit('fetchIssueSection', data.roomId);
  })

  socket.on('voteFinished', arg => {
    inProgress = arg.inProgress;
  })

  async function copy() {
    const writeText = `localhost:5000/vote/guest/${data.roomId}`;
    navigator.clipboard.writeText(writeText);
  }

  function selectIssue(event) {
    selectedIssueId = event.detail.currentTarget.value;
  }

  async function start() {
    if (!selectedIssueId) return alert('投票を行う問題・質問を選択してください')
    socket.emit('startVote', data.roomId, selectedIssueId);
  }

  function resetStart() {
    socket.emit('startVote', data.roomId, selectedIssueId);
  }

  function reset() {
    socket.emit('reset', data.roomId);
  }
</script>

{#if inProgress}
  <p>ここTrue</p>
  <button on:click={resetStart}>reset start</button>
  <button on:click={reset}>simple reset</button>
{:else}
  <Menu
    bind:data={data}
    on:selected={selectIssue}
    on:copy={copy}
    on:start={start}
  />
{/if}


