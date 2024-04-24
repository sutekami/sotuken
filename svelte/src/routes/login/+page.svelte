<script>
  import InputText from "$lib/components/InputText.svelte";

  let name = 1, email = 2, password = 3;

  const handleSave = async () => {
  }
</script>

<!-- <div>login</div>
<input type="text" placeholder="name" bind:value={name}/>
<input type="text" placeholder="email" bind:value={email}/>
<input type="text" placeholder="password" bind:value={password}/>
<button on:click={handleSave}>submit</button> -->

<div class="form">
  <InputText />
</div>

<style></style>
