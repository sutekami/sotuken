<script lang="ts">
  import { BaseButton, BaseInput } from '$lib/components';
  import { randomGuestNames } from './randomGuestNames';
  import { Req } from '$lib/request';
  import { onMount } from 'svelte';
  import { storeConfig } from '$lib/store/config';
  import { apiHandler } from '$lib/client';

  let params: URLSearchParams;
  let roomId: string | null;
  let guestName: string = '';

  onMount(() => {
    storeConfig.updateConfig({ availableHeaderMenu: false });
    params = new URLSearchParams(location.search);
    roomId = params.get('roomId');
    guestName = randomGuestNames[Math.floor(Math.random() * randomGuestNames.length)];
  });

  const handleClickEmitGuestConnect = async () => {
    guestName ||= randomGuestNames[Math.floor(Math.random() * randomGuestNames.length)];
    const res = await apiHandler({
      uri: `/vote/guest/${roomId}`,
      to: 'api',
      method: 'POST',
      body: { guestName },
    });
    if (res.ok) {
      location.href = `/vote/guest/${roomId}`;
    } else {
      throw `${res.statusText}`;
    }
  };
</script>

<div class="vote-guest-page">
  <div>名前</div>
  <div class="input">
    <BaseInput placeholder="名前を入力してください" bind:value={guestName} />
    <div class="btn">
      <BaseButton on:click={handleClickEmitGuestConnect}>入室する</BaseButton>
    </div>
  </div>
</div>

<style lang="scss">
  .vote-guest-page {
    & {
      margin: 0 auto;
      padding: 24px;
      max-width: 1100px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 4px;
    }

    .input {
      width: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;
    }
  }
</style>
