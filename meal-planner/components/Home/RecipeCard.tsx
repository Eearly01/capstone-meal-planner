import React from 'react';
import {
	Container,
	Card,
	ImageStyle,
	Title,
	ButtonsWrapper,
} from './RecipeElements';
import Image from 'next/image';
import { ShortRecipe } from '@/types/recipeTypes';
import Button from '../Button';
import { useRouter } from 'next/router';

type Props = {
	recipeList?: ShortRecipe[];
	updateRecipe: (recipe: ShortRecipe) => void;
	buttonTitle: string;
};

const RecipeCard = ({ recipeList, updateRecipe, buttonTitle }: Props) => {
	const router = useRouter();

	return (
		<Container>
			{recipeList?.map((recipe, i) => {
				return (
					<Card key={i}>
						<ImageStyle>
							<Image
								src={recipe.image}
								alt={`${recipe.title} image`}
								width={250}
								height={150}
							/>
						</ImageStyle>
						<Title>{recipe.title}</Title>
						<ButtonsWrapper>
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
						</ButtonsWrapper>
					</Card>
				);
			})}
		</Container>
	);
};

export default RecipeCard;
