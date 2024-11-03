<script lang="ts">
  import { apiHandler } from '$lib/client';
  import { Form, Input, Button } from '$lib/components';

  let name: string, password: string;
  const handleSave = async () => {
    const params = { name, password };
    await apiHandler({
      method: 'POST',
      to: 'api',
      uri: '/signin',
      body: params,
    }).then(() => (location.href = '/mypage'));
  };
</script>

<div class="form">
  <Form title="サインイン" --width-px="700px">
    <Input title="メールアドレス" type="name" bind:value={name} />
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
