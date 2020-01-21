const express = require('express');
const router = express.Router();
const { index, create, getContact } = require('../controllers/contact-controller');

router.get('/', index);
router.get('/:id', getContact);
router.post('/', create);

module.exports = router;