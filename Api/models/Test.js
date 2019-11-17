const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
	type: {
		type: String,
		require: true
	},
	timeLimit: {
		type: Number,
		require: true
	},
	numOfQuestions: {
		type: Number,
		require: true
	},
	digits: {
		type: String,
		require: true
	},
	dateTaken: {
		type: Date,
		default: Date.now
	},
	studentID: {
		type: String,
		require: true
	},
	score: {
		type: Number,
		require: true
	}
});

module.exports = mongoose.model('Tests', TestSchema);