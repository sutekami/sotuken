<script lang="ts">
  import { Form, Input, Button } from "$lib/components";
  import api from "$lib/api";
  import { writableUser } from "$lib/store/user";

  let email: string, password: string;
  const handleSave = async () => {
    const params = { email, password }
    await api.signin.auth({ params })
      .then((data) => {
        writableUser.set({
          userId: data.data.userId,
          name: data.data.name,
          email: data.data.email,
        });
        location.href = "/mypage";
      })
      .catch(() => {})
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
