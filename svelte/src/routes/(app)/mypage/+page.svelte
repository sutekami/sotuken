<script lang="ts">
  import { storeUser } from '$lib/store/user';
</script>

<h4>実際の投票画面のフローを考える</h4>
<h4>今日やること・マイページに自分が作った問題を表示する</h4>
<h4>行けそうだったら実際にリアルタイム通信で投了できるところまでやってみたい</h4>
<h1>this is mypage</h1>
<h2>name: {$storeUser?.name ?? ''}</h2>

<style></style>
