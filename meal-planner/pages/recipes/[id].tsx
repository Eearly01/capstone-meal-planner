import React from 'react';
import { useRouter } from 'next/router';
import ViewRecipe from '@/components/ViewRecipe';

export default function RecipeDetails() {
	const router = useRouter();

	return (
		<ViewRecipe id = {router.query.id} />
	);
}
