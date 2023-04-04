// CREATE - POST
createRecipe = (req, res) => {
	const createdRecipe = await RecipeModel.create(req.body);
	res.json(createdRecipe);
};

// INDEX - GET ALL

app.get('/recipes', async (req, res) => {
	const allRecipes = await RecipeModel.find({});
	res.json(allRecipes);
});

// DELETE - DELETE ONE

app.delete('/recipes/:id', async (req, res) => {
	const deletedRecipe = await RecipeModel.findByIdAndRemove(req.params.id);
	res.json(deletedRecipe);
});

// UPDATE - UPDATE ONE

app.put('/recipes/:id', async (req, res) => {
	const updatedRecipe = await RecipeModel.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	);
	res.json(updatedRecipe);
});
