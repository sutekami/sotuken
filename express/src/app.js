const express = require('express');
const { error } = require('node:console');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5000'
  }
});
const port = 3000;

// CORS設定・CSRF対策、POST等のdata受け取り可能にする設定
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ['http://localhost:5000']);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-request_with, XMLHttpRequest')
  next();
})

app.get('/', (req, res) => {
  res.send('this is root');
})

// routing
// signup
app.use('/signup', require('./signup'))

// signin
app.use('/signin', require('./signin'))

io.on('connection', (socket) => {
  console.log('a user connected');
})

app.use((err, req, res, next) => {
  console.error(err)

  switch(err.cause.name) {
    case "PrismaClientValidationError":
      res.status(400).send(err.message);
      break
    default:
      res.status(500).send('server error.')
      break
  }
})

// listen
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
/*
 * 考えなければいけないこと
 * いわゆるモデルごとに持つ処理をどうするか → modelsディレクトリを作成し、modelごとに処理を作成する
 * HTTPメソッドごとの処理
 * ルーティング処理 → ここ書くしか今のところ思いつかない、増えるたびここに書いていく（肥大化していきそう...）
 */
