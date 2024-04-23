<script>
  let name = 1, email = 2, password = 3;

  const handleSave = (event) => {
    console.log(event)
  }
</script>

<div>login</div>
<input type="text" placeholder="name" bind:value={name}/>
<input type="text" placeholder="email" bind:value={email}/>
<input type="text" placeholder="password" bind:value={password}/>
<button on:click={handleSave}>submit</button>

<style></style>
