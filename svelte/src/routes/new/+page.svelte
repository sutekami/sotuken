<script lang="ts">
  // bind:groupでグルーピングすることができる
  let issueTitle: string;
  let items = [];

  const addItem = () => {
    const value = {
      id: crypto.randomUUID(),
      issueSectionTitle: '',
      issueSectionalOptions: [],
    };
    items = [ ...items, value ];
  }

  const removeItem = (id) => {
    items = items.filter((elem, idx, arr) => elem.id !== id);
  }

  const changeIssueSectionTitle = (event, id) => {
    items = items.map((elem, idx, arr) => {
      if (elem.id === id) return { ...elem, issueSectionTitle: event.target.value };
      return elem;
    })
  }

  const addIssueSectionalOption = (id) => {
    const value = {
      optionId: crypto.randomUUID(),
      title: "",
    }

    items = items.map((elem, idx, arr) => {
      if (elem.id === id) return { ...elem, issueSectionalOptions: [ ...elem.issueSectionalOptions, value ] };
      return elem;
    })
  }

  const removeIssueSelectionalOption = (id, optionId) => {
    items = items.map((elem, idx, arr) => {
      if (elem.id === id) {
        const filteredOptions = elem.issueSectionalOptions.filter((e, i, a) => e.optionId !== optionId)
        return { ...elem, issueSectionalOptions: [ ...filteredOptions ]}
      }
      return elem;
    })
  }
</script>

<label for="issue_title">Issue Title</label>
<textarea id="issue_title" rows="1" cols="33" bind:value={issueTitle}></textarea>
<button on:click={addItem}>add</button>

{#each items as {id, issueSectionalOptions} (id)}
  <div>
    <label for="issue_section_title">問題タイトル・質問タイトル</label>
    <textarea id="issue_section_title" rows="1" cols="33" on:input={(event) => changeIssueSectionTitle(event, id)}></textarea>
    <button on:click={() => addIssueSectionalOption(id)}>addOption</button>
    {#each issueSectionalOptions as {optionId, title} (optionId)}
      <p>id: {optionId}</p>
      <input type="button" on:click={() => removeIssueSelectionalOption(id, optionId)} value="option delete">
    {/each}
    <input type="button" on:click={() => removeItem(id)} value="delete">
  </div>
{:else}
  <p>No tasks today!</p>
{/each}


<style></style>
