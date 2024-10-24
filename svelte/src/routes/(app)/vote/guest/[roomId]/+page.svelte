<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { io } from 'socket.io-client';
  import { storeIssueSection } from '$lib/store/issue_section';
  import { BaseButton, BaseRadio } from '$lib/components';

  const socket = io(`ws://localhost:${$page.data.env.SERVER_PORT}`, {
    withCredentials: true,
  });
  let guestName: string;
  let inVoting: boolean;
  let inResult: boolean;
  let selectedOptionId: number;

  socket.on('guest:receive_value', v => {
    guestName = v.guestUsers?.find(e => e.hash === $page.data.sessionId)?.guestName;
    inVoting = v.inVoting;
    inResult = v.inResult;
  });

  socket.on('guest:receive_issue_section', v => {
    storeIssueSection.updateIssueSection(v);
  });

  onMount(async () => {
    socket.emit('guest:connect', $page.params.roomId);
  });

  const handleClickSelectOptionId = (e: CustomEvent<string>) => {
    selectedOptionId = parseInt(e.detail);
  };

  const handleClickSubmit = () => {
    socket.emit('guest:vote', selectedOptionId);
  };
</script>

<div class="vote-guest-page-room">
  <p>ユーザー名：{guestName}</p>
  <div class="content">
    {#if inVoting}
      <div class="in-voting">
        <div class="vote">
          <div class="title">{$storeIssueSection.title}</div>
          <div class="section">
            {#each $storeIssueSection.issueSectionalOptions ?? [] as option}
              <BaseRadio
                name="vote-issue-sectional-option"
                value={`${option.issueSectionalOptionId}`}
                id={`${option.issueSectionalOptionId}`}
                selectedValue={`${selectedOptionId}`}
                on:click={handleClickSelectOptionId}
              >
                {option.body}
              </BaseRadio>
            {/each}
          </div>
          <div class="submit">
            <BaseButton on:click={handleClickSubmit} disabled={!selectedOptionId}>投票する</BaseButton>
          </div>
        </div>
      </div>
    {:else}
      <p>待機画面</p>
    {/if}
  </div>
</div>

<style lang="scss">
  .vote-guest-page-room {
    & {
    }

    .content {
      & {
        margin: 0 auto;
        max-width: 1100px;
        display: flex;
        justify-content: center;
      }

      .vote {
        .title {
          padding: 8px 0;
          font-size: 20px;
        }
        .section {
          padding: 8px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .submit {
          padding: 8px 0;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
</style>
