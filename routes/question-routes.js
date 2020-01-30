const express = require('express');
const router = express.Router();
const { index, create, edit, remove } = require('../controllers/question-controller');

router.get('/', index);

// for Admin
router.post('/', create);
router.put('/:id', edit);
router.delete('/:id', remove);

module.exports = router;