<script>
  import { io } from "socket.io-client";
  import { onMount } from "svelte";
  import { BaseInput, BaseButton } from "$lib/components/index.js";
  import { issueSection } from "$lib/store/issue_section";

  export let data;
  let inProgress;
  let isWaitVoteComplate = false;
  let selectedIssueSectionalOptionId;
  let voteResult;
  let guestUserName;

  const socket = io('ws://localhost:3000')

  onMount(() => {
    socket.emit('joinVoteRoom', data.roomId);
    inProgress = data.voteStatus.inProgress;
    if (inProgress) socket.emit('fetchIssueSection', data.roomId);
  })

  socket.on('voteStarted', arg => { inProgress = arg.inProgress;
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
    voteResult = arg.voteStatus;
  });

  function vote() {
    if (!selectedIssueSectionalOptionId) return alert('投票する設問を選択してください');
    socket.emit('vote', data.roomId, selectedIssueSectionalOptionId);
  }

  function handleClickEnterVoteRoom() {
  }
</script>


<div class="vote-guest-page">
{#if inProgress}
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
    {#each $issueSection.issueSectionalOptions || [] as option}
      <p>{option.body}: {voteResult[option.issueSectionalOptionId || ''] || 0}</p>
    {/each}
  {:else if isWaitVoteComplate}
    <p>全員の投票が終わるまでお待ちください…</p>
  {:else}
    <input type="button" value="投票する" on:click={vote}>
  {/if}
<!-- 投票前ゲストユーザー画面 -->
{:else}
  <div class="vote-guest-page-home">
    <div class="label">ユーザー名を入力してください</div>
    <div class="input">
      <BaseInput
        on:input={(v) => guestUserName = v.detail}
      />
      <div class="btn">
        <BaseButton
          value="入室する"
          on:click={handleClickEnterVoteRoom}
        />
      </div>
    </div>
  </div>
{/if}

</div>




<style lang="scss">
.vote-guest-page {
  & {
  }

  &-home {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 1100px;
    height: calc(100vh - 60px);
    .label {
      font-weight: 600;
      padding: 8px;
    }
    .input {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 20vw;
      align-items: center;
      .btn {
        width: auto;
      }
    }
  }
}
</style>
