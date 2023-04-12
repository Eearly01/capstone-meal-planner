import { useSession } from 'next-auth/react';
import { ShortRecipe } from '@/types/recipeTypes';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { Col, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios';
import { UserProfile } from '@/types';

const PersonalPage = () => {
	const { data: session }: any = useSession();
    const [updated, setUpdated] = useState(false);
	const router = useRouter();

	const deleteRecipe = async (id: number) => {
		const userId = session.user._id;
		const thisUser: UserProfile = { ...session.user };
		thisUser.savedRecipes = thisUser.savedRecipes.filter(function (recipes) {
			return recipes.id !== id;
		});
		console.log('thisUser::', thisUser);
		const apiRes = await axios.put(
			`http://localhost:3000/api/${userId}/update`,
			thisUser
		);
        setUpdated(!updated)
		return apiRes;
	};

    useEffect(() => {
			setUpdated(false)
		}, [updated]);

	return (
		session && (
			<>
				{session?.user?.savedRecipes.map((recipe: ShortRecipe) => {
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
											// Navigate to recipe page when button is clicked
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
