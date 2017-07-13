var User = require("../schemas/user");
var mongoose = require("mongoose");

module.exports = function () {

		let users = [];

		users.push(
			new User ({
				username: "login",
				password: "password",
				events: [
					{start: 0,  duration: 15, title: "Exercise"},
					{start: 25, duration: 30, title: "Travel to work"},
					{start: 30, duration: 30, title: "Plan day"},
					{start: 60, duration: 15, title: "Review yesterday's commits"},
					{start: 100,  duration: 15, title: "Code review"},
					{start: 180,  duration: 90, title: "Have lunch with John"},
					{start: 360,  duration: 30, title: "Skype call"},
					{start: 370,  duration: 45, title: "Follow up with designer"},
					{start: 405,  duration: 30, title: "Push up branch"}
				]
			}).toObject()
		);

		users.push(
			new User ({
				username: "username1",
				password: "password1",
				events: []
			}).toObject()
		);

		return {
			users: users	
		};
	}
