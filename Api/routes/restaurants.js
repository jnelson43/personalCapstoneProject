const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

//Gets all Restauruant
router.get('/', async (req, res) => {
	try{
		const Restaurants = await Restaurant.find();
		res.json(Restaurants);
	}catch {
		res.json({message: err});
	}
});

//Gets a specific Restauruant
router.get('/:id', async (req, res) => {
	try{
		const restaurant = await Restaurant.findById(req.params.id);
		res.json(restaurant);
	}catch {
		res.json({message: err});
	}
});

//Submits a Restauruant
router.post('/', async (req,res) => {
	const restaurant = new Restaurant({
		name: req.body.name,
		description: req.body.description,
		imageURL: req.body.imageURL,
		UserName: req.body.userName
	});
	try {
		const savedRestauruant = await restaurant.save();
		res.json(savedRestaurant);
	}catch{
		res.json({message: err});
	}

});

//Delete Restauruant
router.delete('/:id', async (req,res) => {
	try{
		const removedRestaurant = await Restaurant.remove({_id: req.params._id});
		res.json(removedRestaurant);
	}catch{
		res.json({message: err});
	}
});

//Update Restauruant Title
router.patch('/:id', async (req,res) => {
	try{
		const updatedRestaurant = await User.updateOne(
			{_id: req.params.id},
			{ $set : { type: req.body.type } }
		);
		res.json(updatedRestaurant);
	}catch{
		res.json({message: err});
	}
	
});
module.exports = router;