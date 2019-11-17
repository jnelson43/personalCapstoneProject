const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	firstName: {
		type: String,
		default: ""
	},
	lastName: {
		type: String,
		default: ""
	},
	addedRestaurants: {
		type: String,
		default: ""
	},
	dateCreated: {
		type: Number,
		default: Date.now
	}
});

module.exports = mongoose.model('Users', UserSchema);