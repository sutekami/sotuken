<script>
  import { io } from "socket.io-client";
  import { onMount } from "svelte";
  import { issueSection } from "$lib/store/issue_section";

  export let data;
  let inProgress;

  const socket = io('ws://localhost:3000')

  onMount(() => {
    socket.emit('joinVoteRoom', data.roomId);
    inProgress = data.voteStatus.inProgress;
    if (inProgress) socket.emit('fetchIssueSection', data.roomId);
  })

  socket.on('voteStarted', arg => {
    inProgress = arg.inProgress;
  })

  socket.on('sendIssueSection', arg => {
    issueSection.updateIssueSection(arg)
  })

  socket.on('voteFinished', arg => {
    inProgress = arg.inProgress;
  })

  function vote() {
    socket.emit('vote', data.roomId);
  }
</script>

{#if inProgress}
  <p>ここTrue</p>
  <p>{$issueSection.title}</p>
  {#each $issueSection.issueSectionalOptions || [] as option}
    <p>{option.body}</p>
  {/each}
  <input type="button" value="投票する" on:click={vote}>
{:else}
  <p>Home画面</p>
{/if}
