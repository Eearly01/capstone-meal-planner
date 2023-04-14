import React from 'react';
import { Card, Container, ImageStyle } from './RecipeElements';
import Image from 'next/image';
import { RecipeSearchResult, ShortRecipe } from '@/types/recipeTypes';
import Button from '../Button';
import { useRouter } from 'next/router';

type Props = {  
	recipeList?: ShortRecipe[];
	updateRecipe: any;
	buttonTitle: string;
};

const RecipeCard = ({ recipeList, updateRecipe, buttonTitle }: Props) => {
	const router = useRouter();
	return (
		<Container>
			{recipeList?.map((recipe, i) => {
				return (
					<Card key={i}>
						{recipe.title}
							<Image
								src={recipe.image}
								height={100}
								width={100}
								alt='This Recipe has no Image'
							/>
						<Button
							onClick={() => {
								// Navigate to recipe page when button is clicked
								router.push(`/recipes/${recipe.id}`);
							}}
							title='View Recipe'
						/>
						<Button
							title={buttonTitle}
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
