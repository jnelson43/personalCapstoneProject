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
	const tag = new Tag({
		tagText: req.body.tagText,
		userID: req.body.userID,
		restaurantID: req.body.restaurantID
	});
	try {
		const savedTag = await tag.save();
		res.json(savedTag);
	}catch{
		res.json({message: "ERROR"});
	}

});

//Delete User
router.delete('/:_id', async (req,res) => {
	try{
		const removedTag = await Tag.remove({_id: req.params._id});
		res.json(removedTag);
	}catch{
		res.json({message: "ERROR"});
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