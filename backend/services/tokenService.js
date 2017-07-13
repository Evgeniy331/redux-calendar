var jsonwebtoken = require('jsonwebtoken');
var configToken = require('../config/token');

function TokenService(){

}

TokenService.prototype.createToken = function(user) {
	var token = jsonwebtoken.sign({
		id: user._id,
		username: user.username,
	}, configToken.secretKey, {
		expiresIn: 60*60*24
	});

	return token;	
};

module.exports = new TokenService();