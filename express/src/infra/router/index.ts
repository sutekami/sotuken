import express from "express";
import "express-async-errors";
import { SignInController } from "interfaces/controller/signIn/SignInController";
import { SignUpController } from "interfaces/controller/signUp/SignUpController";
import { UserRepository } from "interfaces/repository/UserRepository";
const router = express.Router();

router.use((req, res, next) => {
  next();
})

router.route('/')
  .get(async (req, res, next) => {
    const { session } = req;
    if (session.userId) {
      const user = await UserRepository.find(session.userId);
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
    const user = await new SignUpController(req.body, session).handle();
    res.status(200).json(user);
  });

router.route('/signin')
  .post(async (req, res) => {
    const { session } = req;
    const user = await new SignInController(req.body, session).handle();
    res.status(200).json(user);
  });

router.route('/mypage')

export default router;
