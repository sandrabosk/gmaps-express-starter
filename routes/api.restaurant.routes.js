const express = require('express');
const router  = express.Router();
const Restaurant = require('../models/Restaurant');

// to see raw data in your browser, just go on: http://localhost:3000/api
router.get('/', (req, res, next) => {
	Restaurant
		.find()
		.then(restaurants => res.status(200).json(restaurants))
		.catch(err => next(err))
});

// to see raw data in your browser, just go on: http://localhost:3000/api/someIdHere
router.get('/:restId', (req, res, next) => {
  const { restId } = req.params;
  Restaurant
    .findById(restId)
    .then(restaurant => res.status(200).json(restaurant))
    .catch(err => next(err))
});


module.exports = router;