import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Recipe, ShortRecipe } from '@/types/recipeTypes';
import { useRouter } from 'next/router';
import { UserProfile } from '@/types';
import { useSession } from 'next-auth/react';
import RecipeInfo from './RecipeInfo';

export default function ViewRecipe(id: any) {
	const [recipe, setRecipe] = useState<Recipe>();
	const { data: session }: any = useSession();
	const router = useRouter();

	const getRecipeDetails = async () => {
		const config = {
			method: 'GET',
			url: `https://${process.env.RECIPEAPI_HOST}/recipes/${id.id}/information`,
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

	const updateRecipe = async (recipe: ShortRecipe) => {
		if (session) {
			const userId = session?.user?._id;
			const thisUser: UserProfile = { ...session.user };
			thisUser.savedRecipes.push(recipe);
			session.user = thisUser;
			return await axios.put(
				`${process.env.SERVER}/api/${userId}/update`,
				thisUser
			);
		} else {
			router.push('/login');
		}
	};

	useEffect(() => {
		if (id) {
			getRecipeDetails();
		}
	}, [id]);

	return <RecipeInfo recipe={recipe} updateRecipe={updateRecipe} />;
}
