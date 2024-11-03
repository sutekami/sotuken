const BASE_URL = `http://express:3000`;
const BASE_API_URL = '/api';
const BASE_INIT: Record<string, any> = {
  credentials: 'include',
};

export const COOKIE_SESSION_ID = '_session_id';

export function headers(sessionId?: string) {
  return new Headers({
    Cookie: sessionId ? '_session_id=' + sessionId : '',
    'Content-type': 'application/json',
    'X-Request_With': 'XMLHttpRequest',
  });
}

function joinUrl(...arg: string[]) {
  return arg.join('/');
}

export const Req = {
  root: (sessionId?: string) =>
    new Request(joinUrl(BASE_URL), {
      ...BASE_INIT,
      method: 'GET',
      headers: headers(sessionId),
    }),
  session: (sessionId?: string) =>
    new Request(joinUrl(BASE_URL, 'session'), {
      ...BASE_INIT,
      method: 'GET',
      headers: headers(sessionId),
    }),
  vote: {
    GET: (sessionId?: string) =>
      new Request(joinUrl(BASE_URL, 'vote'), {
        ...BASE_INIT,
        method: 'GET',
        headers: headers(sessionId),
      }),
    guest: {
      roomId: {
        GET: (roomId: string, sessionId?: string) =>
          new Request(joinUrl(BASE_URL, 'vote', 'guest', roomId), {
            ...BASE_INIT,
            method: 'GET',
            headers: headers(sessionId),
          }),
        POST: (roomId: string, params: string, sessionId?: string) =>
          new Request(joinUrl(BASE_URL, 'vote', 'guest', roomId), {
            ...BASE_INIT,
            method: 'POST',
            headers: headers(sessionId),
            body: params,
          }),
      },
    },
  },
  signup: {
    POST: (params: string) =>
      new Request(joinUrl(BASE_URL, 'signup'), {
        ...BASE_INIT,
        method: 'POST',
        body: params,
      }),
  },
  signin: {
    POST: (params: string) =>
      new Request(joinUrl(BASE_URL, 'signin'), {
        ...BASE_INIT,
        method: 'POST',
        body: params,
      }),
  },
  new_issue: {
    POST: (params: string, sessionId?: string) =>
      new Request(joinUrl(BASE_URL, 'new-issue'), {
        ...BASE_INIT,
        method: 'POST',
        body: params,
        headers: headers(sessionId),
      }),
  },

  api: {
    root: () =>
      new Request(joinUrl(BASE_API_URL), {
        ...BASE_INIT,
        method: 'GET',
      }),
    vote: {
      GET: () =>
        new Request(joinUrl(BASE_API_URL, 'vote'), {
          ...BASE_INIT,
          method: 'GET',
        }),
      guest: {
        roomId: {
          POST: (roomId: string, params: string) =>
            new Request(joinUrl(BASE_API_URL, 'vote', 'guest', roomId), {
              ...BASE_INIT,
              method: 'POST',
              body: params,
            }),
        },
      },
    },
    signin: {
      POST: (params: string) =>
        new Request(joinUrl(BASE_API_URL, 'signin'), {
          ...BASE_INIT,
          method: 'POST',
          body: params,
        }),
    },
    new_issue: {
      POST: (params: string) =>
        new Request(joinUrl(BASE_API_URL, 'new-issue'), {
          ...BASE_INIT,
          method: 'POST',
          body: params,
        }),
    },
  },
};
