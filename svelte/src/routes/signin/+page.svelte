<script lang="ts">
  import { Form, Input, Button } from "$lib/components";
  import api from "$lib/api";
  import { writableUser } from "store/user";

  let name: string, email: string, password: string;
  const handleSave = async () => {
    const params = { name, email, password }
    await api.signin.auth({ params })
      .then((data) => {
        console.log(data);
        console.log(data.headers)
        writableUser.set({
          userId: data.data.userId,
          name: data.data.name,
          email: data.data.email,
        })
      })
      .catch(() => {})
  };
</script>

<div class="form">
  <h1>{$writableUser.name}</h1>
  <Form title="サインイン" on:save={handleSave} --width-px="700px">
    <Input title="ユーザー名" bind:value={name} />
    <Input title="メールアドレス" type="email" bind:value={email} />
    <Input title="パスワード" type="password" bind:value={password} />
    <div class="btn">
      <Button on:save={handleSave} label="登録する" />
    </div>
  </Form>
  <a href="/mypage">mypage</a>
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
