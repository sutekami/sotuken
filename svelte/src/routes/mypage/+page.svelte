<script>
  import { writableUser } from "store/user";
  import { get } from 'svelte/store';

  let user = get(writableUser);
</script>
<h1>this is mypage</h1>
<h2>{user.name}</h2>
<button on:click={() => writableUser.set({name: 'ddd', email: "ddd"})}>fff</button>
<button on:click={() => { user = get(writableUser)}}>fff</button>


<style></style>
