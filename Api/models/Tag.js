const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
	tagText: {
		type: String,
		require: true
	},
	userID: {
		type: Number,
		require: true
	},
	tagID: {
		type: Number,
		require: true
	},
	restaurauntID: {
		type: String,
		require: true
	}
});

module.exports = mongoose.model('Tag', TagSchema);