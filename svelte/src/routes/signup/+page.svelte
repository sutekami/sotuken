<script context="module">
  import api from "$lib/api";
  import Input from "$lib/components/Input.svelte";
  import Form from "$lib/components/Form.svelte";

  const handleSave = async () => {
    const params = 'teset';
    const res = await api.signup.create({ params });
    console.log(res.data);
  }

  const fetchUsers = async () => {
    const res = await api.signup.index();
    console.log(res.data);
  }
</script>

<script>
  let name, email, password;
</script>

<div class="form">
  <Form title="サインアップ" --width-px="700px">
    <Input title="ユーザー名" bind:value={name} />
    <Input title="メールアドレス" type="email" bind:value={email} />
    <Input title="パスワード" type="password" bind:value={password} />
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
</style>
