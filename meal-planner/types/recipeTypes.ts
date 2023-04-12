    export interface Recipe {
			vegetarian: boolean;
			vegan: boolean;
			glutenFree: boolean;
			dairyFree: boolean;
			veryHealthy: boolean;
			cheap: boolean;
			veryPopular: boolean;
			sustainable: boolean;
			lowFodmap: boolean;
			weightWatcherSmartPoints: number;
			gaps: string;
			preparationMinutes: number;
			cookingMinutes: number;
			aggregateLikes: number;
			healthScore: number;
			sourceName: string;
			pricePerServing: number;
			extendedIngredients: [
				{
					id: number;
					aisle: string;
					image: string;
					name: string;
					original: string;
					measures: {
						us: {
							amount: number;
							unitShort: string;
						};
						metric: {
							amount: number;
							unitShort: string;
						};
					};
				}
			];
			id: number;
			title: string;
			readyInMinutes: number;
			servings: number;
			sourceUrl: string;
			image: string;
			summary: string;
			dishTypes: [string];
			diets: [string];
			occasions: [string];
			instructions: string;
			analyzedInstructions: [
				{
					steps: [
						{
							number: number;
							step: string;
							ingredients: [{
								name: string;
                            }];
						}
					];
				}
			];
		}


export interface RecipeSearchResult {
	results: ShortRecipe[];
	baseUri: string;
	offset: number;
	number: number;
	totalResults: number;
}

export interface SearchParams {
	query?: string;
	cuisine?: string;
	diet?: string;
	intolerances?: string;
	equipment?: string;
	includeIngredients?: string;
	excludeIngredients?: string;
	type?: string;
	instructionsRequired?: boolean;
	titleMatch?: string;
	maxReadyTime?: number;
	sort?: string;
	sortDirection?: string;
	offset?: string;
	number?: string;
	ranking?: string;
}

export type ShortRecipe = {
	id: number;
	title: string;
	image: string;
	imageType: string;
}
