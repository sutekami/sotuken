- Sessionから情報を受け取ってくるような処理はSvetleKitのサーバーで書くのではなく、ブラウザ側で書くようにする
- それ以外は、ブラウザはSvelteKitのサーバーにリクエストし、そのリクエストをもとにSvelteKitサーバーがExpressサーバーに対してリクエスト。
- SvelteのサーバーからExpressにリクエストを飛ばす際は、 `http://express:3000` でリクエストを飛ばす。ブラウザからは `http://localhost:3000` でリクエストを飛ばす。

### `+page.server.js` で特定のページに遷移したい時
特にすでにログインセッションがある状態でサインインができないようにしたい場合は、`@sveltejs/kit` の `redirect` メソッド使用することで実現可能

## .envファイルについて
`docker-compose.yml` があるディレクトリに、 `.env` ファイルを追加する
以下、追加する必要のある環境変数
```
CLIENT_PORT=
CLIENT_SERVER=
```
