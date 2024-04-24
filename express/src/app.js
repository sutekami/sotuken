const express = require('express');
const app = express();
const port = 3000;

// CORS設定、CSRF対策
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-request_with')
  next();
})

// routing
// signup
app.use('/signup', require('./signup'))

// signin
app.use('/signin', require('./signin'))

// listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/**
 * 考えなければいけないこと
 * いわゆるモデルごとに持つ処理をどうするか → modelsディレクトリを作成し、modelごとに処理を作成する
 * HTTPメソッドごとの処理
 * ルーティング処理 → ここ書くしか今のところ思いつかない、増えるたびここに書いていく（肥大化していきそう...）
 */
