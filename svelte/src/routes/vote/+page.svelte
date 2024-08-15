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
    const res = await api.vote.createRoom();
    goto(`vote/host/${res.data.roomId}`);
  }
</script>

<h1>リアルタイム投票ルーム開始ページ</h1>

<button on:click={createRoom}>roomを作成する</button>
