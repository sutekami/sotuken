<script lang="ts">
  import { storeUser } from '$lib/store/user.js';
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import { storeIssues } from '$lib/store/issue.ts';
  import { storeIssueSection } from '$lib/store/issue_section';
  import { page } from '$app/stores';
  import { BaseButton, BaseRadio, BaseTable, BaseTableCell, BaseTableRow } from '$lib/components';
  import Chart from 'chart.js/auto';
  import type { IssueSectionalOptionType } from '$lib/store/issue_sectional_option';
  import { browser } from '$app/environment';
  import QRCode from 'qrcode';
  const { SERVER_PORT, CLIENT_PORT, DOMAIN_NAME, roomId } = $page.data;

  const socket = io(`http://${DOMAIN_NAME}:${SERVER_PORT}`, {
    withCredentials: true,
  });

  let inVoting: boolean;
  let inResult: boolean;
  let guestUsers: any[] = [];
  let voteStatus: Record<string, number> = {};
  let selectedIssueId: number;
  let isAbleDisclose: boolean = false;
  let myChart: Chart;
  let canvasCtx: HTMLCanvasElement;
  let qrCodeCanvasCtx: HTMLCanvasElement;

  onMount(async () => {
    const { name, userId } = $page.data.user;
    storeUser.updateUser({ name, userId });
    socket.emit('host:connect', $storeUser.userId);
    QRCode.toCanvas(qrCodeCanvasCtx, inviteGuestURL(), {});
  });

  socket.on('host:receive_value', v => {
    inVoting = v.inVoting ?? inVoting;
    inResult = v.inResult ?? inResult;
    guestUsers = [...(v.guestUsers ?? [])];
    voteStatus = v.voteStatus ?? {};
    storeIssues.updateIssues(v.issues);
    handleSocketOnIsAbleDisclose();
  });

  socket.on('host:receive_issue_section', v => {
    storeIssueSection.updateIssueSection(v);
  });

  const inviteGuestURL = () => {
    if (!browser) {
      return '';
    }
    return `${location.protocol}//${location.hostname}:${CLIENT_PORT}/vote/guest/${roomId}`;
  };

  const handleClickEmitStartVote = () => {
    if (!selectedIssueId) return alert('投票するテーマを選択してください');
    socket.emit('host:start_vote', selectedIssueId);
  };

  const displayGuestAnswer = (sId: string) => {
    const answer = voteStatus[sId];
    const option = $storeIssueSection.issueSectionalOptions?.find(e => e.issueSectionalOptionId === answer);
    return !!option ? option.body : '回答中';
  };

  const handleSocketOnIsAbleDisclose = () => {
    let count = 0;
    for (let _ in voteStatus) {
      count++;
    }
    isAbleDisclose = count === guestUsers.length;
  };

  const handleClickEmitResult = () => {
    if (!confirm('投票を終了し、ゲストに結果を表示します。よろしいですか？')) return;
    socket.emit('host:result');
  };

  const handleClickEmitNextVote = () => {
    socket.emit('host:next_vote');
  };

  const drawVoteResultGraph = async (options?: IssueSectionalOptionType[]) => {
    if (!options) return;

    const data: Record<number, number> = {};

    for (let i in voteStatus) {
      data[voteStatus[i]] = (data[voteStatus[i]] ?? 0) + 1;
    }

    myChart?.destroy();

    myChart = new Chart(canvasCtx, {
      type: 'bar',
      options: {
        animation: false,
      },
      data: {
        labels: options.map(opt => opt.body),
        datasets: [
          {
            label: '投票結果',
            data: options.map(opt => {
              const optId = opt.issueSectionalOptionId ?? 0;
              return data[optId];
            }),
          },
        ],
      },
    });
  };

  $: {
    if (!!canvasCtx && inResult) {
      drawVoteResultGraph($storeIssueSection.issueSectionalOptions);
    }
  }
</script>

<div class="vote-host-page">
  {#if inVoting}
    <div class="vote">
      <div class="btn">
        <BaseButton disabled={!isAbleDisclose} on:click={handleClickEmitResult}>
          {isAbleDisclose ? 'ゲストに結果を表示する' : '全員の投票が終わるまでお待ちください'}
        </BaseButton>
      </div>
      <BaseTable>
        <svelte:fragment slot="thead">
          <BaseTableRow>
            <BaseTableCell th>ゲスト名</BaseTableCell>
            <BaseTableCell th>解答結果</BaseTableCell>
          </BaseTableRow>
        </svelte:fragment>
        <svelte:fragment slot="tbody">
          {#each guestUsers.filter(user => user.isActive) as user}
            <BaseTableRow>
              <BaseTableCell td>{user.guestName}</BaseTableCell>
              <BaseTableCell td>{displayGuestAnswer(user.hash)}</BaseTableCell>
            </BaseTableRow>
          {/each}
        </svelte:fragment>
      </BaseTable>
      {#if inResult}
        <canvas bind:this={canvasCtx} />
        <div class="btn">
          <BaseButton on:click={handleClickEmitNextVote}>次の投票へ移る</BaseButton>
        </div>
      {/if}
    </div>
  {:else}
    <div class="home">
      <div class="menu">
        <h5>招待コード</h5>
        <canvas bind:this={qrCodeCanvasCtx}></canvas>
        <div class="content">{inviteGuestURL()}</div>
        <BaseButton on:click={handleClickEmitStartVote}>投票を始める</BaseButton>
      </div>
      <div class="issues">
        {#each $storeIssues ?? [] as issue}
          <BaseRadio
            name="issue"
            value={`${issue.issueId}`}
            id="issue_id_{issue.issueId}"
            on:click={e => (selectedIssueId = parseInt(e.detail))}
            selectedValue={`${selectedIssueId}`}
          >
            {issue.title}
          </BaseRadio>
        {/each}
      </div>
      <div class="table">
        <BaseTable>
          <svelte:fragment slot="thead">
            <BaseTableRow>
              <BaseTableCell th>ゲスト名</BaseTableCell>
              <BaseTableCell th>接続中</BaseTableCell>
            </BaseTableRow>
          </svelte:fragment>
          <svelte:fragment slot="tbody">
            {#each guestUsers as guestUser}
              <BaseTableRow>
                <BaseTableCell td>{guestUser.guestName}</BaseTableCell>
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
    .vote {
      & {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .btn {
        min-width: 50%;
      }
      .table {
        padding: 8px;
        display: flex;
        justify-content: center;
      }
    }
    .home {
      .menu {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 8px;
        h5 {
          margin: 0;
        }
        .content {
          background-color: antiquewhite;
          padding: 10px;
          font-size: 11px;
          text-align: center;
        }
      }
      .issues {
        padding: 20px 0;
      }

      .table {
        padding: 20px 0;
      }
    }
  }
</style>
