const express = require('express');
const router = express.Router();
const Test = require('../models/Test');

//Gets all Tests
router.get('/', async (req, res) => {
	try{
		const Tests = await Test.find();
		res.json(Tests);
	}catch {
		res.json({message: err});
	}
});

//Gets a specific Test
router.get('/:TestId', async (req, res) => {
	try{
		const test = await Test.findById(req.params.TestId);
		res.json(test);
	}catch {
		res.json({message: err});
	}
});

//Submits a Test
router.post('/', async (req,res) => {

	const test = new Test({
		type: req.body.type,
		timeLimit: req.body.timeLimit,
		numOfQuestions: req.body.numOfQuestions,
		digits: req.body.digits,
		dateTaken: req.body.dateTaken,
		studentID: req.body.studentID,
		score: req.body.score
	});
	try {
		const savedTest = await test.save();
		res.json(savedTest);
	}catch{
		res.json({message: err});
	}

});

//Delete Test
router.delete('/:TestId', async (req,res) => {
	try{
		const removedTest = await Test.remove({_id: req.params.TestId});
		res.json(removedTest);
	}catch{
		res.json({message: err});
	}
});

//Update Test Title
router.patch('/:TestId', async (req,res) => {
	try{
		const updatedTest = await Test.updateOne(
			{_id: req.params.TestId},
			{ $set : { type: req.body.type } }
		);
		res.json(updatedTest);
	}catch{
		res.json({message: err});
	}
	
});
module.exports = router;