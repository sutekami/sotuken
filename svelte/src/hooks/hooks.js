// NOTE: どうやらFetchAPIを使用するとlocalhostが勝手に127.0.0.1になる。
// NOTE: CORS上127.0.0.1は許可していないので扱うことができない。
// NOTE: なので一体ここはAxiosを使用する。

// import api from "$lib/api";
// import { updateUser } from "$lib/store/user";

// await api.root.session()
//   .then((data) => {
//     updateUser({
//       userId: data.data.userId,
//       email: data.data.email,
//       name: data.data.email,
//     });
//   })
//   .catch(() => {})
