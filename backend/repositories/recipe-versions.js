var Repository = require("../units/Repository");
var RecipeVersions = require("../schemas/recipe-versions");

var RecipeVersionsRepository = function(){
	Repository.prototype.constructor.call(this);
	this.model = RecipeVersions;
};

RecipeVersionsRepository.prototype = new Repository();

RecipeVersionsRepository.prototype.getByRecipeID = function(recipeID, callback) {
	
	var model = this.model;

	model
		.findOne({
			recipeID: recipeID
		})
		.exec(callback);
};

RecipeVersionsRepository.prototype.deleteByRecipeID = function(recipeID, callback) {
	var model = this.model;
	var query = model.remove({recipeID: recipeID});
	query.exec(callback);
};

RecipeVersionsRepository.prototype.addVersion = function(recipeID, version, callback) {
	var model = this.model;
	var query = model.update(
		{recipeID: recipeID},
		{ $push: { versions: version } }
	);
	query.exec(callback);
};


module.exports = new RecipeVersionsRepository();