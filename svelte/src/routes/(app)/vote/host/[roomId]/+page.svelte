<script lang="ts">
  import { user } from "$lib/store/user.js";
  import { io } from "socket.io-client";
  import { onMount } from "svelte";
  import { issues } from "$lib/store/issue.ts";
  import { page } from "$app/stores";
  import Menu from './Menu.svelte';

  const socket = io(`ws://localhost:${$page.data.env.SERVER_PORT}`)

  export let data;
  let inVoting: boolean;
  let inResult: boolean;

  const { roomId, sessionId } = data;

  onMount(async () => {
    socket.emit('host:connect', roomId, sessionId, $user.userId);
  });

  socket.on('host:receive_value', v => {
    console.log(v);
    inVoting = v.inVoting ?? inVoting;
    inResult = v.inResult ?? inResult;
    issues.updateIssues(v.issues);
  })

  async function copy() {
    const writeText = `localhost:${$page.data.env.CLIENT_PORT}/vote/guest/${data.roomId}`;
    navigator.clipboard.writeText(writeText);
  }
</script>

<div class="vote-host-page">
  {#if inVoting}

  {:else if inResult}
  {:else}
  <div class="home">
    <Menu
      roomId={roomId}
      on:copy={copy}
    />
  </div>
  {/if}
</div>

<style lang="scss">
.vote-host-page {
  & {
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
































<!-- <script lang="ts">
  import { onMount } from "svelte";
  import { issues } from "$lib/store/issue";
  import { issueSection } from "$lib/store/issue_section";
  import Menu from "./Menu.svelte";

  export let data;
  let selectedIssueId: number;
  let inProgress: boolean = false;
  let isResult: boolean = false;
  let voteStatus: any[] = [];


  onMount(async () => {
    issues.updateIssues(data.issues);
    socket.emit('hostJoinVoteRoom', data.roomId, data.sessionId);
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

  socket.on('voteResult', arg => {
    isResult = true;
  });

  socket.on('voteStatus', arg => {
    voteStatus = Object.values(arg);
  });

  socket.on('sendIssueSection', arg => {
    issueSection.updateIssueSection(arg);
  });

  function selectIssue(event: CustomEvent<any>) {
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

  function handleNextVote() {
    socket.emit('nextVote', data.roomId);
    isResult = false;
  }

  function debug() {
    socket.emit('debug', data.roomId);
  };
</script>

<button on:click={debug}>debug</button>
{#if inProgress}
  <button on:click={resetStart}>reset start</button>
  <button on:click={reset}>simple reset</button>
  {#if isResult}
    <div>
      <button on:click={handleNextVote}>next vote</button>
    </div>
    {#each voteStatus as status}
      <p>{status.guestUserName}: {$issueSection.issueSectionalOptions?.find(v => v.issueSectionalOptionId === status.optionId)?.body}</p>
    {/each}
  {/if}
{:else}
  <Menu
    bind:data={data}
    on:selected={selectIssue}
    on:copy={copy}
    on:start={start}
    on:debug={debug}
  />
{/if}

 -->
