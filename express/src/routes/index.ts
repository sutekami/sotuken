import express from 'express';
const router = express.Router();

// import controllers
import signup from 'controllers/signup';

router.use((req, res, next) => {
  next();
})

router.route('/');

router.route('/signup')
  .get(signup.index)
  .post(signup.update)
  .delete(signup.destroy)

router.route('/signin');

router.route('/mypage');

export default router;
