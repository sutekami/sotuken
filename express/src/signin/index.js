const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next();
})

router.get('/', (req, res) => {
  res.send('this is signin web api.\n')
})

module.exports = router;
