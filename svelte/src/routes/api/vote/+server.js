// お試しにfetchで行っているので、もしかしたら他にもheaderを入れる必要あるかもしれない

export async function GET({ request }) {
  const req = new Request('http://express:3000/session');
  return await fetch(req, {
    credentials: "include",
    method: "GET",
  })
}

export async function POST({ request }) {
  const params = await request.json();
  const req = new Request('http://express:3000/signin');
  return await fetch(req, {
    body: JSON.stringify(params),
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
}
