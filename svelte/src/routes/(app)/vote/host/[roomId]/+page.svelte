<script lang="ts">
  import { storeUser } from '$lib/store/user.js';
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import { storeIssues } from '$lib/store/issue.ts';
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
  let selectedIssueId: number;

  onMount(async () => {
    const { email, name, userId } = $page.data.user;
    storeUser.updateUser({ email, name, userId });
    socket.emit('host:connect', $storeUser.userId);
  });

  socket.on('host:receive_value', v => {
    console.log(v);
    inVoting = v.inVoting ?? inVoting;
    inResult = v.inResult ?? inResult;
    guestUsers = [...(v.guestUsers ?? [])];
    storeIssues.updateIssues(v.issues);
  });

  const handleClickCopy = async () => {
    const writeText = `localhost:${env.CLIENT_PORT}/vote/guest/${roomId}`;
    navigator.clipboard.writeText(writeText);
  };

  const handleClickEmitStartVote = () => {
    socket.emit('host:start_vote');
  };

  const handleClickReset = () => {
    location.href = '/vote';
  };
</script>

<div class="vote-host-page">
  {#if inVoting}
    <div class="vote"></div>
  {:else if inResult}
    <div class="result"></div>
  {:else}
    <div class="home">
      <Menu on:copy={handleClickCopy} on:start={handleClickEmitStartVote} on:reset={handleClickReset} />
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
