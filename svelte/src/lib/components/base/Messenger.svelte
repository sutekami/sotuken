<script lang="ts">
  import { MessageCircle, ChevronDown, SendHorizontal } from 'lucide-svelte';
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';

  const dispatch = createEventDispatcher<{
    send: string;
  }>();
  let isViewMessage: boolean = false;
  let sendBodyValue: string = '';
  let messages: string[] = [
    'dummy',
    'dummy',
    'dummy',
    'dummy',
    'dummy',
    'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
    // 'dummy',
  ];

  const handleClickToggleOnFocus = () => (isViewMessage = !isViewMessage);

  // const handleClickSendDispatcher = () => dispatch('send', sendBodyValue);
  const handleClickSendDispatcher = () => (messages = [...messages, sendBodyValue]);
</script>

{#if isViewMessage}
  <div class="Messenger-large" transition:scale={{ start: 0.5, duration: 400 }}>
    <div class="icon" on:click={handleClickToggleOnFocus}>
      <ChevronDown size={30} color="#eee" />
    </div>
    <div class="message">
      <div class="body">
        {#each messages as message}
          <div class="content">{message}</div>
        {/each}
      </div>
      <div class="footer">
        <input type="text" class="input" bind:value={sendBodyValue} />
        <div class="footer-icon" on:click={handleClickSendDispatcher}>
          <SendHorizontal color="#666" size={20} style="cursor: pointer" />
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="Messenger-small" on:click={handleClickToggleOnFocus} transition:scale={{ start: 0.5, duration: 400 }}>
    <div class="icon">
      <MessageCircle size={40} color="#eee" />
    </div>
  </div>
{/if}

<style lang="scss">
  .Messenger {
    &-small {
      cursor: pointer;
      padding: 10px;
      bottom: 1rem;
      left: 1rem;
      position: absolute;
      background-color: #7986cb;
      border-radius: 20px;
      transition:
        padding 0.3s,
        background-color 0.3s;
      &:hover {
        padding: 15px;
        background-color: #ba68c8;
      }
    }
    &-large {
      position: absolute;
      padding: 10px;
      bottom: 1rem;
      left: 1rem;
      width: 45vw;
      height: 40vh;
      border: 0.2rem solid #7986cb;
      background-color: #252d52;
      border-radius: 20px;
      .icon {
        position: absolute;
        right: 10px;
        cursor: pointer;
      }
      .message {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .body {
          display: flex;
          flex-flow: column nowrap;
          justify-content: flex-end;
          height: 86%;
          color: #eee;
          overflow-block: scroll;
          .content {
            flex: 0 0 50px;
          }
        }
        .footer {
          height: 8%;
          background-color: #eee;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .input {
            font-family: Hack, monospace;
            width: 90%;
            height: 100%;
            border: none;
            background-color: #eee;
            outline: none;
          }
          &-icon {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
</style>
