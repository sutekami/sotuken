<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { io } from 'socket.io-client';
  import { storeIssueSection } from '$lib/store/issue_section';
  import { BaseButton, BaseRadio, BaseTable, BaseTableCell, BaseTableRow } from '$lib/components';
  import Chart from 'chart.js/auto';
  import type { IssueSectionalOptionType } from '$lib/store/issue_sectional_option';
  import { storeConfig } from '$lib/store/config.js';
  export let data;

  const socket = io(`http://${data.DOMAIN_NAME}:${data.SERVER_PORT}`, {
    withCredentials: true,
  });
  let guestName: string;
  let inVoting: boolean;
  let inResult: boolean;
  let guestUsers: any[] = [];
  let voteStatus: Record<string, number> = {};
  let selectedOptionId: number;
  let myChart: Chart;
  let canvasCtx: HTMLCanvasElement;

  socket.on('guest:receive_value', (v, callback) => {
    callback();
    guestName = v.guestUsers?.find(e => e.hash === $page.data.sessionId)?.guestName;
    inVoting = v.inVoting;
    inResult = v.inResult;
    guestUsers = [...(v.guestUsers ?? [])];
    voteStatus = v.voteStatus ?? {};
  });

  socket.on('guest:receive_issue_section', v => {
    storeIssueSection.updateIssueSection(v);
  });

  onMount(async () => {
    storeConfig.updateConfig({ availableHeaderMenu: false });
    socket.emit('guest:connect', $page.params.roomId);
  });

  const handleClickSelectOptionId = (e: CustomEvent<string>) => {
    selectedOptionId = parseInt(e.detail);
  };

  const handleClickSubmit = () => {
    socket.emit('guest:vote', selectedOptionId);
  };

  const displayGuestAnswer = (status: Record<string, number>) => {
    const answeredIssueSectinalOptionId = status[data.SESSION_ID ?? ''];
    if (!answeredIssueSectinalOptionId) {
      return '未回答';
    }
    const option = $storeIssueSection.issueSectionalOptions?.find(
      e => e.issueSectionalOptionId === answeredIssueSectinalOptionId,
    );
    return !!option ? option.body : '未回答';
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
        labels: options.map(opt => opt.body?.substring(0, 10) + '...'),
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

<div class="vote-guest-page-room">
  <p>自分のユーザー名：{guestName}</p>
  <div class="content">
    {#if inVoting}
      {#if inResult}
        <canvas bind:this={canvasCtx} />
      {:else}
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
            <div class="answer" style="text-align: center;">
              回答状況：{displayGuestAnswer(voteStatus)}
            </div>
          </div>
        </div>
      {/if}
    {:else}
      <div class="block">
        <p style="text-align: center;">待機画面</p>
        <div class="table">
          <BaseTable>
            <svelte:fragment slot="thead">
              <BaseTableRow>
                <BaseTableCell th>参加者</BaseTableCell>
              </BaseTableRow>
            </svelte:fragment>
            <svelte:fragment slot="tbody">
              {#each guestUsers.filter(user => user.isActive) as guestUser}
                <BaseTableRow>
                  <BaseTableCell th>
                    {data.sessionId === guestUser.hash ? guestUser.guestName + '（自分）' : guestUser.guestName}
                  </BaseTableCell>
                </BaseTableRow>
              {/each}
            </svelte:fragment>
          </BaseTable>
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .vote-guest-page-room {
    & {
      max-width: 800px;
      margin: 0 auto;
    }
    .block {
      display: block;
    }
    .table {
      min-width: 150px;
    }
    .content {
      & {
        margin: 0 auto;
        max-width: 550px;
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
