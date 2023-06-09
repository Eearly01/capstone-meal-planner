/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		RECIPEAPI_KEY: process.env.RECIPEAPI_KEY,
		RECIPEAPI_HOST: process.env.RECIPEAPI_HOST,
		MONGODB_KEY: process.env.MONGODB_KEY,
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		SERVER: process.env.SERVER,
	},
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: ['spoonacular.com'],
	},
};

module.exports = nextConfig
