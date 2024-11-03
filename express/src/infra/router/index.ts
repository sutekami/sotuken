import { randomUUID } from 'crypto';
import express from 'express';
import 'express-async-errors';
import * as bundle from 'infra/router/bundle';
import { redis, roomType, BASE_ROOM_ID_KEY, REDIS_EXPIRE_SECOND } from 'infra/redis';

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route('/session').get(async (req, res, next) => {
  const { session } = req;
  if (session.userId) {
    const user = await bundle.UserRepository.find(session.userId);
    res.status(200).json(user);
  } else {
    res.sendStatus(403);
  }
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

router
  .route('/vote/guest/:roomId')
  .get(async (req, res) => {
    const sessionId = req.cookies['_session_id'];
    if (!sessionId) {
      return res.status(400).json();
    }

    const redisKey = BASE_ROOM_ID_KEY + req.params.roomId;
    const value = await redis.get(redisKey);
    if (!value) {
      return res.status(404).json();
    }

    const room: roomType = JSON.parse(value);
    if (!room.guestUsers?.find(e => e.hash === sessionId)) res.status(403).json();
    else res.status(204).json();
  })
  .post(async (req, res) => {
    const { guestName } = req.body;
    const sessionId = req.cookies['_session_id'];
    const redisKey = BASE_ROOM_ID_KEY + req.params.roomId;
    const value = await redis.get(redisKey);
    if (!value) return res.status(404).json();

    const {
      roomId,
      guestUsers,
      hostUsers,
      inResult,
      inVoting,
      currentIssueId,
      currentIssueSectionId,
      issues,
      roomPassword,
      timeSecLimit,
      voteStatus,
    }: roomType = JSON.parse(value);

    const setValue: roomType = {
      roomId,
      guestUsers: [...(guestUsers || []), { hash: sessionId, guestName, isActive: true }],
      hostUsers,
      inVoting,
      inResult,
      currentIssueId,
      currentIssueSectionId,
      issues,
      roomPassword,
      timeSecLimit,
      voteStatus,
    };

    await redis.set(redisKey, JSON.stringify(setValue), 'EX', REDIS_EXPIRE_SECOND);

    res.status(200).json();
  });

export default router;
