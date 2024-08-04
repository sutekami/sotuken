export async function session(cookie) {
  const headers = new Headers({
    "Content-Type": "application/json",
    "X-Request_With": "XMLHttpRequest",
    "Cookie": "_session_id=" + cookie,
  });

  const request = new Request("http://express:3000/session", {
    headers,
    method: "GET",
  });

  return await fetch(request);
}
