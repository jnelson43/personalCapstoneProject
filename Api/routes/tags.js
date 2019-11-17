const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');

//Gets all Users
router.get('/', async (req, res) => {
	try{
		const Tags = await Tag.find();
		res.json(Tags);
	}catch {
		res.json({message: err});
	}
});

//Gets a specific User
router.get('/:id', async (req, res) => {
	try{
		const tag = await User.findById(req.params.id);
		res.json(tag);
	}catch {
		res.json({message: err});
	}
});

//Submits a User
router.post('/', async (req,res) => {
	const rag = new Tag({
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		addedRestaurants: req.body.addedRestaurants,
		dateCreated: req.body.dateCreated,
	});
	try {
		const savedTag = await tag.save();
		res.json(savedTag);
	}catch{
		res.json({message: err});
	}

});

//Delete User
router.delete('/:id', async (req,res) => {
	try{
		const removedTag = await User.remove({_id: req.params._id});
		res.json(removedTag);
	}catch{
		res.json({message: err});
	}
});

//Update User Title
router.patch('/:id', async (req,res) => {
	try{
		const updatedTag = await User.updateOne(
			{_id: req.params.id},
			{ $set : { type: req.body.type } }
		);
		res.json(updatedTag);
	}catch{
		res.json({message: err});
	}
	
});
module.exports = router;