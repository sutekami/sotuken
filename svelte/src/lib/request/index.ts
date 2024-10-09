const BASE_URL = "http://express:3000";
const BASE_API_URL = "/api";
const BASE_INIT: RequestInit = {
  credentials: "include",
};

export const COOKIE_SESSION_ID = "_session_id";

export function headers(sessionId?: string) {
  return new Headers({
    "Content-type": "application/json",
    "X-Request_With": "XMLHttpRequest",
    Cookie: "_session_id=" + sessionId,
  });
}

function joinUrl(...arg: string[]) {
  return arg.join("/");
}

export const Req = {
  root: (sessionId?: string) =>
    new Request(joinUrl(BASE_URL), {
      ...BASE_INIT,
      method: "GET",
      headers: headers(sessionId),
    }),
  session: (sessionId?: string) =>
    new Request(joinUrl(BASE_URL, "session"), {
      ...BASE_INIT,
      method: "GET",
      headers: headers(sessionId),
    }),

  api: {
    root: () =>
      new Request(joinUrl(BASE_API_URL), {
        ...BASE_INIT,
        method: "GET",
      }),
  },
};
