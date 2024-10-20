<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { io } from 'socket.io-client';

  const socket = io(`ws://localhost:${$page.data.env.SERVER_PORT}`, {
    withCredentials: true,
  });
  let guestName: string;
  let inVoting: boolean;
  let inResult: boolean;

  socket.on('guest:receive_value', v => {
    console.log(v);
    guestName = v.guestUsers?.find(e => e.hash === $page.data.sessionId)?.guestName;
    inVoting = v.inVoting;
    inResult = v.inResult;
  });

  onMount(async () => {
    socket.emit('guest:connect', $page.params.roomId);
  });
</script>

<div class="vote-guest-page-room">
  <p>ユーザー名：{guestName}</p>
  {#if inVoting}
    <p>投票画面</p>
  {:else}
    <p>待機画面</p>
  {/if}
</div>

<!-- // import { BaseInput, BaseButton } from "$lib/components/index.js";
  // import { issueSection } from "$lib/store/issue_section";
  // import { onMount } from "svelte";

  // export let data;
  // let inVoteRoom = false;
  // let inProgress = false;
  // let isWaitVoteComplate = false;
  // let selectedIssueSectionalOptionId;
  // let voteResult;
  // let guestUserName = '';


  // onMount(() => {
  //   if (data.guestUserName) {
  //     inVoteRoom = true;
  //     guestUserName = data.guestUserName;
  //     socket.emit('guestJoinVoteRoom', data.roomId, data.sessionId, guestUserName);
  //   };
  // })

  // socket.on('successedGuestJoinVoteRoom', () => {
  //   inVoteRoom = true;
  // });

  // socket.on('voteStarted', arg => { inProgress = arg.inProgress })

  // socket.on('sendIssueSection', arg => {
  //   isWaitVoteComplate = false;
  //   selectedIssueSectionalOptionId = null;
  //   voteResult = null;
  //   issueSection.updateIssueSection(arg)
  // })

  // socket.on('voteFinished', arg => {
  //   inProgress = arg.inProgress;
  // })

  // socket.on('waitVoteComplate', () => {
  //   isWaitVoteComplate = true;
  // });

  // socket.on('voteResult', arg => {
  //   voteResult = arg.voteStatus;
  // });

  // function vote() {
  //   if (!selectedIssueSectionalOptionId) return alert('投票する設問を選択してください');
  //   socket.emit('vote', data.roomId, data.sessionId, selectedIssueSectionalOptionId);
  // }

  // function handleClickEnterVoteRoom() {
  //   socket.emit('guestJoinVoteRoom', data.roomId, data.sessionId, guestUserName);
  //   inProgress = data.voteStatus.inProgress;
  //   if (inProgress) socket.emit('fetchIssueSection', data.roomId);
  // }

  // function debug() {
  //   socket.emit('debug', data.roomId);
  // }; -->
<!--
<button on:click={debug}>debug</button>
<div class="vote-guest-page">
  {#if inVoteRoom}
    <p>ユーザー名: {guestUserName}</p>
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
          <p>{option.body}: {(voteResult[option.issueSectionalOptionId] || []).length || 0}</p>
        {/each}
      {:else if isWaitVoteComplate}
        <p>全員の投票が終わるまでお待ちください…</p>
      {:else}
        <input type="button" value="投票する" on:click={vote}>
      {/if}
    {:else}
      <p>home画面</p>
    {/if}
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
-->

<style lang="scss">
  .vote-guest-page {
    & {
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .input {
      & {
        max-width: 1100px;
      }
      &-guest-name {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: 4px;

        &-btn {
          width: auto;
        }
      }
    }
  }
</style>
