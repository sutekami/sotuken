const express = require('express');
const router = express.Router();
const userModel = require(`${process.cwd()}/models/user`)

router.use((req, res, next) => {
  next()
})

router.route('/')
  .get(async (req, res) => {
    let users;
    try {
      users = await userModel.main();
    } catch (error) {
      return next(error)
    }
    res.json({ users })
  })
  .post(async (req, res, next) => {
    let user;
    try {
      user = await userModel.create(req.body);
    } catch (error) {
      return next(error)
    }
    res.json({ user })
  })

module.exports = router
