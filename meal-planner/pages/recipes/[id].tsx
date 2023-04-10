import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Recipe } from '@/types/recipeTypes';
import Image from 'next/image';
import Button from '@/components/Button';
import { useRouter } from 'next/router';

export default function RecipeDetails() {
	const [recipe, setRecipe] = useState<Recipe>();
	const router = useRouter();
	const { id } = router.query;

	const getRecipeDetails = async (id: string) => {
		const config = {
			method: 'GET',
			url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
			headers: {
				'X-RapidAPI-Key': process.env.RECIPEAPI_KEY,
				'X-RapidAPI-Host': process.env.RECIPEAPI_HOST,
			},
		};

		try {
			const res = await axios(config);
			if (res) {
				setRecipe(res.data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (id) {
			getRecipeDetails(id.toString());
		}
	}, [id]);

	return (
		<>
			{recipe && (
				<div>
					<h1>{recipe.title}</h1>
					<Image
						src={recipe.image}
						width={300}
						height={300}
						alt='This Recipe has no Image'
					/>
					<div>
						<h2>Ingredients:</h2>
						<ul>
							{recipe.extendedIngredients.map((ingredient, i) => (
								<li key={i}>{ingredient.original}</li>
							))}
						</ul>
					</div>
					<div>
						<h2>Instructions:</h2>
						<ol>
							{recipe.analyzedInstructions[0]?.steps.map((step, i) => (
								<li key={i}>{step.step}</li>
							))}
						</ol>
					</div>
					<p>Source: {recipe.sourceName}</p>
					<p>Servings: {recipe.servings}</p>
					<p>Ready in: {recipe.readyInMinutes} minutes</p>
					<Button title='Add to List' />
					<Button title='Back' onClick={() => router.back()} />
				</div>
			)}
		</>
	);
}
