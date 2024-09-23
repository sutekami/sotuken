<!-- meta data! -->
<svelte:head>
  <title>Vote App</title>
</svelte:head>

<header class="header">
  <nav class="nav">
    <li><a href="/">Home</a></li>
    <li><a href="/new-issue">New Issue</a></li>
    <li><a href="/signin">Sign In</a></li>
    <li><a href="/vote">vote</a></li>
  </nav>
</header>

<slot></slot>

<style lang="scss">
  .header {
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;

    .nav {
      width: auto;
      display: flex;
      list-style-type: none;
      gap: 16px;
    }
  }
</style>
