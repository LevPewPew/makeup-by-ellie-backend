const express = require('express');
const router = express.Router();

const index = (req, res) => {
  res.send('hello world');
}

router.get('/', index);

router.use('/portfolio', require('./portfolio-routes'));

router.use('/services', require('./service-routes'));

router.use('/contact', require('./contact-routes'));

router.use('/FAQ', require('./question-routes'));
router.use('/questions', require('./question-routes'));

router.use('/aws-s3', require('./aws-s3-routes'));

module.exports = router;