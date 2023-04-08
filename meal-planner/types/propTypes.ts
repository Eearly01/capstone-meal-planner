import React from "react";

export interface NavLinkProps {
    route: string;
    children: React.ReactNode;
    color?: string;
    large?: boolean;
    onClick?: React.MouseEventHandler<Element>
}

export interface InputProps {
    placeholder: string;
    icon: React.ReactNode;
    type: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    required?: boolean 
    error?: string | undefined
    name?: string
}

export interface ButtonProps {
	title: string;
	type?: 'submit' | 'button' | 'reset';
	disabled?: boolean;
	onClick?: () => void;
}

export interface Recipe {
	id: number;
	title: string;
	image: string;
	imageType: string;
	likes: number;
	missedIngredientCount: number;
	usedIngredientCount: number;
	unusedIngredients: string[];
	likes: number;
	nutrition: {
		nutrients: {
			name: string;
			amount: number;
			unit: string;
		}[];
		caloricBreakdown: {
			percentProtein: number;
			percentFat: number;
			percentCarbs: number;
		};
	};
}


interface RecipeSearchResult {
	results: Recipe[];
	baseUri: string;
	offset: number;
	number: number;
	totalResults: number;
}