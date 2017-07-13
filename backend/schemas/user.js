var mongoose = require("mongoose");
var Schema = mongoose.Schema;
require("mongoose-type-url");

var userSchema = new Schema({
	username: String,
	password: String,
	events: [
	{
		start: Number,
		duration: Number,
		title: String
	}]
});

module.exports = mongoose.model("User", userSchema);