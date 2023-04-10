import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
// Bootstrap Components
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { RecipeSearchResult, Recipe, SearchParams } from '@/types/recipeTypes';
import { setMaxListeners } from 'events';
import RecipeCards from '@/components/RecipeModels/RecipeCards';
import Image from 'next/image';
import Button from '@/components/Button';
import { useRouter } from 'next/router';

export default function Home() {
	const [recipeList, setRecipeList] = useState<RecipeSearchResult>();
	const [paramList, setParamList] = useState<SearchParams>();
	const [updated, setUpdated] = useState(false);

	const router = useRouter();

	const getRecipes = async () => {
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
	};

	const getSpecificRecipe = async (id: number) => {
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
				return res.data;
			}
		} catch (error) {
			console.error(error);
		}
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
		getRecipes();
	}, [updated]);

	return (
		<>
			<Head>
				<title>Meal Planner</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<Container>
				<form onSubmit={formSubmit}>
					Search:{' '}
					<input type='text' name='query' onChange={handleInputChange} />
					<input type='submit' value='Submit' />
				</form>
				<Row>
					{recipeList?.results.map((recipe, i) => {
						return (
							<Row key={i}>
								<Col sm={6} md={4}>
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

									<Button title='Add to List' />
								</Col>
							</Row>
						);
					})}
				</Row>
			</Container>
		</>
	);
}
