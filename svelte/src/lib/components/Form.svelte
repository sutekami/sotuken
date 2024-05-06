<script>
  export let title = 'フォームタイトル';
</script>

<div class="form">
  <div class="title">{title}</div>
  <slot></slot>
</div>

<style>
  .form {
    margin: 24px;
    padding: 12px;
    border: 1px solid black;
    width: var(--width-px);
  }

  .title {
    font-size: 20px;
    font-weight: 600;
  }
</style>
