<script lang="ts">
  import api from '$lib/api';
  import { user, writableUser } from '$lib/store/user';

  let issueTitle: string;
  let issueSections: Array<IssueSection> = [];
  let issueSectionalOptions: Array<IssueSectionalOption> = [];

  function addIssueSection() {
    const issueSection: IssueSection = {
      issueSectionId: crypto.randomUUID(),
    }
    issueSections = [ ...issueSections, issueSection ];
  }

  function removeIssueSection(event: EventElements, id?: string | number) {
    issueSections = issueSections.filter((elem) => elem.issueSectionId !== id)
  }

  function changeIssueSectionTitle(event: EventElements, id?: string | number) {
    issueSections = issueSections.map((elem) => {
      if (elem.issueSectionId === id)
        return { ...elem, title: event.currentTarget.value }
      return elem
    })
  }

  function addIssueSectionalOption(event: EventElements, id?: string | number) {
    const issueSectionalOption: IssueSectionalOption = {
      issueSectionalOptionId: crypto.randomUUID(),
      issueSectionId: id,
      body: '',
    }
    issueSectionalOptions = [ ...issueSectionalOptions, issueSectionalOption ];
  }

  function getIssueSectionalOptionsWithSectionId(id?: string | number): Array<IssueSectionalOption> {
    return issueSectionalOptions.filter((elem) => elem.issueSectionId === id);
  }

  function changeIssueSectionalOptionBody(event: EventElements, id?: string | number) {
    issueSectionalOptions = issueSectionalOptions.map((elem) => {
      if (elem.issueSectionalOptionId === id)
        return { ...elem, body: event.currentTarget.value };
      return elem;
    })
  }

  function removeIssueSectionalOption(event: EventElements, id?: string | number) {
    issueSectionalOptions = issueSectionalOptions.filter((elem) => elem.issueSectionalOptionId !== id);
  }

  async function save() {
    const newIssueSections = issueSections.map((elem) => {
      let options = issueSectionalOptions.filter((option) => {
        return option.issueSectionId === elem.issueSectionId
      });
      options = options.map((elem) => { return {body: elem.body} });
      return { title: elem.title, issueSectionalOptions: options };
    })

    const issue = {
      title: issueTitle,
      userId: user.userId,
      issueSections: newIssueSections,
    }

    const params = issue;
    await api.new_issue.create({ params })
  }
</script>

<div>
  <h4>タイトル</h4>
  <input type="text" placeholder="タイトル" bind:value={issueTitle}>
  <input type="button" value="問題・設問を追加する" on:click={addIssueSection}>
</div>

<div>
  <div class="section">
    {#each issueSections as {issueSectionId} (issueSectionId)}
      <h4>問題・設問</h4>
      <input type="text" placeholder="タイトル" on:change={(e) => changeIssueSectionTitle(e, issueSectionId)}>
      <input type="button" value="選択肢を追加" on:click={(e) => addIssueSectionalOption(e, issueSectionId)}>
      <input type="button" value="問題・質問を削除" on:click={(e) => removeIssueSection(e, issueSectionId)}>
      <div class="section">
        {#key issueSectionalOptions}
          {#each getIssueSectionalOptionsWithSectionId(issueSectionId) as {issueSectionalOptionId, body} (issueSectionalOptionId)}
            <h4>選択肢</h4>
            <input type="text" placeholder="選択肢" value={body} on:change={(e) => changeIssueSectionalOptionBody(e, issueSectionalOptionId)}>
            <input type="button" value="選択肢を削除" on:click={(e) => removeIssueSectionalOption(e, issueSectionalOptionId)}>
            {:else}
            <p>選択肢を追加してください</p>
          {/each}
        {/key}
      </div>
    {:else}
      <p>問題・質問を追加してください</p>
    {/each}
  </div>
</div>

<div>
  <button on:click={save}>作成する</button>
</div>

<style>
  .section {
    margin-left: 30px;
  }
</style>
