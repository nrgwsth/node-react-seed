const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
	name: String,
	id: String,
	profImage: String,
	email: String
})

const User = mongoose.model('User', UserSchema)

function createUser(_user){
	const user = new User(_user)
	return user.save()
}

function findById(_id){
	return User.findOne({
		id: _id
	})
}

module.exports = {
	createUser,
	findById
}