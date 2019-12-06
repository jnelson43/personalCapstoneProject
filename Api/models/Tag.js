const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
	tagText: {
		type: String,
		require: true
	},
	userID: {
		type: String,
		require: true
	},
	restaurantID: {
		type: String,
		require: true
	}
});

module.exports = mongoose.model('Tag', TagSchema);