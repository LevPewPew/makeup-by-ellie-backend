const express = require('express');
const router = express.Router();

const index = (req, res) => {
  res.send('hello world');
}

router.get('/', index);

// define routes here, this will mean anything in the sushi-routes.js file (yet to be created) will assume that /sushi will prepend the route path defined in sushi-routes.js
router.use('/categories', require('./categories-routes'));

module.exports = router;