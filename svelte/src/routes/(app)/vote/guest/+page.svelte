<script lang="ts">
  import { BaseButton, BaseInput } from '$lib/components';
  import { randomGuestNames } from './randomGuestNames';
  import { Req } from '$lib/request';
  import { onMount } from 'svelte';

  let params: URLSearchParams;
  let roomId: string | null;
  let guestName: string = '';

  onMount(() => {
    params = new URLSearchParams(location.search);
    roomId = params.get('roomId');
    guestName = randomGuestNames[Math.floor(Math.random() * randomGuestNames.length)];
  });

  const handleClickEmitGuestConnect = async () => {
    guestName ||= randomGuestNames[Math.floor(Math.random() * randomGuestNames.length)];
    const params = JSON.stringify({
      guestName,
    });
    const req = Req.api.vote.guest.roomId.POST(roomId || '', params);
    await fetch(req).then(() => (location.href = `/vote/guest/${roomId}`));
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
      max-width: 30vw;
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
