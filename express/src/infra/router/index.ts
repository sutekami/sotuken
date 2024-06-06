import express from "express";
import "express-async-errors";
import { SignInController } from "interfaces/controller/signIn/SignInController";

import { SignUpController } from "interfaces/controller/signUp/SignUpController";

const router = express.Router();

router.use((req, res, next) => {
  next();
})

router.route('/');

router.route('/signup')
  .get((req, res) => {
    res.send('')
  })
  .post(async (req, res) => {
    const user = await new SignUpController(req.body).handle();
    res.status(200).json(user);
  });

router.route('/signin')
  .post(async (req, res) => {
    const user = await new SignInController(req.body).handle();
    res.status(200).json(user);
  });

router.route('/mypage')

export default router;
