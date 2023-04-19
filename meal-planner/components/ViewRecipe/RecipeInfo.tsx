import { Recipe, ShortRecipe } from '@/types/recipeTypes';
import React from 'react';
import Button from '../Button';
import { useRouter } from 'next/router';
import { RecipeImage, RecipeInfoContainer, RecipeInfoText, RecipeList, RecipeListItem, RecipeSection, RecipeSectionTitle, RecipeTitle } from './RecipeInfoStyle';

type Props = {
	recipe: Recipe | undefined;
	updateRecipe: (recipe: ShortRecipe) => void;
};

const RecipeInfo = ({ recipe, updateRecipe }: Props) => {
	const router = useRouter();
	return (
		<RecipeInfoContainer>
			{recipe && (
				<>
					<RecipeTitle>{recipe.title}</RecipeTitle>
					<RecipeImage
						src={recipe.image}
						width={300}
						height={300}
						alt='This Recipe has no Image'
					/>
					<RecipeSection>
						<RecipeSectionTitle>Ingredients:</RecipeSectionTitle>
						<RecipeList>
							{recipe.extendedIngredients.map((ingredient: any, i: number) => (
								<RecipeListItem key={i}>{ingredient.original}</RecipeListItem>
							))}
						</RecipeList>
					</RecipeSection>
					<RecipeSection>
						<RecipeSectionTitle>Instructions:</RecipeSectionTitle>
						<RecipeList as='ol'>
							{recipe.analyzedInstructions[0]?.steps.map(
								(step: any, i: number) => (
									<RecipeListItem key={i}>{step.step}</RecipeListItem>
								)
							)}
						</RecipeList>
					</RecipeSection>
					<RecipeInfoText>Source: {recipe.sourceName}</RecipeInfoText>
					<RecipeInfoText>Servings: {recipe.servings}</RecipeInfoText>
					<RecipeInfoText>
						Ready in: {recipe.readyInMinutes} minutes
					</RecipeInfoText>
					<Button
						title='Add to List'
						onClick={() => {
							updateRecipe(recipe);
						}}
					/>
					<Button title='Back' onClick={() => router.back()} />
				</>
			)}
		</RecipeInfoContainer>
	);
};

export default RecipeInfo;
