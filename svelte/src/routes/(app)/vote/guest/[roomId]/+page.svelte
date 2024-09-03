<script>
  import { io } from "socket.io-client";
  import { onMount } from "svelte";
  import { issueSection } from "$lib/store/issue_section";

  export let data;
  let inProgress;
  let isWaitVoteComplate = false;
  let selectedIssueSectionalOptionId;
  let voteResult;

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
    isWaitVoteComplate = false;
    selectedIssueSectionalOptionId = null;
    voteResult = null;
    issueSection.updateIssueSection(arg)
  })

  socket.on('voteFinished', arg => {
    inProgress = arg.inProgress;
  })

  socket.on('waitVoteComplate', () => {
    isWaitVoteComplate = true;
  });

  socket.on('voteResult', arg => {
    voteResult = Object.entries(arg.voteStatus);
  });

  function vote() {
    if (!selectedIssueSectionalOptionId) return alert('投票する設問を選択してください');
    socket.emit('vote', data.roomId, selectedIssueSectionalOptionId);
  }

  function handleNextVote() {
    socket.emit('nextVote', data.roomId);
  }
</script>
{#if inProgress}
  <p>ここTrue</p>
  <p>{$issueSection.title}</p>
  {#each $issueSection.issueSectionalOptions || [] as option}
    <input
      type="radio"
      name="issue-sectional-option_{$issueSection.issueSectionId}"
      id="{(option.issueSectionalOptionId || "").toString()}"
      value="{option.issueSectionalOptionId}"
      bind:group={selectedIssueSectionalOptionId}
    >

    <label for="{(option.issueSectionalOptionId || "").toString()}">{option.body}</label>
  {/each}
  {#if voteResult}
    {#each voteResult as [id, count]}
      <p>{$issueSection.issueSectionalOptions.find(v => v.issueSectionalOptionId === parseInt(id)).body}: {count}</p>
    {/each}
    <div>
      <button on:click={handleNextVote}>次の投票を行う</button>
    </div>
  {:else if isWaitVoteComplate}
    <p>全員の投票が終わるまでお待ちください…</p>
  {:else}
    <input type="button" value="投票する" on:click={vote}>
  {/if}
{:else}
  <p>Home画面</p>
{/if}
