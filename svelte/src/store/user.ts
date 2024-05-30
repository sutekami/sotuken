// svelte/storeに搭載されているgetメソッド使うことでsubscribe（つまり更新を検知しない）stateの値をとってくることができる
// 基本的には、writableなstoreをexportして、それらを.svelteのscirptの中でgetメソッドを使用してとってくる
// もし、データの更新があった際に、getで撮っているstoreの値を更新したい場合は、getメソッドを噛ませる
// 基本的にただ表示するための場所においてはwritableコードを直接使う
// writable stateを元に値を編集し、POST等を行いたい場合は、getメソッドで別のobjectを作成し、そこの値を変更していく、そしてそれをPOSTしたり適宜行いたい操作に使用する

import { get, writable } from "svelte/store";

export const writableUser = writable({
  name: "test",
  email: "example.com"
})
