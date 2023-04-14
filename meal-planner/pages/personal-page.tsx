import { useSession, getSession } from 'next-auth/react';
import { ShortRecipe } from '@/types/recipeTypes';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { Col, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios';
import { UserProfile } from '@/types';
import { ObjectId } from 'mongoose';
import RecipeCard from '@/components/Home/RecipeCard';

const PersonalPage = () => {
	const { data: session, update }: any = useSession();

	const [updated, setUpdated] = useState(false);
	const router = useRouter();
	const [user, setUser] = useState<UserProfile>();

	const getUser = async (userId: number) => {
		try {
			const response = await axios.get(
				`https://meal-planner-kd70.onrender.com/api/${userId}/${userId}`
			);
			setUser(response.data.user);
		} catch (error) {
			console.log('Error:', error);
		}
	};

	const deleteRecipe = async (recipe: ShortRecipe) => {
		if (session) {
			const userId = session.user._id;
			const thisUser: UserProfile = { ...session.user };
			user &&
				(thisUser.savedRecipes = user?.savedRecipes.filter(
					(rcp: ShortRecipe) => {
						return rcp.id !== recipe.id;
					}
				));
			session.user = thisUser;
			await axios.put(
				`https://meal-planner-kd70.onrender.com/api/${userId}/update`,
				thisUser
			);
			return setUpdated(!updated)
		} else {
			router.push('/login');
		}
	};

	useEffect(() => {
		getUser(session?.user._id);
		const visibilityHandler = () =>
			document.visibilityState === 'visible' && update();
		window.addEventListener('visibilitychange', visibilityHandler, false);
		return () =>
			window.removeEventListener('visibilitychange', visibilityHandler, false);
	}, [update, updated, session]);

	return (
		<>
			<h1>Personal Recipe List</h1>
			{session && (
				<>
					<RecipeCard
						recipeList={user?.savedRecipes}
						updateRecipe={deleteRecipe}
						buttonTitle='DELETE Recipe'
					/>
				</>
			)}
		</>
	);
};

export default PersonalPage;
