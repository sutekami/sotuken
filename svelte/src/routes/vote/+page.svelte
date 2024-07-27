<script>
  import api from "$lib/api";
  async function createRoom() {
    const res = await api.vote.createRoom();
    location.href = `vote/host/${res.data.roomId}`
  }
</script>

<h1>リアルタイム投票ルーム開始ページ</h1>

<button on:click={createRoom}>roomを作成する</button>
