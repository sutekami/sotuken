import api from "$lib/api";
import { writableUser } from "$lib/store/user";

await api.root.session()
  .then((data) => {
    writableUser.set({
      userId: data.data.userId,
      email: data.data.email,
      name: data.data.email,
    });
  })
  .catch(() => {})
