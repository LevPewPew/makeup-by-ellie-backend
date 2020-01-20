const express = require('express');
const router = express.Router();
const { index, create, filteredIndex, edit, remove } = require('../controllers/portfolio-controller');

router.get('/', index);
router.get('/:category', filteredIndex);

// For Admin
router.post('/', create);
router.put('/:id', edit);
router.delete('/:id', remove);

module.exports = router;