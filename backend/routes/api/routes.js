const auth = require("./auth");
const user = require("./user");
const checkToken = require("../../middleware/checkToken")

module.exports = function(app){
	app.use("/api/users", user);
	app.use("/api", auth);
	app.use(checkToken);
};