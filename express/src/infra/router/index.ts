import { randomUUID } from 'crypto';
import express from 'express';
import 'express-async-errors';
import * as bundle from 'infra/router/bundle';
import { redis, roomType, BASE_ROOM_ID_KEY, REDIS_EXPIRE_SECOND } from 'infra/redis';

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route('/').get((req, res) => {
  res.status(204).send();
});

router.route('/session').get(async (req, res, next) => {
  const { session } = req;
  if (session.userId) {
    const user = await bundle.UserRepository.find(session.userId);
    res.status(200).json(user);
  } else res.status(403).send('nothing');
});

router
  .route('/signup')
  .get((req, res) => {
    res.send('');
  })
  .post(async (req, res) => {
    const { session } = req;
    const user = await new bundle.SignUpController(req.body, session).handle();
    res.status(200).json(user);
  });

router.route('/signin').post(async (req, res) => {
  const { session } = req;
  const user = await new bundle.SignInController(req.body, session).handle();
  res.status(200).json(user);
});

router.route('/mypage').get(async (req, res) => {
  const { session } = req;
});

router.route('/new-issue').post(async (req, res) => {
  const issue = await new bundle.IssueController(req.body).create();
  res.status(200).json(issue);
});

router.route('/issues/:userId').get(async (req, res) => {
  const issues = await bundle.IssueRepository.where({
    userId: parseInt(req.params.userId),
  });
  res.status(200).json(issues);
});

router.route('/vote').get(async (req, res) => {
  const roomId = randomUUID();
  const redisKey = BASE_ROOM_ID_KEY + roomId;
  const value: roomType = {
    roomId: roomId,
  };
  await redis.set(redisKey, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);
  res.status(200).json({ roomId });
});

router.route('/vote/:roomId').get(async (req, res) => {
  const redisKey = BASE_ROOM_ID_KEY + req.params.roomId;
  const value = await redis.get(redisKey);
  if (value) res.status(200).json(JSON.parse(value));
  else res.status(403).json();
});

router.route('/vote/:roomId/guest').get(async (req, res) => {
  const redisKey = BASE_ROOM_ID_KEY + req.params.roomId;
  const value: roomType = JSON.parse((await redis.get(redisKey)) || '{}');
  const item = {
    userName: (value.guestUsers || {})[req.cookies['_session_id']]?.userName,
  };
  res.status(200).json(item);
});

export default router;
