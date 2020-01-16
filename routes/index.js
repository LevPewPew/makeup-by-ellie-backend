const express = require('express');
const router = express.Router();

const index = (req, res) => {
  res.send('hello world');
}

router.get('/', index);

router.use('/portfolio', require('./portfolio-routes'));

router.use('/services', require('./service-routes'));

module.exports = router;