const express = require('express');
const router = express.Router();
const User = require('../models/User');

//Gets all Users
router.get('/', async (req, res) => {
	try{
		const Users = await User.find();
		res.json(Users);
	}catch {
		res.json({message: err});
	}
});

//Gets a specific User
router.get('/:id', async (req, res) => {
	try{
		const user = await User.findById(req.params.id);
		res.json(user);
	}catch {
		res.json({message: err});
	}
});

//Submits a User
router.post('/', async (req,res) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		addedRestaurants: req.body.addedRestaurants,
		dateCreated: req.body.dateCreated,
	});
	try {
		const savedUser = await user.save();
		res.json(savedUser);
	}catch{
		res.json({message: err});
	}

});

//Delete User
router.delete('/:id', async (req,res) => {
	try{
		const removedUser = await User.remove({_id: req.params._id});
		res.json(removedUser);
	}catch{
		res.json({message: err});
	}
});

//Update User Title
router.patch('/:id', async (req,res) => {
	try{
		const updatedUser = await User.updateOne(
			{_id: req.params.id},
			{ $set : { type: req.body.type } }
		);
		res.json(updatedUser);
	}catch{
		res.json({message: err});
	}
	
});
module.exports = router;