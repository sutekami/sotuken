<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { io } from 'socket.io-client';
  import { storeIssueSection } from '$lib/store/issue_section';
  import { BaseButton, BaseRadio } from '$lib/components';
  import Chart from 'chart.js/auto';
  import type { IssueSectionalOptionType } from '$lib/store/issue_sectional_option';
  export let data;

  const socket = io(`ws://${data.DOMAIN_NAME}:${data.SERVER_PORT}`, {
    withCredentials: true,
  });
  let guestName: string;
  let inVoting: boolean;
  let inResult: boolean;
  let voteStatus: Record<string, number> = {};
  let selectedOptionId: number;
  let myChart: Chart;
  let canvasCtx: HTMLCanvasElement;

  socket.on('guest:receive_value', v => {
    guestName = v.guestUsers?.find(e => e.hash === $page.data.sessionId)?.guestName;
    inVoting = v.inVoting;
    inResult = v.inResult;
    voteStatus = v.voteStatus ?? {};
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

<div class="vote-guest-page-room">
  <p>ユーザー名：{guestName}</p>
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
          </div>
        </div>
      {/if}
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
