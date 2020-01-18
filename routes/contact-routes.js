const express = require('express');
const router = express.Router();
const { index, create } = require('../controllers/contact-controller');

router.get('/', index);
router.post('/', create);

module.exports = router;