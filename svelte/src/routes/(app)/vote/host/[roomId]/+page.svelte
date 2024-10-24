<script lang="ts">
  import { storeUser } from '$lib/store/user.js';
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import { storeIssues } from '$lib/store/issue.ts';
  import { storeIssueSection } from '$lib/store/issue_section';
  import { page } from '$app/stores';
  import Menu from './Menu.svelte';
  import { BaseTable, BaseTableCell, BaseTableRow } from '$lib/components';

  const { env, roomId } = $page.data;

  const socket = io(`ws://localhost:${env.SERVER_PORT}`, {
    withCredentials: true,
  });

  let inVoting: boolean;
  let inResult: boolean;
  let guestUsers: any[] = [];
  let voteStatus: Record<string, number> = {};
  let selectedIssueId: number;

  onMount(async () => {
    const { email, name, userId } = $page.data.user;
    storeUser.updateUser({ email, name, userId });
    socket.emit('host:connect', $storeUser.userId);
  });

  socket.on('host:receive_value', v => {
    inVoting = v.inVoting ?? inVoting;
    inResult = v.inResult ?? inResult;
    guestUsers = [...(v.guestUsers ?? [])];
    voteStatus = v.voteStatus;
    storeIssues.updateIssues(v.issues);
  });

  socket.on('host:receive_issue_section', v => {
    storeIssueSection.updateIssueSection(v);
  });

  const handleClickCopy = async () => {
    const writeText = `localhost:${env.CLIENT_PORT}/vote/guest/${roomId}`;
    navigator.clipboard.writeText(writeText);
  };

  const handleClickEmitStartVote = () => {
    if (!selectedIssueId) return alert('投票するテーマを選択してください');
    socket.emit('host:start_vote', selectedIssueId);
  };

  const handleClickReset = () => {
    location.href = '/vote';
  };

  const handleSelectIssueId = (e: CustomEvent<number>) => {
    selectedIssueId = e.detail;
  };

  const displayGuestAnswer = (sId: string) => {
    const answer = voteStatus[sId];
    const option = $storeIssueSection.issueSectionalOptions?.find(e => e.issueSectionalOptionId === answer);
    return !!option ? option.body : '解答中';
  };
</script>

<div class="vote-host-page">
  <Menu
    on:copy={handleClickCopy}
    on:start={handleClickEmitStartVote}
    on:reset={handleClickReset}
    on:select={handleSelectIssueId}
    {selectedIssueId}
  />
  {#if inVoting}
    <div class="vote">
      <BaseTable>
        <svelte:fragment slot="thead">
          <BaseTableRow>
            <BaseTableCell th>ゲスト名</BaseTableCell>
            <BaseTableCell th>解答結果</BaseTableCell>
          </BaseTableRow>
        </svelte:fragment>
        <svelte:fragment slot="tbody">
          {#each guestUsers as user}
            <BaseTableRow>
              <BaseTableCell td>{user.guestName}</BaseTableCell>
              <BaseTableCell td>{displayGuestAnswer(user.hash)}</BaseTableCell>
            </BaseTableRow>
          {/each}
        </svelte:fragment>
      </BaseTable>
    </div>
  {:else if inResult}
    <div class="result"></div>
  {:else}
    <div class="home">
      <div class="table">
        <BaseTable>
          <svelte:fragment slot="thead">
            <BaseTableRow>
              <BaseTableCell th>ゲスト名</BaseTableCell>
              <BaseTableCell th>sessionId</BaseTableCell>
              <BaseTableCell th>接続中</BaseTableCell>
            </BaseTableRow>
          </svelte:fragment>
          <svelte:fragment slot="tbody">
            {#each guestUsers as guestUser}
              <BaseTableRow>
                <BaseTableCell td>{guestUser.guestName}</BaseTableCell>
                <BaseTableCell td>{guestUser.hash}</BaseTableCell>
                <BaseTableCell td>{guestUser.isActive ? '接続中' : '切断中'}</BaseTableCell>
              </BaseTableRow>
            {/each}
          </svelte:fragment>
        </BaseTable>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .vote-host-page {
    & {
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .table {
      padding: 8px;
      display: flex;
      justify-content: center;
    }
  }
</style>
