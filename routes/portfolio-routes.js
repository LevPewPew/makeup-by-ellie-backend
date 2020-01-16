const express = require('express');
const router = express.Router();
const { index, create, filteredIndex } = require('../controllers/portfolio-controller');

router.get('/', index);
router.get('/:category', filteredIndex);
router.post('/', create);

module.exports = router;