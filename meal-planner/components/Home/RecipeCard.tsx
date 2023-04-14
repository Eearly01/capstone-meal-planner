import React from 'react';
import { Card, Container } from './RecipeElements';
import Image from 'next/image';
import { RecipeSearchResult } from '@/types/recipeTypes';
import Button from '../Button';
import { useRouter } from 'next/router';

type Props = {
	recipeList?: RecipeSearchResult;
	updateRecipe: any;
};

const RecipeCard = ({ recipeList, updateRecipe }: Props) => {
	const router = useRouter();

	return (
		<Container>
			{recipeList?.results.map((recipe, i) => {
				return (
					<Card key={i}>
						{recipe.title}
						<Image
							src={recipe.image}
							width={50}
							alt='This Recipe has no Image'
							height={50}
						/>
						<Button
							onClick={() => {
								// Navigate to recipe page when button is clicked
								router.push(`/recipes/${recipe.id}`);
							}}
							title='View Recipe'
						/>
						<Button
							title='Add to List'
							onClick={() => {
								updateRecipe(recipe);
							}}
						/>
					</Card>
				);
			})}
		</Container>
	);
};

export default RecipeCard;
