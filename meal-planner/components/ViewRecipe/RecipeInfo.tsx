import { Recipe } from '@/types/recipeTypes';
import React from 'react';
import Button from '../Button';
import { useRouter } from 'next/router';
import Image from 'next/image';

type Props = {
	recipe: any;
	updateRecipe: any;
};

const RecipeInfo = ({ recipe, updateRecipe }: Props) => {
	const router = useRouter();
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
							{recipe.extendedIngredients.map((ingredient: any, i: number) => (
								<li key={i}>{ingredient.original}</li>
							))}
						</ul>
					</div>
					<div>
						<h2>Instructions:</h2>
						<ol>
							{recipe.analyzedInstructions[0]?.steps.map((step: any, i: number) => (
								<li key={i}>{step.step}</li>
							))}
						</ol>
					</div>
					<p>Source: {recipe.sourceName}</p>
					<p>Servings: {recipe.servings}</p>
					<p>Ready in: {recipe.readyInMinutes} minutes</p>
					<Button
						title='Add to List'
						onClick={() => {
							updateRecipe(recipe);
						}}
					/>
					<Button title='Back' onClick={() => router.back()} />
				</div>
			)}
		</>
	);
};

export default RecipeInfo;
