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

const PersonalPage = () => {
	const { data: session, update }: any = useSession();
	
	const [updated, setUpdated] = useState(false);
	const router = useRouter();
	const [user, setUser]: any = useState();

	const getUser = async (userId: number) => {
		try {
			const response = await axios.get(
				`http://localhost:3000/api/${userId}/${userId}`
			);
			setUser(response.data.user);
		} catch (error) {
			console.log('Error:', error);
		}
	};

	const deleteRecipe = async (id: number) => {
		const userId = session.user._id;
		const thisUser: UserProfile = { ...session.user };
		thisUser.savedRecipes = user.savedRecipes.filter((rcp: ShortRecipe) => {
			return rcp.id !== id;
		});
		console.log('thisUser::', thisUser);
		const apiRes = await axios.put(
			`http://localhost:3000/api/${userId}/update`,
			thisUser
		);
		// Update session after deleting recipe
		session.user = thisUser;
		console.log(session.user);
		setUpdated(!updated);
		return apiRes;
	};

	useEffect(() => {
		console.log('Session updated');
		getUser(session?.user._id);
		const visibilityHandler = () =>
			document.visibilityState === 'visible' && update();
		window.addEventListener('visibilitychange', visibilityHandler, false);
		return () =>
			window.removeEventListener('visibilitychange', visibilityHandler, false);
	}, [update, updated]);


	return (
		
		session && (
			console.log(user?.savedRecipes),
			<>
				{user?.savedRecipes?.map((recipe: ShortRecipe) => {
					{
						return (
							<Row>
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
											//    Navigate to recipe page when button is clicked
											router.push(`/recipes/${recipe.id}`);
										}}
										title='View Recipe'
									/>
									<Button
										onClick={() => {
											deleteRecipe(recipe.id);
										}}
										title='Remove Recipe'
									/>
								</Col>
							</Row>
						);
					}
				})}
				{session?.user?.email}
			</>
		)
	);
};

export default PersonalPage;
