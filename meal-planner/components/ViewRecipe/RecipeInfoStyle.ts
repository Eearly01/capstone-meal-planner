import styled from 'styled-components';
import Image from 'next/image';

export const RecipeInfoContainer = styled.div`
	max-width: 800px;
	margin: 1.2rem auto;
	padding: 25px;
	background-color: #f5f5f5;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const RecipeTitle = styled.h1`
	font-size: 36px;
	margin-bottom: 20px;
	text-align: center;
`;

export const RecipeImage = styled(Image)`
	display: block;
	margin: 0 auto;
	border-radius: 10px;
`;

export const RecipeSection = styled.div`
	margin-bottom: 20px;
`;

export const RecipeSectionTitle = styled.h2`
	font-size: 28px;
	margin-bottom: 10px;
`;

export const RecipeList = styled.ul`
	list-style-type: none;
	padding-left: 0;
`;

export const RecipeListItem = styled.li`
	font-size: 20px;
	margin-bottom: 10px;
`;

export const RecipeInfoText = styled.p`
	font-size: 20px;
	margin-bottom: 10px;
	text-align: center;
`;
