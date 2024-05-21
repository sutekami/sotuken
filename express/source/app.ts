import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5000',
  },
});
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
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
// app.use('/signup', require('./signup'));

// signin
// app.use('/signin', require('./signin'));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('teset', (msg) => {
    console.log(msg);
    io.emit('test', msg);
  })
});

app.use((err, req, res, next) => {
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

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
