export default class Client {
  static CLIENT = "client";
  static SERVER = "server";

  baseURL = "http://express:3000";

  headers = new Headers({
    "Content-Type": "application/json",
    'X-Request_With': 'XMLHttpRequest',
  })

  constructor(from, { url, method, body }) {
    const URL = from == "client" ? url : this.baseURL + url;
    this.request = new Request(URL, {
      headers: this.headers,
      method: method,
      body: method == "GET" ? undefined : body,
      credentials: "include",
    });
  }

  async fetch() {
    return await fetch(this.request);
  }
}

export function headers(cookie) {
  return new Headers({
    "Content-Type": "application/json",
    "X-Request_With": "XMLHttpRequest",
    "Cookie": "_session_id=" + cookie,
  });
}
