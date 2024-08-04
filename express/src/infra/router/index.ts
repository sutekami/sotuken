import { randomUUID } from "crypto";
import express from "express";
import "express-async-errors";
import * as bundle from 'infra/router/bundle';
import { redis } from "infra/redis";

const router = express.Router();
const REDIS_EXPIRE_SECOND = 3600;

router.use((req, res, next) => {
  next();
})

router.route('/session')
  .get(async (req, res, next) => {
    const { session } = req;
    if (session.userId) {
      const user = await bundle.UserRepository.find(session.userId);
      res.status(200).json(user);
    }
    else res.status(403).send("nothing");
  });

router.route('/signup')
  .get((req, res) => {
    res.send('')
  })
  .post(async (req, res) => {
    const { session } = req;
    const user = await new bundle.SignUpController(req.body, session).handle();
    res.status(200).json(user);
  });

router.route('/signin')
  .post(async (req, res) => {
    const { session } = req;
    const user = await new bundle.SignInController(req.body, session).handle();
    res.status(200).json(user);
  });

router.route('/mypage')
  .get(async (req, res) => {
    const { session } = req;
  })

router.route('/new-issue')
  .post(async (req, res) => {
    const issue = await new bundle.IssueController(req.body).create();
    res.status(200).json(issue);
  })

router.route('/issues/:userId')
  .get(async (req, res) => {
    const issues = await bundle.IssueRepository.where({userId: parseInt(req.params.userId)});
    res.status(200).json(issues);
  })

router.route('/vote')
  .get(async (req, res) => {
    const roomId = randomUUID();
    const redisKey = "ROOM_ID_KEY_" + roomId;
    await redis.set(redisKey, Date.now(), 'EX', REDIS_EXPIRE_SECOND)
    res.status(200).json({roomId})
  })

router.route('/vote/:roomId')
  .get(async (req, res) => {
    const redisKey = "ROOM_ID_KEY_" + req.params.roomId;
    const value = await redis.get(redisKey);
    if (value) res.status(200).json();
    else res.status(403).json();
  })

// tester
router.route("/test")
  .get(async (req, res) => {
    const value = await redis.get("ROOM_ID_KEY_fe489ba-4922-97e5-8c75d9c54437");
    console.log(value)
    res.send(value)
  })

export default router;
