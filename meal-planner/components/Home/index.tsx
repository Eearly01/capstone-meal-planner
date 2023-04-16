import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Navbar from '@/components/Navbar';
import {
	RecipeSearchResult,
	SearchParams,
	ShortRecipe,
} from '@/types/recipeTypes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { UserProfile } from '@/types';
import RecipeCard from './RecipeCard';
import { Container, SearchBar } from './HomeElements';
import { EthButton } from '../Button/EthButton';
import Button from '../Button';

export default function Home() {
	const [recipeList, setRecipeList] = useState<ShortRecipe[]>();
	const [paramList, setParamList] = useState<SearchParams>();
	const [updated, setUpdated] = useState(false);
	const { data: session, update }: any = useSession();

	let pageNumber = 14;

	const getRecipes = async () => {
		if (paramList?.query) {
			const config = {
				method: 'GET',
				url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
				params: paramList,
				headers: {
					'X-RapidAPI-Key': process.env.RECIPEAPI_KEY,
					'X-RapidAPI-Host': process.env.RECIPEAPI_HOST,
				},
			};

			try {
				const res = await axios(config);
				if (res) {
					setRecipeList(res.data.results);
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
			`https://meal-planner-kd70.onrender.com/api/${userId}/update`,
			thisUser
		);
	};

	const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		getRecipes();
		setUpdated(!updated);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setParamList({ ...paramList, [e.target.name]: e.target.value, number: pageNumber });
		console.log(paramList);
	};

	useEffect(() => {
		const visibilityHandler = () =>
			document.visibilityState === 'visible' && update();
		window.addEventListener('visibilitychange', visibilityHandler, false);
		return () =>
			window.removeEventListener('visibilitychange', visibilityHandler, false);
	}, [update]);

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
			<Button
				title='Next Page'
				onClick={() => {
					pageNumber += 14
					getRecipes
				}}
			/>
		</>
	);
}
