<script>
  // userの情報を持ってくる時はserver or client側のどちらが良いか
  // svelte.kitでは基本的にデータベースなどからとってくるものは
  // server側でやるのが鉄則なのか？
  // client側は、クライアント側のみで行いたいマウント時の処理を書くのが一般的かも
  // つまり、server側ではclient（svelte）のみの処理では解決できないものを
  // +page.Server.jsに入れる感じかも
  import { writableUser } from "store/user";
  import { get } from 'svelte/store';

  let user = get(writableUser);
</script>
<h1>this is mypage</h1>
<h2>{user.name}</h2>

<style></style>
