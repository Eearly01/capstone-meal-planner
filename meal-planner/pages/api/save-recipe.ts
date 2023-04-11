import { getSession } from 'next-auth/react';
import { connectToMongoDB } from '@/lib/mongodb'; 
import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import UserRecipe from '@/models/recipeSchema';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });
	console.log(session);
	if (!session) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	connectToMongoDB().catch((err) => res.json(err));

	if (req.method === 'POST') {
		if (!req.body) return res.status(400).json({ error: 'Data is missing' });

		const { readyInMinutes, sourceUrl, image, servings, id, title, userId } =
			req.body;

		const recipeExists = await UserRecipe.findOne({ userId, id });

		if (recipeExists) {
			return res.status(409).json({ error: 'UserRecipe Already exists' });
		} else {

			try {
				const data = await UserRecipe.create({
					readyInMinutes,
					sourceUrl,
					image,
					servings,
					id,
					title,
					userId: session.user?.email,
				});

				console.log('data:', data);

				const user = {
					readyInMinutes: data.readyInMinutes,
					sourceUrl: data.sourceUrl,
					image: data.image,
					servings: data.servings,
					id: data.id,
					title: data.title,
					userId: session.user?.email,
				};

				return res.status(201).json({
					success: true,
					user,
				});
			} catch (error) {
				console.log('error:', error);
				if (error && error instanceof mongoose.Error.ValidationError) {
					//mongo db will return array
					// but we only want to show one error at a time

					for (let field in error.errors) {
						const msg = error.errors[field].message;
						return res.status(409).json({ error: msg });
					}
				}

				return res.status(500).json({ error: 'Server Error' });
			}
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
}