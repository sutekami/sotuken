<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let displaySeconds = 5;


  onMount(async () => setTimeredirectPage());

  async function setTimeredirectPage() {
    if (displaySeconds == 0) return location.href = "/signin";
    new Promise(resolve => setTimeout(() => {
      displaySeconds--;
      setTimeredirectPage();
    }, 1000));
  }
</script>

<h2>Error Status: {$page.status}</h2>
<h3>{$page.error?.message}</h3>
<h4>{displaySeconds}秒で画面が遷移します…</h4>
