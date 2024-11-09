import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import router from 'infra/router';
import { Server } from 'socket.io';
import 'express-async-errors';
import expressSession from 'express-session';
import { store } from 'infra/redis';
import { webSocketRouter } from 'infra/router/websocket_router';
import cookieParser from 'cookie-parser';

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

const app = express();
const server = createServer(app);
const port = process.env.SERVER_PORT;
const io = new Server(server, {
  cors: {
    origin: `http://${process.env.DOMAIN_NAME}:${process.env.SERVER_PORT}`,
    credentials: true,
  },
});

const sessionMiddleware = expressSession({
  secret: 's3Cur3',
  name: '_session_id',
  resave: true,
  saveUninitialized: true,
  store,
  cookie: {
    // cookieの有効期限は一旦24h
    maxAge: 1000 * 3600 * 24, // ms指定
  },
});

// CORS設定・CSRF対策、POST等のdata受け取り可能にする設定
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://${process.env.DOMAIN_NAME}:${process.env.CLIENT_PORT}`);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-request_with, XMLHttpRequest');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(sessionMiddleware);

// router
app.use('/', router);

// websocket middleware
io.use((socket, next) => {
  next();
});

io.on('connection', socket => {
  console.log('a user connected');
  webSocketRouter(socket, io);
});

// errorHandling（切り分けたい）
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  switch (err.name) {
    case 'PrismaClientValidationError':
      res.status(400).send(err.message);
      break;
    case 'ValidationError':
      res.status(400).send({ err: err.message });
      break;
    default:
      res.status(500).send({ err: 'Internal Server Error' });
      break;
  }
});

// listen
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
