import express from "express";
import "express-async-errors";
import * as bundle from 'infra/router/bundle';
const router = express.Router();

router.use((req, res, next) => {
  next();
})

router.route('/')
  .get(async (req, res, next) => {
    const { session } = req;
    if (session.userId) {
      const user = await bundle.UserRepository.find(session.userId);
      res.status(200).json(user);
    }
    else res.send("nothing");
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

export default router;
