<script>
  import { io } from "socket.io-client";
  import { onMount } from "svelte";
  import { writableIssues } from "$lib/store/issue";
  import Menu from "./Menu.svelte";

  export let data;
  let selectedIssueId;
  let inProgress;

  const socket = io('ws://localhost:3000')

  onMount(async () => {
    writableIssues.set(data.issues);
    socket.emit('join_vote_room', data.roomId)
    inProgress = data.voteStatus.inProgress;
    if (inProgress) socket.emit('fetch_issue_section', data.roomId);
  })

  socket.on('test', (arg) => {
    console.log(arg);
  })

  socket.on('receive_start_vote', arg => {
    inProgress = arg.inProgress;
    socket.emit('fetch_issue_section', data.roomId);
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
    socket.emit('start_vote', data.roomId, selectedIssueId);
  }
</script>

{#if inProgress}
  <p>ここTrue</p>
{:else}
  <Menu
    bind:data={data}
    on:selected={selectIssue}
    on:copy={copy}
    on:start={start}
  />
{/if}


