<script>
  import api from "$lib/api";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  export let data;

  onMount(() => {
    if (data.user) return;
    goto('/signin')
  })

  async function createRoom() {
    const res = await fetch('/api/vote');
    const roomId = (await res.json()).roomId
    goto(`vote/host/${roomId}`);
  }
</script>

<h1>リアルタイム投票ルーム開始ページ</h1>

<button on:click={createRoom}>roomを作成する</button>
