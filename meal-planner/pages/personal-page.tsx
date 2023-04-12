import { useSession } from 'next-auth/react';
import { ShortRecipe } from '@/types/recipeTypes';
import Image from 'next/image';
import React from 'react';
import Button from '@/components/Button';
import { Col, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';

const PersonalPage = () => {
	const { data: session }: any = useSession();
    const router = useRouter();

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
