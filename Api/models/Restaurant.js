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
	restaurantID: {
		type: String,
		require: true
	},
	UserID: {
		type: String,
		require: true
	}
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);