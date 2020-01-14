const express = require('express');
const router = express.Router();

const index = (req, res) => {
  res.send('hello world');
}

router.get('/', index);

router.use('/categories', require('./categories-routes'));

module.exports = router;