<script lang="ts">
  import toastr from '$lib/utils/toastr';
  import Input from '$lib/components/Input.svelte';
  import Form from '$lib/components/Form.svelte';
  import Button from '$lib/components/Button.svelte';
  import { apiHandler } from '$lib/client';

  let name: string, password: string;

  const handleSave = async () => {
    const body = { name, password };
    await apiHandler({
      method: 'POST',
      to: 'api',
      uri: '/signup',
      body,
    })
      .then(() => {
        location.href = '/mypage';
      })
      .catch(data => {
        toastr.handleError(data.response.data.err);
      });
  };
</script>

<div class="form">
  <Form title="サインアップ" on:save={handleSave} --width-px="700px">
    <Input title="ユーザー名" bind:value={name} />
    <Input title="パスワード" type="password" bind:value={password} />
    <div class="btn">
      <Button on:save={handleSave} label="登録する" />
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
