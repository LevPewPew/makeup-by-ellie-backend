const express = require('express');
const router = express.Router();
const { index } = require('../controllers/admin-controller');

router.post('/', index);

module.exports = router;