import express from "express";
import "express-async-errors";

import { CreateUserController } from "interfaces/controller/signup/CreateUserController";

const router = express.Router();

router.use((req, res, next) => {
  next();
})

router.route('/');

router.route('/signup')
  .get((req, res) => {
    res.send('')
  })
  .post(async (req, res, next) => {
    const user = await new CreateUserController(req.body).handle();
    res.status(200).json(user);
  });

router.route('/signin');

router.route('/mypage');

export default router;
