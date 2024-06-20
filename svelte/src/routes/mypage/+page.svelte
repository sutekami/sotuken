<script>
  // userの情報を持ってくる時はserver or client側のどちらが良いか
  // svelte.kitでは基本的にデータベースなどからとってくるものは
  // server側でやるのが鉄則なのか？
  // client側は、クライアント側のみで行いたいマウント時の処理を書くのが一般的かも
  // つまり、server側ではclient（svelte）のみの処理では解決できないものを
  // +page.Server.jsに入れる感じかも
  // getはそもそもsubscribeされないから、即時通知されない、即時通知がいいならreadonlyで読み込み専用にする
  import { writableUser } from "$lib/store/user";
  import { get, readonly } from 'svelte/store';

  let user = readonly(writableUser);
</script>
<h1>this is mypage</h1>
<h2>name: {$user.name}</h2>
<h2>email: {$user.email}</h2>

<style></style>
