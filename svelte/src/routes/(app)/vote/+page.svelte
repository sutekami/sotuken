<script lang="ts">
  import { user } from "$lib/store/user.js";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { Req } from "$lib/request/index.ts";

  onMount(() => {
    if (!!$user) return;
    goto('/signin')
  })

  async function createRoom() {
    const req = Req.api.vote.GET();
    const res = await fetch(req);
    const roomId = (await res.json()).roomId
    goto(`vote/host/${roomId}`);
  }
</script>

<h1>リアルタイム投票ルーム開始ページ</h1>

<button on:click={createRoom}>roomを作成する</button>
