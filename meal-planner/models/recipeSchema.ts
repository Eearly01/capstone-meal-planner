import { Schema, model, models } from 'mongoose';

const RecipeSchema = new Schema({
	readyInMinutes: Number,
    sourceUrl: String,
    image: String,
    servings: Number,
    id: Number,
    title: String,
    userId: String
});

const UserRecipe = model('Recipe', RecipeSchema);

export default UserRecipe;
