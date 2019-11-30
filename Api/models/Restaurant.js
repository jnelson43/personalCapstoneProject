const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	description: {
		type: String,
		require: true
	},
	imageURL: {
		type: String,
		require: true
	},
	username: {
		type: String,
		require: true
	}
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);