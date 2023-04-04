const { Module } = require('module');
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	id: { type: String, required: true },
	name: { type: String, required: true },
	img: String,
	type: [String],
	stats: {
		hp: String,
		attack: String,
		defense: String,
		spattack: String,
		spdefense: String,
		speed: String,
	},
	moves: {
		level: [{ learnedat: String, name: String, gen: String }],
		egg: [{ name: String, gen: String }],
		tutor: [{ name: String, gen: String }],
	},
});

module.exports = mongoose.model('Recipe', recipeSchema);
