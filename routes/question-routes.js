const express = require('express');
const router = express.Router();
const { index, create, remove } = require('../controllers/question-controller');

router.get('/', index);

// for Admin
router.post('/', create);
router.delete('/:id', remove);

module.exports = router;