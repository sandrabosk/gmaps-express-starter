const express = require('express');
const router  = express.Router();
const Restaurant = require('../models/Restaurant');

// GET => render the form to create a new restaurant
router.get('/new', (req, res) => {
  res.render('restaurants/new');
});

// POST => to create new restaurant and save it to the DB
router.post('/', (req, res, next) => {

	const { name, description } = req.body;
  // add location object here
  
	Restaurant
	 .create({name, description})
	 .then(() => res.redirect('/restaurants'))
	 .catch(err => next(err))
});


// GET => to retrieve all the restaurants from the DB
router.get('/', (req, res, next) => {
	Restaurant
	 .find()
	 .then(restaurantsFromDB => 
			res.render('restaurants/list', { restaurants: restaurantsFromDB })
	 )
	 .catch(err => next(err))
});

// GET => get the form pre-filled with the details of one restaurant
router.get('/:restaurant_id/edit', (req, res, next) => {
	const { restaurant_id } = req.params;

	Restaurant
		.findById(restaurant_id)
		.then(restaurant => res.render('restaurants/update', { restaurant }))
		.catch(err => next(err))
});

// POST => save updates in the database
router.post('/:restaurant_id', (req, res, next) => {
	const { name, description } = req.body;
	const { restaurant_id } = req.params;
	
	Restaurant
		.findByIdAndUpdate(restaurant_id, { name, description })
		.then(restaurant => res.redirect(`/restaurants/${restaurant_id}`))
		.catch(err => next(err))
});

// DELETE => remove the restaurant from the DB
router.get('/:restaurant_id/delete', (req, res, next) => {
	const { restaurant_id } = req.params;
	
	Restaurant
		.findByIdAndRemove(restaurant_id)
		.then(() => res.redirect('/restaurants'))
		.catch(err => next(err))
});

// GET => get the details of one restaurant
router.get('/:restaurant_id', (req, res, next) => {
	const { restaurant_id } = req.params;

	Restaurant
		.findById(restaurant_id)
		.then(restaurant => res.render('restaurants/details', { restaurant }))
		.catch(err => next(err))
});

module.exports = router;