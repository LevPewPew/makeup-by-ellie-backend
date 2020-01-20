const express = require('express');
const router = express.Router();
const { index, create, edit, remove } = require('../controllers/service-controller');

router.get('/', index);

// For Admin 
router.post('/', create);
router.put('/:id', edit);
router.delete('/:id', remove);

module.exports = router;