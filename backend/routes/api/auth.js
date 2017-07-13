const router = require("express").Router();
var userRepository =  require("../../repositories/user");
var Cookies = require("cookies");
const checkToken = require("../../middleware/checkToken"); 
var TokenService = require("../../services/tokenService");

router.post("/login", checkToken, (req, res, next) => {
    
    let id = req.params.id;

	userRepository.getByUsernameAndPassword(req.body.username, req.body.password, function(err, user) {

		if (err) 
			throw err;

		if (!user) {
			res.send({ 
				success: false,
				message: "User doesn't exist"
			});
		}
		else if(user) {

			var token = TokenService.createToken(user);
			var cookies = new Cookies(req, res);

			cookies.set("x-access-token", token, {httpOnly: false});
			cookies.set("current-username", user.username, { httpOnly: false });
			cookies.set("current-user-id", user._id, { httpOnly: false });

	        res.json({
				success: true,
				message: "Successfuly login!",
				token: token
			});
			
	    }

    });

});

router.get("/logout", function(req, res){

	var cookies = new Cookies(req, res);
	cookies.set("x-access-token");
	cookies.set("current-username");
	cookies.set("current-user-id");

	res.json({
		success: true,
		message: "Successfuly logout!"
	});

});

module.exports = router;