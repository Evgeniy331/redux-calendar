const router = require("express").Router();
const userRepository = require("../../repositories/user");

router.get("/", (req, res, next) => {

	userRepository.getAll(function(err, data) {
		
		if (err) 
			throw err;

        res.json(data);
    });

});

router.put("/:id", (req, res, next) => {
	
	var id = req.params.id || "";
	var reqBody = req.body || "";

	userRepository.update(id, reqBody, function(err, data) {
		
		if (err) 
			throw err;

		res.json(data);

	});
});

module.exports = router;