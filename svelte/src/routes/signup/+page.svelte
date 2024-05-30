<script lang="ts">
  import api from "$lib/api";
  import toastr from "$lib/utils/toastr";
  import Input from "$lib/components/Input.svelte";
  import Form from "$lib/components/Form.svelte";
  import Button from "$lib/components/Button.svelte";

  let name: string, email: string, password: string;

  const handleSave = async () => {
    const params = { name, email, password };
    await api.signup.create({ params })
      // .then(() => {
      //   location.href = "/mypage"
      // })
      // .catch((data) => {
      //   toastr.handleError(data.response.data.err);
      // });
  }
</script>

<div class="form">
  <Form title="サインアップ" on:save={handleSave} --width-px="700px">
    <Input title="ユーザー名" bind:value={name} />
    <Input title="メールアドレス" type="email" bind:value={email} />
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
