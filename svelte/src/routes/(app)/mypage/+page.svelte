<script>
  import { user } from "$lib/store/user";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  onMount(() => {
    if ($page.data.user) {
      const { email, name, userId } = $page.data.user;
      user.updateUser({ email, name, userId });
    }
  })
</script>

<h4>実際の投票画面のフローを考える</h4>
<h4>今日やること・マイページに自分が作った問題を表示する</h4>
<h4>行けそうだったら実際にリアルタイム通信で投了できるところまでやってみたい</h4>
<h1>this is mypage</h1>
<h2>name: {$user?.name}</h2>
<h2>email: {$user?.email}</h2>

<style></style>
