<script context="module" lang="ts">
  import { IssueCreatable } from './IssueCreatable';
</script>

<script lang="ts">
  import { storeUser } from '$lib/store/user';
  import { onMount } from 'svelte';
  import { BaseButton, BaseDivider, BaseInput } from '$lib/components';
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import type { IssueSectionClass } from './IssueSectionClass';
  import { Req } from '$lib/request';

  onMount(() => {
    if (!$page.data.user) return (location.href = '/signin');
    const { name, userId } = $page.data.user;
    storeUser.updateUser({ name, userId });
  });

  const issueCreatable = new IssueCreatable();

  const handleClickCreateIssueSection = () => {
    const issueSection = issueCreatable.createIssueSection();
    issueCreatable.issueSections = [...issueCreatable.issueSections, issueSection];
  };

  const handleClickDeleteIssueSection = (hash: string) => {
    const issueSections = issueCreatable.issueSections.filter(section => section.hash !== hash);
    issueCreatable.issueSections = issueSections;
  };

  const handleClickCreateIssueSectionalOption = (section: IssueSectionClass) => {
    const issueSectionalOption = section.createIssueSectionalOption();
    section.issueSectionalOptions = [...section.issueSectionalOptions, issueSectionalOption];
    // HACK: ネストしたクラスに対してレンダリングされないため、強制的にレンダリング
    issueCreatable.issueSections = issueCreatable.issueSections;
  };

  const handleClickDeleteIssueSectionalOption = (section: IssueSectionClass, hash: string) => {
    const issueSectionalOptions = section.issueSectionalOptions.filter(option => option.hash !== hash);
    section.issueSectionalOptions = issueSectionalOptions;
    // HACK: ネストしたクラスに対してレンダリングされないため、強制的にレンダリング
    issueCreatable.issueSections = issueCreatable.issueSections;
  };

  const handleClickSubmit = async () => {
    // これだとnullを許容してしまうので、nullは送らないようにする
    const issueSections = issueCreatable.issueSections.map(section => {
      const options = section.issueSectionalOptions.map(option => ({ body: option.body }));
      return { title: section.title, issueSectionalOptions: options };
    });

    const issue = {
      title: issueCreatable.title,
      userId: $storeUser.userId,
      issueSections,
    };

    const req = Req.api.new_issue.POST(JSON.stringify(issue));
    const res = await fetch(req);

    console.log(res);
  };
</script>

<div class="new-issue">
  <div class="body">
    <div class="body-title">投票・問題作成</div>
    <div class="divider">
      <BaseDivider />
    </div>
    <div class="content">
      <div class="label">
        <div class="wrapper-between">
          <span>投票テーマ</span>
          <span class="btn-green" on:click={handleClickCreateIssueSection}>問題を作成する</span>
        </div>
      </div>
      <div class="divider"></div>
      <BaseInput value={issueCreatable.title} on:input={e => (issueCreatable.title = e.detail)} />
      {#each issueCreatable.issueSections as section}
        <div class="issue_section" transition:fade={{ delay: 100, duration: 300 }}>
          <div class="divider">
            <BaseDivider />
          </div>
          <div class="label">
            <div class="wrapper-between">
              <span>問題・設問</span>
              <span class="btn" on:click={() => handleClickDeleteIssueSection(section.hash)}> - 問題を削除する </span>
            </div>
          </div>
          <div class="divider"></div>
          <BaseInput value={section.title} on:input={e => (section.title = e.detail)} />
          <div class="divider"></div>
          <span class="btn-green" on:click={() => handleClickCreateIssueSectionalOption(section)}>
            + 選択肢を追加する
          </span>
          {#each section.issueSectionalOptions as option}
            <div class="issue_sectional_option" transition:fade={{ delay: 100, duration: 300 }}>
              <div class="input-wrapper">
                <div class="input"><BaseInput value={option.body} on:input={e => (option.body = e.detail)} sm /></div>
                <span class="btn" on:click={() => handleClickDeleteIssueSectionalOption(section, option.hash)}>
                  - 選択肢を削除する
                </span>
              </div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
    <div class="body wrapper-center">
      <div class="btn-submit">
        <BaseButton on:click={handleClickSubmit}>保存する</BaseButton>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .new-issue {
    & {
      padding: 2vh 20vw;
      display: flex;
      justify-content: center;
    }
    .body {
      width: 100%;
      &-title {
        font-weight: bold;
        font-size: 18px;
      }
    }
    .divider {
      padding: 0.5vh 0;
    }
    .content {
      padding: 1vh 2vw;
    }
    .wrapper {
      &-between {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      &-center {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .btn {
      & {
        font-size: 12px;
        transition: color 0.2s;
        text-decoration: underline 1px;
        cursor: pointer;
        &:hover {
          color: #f57474;
          text-decoration: underline 1px;
        }
      }
      &-green {
        font-size: 12px;
        transition: color 0.2s;
        text-decoration: underline 1px;
        cursor: pointer;
        &:hover {
          color: rgb(100, 213, 100);
          text-decoration: underline 1px;
        }
      }

      &-submit {
      }
    }
    .issue_section {
      width: 60%;
      padding: 3vh 0;
    }
    .input-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
