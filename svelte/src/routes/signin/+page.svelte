<script lang="ts">
  import { Form, Input, Button } from "$lib/components";
  import Client from "$lib/client";

  import { goto } from "$app/navigation";

  let email: string, password: string;
  const handleSave = async () => {
    const params = { email, password }
    const res = await new Client(Client.CLIENT, {
      url: '/api/signin',
      method: "POST",
      body: JSON.stringify(params),
    }).fetch();

    goto('/mypage');
  };
</script>

<div class="form">
  <Form title="サインイン" --width-px="700px">
    <Input title="メールアドレス" type="email" bind:value={email} />
    <Input title="パスワード" type="password" bind:value={password} />
    <div class="btn">
      <Button on:save={handleSave} label="ログインする" />
    </div>
  </Form>
</div>

<style>
  .form {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn {
    display: flex;
    justify-content: center;
  }
</style>
