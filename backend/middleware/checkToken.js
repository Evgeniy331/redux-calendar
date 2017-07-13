var jsonwebtoken = require('jsonwebtoken');
var configToken = require('../config/token');
var Cookies = require('cookies')

module.exports = function(req, res, next){
	
	var cookies = new Cookies(req, res);

	var token = req.body.token || req.headers['x-access-token'] || cookies.get('x-access-token');

	if (token) {
		jsonwebtoken.verify(token, configToken.secretKey, function(err, decoded) {

			if (err) {
				next();
			} else {
				cookies.set("current-username", decoded.username, { httpOnly: false });
				cookies.set("current-user-id", decoded.id, { httpOnly: false });
				next();
			}
		});
	} else {
		next();
	}
};