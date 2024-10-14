<script lang="ts">
  // HACK: ここでは、初回アクセス時にsessionIdを持っていなかったユーザーへの回避ページHACK
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  const params = new URLSearchParams(location.search);
  const roomId = params.get('roomId');

  onMount(() => {
    setTimeout(() => {
      if (!!roomId) goto(`/vote/guest/${roomId}`);
      else goto('/');
    }, 1000);
  });
</script>

<h2>読み込み中...</h2>
