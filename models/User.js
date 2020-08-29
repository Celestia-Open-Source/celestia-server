const mongoose = require('mongoose')

// Create Schema
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		unique: true,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post'
		}
	],
	reacted: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post'
		}
	],
	avatarUrl: String,
	githubId: Number,
});


module.exports = mongoose.model('User', UserSchema);
