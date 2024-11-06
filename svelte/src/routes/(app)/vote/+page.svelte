<script lang="ts">
  import { goto } from '$app/navigation';
  import { Req } from '$lib/request/index.ts';

  async function createRoom() {
    const req = Req.api.vote.GET();
    const res = await fetch(req);
    const roomId = (await res.json()).roomId;
    goto(`vote/host/${roomId}`);
  }
</script>

<h1>リアルタイム投票ルーム開始ページ</h1>

<button on:click={createRoom}>roomを作成する</button>
