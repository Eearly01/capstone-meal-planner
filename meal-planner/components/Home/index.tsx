import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Navbar from '@/components/Navbar';
import {
	RecipeSearchResult,
	SearchParams,
	ShortRecipe,
} from '@/types/recipeTypes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { UserProfile } from '@/types';
import RecipeCard from '../RecipeModels';

export default function Home() {
	const [recipeList, setRecipeList] = useState<RecipeSearchResult>();
	const [paramList, setParamList] = useState<SearchParams>();
	const [updated, setUpdated] = useState(false);
	const { data: session, update }: any = useSession();

	const router = useRouter();

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
					setRecipeList(res.data);
					console.log(recipeList);
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	const updateRecipe = async (recipe: ShortRecipe) => {
		const userId = session.user._id;
		const thisUser: UserProfile = { ...session.user };
		console.log('thisUser::', thisUser);
		thisUser.savedRecipes.push(recipe);
		session.user = thisUser;
		return await axios.put(
			`http://localhost:3000/api/${userId}/update`,
			thisUser
		);
	};

	const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		getRecipes();
		setUpdated(!updated);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setParamList({ ...paramList, [e.target.name]: e.target.value });
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
				<form onSubmit={formSubmit}>
					Search:{' '}
					<input type='text' name='query' onChange={handleInputChange} />
					<input type='submit' value='Submit' />
				</form>
				<RecipeCard 
				recipeList = {recipeList}
				updateRecipe = {updateRecipe}
				/>
			</Container>
		</>
	);
}
