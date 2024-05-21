import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import router from 'routes';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const port = 3000;
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5000',
  },
});

// CORS設定・CSRF対策、POST等のdata受け取り可能にする設定
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ['http://localhost:5000']);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-request_with, XMLHttpRequest')
  next();
})

// router
app.use('/', router);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('test', (msg) => {
    console.log(msg);
    io.emit('test', msg);
  })
})

// errorHandling (切り分けたい)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  switch(err.name) {
    case "PrismaClientValidationError":
      res.status(400).send(err.message);
      break
    case "ValidationError":
      res.status(400).send({ err: err.message });
      break;
    default:
      res.status(500).send({err: 'Internal Server Error'})
      break
  }
})

// listen
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
