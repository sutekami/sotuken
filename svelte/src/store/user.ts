// svelte/storeに搭載されているgetメソッド使うことでsubscribe（つまり更新を検知しない）stateの値をとってくることができる
// 基本的には、writableなstoreをexportして、それらを.svelteのscirptの中でgetメソッドを使用してとってくる
// もし、データの更新があった際に、getで撮っているstoreの値を更新したい場合は、getメソッドを噛ませる
// 基本的にただ表示するための場所においてはwritableコード（というよりはreadonlyを使ったもの）を直接使う
// writable stateを元に値を編集し、POST等を行いたい場合は、getメソッドで別のobjectを作成し、そこの値を変更していく、そしてそれをPOSTしたり適宜行いたい操作に使用する
// componentはstoreの値を直接触ってはいけない。pageなどからpropsで渡されたデータを受け取って編集しpageに再度戻す形
// 基本的にはcustomしたwritableコードで、関数を作成し、それを使う、setとupdateはstore以外では原則使用しない。
// 基本的にreadonlyとなったモデルしかgetで使用してはいけない方針にするため、readonlyにしたものはそのままmodel名を書く
// writableにしてあるものは区別するためにwritable{model名}とする

import { get, readonly, writable } from "svelte/store";

type UserType = {
  userId: number | null;
  name: string | null;
  email: string | null;
}

const writableUser = writable<UserType>({
  userId: null,
  name: null,
  email: null,
})

export { writableUser };
