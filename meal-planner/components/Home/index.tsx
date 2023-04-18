import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import {
	SearchParams,
	ShortRecipe,
} from '@/types/recipeTypes';
import { useSession } from 'next-auth/react';
import { UserProfile } from '@/types';
import RecipeCard from './RecipeCard';
import { Container, SearchBar, PageButtons } from './HomeElements';
import { EthButton } from '../Button/EthButton';
import Button from '../Button';

export default function Home() {
	const [recipeList, setRecipeList] = useState<ShortRecipe[]>();
	const [paramList, setParamList] = useState<SearchParams>();
	const [updated, setUpdated] = useState(false);
	const { data: session, update }: any = useSession();
	const [pageOffset, setPageOffset] = useState(0);
	const [disabled, setDisabled] = useState(true);

const getRecipes = async () => {
	if (paramList?.query) {
		const config = {
			method: 'GET',
			url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
			params: { ...paramList, number: 12, offset: pageOffset },
			headers: {
				'X-RapidAPI-Key': process.env.RECIPEAPI_KEY,
				'X-RapidAPI-Host': process.env.RECIPEAPI_HOST,
			},
		};

		try {
			const res = await axios(config);
			if (res) {
				setRecipeList(res.data.results);
				setDisabled(false);
			}
		} catch (error) {
			console.error(error);
		}
	}
};



	const updateRecipe = async (recipe: ShortRecipe) => {
		const userId = session.user._id;
		const thisUser: UserProfile = { ...session.user };
		thisUser.savedRecipes.push(recipe);
		session.user = thisUser;
		return await axios.put(
			`${process.env.SERVER}/api/${userId}/update`,
			thisUser
		);
	};

	const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		getRecipes();
		setUpdated(!updated);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setParamList({
			...paramList,
			[e.target.name]: e.target.value,
			offset: 0,
		});
		console.log(paramList);
	};

useEffect(() => {
	getRecipes();
}, [pageOffset, updated]);



	return (
		<>
			<Container>
				<SearchBar>
					<form onSubmit={formSubmit}>
						Search:{' '}
						<input type='text' name='query' onChange={handleInputChange} />
						<EthButton
							text={'Submit'}
							label={'Button'}
							onClick={() => {
								<input type='submit' value='Submit' />;
							}}
						/>
					</form>
				</SearchBar>
			</Container>
			<RecipeCard
				recipeList={recipeList}
				updateRecipe={updateRecipe}
				buttonTitle='Add To List'
			/>
			<PageButtons disabled={disabled}>
				<Button
					title='Next Page'
					disabled={disabled}
					onClick={async () => {
						setPageOffset(
							(prevOffset) => prevOffset + (paramList?.offset || 12)
						);
						await getRecipes();
						setUpdated(!updated);
					}}
				/>

				<Button
					title='Prev Page'
					disabled={disabled}
					onClick={async () => {
						setPageOffset(
							(prevOffset) => prevOffset - (paramList?.offset || 12)
						);
						await getRecipes();
						setUpdated(!updated);
					}}
				/>

				<Button
					title='Home Page'
					disabled={disabled}
					onClick={async () => {
						setPageOffset(0);
						await getRecipes();
						setUpdated(!updated);
					}}
				/>
			</PageButtons>
		</>
	);
}
