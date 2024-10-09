<script context="module" lang="ts">

</script>

<script lang="ts">
  import { io } from "socket.io-client";
  import { onMount } from "svelte";

  const socket = io('ws://localhost:3000')

  export let data;
  const { roomId, sessionId, user } = data;

  onMount(async () => {
    socket.emit('host:connect', roomId, sessionId)
  });

  socket.on('host:receive_value', v => {
    console.log(v);
  })
</script>



































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

  async function copy() {
    const writeText = `localhost:5000/vote/guest/${data.roomId}`;
    navigator.clipboard.writeText(writeText);
  }

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
