<script lang="ts">
  import { storeUser } from '$lib/store/user.js';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Req } from '$lib/request/index.ts';
  import { page } from '$app/stores';

  onMount(() => {
    if ($page.data.user) {
      const { email, name, userId } = $page.data.user;
      storeUser.updateUser({ email, name, userId });
    } else {
      goto('/signin');
    }
  });

  async function createRoom() {
    const req = Req.api.vote.GET();
    const res = await fetch(req);
    const roomId = (await res.json()).roomId;
    goto(`vote/host/${roomId}`);
  }
</script>

<h1>リアルタイム投票ルーム開始ページ</h1>

<button on:click={createRoom}>roomを作成する</button>
