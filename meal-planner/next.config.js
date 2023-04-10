/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		RECIPEAPI_KEY: process.env.RECIPEAPI_KEY,
		RECIPEAPI_HOST: process.env.RECIPEAPI_HOST,
	},
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: ['spoonacular.com'],
	},
};

module.exports = nextConfig
